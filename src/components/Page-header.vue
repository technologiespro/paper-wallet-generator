<script>
import { layoutComputed } from "@/state/helpers";

/**
 * Page-header component
 */
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "Paper Wallet",
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    ...layoutComputed,
  },
};
</script>

<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div
        class="page-title-box"
        :class="{
          'page-title-box-alt':
            layoutType !== 'vertical' && layoutType !== 'two-column',
        }"
      >
        <h4 v-show="!$root.isMobile" class="page-title">{{ title }}</h4>
        <div class="page-title-right">
          <router-link to="/">{{$t('wallet.coins_list')}}</router-link> > {{ this.$route.params['id'].toUpperCase() }} <img v-show="$root.isMobile"  :src="'static/coins/' + this.$route.params['id'] + '.png'" alt="item.title" width="20px"/>
        </div>
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>
