<template>
  <div id="commentDiscuss">
      <transition name="fade" mode="out-in">
        <div class="closeNav">
          <p class=" tit fl" :title="childParm.projectName">{{childParm.projectName}}</p>
          <span class="closeButton fr" @click="close">关闭</span>
        </div>
      </transition>
      <div id="conMod">
        <div class="title f18">意见讨论</div>
        <div class="main">
          <div>产品汪正在努力设计，敬请期待！</div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        projectId:'',
      }
    },
    methods: {
      run (fun,parm) {

      },
       // 关闭函数
      close () {
        var that=this;
        this.cancelDialogue(function(){
          that.$emit('cancelThePage', 1);
        });
      },
    },
    mounted(){
      this.setConHeight();
    },
    props:   
    {
      childParm:Object
    }
  }
</script>
<style scoped>
#commentDiscuss{
  width:100%;
  overflow: auto;
}
#commentDiscuss .title{
    width:96%;
    height:40px;
    line-height:40px;
    color:#fff;
    color:#444;
    padding:0 2%;
    border-bottom:2px solid #f9f9f9;
}
#commentDiscuss .main{
  padding:20px 3%;
  width:94%;
  height: auto;
}
#commentDiscuss .main div{
  width:100%;
  height:400px;
  line-height:400px;
  text-align: center;
}
</style>
