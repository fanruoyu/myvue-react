<template>
  <div id="projectInfo">
    <div class="closeNav">
      <p class=" tit fl">新建项目</p>
      <div v-if="btnNone==true">
        <span class="closeButton fl" @click="close">关闭</span>
        <span class="saveButton fl">保存</span>
      </div>
      <div v-else="btnNone==false">
        <span class="closeButton fr" @click="close">关闭</span>
      </div>
    </div>
    <div id="conMod">
      <div class="main">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'projectInfo',
    data () {
      return {    
        btnNone:true,          //true 显示
      }
    },
    methods: {
      // 关闭函数
      close () {
        var that=this;
        this.cancelDialogue(function(){
          that.$emit('cancelThePage', 1);
        });
      },
    }
  }
</script>
<style lang="less">
#projectInfo{
  .main{
    padding:20px 3%;
    width:94%;
    height: auto;
  }
}
</style>
