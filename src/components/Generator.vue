<template>
  <div class="hello">
    <div v-if="mobile" class="container noselect">
      <dm-button @click="showHideCoins" full-width color="black" class="mb-2">SELECT COIN</dm-button>
    </div>

    <div v-if="isShow" class="container-fluid noselect">
      <div class="row">
        <span v-for="(item, idx) in coins" :key="idx" class="select-coin" @click="selectCoin(idx)">
            <img width="18px" alt="item.title" :src="item.logo"/> {{item.title}}
        </span>
      </div>
    </div>

    <div class="container-fluid">
      <img @click="openLink(coins[currentCoin].downloadWallet)" width="96px" alt="coin logo"
           :src="coins[currentCoin].logo" class="pointer noselect"/>
      <h2 class="noselect">{{coins[currentCoin].title}} <span class="text-white small">[{{currentCoin.toUpperCase()}}]</span></h2>

      <dm-button size="large" @click="generateAddress" color="black">Generate new {{coins[currentCoin].title}} address</dm-button>
      <DownloadPdf v-if="address.publicAddress && !mobile" :address="address" :coin="coins[currentCoin]"/>
      <DownloadTxt v-if="address.publicAddress && !mobile" :address="address" :coin="coins[currentCoin]"/>

      <div class="container mt-4">
        <div class="result-generate" v-if="address.publicAddress">
          <div class="row">

            <div class="col-md-5">

              <div class="qr-container">
                <VueQrcode id="qrPub" :value="address.publicAddress"
                           :options="{size:138, foreground: '#232D3D',level: 'H'}"/>
                <p class="text-white-50">Public Address</p>
              </div>

              <div class="qr-container">
                <VueQrcode id="qrPriv" :value="address.privateWif"
                           :options="{size:138, foreground: '#232D3D',level: 'H'}"/>
                <p class="text-white-50">Private Key</p>
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
                  <td @click="showHideHelp"><img src="static/svg/help.svg" width="20px" class="pointer"/></td>
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
          <dm-list-item :number=4>Wait for the import/rescan to complete and then restart the wallet</dm-list-item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import CoinKey from 'coinkey';
  import cryptoRandomString from 'crypto-random-string';
  import VueQrcode from '@/components/utils/QRCode';
  import DownloadPdf from '@/components/DownloadPdf';
  import DownloadTxt from '@/components/DownloadTxt';

  import sth from 'sthjs';
  import {entropyToMnemonic} from 'bip39';
  import {crypto} from '@waves/waves-crypto';
  import ethWallet from 'ethereumjs-wallet';

  import {openUrl} from 'src/util/url'

  export default {
    name: 'Generator',
    components: {
      VueQrcode,
      DownloadPdf,
      DownloadTxt,
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
          "42": {
            title: "42-Coin",
            logo: "static/coins/42.png",
            public: 0x08,
            private: 0x88,
            generator: 'btcGenerator',
            downloadWallet: 'https://github.com/42-coin/42/releases',
          },
          "btc": {
            title: "Bitcoin",
            logo: "static/coins/btc.png",
            public: 0x0,
            private: 0x80,
            generator: 'btcGenerator',
            downloadWallet: 'https://bitcoin.org/en/choose-your-wallet',
          },
          "btg": {
            title: "BitcoinGold",
            logo: "static/coins/btg.png",
            public: 0x26,
            private: 0x80,
            generator: 'btcGenerator',
            downloadWallet: 'https://bitcoingold.org/ecosystem/#wallets',
          },
          "dash": {
            title: "Dash",
            logo: "static/coins/dash.png",
            public: 0x4c,
            private: 0xcc,
            generator: 'btcGenerator',
            downloadWallet: 'https://www.dash.org/downloads/',
          },
          "nobt": {
            title: "NobtCoin",
            logo: "static/coins/nobt.png",
            public: 0xf,
            private: 0x55,
            generator: 'btcGenerator',
            downloadWallet: 'https://github.com/nobtcoin/Nobtcoin/releases',
          },
          "onion": {
            title: "DeepOnion",
            logo: "static/coins/onion.png",
            public: 0x1f,
            private: 0x9f,
            generator: 'btcGenerator',
            downloadWallet: 'https://github.com/deeponion/deeponion/releases',
          },
          "post": {
            title: "PostCoin",
            logo: "static/coins/post.png",
            public: 0x37,
            private: 0xb7,
            generator: 'btcGenerator',
            downloadWallet: 'https://github.com/PostCoinCore/postcoin/releases',
          },
          "doge": {
            title: "Dogecoin",
            logo: "static/coins/doge.png",
            public: 0x1e,
            private: 0x9e,
            generator: 'btcGenerator',
            downloadWallet: 'https://github.com/dogecoin/dogecoin/releases',
          },
          "eth": {
            title: "Ethereum",
            logo: "static/coins/eth.png",
            public: null,
            private: null,
            generator: 'ethGenerator',
            downloadWallet: 'https://metamask.io/',
          },
          "ltc": {
            title: "Litecoin",
            logo: "static/coins/ltc.png",
            public: 0x30,
            private: 0xb0,
            generator: 'btcGenerator',
            downloadWallet: 'https://litecoin.org',
          },
          "nvc": {
            title: "Novacoin",
            logo: "static/coins/nvc.png",
            public: 0x08,
            private: 0x88,
            generator: 'btcGenerator',
            downloadWallet: 'https://sourceforge.net/projects/novacoin/files',
          },
          "nmc": {
            title: "NameCoin",
            logo: "static/coins/nmc.png",
            public: 0x34,
            private: 0x80,
            generator: 'btcGenerator',
            downloadWallet: 'https://namecoin.org/download/',
          },
          "pivx": {
            title: "PIVX",
            logo: "static/coins/pivx.png",
            public: 0x1e,
            private: 0xd4,
            generator: 'btcGenerator',
            downloadWallet: 'https://pivx.org/wallet/',
          },
          "xsm": {
            title: "Smilo",
            logo: "static/coins/xsm.png",
            public: null,
            private: null,
            generator: 'ethGenerator',
            downloadWallet: 'https://smilowallet.io/#/access-my-wallet',
          },
          "sth": {
            title: "SmartHoldem",
            logo: "static/coins/sth.png",
            public: 0x3f,
            private: 0xff,
            generator: 'sthGenerator',
            downloadWallet: 'https://github.com/smartholdem/smartholdem-wallet/releases',
          },
          "vrc": {
            title: "Vericoin",
            logo: "static/coins/vrc.png",
            public: 0x46,
            private: 0x84,
            generator: 'btcGenerator',
            downloadWallet: 'https://vericoin.info/vericoin-digital-currency/',
          },
          "vrm": {
            title: "Verium",
            logo: "static/coins/vrm.png",
            public: 0x46,
            private: 0x84,
            generator: 'btcGenerator',
            downloadWallet: 'https://vericoin.info/verium-digital-reserve/',
          },
          "waves": {
            title: "WAVES",
            logo: "static/coins/waves.png",
            public: null,
            private: null,
            generator: 'wavesGenerator',
            downloadWallet: 'https://wavesplatform.com/products-wallet',
          },
          "rdd": {
            title: "ReddCoin",
            logo: "static/coins/rdd.png",
            public: 0x3d,
            private: 0xbd,
            scripthash: 0x05,
            generator: 'btcGenerator',
            downloadWallet: 'https://reddcoin.com/get-started/',
          },
          "ppc": {
            title: "Peercoin",
            logo: "static/coins/ppc.png",
            public: 0x37,
            private: 0xb7,
            scripthash: 0xc4,
            generator: 'btcGenerator',
            downloadWallet: 'https://peercoin.net/wallet.html',
          },
          "vtc": {
            title: "Vertcoin",
            logo: "static/coins/vtc.png",
            public: 0x47,
            private: 0x80,
            generator: 'btcGenerator',
            downloadWallet: 'https://vertcoin.org/download-wallet/',
          },
          "block": {
            title: "Blocknet",
            logo: "static/coins/block.png",
            public: 0x1a,
            private: 0x9a,
            generator: 'btcGenerator',
            downloadWallet: 'https://blocknet.co/',
          },
          "emc": {
            title: "Emercoin",
            logo: "static/coins/emc.png",
            public: 0x21,
            private: 0x80,
            generator: 'btcGenerator',
            downloadWallet: 'http://emercoin.com/en/for-coinholders#download',
          },
          "pot": {
            title: "Potcoin",
            logo: "static/coins/pot.png",
            public: 0x37,
            private: 0xb7,
            generator: 'btcGenerator',
            downloadWallet: 'https://www.potcoin.com/wallets',
          },
        },
      }
    },
    methods: {
      openLink(link) {
        openUrl(link);
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
          const {randomSeed} = crypto()
          const seed = randomSeed()
          const {address, keyPair} = crypto()
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
    font-size: 0.9em;
    margin-right: 4px;
    margin-left: 4px;
    padding: 5px;
    border: solid 1px #323E4F;
    background: #18191A;
    width: 122px;
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
      font-size: 1.05em;
    }

    .instruction p {
      font-size: 0.85em !important;
      line-height: 140%;
    }

  }
</style>
