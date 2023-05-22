<template>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <div class="row">
      <div v-show="!$root.isMobile" class="col-md-3">
        <div class="widget-simple text-center card h-100">
          <div class="card-body">
            <img  :src="'static/coins/' + this.$route.params['id'] + '.png'" alt="item.title" width="80px"/>
            <h3 class="counter mt-2"> {{ coin.title }} [{{ this.$route.params['id'].toUpperCase() }}]</h3>
            <h3 v-if="info.title" class="mb-0">{{ info.title }}</h3>
            <div class="text-left">
              <p v-if="info.text" class="text-muted mb-0">{{ info.text }}</p>
              <ul>
                <li><span :title="$t('download_wallet')" class="text-white">{{coin.downloadWallet}}</span></li>
                <li v-if="coin.explorer" :title="$t('explorer')"><span class="text-white">{{coin.explorer}}</span></li>
              </ul>
              <p>
                <span v-show="coin.bip38" class="badge badge-dark mr-1">BIP38</span>
                <span v-show="coin.bip39" class="badge badge-dark mr-1">BIP39</span>
                <span v-show="coin.brainWallet" class="badge badge-dark mr-1 text-uppercase">{{$t('wallet.brain_wallet')}}</span>
              </p>
              <p v-if="cons.Address">
                <textarea class="w-100 console" rows="14">{{cons}}</textarea>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-9" :class="this.$root.isMobile ? 'p-0 m-0' : ''">
        <div class="widget-simple text-center card h-100" :style="$root.isMobile ? 'border-radius: 0px !important' : ''">
          <div class="card-body text-left " :class="this.$root.isMobile ? 'p-1 m-0' : ''">
            <b-tabs justified nav-class="nav-tabs nav-bordered">
              <b-tab :title="$t('wallet.single_wallet')" active>
                <WalletSingle/>
              </b-tab>
              <b-tab :title="$t('wallet.paper_wallet')">
                <WalletPaper/>
              </b-tab>
              <b-tab :title="!this.$root.isMobile ? $t('wallet.bulk_wallet') : $t('wallet.bulk_wallet_mobile')">
                <WalletBulk/>
              </b-tab>

              <b-tab v-if="coins.bip38" :title="'BIP38 ' + (!this.$root.isMobile ? $t('wallet.encrypt') : '')">
                <Bip38WalletPaper/>
              </b-tab>

              <b-tab v-if="coins.brainWallet" :title="$t('wallet.brain_wallet')">
                <Brain/>
              </b-tab>

              <b-tab :title="$t('wallet.details')">
                <DetailsWalletPaper/>
              </b-tab>


            </b-tabs>
          </div>
        </div>
      </div>


    </div>
  </Layout>
</template>

<script>
import Layout from "@/views/layouts/main";
import PageHeader from "@/components/Page-header";
import {coins, info} from "@/config";
import VueQrcode from '@/components/utils/QRCode';
import WalletSingle from '@/components/wallet/WalletSingle';
import WalletBulk from '@/components/wallet/WalletBulk';
import WalletPaper from '@/components/wallet/WalletPaper';
import Bip38WalletPaper from '@/components/wallet/Bip38WalletPaper';
import DetailsWalletPaper from '@/components/wallet/DetailsWalletPaper';
import Brain from '@/components/wallet/Brain';
import eventBus from '@/plugins/event-bus'

export default {
  name: "Coin",
  head() {
    return {
      title: `${this.title} | Paper Wallet Generator`,
    };
  },
  components: {
    Layout,
    PageHeader,
    VueQrcode,
    WalletSingle,
    WalletPaper,
    WalletBulk,
    Bip38WalletPaper,
    DetailsWalletPaper,
    Brain,
  },
  data() {
    return {
      coins: coins[this.$route.params['id']],
      info: info[this.$route.params['id'].toUpperCase()] || {},
      title: coins[this.$route.params['id']].title + " Paper Wallet Generator",
      items: [
        {
          text: "Coins",
          href: "/",
        },
        {
          text: this.$route.params['id'].toUpperCase(),
          active: true,
        },
      ],
      cons: ''
    };
  },
  computed: {
    coin() {
      return coins[this.$route.params['id']];
    }
  },
  methods: {

  },
  async created() {
    this.$root.coin = this.$route.params['id'];
    eventBus.on('update:cons', async (consData) => {
      this.cons = {
        Address: consData.address,
        PrivateKey: consData.privateKey,

      }
      if (consData.wif !== consData.privateKey) {
        this.cons.Wif = consData.wif;
        this.cons.PrivateKey = consData.privateKey;
      }

      if (consData.password) {
        this.cons.Password = consData.password;
      }
      if (consData.encrypted) {
        this.cons.Bip38EncryptedKey = consData.encrypted;
      }

      if (consData.keyType === 'bip39') {
        this.cons.Wif = ''
      }

      });
  },
}
</script>

<style scoped>
.console {
  background: #000;
  color: greenyellow;
  border: #1b2532;
}
</style>
