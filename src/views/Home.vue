<template>
  <div class="home">
    <Generator/>
    <footer id="sticky-footer" class="py-2 bg-dark">
      <div class="container text-center noselect">
        <span class="text-left text-white-50 small">v.{{packageJson.version}}</span>
        <small>
            <img class="link" @click="openLink('https://github.com/technologiespro/paper-wallet-generator/releases')" height="26px" src="static/logo/github.png"/>
            <img class="link" @click="openLink('https://xbts.io')" height="24px" src="static/logo/xbts.png"/>
        </small>
      </div>
    </footer>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Generator from '@/components/Generator.vue'
  import {openUrl} from 'src/util/url'
  import packageJson from '../../package.json'

  export default {
    name: 'home',
    components: {
      Generator,
    },
    data() {
      return {
        packageJson
      }
    },
    methods: {
      openLink(link) {
        openUrl(link)
      },
    },
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


</style>
