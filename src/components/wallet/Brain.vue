<template>
  <div>
    <div class="button-list">
      <div class="row">

        <b-button
            :disabled="!password"
            @click="getNewAccounts"
            class="col-md-3 btn-soft-primary text-uppercase"
        ><i class="fas fa-dice"></i> {{ $t('wallet.new_address') }}
        </b-button>

        <b-button :disabled="!accounts[0] || !password" @click="saveText" class="btn-soft-primary text-uppercase"><i
            class="fe-download"></i>
          Json
        </b-button>


        <input v-model="password" :placeholder="$t('wallet.password')" type="text" class="col-md-6 form-control ml-1"/>
      </div>


    </div>
    <hr/>
    <div class="clearfix"></div>
    <div class="row" v-if="accounts[0]">
      <div class="col-md-6 text-center border-right">
        <h4 class="text-success text-uppercase"><span class="badge badge-success font-weight-light"><i
            class="ri-wallet-line"></i></span> Address</h4>
        <VueQrcode :options="{size:150, foreground: '#232D3D',level: 'H'}" :value="accounts[0].address"
                   id="qrPubBrain"/>
        <p class="text-white">{{ accounts[0].address }}</p>
        <hr/>
        <p>You can send your funds to the above address.</p>
      </div>
      <div class="col-md-6 text-center">
        <h4 class="text-danger text-uppercase"><span class="badge badge-danger font-weight-light">
          <i
              class="ri-key-2-line"></i></span> Private Key <span v-show="this.coins.generator === 'btcGenerator'">SHA256</span>
        </h4>
        <VueQrcode :options="{size:150, foreground: '#232D3D',level: 'H'}" :value="accounts[0].wif"
                   id="qrPrivBrain"/>
        <p class="text-warning">{{ accounts[0].privateKey }}</p>
        <hr/>

        <p v-show="accounts[0].privateKey !== accounts[0].wif && accounts[0].keyType !== 'bip39'">
          WIF <span class="text-warning">{{ accounts[0].wif }}</span>
        </p>
        <p>
          <i class="mdi mdi-alert-outline text-danger" style="font-size: 28pt;"></i><br/>
          <span class="font-weight-bolder">DO NOT REVEAL or SHARE THIS KEY</span> with anyone. These key/words provide
          complete access to funds stored on this wallet.
        </p>

      </div>
    </div>

    <div v-show="this.coins.generator === 'btcGenerator'" role="tablist" class="mb-3">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" role="tab">
          <h5 class="m-0">
            <a
                v-b-toggle.customaccordion-1
                class="text-dark"
                href="javascript: void(0);"
            >
              <i class="mdi mdi-help-circle mr-1 text-primary"></i> {{ $t('wallet.how_to_import') }}
            </a>
          </h5>
        </b-card-header>
        <b-collapse
            id="customaccordion-1"
            visible
            aria-expanded="false"
            accordion="accordion"
            role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              <ul>
                <li>{{ $t('import.open') }}</li>
                <li>{{ $t('import.select') }}</li>
                <li>{{ $t('import.enter') }}</li>
                <li>{{ $t('import.wait') }}</li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <div class="" v-show="!account.wif || !spinner">
      <div v-if="$i18n.locale === 'ru'" class="text-white">
        <h4>Мозговой кошелек — это способ хранения криптовалют в памяти путем запоминания парольной фразы</h4>
        <p>
          Вы можете придумать свою собственную парольную фразу, на основе которой будет сгенерирован публичный адрес и
          приватный ключ для выбранной криптовалюты. Вам не нужно записывать парольную фразу, так как вы ее храните у
          себя в голове, поэтому такой тип кошельков называется Мозговой.
        </p>
        <h5>Как создать Мозговой кошелек:</h5>
        <ol>
          <li>Придумайте уникальный надежный пароль.</li>
          <li>Нажмите "Новый Адрес".</li>
          <li>Мозговой кошелек готов!</li>
        </ol>
        <p>
          Для биткоина и биткоин-подобных монет, пароль шифруется функцией хеш-кодирования SНА 256 для получения
          закрытого ключа, который затем используется для генерации криптовалютного адреса. Если вам потребуется
          приватный ключ от вашего адреса, необходимо ввести придуманный пароль и нажать сгенерировать. Адрес,
          сгенерированный по указанному паролю, всегда неизменен!
        </p>
        <p>
          Для других криптовалют, например SmartHoldem STH, Вы можете придумать парольную фразу, которая будет являться
          приватной фразой для вашего кошелька и использовать ее по умолчанию.
        </p>
        <h5>Как обезопасить свой Мозговой кошелек?</h5>
        <ul>
          <li>Не используйте парольные фразы, созданные людьми, поскольку они предсказуемы. Никогда не выбирайте что-то
            из опубликованной литературы.
          </li>
          <li>Если Вы используете распространенную или знаменитую фразу, попробуйте немного изменить ее добавив символы
            или написать слова с ошибками, которые трудно предсказать.
          </li>
        </ul>

        <h4>Использование мозгового кошелька имеет свои плюсы и минусы</h4>
        <h5>Преимущества</h5>
        <ul>
          <li>Только вы знаете мнемонику в своем мозгу, поэтому вам просто нужно доверять своей памяти.</li>
          <li>Нет никаких письменных записей или возможности онлайн-взлома.</li>
        </ul>

        <h5>Недостатки</h5>
        <ul>
          <li>Если вы страдаете каким-либо заболеванием, таким как амнезия или слабоумие, вы потеряете ключи от монет,
            забыв их.
          </li>
          <li>Поскольку нет письменной резервной копии, если вы забудете свою мнемоническую фразу, ваши средства будут
            потеряны навсегда.
          </li>
        </ul>
      </div>
      <!--english -->
      <div v-else class="text-white">
        <h4>A Brain wallet is a type of crypto cold storage in your mind by memorizing the mnemonic password of your
          cryptocurrency wallet in your brain.</h4>
        <p>
          You can create your mnemonic password as a base for generating a public address and a private key for a
          cryptocurrency you want to keep. You don’t need to write down the password – you memorize it in your brain.
          That’s why this type of wallet is called a Brain wallet.
        </p>
        <h5>How to create a Brain wallet:</h5>
        <ol>
          <li>Create a unique and safe password.</li>
          <li>Click “New Address”.</li>
          <li>Your Brain Wallet is ready to use!</li>
        </ol>
        <p>
          The password can be seen as a unique and unrepeatable representation of the "entropy" that will be used to
          build the private and public keys of your brain wallet.
        </p>
        <p>
          The security of a brain wallet depends mainly on the password that you choose to form the "seed" of your
          wallet. That’s why to have a safe brain wallet you must choose unique hard-to-guess phrases.
        </p>
        <p>
          When keeping bitcoins or bitcoin-based currency is concerned, a password is encrypted with SHA-256
          cryptographic hash algorithm to create a private key. This key is used to generate a public address. If you
          need a private key to your address, enter your password and click “Generate”. An address generated with the
          password entered is always the same! That is, if you enter the same password over and over again, the result
          will be the same, regardless of the time, place, or operating system you use to generate the wallet.
        </p>
        <p>
          When keeping other cryptocurrencies, for example, SmartHoldem STH, you can create a passphrase, which will be
          a private passphrase for your wallet. You can use it as a default one.
        </p>
        <h5>How to make your Brain wallet secure?</h5>
        <ul>
          <li>
            Don’t use human-created passphrases as they can be predicted. Never use something published in books or
            other sources. There are programs constantly scanning the blockchain for easy-to-crack brain wallets. One
            researcher created some wallets from song lyrics and book passages, all of which were cracked in a day.
          </li>
          <li>
            If you want to use a well-known quote or a catchphrase, try to change it by adding symbols or making
            mistakes hard to predict.
          </li>
        </ul>

        <h4>Pros & cons of a Brain Wallet</h4>
        <ul>
          <li>Brain wallets are free.</li>
          <li>If your mnemonic password is completely memorized and 100% unique — your brain wallet would be
            impenetrable.
          </li>
          <li>A brain wallet is immune to both online and offline attacks.</li>
        </ul>

        <h5>Cons of Using a Brain Wallet</h5>
        <ul>
          <li>
            In case you suffer from some medical condition like amnesia or dementia, you may forget your keys and lose
            coins.
          </li>
          <li>
            Since there is no paper backup record, you may forget your mnemonic phrase and your coins will be lost
            forever.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {coins} from "@/config";
