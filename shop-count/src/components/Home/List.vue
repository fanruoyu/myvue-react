<template>
  <ul class="list">
     <li><span :class="{active: selected}" @click="addClass"></span>{{tit}}</li>
     <Tit v-for="(val, i) in shop" 
     :key="i" 
     :tit='val.tit' 
     :event='val.event'
     :price='val.price'
     :ind='index'
     :id='i'
     :checked='val.checked'
     @send='result'></Tit>
     <li>订单留言</li>
  </ul>
</template>
<script>
import Tit from './List/Tit'
export default {
  props: {
    shop: {
      type: Array
    },
    tit: {
      type: String
    },
    selected: {
      type: Boolean
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      arr: []
    }
  },
  components: {
    Tit
  },
  methods: {
    result (res) {
      this.$emit('sendsum', res)
    },
    addClass () {
      this.$store.commit('change_selected', {
        index: this.index,
        selected: !this.selected
      })
      this.$store.commit('getSum')
    }
  }
}
</script>
<style scoped>
ul{
  background: #fff;
  width: 100%;
  height: auto;
  padding:.2rem 0;
  margin-bottom: .2rem;
  overflow: hidden;
}
ul li{
  padding: .2rem;
  margin-bottom: .2rem;
  position: relative;
}
ul li span{
  margin-right: .2rem;
 display: inline-block;
  width:.4rem;
  height: .4rem;
  border-radius: 50%;
  border:1px solid #333;
  vertical-align: middle;
}
ul li .active::after{
  content: '';
  position: absolute;
  width: .25rem;
  height: .25rem;
  border-radius: 50%;
  background: #333;
  top:50%;
  left:50%;
  margin-left:-46.4%;
  margin-top:-1.3%;
}
</style>



