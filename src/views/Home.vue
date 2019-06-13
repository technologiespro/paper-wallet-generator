<template>
    <div class="home">
        <Generator/>
      <footer id="sticky-footer" class="py-2 bg-dark">
        <div class="container text-center">
          <small>
            Powered by TechnoL0g
            <a href="https://github.com/technologiespro/paper-wallet-generator/releases"><img height="26px" src="static/logo/github.png"/></a>
            <a href="https://ex.xbts.io"><img height="24px" src="static/logo/xbts.png"/></a>
          </small>
        </div>
      </footer>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Generator from '@/components/Generator.vue'
    // import open from 'open'

    export default {
        name: 'home',
        components: {
            Generator
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

  #sticky-footer a {
    margin-left: 15px;

  }

  .dm-base-divider--large {
    margin: 20px auto !important;
  }
</style>
