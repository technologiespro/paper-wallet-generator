<template>
  <Layout>
    <div class="page-title-box page-title-box-alt">


      <h4 class="page-title font-weight-light">{{$t('wallet.coins_list')}}</h4>
      <div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item">
        <span class="text-white">Wallet <span class="text-left small"> v.{{packageJson.version}}</span></span>
      </li>
        <li class="breadcrumb-item active"><span aria-current="location">{{$t('wallet.select_coin')}}</span></li></ol></div>
    </div>
    <div class="row">
      <div v-if="!$root.isMobile" class="col-xl-2 col-md-3 col-sm-6 col-xs-6" :key="idx" v-for="(item, idx) in coins">
        <h4 @click="openCoin(idx)" class="text-white counter mt-2 select-coin font-weight-light text-center"><img :src="'static/coins/' + item.ticker.toLowerCase() + '.png'" alt="item.title" width="20px"/> {{ item.title }}
        </h4>
      </div>
      <div v-if="$root.isMobile" class="col-6" :key="idx" v-for="(item, idx) in coins">
        <h5 @click="openCoin(idx)" class="text-white counter mt-2 select-coin font-weight-light text-center"><img :src="'static/coins/' + item.ticker.toLowerCase() + '.png'" alt="item.title" width="20px"/> {{ item.title }}
        </h5>
      </div>
    </div>

  </Layout>
</template>

<script>
import Layout from "../layouts/main";
import PageHeader from "@/components/Page-header";
import {coins} from "@/config";
import packageJson from '../../../package.json';
/**
 * Starter component
 */
export default {
  head() {
    return {
      title: `${this.title} | Paper Wallet Generator`,
    };
  },
  data() {
    return {
      packageJson,
      coins: coins,
    };
  },
  components: {
    Layout,
    PageHeader,
  },

  methods: {
    async openCoin(coin) {
      await this.$router.push("/coin/" + coin);
    },

  },

  async created() {
    if (this.$root.isMobile) {
      this.coins['etc'].title = 'ETC';
    }
  }

};
</script>


<style>
.select-coin {
padding: 12px;
  border-radius: 6px;
  background: #393960;
  border: 0 solid #393960;
}

.select-coin:hover {
  cursor: pointer;
  background: #048f76
}

.footer {
  bottom: 0;
  padding: 19px 15px 20px;
  position: absolute;
  right: 0;
  color: #8c98a5;
  left: 240px;
  background-color: #393960;
}
</style>

