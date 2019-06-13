<template>
    <div class="home">
        <Generator/>
      <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
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

    export default {
        name: 'home',
        components: {
            Generator
        }
    }
</script>

<style>
  #sticky-footer {
    flex-shrink: none;
    color: #FAFBFC !important;
  }

  #sticky-footer a {
    margin-left: 15px;

  }
</style>
