// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Mint from 'mint-ui';     //import mint
import 'mint-ui/lib/style.css';  //import mint

import fastClick from 'fastclick'
import Axios from  'axios'


Vue.use(Mint);                    //use mint
Vue.prototype.$axios = Axios;
fastClick.attach(document.body)
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
