<template>
  <ul class="list">
     <li><span :class="{active: selected}" @click="addClass"></span>{{tit}}</li>
     <Tit v-for="(val, index) in shop" 
     :key="index" 
     :tit='val.tit' 
     :event='val.event'
     :price='val.price'
     :ind='index'
     :selected='selected'
     :id='val.id'
     @send='result'
     @changecheck='callback'></Tit>
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
    }
  },
  data () {
    return {
      selected: false,
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
    callback (res) {
      if (res === false) {
        this.selected = false
      }
    },
    addClass () {
      this.selected = !this.selected
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



