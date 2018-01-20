<template>
  <!--投资指标-->
  <div id="investmentTarget">
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
    <div class="investmentContent" id="conMod">
      <div class="titleAndContent">
        <span class="name width16">简介</span>
        <textarea class="textBox  width81" placeholder="请输入简介" v-model="investmentTarget.investmentTargetInfor" maxlength="300"></textarea>
        <span class="statisticsNum">{{investmentTarget.investmentTargetInfor==undefined?0:investmentTarget.investmentTargetInfor.length}}/300</span>
      </div>
      <p class="title">长租公寓项目总体投资评价指标</p>
      <div class="allInputBox">
        <div class="everyIndividual">
          <span class="text">动态投资回收期</span><input type="text" class="inputs" v-model="investmentTarget.investarDynamicPaybackPeriod" placeholder="请输入"><em>年</em>
          <span class="errHint" v-if="investmentTarget.investarDynamicPaybackPeriod!=undefined&&investmentTarget.investarDynamicPaybackPeriod!=''&&!reg.test(investmentTarget.investarDynamicPaybackPeriod)||investmentTarget.investarDynamicPaybackPeriod>100">请输入0-100之间的整数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">IRR(不考虑融资)</span><input type="text" class="inputs" v-model="investmentTarget.investarIRR" placeholder="请输入"><em>%</em>
          <span class="errHint" v-if="investmentTarget.investarIRR!=undefined&&investmentTarget.investarIRR!=''&&!reg1.test(investmentTarget.investarIRR)||investmentTarget.investarIRR>100">请输入0-100之间的整数或一位小数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">运营第三年Y-COST</span><input type="text" class="inputs" v-model="investmentTarget.investarThirdYearCost" placeholder="请输入"><em>%</em>
          <span class="errHint" v-if="investmentTarget.investarThirdYearCost!=undefined&&investmentTarget.investarThirdYearCost!=''&&!reg1.test(investmentTarget.investarThirdYearCost)||investmentTarget.investarThirdYearCost>100">请输入0-100之间的整数或一位小数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">运营第三年NPI利润率</span><input type="text" class="inputs" v-model="investmentTarget.investarThirdYearNPI" placeholder="请输入"><em>%</em>
          <span class="errHint" v-if="investmentTarget.investarThirdYearNPI!=undefined&&investmentTarget.investarThirdYearNPI!=''&&!reg1.test(investmentTarget.investarThirdYearNPI)||investmentTarget.investarThirdYearNPI>100">请输入0-100之间的整数或一位小数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">NPV</span><input type="text" class="inputs" v-model="investmentTarget.investarNPV" placeholder="请输入"><em>万元</em>
          <span class="errHint" v-if="investmentTarget.investarNPV!=undefined&&investmentTarget.investarNPV!=''&&!reg.test(investmentTarget.investarNPV)||investmentTarget.investarNPV>1000000">请输入0-1000000之间的整数或一位小数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">COST</span><input type="text" class="inputs" v-model="investmentTarget.investarCost" placeholder="请输入"><em>万元</em>
          <span class="errHint" v-if="investmentTarget.investarCost!=undefined&&investmentTarget.investarCost!=''&&!reg.test(investmentTarget.investarCost)||investmentTarget.investarCost>1000000">请输入0-1000000之间的整数或一位小数。</span>
        </div>
      </div>
      <upload-attachments :allOtherFile="investmentTarget.investarOtherAttachments">
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
        investmentTarget: {investarOtherAttachments: []},
        reg2: /^\d+(\.\d{1,2})?$/, // 正则校验 :正整数,保留2位小数
        reg1: /^\d+(\.\d{1,1})?$/, // 正则校验 :正整数,保留2位小数
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
          data: {lightProjectId: that.childParm.id, titleKey: ['investmentTarget']}
        }).then(function (succeed) {
          // console.log(succeed.data.result)
          that.investmentTarget = succeed.data.result.investmentTarget
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
        let investmentTarget = this.investmentTarget
        let hintText = '请输入正确的'
        if (!this.reg.test(investmentTarget.investarDynamicPaybackPeriod) && investmentTarget.investarDynamicPaybackPeriod !== '' || investmentTarget.investarDynamicPaybackPeriod > 100) {
          this.hint(hintText + '动态投资回收期!')
          return
        }
        if (!this.reg1.test(investmentTarget.investarIRR) && investmentTarget.investarIRR !== '' || investmentTarget.investarIRR > 100) {
          this.hint(hintText + 'IRR(不考虑融资)!')
          return
        }
        if (!this.reg1.test(investmentTarget.investarThirdYearCost) && investmentTarget.investarThirdYearCost !== '' || investmentTarget.investarThirdYearCost > 100) {
          this.hint(hintText + '运营第三年Y-COST!')
          return
        }
        if (!this.reg1.test(investmentTarget.investarThirdYearNPI) && investmentTarget.investarThirdYearNPI !== '' || investmentTarget.investarThirdYearNPI > 100) {
          this.hint(hintText + '运营第三年NPI利润率!')
          return
        }
        if (!this.reg.test(investmentTarget.investarNPV) && investmentTarget.investarNPV !== '' || investmentTarget.investarNPV > 1000000) {
          this.hint(hintText + 'NPV!')
          return
        }
        if (!this.reg.test(investmentTarget.investarCost) && investmentTarget.investarCost !== '' || investmentTarget.investarCost > 1000000) {
          this.hint(hintText + 'COST!')
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
          data: {lightProjectId: that.childParm.id, title: 'investmentTarget', detail: that.investmentTarget}
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
      this.setConHeight()
      this.loadings()
    },
    props: {
      childParm: Object
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #investmentTarget{width:100%;}
  #investmentTarget{
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #999;}
    textarea{resize:none;overflow-y:auto;border-radius:4px;border:1px solid #ddd;}
    textarea:focus,input:focus{border-color:#20a0ff}
    .investmentContent{padding:0 2%;width:96%;}
    .investmentContent{
      .titleAndContent,.describeBox{width:100%;position:relative;overflow:hidden;margin-bottom:10px;margin-top:20px;}
      .name{float:left;width:7em;display:block;}
      .textBox{width:80%;padding:2%;height:90px;}
      .statisticsNum{position:absolute;right:6.5%;bottom:10px;}

      .allInputBox{width:85%;overflow:hidden;margin-left:7em;border:1px solid #ddd;border-radius:4px;padding:10px 0;}
      .allInputBox{
        .everyIndividual{width:50%;float:left;line-height:30px;padding:10px 0;position:relative;}
        .everyIndividual{
          .text{width:46%;display: inline-block;text-indent:5px;}
          .inputs{height:28px;line-height:24px;margin:0 10px;padding-left:10px;width:32%;}
          .errHint{position:absolute;right:10%;bottom:-7px;color:red;font-size:12px;height:14px;line-height:14px;width:90%;text-align:right;}
        }
      }
      /*
      .analysisContent{padding-left:4%;width:96%;}
      .analysisContent{
        .chooseBox{margin-bottom:10px;}
        .chooseEvery{padding-left:20px;margin-left:15px;position:relative;cursor:pointer;color:#444;}
        .chooseEvery:before{content:'';width:14px;height:14px;border-radius:2px;display:block;position:absolute;left:0;top:6px;border:1px solid #ddd;}
        .active{color: #67649F;}
        .active:before{border-color: #67649F;}
      }
      */
      .width16{width:7em;}
      .width81{width:81%}
    }
  }
</style>
