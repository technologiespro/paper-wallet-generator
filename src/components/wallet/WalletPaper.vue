<template>
  <div class="w-100">
    <!--{{account}}-->
    <div class="button-list mb-1">

      <select class="form-control float-left bg-pattern text-white mb-1 ml-1" v-model="theme" :style="this.$root.isMobile ? 'width:128px;' : 'width:200px;'">
        <option v-for="(item, idx) in themes" :value="item">{{ templates[$i18n.locale][idx] }}</option>
      </select>

      <b-button
          @click="getNewAccounts"
          class="btn-soft-primary text-uppercase"
      ><i class="fas fa-dice"></i> <span v-show="!$root.isMobile">{{ $t('wallet.new_address') }}</span>
      </b-button>

      <b-button v-if="account" @click="saveImage" class="btn-soft-primary text-uppercase"><i
          class="fe-download"></i>
        <span v-show="!$root.isMobile">{{ $t('wallet.save') }} </span>PNG
      </b-button>

      <b-button :disabled="!account" @click="saveText" class="btn-soft-primary text-uppercase"><i class="fe-download"></i>
        Json
      </b-button>

      <!--<b-button @click="generate" class="btn-soft-primary text-uppercase"><i class="fe-refresh-cw"></i> Refresh</b-button>-->
      <b-button v-show="!$root.isMobile" @click="walletPrint" class="btn-soft-primary text-uppercase"><i class="fe-printer"></i>
        <span>{{ $t('wallet.print') }}</span>
      </b-button>


    </div>

    <!--<base-button @click="saveCanvasJson">Save Json</base-button>-->
  <p>{{this.w}}x{{this.h}}px (A4)</p>
    <div v-if="generatedImg">
      <img class="w-100" :src="generatedImg"/>
    </div>


    <div v-if="account" class="top-scrollbars" :style="this.$root.w > this.w ? 'max-width: 1200px;overflow-x:scroll' : 'overflow-x:auto'">

      <div v-show="processLoading" class="ml-auto position-absolute">
        <pixel-spinner
            class="ml-auto mr-auto"
            :animation-duration="2000"
            :size="70"
            color="darkgreen"
        />
      </div>


      <canvas :style="generatedImg ? 'display:none;' : 'display:block;'" @click="ZoomInOut" id="canvas-note" ref="can" :width="this.$root.w" :height="this.$root.h" :class="zoom ? 'zoom-max': 'zoom-min'"></canvas>
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
import {templates} from "@/config";
import coins from "@/coins";
//const bip38 = require('bip38');
//const wif = require('wif');
import printJS from 'print-js';
import eventBus from '@/plugins/event-bus'
import { PixelSpinner } from 'epic-spinners'
import Swal from "sweetalert2";

var canvas = null

