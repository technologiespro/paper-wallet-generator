<template>
  <div class="w-100">
    <!--{{account}}-->
    <div class="button-list">
      <select class="form-control float-left bg-pattern text-white" v-model="theme" :style="this.$root.isMobile ? 'width:128px;' : 'width:200px;'">
        <option v-for="(item, idx) in themes" :value="item">{{ templates[$i18n.locale][idx] }}</option>
      </select>

      <b-button
          :disabled="!password"
          @click="loading"
          class="btn-soft-primary text-uppercase"
      ><i class="fas fa-dice"></i><span v-show="!this.$root.isMobile"> {{ $t('wallet.new_address') }}</span>
      </b-button>
      <b-button :disabled="!account.address" @click="saveImage" class="btn-soft-primary text-uppercase"><i
          class="fe-download"></i>
        <span v-show="!this.$root.isMobile">{{ $t('wallet.save') }} PNG</span>
      </b-button>
      <!--<b-button @click="generate" class="btn-soft-primary text-uppercase"><i class="fe-refresh-cw"></i> Refresh</b-button>-->
      <b-button v-show="!$root.isMobile" :disabled="!account.address" @click="walletPrint" class="btn-soft-primary text-uppercase"><i
          class="fe-printer"></i>
        <span>{{ $t('wallet.print') }}</span>
      </b-button>

      <!--
      <b-button :disabled="!account.address" @click="saveText" class="btn-soft-primary text-uppercase"><i class="fe-download"></i>
        Json
      </b-button>
