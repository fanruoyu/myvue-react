<template>
  <div id="legalReviewTabFive">
    <div class="main">
      <div class="tag-con" v-if="tagCon==1">
        <div class="c3 c-file">
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">变更用途<em style="margin-left:30px">区级以上政府部门出具的同意变更用途的批复文件</em></span>
            </load-file>
          </div>
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
        constanaOtherAttachments:[],
      }
    },
    methods: {
    },
    mounted(){
    }
  }
</script>
<style lang="less">
#legalReviewTabFive{
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
  .c3 .tex{
    width:100%;
  }
}
</style>