<template>
  <div>
    <div v-if="coins">
    <div class="button-list">
      <b-button
          @click="getNewAccounts"
          class="btn-soft-primary text-uppercase"
      ><i class="fas fa-dice"></i> {{$t('wallet.new_address')}}
      </b-button>

      <b-button v-if="coins.trade && settings.isWeb" target="_blank" :href="coins.trade"
                class="btn-soft-primary text-uppercase"
      ><i class="fe-bar-chart-2"></i> {{$t('wallet.buy_trade')}} {{ coins.title }}
      </b-button>

      <b-button v-if="coins.defi" target="_blank" :href="coins.defi"
                class="btn-soft-primary text-uppercase"
      ><i class="fe-bar-chart-2"></i> DeFi {{ coins.title }}
      </b-button>

    </div>
    <hr/>
    <div class="row" v-if="accounts[0]">
      <div class="col-md-6 text-center border-right">
        <h4 class="text-success text-uppercase"><span class="badge badge-success font-weight-light">
          <i class="ri-wallet-line"></i></span> {{ coins.title }} Address</h4>
        <VueQrcode :options="{size:150, foreground: '#232D3D',level: 'H'}" :value="accounts[0].address"
                   id="qrPub"/>
        <p class="bg-success text-white p-1">{{ accounts[0].address }}</p>
        <hr/>
        <p>{{$t('wallet.info_public')}}</p>
      </div>
      <div class="col-md-6 text-center">
        <h4 class="text-danger text-uppercase"><span class="badge badge-danger font-weight-light">
          <i class="ri-key-2-line"></i></span> Private Key {{accounts[0].keyType}}</h4>
        <VueQrcode :options="{size:150, foreground: '#232D3D',level: 'H'}" :value="accounts[0].wif"
                   id="qrPriv"/>
        <p class="bg-danger text-white p-1"><span class="">{{ accounts[0].privateKey }}</span></p>
        <hr/>
        <p>
          <i class="mdi mdi-alert-outline text-danger" style="font-size: 28pt;"></i><br/>
          {{$t('wallet.warn')}}
        </p>

      </div>
    </div>

    <div v-show="this.coins.generator === 'btcGenerator'" role="tablist" class="mb-3">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" role="tab">
          <h5 class="m-0">
            <a
                v-b-toggle.customaccordion-1
                class="text-dark"
                href="javascript: void(0);"
            >
              <i class="mdi mdi-help-circle mr-1 text-primary"></i> {{$t('wallet.how_to_import')}}
            </a>
          </h5>
        </b-card-header>
        <b-collapse
            id="customaccordion-1"
            visible
            aria-expanded="false"
            accordion="accordion"
            role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              <ul>
                <li>{{$t('import.open')}}</li>
                <li>{{$t('import.select')}}</li>
                <li>{{$t('import.enter')}}</li>
                <li>{{$t('import.wait')}}</li>
              </ul>

            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    </div>
  </div>
</template>

<script>
import {coins, settings} from "@/config";
import VueQrcode from '@/components/utils/QRCode';

export default {
  name: "WalletSingle",
  components: {
    VueQrcode,
  },
  data() {
    return {
      settings,
      coins: coins[this.$route.params['id']],
      accounts: [],
    };
  },
  methods: {
    async getNewAccounts() {
      this.accounts = await this.generateAddress(this.$route.params['id'], 1);
    },
  },
  async created() {
    await this.getNewAccounts();
    this.$root.coin = this.$route.params['id'];
  },
}
</script>

<style scoped>

</style>
