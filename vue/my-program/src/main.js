import Vue from 'vue'
import App from './App.vue'
import './stantic/fontSize.js'
import './stantic/reast.css'
import axios from './http/axios.js'
import router from './routers/router.js'
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
