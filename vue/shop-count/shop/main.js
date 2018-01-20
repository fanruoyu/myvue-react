// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './style/style.css'
import './api/rem.js'
import mock from './Mock/mock'
import store from './vuex'
import './directive/directive.js'
import vueBus from 'vue-bus'
Vue.use(vueBus)
mock.bootstrap()
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