export default {
  name: "WalletPaper",
  components: {
    VueQrcode,
    PixelSpinner,
    Swal,
  },
  data() {
    return {
      processLoading: false,
      theme: 0,
      themes: [],
      account: null,
      generatedImg: null,
      //coins: coins[this.$route.params['id']],
      jsonData: null,
      templates: templates,
      zoom: false,
      coin: {},
      w: 2480,
      h: 3508,
    }
  },

  watch: {
    async theme() {
      await this.themeSelect();
    },

  },
  /*
  computed: {
    coin() {
      return coins[this.$route.params['id']];
    }
  },

   */
  async created() {
    this.coin = coins[this.$route.params['id']]
    for (let i = 0; i < 38; i++) {
      this.themes.push(i);
    }
    //await this.getNewAccounts()
    let _self = this;
    //await this.getNewAccounts()
    setTimeout(async () => {
      //await _self.generate();
      await _self.getNewAccounts();
      //canvas.renderAll.bind(canvas);
      //canvas.renderAll();
    }, 1600);

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
      this.generatedImg = null;
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
    async saveText() {
      this.account.password = this.password;
      this.jsonData = JSON.stringify(this.account);

      var _self = this;
      document.addEventListener('deviceready', onDeviceReady, false);
      async function onDeviceReady () {
        try {
          let response = await fetch('data:text/plain;charset=utf-8,' + encodeURIComponent(_self.jsonData));
          let blob = await response.blob();
          let uri = await cordova.plugins.saveDialog.saveFile(blob, _self.$route.params['id'].toUpperCase() + '-' + _self.account.address + ".json");
          //document.body.removeChild(link);
          //_self.generatedImg = null;
          //await _self.successmsg();
        } catch (e) {
          //alert(e)
          //console.error(e);
        }
      }

      const blob = new Blob([this.jsonData], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
      a.download = this.$route.params['id'].toUpperCase() + '-' + this.account.address + ".json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
    async walletPrint() {
      this.processLoading = true;
      let scaleRatio = 1;
      await canvas.setDimensions({ width: this.w * scaleRatio, height: this.h * scaleRatio });
      await canvas.setZoom(scaleRatio);

      this.generatedImg = canvas.toDataURL({
        format: "png",
        left: 0,
        top: 0,
        width: canvas.width,
        height: canvas.height,
      });
      printJS(this.generatedImg, 'image');

      scaleRatio = Math.min((this.$root.w - 12)/canvas.width, this.$root.h/canvas.height)
      await canvas.setDimensions({ width: canvas.getWidth() * scaleRatio, height: canvas.getHeight() * scaleRatio });
      await canvas.setZoom(scaleRatio);
      canvas.renderAll.bind(canvas);
      setTimeout(async () => {
        this.processLoading = false;
      }, 500);
    },
    async successmsg() {
      await Swal.fire({
        title: this.$t('wallet.success'),
        text: this.$t('wallet.success_download'),
        type: "success",
        confirmButtonClass: "btn btn-confirm mt-2",
      });
    },
    async saveImage() {
      this.processLoading = true;
      let scaleRatio = 1;
      await canvas.setDimensions({ width: this.w * scaleRatio, height: this.h * scaleRatio });
      await canvas.setZoom(scaleRatio);

      this.generatedImg = await canvas.toDataURL({
        format: "png",
        left: 0,
        top: 0,
        width: canvas.width,
        height: canvas.height,
      });

      let link = document.createElement('a');
      link.download =  this.$route.params['id'].toUpperCase() + '-' + this.account.address + '.png';
      link.href = this.generatedImg;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      scaleRatio = Math.min((this.$root.w - 12)/canvas.width, this.$root.h/canvas.height)
      await canvas.setDimensions({ width: canvas.getWidth() * scaleRatio, height: canvas.getHeight() * scaleRatio });
      await canvas.setZoom(scaleRatio);
      canvas.renderAll.bind(canvas);

      document.addEventListener('deviceready', onDeviceReady, false);
      var _self = this;
      async function onDeviceReady () {
        try {
          let response = await fetch(link.href);
          let blob = await response.blob();
          let uri = await cordova.plugins.saveDialog.saveFile(blob, link.download);
          document.body.removeChild(link);
          //_self.generatedImg = null;
          await _self.successmsg();
        } catch (e) {
          //console.error(e);
        }
      }

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
    async ZoomInOut() {
      if (this.$root.isMobile) {
        return;
      }
      this.zoom = !this.zoom;
      let scaleRatio = 1;
      if (this.zoom) {
        await canvas.setDimensions({ width: this.w * scaleRatio, height: this.h * scaleRatio });
      } else {
        if (this.$root.w > this.$root.h) {
          scaleRatio = Math.min((this.$root.h - 12)/canvas.width, this.$root.w/canvas.height);
        } else {
          scaleRatio = Math.min((this.$root.w - 12)/canvas.width, this.$root.h/canvas.height);
        }
        await canvas.setDimensions({ width: canvas.getWidth() * scaleRatio, height: canvas.getHeight() * scaleRatio });
      }
      await canvas.setZoom(scaleRatio);
      canvas.renderAll.bind(canvas);
    },
    async generate() {
      this.generatedImg = null;
      this.processLoading = true;
      if (canvas) {
        canvas.dispose();
      }
      const ref = this.$refs.can;
      //canvas = new fabric.Canvas(ref);
      canvas = new fabric.StaticCanvas(ref);
      canvas.width = 2480;
      canvas.height = 3508;

      let scaleRatio = 1;
      scaleRatio = Math.min((this.$root.w - 12)/canvas.width, this.$root.h/canvas.height);

      await canvas.setBackgroundImage('static/print/bg/' + this.theme + '.png', canvas.renderAll.bind(canvas), {
        top: 0,
        left: 0,
        originX: 'left',
        originY: 'top',
        scaleX: 1,
        scaleY: 1,
        backgroundImageStretch: false,
      });

      //fabric.isWebglSupported(fabric.textureSize);

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

      await canvas.setDimensions({ width: canvas.getWidth() * scaleRatio, height: canvas.getHeight() * scaleRatio });
      await canvas.setZoom(scaleRatio);


      canvas.renderAll.bind(canvas);
      //canvas.renderAll();
      setTimeout(async () => {
        this.processLoading = false;
      }, 500);

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
  /* display:none;*/
}

.canvas-container {
  max-width: 1000px !important;
  max-height: 1360px !important;
}

div.top-scrollbars {
  transform: rotateX(180deg);
}
div.top-scrollbars * {
  transform: rotateX(180deg);
}

</style>
