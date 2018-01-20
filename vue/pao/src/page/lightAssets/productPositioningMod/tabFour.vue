<template>
  <div id="productPositionTabOneFour">
    <div class="main">
      <div class="c1">
        <ul>
          <li>
            <span>配套商业总建设面积</span>
            <input type="text" name="">
            <label>平米</label>
          </li>
          <li>
            <span>配套商业总可租赁面积</span>
            <input type="text" name="">
            <label>平米</label>
          </li>
        </ul>
      </div>
      <div class="tag-con">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {    

      }
    },
    methods: {
    },
    mounted(){
    }
  }
</script>
<style lang="less">
#productPositionTabOneFour{
  .main{
    width:96%;
    padding:0 2%;
    height: auto;
    padding-bottom:50px;
  }
  .c1{
    width:92%;
    margin-left:4%;
    height:50px;
    border:1px solid #DDDDDD;
    padding-top:20px;
    padding-bottom:10px;
    border-radius:4px;
  }
  .c1 ul{
    width:100%
  }
  .c1 ul li{
    width:49%;
    float:left;
    height:50px;
  }
  .c1 ul li span{
    width:150px;
    height:50px;
    line-height:40px;
    float:left;
    text-align:right;
  }
  .c1 ul li input{
    height:30px;
    padding:2px;
    float:left;
    margin:0 10px;
  }
  .c1 ul li label{
    display:inline-block;
    height:40px;
    line-height:40px;
    float:left;
  }
  .tag-con {
    width:100%;
  }
}
</style>