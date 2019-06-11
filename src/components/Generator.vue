<template>
    <div class="hello">
        <h1>{{ msg }}</h1>

        <dm-button @click="generateAddress" color="black">Generate new address</dm-button>

        <div class="result-generate">
            <h3>Private key:</h3>
            <h3>Address:</h3>
            <h3>HEX:</h3>
        </div>

    </div>
</template>

<script>
  import coinkey from 'coinkey';
  import rndString from 'crypto-random-string';

    export default {
        name: 'Generator',
        props: {
            msg: String
        },
        methods: {
            generateAddress: function() {
                console.log('generate')
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
