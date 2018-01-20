<template>
  <div class="shop">
      <headers></headers>
      <div class="shoplist">
           <list 
           v-for="(item, index) in list.shoplist" 
           :key="index"
           :tit='item.tit'
           :shop='item.shop'
           @sendsum='getSum'></list>
      </div>
      <footers :data='list.datas' :sum='sum'></footers>
  </div>
</template>
<script>
import Headers from '@/components/Home/Headers'
import List from '@/components/Home/List'
import Footers from '@/components/Home/Footers'
import Vuex from 'vuex'
let {mapActions, mapState} = Vuex
export default {
  components: {
    Headers,
    List,
    Footers
  },
  data () {
    return {
      arr: [],
      sum: 0
    }
  },
  methods: {
    ...mapActions(['getJson']),
    getSum (obj) {
      if (obj.bool) {
        this.arr[obj.id] = obj.sum
      } else {
        this.selectall = false
        this.arr[obj.id] = 0
      }
      let sum = 0
      for (let i in this.arr) {
        sum += this.arr[i]
      }
      this.sum = sum
    }
  },
  mounted () {
    this.getJson()
  },
  computed: {
    ...mapState(['list'])
  }
}
</script>
<style scoped>
.shop{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.shoplist{
     flex: 1;
    background:#F4F4F4;
    overflow-y: scroll;
}
</style>