import VueQrcode from '@/components/utils/QRCode';
import sha256 from 'crypto-js/sha256';
import eventBus from '@/plugins/event-bus'

export default {
  name: "WalletBrain",
  components: {
    VueQrcode,
  },
  data() {
    return {
      spinner: false,
      account: {},
      key: '',
      password: '',
      coins: coins[this.$route.params['id']],
      accounts: [],
    };
  },
  methods: {
    async saveText() {
      this.account.password = this.password;
      this.jsonData = JSON.stringify(this.account);
      const blob = new Blob([this.jsonData], {type: 'text/plain'})

      var _self = this;
      document.addEventListener('deviceready', onDeviceReady, false);

      async function onDeviceReady() {
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

      const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
      a.download = this.$route.params['id'].toUpperCase() + '-' + this.account.address + ".json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
    async getNewAccounts() {
      document.addEventListener('deviceready', onDeviceReady, false);
      var _self = this;

      async function onDeviceReady() {
        cordova.plugins.Keyboard.close
      }

      this.spinner = true;
      this.key = this.password;
      if (this.coins.generator === 'btcGenerator') {
        this.key = sha256(this.password).toString();
      }
      this.accounts = await this.generateAddress(this.$route.params['id'], 1, this.password, this.key, 'brain');
      this.account = this.accounts[0];
      this.account.password = this.password;

      await this.$eventBus.emit('update:cons', this.account);
      this.spinner = false;
    },
  },
  async created() {
    //await this.getNewAccounts();
    this.$root.coin = this.$route.params['id'];
  },
}
</script>

<style scoped>

</style>
