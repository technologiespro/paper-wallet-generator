<template>
  <div class="hello">
    <img alt="coin logo" :src="coins[currentCoin].logo">
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
        <li><dm-list-item icon-size="15" :number=1>Open PostCoin Desktop Wallet</dm-list-item></li>
        <li><dm-list-item :number=2>Select: Help > Debug window > Console</dm-list-item></li>
        <li><dm-list-item :number=3>Enter: importprivkey {{address.privateWif}}</dm-list-item></li>
        <li><dm-list-item :number=4>Wait for the import to complete and then restart the wallet</dm-list-item></li>
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
            privateKeyPrefix: 0xb7,
            networkVersion: 0x37,
          }
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
        const key = (new CoinKey(new Buffer.from(privateKeyHex, 'hex'), {private: this.coins[this.currentCoin].privateKeyPrefix, public: this.coins[this.currentCoin].networkVersion}));
        this.address.keyHex = privateKeyHex;
        this.address.publicAddress = key.publicAddress;
        this.address.privateWif = key.privateWif;
      },
      selectCoin: function() {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

</style>
