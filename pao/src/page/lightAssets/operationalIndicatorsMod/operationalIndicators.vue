<template>
  <!--运营指标-->
  <div id="operationalInDicators">
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
    <div class="operationalContent" id="conMod">
      <div class="titleAndContent">
        <span class="name width16">简介</span>
        <textarea class="textBox  width77" placeholder="请输入简介" v-model="OperIndicators.operindiInfor" maxlength="300"></textarea>
        <span class="statisticsNum">{{OperIndicators.operindiInfor==undefined?0:OperIndicators.operindiInfor.length}}/300</span>
      </div>
      <p class="title">长租公寓项目总体投资运营指标</p>
      <div class="allInputBox">
        <div class="everyIndividual">
          <span class="text">运营第一年出租率</span><input type="text" class="inputs" v-model="OperIndicators.operindiFirstYearRents" placeholder="请输入"><em>%</em>
          <span class="errHint" v-if="OperIndicators.operindiFirstYearRents!=undefined&&OperIndicators.operindiFirstYearRents!=''&&!reg2.test(OperIndicators.operindiFirstYearRents)||OperIndicators.operindiFirstYearRents>100">请输入0-100之间的整数或两位小数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">运营第二年出租率</span><input type="text" class="inputs" v-model="OperIndicators.operindiSecondYearRents" placeholder="请输入"><em>%</em>
          <span class="errHint" v-if="OperIndicators.operindiSecondYearRents!=undefined&&OperIndicators.operindiSecondYearRents!=''&&!reg2.test(OperIndicators.operindiSecondYearRents)||OperIndicators.operindiSecondYearRents>100">请输入0-100之间的整数或两位小数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">运营首年已出租单位收入</span><input type="text" class="inputs" v-model="OperIndicators.operindiFirstYearRentsInput" placeholder="请输入"><em>元/间·月</em>
          <span class="errHint" v-if="OperIndicators.operindiFirstYearRentsInput!=undefined&&OperIndicators.operindiFirstYearRentsInput!=''&&!reg.test(OperIndicators.operindiFirstYearRentsInput)||OperIndicators.operindiFirstYearRentsInput>1000000">请输入0-1000000之间的整数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">年租金涨幅</span><input type="text" class="inputs" v-model="OperIndicators.operindiRentsRose" placeholder="请输入"><em>%</em>
          <span class="errHint" v-if="OperIndicators.operindiRentsRose!=undefined&&OperIndicators.operindiRentsRose!=''&&!reg2.test(OperIndicators.operindiRentsRose)||OperIndicators.operindiRentsRose>100">请输入0-100之间的整数或两位小数。</span>
        </div>
      </div>
      <upload-attachments :allOtherFile="OperIndicators.operindiOtherAttachments">
        <span slot="title"><b>其他附件</b><em style="margin-left:3em">注：如有其他附件，请在此上传</em></span>
      </upload-attachments>
    </div>
    <!--提示-->
    <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
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
        hintIsShow: false, // 提示消息显示隐藏
        OperIndicators: {operindiOtherAttachments: []}, // 运营指标类目
        reg2: /^\d+(\.\d{1,2})?$/, // 正则校验 :正整数,保留2位小数
        reg: /^[0-9]*$/ // 正则校验 :正整数
      }
    },
    methods: {
      // 获取数据
      loadings (id) {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/light/v1/lightProject/getMenuDetail',
          data: {lightProjectId: that.childParm.id, titleKey: ['OperIndicators']}
        }).then(function (succeed) {
          // console.log(succeed.data.result)
          that.OperIndicators = succeed.data.result.OperIndicators
        })
      },
      // 关闭函数
      close () {
        var that = this
        this.cancelDialogue(function () {
          that.$emit('cancelThePage', 1)
        })
      },
      // 提交之前正则验证
      regularExpression () {
        let OperIndicators = this.OperIndicators
        let hintText = '请输入正确的'
        if (!this.reg2.test(OperIndicators.operindiFirstYearRents) && OperIndicators.operindiFirstYearRents !== '' || OperIndicators.operindiFirstYearRents > 100) {
          this.hint(hintText + '运营第一年出租率!')
          return
        }
        if (!this.reg2.test(OperIndicators.operindiSecondYearRents) && OperIndicators.operindiSecondYearRents !== '' || OperIndicators.operindiSecondYearRents > 100) {
          this.hint(hintText + '运营第二年出租率!')
          return
        }
        if (!this.reg.test(OperIndicators.operindiFirstYearRentsInput) && OperIndicators.operindiFirstYearRentsInput !== '' || OperIndicators.operindiFirstYearRentsInput > 1000000) {
          this.hint(hintText + '运营首年已出租单位收入!')
          return
        }
        if (!this.reg2.test(OperIndicators.operindiRentsRose) && OperIndicators.operindiRentsRose !== '' || OperIndicators.operindiRentsRose > 100) {
          this.hint(hintText + '年租金涨幅!')
          return
        } else {
          this.submit()
        }
      },
      // 保存
      save () {
        this.regularExpression()
      },
      // 提交函数
      submit () {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/light/v1/lightProject/saveLightPrjConditions',
          // data: {lightProjectId: '1024', titleKey: ['riskAnalysis']}
          data: {lightProjectId: that.childParm.id, title: 'OperIndicators', detail: that.OperIndicators}
        }).then(function (succeed) {
          if (succeed.data.code === 200) {
            that.saveSuccessDialogue()
            that.$emit('cancelThePage', 2)
            // console.log(succeed.data.result)
          }
        })
      },
      // 提示函数
      hint (message) {
        let that = this
        this.hintIsShow = true
        that.hintMessage = message
        setTimeout(function () {
          that.hintIsShow = false
        }, 1500)
        clearTimeout()
      }
    },
    mounted () {
      this.loadings()
      this.setConHeight()
    },
    props: {
      childParm: Object
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #operationalInDicators{width:100%;}
  #operationalInDicators{
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #999;}
    textarea{resize:none;overflow-y:auto;border-radius:4px;border:1px solid #ddd;}
    textarea:focus,input:focus{border-color:#20a0ff}
    .operationalContent{padding:0 2%;width:96%;}
    .operationalContent{
      .titleAndContent,.describeBox{width:100%;position:relative;overflow:hidden;margin-bottom:10px;margin-top:20px;}
      .name{float:left;width:7em;display:block;}
      .textBox{width:80%;padding:2%;height:90px;}
      .statisticsNum{position:absolute;right:6.5%;bottom:10px;}

      .allInputBox{width:84%;overflow:hidden;margin-left:7em;border:1px solid #ddd;border-radius:4px;padding:10px 0;}
      .allInputBox{
        .everyIndividual{width:55%;float:left;line-height:30px;padding:10px 0;position:relative;}
        .everyIndividual:nth-child(2n){width:45%}
        .everyIndividual{
          .text{width:45%;display: inline-block;text-indent:5px;}
          .inputs{height:28px;line-height:24px;margin:0 10px;padding-left:10px;width:30%;}
          .errHint{position:absolute;right:10%;bottom:-7px;color:red;font-size:12px;height:14px;line-height:14px;width:90%;text-align:right;}
        }
      }
    }
  }
</style>
