
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vue from "vue/dist/vue.common.js";
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import store from './store'
import config from './config/index'
import 'weui/dist/style/weui.min.css'
// import '../src/style/color.scss'
import 'amfe-flexible/index'
import './assets/style/normalize.css'
import VueTouch from 'vue-touch'
import Cops from './components/index'
import { Toast } from 'mint-ui'
Vue.use(Mint)
Vue.use(Cops)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.config.productionTip = false
Vue.prototype.config = config
/* eslint-disable no-new */

// let width = window.innerWidth / 10
// document.documentElement.style.fontSize = width + 'px'


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
  // render: (createElement) => createElement(App)
})
// new Vue({
//   el: '.show',
//   render: (createElement) => createElement(App)
// });

