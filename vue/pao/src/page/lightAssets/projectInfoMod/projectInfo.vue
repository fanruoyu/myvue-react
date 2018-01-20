<template>
  <div id="projectInfo" v-loading="loadingFlag" element-loading-text="文件上传中,请耐心等待"
       element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.5)">
    <div class="closeNav">
      <p class=" tit fl" :title="childParm.projectName">{{childParm.projectName}}</p>
      <span class="closeButton fr" @click="close">关闭</span>
      <span class="saveButton" @click="saveData" v-if="!disabled">保存</span>
    </div>

    <div id="conMod" v-if="!!proBusinessInfo" class="content">
      <div class="topArea" style="margin-top: 20px;">
        <div class="briefTitle left">简介</div>
        <div class="right">
          <div class="textareaBox">
            <textarea :disabled="disabled" name="" v-model="proBusinessInfo.lightProjectBaseInfo.projectInfo"
                      class="decision"
                      placeholder="请输入" :maxlength="300"></textarea>
            <span
              class="statistics">{{proBusinessInfo.lightProjectBaseInfo.projectInfo.length}}/300</span>
          </div>
        </div>
      </div>

      <div style="clear:both"></div>
      <div class="tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="1">
            <baseInfo ref="baseInfo" @setMark="setMark" :newAddress="newAddress" :proBusinessInfo="proBusinessInfo"
                      :options="options"
                      :disabled="disabled"></baseInfo>
          </el-tab-pane>
          <el-tab-pane label="项目成员" name="2">
            <projectMumber :proBusinessInfo="proBusinessInfo" :disabled="disabled"></projectMumber>
          </el-tab-pane>
          <el-tab-pane label="楼栋基本信息" name="3">
            <buildingBaseInfo ref="buildingBaseInfo" :proBusinessInfo="proBusinessInfo"
                              :disabled="disabled"></buildingBaseInfo>
          </el-tab-pane>

          <el-tab-pane label="产权及证照" name="4">
            <propertyLicense :proBusinessInfo="proBusinessInfo" :options="options"
                             :disabled="disabled"></propertyLicense>
          </el-tab-pane>

          <el-tab-pane label="租赁条件" name="5">
            <rentCondition ref='rentCondition' :proBusinessInfo="proBusinessInfo" :disabled="disabled"></rentCondition>
          </el-tab-pane>

          <el-tab-pane label="项目现状照片" name="6">
            <div style="padding:10px;">
              <!--<el-button class="normalBlueButton" :style="{display: disabled?'none':'',marginBottom:'10px'}"
                         type="primary" @click="transImgMangagement()">图片管理
              </el-button>
              <el-tabs type="border-card" class="tabs">
                <el-tab-pane :label="item.label" v-for="item in imgs">
                  <p v-if="!item.data || item.data.length==0">暂无照片</p>
                  <slide-show :slides="item.data" v-else="false"></slide-show>

                </el-tab-pane>
              </el-tabs>-->
              <swiper-and-upload :dictionaries="dictionaries[0]" :allImgList="submitImgList"
                                 @lightTransmit="lightTransmit"></swiper-and-upload>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其它附件" name="7">
            <div style="padding:2px 10px">
              <p class="tipBubble">注：如有其它附件，请在此上传。</p>
              <businessUpLoadFile :bLight="true" @switchLoading="switchLoading" :disabled="disabled" title=""
                                  :fileObj="proBusinessInfo" fieldName="prjcOtherAttachments"/>
            </div>

          </el-tab-pane>

        </el-tabs>
      </div>
    </div>


  </div>

