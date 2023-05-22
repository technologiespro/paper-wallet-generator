<template>
  <div class="w-100">
    <div class="button-list mb-1">
      <select class="form-control float-left bg-pattern text-white" v-model="theme" :style="this.$root.isMobile ? 'width:128px;' : 'width:200px;'">
        <option v-for="(item, idx) in themes" :value="item">{{ templates[$i18n.locale][idx] }}</option>
      </select>

      <b-button :disabled="!key" @click="loadAddress" class="btn-secondary text-uppercase"><i class="fe-check"></i> {{ $t('wallet.decrypt') }}
      </b-button>

      <b-button :disabled="!account.address" @click="saveImage" class="btn-soft-primary text-uppercase"><i
          class="fe-download"></i> PNG</b-button>

      <b-button :disabled="!account.address" @click="saveText" class="btn-soft-primary text-uppercase"><i class="fe-download"></i>
        Json
      </b-button>

      <b-button v-show="!$root.isMobile" :disabled="!account.address" @click="walletPrint" class="btn-soft-primary text-uppercase"><i
          class="fe-printer"></i>
      </b-button>

      <input v-model="key" @change= "changeKey" @input="changeKey" :placeholder="'private key or' " type="text" class="form-control float-left ml-1"
             style="width: 300px;" :class="this.$root.isMobile ? 'w-100' : ''"/>
      <input v-show="isBip38" v-model="password" :placeholder="'BIP38 ' + $t('wallet.password')" type="text"
             class="form-control float-left ml-1" style="width: 150px;"/>
    </div>


    <p>{{this.w}}x{{this.h}}px (A4)</p>
    <div v-if="generatedImg">
      <img class="w-100" :src="generatedImg"/>
    </div>

    <div v-if="account" class="top-scrollbars" :style="this.$root.w > this.w ? 'max-width: 1200px;overflow-x:scroll' : 'overflow-x:auto'">
      <atom-spinner
          class="position-absolute"
          v-show="spinner"
          :animation-duration="1000"
          :size="60"
          :color="'#ff1d5e'"
      />
      <canvas :style="generatedImg ? 'display:none;' : 'display:block;'" @click="ZoomInOut" id="canvas-note-load" ref="can" :width="this.$root.w" :height="this.$root.h" class="mt-4" :class="zoom ? 'zoom-max': 'zoom-min'"></canvas>
      <VueQrcode v-if="account.address" id="qrPublicLoad"
                 :options="{size:340, backgroundAlpha: 0.0, foreground: '#000', level: 'H'}"
                 :value="account.address" class="qr-note"/>
      <VueQrcode v-if="account.privateKey" id="qrPrivateLoad"
                 :options="{size:400, backgroundAlpha: 0.0, foreground: '#000', level: 'H'}"
                 :value="account.privateKey" class="qr-note"/>
    </div>

    <div v-if="$i18n.locale === 'ru'">
      <div v-show="isBip38" class="text-white">
        <h4>Импорт зашифрованного ключа BIP38</h4>
        <p>Используйте функцию "Проверить" в приложении генератора.
          Для получения незашифрованного приватного ключа (WIF) от вашего адреса, выполните несколько простых шагов:</p>
        <ol>
          <li>Выберете дизайн для бумажного кошелька.</li>
          <li>В строку с "Приватным Ключем" вставьте ключ, выданный при шифровании. Ключ, зашифрованный BIP38 всегда начинается с '6P...'. Он размещен в разделе "Приватный ключ" зашифрованного кошелька.</li>
          <li>В строку с "BIP38password" вставьте пароль (кодовую фразу), которую вы использовали для шифрования кошелька.</li>
          <li>Нажмите "Получить".</li>
          <li>Готово! Вы расшифровали бумажный кошелек и получили незашифрованный приватный ключ. Теперь вы можете использовать этот приватный ключ для доступа к вашим средствам, хранящимся на кошельке.</li>
        </ol>
        <p>В результате отображается расшифрованный приватный ключ и публичный адрес</p>
        <p>Если у вас нет четкого понимания рабочего процесса шифрования и дешифрования BIP38, не шифруйте BIP38 свой бумажный кошелек. Просто распечатайте свой бумажный кошелек без шифрования и храните его в безопасности так же, как драгоценности или наличные деньги.</p>
      </div>
    </div>
    <!-- english -->
    <div v-else>
      <div v-show="isBip38" class="text-white">
        <h4>Импорт зашифрованного ключа BIP38</h4>
        <p>Используйте функцию "Проверить" в приложении генератора.
          Для получения незашифрованного приватного ключа (WIF) от вашего адреса, выполните несколько простых шагов:</p>
        <ol>
          <li>Выберете дизайн для бумажного кошелька.</li>
          <li>В строку с "Приватным Ключем" вставьте ключ, выданный при шифровании. Ключ, зашифрованный BIP38 всегда начинается с '6P...'. Он размещен в разделе "Приватный ключ" зашифрованного кошелька.</li>
          <li>В строку с "BIP38password" вставьте пароль (кодовую фразу), которую вы использовали для шифрования кошелька.</li>
          <li>Нажмите "Получить".</li>
          <li>Готово! Вы расшифровали бумажный кошелек и получили незашифрованный приватный ключ. Теперь вы можете использовать этот приватный ключ для доступа к вашим средствам, хранящимся на кошельке.</li>
        </ol>
        <p>В результате отображается расшифрованный приватный ключ и публичный адрес</p>
        <p>Если у вас нет четкого понимания рабочего процесса шифрования и дешифрования BIP38, не шифруйте BIP38 свой бумажный кошелек. Просто распечатайте свой бумажный кошелек без шифрования и храните его в безопасности так же, как драгоценности или наличные деньги.</p>
      </div>
    </div>

  </div>
