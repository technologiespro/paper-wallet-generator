import Vue from 'vue'
import VueDarkMode from "vuedarkmode";
import Clipboard from 'v-clipboard'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css';
import '@/css/styles.css';

Vue.use(VueDarkMode);
Vue.use(Clipboard);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
