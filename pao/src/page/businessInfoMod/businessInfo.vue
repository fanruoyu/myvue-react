<template>
  <div id="businessInfo" v-loading="loadingA" element-loading-text="文件上传中,请耐心等待"
       element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.5)">
    <div class="closeNav" ref="closeNav">
      <p class=" tit fl" title="childParm.projectName">{{childParm.projectName}}</p>
      <span class="closeButton fl" @click="theCancelPopup">关闭</span>
      <span class="saveButton" @click="saveData" v-if="!disabled">保存</span>
    </div>
    <div id="conMod" class="content">

      <p class="subTitle">{{title}}</p>
      <div class="tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="收并购及合作概况" name="1">
            <businessGeneralSituation :disabled="disabled" :proBusinessInfo="proBusinessInfo"
                                      :commercialCooperationWayItems="commercialCooperationWayItems"></businessGeneralSituation>
          </el-tab-pane>
          <el-tab-pane label="收并购及外部联系人" name="2">
            <businessContact :disabled="disabled" :proBusinessInfo="proBusinessInfo"></businessContact>

          </el-tab-pane>
          <el-tab-pane label="收并购及合作事宜" name="3">
            <businessCooperate
              :switchLoading="switchLoading"
              :options="[counterpartyItems,gainTargetItems,commercialAccessMethodsItems,powAuctionItems,singleHolderItems,institutionalHolderItems,isPledgeItems,landTransferItems,transactionWayItems]"
              :disabled="disabled" :proBusinessInfo="proBusinessInfo"></businessCooperate>
          </el-tab-pane>

          <el-tab-pane label="收并购及项目风险点" name="4">
            <businessInputItem :disabled="disabled" title="税务风险" :options="taxRiskItems" text="taxRisk"
                               :proBusinessInfo="proBusinessInfo"
                               :textLen="64"></businessInputItem>
            <businessInputItem :disabled="disabled" title="债务风险" :options="debtRiskItems" text="debtRisk"
                               :proBusinessInfo="proBusinessInfo"
                               :textLen="64"></businessInputItem>
            <businessInputItem :disabled="disabled" title="股东纠纷" :options="holderDisputeItems" text="holderDispute"
                               :proBusinessInfo="proBusinessInfo"
                               :textLen="64"></businessInputItem>
            <businessInputItem :disabled="disabled" title="标的瑕疵" :options="lotFlawItems" text="lotFlaw"
                               :proBusinessInfo="proBusinessInfo"
                               :textLen="64"></businessInputItem>
            <businessInputItem :disabled="disabled" title="尽调风险" :options="bestRiskItems" text="bestRisk"
                               :proBusinessInfo="proBusinessInfo"
                               :textLen="64"></businessInputItem>
            <businessInputItem :disabled="disabled" title="交割风险" :options="deliveryRiskItems" text="deliveryRisk"
                               :proBusinessInfo="proBusinessInfo"
                               :textLen="64"></businessInputItem>
            <businessInputItem :disabled="disabled" title="业主纠纷" :options="ownerDisputesItems" text="ownerDisputes"
                               :proBusinessInfo="proBusinessInfo"
                               :textLen="64"></businessInputItem>
            <businessInputItem :disabled="disabled" title="或有风险" :options="contingentRiskItems" text="contingentRisk"
                               :proBusinessInfo="proBusinessInfo"
                               :textLen="64"></businessInputItem>
            <businessInputItem :disabled="disabled" title="工程质量风险" :options="projectQualityRiskItems"
                               text="projectQualityRisk" :proBusinessInfo="proBusinessInfo"
                               :textLen="64"></businessInputItem>
            <businessInputItem :disabled="disabled" title="员工安置" :options="employeeSettingItems" text="employeeSetting"
                               :proBusinessInfo="proBusinessInfo"
                               :textLen="64"></businessInputItem>
            <businessInputItem :disabled="disabled" title="其它风险" :options="otherRiskItems" text="otherRisk"
                               :proBusinessInfo="proBusinessInfo"
                               :textLen="64"></businessInputItem>


          </el-tab-pane>
          <el-tab-pane label="收并购及投后" name="5">
            <div class="tab-content">
              <p class="textName">投后配合协调事宜</p>
              <div class="textareaBox">
                <textarea v-model="proBusinessInfo.investMatter" :disabled="disabled" maxlength="140" name=""
                          class="decision" placeholder="请输入"></textarea>
                <span class="statistics">{{proBusinessInfo.investMatter ? proBusinessInfo.investMatter.length : 0}}/140</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>

