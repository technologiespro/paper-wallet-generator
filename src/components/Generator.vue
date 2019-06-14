<template>
  <div class="hello">
    <div v-if="mobile" class="container">
      <dm-button @click="showHideCoins" full-width color="black" class="mb-2">SELECT COIN</dm-button>
    </div>


    <div v-if="isShow" class="container-fluid">
      <div class="row">
        <span v-for="(item, idx) in coins" :key="idx" class="select-coin" @click="selectCoin(idx)">
            <img width="18px" alt="item.title" :src="item.logo"/> {{item.title}}
        </span>
      </div>
    </div>

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
                <tr v-if="address.keyHex && coins[currentCoin].validator !== 'btcValidator'">
                  <td>Seed</td>
                  <td><img src="static/svg/copy.svg" width="20px" class="clipboard"
                           v-clipboard="() => address.keyHex"
                           v-clipboard:success="clipboardSuccessHandler"/></td>
                  <td class="barley-white">{{address.keyHex}}</td>
                </tr>
                <tr v-if="coins[currentCoin].validator === 'btcValidator'">
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
  import sth from 'sthjs';
  import {entropyToMnemonic} from 'bip39';
  import { crypto  } from '@waves/waves-crypto'

  export default {
    name: 'Generator',
    components: {
      VueQrcode
    },
    data() {
      return {
        help: false,
        mobile: false,
        isShow: true,
        currentCoin: "post",
        coins: {
          "42": {
            title: "42-Coin",
            logo: "static/coins/42.png",
            public: 0x08,
            private: 0x88,
            validator: 'btcValidator'
          },
          "btc": {
            title: "Bitcoin",
            logo: "static/coins/btc.png",
            public: 0x0,
            private: 0x80,
            validator: 'btcValidator'
          },
          "btg": {
            title: "BitcoinGold",
            logo: "static/coins/btg.png",
            public: 0x26,
            private: 0x80,
            validator: 'btcValidator'
          },
          "dash": {
            title: "Dash",
            logo: "static/coins/dash.png",
            public: 0x4c,
            private: 0xcc,
            validator: 'btcValidator'
          },
          "doge": {
            title: "Dogecoin",
            logo: "static/coins/doge.png",
            public: 0x1e,
            private: 0x9e,
            validator: 'btcValidator'
          },
          "ltc": {
            title: "Litecoin",
            logo: "static/coins/ltc.png",
            public: 0x30,
            private: 0xb0,
            validator: 'btcValidator'
          },
          "nobt": {
            title: "NobtCoin",
            logo: "static/coins/nobt.png",
            public: 0xf,
            private: 0x55,
            validator: 'btcValidator'
          },
          "nvc": {
            title: "Novacoin",
            logo: "static/coins/nvc.png",
            public: 0x08,
            private: 0x88,
            validator: 'btcValidator'
          },
          "nmc": {
            title: "NameCoin",
            logo: "static/coins/nmc.png",
            public: 0x34,
            private: 0x80,
            validator: 'btcValidator'
          },
          "onion": {
            title: "DeepOnion",
            logo: "static/coins/onion.png",
            public: 0x1f,
            private: 0x9f,
            validator: 'btcValidator'
          },
          "post": {
            title: "PostCoin",
            logo: "static/coins/post.png",
            public: 0x37,
            private: 0xb7,
            validator: 'btcValidator'
          },
          "pivx": {
            title: "PIVX",
            logo: "static/coins/pivx.png",
            public: 0x1e,
            private: 0xd4,
            validator: 'btcValidator'
          },
          "sth": {
            title: "STH",
            logo: "static/coins/sth.png",
            public: 0x3f,
            private: 0xff,
            validator: 'sthGenerator'
          },
          /*
          "vtc": {
            title: "Vertcoin",
            logo: "static/coins/vtc.png",
            public: 0x47,
            private: 0x80,
            validator: 'btcValidator'
          },
          */
          "waves": {
            title: "WAVES",
            logo: "static/coins/waves.png",
            public: null,
            private: null,
            validator: 'wavesGenerator'
          },

        },
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
        if (this.coins[this.currentCoin].validator === 'btcValidator') {
          let privateKeyHex = cryptoRandomString({length: 64});
          const key = (new CoinKey(new Buffer.from(privateKeyHex, 'hex'), {
            private: this.coins[this.currentCoin].private,
            public: this.coins[this.currentCoin].public
          }));
          this.address.keyHex = privateKeyHex;
          this.address.publicAddress = key.publicAddress;
          this.address.privateWif = key.privateWif;
        }

        if (this.coins[this.currentCoin].validator === 'sthGenerator') {
          const privateKeyHex = cryptoRandomString({length: 32});
          const mnemonic = entropyToMnemonic(privateKeyHex);
          const PUB_KEY = sth.crypto.getKeys(mnemonic).publicKey;
          this.address.publicAddress = sth.crypto.getAddress(PUB_KEY);
          this.address.privateWif = mnemonic;
        }

        if (this.coins[this.currentCoin].validator === 'wavesGenerator') {
          const { randomSeed } = crypto()
          const seed = randomSeed()
          const { keyPair } = crypto()
          const kp = keyPair(seed)
          this.address.publicAddress = kp.publicKey;
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
    mounted: function () {
      if (screen.width < 700) {
        this.mobile = true;
        this.isShow = false;
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h2 {
    color: #A9C7DF;
  }

  .hello {
    flex: 1 0 auto;
  }

  a {
    color: #42b983;
  }

  .barley-white {
    color: #FFF5CD
  }

  ul {
    list-style-type: none;
  }

  .instruction {
    background: #18191A;
    overflow: hidden;
    line-height: 140%;
  }

  .select-coin {
    float: left;
    margin-right: 4px;
    margin-left: 4px;
    padding: 5px;
    border: solid 1px #323E4F;
    background: #18191A;
    width: 118px;
    min-width: 118px;
    border-radius: 5px;
    margin-bottom: 6px;
  }

  .select-coin:hover {
    cursor: pointer;
    background: #323E4F
  }

  .clipboard:hover {
    color: #28a745 !important;
    cursor: pointer;
    border: solid 1px #232d3d;

  }

  .qr-container {
    width: 50%;
    float: left;
    margin: 0 auto;
  }

  @media screen and (max-width: 700px) {
    .select-coin {
      width: 47% !important;
      margin-left: 1% !important;
    }

    .instruction p {
      font-size: 0.85em !important;
      line-height: 140%;
    }

  }
</style>
