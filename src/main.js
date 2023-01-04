import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import simplebar from "simplebar-vue";
import VueTour from 'vue-tour'
import vco from "v-click-outside"
import i18n from './i18n'
import eventBus from '@/plugins/event-bus'
import mixins from './mixins'

import router from './router'
import store from '@/state/store'

import VueApexCharts from 'vue-apexcharts'
import VueStringFilter from 'vue-string-filter'
import Lightbox from 'vue-easy-lightbox'

Vue.config.productionTip = false
Vue.prototype.$eventBus = eventBus

Vue.use(vco)

// As a plugin
import VueMask from 'v-mask'
//import VueQuillEditor from 'vue-quill-editor'
//import VueDraggable from "vue-draggable";
//Vue.use(VueDraggable);
//Vue.use(VueQuillEditor)
Vue.use(VueMask);

import VueSlideBar from 'vue-slide-bar'

Vue.component('VueSlideBar', VueSlideBar)

//import { initFirebaseBackend } from './authUtils';

import { configureFakeBackend } from './helpers/fake-backend';
/*
const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTId,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPId,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};
 */

/*
if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
  initFirebaseBackend(firebaseConfig);
} else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
  configureFakeBackend();
}
 */
configureFakeBackend();

Vue.component('apexchart', VueApexCharts)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(require('vue-chartist'))
Vue.component('simplebar', simplebar)
Vue.use(VueStringFilter)
Vue.use(VueTour)
Vue.use(Lightbox)
Vue.mixin(mixins);
import "@/assets/scss/app.scss";

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
