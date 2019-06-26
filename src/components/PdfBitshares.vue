<template>
  <span class="ml-2">
    <img @click="pdfDownload" src="static/svg/pdf.svg" width="40px" class="pointer"/>
  </span>
</template>

<script>
  import jsPDF from 'jspdf'
  import image2base64 from 'image-to-base64'

  export default {
    name: "PdfBitshares",
    props: {
      coin: Object,
    },
    methods: {
      async pdfDownload() {
        let doc = new jsPDF({
          orientation: 'portrait',
          // pagesplit: true,
          //format: [900, 510]
        });

        const coinLogo = 'data:image/png;base64,' + (await image2base64('static/coins/bts.png'));
        doc.addImage(coinLogo, 'PNG', 9, 7, 15, 15);

        doc.setFontSize(35);
        doc.text(this.coin.title + ' Paper Wallet', 33, 18);

        doc.setFontSize(12);

        doc.text('Random Name: ' + this.coin.account.name, 12, 38);

        doc.text('Pass Phrase:', 12, 46);
        let splitTitle = doc.splitTextToSize(this.coin.account.bip39, 150);
        doc.text(splitTitle, 38, 46);

        doc.line(12, 55, 200, 55);

        doc.setFontSize(15);
        doc.text('OWNER KEYS', 90, 62);

        doc.setFontSize(12);
        let qrPubOwner = window.document.getElementById('qrPubOwner');
        doc.addImage(qrPubOwner.toDataURL("image/jpg"), 'JPEG', 7, 56, 42, 42);
        doc.text('Public', 20, 99);

        let qrPrivOwner = window.document.getElementById('qrPrivOwner');
        doc.addImage(qrPrivOwner.toDataURL("image/jpg"), 'JPEG', 160, 56, 42, 42);
        doc.text('Private', 172, 99);

        doc.setFontSize(10);
        doc.text('Public Key', 46, 68);
        doc.text(this.coin.account.owner.pubKey, 46, 73);

        doc.text('Private Key', 46, 82);
        doc.text(this.coin.account.owner.privateKey, 46, 87);

        doc.line(12, 101, 200, 101);

        let offsetY = 50;
        doc.setFontSize(15);
        doc.text('ACTIVE KEYS', 90, 62 + offsetY);

        doc.setFontSize(12);
        let qrPubActive = window.document.getElementById('qrPubActive');
        doc.addImage(qrPubActive.toDataURL("image/jpg"), 'JPEG', 7, 56 + offsetY, 42, 42);
        doc.text('Public', 20, 99 + offsetY);

        let qrPrivActive = window.document.getElementById('qrPrivActive');
        doc.addImage(qrPrivActive.toDataURL("image/jpg"), 'JPEG', 160, 56 + offsetY, 42, 42);
        doc.text('Private', 172, 99 + offsetY);

        doc.setFontSize(10);
        doc.text('Public Key', 46, 68 + offsetY);
        doc.text(this.coin.account.owner.pubKey, 46, 73 + offsetY);

        doc.text('Private Key', 46, 82);
        doc.text(this.coin.account.owner.privateKey, 46, 87 + offsetY);

        doc.line(12, 101 + offsetY, 200, 101 + offsetY);

        doc.setFontSize(15);
        doc.text('MEMO KEYS', 90, 62 + offsetY * 2);

        doc.setFontSize(12);
        let qrPubMemo = window.document.getElementById('qrPubMemo');
        doc.addImage(qrPubMemo.toDataURL("image/jpg"), 'JPEG', 7, 56 + offsetY * 2, 42, 42);
        doc.text('Public', 20, 99 + offsetY * 2);

        let qrPrivMemo = window.document.getElementById('qrPrivMemo');
        doc.addImage(qrPrivMemo.toDataURL("image/jpg"), 'JPEG', 160, 56 + offsetY * 2, 42, 42);
        doc.text('Private', 172, 99 + offsetY * 2);

        doc.setFontSize(10);
        doc.text('Public Key', 46, 68 + offsetY * 2);
        doc.text(this.coin.account.owner.pubKey, 46, 73 + offsetY * 2);

        doc.text('Private Key', 46, 82);
        doc.text(this.coin.account.owner.privateKey, 46, 87 + offsetY * 2);

        doc.line(12, 101 + offsetY * 2, 200, 101 + offsetY * 2);


        doc.setFontSize(12);
        doc.text('How to use a Bitshares paper wallet, please see the forum: https://bitsharestalk.org/index.php?topic=24495.0', 10, 220);


        doc.setFontSize(12);
        doc.textWithLink('XBTS DEX', 12, 290, {url: 'https://ex.xbts.io'});
        doc.textWithLink('GitHub', 50, 290, {url: 'https://github.com/technologiespro/paper-wallet-generator/releases'});

        const paperWalletLogo = 'data:image/png;base64,' + (await image2base64('static/logo/logo64.png'));
        doc.addImage(paperWalletLogo, 'PNG', 181, 280, 10, 10);

        const xbtsLogo = 'data:image/png;base64,' + (await image2base64('static/logo/xbts.png'));
        doc.addImage(xbtsLogo, 'PNG', 150, 280, 25, 10);

        doc.save('PaperWallet-' + this.coin.title + '.pdf');

      },
    }
  }
</script>

<style scoped>

</style>
