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
      <h2>{{coins[currentCoin].title}} <span class="text-white small">[{{currentCoin.toUpperCase()}}]</span></h2>

      <dm-button size="large" @click="generateAddress" color="black">Generate new {{coins[currentCoin].title}} address</dm-button>
      <img v-if="address.publicAddress" @click="pdfDownload" src="static/svg/pdf.svg" width="40px" class="ml-2">

      <div class="container mt-4">
        <div class="result-generate" v-if="address.publicAddress">
          <div class="row">

            <div class="col-md-5">

              <div class="qr-container">
                <VueQrcode id="canvasPub" :value="address.publicAddress" :options="{size:125, foreground: '#232D3D',level: 'H'}"/>
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
  import sth from 'sthjs';
  import {entropyToMnemonic, mnemonicToSeed} from 'bip39';
  import { crypto  } from '@waves/waves-crypto';
  import ethWallet from 'ethereumjs-wallet';
  import jsPDF from 'jspdf'
  import image2base64 from 'image-to-base64'

  export default {
    name: 'Generator',
    components: {
      VueQrcode,
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
          seed: null
        },
        copied: null,
        coins: {
          "post": {
            title: "PostCoin",
            logo: "static/coins/post.png",
            public: 0x37,
            private: 0xb7,
            generator: 'btcGenerator'
          },
          "btc": {
            title: "Bitcoin",
            logo: "static/coins/btc.png",
            public: 0x0,
            private: 0x80,
            generator: 'btcGenerator',
          },
          "nobt": {
            title: "NobtCoin",
            logo: "static/coins/nobt.png",
            public: 0xf,
            private: 0x55,
            generator: 'btcGenerator'
          },
          "42": {
            title: "42-Coin",
            logo: "static/coins/42.png",
            public: 0x08,
            private: 0x88,
            generator: 'btcGenerator',
          },
          "btg": {
            title: "BitcoinGold",
            logo: "static/coins/btg.png",
            public: 0x26,
            private: 0x80,
            generator: 'btcGenerator'
          },
          "dash": {
            title: "Dash",
            logo: "static/coins/dash.png",
            public: 0x4c,
            private: 0xcc,
            generator: 'btcGenerator'
          },
          "onion": {
            title: "DeepOnion",
            logo: "static/coins/onion.png",
            public: 0x1f,
            private: 0x9f,
            generator: 'btcGenerator'
          },
          "doge": {
            title: "Dogecoin",
            logo: "static/coins/doge.png",
            public: 0x1e,
            private: 0x9e,
            generator: 'btcGenerator'
          },
          "eth": {
            title: "Ethereum",
            logo: "static/coins/eth.png",
            public: null,
            private: null,
            generator: 'ethGenerator'
          },
          "ltc": {
            title: "Litecoin",
            logo: "static/coins/ltc.png",
            public: 0x30,
            private: 0xb0,
            generator: 'btcGenerator'
          },
          "nvc": {
            title: "Novacoin",
            logo: "static/coins/nvc.png",
            public: 0x08,
            private: 0x88,
            generator: 'btcGenerator'
          },
          "nmc": {
            title: "NameCoin",
            logo: "static/coins/nmc.png",
            public: 0x34,
            private: 0x80,
            generator: 'btcGenerator'
          },
          "pivx": {
            title: "PIVX",
            logo: "static/coins/pivx.png",
            public: 0x1e,
            private: 0xd4,
            generator: 'btcGenerator'
          },
          "xsm": {
            title: "Smilo",
            logo: "static/coins/xsm.png",
            public: null,
            private: null,
            generator: 'ethGenerator'
          },
          "sth": {
            title: "STH",
            logo: "static/coins/sth.png",
            public: 0x3f,
            private: 0xff,
            generator: 'sthGenerator'
          },
          "vrc": {
            title: "Vericoin",
            logo: "static/coins/vrc.png",
            public: 0x46,
            private: 0x84,
            generator: 'btcGenerator'
          },
          "vrm": {
            title: "Verium",
            logo: "static/coins/vrm.png",
            public: 0x46,
            private: 0x84,
            generator: 'btcGenerator'
          },
          "waves": {
            title: "WAVES",
            logo: "static/coins/waves.png",
            public: null,
            private: null,
            generator: 'wavesGenerator'
          },
           /*
          "vtc": {
            title: "Vertcoin",
            logo: "static/coins/vtc.png",
            public: 0x47,
            private: 0x80,
            generator: 'btcGenerator'
          },
          */
        },
      }
    },
    methods: {
      pdfDownload () {
        var doc = new jsPDF({
          orientation: 'landscape',
          pagesplit: true,
          //format: [900, 510]
        });

        image2base64(this.coins[this.currentCoin].logo) // you can also to use url
          .then(
            (response) => {
              var imgData = 'data:image/png;base64,' + response;
              doc.addImage(imgData, 'PNG', 9, 5, 20, 20);

              doc.setFontSize(35);
              doc.text(this.coins[this.currentCoin].title + ' Paper Wallet', 33, 18);

              doc.setFontSize(14);
              doc.text('Public Address: ' + this.address.publicAddress, 12, 40);
              doc.text('Private Key: ' + this.address.privateWif, 12, 50);

              if (this.coins[this.currentCoin].generator !== 'btcGenerator' && this.address.keyHex) {
                doc.text('Seed: ' + this.address.keyHex, 12, 60);
              }

              doc.textWithLink('XBTS DEX', 12, 200, { url: 'https://ex.xbts.io' });
              doc.textWithLink('GitHub', 50, 200, { url: 'https://github.com/technologiespro/paper-wallet-generator/releases' });


              var canvas = document.getElementById('canvasPub');
              doc.addImage(canvas.toDataURL("image/png"), 'PNG', 12, 80, 40, 40);

              doc.addImage(canvas.toDataURL("image/png"), 'PNG', 90, 80, 40, 40);

              doc.save(this.coins[this.currentCoin].title + '-PaperWallet' + '.pdf');

            }
          )
          .catch(
            (error) => {
              console.log(error); //Exepection error....
            }
          )
        //
      },
      generateEth() {
        const wallet = ethWallet.generate();
        return {
          privateKey: wallet.getPrivateKeyString(),
          address: wallet.getAddressString()
        }
      },
      showHideCoins: function () {
        this.isShow = !this.isShow;
      },
      showHideHelp: function () {
        this.help = !this.help;
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
          const { randomSeed } = crypto()
          const seed = randomSeed()
          const { address, keyPair } = crypto()
          const kp = keyPair(seed)
          this.address.publicAddress = address(seed);
          this.address.privateWif = kp.privateKey;
          this.address.keyHex = seed;
        }

        if (this.coins[this.currentCoin].generator === 'ethGenerator') {
          const ethData = this.generateEth();
          this.address.publicAddress = ethData.address;
          this.address.privateWif = ethData.privateKey;
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
  .small {
    font-size: 70% !important;
    font-weight: 400;
  }
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
