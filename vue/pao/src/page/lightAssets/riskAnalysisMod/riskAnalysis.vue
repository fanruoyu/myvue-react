<template>
  <!--风险分析-->
  <div id="riskAnalysis">
    <transition name="fade" mode="out-in">
      <div class="closeNav">
        <p class=" tit fl" title="">{{childParm.projectName}}</p>
        <div>
          <span class="closeButton fl" @click="close">关闭</span>
          <!--<span class="saveButton fl" @click="save" v-if="childParm.modAuth==2">保存</span>-->
          <span class="saveButton fl" @click="save">保存</span>
        </div>
      </div>
    </transition>
    <div class="riskContent" id="conMod">
      <div class="titleAndContent">
        <span class="name width16">简介</span>
        <textarea class="textBox  width77" placeholder="请输入简介" v-model="riskAnalysis.riskanalyInfor" maxlength="300"></textarea>
        <span class="statisticsNum">{{riskAnalysis.riskanalyInfor==undefined?0:riskAnalysis.riskanalyInfor.length}}/300</span>
      </div>
      <p class="title">风险分析</p>
      <div class="analysisContent">
        <div class="chooseBox">
          <span class="fl mr43">风险类型</span>
          <!--<span class="chooseEvery ml38 active">报建风险</span>
          <span class="chooseEvery">验收风险</span>-->
          <el-checkbox-group
            v-model="riskAnalysis.riskanalyRiskCategories" class="fl">
            <el-checkbox v-for="item in dictionariesList[0].items" :label="item.dictCode" :key="item.dictCode">{{item.dictName}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="describeBox">
          <span class="name">具体描述</span>
          <textarea class="textBox" placeholder="请输入具体描述" v-model="riskAnalysis.riskanalyDesc" maxlength="300"></textarea>
          <span class="statisticsNum">{{riskAnalysis.riskanalyDesc==undefined?0:riskAnalysis.riskanalyDesc.length}}/300</span>
        </div>
        <div class="describeBox">
          <span class="name">风险等级</span>
          <!--<el-select v-model="item.standard" style="width:120px;" placeholder="请选择">-->
          <el-select v-model="riskAnalysis.riskanalyRiskLevel" style="width:193px;" placeholder="请选择">
            <el-option
              v-for="item in dictionariesList[1].items"
              :key="item.dictName"
              :label="item.dictName"
              :value="item.dictCode">
            </el-option>
          </el-select>
        </div>
        <div class="describeBox">
          <span class="name">解决方案</span>
          <textarea class="textBox" placeholder="请输入解决方案" v-model="riskAnalysis.riskanalySolution" maxlength="300"></textarea>
          <span class="statisticsNum">{{riskAnalysis.riskanalySolution==undefined?0:riskAnalysis.riskanalySolution.length}}/300</span>
        </div>
        <div class="describeBox">
          <span class="name">风险消除时间</span>
          <el-date-picker
            v-model="riskAnalysis.riskanalyEliminationTime"
            type="date"
            value-format="date"
            placeholder="选择日期" >
          </el-date-picker>
        </div>
        <div class="describeBox">
          <span class="name">备注</span>
          <textarea class="textBox" placeholder="请输入备注" v-model="riskAnalysis.riskanalyNote" maxlength="300"></textarea>
          <span class="statisticsNum">{{riskAnalysis.riskanalyNote==undefined?0:riskAnalysis.riskanalyNote.length}}/300</span>
        </div>
      </div>
      <upload-attachments :allOtherFile="riskAnalysis.riskanalyOtherAttachments" >
        <span slot="title"><b>其他附件</b><em style="margin-left:5.2em">注：如有其他附件，请在此上传</em></span>
      </upload-attachments>
    </div>
  </div>
</template>

<script>
  import uploadAttachments from '../../../components/uploadAttachments'
  export default {
    name: '',
    components: {
      uploadAttachments
    },
    data () {
      return {
        standard: [{dictCode: 0, dictName: '风险等级高'}, {dictCode: 1, dictName: '风险等级中'}, {dictCode: 2, dictName: '风险等级中'}],
        checkedCities1: ['上海', '北京'],
        cities: ['上海', '北京', '广州', '深圳'],
        riskAnalysis: {riskanalyOtherAttachments: []},
        dictionariesList: [{dictType: 'riskanalyRiskCategories', items: []}, {dictType: 'riskanalyRiskLevel', items: []}]
      }
    },
    //自定义过滤器
    /*filters:{
      // 整数
      integer:function(value){
        let reg=/^[0-9]*$/ // 正则校验 :正整数
        //let that=this
        if(!value){
          return ''
        }else if(!reg.test(value)){
          value=Number(value).toFixed(0)
          if(value=='NaN'){
            return ''
          }else {
            return value
          }
        }else{
          return value
        }
      }
    },*/
    methods: {
      // 获取数据
      loadings (id) {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/light/v1/lightProject/getMenuDetail',
          data: {lightProjectId: that.childParm.id, titleKey: ['riskAnalysis']}
        }).then(function (succeed) {
          // console.log(succeed.data.result)
          that.riskAnalysis = succeed.data.result.riskAnalysis
          let time=that.riskAnalysis.riskanalyEliminationTime
          if(time!=''){
            var sdate = new Date(Date.parse(time.replace(/-/g,"/")));
            that.riskAnalysis.riskanalyEliminationTime=that.strToGmt(sdate)
          }
        })
      },
      dictionaries () {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/dict/dictListByType',
          data: {'dictTypes': ['riskanalyRiskCategories', 'riskanalyRiskLevel']}
        }).then(function (succeed) {
          // console.log(succeed.data.result[0].items)
          that.dictionariesList = succeed.data.result
        })
      },
      // 关闭函数
      close () {
        var that = this
        this.cancelDialogue(function () {
          that.$emit('cancelThePage', 1)
        })
      },
      save () {
        let that = this
        let time=that.riskAnalysis.riskanalyEliminationTime
        if(time!=undefined&&time!=''){
          that.riskAnalysis.riskanalyEliminationTime=that.gmtToStr(time)
        }
        this.$http({
          method: 'post',
          url: 'longcity/services/light/v1/lightProject/saveLightPrjConditions',
          // data: {lightProjectId: '1024', titleKey: ['riskAnalysis']}
          data: {lightProjectId: that.childParm.id, title: 'riskAnalysis', detail: that.riskAnalysis}
        }).then(function (succeed) {
          if (succeed.data.code === 200) {
            that.saveSuccessDialogue()
            that.$emit('cancelThePage', 2)
            // console.log(succeed.data.result)
          }
        })
      }
    },
    mounted () {
      this.setConHeight()
      this.loadings()
      this.dictionaries()
    },
    props: {
      childParm: Object
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
  #riskAnalysis{width:100%;}
  #riskAnalysis{
    .fl{float:left}
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #999;}
    textarea{resize:none;overflow-y:auto;border-radius:4px;border:1px solid #ddd;}
    textarea:focus,input:focus{border-color:#20a0ff}
    .riskContent{padding:0 2%;width:96%;}
    .riskContent{
      .titleAndContent,.describeBox{width:100%;position:relative;overflow:hidden;margin-bottom:10px;margin-top:20px;}
      .name{float:left;width:7em;display:block;}
      .textBox{width:80%;padding:2%;height:90px;}
      .statisticsNum{position:absolute;right:6.5%;bottom:10px;}
      .analysisContent{padding-left:4%;width:96%;}
      .analysisContent{
        .chooseBox{margin-bottom:10px;overflow:hidden;}
        .chooseEvery{padding-left:20px;margin-left:15px;position:relative;cursor:pointer;color:#444;}
        .chooseEvery:before{content:'';width:14px;height:14px;border-radius:2px;display:block;position:absolute;left:0;top:6px;border:1px solid #ddd;}
        .active{color: #67649F;}
        .active:before{border-color: #67649F;}
        .mr43{margin-right:38px}
      }
      /*.width16{width:16.5%}*/
      .width77{width:76.6%;margin-left:4%;}
    }
    #uploadAttachments .componentBox .tableBox{width:81%;margin-left:9em;}
    #uploadAttachments .componentBox .titleComponentName .upload-demo{left:9em;}
  }
</style>
