<template>
  <div id="legalReviewTabThree">
    <div class="main">
      <div class="c1 c-tag">
        <div class="fl c1-tit">加建</div>
        <div class="fl c1-con">
          <el-select v-model="value"  filterable size="18" placeholder="" @change="changeTag(value)">
            <el-option 
              v-for="item in signList"
              :key="item.signCode"
              :label="item.signName"
              :value="item.signCode">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="tag-con" v-if="tagCon==1">
        <div class="c3 c-file">
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">消防通过验收的相关证明（符合长租公寓用途）</span>
            </load-file>
          </div>
        </div>
      </div>
      <div class="tag-con" v-if="tagCon==2">
        <div class="c3 c-file">
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">可通过二次消防验收的依据、证明文件</span>
            </load-file>
          </div>
        </div>
        <div class="tex" style="position:relative">
          <p>加建面积（低于总面积5%且仅用于公区、配套等附属区域）</p>
          <div class="remarkBox" v-show="remarkBox==true">
            <p class="remarkCon">注：1、该区域不计入计租面积;</p>
            <p class="remarkCon" style="padding-left:30px">2、如因该部分面积未过消防验收或其他瑕疵导致相关部门处罚的，对方承担全部责任</p>
            <div class="qipao"></div>
          </div>
          <textarea  maxlength="300" placeholder="请输入" @focus="focusFn"  @blur="blurFn"></textarea>
          <span><label>0</label>/300</label></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import loadFile from '../../../components/uploadAttachments'
  export default {
    components: {
      loadFile,
    },
    data () {
      return {    
        value:1,
        tagCon:1,
        remarkBox:false,      //气泡框
        constanaOtherAttachments:[],
        signList:[
          {
            signCode:1,
            signName:'加建面积已通过消防验收'
          },
          {
            signCode:2,
            signName:'未过消防或不符合用途'
          },
        ],
      }
    },
    methods: {
      changeTag(v){
        this.tagCon=v;
      },
      focusFn(){
        this.remarkBox=true;
      },
      blurFn(){
        this.remarkBox=false;
      }
    },
    mounted(){
    }
  }
</script>
<style lang="less">
#legalReviewTabThree{
  .main,
  {
    width:96%;
    padding:0 2%;
    height: auto;
    padding-bottom:50px;
  }
  .c1{
    width:100%;
    height:50px;
    line-height:50px;
  }
  .c1 .c1-tit{
    width:10%;
  }
  .c2{
    width:80%;
    margin-left:10%;
  }
  .tag-con.tex{
    width:100%;
  }
  .tag-con .tex .remarkBox{
    width:600px;
    height:40px;
    padding:5px;
    background:#EEF6FF;
    color:#589FF2;
    border-radius:4px 4px 4px 0;
    position:absolute;
    left:10%;
    top:-5px;
  }
  .tag-con .tex .remarkCon{
    height:20px;
    line-height:20px;
  }
  .tag-con .tex .qipao{
    position:absolute;
    display: block;width:0; 
    height:0; 
    border-top:0; 
    border-bottom:5px solid transparent; 
    border-left:5px solid #EEF6FF;
    left:0;
    bottom:-5px;
  }
  .tag-con .tex textarea{
    height:120px;
    width:82%;
    margin-left:10%;
    padding:2px 1%;
    background:#F9F9F9;
    border:none;
    border-radius:5px;
  }
  .tag-con .tex span{
    position:absolute;
    bottom:15px;
    right:9%;
  }
}
</style>