<template>
  <div>
    <div class="col-md-6">
      <b-button
          @click="generateBulk"
          class="btn-soft-primary text-uppercase float-left mr-2"
      ><i class="fas fa-dice"></i> {{$t('wallet.gen_new_addresses')}}
      </b-button>
      <b-input style="width: 80px;" v-model="countWallets" :value="countWallets"></b-input>
    </div>

    <div class="col-md-6">

    </div>

    <hr/>
    <p>{{$t('wallet.many_info')}}</p>
    <textarea class="w-100" rows="20" id="bulktextarea">{{accountsBulk}}</textarea>
  </div>
</template>

<script>
import {coins} from "@/config";

export default {
  name: "Bulk",
  data() {
    return {
      coins: coins[this.$route.params['id']],
      accountsBulk: [],
      countWallets: 3,
    }
  },
  methods: {
    async generateBulk() {
      this.accountsBulk = "";
      const accountsBulk = await this.generateAddress(this.$route.params['id'], this.countWallets);
      for (let i = 0; i < accountsBulk.length; i++) {
        let line = (i + 1) + ',"' + accountsBulk[i].address + '","' + accountsBulk[i].privateKey + '"' + "\r\n";
        this.accountsBulk = this.accountsBulk + line
      }
    }
  },
  async created() {
    //await this.generateBulk();
  },
}
</script>

<style>
#bulktextarea {
  background: #000;
  color: greenyellow;
  border: #1b2532;
}
</style>