-->


      <input v-model="password" :placeholder="$t('wallet.password')" type="text" class="form-control float-left ml-1"
             style="width: 200px;"/>
    </div>

    <hr class="clearfix"/>
    <atom-spinner
        class="position-absolute"
        v-show="spinner"
        :animation-duration="1000"
        :size="60"
        :color="'#ff1d5e'"
    />
    <div v-if="account.wif && password">
      <canvas @click="zoom = !zoom" id="canvas-note38" ref="can" width="2480" height="3508" :class="zoom ? 'zoom-max': 'zoom-min'"></canvas>
      <VueQrcode v-if="account.address" id="qrPublic38"
                 :options="{size:340, backgroundAlpha: 0.0, foreground: '#000', level: 'H'}"
                 :value="account.address" class="qr-note"/>
      <VueQrcode v-if="account.encrypted" id="qrPrivate38"
                 :options="{size:400, backgroundAlpha: 0.0, foreground: '#000', level: 'H'}"
                 :value="account.encrypted" class="qr-note"/>
    </div>

    <div class="pt-2" v-show="!account.wif || !spinner">
      <div v-if="$i18n.locale === 'ru'" class="text-white">
        <h5>Шифрование паролей BIP38 в Генераторе Бумажных кошельков:</h5>
        <ol>
          <li>Выберете дизайн бумажного кошелька</li>
          <li>
            Придумайте и введите пароль (кодовую фразу). Эта фраза потребуется для расшифровки приватного ключа (WIF)
            вашего кошелька.
          </li>
          <li>
            Сохраните пароль (кодовую фразу) в надежном месте! Если вы потеряете пароль (кодовую фразу), то не сможете
            расшифровать кошелек и восстановить доступ к нему.
          </li>
          <li>
            Готово! Вы зашифровали приватный ключ с помощью алгоритма шифрования BIP38. Теперь вы можете сохранить в PDF
            или распечатать зашифрованный бумажный кошелек.
          </li>
        </ol>

        <p class="text-warning">
          ВНИМАНИЕ! Закрытый ключ BIP38 всегда начинается с «6P». Прежде чем отправлять какие-либо средства на публичный
          адрес кошелька, зашифрованного BIP38, сначала
          выполните тест, чтобы убедиться, что пароль для шифрования вы запомнили верно и вы можете расшифровать
          закрытый ключ обратно в обычный формат WIF (Wallet import format).
        </p>

        <h5>Преимущества BIP38 шифрования приватного ключа:</h5>
        <ul>
          <li>
            Надежное хранение криптовалюты. Даже если вы потеряете кошелек, баланс криптовалют в кошельке будет в
            безопасности, так как парольная фраза, используемая для шифрования кошелька, не будет раскрыта.
          </li>
          <li>
            Только вы знаете свой пароль (кодовую фразу), которую вы использовали для шифрования приватного ключа.
            Запомните или сохраните ее в надежном месте.
          </li>
          <li>
            Безопасная печать кошелька в любой типографии или на любом принтере. Это удобно!
          </li>
          <li>
            Вы можете отправить зашифрованный бумажный кошелек по электронной почте или через личное сообщение в
            социальных сетях.
          </li>
        </ul>

        <p class="text-warning">
          Важно! Используйте пароль для шифрования, который вы никогда не забудете!!!
          Если вы зашифровали свой приватный ключ с помощью алгоритма шифрования BIP38 и потеряли кодовую фразу
          (пароль),то вы не сможете расшифровать кошелек и восстановить доступ к средствам, отправленным на этот
          кошелек.
          Паролем может быть всё что угодно - строка из любимой песни, день рождение актера или набор символов.
        </p>

        <h5>Как импортировать закрытый ключ BIP38?</h5>
        <p>
          Используйте функцию "Проверить" в приложении генератора.
          Для получения незашифрованного приватного ключа (WIF) от вашего адреса.
        </p>
        <p>
          Если у вас нет четкого понимания рабочего процесса шифрования и дешифрования BIP38, не шифруйте BIP38 свой
          бумажный кошелек. Просто распечатайте свой бумажный кошелек без шифрования и храните его в безопасности так
          же,
          как драгоценности или наличные деньги.
        </p>
      </div>

      <!-- eng -->

      <div v-else class="text-white">
        <h5>Encrypting BIP38 passwords in a Paper Waller Generator:</h5>
        <ol>
          <li>Choose a paper wallet design.</li>
          <li>
            Create and enter a password. You will need this phrase to decrypt a private key to your wallet (WIF).
          </li>
          <li>
            Save the password to a safe place! If you lose your password, you will not be able to decrypt your wallet
            and recover access to it.
          </li>
          <li>
            Click the generator button “New Address”.
          </li>
          <li>
            Done! You just encrypted your private key with a BIP38 encrypting algorithm. Now you can save your encrypted
            paper wallet as a PDF file or print it out.
          </li>
        </ol>

        <p class="text-warning">
          Advice! A BIP38 private key always begins with '6P'. Before you will send your funds to a public address of
          the wallet encrypted by BIP38, you need to test it. Make sure you remember a correct encrypting password and
          you are able to decrypt the private key back to the ordinary WIF (Wallet import format).
        </p>

        <p>
          You can choose any password – it may be a line from your favorite song, the birthday of your favorite actor,
          or a symbol sequence. If you want to use a well-known quote or a catchphrase, try to change it a little by
          adding symbols or making mistakes hard to predict.
        </p>


        <h5>Advantages of BIP38-encrypted private key:</h5>
        <ul>
          <li>
            Encrypting your private key used for the paper wallet of cryptocurrency can be a beneficial way of keeping
            your cryptocurrency safe and secure. Even if you will lose your paper wallet, the balance on the wallet is
            safe unless the password used to encrypt the wallet is guessed.
          </li>
          <li>
            Only you know your BIP38 password used to encrypt the private key. Memorize it or keep it in a safe place.
          </li>
          <li>
            Safe printing out of a wallet at any print shop or any printing device. So handy!
          </li>
          <li>
            You can send an encrypted paper wallet by email or social network private message.
          </li>
        </ul>

        <p class="text-warning">
          Warning! Use a password that you will never forget!!!
          If you encrypted your private key with BIP38 encrypting algorithm and lost your password, you will not be able
          to decrypt the wallet and recover access to funds sent to this wallet.
        </p>

        <h5>How to import a private BIP38 key?</h5>
        <ol>
          <li>Use a “Validate” option in a generator application.</li>
          <li>Get a decrypted private key WIF (Wallet import format).</li>
        </ol>
        <p>
          If you don’t have a clear understanding of the BIP38 encryption and decryption workflow, do not BIP38-encrypt
          your paper wallet. Just print your paper wallet out without encryption, and keep it safe the same way you
          would jewels or cash.
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import {fabric} from 'fabric';
import VueQrcode from '@/components/utils/QrCodeImg';
import {coins, templates} from "@/config";

