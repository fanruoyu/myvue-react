import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    list: [],
    count: 1
  },
  mutations: {
    increat (state, val) {
      state.count += 1
      console.log(state.count)
    },
    decreat (state, val) {
      state.count -= 1
    }
  },
  actions: {
    getJson (store) {
      axios.post('/list', {event: '获取数据'})
        .then((res) => {
          console.log(res.data)
          store.state.list = res.data
        })
    }
  },
  getters: {}
})
export default store
