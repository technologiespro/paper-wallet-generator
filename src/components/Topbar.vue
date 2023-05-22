<template>
  <!-- Top bar Start -->
  <div class="navbar-custom">
    <div class="container-fluid">
      <ul class="list-unstyled topnav-menu float-right mb-0">

        <!-- lang -->
        <b-nav-item-dropdown
          variant="white"
          class="d-lg-inline-block"
          right
          toggle-class="header-item"
        >
          <template v-slot:button-content>
            <img class :src="flag" alt="Header Language" height="16" />
            {{ text }}
          </template>
          <b-dropdown-item
            class="notify-item"
            v-for="(entry, i) in languages"
            :key="`Lang${i}`"
            :value="entry"
            @click="setLanguage(entry.language, entry.title, entry.flag)"
            :link-class="{ active: entry.language === current_language }"
          >
            <img
              :src="`${entry.flag}`"
              alt="user-image"
              class="mr-1"
              height="12"
            />
            <span class="align-middle">{{ entry.title }}</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>


      </ul>

      <!-- LOGO -->
      <div class="logo-box">

        <router-link to="/" class="logo logo-dark text-center">
          <span class="logo-sm">
            <img src="@/assets/images/logo-dark.png" alt height="40" />
          </span>
          <span class="logo-lg">
            <img src="@/assets/images/logo-dark.png" alt height="48" />
          </span>
        </router-link>

        <router-link to="/" class="logo logo-light text-center">
          <span class="logo-sm">
            <img src="@/assets/images/logo-dark.png" alt height="24" />
          </span>
          <span class="logo-lg">
            <img src="@/assets/images/logo-dark.png" alt height="20" />
          </span>
        </router-link>



      </div>
      <!--<span class="text-left text-white small position-absolute" style="left:228px;top: 75%;">v.{{packageJson.version}}</span>-->

      <div v-if="settings.isWeb" class="float-right pt-3">
        <a href="https://ex.xbts.io" class="ml-2 text-white"><img height="16px" src="static/logo/xbts.png"/> DEX</a>
        <a href="https://app.xbts.io" class="ml-2 text-white"><img height="16px" src="static/logo/defi.png"/> DeFi</a>
      </div>

      <div class="clearfix"></div>

    </div>
  </div>
  <!-- end Topbar -->
</template>

<script>
/**
 * Topbar component
 */
import packageJson from '../../package.json';
import {coins, settings} from "@/config";

export default {
  data() {
    return {
      packageJson,
      coins,
      settings,
      languages: [
        {
          flag: require("@/assets/flags/en.svg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("@/assets/flags/ru.svg"),
          language: "ru",
          title: "Русский",
        },
      ],
      current_language: this.$i18n.locale,
      text: null,
      flag: null,
      value: null,
    };
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === this.$i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
  },
  methods: {
    async openCoin(coin) {
      await this.$router.push("/coin/" + coin);
    },
    /**
     * Toggle menu
     */
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    /**
     * Full screen
     */
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
          !document.fullscreenElement &&
          /* alternative standard method */
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
              Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    /**
     * Toggle rightbar
     */
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    /**
     * Set languages
     */
    async setLanguage(locale, country, flag) {
      this.$i18n.locale = locale;
      this.current_language = locale;
      this.text = country;
      this.flag = flag;
      let htmlEl = document.querySelector("html");
      //htmlEl.setAttribute('dir','rtl');
      htmlEl.setAttribute('lang', this.$i18n.locale);
    },
    /**
     * Horizontal-toggle menu
     */
    horizonalmenu() {
      let element = document.getElementById("topnav-menu-content");
      element.classList.toggle("show");
    },
  },
};
</script>

