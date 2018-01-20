<template>
  <div id="legalReviewTabTwo">
    <div class="main">
      <div class="c1 c-tag">
        <div class="fl c1-tit">权属</div>
        <div class="fl c1-con">
          <el-select v-model="value"  filterable size="12" placeholder="" @change="changeTag(value)">
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
              <span slot="title">产权证</span>
            </load-file>
          </div>
        </div>
      </div>
      <div class="tag-con" v-if="tagCon==2">
        <div class="c3 c-file">
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">提供验收手续、销售合同等</span>
            </load-file>
          </div>
        </div>
      </div>
      <div class="tag-con" v-if="tagCon==3">
        <div class="c3 c-file">
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">土地证、用地及建设工程规划许可证等</span>
            </load-file>
          </div>
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">证明相关主体享有处分权的相关文件</span>
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
        signList:[
          {
            signCode:1,
            signName:'有产权证'
          },
          {
            signCode:2,
            signName:'无产权证-可办理'
          },
          {
            signCode:3,
            signName:'无产权证-无法办理'
          },
        ],
      }
    },
    methods: {
      changeTag(v){
        this.tagCon=v;
      }
    },
    mounted(){
    }
  }
</script>
<style lang="less">
#legalReviewTabTwo{
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
}
</style>