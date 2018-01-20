<template>
  <div id="businessCooperate">
    <div class="item">
      <p class="title">交易对手性质</p>
      <div class="content">
        <el-select :disabled="disabled" v-model="proBusinessInfo.counterparty" multiple placeholder="请选择">
          <el-option
            v-for="item in options[0]"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>
    <div>
      <div class="item item1">
        <p class="title">是否境外交易</p>
        <div class="content">
          <el-select :disabled="disabled" v-model="proBusinessInfo.isOverseas" placeholder="请选择">
            <el-option
              key="1"
              label="是"
              value="1">
            </el-option>
            <el-option
              key="0"
              label="否"
              value="0">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item item1">
        <p class="title">获取标的</p>
        <div class="content">
          <el-select :disabled="disabled" v-model="proBusinessInfo.gainTarget" placeholder="请选择">
            <el-option
              v-for="item in options[1]"
              :key="item.dictCode"
              :label="item.dictName"
              :value="item.dictCode">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div style="clear:both"></div>
    <div class="item">
      <p class="title">获取方式</p>
      <div class="content">
        <el-select :disabled="disabled" v-model="proBusinessInfo.commercialAccessMethods" placeholder="请选择">
          <el-option
            v-for="item in options[2]"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="item">
      <p class="title">交易对手情况</p>
      <div class="content">

        <div class="switchPanel">
          <span class="panel" @click="(panelIndex=0)" :class="{panelActive:panelIndex==0}">股权交易</span>
          <span class="panel" @click="(panelIndex=1)" :class="{panelActive:panelIndex==1}">资产交易</span>
        </div>
        <div class="panelContent">
          <div v-if="panelIndex==0">
            <el-col :span="8" class="midInput">
              <el-select :disabled="disabled" v-model="proBusinessInfo.singleHolder" placeholder="请选择">
                <el-option
                  v-for="item in options[4]"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8" class="midInput">
              <el-select :disabled="disabled" v-model="proBusinessInfo.institutionalHolder" placeholder="请选择">
                <el-option
                  v-for="item in options[5]"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8" class="midInput">
              <el-select :disabled="disabled" v-model="proBusinessInfo.isPledge" placeholder="请选择">
                <el-option
                  v-for="item in options[6]"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode">
                </el-option>
              </el-select>
            </el-col>
          </div>
          <div v-else>
            <!--<el-col :span="8" class="midInput">
              <el-select :disabled="disabled" v-model="proBusinessInfo.powAuction" placeholder="请选择">
                <el-option
                  v-for="item in options[3]"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode">
                </el-option>
              </el-select>
            </el-col>-->
            <el-col :span="8" class="midInput">
              <el-select :disabled="disabled" v-model="proBusinessInfo.landTransfer" placeholder="请选择">
                <el-option
                  v-for="item in options[7]"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode">
                </el-option>
              </el-select>
            </el-col>
          </div>
        </div>


      </div>
    </div>

    <div class="item">
      <p class="title">交易条件及支付节奏</p>
      <div class="content" style="margin-top: 30px;">
        <div class="leaf">
          <label class="name">交易对价</label>
          <input v-validate="{ regex: reg4 }" name="交易对价"
                 :class="{'input': true, 'is-danger': errors.has('交易对价')}"
                 type="text" :disabled="disabled" v-model="proBusinessInfo.tradingOnPrice"
                 placeholder="请输入"/>
          <div v-show="errors.has('交易对价')&&proBusinessInfo.tradingOnPrice!=''||proBusinessInfo.tradingOnPrice>1000000" class="help">{{'保留4位小数，0~1000000'}}</div>
          <span class="textfix">万元</span>
        </div>

        <div class="oneline">
          <div class="leaf leaf1">
            <label class="name">其中-股权价格</label>
            <input v-validate="{ regex: reg4 }" name="股权价格"
                   :class="{'input': true, 'is-danger': errors.has('股权价格')}"
                   type="text" :disabled="disabled" placeholder="请输入"
                   v-model="proBusinessInfo.equityPrice"/>
            <div v-show="errors.has('股权价格')&&proBusinessInfo.equityPrice!=''||proBusinessInfo.equityPrice>1000000" class="help">{{'保留4位小数，0~1000000'}}</div>

            <span class="textfix">万元</span>
          </div>

          <div class="leaf leaf1">
            <label class="name">其中-债权价格</label>
            <input v-validate="{ regex: reg4 }" name="债权价格"
                   :class="{'input': true, 'is-danger': errors.has('债权价格')}"
                   type="text" :disabled="disabled" placeholder="请输入"
                   v-model="proBusinessInfo.debtPrice"/>
            <div v-show="errors.has('债权价格')&&proBusinessInfo.debtPrice!=''||proBusinessInfo.debtPrice>1000000" class="help">{{'保留4位小数，0~1000000'}}</div>
            <span class="textfix">万元</span>
          </div>

          <div class="leaf leaf1">
            <label class="name">其中-实物返还</label>
            <input v-validate="{ regex: reg4 }" name="实物返还"
                   :class="{'input': true, 'is-danger': errors.has('实物返还')}"
                   type="text" :disabled="disabled" placeholder="请输入"
                   v-model="proBusinessInfo.entityReturn"/>
            <div v-show="errors.has('实物返还')&&proBusinessInfo.entityReturn!=''||proBusinessInfo.entityReturn>1000000" class="help">{{'保留4位小数，0~1000000'}}</div>
            <span class="textfix">万元</span>
          </div>
        </div>

        <div style="clear: both"></div>
        <div style="margin:10px;">
          <label class="name">是否有超额资金垫付</label>
          <el-radio-group :disabled="disabled" v-model="proBusinessInfo.isExcessPay">
            <el-radio :label="'1'">是</el-radio>
            <el-radio :label="'0'">否</el-radio>
          </el-radio-group>

        </div>

        <el-form status-icon ref="ruleForm3" label-width="110px" class="meterCapacitance">
          <div :style="{display: disabled?'none':''}" style="clear: both;height:40px;margin-top: 10px;">
            <el-button type="primary" class="btn" style="float: left;" @click="addPayRhythm()">添加</el-button>
          </div>
          <ul>
            <li v-for="(item,index) in proBusinessInfo.payRhythm">
              <div class="meterCapacitanceInfo">
                <div class="meterCapacitanceInfoTitle">
                  <el-col :span="2"><span class="offsetLeft">{{proBusinessInfo.payRhythm.length - index}}</span>
                  </el-col>
                  <el-col :span="19"><span></span></el-col>
                  <el-col :style="{display: disabled?'none':''}" :span="3"><span style="cursor: pointer"
                                                                                 @click="deletePayRhythm(proBusinessInfo.payRhythm.length-index-1)">删除</span>
                  </el-col>
                </div>
                <div class="meterCapacitanceInfoBody">
                  <div class="meterCapacitance01">
                    <el-col :span="12">
                      <el-form-item label="支付时间" prop="landName">
                        <el-col :span="24">
                          <el-date-picker
                            :disabled="disabled"
                            :editable=false
                            value-format="yyyy-MM-dd"
                            v-model="proBusinessInfo.payRhythm[proBusinessInfo.payRhythm.length-1-index].paymentTime"
                            type="date"
                            placeholder="选择日期时间">
                          </el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="支付金额" prop="buildingDensity">
                        <el-col :span="24">
                          <input v-validate="{ regex: reg2 }" :name="'payRhythm'+index"
                                 :class="{'input': true, 'is-danger': errors.has('payRhythm'+index)&&proBusinessInfo.payRhythm[proBusinessInfo.payRhythm.length-1-index].paymentAmount!=''||proBusinessInfo.payRhythm[proBusinessInfo.payRhythm.length-1-index].paymentAmount>100}"
                                 type="text" :disabled="disabled" placeholder="请输入"
                                 v-model="proBusinessInfo.payRhythm[proBusinessInfo.payRhythm.length-1-index].paymentAmount"/>
                          <div v-show="errors.has('payRhythm'+index)&&proBusinessInfo.payRhythm[proBusinessInfo.payRhythm.length-1-index].paymentAmount!=''||proBusinessInfo.payRhythm[proBusinessInfo.payRhythm.length-1-index].paymentAmount>100" class="help">{{'保留两位小数,0~100'}}</div>
                          <span style="margin-left: 5px">%</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </div>
                  <div class="meterCapacitance02">
                    <span style="float:left;width:100px;text-align: right;margin-right:10px;">支付条件</span>
                    <div class="textareaBox" style="width:80%;margin-left: 110px">
                        <textarea :disabled="disabled" name=""
                                  v-model="proBusinessInfo.payRhythm[proBusinessInfo.payRhythm.length-1-index].paymentTerms"
                                  class="decision"
                                  style="height:90px;"
                                  placeholder="请输入" maxlength=140></textarea>
                      <span class="statistics" style="right:-18px;bottom:15px">{{proBusinessInfo.payRhythm[proBusinessInfo.payRhythm.length-1-index].paymentTerms.length}}/{{140}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </el-form>

      </div>
    </div>


    <div class="item">
      <p class="title">关键商务条件</p>
      <div class="content">
        <div class="textareaBox">
                <textarea :disabled="disabled" name="" v-model="proBusinessInfo.businessCondition" class="decision"
                          placeholder="请输入" maxlength=140></textarea>
          <span class="statistics">{{proBusinessInfo.businessCondition ? proBusinessInfo.businessCondition.length:0}}/{{140}}</span>
        </div>
      </div>
    </div>

    <div class="item">
      <p class="title">交易路径</p>
      <div class="content">
        <heavyImageManagement @componentDataSynchronization="componentDataSynchronization" :picturesRef="proBusinessInfo.transactionWay"
                              :dictionariesList="options[8]" :btnNone="!disabled"
                              :dictionariesTitle="dictionariesTitle"></heavyImageManagement>
      </div>

    </div>


    <div class="item">
      <p class="title">相关附件</p>
      <div class="content">
        <div style="margin-top:30px">
          <p style="float:left">目标公司基本情况</p>
          <div class="textareaBox">
                <textarea :disabled="disabled" name="" v-model="proBusinessInfo.targetComCondition" class="decision"
                          placeholder="请输入" maxlength=140></textarea>
            <span class="statistics">{{proBusinessInfo.targetComCondition ? proBusinessInfo.targetComCondition.length : 0}}/{{140}}</span>
          </div>
        </div>


        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="目标公司章程" :fileObj="proBusinessInfo" fieldName="targetComRule"/>
        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="股权转让协议" :fileObj="proBusinessInfo"
                            fieldName="equityTransferAgreement"/>
        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="目标公司尽调报告(财务、法务和工程)" :fileObj="proBusinessInfo"
                            fieldName="targetComBestReport"/>
        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="尽调基准日目标公司资产负债表" :fileObj="proBusinessInfo"
                            fieldName="targetComBalanceSheet"/>
        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="担保函" :fileObj="proBusinessInfo" fieldName="guaranteeLetter"/>
        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="质押担保合同" :fileObj="proBusinessInfo" fieldName="pledgeContract"/>
        <div style="margin-top:10px">
          <p style="float:left">工程交付条件</p>
          <div class="textareaBox">
                <textarea :disabled="disabled" name="" v-model="proBusinessInfo.proDeliveryCondition" class="decision"
                          placeholder="请输入" maxlength=140></textarea>
            <span class="statistics">{{proBusinessInfo.proDeliveryCondition ? proBusinessInfo.proDeliveryCondition.length:0}}/{{140}}</span>
          </div>
        </div>
        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="陈述和保证相关条款" :fileObj="proBusinessInfo"
                            fieldName="stateGuaranteeTerm"/>


      </div>
    </div>

    <div class="item">
      <p class="title">目标公司基本情况</p>
      <div class="content">
        <div style="margin-top:30px">
          <p style="float:left">目标公司概况</p>
          <div class="textareaBox">
                <textarea :disabled="disabled" name="" v-model="proBusinessInfo.targetProfile" class="decision"
                          placeholder="请输入" maxlength=140></textarea>
            <span class="statistics">{{proBusinessInfo.targetProfile ? proBusinessInfo.targetProfile.length:0}}/{{140}}</span>
          </div>
        </div>
        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="目标公司董监高名单" :fileObj="proBusinessInfo"
                            fieldName="targetExecutivesList"/>
        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="目标公司取得证照情况" :fileObj="proBusinessInfo"
                            fieldName="targetLicense"/>
        <div style="margin-top:10px">
          <p style="float:left">目标公司取得证照情况说明</p>
          <div class="textareaBox">
                <textarea :disabled="disabled" name="" v-model="proBusinessInfo.targetLicenseState" class="decision"
                          placeholder="请输入" maxlength=140></textarea>
            <span class="statistics">{{proBusinessInfo.targetLicenseState ? proBusinessInfo.targetLicenseState.length: 0}}/{{140}}</span>
          </div>
        </div>
        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="目标公司债权债务及担保明细" :fileObj="proBusinessInfo"
                            fieldName="targetCreditDebt"/>
        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="待解除劳动关系员工名单" :fileObj="proBusinessInfo"
                            fieldName="severLaborRelationList"/>
        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="保险清单" :fileObj="proBusinessInfo" fieldName="insuranceList"/>
        <businessUpLoadFile @switchLoading="switchLoading" :disabled="disabled" title="资产清单" :fileObj="proBusinessInfo" fieldName="assetList"/>
      </div>
    </div>

  </div>


</template>
<script>
  import businessUpLoadFile from '../../components/upLoadFile'
  import diaLog2 from '../../components/dialog'
  import submitImg from '../../page/submitImg.vue'
  //import slideShow from '../../components/slideShow'
  import heavyImageManagement from '../../components/heavyImageManagement'



  export default {
    components: {businessUpLoadFile, diaLog2, submitImg, heavyImageManagement},
    name: 'businessCooperate',
    props: ['title', 'disabled', 'options', 'textLen', 'proBusinessInfo','switchLoading'],
    data() {
      return {
        uploadMuchImgIsShow:false,
        dictionariesTitle:'transactionWay',//字典名称
        dictionariesList:[],// 字典数组

        panelIndex: 0,

        loadingA:false,
        reg4: /^(0|[1-9]\d{0,})+(\.\d{1,4})?$/, // 正则校验 :正整数,保留4位小数
        reg6: /^(0|[1-9]\d{0,})+(\.\d{0,})?$/, // 正则校验 :正整数,保留n位小数
        reg2: /^([1-9]\d{0,})+(\.\d{1,2})?$/, // 正则校验 :正整数,保留2位小数

        ruleForm3: {},

        radio: 1,
        headers: {platform: 'pc', token: localStorage.getItem('token'), version: '1'},
        nameList: [], // 收集文件名
        transactionWay: []

      }
    },

    updated() {
    },


    mounted() {

    },


    methods: {
      //图片管理关闭时，同步修改的数据到当前对象
      componentDataSynchronization(data){
        this.proBusinessInfo.transactionWay = data;
      },



      cloneObj(obj) {
        var str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
          return;
        } else if (window.JSON) {
          str = JSON.stringify(obj), //序列化对象
            newobj = JSON.parse(str); //还原
        } else {//如果不支持以上方法
          for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
          }
        }
        return newobj;
      },

      /*增加一条支付节奏*/
      addPayRhythm() {
        this.proBusinessInfo.payRhythm.push({
          paymentTime:"",
          paymentAmount:"",
          paymentTerms:""

        })
      },
      /*删除一条支付节奏*/
      deletePayRhythm(index) {
        this.proBusinessInfo.payRhythm.splice(index, 1)
      },


      // 附件上传成功函数;element-ui提供方法;成功后将对应的值进行处理展示;方便上传
      success(response, file, fileList) {
        if(response && response.result){
          for (var i = 0; i < response.result.length; i++) {
            response.result[i].isPrivate = 0
            response.result[i].fileUrl = response.result[i].url
            response.result[i].fileId = response.result[i].id
            this.proBusinessInfo.targetComRule.push(response.result[i])
          }
        }

      },

      // 验证文件名不能重复
      noRepeatName(file) {
        var flag = true
        this.nameList.map((item) => {
          if (item == file.name) {
            flag = false
          }
        })
        return flag
      },

      // 附件上传前的钩子函数;判断附件名称;大小等
      beforeAvatarUpload(file) {
        if (!this.noRepeatName(file)) {
          this.hint('文件名重复')
          return false
        } else {
          this.nameList.push(file.name)
        }
      },
    }
  }