const Bip38 = require('bip38');
const wif = require('wif');
import printJS from 'print-js';
import {AtomSpinner} from 'epic-spinners';
import eventBus from '@/plugins/event-bus'
import Swal from "sweetalert2";

var canvas = null

export default {
  name: "WalletPaper",
  components: {
    VueQrcode,
    AtomSpinner,
  },
  data() {
    return {
      spinner: false,
      theme: 0,
      themes: [],
      password: '',
      account: {
        address: '',
        wif: ''
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

  async created() {
    for (let i = 0; i < 38; i++) {
      this.themes.push(i);
    }
  },
  mounted() {
    let _self = this;
    window.onload = async function () {
      //console.log('loaded')
      //await _self.generate();
    }

  },
  methods: {
    async loading() {
      this.account = {
        address: '',
        wif: ''
      };
      await eventBus.emit('update:cons', this.account);
      this.spinner = true;
      setTimeout(async () => {
        await this.getNewAccounts();
        this.spinner = false;
      }, 1000);

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
      canvas.renderAll.bind(canvas);
      canvas.renderAll();
      this.generatedImg = null;
    },
    async getNewAccounts() {
      this.spinner = true;
      this.account.wif = '';
      this.account = (await this.generateAddress(this.$route.params['id'], 1))[0];
      let myWifString = this.account.wif;
      let decoded = wif.decode(myWifString)
      this.account.encrypted = Bip38.encrypt(decoded.privateKey, decoded.compressed, this.password);
      this.account.password = this.password;
      await this.$eventBus.emit('update:cons', this.account)
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
    async saveText() {
      this.account.password = this.password;
      this.jsonData = JSON.stringify(this.account);
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
      printJS(this.generatedImg, 'image')

      scaleRatio = Math.min((this.$root.w - 12)/canvas.width, this.$root.h/canvas.height)
      await canvas.setDimensions({ width: canvas.getWidth() * scaleRatio, height: canvas.getHeight() * scaleRatio });
      await canvas.setZoom(scaleRatio);
      canvas.renderAll.bind(canvas);

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
    async generate() {
      if (canvas) {
        canvas.dispose();
      }
      const ref = this.$refs.can;
      canvas = new fabric.StaticCanvas(ref);
      //canvas = new fabric.Canvas(ref);

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

      const imgElementPrivate = document.getElementById('qrPrivate38');
      if (imgElementPrivate) {
        fabric.Image.fromURL(imgElementPrivate.src, async function (oImg) {
          oImg.left = 480;
          oImg.top = 1880;
          await canvas.add(oImg);
        });
      }


      const imgElementPublic = document.getElementById('qrPublic38');
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

      let textPub = new fabric.Textbox(this.$i18n.t('wallet.paper_public', {ticker: this.coins.title}), {
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
        titleLine = titleLine + this.coins.title + " ";
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


      const textKeyType = new fabric.Text('PRIVATE KEY BIP38 ENCRYPTED', {
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


      let key = new fabric.Textbox(this.account.encrypted, {
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
          this.$i18n.t('wallet.info2', {explorer: this.coins.explorer}) + "\r\n" +
          this.$i18n.t('wallet.info3', {wallet: this.coins.downloadWallet}) + "\r\n\r\n" +
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
      //this.spinner = false;
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

#canvas-note38 {
  margin: 0 auto;
  width: 100%;
  height: 100vh;
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
