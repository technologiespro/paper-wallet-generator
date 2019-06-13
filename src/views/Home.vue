<template>
  <div class="home">
    <Generator/>
    <footer id="sticky-footer" class="py-2 bg-dark">
      <div class="container text-center">
        <small>
          Powered by TechnoL0g
            <img class="link" @click="openLink('https://github.com/technologiespro/paper-wallet-generator/releases')" height="26px" src="static/logo/github.png"/>
            <img class="link" @click="openLink('https://ex.xbts.io')" height="24px" src="static/logo/xbts.png"/>
        </small>
      </div>
    </footer>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Generator from '@/components/Generator.vue'
  import {openUrl} from 'src/util/url'

  export default {
    name: 'home',
    components: {
      Generator,
    },
    methods: {
      openLink(link) {
        openUrl(link);
      }
    }
  }
</script>

<style>
  #sticky-footer {
    background: #1C2532 !important;
    flex-shrink: none;
    color: #FAFBFC !important;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

  #sticky-footer .link {
    margin-left: 15px;
  }

  #sticky-footer .link:hover {
    cursor: pointer;
  }

  .dm-base-divider--large {
    margin: 20px auto !important;
  }
</style>
