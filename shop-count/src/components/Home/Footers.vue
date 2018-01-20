<template>
  <div class="footer">
    <stages>
      <p>每期还款：￥4000.00/期</p>
      <datas :data='data'></datas>
    </stages>
     <sum :sum='sum'></sum>
  </div>
</template>
<script>
import Sum from './Footer/Sum'
import Stages from './Footer/Stages'
import Datas from './Footer/Datas'
export default {
  props: {
    data: {
      type: Array
    },
    sum: {
      type: Number
    }
  },
  components: {
    Sum,
    Stages,
    Datas
  }
}
</script>
<style scoped>
.footer{
  width: 100%;
  height: auto;
  background:#fff;
}
p{
  border-top:1px solid #ccc;
  padding:.15rem 0;
  text-align: center;
  color:lightcoral
}
</style>