</template>
<script>

  //import submitImg from '../../../components/pictureView/submitImg.vue'
  import slideShow from '../../../components/pictureView/slideShow.vue'
  //import dialog from '../../../components/pictureView/dialog.vue'
  import businessUpLoadFile from '../../../components/upLoadFileLight.vue'
  import swiperAndUpload from '../../../components/swiperAndUpload'

  import baseInfo from './baseInfo.vue'
  import projectMumber from './projectMumber'
  import buildingBaseInfo from './buildingBaseInfo'
  import propertyLicense from './propertyLicense'
  import rentCondition from './rentCondition.vue'

  import Immutable from 'immutable'
  import axios from 'axios'


  export default {
    name: 'projectInfo',
    props: ['childParm', 'setMark', 'newAddress'],
    components: {
      slideShow,
      swiperAndUpload,
      baseInfo,
      projectMumber,
      buildingBaseInfo,
      propertyLicense,
      rentCondition,
      businessUpLoadFile
    },
    data() {
      return {

        submitImgList:{},
        dictionaries:['prjcStatusPhotos'],

        proBusinessInfoBackUp: null,
        proBusinessInfo: null,

        options: {},
        optionsKeys: ['prjcIfSublet', 'prjcPropertyMortgage', 'prjcFireCertificationStatus', 'prjcProduceEvidenceStatus', 'prjcLocationType', 'prjcContainsForms', 'prjcNatureOfLand', 'prjcHomeUseProperties', 'prjcHillAreaPerc', 'prjcAdverseFactors', 'prjcBuildingStructure', 'prjcStructural', 'prjcPatio', 'prjcFacade', 'prjcFire', 'prjcElevator', 'prjcAir', 'prjcOutsideWindowNeed', 'prjcOutsideWindow', 'prjcExistingDecorate', 'prjcFacadeFitNeed'],

        disabled: false,
        activeName: '6',
        loadingFlag: false

      }
    },

    updated() {
      console.log('n');
    },
    mounted() {
      this.initData();
    },
    created() {
      console.log('merge')
    },
    watch: {},

    methods: {
      lightTransmit(imgList){
        this.submitImgList=imgList
        this.proBusinessInfo.prjcStatusPhotos = this.submitImgList.picList;

        // 注意：提交的时候取imgList.picList值
      },


      //兼容老方法,保留run方法
      run(method) {},

      close() {
        this.cancelDialogue(() => {
          this.$emit('cancelThePage', 1);
        })
      },
      transImgMangagement() {
      },

      /*保存弹窗*/
      thePreservationPopup() {
        this.$message({
          showClose: true,
          message: '恭喜，项目保存成功！',
          type: 'success',
          duration: 3000
        })
      },
      /*关闭本页面*/
      cancelThePage(operation) {
        this.$emit('cancelThePage', operation)
      },

      switchLoading(loadingFlag) {
        this.loadingFlag = loadingFlag
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


      //初始化数据
      initData: function () {
        //this.$emit('openLoading');
        axios.all([
          //取数据
          this.$http.post('/longcity/services/light/v1/lightProject/getMenuDetail', {
            'lightProjectId': this.childParm.id || 1,
            'titleKey': [
              'prjConditions'
            ]
          }),
          //取字典
          this.$http({
            method: 'post',
            url: '/longcity/services/v1/dict/dictListByType',
            //轻资产字段信息2017年12月2日.xlsx
            data: {'dictTypes': this.optionsKeys},
          })])
          .then(axios.spread((p1, p2) => {
            this.$emit('closeLoading');
            if (p1 && p1.status == 200 && p2 && p2.status == 200) {
              if (p1.data && p1.data.result && p1.data.result.prjConditions) {
                let proBusinessInfo = p1.data.result.prjConditions;
                this.proBusinessInfoBackUp = Immutable.Map(this.cloneObj(proBusinessInfo))
                this.proBusinessInfo = proBusinessInfo;
              }
              if (p2.data && p2.data.result && p2.data.result && p2.data.result[0].dictType) {
                for (let it of p2.data.result) {
                  this.options[it.dictType] = it.items
                }
              }

              this.submitImgList = this.proBusinessInfo.prjcStatusPhotos

              //设置panel高度
              this.$nextTick(() => {
                this.setConHeight();
              })
            } else {
              console.log("获取数据信息错误")
            }
          }))
      },

      //检测子组件中是否有验证错误，如果有错误的话，返回第一条错误提示内容
      checkValiade() {
        let refs = ['baseInfo', 'buildingBaseInfo', 'rentCondition']
        let helps
        for (let ref of refs) {
          let ers = this.$refs[ref].errors
          if (ers && ers.any()) {
            helps = this.$refs[ref].$el.querySelectorAll('.help')
            for (let help of helps) {
              //如果验证提示有可见的部分，则返回提示内容
              if (help.style.display == '') {
                return help.dataset.location + ' ' + help.innerHTML
              }
            }
          }
        }
        return false
      },

      //保存数据
      saveData: function () {
        let checkValiade = this.checkValiade()
        if (checkValiade) {
          //如果有错误，提示错误
          this.$message({
            showClose: true,
            message: checkValiade,
            type: 'error',
            duration: 3000,
          })
          return
        } else {
          //编辑状态并且数据有有变化才执行保存
          //if (this.childParm.modAuth == 2 && !Immutable.is(this.proBusinessInfoBackUp, Immutable.Map(this.proBusinessInfo))) {
          if (!Immutable.is(this.proBusinessInfoBackUp, Immutable.Map(this.proBusinessInfo))) {
            let that = this
            //成员保存时，只保存用户码
            this.proBusinessInfo.stackholders = this.proBusinessInfo.stackholders.map(item => {
              return item.userCode
            });

            /*let keys = ['buildingNo', 'rentFloors', 'overgroundFloors', 'undergroundFloors', 'floorHeightInfo', 'deviceFloorInfo', 'refugeFloorInfo'];
            this.proBusinessInfo.prjcBuildingBasicInfor = this.proBusinessInfo.stackholders.filter(item => {
              let flag = true;
              for (n of keys) {
                if (!item[n]) {
                  flag = false;
                  break;
                }
              }
              return flag;
            });*/

            this.$http({
              method: 'post',
              url: '/longcity/services/light/v1/lightProject/saveLightPrjConditions',
              data: {
                'lightProjectId': this.childParm.id,
                'title': 'prjConditions',
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
        }
      },

    }
  }

</script>
<style scoped lang="less">
  @import "common";

  #conMod {
    width: 100%;
    overflow: auto;
  }

  #projectInfo {
    display: block;
    position: relative;

    .el-tabs__header {
      margin: 0;
    }

    /*气泡矩形*/
    .ract {
      box-sizing: border-box;
      padding: 5px;
      width: 100%;
      /*ui样式*/
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #589FF2;
      letter-spacing: 0;
      line-height: 18px;

      background: #EEF6FF;
      border-radius: 2px 2px 2px 0;
    }

    .content {
      width: 100%;

      .briefTitle {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #666666;
        letter-spacing: 0;
      }

      .tab {
        clear: both;
      }

    }

  }


</style>
