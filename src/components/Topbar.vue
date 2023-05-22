<template>
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <div class="container-fluid">
      <ul class="list-unstyled topnav-menu float-right mb-0">


        <!--
        <li class="d-none d-lg-block">
          <form class="app-search">
            <div class="app-search-box">
              <div class="input-group">
                <input
                  type="search"
                  class="form-control"
                  :placeholder="$t('navbar.search.text')"
                  id="top-search"
                />
                <div class="input-group-append">
                  <button class="btn" type="submit">
                    <i class="fe-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </li>
        -->

        <!--
        <li class="dropdown d-inline-block d-lg-none">
          <a
            class="nav-link dropdown-toggle arrow-none waves-effect waves-light"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="false"
            aria-expanded="false"
          >
            <i class="fe-search noti-icon"></i>
          </a>
          <div class="dropdown-menu dropdown-lg dropdown-menu-right p-0">
            <form class="p-3">
              <input
                type="text"
                class="form-control"
                :placeholder="$t('navbar.search.text')"
                aria-label="Recipient's username"
              />
            </form>
          </div>
        </li>
        -->

        <!-- socials -->
        <!--
        <b-nav-item-dropdown
          variant="white"
          class="d-none d-lg-inline-block topbar-dropdown"
          toggle-class="nav-link"
          right
          menu-class="dropdown-lg p-0"
        >
          <template v-slot:button-content>
            <i class="fe-grid noti-icon"></i>
          </template>
          <div class="px-lg-2">
            <div class="row no-gutters">
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img src="@/assets/images/brands/github.png" alt="Github" />
                  <span>{{ $t("navbar.dropdown.site.list.github") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img
                    src="@/assets/images/brands/dribbble.png"
                    alt="dribbble"
                  />
                  <span>{{ $t("navbar.dropdown.site.list.dribbble") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img src="@/assets/images/brands/slack.png" alt="slack" />
                  <span>{{ $t("navbar.dropdown.site.list.slack") }}</span>
                </a>
              </div>
            </div>

            <div class="row no-gutters">
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img src="@/assets/images/brands/g-suite.png" alt="G Suite" />
                  <span>{{ $t("navbar.dropdown.site.list.g-suite") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img
                    src="@/assets/images/brands/bitbucket.png"
                    alt="bitbucket"
                  />
                  <span>{{ $t("navbar.dropdown.site.list.bitbucket") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="#">
                  <img src="@/assets/images/brands/dropbox.png" alt="dropbox" />
                  <span>{{ $t("navbar.dropdown.site.list.dropbox") }}</span>
                </a>
              </div>
            </div>
          </div>
        </b-nav-item-dropdown>
        -->

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

        <!--
        <b-nav-item-dropdown
          right
          class="notification-list"
          menu-class="dropdown-lg"
        >
          <template slot="button-content" class="nav-link dropdown-toggle">
            <i class="fe-bell noti-icon"></i>
            <span class="badge badge-danger rounded-circle noti-icon-badge">{{
              $t("navbar.dropdown.notification.badge")
            }}</span>
          </template>

          <a href="#" class="dropdown-item noti-title">
            <h5 class="m-0">
              <span class="float-right">
                <a href class="text-dark">
                  <small>{{
                    $t("navbar.dropdown.notification.subtext")
                  }}</small>
                </a>
              </span>
              {{ $t("navbar.dropdown.notification.text") }}
            </h5>
          </a>

          <simplebar style="max-height: 230px">
            <a
              href="javascript:void(0);"
              class="dropdown-item notify-item active"
            >
              <div class="notify-icon bg-soft-primary text-primary">
                <i class="mdi mdi-comment-account-outline"></i>
              </div>
              <p class="notify-details">
                {{ $t("navbar.dropdown.notification.1.title") }}
                <small class="text-muted">{{
                  $t("navbar.dropdown.notification.1.text")
                }}</small>
              </p>
            </a>


            <a href="javascript:void(0);" class="dropdown-item notify-item">
              <div class="notify-icon">
                <img
                  src="@/assets/images/users/avatar-2.jpg"
                  class="img-fluid rounded-circle"
                  alt
                />
              </div>
              <p class="notify-details">
                {{ $t("navbar.dropdown.notification.2.title") }}
              </p>
              <p class="text-muted mb-0 user-msg">
                <small>{{ $t("navbar.dropdown.notification.2.text") }}</small>
              </p>
            </a>


            <a href="javascript:void(0);" class="dropdown-item notify-item">
              <div class="notify-icon">
                <img
                  src="@/assets/images/users/avatar-4.jpg"
                  class="img-fluid rounded-circle"
                  alt
                />
              </div>
              <p class="notify-details">
                {{ $t("navbar.dropdown.notification.3.title") }}
              </p>
              <p class="text-muted mb-0 user-msg">
                <small>{{ $t("navbar.dropdown.notification.3.text") }}</small>
              </p>
            </a>


            <a href="javascript:void(0);" class="dropdown-item notify-item">
              <div class="notify-icon bg-soft-warning text-warning">
                <i class="mdi mdi-account-plus"></i>
              </div>
              <p class="notify-details">
                {{ $t("navbar.dropdown.notification.4.title") }}
                <small class="text-muted">{{
                  $t("navbar.dropdown.notification.4.text")
                }}</small>
              </p>
            </a>


            <a href="javascript:void(0);" class="dropdown-item notify-item">
              <div class="notify-icon bg-info">
                <i class="mdi mdi-comment-account-outline"></i>
              </div>
              <p class="notify-details">
                {{ $t("navbar.dropdown.notification.5.title") }}
                <small class="text-muted">{{
                  $t("navbar.dropdown.notification.5.text")
                }}</small>
              </p>
            </a>


            <a href="javascript:void(0);" class="dropdown-item notify-item">
              <div class="notify-icon bg-secondary">
                <i class="mdi mdi-heart"></i>
              </div>
              <p class="notify-details">
                {{ $t("navbar.dropdown.notification.6.title") }}
                <small class="text-muted">{{
                  $t("navbar.dropdown.notification.6.text")
                }}</small>
              </p>
            </a>
          </simplebar>

          <a
            href="javascript:void(0);"
            class="dropdown-item text-center text-primary notify-item notify-all"
          >
            {{ $t("navbar.dropdown.notification.button") }}
            <i class="fi-arrow-right"></i>
          </a>
        </b-nav-item-dropdown>
        -->

        <!-- coins -->

        <!--
        <b-nav-item-dropdown
          right
          class="topbar-dropdown"
          menu-class="profile-dropdown"
          toggle-class="p-0"
        >
          <template slot="button-content" class="nav-link dropdown-toggle">
            <div class="nav-user mr-0">
              <span class="pro-user-name ml-1">
                Select Coin
                <i class="mdi mdi-chevron-down"></i>
              </span>
            </div>
          </template>
          <b-dropdown-item :key="idx" v-for="(item, idx) in coins">
            <span>{{ item.title }}</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        -->


        <!-- settings -->
        <!--
        <li class="dropdown notification-list">
          <a
            href="javascript:void(0);"
            @click="toggleRightSidebar"
            class="nav-link right-bar-toggle toggle-right"
          >
            <i class="fe-settings noti-icon toggle-right"></i>
          </a>
        </li>
        -->

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


      <!--
      <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
        <li>
          <button
            class="button-menu-mobile waves-effect waves-light"
            @click="toggleMenu"
          >
            <i class="fe-menu"></i>
          </button>
        </li>



        <li>
          <a
            class="navbar-toggle nav-link"
            data-toggle="collapse"
            @click="horizonalmenu()"
            data-target="#topnav-menu-content"
          >
            <div class="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
        </li>

      </ul>
      -->
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

