<template>
  <div class="sum">
      <p>总金额：￥<span>{{sum}}</span></p>
      <button>申请分期</button>
  </div>
</template>
<script>
export default {
  props: {
    sum: {
      type: Number
    }
  }
}
</script>

<style scoped>
.sum{
 height: 1rem;
 width: 100%;
 border-top:1px solid #ccc;
 position: relative;
}
p{
    padding-left:.2rem;
    line-height: 1rem;
    color:#5C5C5C;
}
button{
    position: absolute;
    right: 0;
    top:0;
    height: 100%;
    width: 35%;
    border:0;
    background:#FD6B3C;
    font-size: .38rem;
    color:#fff;
}
</style>

