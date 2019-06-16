<template>
  <span class="ml-2">
    <img @click="pdfDownload" src="static/svg/pdf.svg" width="40px"/>
  </span>
</template>

<script>
  import jsPDF from 'jspdf'
  import image2base64 from 'image-to-base64'

  export default {
    name: "DownloadPdf",
    props: {
      coin: Object,
      address: Object
    },
    methods: {
      async pdfDownload() {
        let doc = new jsPDF({
          orientation: 'landscape',
          // pagesplit: true,
          //format: [900, 510]
        });

        const paperWalletLogo = 'data:image/png;base64,' + (await image2base64('static/logo/logo64.png'));
        doc.addImage(paperWalletLogo, 'PNG', 281, 195, 10, 10);

        image2base64(this.coin.logo) // you can also to use url
          .then(
            (response) => {
              let imgData = 'data:image/png;base64,' + response;
              doc.addImage(imgData, 'PNG', 9, 5, 20, 20);

              doc.setFontSize(35);
              doc.text(this.coin.title + ' Paper Wallet', 33, 18);

              doc.setFontSize(14);
              doc.text('Public Address: ' + this.address.publicAddress, 12, 40);
              doc.text('Private Key: ', 12, 50);
              doc.text(this.address.privateWif, 48, 50);

              if (this.coin.generator !== 'btcGenerator' && this.address.keyHex) {
                doc.text('Seed: ' + this.address.keyHex, 12, 60);
              }

              doc.setFontSize(12);
              doc.textWithLink('XBTS DEX', 12, 200, {url: 'https://ex.xbts.io'});
              doc.textWithLink('GitHub', 50, 200, {url: 'https://github.com/technologiespro/paper-wallet-generator/releases'});

              let qrPub = window.document.getElementById('qrPub');
              doc.addImage(qrPub.toDataURL("image/jpg"), 'JPEG', 12, 80, 50, 50);
              doc.text('Public Address', 18, 138);

              let qrPriv = window.document.getElementById('qrPriv');
              doc.addImage(qrPriv.toDataURL("image/jpg"), 'JPEG', 70, 80, 50, 50);
              doc.text('Private Key', 78, 138);
              doc.save(this.coin.title + '-PaperWallet' + '.pdf');
            }
          )
          .catch(
            (error) => {
              //console.log(error); //Exepection error....
            }
          )
        //
      },
    }
  }
</script>

<style scoped>

</style>
