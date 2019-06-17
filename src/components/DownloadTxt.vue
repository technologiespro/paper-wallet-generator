<template>
  <span class="ml-2">
    <img @click="txtDownload" src="static/svg/text.svg" width="40px" class="pointer"/>
  </span>
</template>

<script>
  export default {
    name: "DownloadTxt",
    props: {
      coin: Object,
      address: Object
    },
    methods: {
      txtDownload() {
        let element = document.createElement('a');
        let text = this.coin.title + ' Paper Wallet' + '\r\n';
        text = text + 'Public Address:' + this.address.publicAddress + '\r\n';
        text = text + 'Private Key:' + this.address.privateWif + '\r\n';

        if (this.coin.generator !== 'btcGenerator' && this.address.keyHex) {
          text = text + 'Seed:' + this.address.keyHex + '\r\n';
        }

        let url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);


        element.setAttribute('href', url);
        element.setAttribute('download', this.coin.title + '-PaperWallet.txt');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);


      }
    }
  }
</script>

<style scoped>

</style>
