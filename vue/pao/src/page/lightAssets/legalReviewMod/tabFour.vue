<template>
  <div id="legalReviewTabFour">
    <div class="main">
      <div class="c1 c-tag">
        <div class="fl c1-tit">抵押</div>
        <div class="fl c1-con">
          <el-select v-model="value"  filterable size="35" placeholder="" @change="changeTag(value)">
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
              <span slot="title">抵押登记文件</span>
            </load-file>
          </div>
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">《承诺函》</span>
            </load-file>
          </div>
        </div>
      </div>
      <div class="tag-con" v-if="tagCon==2">
        <div class="tex" style="position:relative">
          <p>设置合同条款</p>
          <div class="remarkBox" v-show="remarkBox==true">
            <p class="remarkCon">注：因抵押权人实现抵押造成冠寓无法继续经营的，对方承担全部责任</p>
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
            signName:'抵押人认可冠寓的租赁或委托关系'
          },
          {
            signCode:2,
            signName:'抵押人拒绝配合出具认可租赁或委托关系的文件'
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
#legalReviewTabFour{
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
  tag-con .tex{
    width:100%;
  }
  .tag-con .tex .remarkBox{
    width:600px;
    padding:5px;
    background:#EEF6FF;
    color:#589FF2;
    border-radius:4px 4px 4px 0;
    position:absolute;
    left:10%;
    top:15px;
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