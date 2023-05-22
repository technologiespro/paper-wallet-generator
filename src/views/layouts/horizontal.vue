<template>
  <!-- Begin page -->
  <div id="wrapper">
    <Topbar/>
    <!--
    <HorizontalNavbar
      :type="topbar"
      :width="layoutWidth"
      :menu="menuPosition"
    />
    -->
    <div class="content-page" :class="$root.isMobile ? 'p-0 m-0' : ''">
      <div class="content">
        <div class="container-fluid">
          <div v-if="this.$route.name === 'home' && !$root.isMobile && !$root.hideBanners" class="row">
            <div class="col-md-4 m-0 p-0 overflow-hidden">
              <img class="w-100" :src="'static/banners/' + this.$i18n.locale+ '1.png'"/>
            </div>
            <div class="col-md-4 m-0 p-0 overflow-hidden">
              <img class="w-100" :src="'static/banners/' + this.$i18n.locale+ '2.png'"/>
            </div>
            <div class="col-md-4 m-0 p-0 overflow-hidden">
              <img class="w-100" :src="'static/banners/' + this.$i18n.locale+ '3.png'"/>
            </div>
          </div>

          <slot/>

        </div>
      </div>

      <div v-if="settings.isWeb">
        <Footer />
      </div>


    </div>

  </div>
</template>

<script>
import {layoutComputed} from "@/state/helpers";
import {settings} from "@/config";

import Topbar from "@/components/Topbar";

/**
 * Horizontal layout
 */
export default {
  data() {
    return {
      settings,
    };
  },
  components: {
    Topbar,
    'Footer': () => import('@/components/Footer')
  },
  computed: {
    ...layoutComputed,
  },
  mounted() {
    document.body.setAttribute("data-layout-mode", "horizontal");
  },
  methods: {
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
  },
};
</script>



<style>
.banner-content {
  height: 120px; overflow: hidden; overflow-y: auto;
}

.banner-text {
  position: absolute;
  margin-left: 42%;
  margin-top: 28px;
}

.banner-head {
  font-weight: bolder;
  text-shadow: 1px 1px 0.8em red;
  color: orange;
}
</style>
