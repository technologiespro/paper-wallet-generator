<template>
<div id="app">
    <router-view />
</div>
</template>

<script>
//import {fabric} from 'fabric';
//import VueQrcode from '@/components/utils/QrCodeImg';
//import {coins} from "@/config";
//const bip38 = require('bip38');
//const wif = require('wif');
//import printJS from 'print-js';

var canvas = null

export default {
  name: "WalletPaper",
  components: {
    //VueQrcode,
  },
  data() {

  },
  mounted() {
    this.$root.isMobile = window.innerWidth < 900;
    this.$root.h = window.innerHeight;
    this.$root.w = window.innerWidth;
    this.$root.hideBanners = window.innerWidth < 1181;
  },
  async created() {
    //this.$i18n.locale = 'ru';
    const broLang = navigator.language;

    if (broLang === 'ru-RU') {
      this.$i18n.locale = 'ru'
    } else {
      this.$i18n.locale = 'en'
    }

    let htmlEl = document.querySelector("html");
    //htmlEl.setAttribute('dir','rtl');
    htmlEl.setAttribute('lang', this.$i18n.locale);

  }
}
</script>

