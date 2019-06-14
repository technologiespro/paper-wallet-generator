<template>
  <div>
    <div class="container-fluid">
      <img width="96px" alt="coin logo" :src="coins[currentCoin].logo"/>
      <h2>{{coins[currentCoin].title}} Wallet</h2>

      <dm-button size="large" @click="generateAddress" color="black">Generate new {{coins[currentCoin].title}} address
      </dm-button>

      <div class="container mt-4">
        <div class="result-generate" v-if="address.publicAddress">
          <div class="row">

            <div class="col-md-5">

              <div class="qr-container">
                <VueQrcode :value="address.publicAddress" :options="{size:125, foreground: '#232D3D',level: 'H'}"/>
                <p class="text-secondary">Public Address</p>
              </div>


              <div class="qr-container">
                <VueQrcode :value="address.privateWif" :options="{size:125, foreground: '#232D3D',level: 'H'}"/>
                <p class="text-secondary">Private Key</p>
              </div>
            </div>

            <div class="col-md-7">
              <table class="table table-responsive-sm text-info">
                <tr>
                  <td class="text-right">Address</td>
                  <td>
                    <img src="static/svg/copy.svg" width="20px" class="clipboard"
                         v-clipboard="() => address.publicAddress"
                         v-clipboard:success="clipboardSuccessHandler"/>
                  </td>
                  <td class="text-left">
              <span class="barley-white">
                {{address.publicAddress}}
              </span>
                  </td>
                </tr>
                <tr>
                  <td class="text-right">PrivateKey</td>
                  <td>
                    <img src="static/svg/copy.svg" width="20px" class="clipboard"
                         v-clipboard="() => address.privateWif"
                         v-clipboard:success="clipboardSuccessHandler"/>
                  </td>
                  <td class="text-left">
                    <span class="barley-white">{{address.privateWif}}</span>
                  </td>
                </tr>
                <tr v-if="address.keyHex && coins[currentCoin].generator !== 'btcGenerator'">
                  <td>Seed</td>
                  <td><img src="static/svg/copy.svg" width="20px" class="clipboard"
                           v-clipboard="() => address.keyHex"
                           v-clipboard:success="clipboardSuccessHandler"/></td>
                  <td class="barley-white">{{address.keyHex}}</td>
                </tr>
                <tr v-if="coins[currentCoin].generator === 'btcGenerator'">
                  <td></td>
                  <td @click="showHideHelp"><img src="static/svg/help.svg" width="20px"></td>
                  <td></td>
                </tr>
              </table>

            </div>


          </div>
          <small class="text-success">~ {{copied}} ~</small>

        </div>

      </div>
    </div>
    <dm-divider></dm-divider>

    <div v-if="help" class="container instruction p-3 mb-5">
      <ul>
        <li>
          <dm-list-item icon-size="15" :number=1>Open Your {{coins[currentCoin].title}} Wallet</dm-list-item>
        </li>
        <li>
          <dm-list-item :number=2>Select: <span class="text-info">Help > Debug window > Console</span></dm-list-item>
        </li>
        <li>
          <dm-list-item :number=3>Enter: <span class="text-info">importprivkey {{address.privateWif}} PaperWallet</span>
          </dm-list-item>
        </li>
        <li>
          <dm-list-item :number=4>Wait for the import to complete and then restart the wallet</dm-list-item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import CoinKey from 'coinkey';
  import cryptoRandomString from 'crypto-random-string';
  import VueQrcode from '@/components/utils/QRCode';

  export default {
    name: "BtcGenerator",
    components: {
      VueQrcode
    },
    props: {
      coin: Object
    },
    data() {
      return {
        help: false,
        mobile: false,
        isShow: true,
        currentCoin: "post",
        address: {
          keyHex: null,
          publicAddress: null,
          privateWif: null,
        },
        copied: null
      }
    },
    methods: {
      showHideCoins: function () {
        this.isShow = this.isShow ? false : true;
      },
      showHideHelp: function () {
        this.help = this.help ? false : true;
      },
      generateAddress: function () {
        if (this.coins[this.currentCoin].generator === 'btcGenerator') {
          let privateKeyHex = cryptoRandomString({length: 64});
          const key = (new CoinKey(new Buffer.from(privateKeyHex, 'hex'), {
            private: this.coins[this.currentCoin].private,
            public: this.coins[this.currentCoin].public
          }));
          this.address.keyHex = privateKeyHex;
          this.address.publicAddress = key.publicAddress;
          this.address.privateWif = key.privateWif;
        }

        if (this.coins[this.currentCoin].generator === 'sthGenerator') {
          const privateKeyHex = cryptoRandomString({length: 32});
          const mnemonic = entropyToMnemonic(privateKeyHex);
          const PUB_KEY = sth.crypto.getKeys(mnemonic).publicKey;
          this.address.publicAddress = sth.crypto.getAddress(PUB_KEY);
          this.address.privateWif = mnemonic;
        }

        if (this.coins[this.currentCoin].generator === 'wavesGenerator') {
          const {randomSeed} = crypto()
          const seed = randomSeed()
          const {address, keyPair} = crypto()
          const kp = keyPair(seed)
          this.address.publicAddress = address(seed);
          this.address.privateWif = kp.privateKey;
          this.address.keyHex = seed;
        }

      },
      selectCoin: function (selectedCoin) {
        this.help = false;
        this.currentCoin = selectedCoin;
        this.address = {
          keyHex: null,
          publicAddress: null,
          privateWif: null,
        };

        if (this.mobile) {
          this.isShow = false;
        }
      },
      clipboardSuccessHandler({value, event}) {
        this.copied = 'Copied to clipboard';
        setTimeout(() => (this.copied = null), 1500);
        // Copied to clipboard
      },
    },
  }
</script>

<style scoped>

</style>
