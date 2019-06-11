<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <dm-button @click="generateAddress" color="black">Generate new address</dm-button>

    <div class="result-generate">
      <h3>KeyHex:</h3>
      <dm-divider></dm-divider>
      <h3>Address:</h3>
      <dm-divider></dm-divider>
      <h3>Private key:</h3>
    </div>

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
          address: null,
          keyPrivate: null,
        }
      }
    },
    props: {
      msg: String
    },
    methods: {
      generateAddress: function () {
        let privateKeyHex = cryptoRandomString({length: 64})
        console.log('privateKeyHex', privateKeyHex)
        const key = (new CoinKey(new Buffer.from(privateKeyHex, 'hex'), {private: 0xb7, public: 0x37})).toString()
        console.log(key.toString())
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