</template>

<script>
import {fabric} from 'fabric';
import VueQrcode from '@/components/utils/QrCodeImg';
import {coins, templates} from "@/config";
//const Bip38 = require('bip38');
const wif = require('wif');
import printJS from 'print-js';
import {AtomSpinner} from 'epic-spinners';
import eventBus from '@/plugins/event-bus'
import Swal from "sweetalert2";
let canvas = null

export default {
  name: "WalletPaper",
  components: {
    VueQrcode,
    AtomSpinner,
  },
  data() {
    return {
      isBip38: false,
      spinner: false,
      status: '',
      theme: 0,
      themes: [],
      password: '',
      key: '',
      account: {
        address: '',
        wif: '',
        privateKey: '',
        password: ''
      },
      generatedImg: null,
      coins: coins[this.$route.params['id']],
      jsonData: null,
      templates: templates,
      zoom: false,
      w: 2480,
      h: 3508,
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
  },
  mounted() {
    /*
    let _self = this;
    window.onload = async function () {
      //console.log('loaded')
      //await _self.generate();
    }


     */
  },
  methods: {
    async successmsg() {
      await Swal.fire({
        title: this.$t('wallet.success'),
        text: this.$t('wallet.success_download'),
        type: "success",
        confirmButtonClass: "btn btn-confirm mt-2",
      });
    },
    async loadAddress() {
      await this.loading();
    },
    async changeKey() {
      this.isBip38 = false;
      this.isBip38 = await this.isBIP38Format(this.key);
    },
    async isBIP38Format (key) {
      key = key.toString();
      return (/^6P[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{56}$/.test(key));
    },
    async loading() {

      this.account = {
        address: '',
        wif: '',
        privateKey: '',
        password: ''
      };
      await this.$eventBus.emit('update:cons', this.account);
      this.spinner = true;
      setTimeout(async () => {
        await this.getNewAccounts();
      }, 600);

    },
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
      this.spinner = true;
      let type = 'brain';
      if (this.key && this.password) {
        type = 'bip38';
      }

      if (this.key.length === 52) {
        type = 'wif';
      }

      this.account = (await this.generateAddress(this.$route.params['id'], 1, this.password, this.key, type))[0];
      await this.generate();
      await this.$eventBus.emit('update:cons', this.account);
    },
    loadCanvas(json) {
      // parse the data into the canvas
      canvas.loadFromJSON(json);
      // re-render the canvas
      canvas.renderAll();
      // optional
      canvas.calculateOffset();
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

    },
    async saveImage() {
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
      const link = document.createElement('a');
      link.download = this.$route.params['id'].toUpperCase() + '-' + this.account.address + '.png';
      link.href = this.generatedImg;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

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
      if (canvas) {
        canvas.dispose();
      }
      const ref = this.$refs.can;
      //canvas = new fabric.Canvas(ref);
      canvas = new fabric.StaticCanvas(ref);
      canvas.width = 2480;
      canvas.height = 3508;//3400;
      let scaleRatio = 1;
      scaleRatio = Math.min((this.$root.w - 12)/canvas.width, this.$root.h/canvas.height);

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

      const imgElementPrivate = document.getElementById('qrPrivateLoad');
      if (imgElementPrivate) {
        fabric.Image.fromURL(imgElementPrivate.src, async function (oImg) {
          oImg.left = 480;
          oImg.top = 1880;
          await canvas.add(oImg);
        });
      }


      const imgElementPublic = document.getElementById('qrPublicLoad');
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


      const textKeyType = new fabric.Text('PRIVATE KEY', {
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
      canvas.renderAll();
      this.spinner = false;
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

#canvas-note-load {
  margin: 0 auto;
  width: 100%;
  height: 100vh;
}

#canvas-note-load:hover {

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
