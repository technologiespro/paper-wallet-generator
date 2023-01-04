<script>
import packageJson from '../../package.json'
/**
 * Footer Component
 */
export default {
  data() {
    return {
      packageJson
    }
  },
}
</script>

<template>
<!-- Footer Start -->
<footer class="footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2">
                {{ new Date().getFullYear()}} &copy; Powered by <a href="https://github.com/technologiespro">TechnoL0g</a> <span class="text-left text-white-50 small">v.{{packageJson.version}}</span>
            </div>
            <div class="col-md-8 text-danger">
              {{$t('demo')}} <a class="text-uppercase" href="https://paperwallet.top/">>>{{$t('download_wallet')}}<<</a>
            </div>
            <div class="col-md-2">
                <div class="text-md-right footer-links d-none d-sm-block">
                    <a target="_blank" href="https://xbts.io"><img height="16px" src="static/logo/xbts.png"/> XBTS DEX</a>
                    <a target="_blank" href="https://app.xbts.io"><img height="16px" src="static/logo/defi.png"/> DeFi</a>
                </div>
            </div>
        </div>
    </div>
</footer>
<!-- end Footer -->
</template>
