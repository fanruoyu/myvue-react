<template>
  <div id="test123">
    <div class="item">
      <p class="title">交易路径</p>
      <div class="content">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm form proPhoto">
          <el-button :style="{display: disabled?'none':''}" type="primary" @click="transImgMangagement()">图片管理
          </el-button>
          <el-tabs type="border-card" class="tabs">
            <el-tab-pane label="封面">
              <p v-if="this.imgCover[0].src==''">暂无照片</p>
              <slide-show :slides="imgCover" v-else="false"></slide-show>
            </el-tab-pane>
            <el-tab-pane label="四至">
              <p v-if="this.imgFourto[0].src==''">暂无照片</p>
              <slide-show :slides="imgFourto" v-else="false"></slide-show>
            </el-tab-pane>
            <el-tab-pane label="有利因素">
              <p v-if="this.imgFavourableFactor[0].src==''">暂无照片</p>
              <slide-show :slides="imgFavourableFactor" v-else="false"></slide-show>
            </el-tab-pane>
            <el-tab-pane label="不利因素">
              <p v-if="this.imgNegativeFactor[0].src==''">暂无照片</p>
              <slide-show :slides="imgNegativeFactor" v-else="false"></slide-show>
            </el-tab-pane>
            <el-tab-pane label="现状">
              <p v-if="this.imgActuality[0].src==''">暂无照片</p>
              <slide-show :slides="imgActuality" v-else="false"></slide-show>
            </el-tab-pane>
          </el-tabs>
        </el-form>

        <diaLog2 :is-show="isSwitchImgMangagement">
          <div style="width:800px;position:relative;">
            <submitImg style="left:-50%;top:-200px;" :theInitImgData="theInitImgData"
                       @closeImgPage="closeImgMangagement" class="submitImg"></submitImg>
          </div>
        </diaLog2>
      </div>

    </div>
  </div>


