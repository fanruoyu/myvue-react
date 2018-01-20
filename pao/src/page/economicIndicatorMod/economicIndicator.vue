<template>
  <div id="economicIndicator">
    <div class="closeNav">
      <p class=" tit fl" title="">{{childParm.projectName}}</p>
      <div>
        <span class="closeButton fl" @click="close">关闭</span>
      </div>

      <!--<span class="saveButton" @click="save">保存</span>-->
    </div>
    <div v-if="fullscreenLoading"  style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:99" element-loading-text="数据加载中，请稍后..."
          v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.5)"></div>
    <div class="contentBox" id ="conMod">
      <!--<p class="navBoxTop" v-if="childParm.modAuth==2">-->
      <p class="navBoxTop" >
        <span class="btn castMould" @click="castMould" v-if="childParm.modAuth==2">投模版本选择</span>
        <!--<span class="btn castMould" v-else-if="childParm.modAuth!=2">投模版本选择</span>-->
        <a v-if="result.coreLink!=undefined&&result.coreLink!=''" :href="result.coreLink!=undefined&&result.coreLink.indexOf('http')<0?'https://'+result.coreLink:result.coreLink" class="btn" target="_Blank">详细信息</a>
        <!--<span class="btn" v-else-if="result.coreLink==''">详细信息</span>-->
      </p>
      <p class="projectFixed">基本信息</p>
      <div class="everyInputBox positionManage width65 height60">
        <span class="nameText" style="height:60px;margin-top:-30px;line-height:60px">版本名称</span>
        <p class="textContent" style="line-height:60px;overflow:hidden">
          <span style="line-height:20px;width:30em;">{{result.versionName}}</span>
        </p>

      </div>

      <div class="everyInputBox positionManage width35 height60">
        <span class="nameText"  style="height:60px;margin-top:-30px;line-height:60px">版本编号</span>
        <p class="textContent" style="line-height:60px;overflow:hidden">
          <span style="line-height:20px;margin-top:10px">{{result.versionNumber}}</span>
        </p>
        <!--<span class="textContent">{{result.versionCode}}</span>-->
      </div>
      <div class="everyInputBox width65">
        <span class="nameText">创建人</span>
        <span class="textContent">{{result.versionCreateBy}}</span>
      </div>
      <div class="everyInputBox width35">
        <span class="nameText">创建时间</span>
        <span class="textContent">{{result.versionCreateTime}}</span>
      </div>
      <div class="everyInputBox width65">
        <span class="nameText">最后更改人</span>
        <span class="textContent">{{result.versionUpdateBy}}</span>
      </div>
      <div class="everyInputBox width35">
        <span class="nameText">最后修改时间</span>
        <span class="textContent">{{result.versionUpdateTime}}</span>
      </div>
      <p class="projectFixed">测算基准</p>
      <div class="everyInputBox ">
        <span class="nameText width9">建议楼面地价(计容)</span>
        <span class="textContent">{{result.adviceFloorPriceRatio | integer}}</span>
        <span class="unit">元／平米</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width14 fl" style="margin-left:-4px">建议可售面积(不含销售车位、不含视同销售面积)地价</span>
        <span class="textContent">{{result.suggestedLandPrice | integer}}</span>
        <span class="unit">元／平米</span>
      </div>
      <div class="everyInputBox" v-if="result.runningType!=undefined&&result.runningType.length>0" v-for="item in result.runningType">
        <span class="nameText width16">{{item.name}}</span>
        <span class="textContent">{{item.value | integer}}</span>
        <span class="unit">元／平米</span>
      </div>

      <p class="projectFixed">项目总体投资评价指标</p>
      <div class="everyInputBox">
        <span class="nameText width9">项目总收入(含税)</span>
        <span class="textContent">{{result.proTotalIncome |decimals4}}</span>
        <span class="unit">万元</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width14">项目总结算收入(即不含税)</span>
        <span class="textContent">{{result.proTotalAccount |decimals4}}</span>
        <span class="unit">万元</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">项目总投入（含税）</span>
        <span class="textContent">{{result.proTotalPlunge |decimals4}}</span>
        <span class="unit">万元</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width12">项目总体收益率</span>
        <span class="textContent">{{result.proTotalYieldRate |decimals2}}</span>
        <span class="unit">%</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">项目毛利率</span>
        <span class="textContent">{{result.proGrossMargin |decimals2}}</span>
        <span class="unit">%</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width12">首次开盘去化率</span>
        <span class="textContent">{{result.firstOpenchangeRate |decimals2}}</span>
        <span class="unit">%</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">项目总体IRR</span>
        <span class="textContent">{{result.proTotalIRR |decimals2}}</span>
        <span class="unit">%</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width12">经营性现金流平衡时间</span>
        <span class="textContent">{{result.runCashFlowBalanceDate}}</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">首年去化量</span>
        <span class="textContent">{{result.firstYearchangeAmount |decimals4}}</span>
        <span class="unit">万元</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width12">项目现金流平衡时间</span>
        <span class="textContent">{{result.proCashFlowBalanceDate}}</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">项目总收益</span>
        <span class="textContent">{{result.proTotalEarning |decimals4}}</span>
        <span class="unit">万元</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width12">可售比</span>
        <span class="textContent">{{result.vendibilityRatio |decimals2}}</span>
        <span class="unit">%</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">投资回收期静态</span>
        <span class="textContent">{{result.investRecycleStatic |integer}}</span>
        <span class="unit">月</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">资金峰值</span>
        <span class="textContent">{{result.capitalPeak |decimals4}}</span>
        <span class="unit">万元</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width12">资金峰值时间</span>
        <span class="textContent">{{result.capitalPeakDate}}</span>
        <span class="unit">月</span>
      </div>

      <p class="projectFixed">销售物业投资评价指标</p>
      <div class="everyInputBox">
        <span class="nameText width9">销售物业收入(含税)</span>
        <span class="textContent">{{result.tenementIncome |decimals4}}</span>
        <span class="unit">万元</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width12">销售物业结算收入(不含税)</span>
        <span class="textContent">{{result.tenementAccount |decimals4}}</span>
        <span class="unit">万元</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">销售物业投入(含税)</span>
        <span class="textContent">{{result.tenementPlunge |decimals4}}</span>
        <span class="unit">万元</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">销售物业净利润</span>
        <span class="textContent">{{result.tenementProfits |decimals4}}</span>
        <span class="unit">万元</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">销售物业毛利率</span>
        <span class="textContent">{{result.tenementGrossMargin |decimals2}}</span>
        <span class="unit">%</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">销售物业净利率</span>
        <span class="textContent">{{result.tenementProfits  |decimals2}}</span>
        <span class="unit">%</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">销售物业IRR</span>
        <span class="textContent">{{result.saleTenementIRR |decimals2}}</span>
        <span class="unit">%</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width12">非住宅销售物业货值比例</span>
        <span class="textContent">{{result.noHouseSaleRatio |decimals2}}</span>
        <span class="unit">%</span>
      </div>

      <p class="projectFixed">留存物业投资评价指标</p>
      <div class="everyInputBox">
        <span class="nameText width9">留存物业IRR</span>
        <span class="textContent">{{result.remainTenementIRR |decimals2}}</span>
        <span class="unit">%</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width12">留存物业净收益</span>
        <span class="textContent">{{result.remainTenementProfits |decimals4}}</span>
        <span class="unit">万元</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width9">运营第三年NPI</span>
        <span class="textContent">{{result.thirdYearNPI |decimals4}}</span>
        <span class="unit">万元</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width12 line2">运营第三年商场租金及物业Y- Cost（NPI/总成本）</span>
        <span class="textContent">{{result.thirdYearMarketRent |decimals2}}</span>
        <span class="unit">%</span>
      </div>
      <div class="everyInputBox">
        <span class="nameText width14 line2">商场运营第三年平均租金(不含商场车位、推广服务收入)</span>
        <span class="textContent">{{result.thirdYearAverageRent |integer}}</span>
        <span class="unit">元/平米/月</span>
      </div>

      <p class="projectFixed">销售排期及分年结利</p>
      <div class="everyInputBox">
        <span class="nameText width9">拿地时间（第一年）</span>
        <span class="textContent">{{result.obtainLandDate}}</span>
      </div>
      <p class="textName">10年销售额及销售结利</p>
      <table class="saleroom">
        <tr>
          <th>项目</th>
          <th v-for="item in result.salesYearlist">{{item.parentName}}</th>
        </tr>
        <tr>
          <td>销售额(万元)</td>
          <td v-for="item in result.salesYearlist"><p class="width70">{{item.salesVolume|decimals4}}</p></td>
        </tr>
        <tr>
          <td>结利(万元)</td>
          <td v-for="item in result.salesYearlist"><p class="width70">{{item.jieLi|decimals4}}</p></td>
        </tr>
      </table>

      <p class="projectFixed borderBottomNone">各业态指标</p>
      <table class="commercial">
        <tr>
          <th>业态</th>
          <th>结算利润(万元)</th>
          <th>结算毛利率(%)</th>
          <th>对标口径单方成本(万元)</th>
          <th>单方成本(元/平米)</th>
          <th>可租售产权面积(平米)</th>
          <th>销售均价(元/平米)</th>
          <th>销售总收入(万元)</th>
        </tr>
        <tr v-for="item in result.durationAndProfitList">
          <td><p class="width100">{{item.parentName}}</p></td>
          <td><p class="width100">{{item.settlementProfit|decimals4}}</p></td>
          <td><p class="width100">{{item.grossProfit|decimals2}}</p></td>
          <td><p class="width100">{{item.benchmarkCalibe|decimals4}}</p></td>
          <td><p class="width100">{{item.unilateralCost|integer}}</p></td>
          <td><p class="width100">{{item.affordableVideo|decimals2}}</p></td>
          <td><p class="width100">{{item.averageSellingPrice|integer}}</p></td>
          <td><p class="width100">{{item.totalSalesRevenue|decimals4}}</p></td>
        </tr>
      </table>
      <transition name="fade" mode="out-in">
        <div class="modelBox"  id="chooseTemplate" v-if="chooseTemplate">
          <div class="templateContent">
            <p class="templateNavTil"><span class="text">项目投模版本选择</span><span class="btnClose" @click="closeModel"></span></p>
            <div class="templateContentBox">
              <div class="everyChoose" v-for="(item,index) in Template">
                <p class="versionsNum">
                  <span class="numText">{{item.versionName}}</span>
                  <span class="chooseNo fr" :class="{chooseYes:item.versionId==versionId}" @click="chooseId(item.versionId,index)"></span>
                </p>
                <p class="company">
                  <span class="establish">创建</span>
                  <span class="department">{{item.company}}</span>
                  <span class="department">{{item.department}}</span>
                  <span class="department">{{item.userName}}</span>
                  <span class="fr">{{item.createTime}}</span>
                </p>
                <p class="company">
                  <span class="establish">最后更改</span>
                  <span class="department">{{item.company}}</span>
                  <span class="department">{{item.department}}</span>
                  <span class="department">{{item.versionUpdateBy}}</span>
                  <span class="fr">{{item.submitTime}}</span>
                </p>
              </div>
            </div>
            <p class="saveBox">
              <span v-if="versionId!=''" class="fr saveButton" @click="saveButton">保存</span>
            </p>
          </div>
        </div>
      </transition>
    </div>

    <transition name="fade" mode="out-in">
      <div class="placeChooseModel" v-if="placeChooseModelIsShow">
        <div class="versionsBox">
          <p class="textBox">尚未选择本项目主测算投模，请选择相关版本投模作为主测算投模！</p>
          <p class="buttonBox">
            <span class="noChoose" @click="noChoose">不了</span><span class="chooseBtnYes" @click="chooseBtnYes">选择投模版本</span>
          </p>
        </div>
      </div>
    </transition>
    <!--提示-->
    <transition name="fade" mode="out-in">
      <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'economicIndicator',
    data () {
      return {
        TemplateIndex: '', // 存储当前投模对应的数据值
        TemplateContent: {versionId: '', versionName: '', userName: '', createBy: '', createTime: '', submitTime: '', versionCode: '', describe: '', company: '', department: '', versionUpdateBy: ''}, // 存储当前投模对应的数据
        chooseTemplate: false, // 投模遮罩层
        placeChooseModelIsShow: false, // 点击进来请选择投模弹出层
        result: {
          versionNumber: '',
          versionCode: '',
          userName: '',
          createTime: '',
          investRecycleStatic: '',
          versionUpdateBy: '',
          proCashFlowBalanceDate: '',
          coreLink: '',
          proTotalIRR: '',
          proTotalEarning: '',
          tenementProfitsRate: '',
          adviceFloorPriceRatio: '',
          tenementGrossMargin: '',
          firstYearchangeAmount: '',
          noHouseSaleRatio: '',
          proTotalIncome: '',
          proTotalYieldRate: '',
          tenementProfits: '',
          remainTenementProfits: '',
          tenementIncome: '',
          thirdYearNPI: '',
          thirdYearMarketRent:'',
          thirdYearAverageRent:'',
          obtainLandDate:'',
          capitalPeak:'',
          capitalPeakDate: '',
          saleTenementIRR: '',
          tenementAccount: '',
          runCashFlowBalanceDate: '',
          tenementPlunge: '',
          versionCreateBy: '',
          vendibilityRatio: '',
          remainTenementIRR: '',
          firstOpenchangeRate: '',
          versionName: '',
          versionUpdateTime: '',
          proTotalPlunge: '',
          versionCreateTime: '',
          proGrossMargin: '',
          runningType: [],
          salesYearlist: [{parentName: '第一年', salesVolume: '', jieLi: ''}, {parentName: '第二年', salesVolume: '', jieLi: ''}, {parentName: '第三年', salesVolume: '', jieLi: ''}, {parentName: '第四年', salesVolume: '', jieLi: ''}, {parentName: '第五年', salesVolume: '', jieLi: ''}, {parentName: '第六年', salesVolume: '', jieLi: ''}, {parentName: '第七年', salesVolume: '', jieLi: ''}, {parentName: '第八年', salesVolume: '', jieLi: ''}, {parentName: '第九年', salesVolume: '', jieLi: ''}, {parentName: '第十年', salesVolume: '', jieLi: ''}],
          durationAndProfitList: [{
            parentName: '',
            settlementProfit: '',
            grossProfit: '',
            benchmarkCalibe: '',
            unilateralCost: '',
            affordableVideo: '',
            averageSellingPrice: '',
            totalSalesRevenue: ''
          }],
          suggestedLandPrice: ''
        },
        Template: [],
        versionId: '', // 版本号
        hintMessage: '', // 提示函数文本
        hintIsShow: false, // 提示信息框显示隐藏
        fullscreenLoading: false,//loading加载图片控制显示隐藏


      }
    },
    //自定义过滤器
    filters:{
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
      },
      //两位小数
      decimals2(value){
        let  reg2= /^[-,+]?\d+(\.\d{1,2})?$/ // 正则校验 :正整数,保留2位小数
        if(!value){
          return ''
        }else if(!reg2.test(value)){
          value=Number(value).toFixed(2)
          if(value=='NaN'){
            return ''
          }else {
            return value
          }
        }else{
          return value
        }
      },
      //四位小数
      decimals4(value){
        let reg4= /^[-,+]?\d+(\.\d{1,4})?$/ // 正则校验 :正整数,保留4位小数
        if(!value){
          return ''
        }else if(!reg4.test(value)){
          value=Number(value).toFixed(4)
          if(value=='NaN'){
            return ''
          }else {
            return value
          }
        }else{
          return value
        }
      }
    },
    methods: {
      // 投模选择函数
      chooseId (versionId, index) {
        this.versionId = versionId
        this.TemplateIndex = index
      },
      // 选择投模后确定函数
      saveButton () {
        this.particulars()
        // 保存项目id及选择的版本号
        this.synchronization()
        this.chooseTemplate = false
      },
      // 获取投模详细信息接口
      particulars () {
//        this.hint('数据获取中,请耐心等待!')
        this.fullscreenLoading=true
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/project/getEconomicIndexMessage',
          data: {projectId: that.projectId, versionId: that.versionId}
        }).then(function (succeed) {
          if (succeed.data.result !== {}||succeed.data.result!=undefined||succeed.data.code!=300) {
            that.result = succeed.data.result
          }else {
            this.hint('投模系统中暂无该项目对应的投模版本数据，请在投模系统确保已完成投模运算。')
          }
          that.fullscreenLoading=false
          that.TemplateContent = that.Template[that.TemplateIndex]
          that.chooseTemplate = false
        })
      },
      // 投模选择遮罩层打开
      castMould () {
        // 获取数据
        this.loadings(2)
      },
      // 关闭遮罩层函数
      closeModel () {
        this.TemplateIndex = ''
        this.TemplateContent = {versionId: '', versionName: '', userName: '', createBy: '', createTime: '', submitTime: '', versionCode: '', describe: '', company: '', department: '', versionUpdateBy: ''}
        this.chooseTemplate = false
      },
      // 获取数据函数
      loadings (labelId) {
        let that = this
        if (that.Template === undefined || that.Template.length < 1) {
          this.$http({
            method: 'post',
            url: 'longcity/services/v1/project/getVersionMessage',
            data: {projectId: that.projectId}
          }).then(function (succeed) {
            if (labelId === 1) {
              that.Template = succeed.data.result
              if (succeed.data.lastInvestVersionID === '' || succeed.data.lastInvestVersionID === undefined) {
                if(that.childParm.modAuth==2){
                  that.placeChooseModelIsShow = true
                }else {
                  that.hint('尚未选择本项目主测算投模，请联系相关部门维护本项目主测算投模!')
                }
              } else {
                that.versionId = succeed.data.lastInvestVersionID
                that.particulars()
              }
            } else if (labelId === 2) {
              if (succeed.data.result !== undefined && succeed.data.result !== '') {
                that.chooseTemplate = true
              } else {
                that.hint('投模系统中暂无该项目对应的投模版本数据，请在投模系统确保已完成投模运算。')
              }
            }
          })
        } else {
          that.chooseTemplate = true
        }
      },
      // 选择投模版本信息获取信息前保存项目id及版本号
      synchronization () {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/project/saveLastInvestVersion',
          data: {projectId: that.projectId, lastInvestVersionID: that.versionId}
        }).then(function (succeed) {
          console.log(succeed)
        })
      },
      chooseBtnYes () {
        this.placeChooseModelIsShow = false
        if (this.Template !== undefined && this.Template !== '') {
          this.chooseTemplate = true
        } else {
          this.hint('投模系统中暂无该项目对应的投模版本数据，请在投模系统确保已完成投模运算。')
        }
      },
      // 不了函数
      noChoose () {
        this.placeChooseModelIsShow = false
      },
      save () {
        // 提交函数
        this.$emit('cancelThePage', 2)
      },
      // 关闭函数
      close () {
        var that = this
        this.cancelDialogue(function () {
          that.$emit('cancelThePage', 1)
        })
      },
      // 从父元素获取id方法
      run (fun, parm) {
        if (fun == 'getId') {
          this.projectId = parm
          this.loadings(1)
        }
      },
      // 提示函数
      hint (message) {
        let that = this
        this.hintIsShow = true
        that.hintMessage = message
        setTimeout(function () {
          that.hintIsShow = false
        }, 2600)
        clearTimeout()
      }
    },
    mounted () {
      this.setConHeight()
    },
    props: {
      childParm: Object
    }
  }
