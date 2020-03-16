import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import {store} from './store/store.js'
import {router} from './routes.js'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
