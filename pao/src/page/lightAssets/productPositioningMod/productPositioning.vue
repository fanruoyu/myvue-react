<template>
  <div id="productPositioning">
    <div class="closeNav">
      <p class=" tit fl">{{childParm.projectName}}</p>
      <div v-if="btnNone==true">
        <span class="closeButton fl" @click="close">关闭</span>
        <span class="saveButton fl">保存</span>
      </div>
      <div v-else="btnNone==false">
        <span class="closeButton fr" @click="close">关闭</span>
      </div>
    </div>
    <div id="conMod">
      <div class="dec">
        <div class="fl">简介</div>
        <textarea class="fl" placeholder="请输入简介" maxlength="300"></textarea>
        <span><label>0</label>/300</label></span>
      </div>
      <div class="main">
        <div class="main-con">
          <el-tabs v-model="activeName" @tab-click="">
            <el-tab-pane label="基本信息" name="first">
              <tab-one></tab-one>
            </el-tab-pane>
            <el-tab-pane label="长租公寓" >
              <tab-two></tab-two>
            </el-tab-pane>
            <el-tab-pane label="联合办公" >
              <tab-three></tab-three>
            </el-tab-pane>
            <el-tab-pane label="配套商业" >
              <tab-four></tab-four>
            </el-tab-pane>
            <el-tab-pane label="其他附件" >
              <tab-five></tab-five>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import tabOne from './tabOne'
  import tabTwo from './tabTwo'
  import tabThree from './tabThree'
  import tabFour from './tabFour'
  import tabFive from './tabFive'
  export default {
    name:'productPositioning',
    props: ['childParm'],
    components:{
      tabOne:tabOne,
      tabTwo:tabTwo,
      tabThree:tabThree,
      tabFour:tabFour,
      tabFive:tabFive
    },
    data () {
      return {    
        btnNone:true,          //true 显示
        activeName:'first',     //tab选项卡默认选中
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
    },
    mounted (){
      this.setConHeight();
    }
  }
</script>
<style lang="less">
#productPositioning{
  .main{
    width:100%;
    height: auto;
  }
  .main-con{
    height:50px;
    line-height:50px;
  }
  .dec{
    padding:20px 3%;
    width:94%;
    height:100px;
    position:relative;
  }
  .dec div{
    width:10%;
    height:100%;
  }
  .dec textarea{
    width:84%;
    height:100px;
    background:#F9F9F9;
    border:none;
    border-radius:5px;
    padding:5px 1%;
  }
  .dec span{
    position:absolute;
    bottom:15px;
    right:9%;
  }
  .main .main-con{
    width:100%;
    height:50px;
    line-height:50px;
    background:#F9F9F9;
    box-shadow:2px 2px 5px #d1dbe5;
  }
}
</style>