</script>
<style scoped lang="less">
  #economicIndicator{width:100%;}
  #conMod{width:100%;overflow:auto}
  #economicIndicator{
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #999;}
    .navBoxTop{width:100%;height:40px;line-height:40px;text-align:right}
    .navBoxTop .btn{width:120px;height:30px;line-height:30px;display:inline-block;margin:0 10px;border:1px solid #ddd;text-align:center;border-radius:4px;cursor:pointer;}
    .castMould{background-color:#67649F;color:#fff;}
    .projectFixed{height:50px;line-height:50px;position:relative;text-indent:17px;font-size:16px;color:#67649F;border-bottom:1px solid #ddd;}
    .borderBottomNone{border-bottom:none;}
    .projectFixed:before{display:block;content:'';height:16px;width:3px;background-color:#67649F;position:absolute;top:17px;left:0;}
    .contentBox{padding:0px 2%;width:96%;}
    .contentBox{
      .everyInputBox{width:49%;height:40px;display:inline-block;line-height: 40px;}
      .everyInputBox.width65{width:65%;}
      .everyInputBox.positionManage{position:relative;}
      .everyInputBox.height60{height:60px;overflow:hidden;}
      .everyInputBox.positionManage .nameText{position:absolute;top:50%;left:0;margin-top: -30px;}
      .everyInputBox.width35{width:33%;}
      .everyInputBox.width40{width:40%;}
      .everyInputBox.width58{width:58%;}
      .everyInputBox.positionManage .textContent{line-height:20px;max-width:30em;height:60px;overflow:hidden;margin-left:7em;}
      .nameText {width:6em;text-align:left;font-size:14px;color:#666;margin-left:0;}
      .nameText.width16 {width:16em;}
      .width9 {width:10em;;}
      .width12 {width:12em;}
      .width14 {width:14em;}
      .ml15{margin-left:15px;}
      .fl{line-height:16px;float:left;margin-top:5px;margin-right:4px;}
      .line2{line-height:20px;float:left;margin-right:4px;}
      .input {width:45%;height:28px;border:1px solid #bbb;border-radius:4px;text-indent:10px;}
      .textName{line-height:30px;height:30px;font-size:14px;}
      .textareaBox{position:relative;width:100%}
      .decision{line-height:18px;font-size:14px;}
      .statistics{position: absolute;left:80%;bottom:10px;margin-left:-30px;}
      .saleroom ,.commercialIndex,.commercial{width:100%}
      .commercial{margin-bottom:30px;}
      .saleroom th,.commercialIndex th{width:100/11%;border:1px solid #ddd;background-color:#f8f8f8;}
      .commercial th{width:100/8%;border:1px solid #ddd;background-color:#f8f8f8}
      .commercial td{width:100/8%;border:1px solid #ddd;text-align: center;height:24px;}
      .commercial td .width100{max-width:100px;line-height:18px;word-wrap: break-word; word-break: normal;}
      .saleroom td{width:100/11%;border:1px solid #ddd;text-align: center}
      .saleroom td .width70{max-width:70px;line-height:18px;word-wrap: break-word; word-break: normal;}
      .commercialIndex td{width:25%;border:1px solid #ddd;text-align: center;}
    }
    /*遮罩层*/
    .modelBox,.placeChooseModel{display: block;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.3);position: fixed;top: 0;left: 0;z-index: 20000;}
    .templateContent{width:68%;height:80%;margin:0 auto;margin-top:3.5%;background-color:#fff;border:1px solid #ddd;}
    .templateNavTil{width:100%;height:40px;line-height:40px;background-color:#e2e2ed;}
    .templateNavTil{
      .text{display:block;float:left;text-indent:15px;color:#67649F}
      .btnClose{width:30px;height:40px;background:url("../../assets/images/economicsClosed.png") center center no-repeat;display:block;float:right;cursor:pointer;margin-right:10px;background-size:20px;}
    }
    //请选择投模版本
    .placeChooseModel{
      .versionsBox{width:400px;height:100px;margin:200px auto 0;background-color:#fff;border:1px solid #ddd;border-radius:4px;padding:50px 0;}
      .textBox{text-align: center;line-height:30px;font-size:14px;}
      .buttonBox{text-align: center;line-height:50px;margin-top:30px;}
      .noChoose,.chooseBtnYes{width:100px;height:30px;line-height:30px;border:1px solid #ddd;margin:0 10px;border-radius:4px;cursor:pointer;user-select:none;font-size:14px;}
      .chooseBtnYes{background-color:#67649F;color:#fff;}
      .noChoose{background-color:#fff;}
    }
    .templateContentBox{height:90%;overflow-y:auto;}
    .templateContent{
      .everyChoose{width:95%;border:1px solid #ddd;margin:10px auto;border-radius:4px;}
      .versionsNum{line-height:30px;height:30px;width:96%;padding:0 2%;background-color:#f8f8f8;border-bottom:1px solid #ddd;}
      .chooseNo{width:30px;height:30px;background:url("../../assets/images/Groupno.png") center center no-repeat;background-size:20px;cursor:pointer;}
      .chooseYes{background:url("../../assets/images/Groupyes.png") center center no-repeat;background-size:20px;}
      .company{line-height:40px;height:40px;width:96%;padding:0 2%;margin:10px 0;}
      .establish{display:inline-block;width:100px;height:30px;line-height:30px;text-align:center;border:1px solid #67649F;color:#67649F;border-radius:4px;}
      .department{margin-left:10px;}
      .saveBox{height:40px;line-height:40px;width:100%;background-color:#f9f9f9;}
      .saveButton{width:100px;display:inline-block;margin-right:20px;text-align:center;background-color:#67649F;color:#fff;font-size:14px;height:30px;line-height:30px;border-radius:4px;user-select:none;cursor:pointer;margin-top:5px;}
    }
    /*动画*/
    .fade-enter-active, .fade-leave-active {transition: all 0.5s ease-out;}

    .fade-enter, .fade-leave-active {opacity: 0;}
  }
</style>