</script>
<style scoped lang="less">
  @tableColor: #E2E2ED;

  #businessCooperate {
    margin: 20px 10px;
    overflow: auto;

    .switchPanel {
      border: 1px solid #67649F;
      border-radius: 30px;
      display: inline-block;
      padding: 1px;
      margin-top: 5px;

      .panel {
        display: inline-block;
        line-height: 33px;
        height: 33px;
        width: 84px;
        border-radius: 24px;
        text-align: center;
        cursor: pointer;
      }
      .panelActive {
        background: #67649F;
        color: #fff;
      }
    }

    .panelContent{
      margin-top: 10px;
    }


    .is-danger {
      border: 1px solid red;
    }

    .help {
      position: absolute;
      line-height: 12px;
      font-size: 12px;
      color: red;
      padding: 2px 2px 0;
      bottom: -13px;
    }

    .midInput {
      margin: 5px 0;
      padding-right: 10px;
    }

    .meterCapacitance .btn {
      background-color: #67649F;
      border-color: #67649F;
      line-height: 1;
      cursor: pointer;
      padding: 10px 15px 10px 5px;
      border-radius: 4px;
      position: relative;
    }
    .meterCapacitance .btn:before {
      content: "";
      background: url('../../assets/images/add.png') no-repeat;
      background-size: 14px 14px;
      text-align: center;
      color: #fff;
      float: left;
      border-radius: 25px;
      display: block;
      width: 14px;
      height: 14px;
      margin-right: 2px;
    }

    .meterCapacitance .meterCapacitanceInfo {
      border: 1px solid #EDEDED;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .meterCapacitance .meterCapacitanceInfo .meterCapacitanceInfoTitle {
      overflow: auto;
      background: #E2E2ED;
      border-radius: 4px 4px 0 0;
      text-align: center;
      line-height: 30px;
    }

    .meterCapacitance .meterCapacitanceInfo .meterCapacitanceInfoBody {
      padding: 10px 20px 0 0;
      overflow: auto;
    }

    .meterCapacitance .meterCapacitance01 {
      height: 50px;
    }
    .meterCapacitance .meterCapacitance02 {
      margin-bottom: 16px;

      .statistics {
        position: absolute;
        right: 3px;
        bottom: 3px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #CCCCCC;
        letter-spacing: 0;
        line-height: 14px;
      }

    }

    .submitImg {
      /*display: none;*/
      position: absolute;
      left: 10%;
      top: 0;
      /*z-index:2;*/
      top: 42%;
    }

    .proPhoto {

    }

    .tabs el-tabs el-tabs--border-card {
      box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0), 0 0 0px 0 rgba(0, 0, 0, 0);
      border: none;
    }

    .tabs .el-tab-pane {
      height: 300px;
    }

    .proPhoto .el-button--primary {
      background-color: #67649F;
      border-color: #67649F;
      margin-bottom: 10px;
    }
    .proPhoto .el-tabs__content {
      height: 100%;
      width: 100%;
      padding: 0;
    }
    /*定制proPhoto弹窗消息*/
    .proPhoto .el-dialog .el-dialog__header {

    }
    .proPhoto .tabs {
      position: relative;
      /*height: 100%;*/
    }
    .proPhoto .tabs p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .item {
      overflow: hidden;
      display: block;
      margin-bottom: 10px;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #444444;
        letter-spacing: 0;
        float: left;
        line-height: 35px;
        height: 35px;
        text-align: right;
        width: 130px;

      }
      .content {
        margin-left: 135px;

        input {
          float: left;
          width: 100px;
          height: 23px;
          padding: 5px;
        }

        .leaf {
          margin: 5px 0 10px;
          position: relative;
          display: inline-block;
          label {
            display: block;
          }

          .textfix {
            display: inline-block;
            margin-left: 5px;
          }
        }
        .leaf1 {
          float: left;
          margin-right: 20px;
        }

        .oneline {
          display: block;
        }
      }
    }

    .item1 {
      float: left;
    }

    .textareaBox {
      position: relative;
      margin: 10px 0;
      width: 90%
    }
    .decision {
      resize: none;
      width: 100%;
      height: 140px;
      padding: 10px;
      border-radius: 4px;
      background-color: #f9f9f9;
      overflow: auto;
      border: 1px solid #bfcbd9;
    }
    .statistics {
      position: absolute;
      right: -20px;
      bottom: 15px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #CCCCCC;
      letter-spacing: 0;
      line-height: 14px;
    }

  }


</style>
