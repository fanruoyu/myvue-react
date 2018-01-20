import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    list: {},
    count: 1,
    sum: 0
  },
  mutations: {
    getJson (state, data) {
      state.list = data
    },
    change_selected (state, data) {
      // 全选效果
      state.list.shoplist.forEach((item, index) => {
        if (index === data.index) {
          item.selected = data.selected
          item.shop.forEach((val, ind) => {
            val.checked = data.selected
          })
        }
      })
    },
    change_checked (state, data) {
      // 判断单选
      state.list.shoplist[data.ind].shop[data.id].checked = data.checked
      // flag赋值
      var flag = true
      state.list.shoplist.forEach((val, index) => {
        if (index === data.ind) {
          val.shop.forEach((v, i) => {
            if (!v.checked) {
              flag = false
            }
          })
        }
      })
      // 判断控制全选矿
      state.list.shoplist.forEach((val, ind) => {
        if (ind === data.ind) {
          val.selected = flag
        }
      })
    },
    getcount (state, data) {
      state.list.shoplist[data.ind].shop[data.id].count = data.count
    },
    getSum (state) {
      state.sum = 0
      state.list.shoplist.forEach((val, index) => {
        val.shop.forEach((v, i) => {
          if (v.checked) {
            state.sum += v.count * v.price
          }
        })
      })
    }
  },
  actions: {
    axios_getdata ({commit}) {
      axios.post('/list', {msg: '请求数据'})
      .then(res => {
        commit('getJson', res.data)
      })
    }
  }
})
export default store
