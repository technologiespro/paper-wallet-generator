<template>
  <div class="w-100">
    <!--{{account}}-->
    <div class="button-list">
      <b-button
          @click="getNewAccounts"
          class="btn-soft-primary text-uppercase"
      ><i class="fas fa-dice"></i> {{ $t('wallet.new_address') }}
      </b-button>

      <b-button :disabled="!account.address" @click="saveImage" class="btn-soft-primary text-uppercase"><i
          class="fe-download"></i>
        {{ $t('wallet.save') }} PNG
      </b-button>

      <!--<b-button @click="generate" class="btn-soft-primary text-uppercase"><i class="fe-refresh-cw"></i> Refresh</b-button>-->
      <b-button @click="walletPrint" class="btn-soft-primary text-uppercase"><i class="fe-printer"></i>
        {{ $t('wallet.print') }}
      </b-button>

      <select class="form-control float-left bg-pattern text-white" v-model="theme" style="width:220px;">
        <option v-for="(item, idx) in themes" :value="item">{{ templates[$i18n.locale][idx] }}</option>
      </select>
    </div>

    <!--<base-button @click="saveCanvasJson">Save Json</base-button>-->
    <!--<img :src="generatedImg"/>-->
    <hr/>
    <div v-if="account">

      <canvas @click="zoom = !zoom" id="canvas-note" ref="can" width="2480" height="3508" :class="zoom ? 'zoom-max': 'zoom-min'"></canvas>
      <VueQrcode v-if="account.address" id="qrPublic"
                 :options="{size:340, backgroundAlpha: 0.0, foreground: '#000', level: 'H'}"
                 :value="account.address" class="qr-note"/>
      <VueQrcode v-if="account.privateKey" id="qrPrivate"
                 :options="{size:400, backgroundAlpha: 0.0, foreground: '#000', level: 'H'}"
                 :value="account.privateKey" class="qr-note"/>
    </div>

  </div>
</template>

<script>
import {fabric} from 'fabric';
import VueQrcode from '@/components/utils/QrCodeImg';
import {coins, templates} from "@/config";
//const bip38 = require('bip38');
//const wif = require('wif');
import printJS from 'print-js';
import eventBus from '@/plugins/event-bus'

var canvas = null

