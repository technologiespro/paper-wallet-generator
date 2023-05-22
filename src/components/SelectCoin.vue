<template>
  <div>
    <div @click="selectShowHide" class="selected-coin p-2 mb-1 border pointer no-select">
      <img class="mb-1"
           :src="'static/coins/' + symbol + '.png'"/>
      <span class="ml-2">{{ symbol }}</span>
      <i class="float-right" :class="listShow ? 'icon-arrow-up' : 'icon-arrow-down'"></i>
    </div>


    <div v-show="listShow" class="select-asset-container card p-2 no-select">
      <div class="select-asset-filter">
        <div class="w-100">
          <div class="input-group input-group-sm mt-1">
            <div class="input-group-prepend hover-cursor">
                    <span class="input-group-text">
                      <i class="ti-search"></i>
                    </span>
            </div>
            <input
                v-model="coinFilter"
                aria-describedby="search"
                aria-label="search"
                class="form-control text-uppercase"
                placeholder="asset"
                type="text"
            />
          </div>
        </div>
      </div>
      <div v-if="gateways" class="select-asset p-2 m-2">

        <div>
          <div @click="selectAsset(item)"
               class="select-asset-item w-100 pl-3 pb-1 pt-1 border-bottom border-dark" v-for="item in assets"
               v-bind:key="item" v-show="item.includes(coinFilter.toUpperCase())">
            <span><img
                :src="'images/assets/' + item.replace('XBTSX.','').toLowerCase() + '.png'"/> {{
                item.replace('XBTSX.', '')
              }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {coins} from '@/config';
import eventBus from '@/plugins/event-bus';

export default {
  name: "SelectCryptoDeposit",
  data() {
    return {
      coinFilter: '',
      listShow: false,
      assets: coins,
      symbol: 'BTC',
      op: 'deposit'
    }
  },
  methods: {
    async selectShowHide() {
      this.coinFilter = '';
      this.listShow = !this.listShow;
    },
    async selectAsset(asset = 'BTC') {
      this.symbol = asset;
      this.listShow = false;
      await this.$router.push('/coin/' + asset);
    }
  },
  async created() {

  }
}
</script>

<style>
.select-asset {
  width: 252px;
  min-width: 252px;
  height: 300px;
  overflow-y: auto;
}

.select-asset img {
  width: 16px;
  height: 16px;
}

.select-asset-item:hover {
  cursor: pointer;
  color: #ffffff;
  background: #1a1f26;
}

.select-asset-container {
  width: 278px;
  min-width: 278px;
  position: absolute;
  z-index: 1000;
}

.pointer:hover {
  cursor: pointer;
}

.selected-coin {
  width: 278px;
  min-width: 278px;
}

.selected-coin img {
  width: 16px;
  height: 16px;
}

</style>
