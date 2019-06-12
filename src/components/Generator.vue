<template>
  <div class="hello">
    <div class="row">
      <div class="container">
        <div v-for="(item, idx) in coins" :key="idx">
          <div class="select-coin" @click="selectCoin(idx)">
            <img width="20px" alt="item.title" :src="item.logo"/> {{item.title}}
          </div>
        </div>
      </div>
    </div>
    <dm-divider></dm-divider>
    <img width="128px" alt="coin logo" :src="coins[currentCoin].logo"/>
    <h1>{{coins[currentCoin].title}} Paper Wallet Generator</h1>

    <dm-button size="large" @click="generateAddress" color="black">Generate new {{coins[currentCoin].title}} address</dm-button>

    <div class="container mt-4">
      <div class="result-generate" v-if="address.keyHex">
        <!--<h3>KeyHex: {{address.keyHex}}</h3>-->
        <table class="table table">
          <tr>
            <td>
              <VueQrcode :value="address.publicAddress" :options="{size:196, foreground: '#232D3D',level: 'H'}"/>
              <p class="text-secondary">Public Address</p>
            </td>
            <td>
              <VueQrcode :value="address.privateWif" :options="{size:196, foreground: '#232D3D',level: 'H'}"/>
              <p class="text-secondary">Private Key</p>
            </td>
          </tr>
        </table>

        <table class="table table text-success">
          <tr>
            <td class="text-right">Address:</td>
            <td class="text-left"><span class="barley-white">{{address.publicAddress}}</span></td>
          </tr>
          <tr>
            <td class="text-right">Private key:</td>
            <td class="text-left"><span class="barley-white">{{address.privateWif}}</span></td>
          </tr>
        </table>


      </div>
    </div>

    <div class="container instruction p-3">
      <ul>
        <li>
          <dm-list-item icon-size="15" :number=1>Open {{coins[currentCoin].title}} Your Wallet</dm-list-item>
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
          post: {
            title: "PostCoin",
            logo: "static/coins/post.png",
            private: 0xb7,
            public: 0x37,
          },
          btc: {
            title: "Bitcoin",
            logo: "static/coins/btc.png",
            private: 0x80,
            public: 0x0,
          },
          nobt: {
            title: "NobtCoin",
            logo: "static/coins/nobt.png",
            private: 0x55,
            public: 0xf,
          },
        },
        address: {
          keyHex: null,
          publicAddress: null,
          privateWif: null,
        }
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
        console.log('selectedCoin', selectedCoin)
        this.currentCoin = selectedCoin;
        this.address = {
          keyHex: null,
          publicAddress: null,
          privateWif: null,
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scss scoped>
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
    margin-right: 10px;
    padding: 5px;
    border: solid 1px #323E4F;
    background: #18191A;
    width: 120px;
    border-radius: 5px;
  }

  .select-coin:hover {
    cursor: pointer;
    background: #323E4F

  }
</style>

