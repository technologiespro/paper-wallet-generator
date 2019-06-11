<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <dm-button @click="generateAddress" color="black">Generate new address</dm-button>

    <div class="result-generate">
      <!--<h3>KeyHex: {{address.keyHex}}</h3>-->
      <dm-divider></dm-divider>
      <h4>Address: {{address.publicAddress}}</h4>
      <dm-divider></dm-divider>
      <h4>Private key: {{address.privateWif}}</h4>
      <dm-divider></dm-divider>
    </div>

    <span class="instruction">
      <span class="toast-title">How to add an address to your wallet</span>
      <dm-list-item :number=1>Open PostCoin Desktop Wallet</dm-list-item>
      <dm-list-item :number=2>Select: Help > Debug window > Console</dm-list-item>
      <dm-list-item :number=3>Enter: importprivkey {{address.privateWif}}</dm-list-item>
      <dm-list-item :number=4>Wait for the import to complete and then restart the wallet.</dm-list-item>
    </span>

  </div>
</template>

<script>
  import CoinKey from 'coinkey';
  import cryptoRandomString from 'crypto-random-string';

  export default {
    name: 'Generator',
    data() {
      return {
        address: {
          keyHex: null,
          publicAddress: null,
          privateWif: null,
        }
      }
    },
    props: {
      msg: String
    },
    methods: {
      generateAddress: function () {
        let privateKeyHex = cryptoRandomString({length: 64})
        const key = (new CoinKey(new Buffer.from(privateKeyHex, 'hex'), {private: 0xb7, public: 0x37}))
        console.log(key);
        console.log(key.toString()); //PQz6GDwtXQtD1tLydjsaCoVjmXBjSqPDkT

        this.address.keyHex = privateKeyHex;
        this.address.publicAddress = key.publicAddress;
        this.address.privateWif = key.privateWif;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    color: #42b983;
  }

  .toast-title {
    font-size:1.5em;
    color: #fff;
  }

</style>
