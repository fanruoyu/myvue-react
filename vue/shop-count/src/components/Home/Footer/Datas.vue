<template>
  <div class="datas">
      <p v-for="(item, index) in data" :key="index">
          <span>{{item.number}}</span>
          <small>({{item.reset}}手续费)</small>
      </p>
  </div>
</template>
<script>
export default {
  props: ['data']
}
</script>
<style scoped>
.datas{
    width: 100%;
    height: auto;
    border-top:1px solid #ccc;
    display: flex;
    justify-content: space-around;
    padding:.2rem 0;
}
p{
  background: #FD6B3C;
  color:#fff;
  border-radius: 5px;
  text-align: center;
  padding:.1rem .2rem;
}
span{
    display: block;
}

</style>