</template>
<script>
  import diaLog2 from '../src/components/dialog'
  import submitImg from '../src/page/submitImg.vue'
  import slideShow from '../src/components/slideShow2.vue'


  export default {
    components: {businessUpLoadFile, diaLog2, submitImg, slideShow},
    name: 'businessCooperate',
    props: ['title', 'disabled', 'options', 'textLen', 'proBusinessInfo','switchLoading'],
    data() {
      return {
        ruleForm: {
          /*name需要校验，element ui存放该变量的位置固定*/
          name: '',
          bidName: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        panelIndex: 0,

        loadingA:false,
        reg4: /^(0|[1-9]\d{0,})+(\.\d{1,4})?$/, // 正则校验 :正整数,保留4位小数
        reg6: /^(0|[1-9]\d{0,})+(\.\d{0,})?$/, // 正则校验 :正整数,保留n位小数
        reg2: /^([1-9]\d{0,})+(\.\d{1,2})?$/, // 正则校验 :正整数,保留2位小数

        ruleForm3: {
          /*市政条件*/
          /*周边道路*/
          currentArroundRoad: '',//周边道路现状
          currentRoadBoard: '',//周边道路现状路板
          currentRoadRamp: '',//周边道路现状立交桥和匝道
          currentRoadOpen: '',//周边道路现状允许开口
          currentRoadVertical: '',//周边道路现状竖向现状
          currentRoadOverbridge: '',//周边道路现状天桥
          planRoad: '',//周边道路规划
          planRoadBoard: '',//周边道路规划路板
          planRoadRamp: '',//周边道路规划立交桥和匝道
          planRoadOpen: '',//周边道路规划允许开口
          planRoadVertical: '',//周边道路规划竖向规划
          planRoadOverbridge: '',//周边道路规划天桥
          /*管线*/
          currentPipeline: '',//管线现状
          currentPipelineOpen: '',//管线开口及标高现状
          planPipeline: '',//管线规划
          planPipelineOpen: '',//管线开口及标高规划
          /*轨道交通*/
          currentTrafficHallHeight: '',//轨道交通站厅层标高现状
          currentTrafficSoilDeptht: '',//轨道交通站房埋深和覆土深度现状
          currentTrafficFloorHeight: '',//轨道交通站台层标高现状
          currentTrafficExtentDepth: '',//轨道交通区间段埋深现状
          currentTrafficIsConnectUnder: '',//轨道交通是否可接驳地下商业现状
          currentTrafficIsExtentUnderPass: '',//轨道交通区间段是否在地块内下穿现状
          currentTrafficIsRemould: '',//轨道交通地面构筑物可否改造现状
          currentTrafficOtherForceDemand: '',//轨道交通其他强制要求说明现状
          planTrafficHallHeight: '',//轨道交通站厅层标高规划
          planTrafficSoilDeptht: '',//轨道交通站房埋深和覆土深度规划
          planTrafficFloorHeight: '',//轨道交通站台层标高现规划
          planTrafficExtentDepth: '',//轨道交通区间段埋深规划
          planTrafficIsConnectUnder: '',//轨道交通是否可接驳地下商业规划
          planTrafficIsExtentUnderPass: '',//轨道交通区间段是否在地块内下穿规划
          planTrafficIsRemould: '',//轨道交通地面构筑物可否改造规划
          planTrafficOtherForceDemand: '',//轨道交通其他强制要求说明规划
          /*公交*/
          currentBus: '',//公交现状
          planBus: '',//公交规划
          tenderScan: '',//标书扫描件
          /*项目战略*/
          boardProperty: '',//板块属性
          trafficZone: '',//交通区位
          assortResource: '',//配套资源
          industrialRadiation: '',//产业辐射及客户资源
          /*占地及规划信息*/
          landTitle: '', //用地性质 select
          planed_area_total: '',//占地面积(万平/㎡)
          planed_building_area: '',//建筑面积(万/㎡)
          floorCoveredArea: '',//计容地上建面
          plot_ratio: '',//容积率
          floorArea: '',//代征土地面积
          merchantableArea: '',//可售面积(地上)
          plotInfo: [
            {
              landRect: '',//地块区域勾边
              landName: '',//地块名称
              landCode: '',//地块编号
              longitude: '',//经度
              latitude: '',//纬度
              controlHeight: '',//控制高度
              buildingDensity: '',//建筑密度
              volumeRate: '',//容积率
              greenRate: '',//绿地率
              backlineRequire: '',//退线要求
              entranceRequire: '',//出入口要求
              currentBuilding: '',//现状建筑物
              statusStructures: '',//现状构筑物
              remark: '',//备注信息
              landTitle: [],//用地性质
            }
          ],//地块信息
          daylightingStandard: '',//日照要求
          roadStandard: '',//内部道路要求
          plotRatioUse: '',//容积率不平衡使用
          floorPlanHouseArea: '',//地上计容住宅建面
          houseRebuildCompensation: '',//起始还建住宅有无偿
          houseRebuildLimitPrice: '',//起始还建住宅有无限价
          houseRebuildRemote: '',//起始还建住宅原异地
          houseRebuildLimitAge: '',//起始还建住宅自持年限
          houseRebuildArea: '',//起始还建住宅面积
          houseRebuildPrice: '',//起始还建住宅售价
          commerceRebuildCompensation: '',//起始还建商业有无偿
          commerceRebuildLimitPrice: '',//起始还建商业有无限价
          commerceRebuildRemote: '',//起始还建商业原异地
          commerceRebuildLimitAge: '',//起始还建商业自持年限
          commerceRebuildArea: '',//起始还建商业面积
          commerceRebuildPrice: '',//起始还建商业售价
          officeRebuildCompensation: '',//起始还建写字楼有无偿
          officeRebuildLimitPrice: '',//起始还建写字楼有无限价
          officeRebuildRemote: '',//起始还建写字楼原异地
          officeRebuildLimitAge: '',//起始还建写字楼自持年限
          officeRebuildArea: '',//起始还建写字楼面积
          officeRebuildPrice: '',//起始还建写字楼售价
          profitArea: '',//盈利面积
          profitPrice: '',//盈利售价
          unprofitArea: '',//非盈利面积
          unprofitPrice: '',//非盈利售价
          noSellAssorts: [{
            buildingArea: '',
            textDesc: '',
            buildingType: ''
          }],//不出让配套
          otherAssort: '',//其他配套要求
          ParkingAssort: '',//车位配建要求
          assembleStandard: '',//装配式要求
          afforestStandard: '',//绿色建筑要求
          acquiescenceLandUsage: [],
          landUsage: [],//规划用地性质 select
//          acquiescenceNoSellAssort:'',
          noSellAssort: '',//不出让配套(类型) select

          /*自然条件*/
          riverway: '',//河道水位
          spillway: '',//泄洪道
          tide: '',//潮汐水位
          exploration: '',//初勘文件
          hydrology: '',//水文资料
          safetyAssessment: '',//安评
          /*宗地现状*/
          acquiescenceCurrentBuilding: [],
          currentBuilding: '',//现状建筑物 select
          acquiescenceStatusStructures: [],
          statusStructures: '',//现状构筑物 select
          acquiescenceSmoothness: '',
          smoothness: '',//平整度 select
          acquiescenceLandNature: '',
          landNature: '',//地块性质 select
          /*风险影响*/
          riskEffect: [
            {
              projectId: '',//项目id
              costsEffect: '',//对成本的影响
              incomeEffect: '',//对收入的影响
              rest: '',//其他
              riskDesc: '',//风险描述
              acquiescenceRiskType: '',
              riskType: '',//风险类型 select
            },
          ],
          projectId: '',//项目id
          costsEffect: '',//对成本的影响
          incomeEffect: '',//对收入的影响
          rest: '',//其他
          riskDesc: '',//风险描述
          acquiescenceRiskType: '',
          riskType: '',//风险类型 select
        },


        /*添加的图片列表*/
        picturesRef: [],

        /*是否显示照片管理*/
        isSwitchImgMangagement: false,
        /*存储图片管理中的信息*/
        imgMangagement: [
          {}
        ],
        /*存储图片管理中封面的信息*/
        imgCover: [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ],
        /*存储图片管理中四至的信息*/
        imgFourto: [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ],
        /*存储图片管理中有利因素的信息*/
        imgFavourableFactor: [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ],
        /*存储图片管理中不利因素的信息*/
        imgNegativeFactor: [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ],
        /*存储图片管理中现状的信息*/
        imgActuality: [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ],
        theInitImgData: [],


        radio: 1,
        headers: {platform: 'pc', token: localStorage.getItem('token'), version: '1'},
        nameList: [], // 收集文件名
        transactionWay: []

      }
    },

    updated() {
      if (this.proBusinessInfo.transactionWay && this.transactionWay != this.proBusinessInfo.transactionWay) {
        this.transactionWay = this.proBusinessInfo.transactionWay
        this.theInitImgData = this.cloneObj(this.proBusinessInfo.transactionWay);
        this.initImgComponent(this.theInitImgData);
      }
    },


    mounted() {


    },


    methods: {


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
      initImgComponent(transactionWay) {
        let that = this;
        /*   that.imgCover = [];
           that.imgFourto = [];
           that.imgFavourableFactor = [];
           that.imgNegativeFactor = [];
           that.imgActuality = [];*/
        /*存储图片管理中封面的信息*/
        that.imgCover = [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ];
        /*存储图片管理中四至的信息*/
        that.imgFourto = [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ];
        /*存储图片管理中有利因素的信息*/
        that.imgFavourableFactor = [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ]
        /*存储图片管理中不利因素的信息*/
        that.imgNegativeFactor = [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ];
        /*存储图片管理中现状的信息*/
        that.imgActuality = [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ];

        transactionWay.forEach(it => {
          let picInformation = {
            src: it.picUrl,
            shortSrc: it.picUrl,
            title: it.picText
          };

          it.picTag.forEach(item => {
            if (item == "coverPic") {
              if (that.imgCover[0].src == '') {
                that.imgCover = [picInformation];
              } else {
                that.imgCover.push(picInformation);
              }
            } else if (item == 2) {
              if (that.imgFourto[0].src == '') {
                that.imgFourto = [picInformation];
              } else {
                that.imgFourto.push(picInformation);
              }
            } else if (item == 3) {
              if (that.imgFavourableFactor[0].src == '') {
                that.imgFavourableFactor = [picInformation];
              } else {
                that.imgFavourableFactor.push(picInformation);
              }
            } else if (item == 4) {
              if (that.imgNegativeFactor[0].src == '') {
                that.imgNegativeFactor = [picInformation];
              } else {
                that.imgNegativeFactor.push(picInformation);
              }
            } else if (item == 5) {
              if (that.imgActuality[0].src == '') {
                that.imgActuality = [picInformation];
              } else {
                that.imgActuality.push(picInformation);
              }
            }
          });
        });

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


      /*变量名转换*/
      /*获取向接口提交图片列表*/
      getPicturesRef: function () {
        var that = this;
        this.picturesRef = [];
        if (that.imgCover[0].src != '') {
          this.picturesRef = this.picturesRef.concat(this.imgCover);
        }
        if (that.imgFourto[0].src != '') {
          this.picturesRef = this.picturesRef.concat(this.imgFourto);
        }
        if (that.imgFavourableFactor[0].src != '') {
          this.picturesRef = this.picturesRef.concat(this.imgFavourableFactor);
        }
        if (that.imgNegativeFactor[0].src != '') {
          this.picturesRef = this.picturesRef.concat(this.imgNegativeFactor);
        }
        if (that.imgActuality[0].src != '') {
          this.picturesRef = this.picturesRef.concat(this.imgActuality);
        }

        this.proBusinessInfo.transactionWay = this.picturesRef;
        this.theInitImgData = this.picturesRef;
      },

      /*点击x关闭图片管理弹窗*/
      closeImgMangagement(data) {
        /*每次关闭图片管理弹窗先清空本地存储图片，响应修改*/
        this.imgCover = [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ];
        this.imgFourto = [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ];
        this.imgFavourableFactor = [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ];
        this.imgNegativeFactor = [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ];
        this.imgActuality = [
          {
            src: '',
            title: '',
            shortSrc: '',
          }
        ];

        this.isSwitchImgMangagement = false;
        let that = this;
        /*从本地添加图片，与网络请求获取的图片合并到一起*/
        /*获取1-5数组，分别代表 封面 四至 有利因素 不利因素 现状*/
        /*获取封面中的信息*/

        data[1].picturesRef.forEach(item => {
          let picInformation = this.cloneObj(item);
          picInformation.picText = picInformation.remark;
          if (that.imgCover[0].src == '') {
            that.imgCover = [];
            that.imgCover.push(picInformation);
          } else {
            that.imgCover.push(picInformation);
          }
        });
        data[2].picturesRef.forEach(item => {
          let picInformation = this.cloneObj(item);
          picInformation.picText = picInformation.remark;
          if (that.imgFourto[0].src == '') {
            that.imgFourto = [];
            that.imgFourto.push(picInformation);
          } else {
            that.imgFourto.push(picInformation);
          }
        });
        data[3].picturesRef.forEach(item => {
          let picInformation = this.cloneObj(item);
          picInformation.picText = picInformation.remark;
          if (that.imgFavourableFactor[0].src == '') {
            that.imgFavourableFactor = [];
            that.imgFavourableFactor.push(picInformation);
          } else {
            that.imgFavourableFactor.push(picInformation);
          }
        });
        data[4].picturesRef.forEach(item => {
          let picInformation = this.cloneObj(item);
          picInformation.picText = picInformation.remark;
          if (that.imgNegativeFactor[0].src == '') {
            that.imgNegativeFactor = [];
            that.imgNegativeFactor.push(picInformation);
          } else {
            that.imgNegativeFactor.push(picInformation);
          }
        });
        data[5].picturesRef.forEach(item => {
          let picInformation = this.cloneObj(item);
          picInformation.picText = picInformation.remark;
          if (that.imgActuality[0].src == '') {
            that.imgActuality = [];
            that.imgActuality.push(picInformation);
          } else {
            that.imgActuality.push(picInformation);
          }
        });
        this.getPicturesRef(data);
      },
      /*点击图片管理按钮的时候将图片信息传递给submitImg*/
      transImgMangagement() {
        this.isSwitchImgMangagement = true
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
      padding: 2px 10px 0;
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
