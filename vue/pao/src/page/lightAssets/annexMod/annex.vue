<template>
  <div id="annexInfo">
    <div class="closeNav">
      <p class=" tit fl" :title="childParm.projectName">{{childParm.projectName}}</p>
      <div><span class="closeButton fl" @click="close">关闭</span></div>
    </div>
    <div id="conMod">
      <div class="title f18">附件</div>
      <div class="main">
        <div class="info" v-if="v.majorTypeDesc!='附件'" v-for="(v, index) in datas">
          <div class="tit">{{v.majorTypeDesc}}</div>
          <div class="tableList">
            <download-file  :tableData="v.files"></download-file>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import downloadFile from '../../../components/downloadFile'
export default {
  name: 'annexInfo',
  components: {
    downloadFile: downloadFile
  },
  data () {
    return {
      projectId: '',
      datas: ''
    }
  },
  methods: {
    // 获取父组件的projectId
    run (fun, parm) {
      if (fun === 'getId') {
        this.projectId = parm
        this.getAnnexInfo(this.projectId)
      }
    },
    /**
    **  获取附件信息
    **
    **/
    getAnnexInfo (projectId) {
      this.$http.post('/longcity/services/light/v1/lightProject/getLightMajorAttarches', {
        // 'projectId': projectId
        'lightProjectId': 1
      })
      .then(
        success => {
          if (success.data.code === 200 || success.data.code === '200') {
            this.datas = success.data.result.attaches
          }
        },
      )
    },
     // 关闭函数
    close () {
      var that = this
      this.cancelDialogue(function () {
        that.$emit('cancelThePage', 1)
      })
    }
  },
  mounted () {
    this.setConHeight()
    this.getAnnexInfo()
  },
  props: {
    childParm: Object
  }
}
</script>
<style scoped>
#conMod{
  width:100%;
  overflow: auto;
}
#annexInfo .title{
    width:96%;
    height:40px;
    line-height:40px;
    color:#fff;
    color:#444;
    padding:0 2%;
    border-bottom:2px solid #f9f9f9;
}
#annexInfo .main{
  padding:20px 3%;
  width:94%;
  height: auto;
}
#annexInfo .main .info .tit{
  height:40px;
  line-height: 40px;
}
#annexInfo .main .info .tabelList{
  width:100%;
  height: auto;
}
</style>
