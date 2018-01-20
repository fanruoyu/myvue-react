<template>
  <div id="heavyProjectDetailEntry">
    <div class="header">
        <img src="../assets/images/logo.png" class="logo" alt="">
    </div>
    <div id="main-con">
      <div class="view-box" id="view-box" style="width:100%;margin:0">
        <router-view></router-view>
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
    // 设置主要内容区域的高度
    setEntryConHeight(){
      var clientHeight=document.documentElement.clientHeight;
      var mainConHeight=parseInt(clientHeight)-60;
      var conDom=document.getElementById('main-con');//获得元素
      conDom.style.height=mainConHeight+"px";
    },
  },
  mounted(){
    this.setEntryConHeight();
  }
}
</script>
<style>
  @import "../assets/css/common.css";
  @import "../assets/css/base.css";
  @import "https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css";
</style>
<style scoped>
</style>