export default {
  name: "WalletPaper",
  components: {
    VueQrcode,
  },
  data() {
    return {
      theme: 0,
      themes: [],
      account: null,
      generatedImg: null,
      coins: coins[this.$route.params['id']],
      jsonData: null,
      templates: templates,
      zoom: false,
    }
  },

  watch: {
    async theme() {
      await this.themeSelect();
    },

  },
  computed: {
    coin() {
      return coins[this.$route.params['id']];
    }
  },
  async created() {
    for (let i = 0; i < 38; i++) {
      this.themes.push(i);
    }
    //await this.getNewAccounts()
    let _self = this;
    await this.getNewAccounts()
    setTimeout(async () => {
      await _self.generate();
      //await _self.getNewAccounts()

      //canvas.renderAll.bind(canvas);
      //canvas.renderAll();
    }, 2000);

  },
  mounted() {
    let _self = this;
    window.onload = async function () {
      //await _self.generate();
    }

  },
  methods: {
    async themeSelect() {
      await canvas.setBackgroundImage('static/print/bg/' + this.theme + '.png', canvas.renderAll.bind(canvas), {
        top: 0,
        left: 0,
        originX: 'left',
        originY: 'top',
        scaleX: 1,
        scaleY: 1,
      });
      //canvas.renderAll.bind(canvas);
      //canvas.renderAll();
    },
    async getNewAccounts() {
      this.account = (await this.generateAddress(this.$route.params['id'], 1))[0];
      await eventBus.emit('update:cons', this.account);

      //let myWifString = this.account.wif;
      //let decoded = wif.decode(myWifString)
      //this.account.encrypted = bip38.encrypt(decoded.privateKey, decoded.compressed, 'TestingOneTwoThree')
      await this.generate();
    },
    loadCanvas(json) {
      // parse the data into the canvas
      canvas.loadFromJSON(json);
      // re-render the canvas
      canvas.renderAll();
      // optional
      canvas.calculateOffset();
    },
    async saveCanvasJson() {
      // convert canvas to a json string
      this.jsonData = JSON.stringify(canvas.toJSON());

      const blob = new Blob([this.jsonData], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
      a.download = "test.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
    async walletPrint() {
      this.generatedImg = canvas.toDataURL({
        format: "png",
        left: 0,
        top: 0,
        width: canvas.width,
        height: canvas.height,
      });
      printJS(this.generatedImg, 'image')

    },
    async saveImage() {
      /*
      await canvas.setZoom(1);
      canvas.setWidth(1387 * canvas.getZoom());
      canvas.setHeight(589 * canvas.getZoom());
      canvas.renderAll.bind(canvas);
      canvas.renderAll();
       */
      this.generatedImg = canvas.toDataURL({
        format: "png",
        left: 0,
        top: 0,
        width: canvas.width,
        height: canvas.height,
      });


      const link = document.createElement('a');
      link.download = this.$route.params['id'].toUpperCase() + '-' + this.account.address + '.png';
      link.href = this.generatedImg;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      //this.generatedImg.print();

      //await canvas.setZoom(0.86);
    },
    async sanitizeText(value) {
      let sanitizedText = value
          .trim()
          .replace(/'''/g, '\u2034')                                                   // triple prime
          .replace(/(\W|^)"(\S)/g, '$1\u201c$2')                                       // beginning "
          .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2')          // ending "
          .replace(/([^0-9])"/g, '$1\u201d')                                            // remaining " at end of word
          .replace(/''/g, '\u2033')                                                    // double prime
          .replace(/(\W|^)'(\S)/g, '$1\u2018$2')                                       // beginning '
          .replace(/([a-z])'([a-z])/ig, '$1\u2019$2')                                  // conjunction's possession
          .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3')                 // ending '
          .replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3')     // abbrev. years like '93
          .replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019') // backwards apostrophe
          .replace(/'/g, '\u2032');

      // default text
      if (sanitizedText.length === 0) {
        sanitizedText = 'Wallet Address here';
      }

      return sanitizedText;
    },
    async generateImage() {
      this.generatedImg = canvas.toDataURL({
        format: "png",
        left: 0,
        top: 0,
        width: canvas.width,
        height: canvas.height,
      });

    },
    async generate() {
      if (canvas) {
        canvas.dispose();
      }
      const ref = this.$refs.can;
      //canvas = new fabric.Canvas(ref);
      canvas = new fabric.StaticCanvas(ref);
      canvas.width = 2480;
      canvas.height = 3508;//3400;


      await canvas.setBackgroundImage('static/print/bg/' + this.theme + '.png', canvas.renderAll.bind(canvas), {
        top: 0,
        left: 0,
        originX: 'left',
        originY: 'top',
        scaleX: 1,
        scaleY: 1,
      });


      // form
      fabric.Image.fromURL('static/print/form.png', async function (oImg) {
        oImg.left = 0;
        oImg.top = 0;
        canvas.add(oImg);
        canvas.sendToBack(oImg);
      });

      const imgElementPrivate = document.getElementById('qrPrivate');
      if (imgElementPrivate) {
        fabric.Image.fromURL(imgElementPrivate.src, async function (oImg) {
          oImg.left = 480;
          oImg.top = 1880;
          await canvas.add(oImg);
        });
      }


      const imgElementPublic = document.getElementById('qrPublic');
      fabric.Image.fromURL(imgElementPublic.src, function (oImg) {
        oImg.left = 480;
        oImg.top = 160;
        canvas.add(oImg);
      });

      let address = new fabric.Textbox(this.account.address, {
        fontFamily: 'Arial',
        width: 2000,
        left: 480,
        top: 580,
        fontSize: 56,
        fill: '#000',
        opacity: 1,
        textAlign: 'left',
        lockRotation: true,
        fixedWidth: 2000,
        fontWeight: 'bold',
      });
      if (address.width > address.fixedWidth) {
        address.fontSize *= address.fixedWidth / (address.width + 1);
        address.width = address.fixedWidth;
      }
      //address.setText(await this.sanitizeText(this.account.address));
      await canvas.add(address);

      let textPub = new fabric.Textbox(this.$i18n.t('wallet.paper_public', {ticker: this.coin.title}), {
        fontFamily: 'Courier',
        width: 1000,
        left: 930,
        top: 170,
        fontSize: 54,
        fill: '#000',
        opacity: 0.9,
        textAlign: 'left',
        lockRotation: true,
        fixedWidth: 800,
      });
      await canvas.add(textPub);

      fabric.Image.fromURL('static/print/coins/' + this.$route.params['id'] + '.png', function (img) {
        img.set({
          id: 'coin_logo',
          top: 1060,
          left: 320,
        });
        canvas.add(img).renderAll();
      });

      let titleLine = "";
      for (let i = 0; i < 10; i++) {
        titleLine = titleLine + this.coin.title + " ";
      }

      let title = new fabric.Text(titleLine, {
        fontFamily: 'Courier',
        width: 2400,
        left: 30,
        top: 880,
        fontSize: 72,
        fill: '#000',
        //opacity: 0.7,
        textAlign: 'left',
        lockRotation: true,
        //fontWeight: 'bold',

      });
      await canvas.add(title);


      const textKeyType = new fabric.Text(this.account.keyType.toUpperCase() + ' PRIVATE KEY', {
        fontFamily: 'Courier',
        width: 1500,
        fixedWidth: 1500,
        left: 900,
        top: 2150,
        fontSize: 54,
        fill: '#000',
        opacity: 0.9,
        textAlign: 'left',
        lockRotation: true,
        textShadow: '10px'
        //fontWeight: 'bold',
      });
      await canvas.add(textKeyType);


      let textPriv = new fabric.Textbox(this.$i18n.t('wallet.paper_private'), {
        fontFamily: 'Courier',
        width: 1500,
        fixedWidth: 1500,
        left: 900,
        top: 1910,
        fontSize: 50,
        fill: '#000',
        opacity: 0.9,
        textAlign: 'left',
        lockRotation: true,
      });
      await canvas.add(textPriv);


      let key = new fabric.Textbox(this.account.privateKey, {
        fontFamily: 'Arial',
        width: 1820,
        fixedWidth: 1820,
        left: 486,
        top: 2290,
        fontSize: 54,
        fill: '#000',
        //opacity: 0.9,
        textAlign: 'left',
        lockRotation: true,
        fontWeight: 'bold',
      });
      if (key.width > key.fixedWidth) {
        key.fontSize *= key.fixedWidth / (key.width + 1);
        key.width = key.fixedWidth;
      }
      //address.setText(await this.sanitizeText(this.account.address));
      await canvas.add(key);

      let textInfo = new fabric.Textbox(
          this.$i18n.t('wallet.info1') + " " + this.account.address + "\r\n" +
          this.$i18n.t('wallet.info2', {explorer: this.coin.explorer}) + "\r\n" +
          this.$i18n.t('wallet.info3', {wallet: this.coin.downloadWallet}) + "\r\n\r\n" +
          this.$i18n.t('wallet.info4') + "\r\n\r\n" +
          this.$i18n.t('wallet.info5'), {
            fontFamily: 'Courier',
            width: 2100,
            left: 180,
            top: 2780,
            fontSize: 40,
            fill: '#000',
            //opacity: 0.9,
            textAlign: 'left',
            lockRotation: true,
            fixedWidth: 2100,
          });
      await canvas.add(textInfo);

      //await canvas.setZoom(0.5);


      canvas.renderAll.bind(canvas);
      canvas.renderAll();

    }
  },
}
</script>

<style>
.qr-note {
  opacity: 0;
  width: 1px;
  height: 1px;
  display: none;
}

#canvas-note {
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  zoom: 0.16;
  /* display:none;*/
}

.canvas-container {
  max-width: 1000px !important;
  max-height: 1360px !important;
}

</style>
