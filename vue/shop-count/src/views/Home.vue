<template>
  <div class="shop">
      <headers></headers>
      <div class="shoplist">
           <list 
           v-for="(item, index) in $store.state.list.shoplist" 
           :key="index"
           :tit='item.tit'
           :shop='item.shop'
           :selected='item.selected'
           :index='index'></list>
      </div>
      <footers :data='$store.state.list.datas' :sum='$store.state.sum'></footers>
  </div>
</template>
<script>
import Headers from '@/components/Home/Headers'
import List from '@/components/Home/List'
import Footers from '@/components/Home/Footers'
export default {
  components: {
    Headers,
    List,
    Footers
  },
  data () {
    return {
      sum: 0
    }
  },
  created () {
    this.$store.dispatch('axios_getdata')
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