</template>
<script>
  import businessInputItem from './businessInputItem'
  import businessGeneralSituation from './businessGeneralSituation'
  import businessContact from './businessContact'
  import businessCooperate from './businessCooperate'
  import Immutable from 'immutable'
  import axios from 'axios'

  export default {
    name: 'businessInfo',
    props: ['childParm'],
    components: {
      businessInputItem,
      businessGeneralSituation,
      businessContact,
      businessCooperate
    },
    data() {
      return {
        loadingA: false,
        transactionWayItems: [],
        commercialCooperationWayItems: [],//合作及退出方式
        taxRiskItems: [],//税务风险
        debtRiskItems: [],//债务风险
        holderDisputeItems: [],
        lotFlawItems: [],
        bestRiskItems: [],
        deliveryRiskItems: [],
        ownerDisputesItems: [],
        contingentRiskItems: [],
        projectQualityRiskItems: [],
        employeeSettingItems: [],
        otherRiskItems: [],
        counterpartyItems: [],
        commercialAccessMethodsItems: [],
        gainTargetItems: [],
        powAuctionItems: [],
        singleHolderItems: [],
        institutionalHolderItems: [],
        isPledgeItems: [],
        landTransferItems: [],


        commercialCooperationWayState: [],//合作及退出方式
        taxRiskState: [],//税务风险
        debtRiskState: [],//债务风险
        holderDisputeState: [],
        lotFlawState: [],
        bestRiskState: [],
        deliveryRiskState: [],
        ownerDisputesState: [],
        contingentRiskState: [],
        projectQualityRiskState: [],
        employeeSettingState: [],
        otherRiskState: [],

        proBusinessInfo: {},
        disabled: true,//设置是否禁止编辑


        mainTitle: '新建项目',
        title: '商业信息',
        activeName: '1'
      }
    },
    mounted: function () {
      //1)设置是否禁止编辑
      //todo: for edit test
      //this.disabled = false;
      this.disabled = this.childParm.modAuth != 2;

      //2)初始化数据
      this.initData()
    },

    /**退出时逻辑**/
    beforeDestroy: function () {
      //todo:两件事：数据是否修改，如果没有改变，直接退出，否则提示是否保存信息框
      //this.theCancelPopup();

    },

    methods: {
      switchLoading(loadingA){
        this.loadingA = loadingA
      },


      run() {
        //空fun为了兼容俊伟的调用方式
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

      /*进入后初始化数据*/
      initData: function () {
        let that = this
        axios.all([
          //取数据
          this.$http.post('/longcity/services/v1/project/getMenuDetail', {
            'projectId': that.childParm.id,
            'titleKey': [
              'proBusinessInfo'
            ]
          }),
          //取字典
          this.$http({
            method: 'post',
            url: '/longcity/services/v1/dict/dictListByType',
            /*合作及退出方式*/
            //如下具体含义见商业信息字典.xls
            data: {'dictTypes': ['transactionWay','landTransfer', 'institutionalHolder', 'isPledge', 'powAuction', 'commercialCooperationWay', 'taxRisk', 'debtRisk', 'holderDispute', 'lotFlaw', 'bestRisk', 'deliveryRisk', 'ownerDisputes', 'contingentRisk', 'projectQualityRisk', 'employeeSetting', 'otherRisk', 'counterparty', 'commercialAccessMethods', 'gainTarget', 'powAuction', 'singleHolder', 'institutionalHolder', 'isPledge']},
          })])
          .then(axios.spread(function (p1, p2) {
            if (p1 && p1.status == 200 && p2 && p2.status == 200) {
              if (p1.data && p1.data.result && p1.data.result.proBusinessInfo) {
                let {proBusinessInfo} = p1.data.result

                //处理ie日期问题：拿到数据解析成date对象
                let {payRhythm} = proBusinessInfo;
                if(payRhythm && payRhythm.length>0){
                  payRhythm = payRhythm.map(item=>{
                    let paymentTime = item.paymentTime;
                    if(paymentTime && (typeof paymentTime =='string')){
                      let sdate = new Date(Date.parse(paymentTime.replace(/-/g,"/")))
                      item.paymentTime = that.strToGmt(sdate)
                    }
                    return  item;
                  })
                }
                proBusinessInfo.payRhythm = payRhythm


                that.proBusinessInfoBackUp = Immutable.Map(that.cloneObj(proBusinessInfo))
                that.proBusinessInfo = proBusinessInfo;
              }
              if (p2.data && p2.data.result && p2.data.result && p2.data.result[0].dictType) {
                p2.data.result.forEach(item => {
                  let dictType = item.dictType;
                  switch (dictType) {
                    case 'transactionWay':
                      that.transactionWayItems = item.items
                      break;
                    case 'commercialCooperationWay':
                      that.commercialCooperationWayItems = item.items;
                      break;
                    case 'singleHolder':
                      that.singleHolderItems = item.items;
                      break;
                    case 'landTransfer':
                      that.landTransferItems = item.items;
                      break;
                    case 'institutionalHolder':
                      that.institutionalHolderItems = item.items;
                      break;
                    case 'isPledge':
                      that.isPledgeItems = item.items;
                      break;
                    case 'powAuction':
                      that.powAuctionItems = item.items;
                      break;

                    case 'taxRisk':
                      that.taxRiskItems = item.items;
                      break;
                    case 'debtRisk':
                      that.debtRiskItems = item.items;
                      break;
                    case 'holderDispute':
                      that.holderDisputeItems = item.items;
                      break;
                    case 'lotFlaw':
                      that.lotFlawItems = item.items;
                      break;
                    case 'bestRisk':
                      that.bestRiskItems = item.items;
                      break;
                    case 'deliveryRisk':
                      that.deliveryRiskItems = item.items;
                      break;
                    case 'ownerDisputes':
                      that.ownerDisputesItems = item.items;
                      break;
                    case 'contingentRisk':
                      that.contingentRiskItems = item.items;
                      break;
                    case 'projectQualityRisk':
                      that.projectQualityRiskItems = item.items;
                      break;
                    case 'employeeSetting':
                      that.employeeSettingItems = item.items;
                      break;
                    case 'otherRisk':
                      that.otherRiskItems = item.items;
                      break;
                    case 'counterparty':
                      that.counterpartyItems = item.items;
                      break;
                    case 'commercialAccessMethods':
                      that.commercialAccessMethodsItems = item.items;
                      break;
                    case 'gainTarget':
                      that.gainTargetItems = item.items;
                      break;

                    default:
                      break;
                  }
                });
              }

              //设置panel高度
              setTimeout(() => {
                that.setConHeight();
              })
            } else {
              console.log("获取数据信息错误")
            }
          }))
      },

      checkXiaoShu(ourStake, managementFee, saleFee, otherTradersReward, tradingOnPrice, equityPrice,debtPrice,entityReturn){
        let reg4 = /^(0|[1-9]\d{0,})+(\.\d{1,4})?$/; // 正则校验 :正整数,保留4位小数
        let reg6 = /^(0|[1-9]\d{0,})+(\.\d{0,})?$/; // 正则校验 :正整数,保留n位小数
        let reg2 = /^([1-9]\d{0,})+(\.\d{1,2})?$/; // 正则校验 :正整数,保留2位小数

        //我方股权比例
        if(ourStake && (!reg2.test(ourStake) || ourStake<0 || ourStake>100)){
          return {
            message: '请输入正确格式：收并购及合作概况->我方股权比例 保留两位小数,0~100'
          };
        }

        //managementFee
        if(managementFee && (!reg4.test(managementFee) || managementFee<0 || managementFee>100)){
          return {
            message: '请输入正确格式：收并购及合作概况->管理费包干 保留4位小数，0~100万'
          }
        }
        //saleFee
        if(saleFee && (!reg4.test(saleFee) || saleFee<0 || saleFee>100)){
          return {
            message: '请输入正确格式：收并购及合作概况->销售费包干 保留4位小数，0~100万'
          }
        }
        //otherTradersReward
        if(otherTradersReward && (!reg4.test(otherTradersReward) || otherTradersReward<0 || otherTradersReward>100)){
          return {
            message: '请输入正确格式：收并购及合作概况->其他费用及奖励 保留4位小数，0~100万'
          }
        }


        //tradingOnPrice
        if(tradingOnPrice && (!reg4.test(tradingOnPrice) || tradingOnPrice<0 || tradingOnPrice>100)){
          return {
            message: '请输入正确格式：收并购及合作事宜->交易对价 保留4位小数，0~100万'
          }
        }
        //equityPrice
        if(equityPrice && (!reg4.test(equityPrice) || equityPrice<0 || equityPrice>100)){
          return {
            message: '请输入正确格式：收并购及合作事宜->股权价格 保留4位小数，0~100万'
          }
        }
        //debtPrice
        if(debtPrice && (!reg4.test(debtPrice) || debtPrice<0 || debtPrice>100)){
          return {
            message: '请输入正确格式：收并购及合作事宜->债权价格 保留4位小数，0~100万'
          }
        }
        //debtPrice
        if(entityReturn && (!reg4.test(entityReturn) || entityReturn<0 || entityReturn>100)){
          return {
            message: '请输入正确格式：收并购及合作事宜->实物返还 保留4位小数，0~100万'
          }
        }

        return false
      },

      /*检验数据格式*/
      checkField() {
        let {payRhythm, debtPrice, entityReturn, equityPrice, tradingOnPrice, ourStake, tradeCost, managementFee, saleFee, otherTradersReward, externalContacts} = this.proBusinessInfo;

        //1)验证数字
        let regData = /^[0-9|.]*$/;
        let reg2 = /^([1-9]\d{0,})+(\.\d{1,2})?$/; // 正则校验 :正整数,保留2位小数
        //数据验证对象
        let dataValidObj = [
          {
            name: tradingOnPrice,
            text: '请输入正确格式：收并购及合作事宜->交易对价 保留4位小数，0~1000000'
          },
          {
            name: equityPrice,
            text: '请输入正确格式：收并购及合作事宜->股权价格 保留4位小数，0~1000000'
          },
          {
            name: debtPrice,
            text: '请输入正确格式：收并购及合作事宜->债权价格 保留4位小数，0~1000000'
          },
          {
            name: entityReturn,
            text: '请输入正确格式：收并购及合作事宜->实物返还 保留4位小数，0~1000000'
          },
          {
            name: ourStake,
            text: '请输入正确格式：收并购及合作概况->我方股权比例 保留两位小数,0~100'
          },
          {
            name: tradeCost,
            text: '请输入正确格式：收并购及合作概况->操盘费用 必须为数字'
          },
          {
            name: managementFee,
            text: '请输入正确格式：收并购及合作概况->管理费包干 保留4位小数，0~1000000'
          },
          {
            name: saleFee,
            text: '请输入正确格式：收并购及合作概况->销售费包干 保留4位小数，0~1000000'
          },
          {
            name: otherTradersReward,
            text: '请输入正确格式：收并购及合作概况->其它费用及奖励 保留4位小数，0~1000000'
          }
        ];
        for (let i = 0; i < dataValidObj.length; i++) {
          let item = dataValidObj[i];
          if (item.name !== '' && !regData.test(item.name)) {
            this.$message({
              showClose: true,
              message: item.text,
              type: 'error',
              duration: 3000,
            })
            return false;
          }
        }


        let tmp = this.checkXiaoShu(ourStake, managementFee, saleFee, otherTradersReward, tradingOnPrice, equityPrice,debtPrice,entityReturn);
        if(tmp){
          this.$message({
            showClose: true,
            message: tmp.message,
            type: 'error',
            duration: 3000,
          })
          return false;
        }



      //2)验证手机号
        let phoneRegx = /^1[3|4|5|8][0-9]\d{4,8}$/;
        for (let n = 0; n < externalContacts.length; n++) {
          let it = externalContacts[n];
          if (it.contactWay !== '' && it.contactWay && !phoneRegx.test(it.contactWay)) {
            this.$message({
              showClose: true,
              message: '请输入正确格式：收并购及外部联系人->联系方式 必须为合法手机号码',
              type: 'error',
              duration: 3000,
            })
            return false;
          }
        }

        //3)验证paymentAmount
        for (let n = 0; n < payRhythm.length; n++) {
          let it1 = payRhythm[n];
          if (it1.paymentAmount !== '' && it1.paymentAmount) {
            if(!reg2.test(it1.paymentAmount) || it1.paymentAmount<0 || it1.paymentAmount>100){
              this.$message({
                showClose: true,
                message: '请输入正确格式：收并购及外部联系人->收并购及合作事宜 -> 支付金额 保留两位小数,0~100',
                type: 'error',
                duration: 3000,
              })
              return false;
            }

          }
        }

        return true;
      },

      /*保存数据*/
      saveData: function () {
        if (!this.checkField()) {
          return
        }

        //编辑状态并且数据有有变化才执行保存
        //if (this.childParm.modAuth == 2 && !Immutable.is(this.proBusinessInfoBackUp, Immutable.Map(this.proBusinessInfo))) {
        if (!Immutable.is(this.proBusinessInfoBackUp, Immutable.Map(this.proBusinessInfo))) {
          let that = this
          //提出汪亮的一个id为空的bug
          this.proBusinessInfo.externalContacts = this.proBusinessInfo.externalContacts.filter(item => {
            item.id === "" && (delete item.id)
            return true;
          });
          this.proBusinessInfo.payRhythm = this.proBusinessInfo.payRhythm.filter(item => {
            item.id === "" && (delete item.id)

            //处理ie日期问题：提交时将date转成str类型，保存导数据库
            let paymentTime = item.paymentTime;
            if(paymentTime && paymentTime instanceof Date){
              item.paymentTime=this.gmtToStr(paymentTime)
            }
            return true;
          });




          this.$http({
            method: 'post',
            url: '/longcity/services/v1/project/saveProjectPartially',
            data: {
              'projectId': this.childParm.id,
              'title': 'proBusinessInfo',
              'detail': this.proBusinessInfo,
            }
          }).then(function (succeed) {
            if (succeed && succeed.data.code == 200) {
              that.thePreservationPopup()
              that.$emit('cancelThePage', 1);
            } else {
              that.$message({
                showClose: true,
                message: '保存失败！',
                type: 'error',
                duration: 1000,
              })
            }
          }, function (err) {
            console.log(err)
          })
        } else {
          this.thePreservationPopup()
        }
      },

      /*取消弹窗*/
      theCancelPopup() {
        var that = this;
        this.cancelDialogue(function () {
          that.$emit('cancelThePage', 1);
        });
        //暂时注销，改成如上逻辑，每次保存，都提交信息
        /*if (Immutable.is(this.proBusinessInfoBackUp, Immutable.Map(this.proBusinessInfo))) {
          this.cancelThePage(1)
        } else {
          const h = this.$createElement
          this.$msgbox({
            title: '消息',
            message: h('p', null, [
              h('span', null, '未保存，是否放弃修改'),
              h('i', {style: 'color: teal'},)
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                setTimeout(() => {
                  done()
                  setTimeout(() => {
                    instance.confirmButtonLoading = false
                    this.cancelThePage(1)
                  }, 5)
                }, 10)
              } else {
                done()
              }
            }
          }).then(action => {

          })
        }*/
      },

      /*保存弹窗*/
      thePreservationPopup() {
        this.$message({
          showClose: true,
          message: '恭喜，项目保存成功！',
          type: 'success',
          duration: 3000,
        })
        //this.cancelThePage(2)
      },
      /*关闭本页面*/
      cancelThePage(operation) {
        this.$emit('cancelThePage', operation)
      }

    }
  }
</script>
<style scoped lang="less">
  #businessInfo {

    width: 100%;
    position: relative;

    .title {
      width: 100%;
      max-width: 1005px;
      background-color: #67649F;
      z-index: 9999;
      height: 50px;

      .mainTitle {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        line-height: 50px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        margin-right: 209px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

    }

    .content {
      width: 100%;
      overflow: auto;

      .subTitle {
        height: 50px;
        line-height: 50px;
        position: relative;
        text-indent: 17px;
        font-size: 16px;
        color: #67649F;
        border-bottom: 1px solid #ddd;
        &:before {
          display: block;
          content: '';
          height: 16px;
          width: 3px;
          background-color: #67649F;
          position: absolute;
          top: 17px;
          left: 0;
        }
      }

      .tab {
        .tab-content {
          padding: 25px;
        }
      }

      .everyInputBox {
        width: 49%;
        height: 40px;
        display: inline-block;
        line-height: 40px;
      }
      .nameText {
        width: 6em;
        text-align: left;
        font-size: 14px;
        coloe: #666;
      }
      .width9 {
        width: 9em;;
      }
      .width12 {
        width: 13em;
      }
      .line2 {
        line-height: 20px;
        float: left;
        margin-right: 4px;
      }
      .input {
        width: 50%;
        height: 28px;
        border: 1px solid #bbb;
        border-radius: 4px;
        text-indent: 10px;
      }
      .textName {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #444444;
        letter-spacing: 0;
        line-height: 14px;
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
        overflow: auto;
        background-color: #f9f9f9;
        border: 1px solid #bfcbd9;
      }
      .statistics {
        position: absolute;
        right: -19px;
        bottom: 15px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #CCCCCC;
        letter-spacing: 0;
        line-height: 14px;
      }
      .saleroom, .commercialIndex {
        width: 100%
      }
      .saleroom th, .commercialIndex th {
        width: 10%;
        border: 1px solid #ddd;
        background-color: #bbb;
      }
      .saleroom td {
        width: 10%;
        border: 1px solid #ddd;
        text-align: center
      }
      .commercialIndex td {
        width: 25%;
        border: 1px solid #ddd;
        text-align: center;
      }
    }

  }


</style>
