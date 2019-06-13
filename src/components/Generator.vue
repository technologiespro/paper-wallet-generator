<template>
  <div class="hello">
    <div class="row" style="width: 100%;">
      <div class="container-fluid">
        <div v-for="(item, idx) in coins" :key="idx" style="float:left;">
          <span class="select-coin" @click="selectCoin(idx)">
            <img width="18px" alt="item.title" :src="item.logo"/> {{item.title}}
          </span>
        </div>
      </div>
    </div>
    <dm-divider></dm-divider>
    <img width="112px" alt="coin logo" :src="coins[currentCoin].logo"/>
    <h2>{{coins[currentCoin].title}} Wallet Generator</h2>

    <dm-button size="large" @click="generateAddress" color="black">Generate new {{coins[currentCoin].title}} address</dm-button>

    <div class="container mt-4">
      <div class="result-generate" v-if="address.keyHex">
        <div class="row">

          <div class="col-md-5">

              <div class="qr-container">
                <VueQrcode :value="address.publicAddress" :options="{size:150, foreground: '#232D3D',level: 'H'}"/>
                <p class="text-secondary">Public Address</p>
              </div>


            <div class="qr-container">
              <VueQrcode :value="address.privateWif" :options="{size:150, foreground: '#232D3D',level: 'H'}"/>
              <p class="text-secondary">Private Key</p>
            </div>
          </div>

          <div class="col-md-7">
            <table class="table text-info">
              <tr>
                <td class="text-right">Address</td>
                <td>
                  <dm-icon name="add_to_photos" class="clipboard"
                           v-clipboard="() => address.publicAddress"
                           v-clipboard:success="clipboardSuccessHandler"></dm-icon>
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
                  <dm-icon name="add_to_photos" class="clipboard" v-clipboard="() => address.privateWif"
                           v-clipboard:success="clipboardSuccessHandler"></dm-icon>
                </td>
                <td class="text-left">
                  <span class="barley-white">{{address.privateWif}}</span>
                </td>
              </tr>
            </table>

          </div>


        </div>
        <small class="text-success">~ {{copied}} ~</small>

      </div>

    </div>


    <div class="container instruction p-3 mb-5">
      <ul>
        <li>
          <dm-list-item icon-size="15" :number=1>Open Your {{coins[currentCoin].title}} Wallet</dm-list-item>
        </li>
        <li>
          <dm-list-item :number=2>Select: <span class="text-info">Help > Debug window > Console</span></dm-list-item>
        </li>
        <li>
          <dm-list-item :number=3>Enter: <span class="text-info">importprivkey {{address.privateWif}} PaperWallet</span></dm-list-item>
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
  import VueQrcode from '@/components/utils/QRCode'

  export default {
    name: 'Generator',
    components: {
      VueQrcode
    },
    data() {
      return {
        currentCoin: "post",
        coins: {
          "42": {
            title: "42-Coin",
            logo: "static/coins/42.png",
            public: 0x08,
            private: 0x88,
          },
          "btc": {
            title: "Bitcoin",
            logo: "static/coins/btc.png",
            public: 0x0,
            private: 0x80,
          },
          "btg": {
            title: "BitcoinGold",
            logo: "static/coins/btg.png",
            public: 0x26,
            private: 0x80,
          },
          "dash": {
            title: "Dash",
            logo: "static/coins/dash.png",
            public: 0x4c,
            private: 0xcc,
          },
          "doge": {
            title: "Dogecoin",
            logo: "static/coins/doge.png",
            public: 0x1e,
            private: 0x9e,
          },
          "ltc": {
            title: "Litecoin",
            logo: "static/coins/ltc.png",
            public: 0x30,
            private: 0xb0,
          },
          "nobt": {
            title: "NobtCoin",
            logo: "static/coins/nobt.png",
            public: 0xf,
            private: 0x55,
          },
          "nvc": {
            title: "Novacoin",
            logo: "static/coins/nvc.png",
            public: 0x08,
            private: 0x88,
          },
          "nmc": {
            title: "NameCoin",
            logo: "static/coins/nmc.png",
            public: 0x34,
            private: 0x80,
          },
          "onion": {
            title: "DeepOnion",
            logo: "static/coins/onion.png",
            public: 0x1f,
            private: 0x9f,
          },
          "post": {
            title: "PostCoin",
            logo: "static/coins/post.png",
            public: 0x37,
            private: 0xb7,
          },
          "pivx": {
            title: "PIVX",
            logo: "static/coins/pivx.png",
            public: 0x1e,
            private: 0xd4,
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
      generateAddress: function () {
        let privateKeyHex = cryptoRandomString({length: 64});
        const key = (new CoinKey(new Buffer.from(privateKeyHex, 'hex'), {
          private: this.coins[this.currentCoin].private,
          public: this.coins[this.currentCoin].public
        }));
        this.address.keyHex = privateKeyHex;
        this.address.publicAddress = key.publicAddress;
        this.address.privateWif = key.privateWif;
      },
      selectCoin: function (selectedCoin) {
        this.currentCoin = selectedCoin;
        this.address = {
          keyHex: null,
          publicAddress: null,
          privateWif: null,
        }
      },
      clipboardSuccessHandler({value, event}) {
          this.copied = 'Copied to clipboard';
          setTimeout(() => (this.copied = null), 1500);
        // Copied to clipboard
      },
    }
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

  .inst-title {
    text-align: left !important;
    font-size: 1.5em;
    color: #fff;
  }

  .barley-white {
    color: #FFF5CD
  }

  ul {
    list-style-type: none;
  }

  .instruction {
    background: #18191A
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

  .clipboard {
    color: #eee !important;
  }
  .clipboard:hover {
    color: #28a745 !important;
    cursor: pointer;
  }

  .qr-container {
    width:50%;
    float:left;
    margin: 0 auto;
  }
</style>

