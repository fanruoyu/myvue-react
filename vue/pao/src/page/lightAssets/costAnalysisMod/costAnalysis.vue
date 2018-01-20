<template>
  <!--成本分析-->
  <div id="costAnalysis">
    <transition name="fade" mode="out-in">
      <div class="closeNav">
        <!--<p class=" tit fl" title="">{{childParm.projectName}}</p>-->
        <p class=" tit fl" title="">{{childParm.projectName}}</p>
        <div>
          <span class="closeButton fl" @click="close">关闭</span>
          <span class="saveButton" @click="save" v-if="childParm.modAuth==2">保存</span>
        </div>
      </div>
    </transition>
    <div class="costAnalysisContent" id="conMod">
      <div class="titleAndContent">
        <span class="name width16">简介</span>
        <textarea class="textBox width77" :disabled='childParm.modAut==2' v-model="costAnalysis.constanaInfor" placeholder="请输入简介" maxlength="300"></textarea>
        <span class="statisticsNum">{{costAnalysis.constanaInfor==undefined?0:costAnalysis.constanaInfor.length}}/300</span>
      </div>
      <p class="title">成本评价指标</p>
      <div class="allInputBox">
        <div class="everyIndividual">
          <span class="text">总建造成本</span><input type="text" :disabled='childParm.modAut==2' class="inputs" v-model="costAnalysis.constanaTotalCost" placeholder="请输入"><em>元</em>
          <span class="errHint" v-if="costAnalysis.constanaTotalCost!=undefined&&costAnalysis.constanaTotalCost!=''&&!reg2.test(costAnalysis.constanaTotalCost)||costAnalysis.constanaTotalCost>10000000000">请输入0-10000000000之间的整数或两位小数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">单方成本</span><input type="text" :disabled='childParm.modAut==2' class="inputs" v-model="costAnalysis.constanaUnilateralCost" placeholder="请输入"><em>元/平米</em>
          <span class="errHint" v-if="costAnalysis.constanaUnilateralCost!=undefined&&costAnalysis.constanaUnilateralCost!=''&&!reg.test(costAnalysis.constanaUnilateralCost)||costAnalysis.constanaUnilateralCost>1000000">请输入0-1000000之间的整数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">一展空间建造成本</span><input type="text" :disabled='childParm.modAut==2' class="inputs" v-model="costAnalysis.constanaFirstSpaceCost"  placeholder="请输入"><em>元</em>
          <span class="errHint" v-if="costAnalysis.constanaFirstSpaceCost!=undefined&&costAnalysis.constanaFirstSpaceCost!=''&&!reg2.test(costAnalysis.constanaFirstSpaceCost)||costAnalysis.constanaFirstSpaceCost>10000000000">请输入0-10000000000之间的整数或两位小数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">一展空间单方成本</span><input type="text" :disabled='childParm.modAut==2' class="inputs" v-model="costAnalysis.constanaFirstSquareCost"  placeholder="请输入"><em>元/平米</em>
          <span class="errHint" v-if="costAnalysis.constanaFirstSquareCost!=undefined&&costAnalysis.constanaFirstSquareCost!=''&&!reg.test(costAnalysis.constanaFirstSquareCost)||costAnalysis.constanaFirstSquareCost>1000000">请输入0-1000000之间的整数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">冠寓单间成本</span><input type="text" :disabled='childParm.modAut==2' class="inputs" v-model="costAnalysis.constanaSingleRoomCost"  placeholder="请输入"><em>元/间</em>
          <span class="errHint" v-if="costAnalysis.constanaSingleRoomCost!=undefined&&costAnalysis.constanaSingleRoomCost!=''&&!reg.test(costAnalysis.constanaSingleRoomCost)||costAnalysis.constanaSingleRoomCost>1000000">请输入0-1000000之间的整数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">改造成本</span><input type="text" :disabled='childParm.modAut==2' class="inputs" v-model="costAnalysis.constanaModificationCost"  placeholder="请输入"><em>元/平米</em>
          <span class="errHint" v-if="costAnalysis.constanaModificationCost!=undefined&&costAnalysis.constanaModificationCost!=''&&!reg.test(costAnalysis.constanaModificationCost)||costAnalysis.constanaModificationCost>1000000">请输入0-1000000之间的整数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">户内硬装成本</span><input type="text" :disabled='childParm.modAut==2' class="inputs" v-model="costAnalysis.constanaIndoorHardCost"  placeholder="请输入"><em>元/平米</em>
          <span class="errHint" v-if="costAnalysis.constanaIndoorHardCost!=undefined&&costAnalysis.constanaIndoorHardCost!=''&&!reg.test(costAnalysis.constanaIndoorHardCost)||costAnalysis.constanaIndoorHardCost>1000000">请输入0-1000000之间的整数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">户内家具成本</span><input type="text" :disabled='childParm.modAut==2' class="inputs" v-model="costAnalysis.constanaFurnitureCost"  placeholder="请输入"><em>元/平米</em>
          <span class="errHint" v-if="costAnalysis.constanaFurnitureCost!=undefined&&costAnalysis.constanaFurnitureCost!=''&&!reg.test(costAnalysis.constanaFurnitureCost)||costAnalysis.constanaFurnitureCost>1000000">请输入0-1000000之间的整数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">户内家电成本</span><input type="text" :disabled='childParm.modAut==2' class="inputs" v-model="costAnalysis.constanaApplianceCost" placeholder="请输入"><em>元/间</em>
          <span class="errHint" v-if="costAnalysis.constanaApplianceCost!=undefined&&costAnalysis.constanaApplianceCost!=''&&!reg.test(costAnalysis.constanaApplianceCost)||costAnalysis.constanaApplianceCost>1000000">请输入0-1000000之间的整数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">公共活动区软硬装成本</span><input type="text" :disabled='childParm.modAut==2' class="inputs" v-model="costAnalysis.constanaPubHardSoftCost" placeholder="请输入"><em>元/平米</em>
          <span class="errHint" v-if="costAnalysis.constanaPubHardSoftCost!=undefined&&costAnalysis.constanaPubHardSoftCost!=''&&!reg.test(costAnalysis.constanaPubHardSoftCost)||costAnalysis.constanaPubHardSoftCost>1000000">请输入0-1000000之间的整数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">冠寓建造成本</span><input type="text" :disabled='childParm.modAut==2' class="inputs" v-model="costAnalysis.constanaConstructionCost" placeholder="请输入"><em>元/平米</em>
          <span class="errHint" v-if="costAnalysis.constanaConstructionCost!=undefined&&costAnalysis.constanaConstructionCost!=''&&!reg2.test(costAnalysis.constanaConstructionCost)||costAnalysis.constanaConstructionCost>10000000000">请输入0-10000000000之间的整数或两位小数。</span>
        </div>
        <div class="everyIndividual">
          <span class="text">承租合同总产权面积</span><input type="text" :disabled='childParm.modAut==2' class="inputs" v-model="costAnalysis.constanaProdpositLeaseArea" placeholder="请输入"><em>元/平米</em>
          <span class="errHint" v-if="costAnalysis.constanaProdpositLeaseArea!=undefined&&costAnalysis.constanaProdpositLeaseArea!=''&&!reg2.test(costAnalysis.constanaProdpositLeaseArea)||costAnalysis.constanaProdpositLeaseArea>1000000">请输入0-1000000之间的整数或两位小数。</span>
        </div>
        <div class="everyIndividual width100">
          <span class="text width46">标准层公共区域(含一层过道电梯厅)软硬装成本</span><input type="text" :disabled='childParm.modAut==2' class="inputs width15" v-model="costAnalysis.constana1stPubHardSoftCost" placeholder="请输入"><em>元/平米</em>
          <span class="errHint right30" v-if="costAnalysis.constana1stPubHardSoftCost!=undefined&&costAnalysis.constana1stPubHardSoftCost!=''&&!reg.test(costAnalysis.constana1stPubHardSoftCost)||costAnalysis.constana1stPubHardSoftCost>1000000">请输入0-1000000之间的整数。</span>
        </div>
      </div>
      <upload-attachments :allOtherFile="costAnalysis.constanaCostAttachment">
        <span slot="title"><b>成本详细测算附件</b></span>
      </upload-attachments>
      <upload-attachments :allOtherFile="costAnalysis.constanaOtherAttachments">
        <span slot="title"><b>其他附件</b><em style="margin-left:3em">注：如有其他附件，请在此上传</em></span>
      </upload-attachments>
      <!--<upload-much-img></upload-much-img>-->
      <!--<swiper-and-upload :dictionaries="dictionaries[1]" :allImgList="submitImgList" @lightTransmit="lightTransmit"></swiper-and-upload>-->
      <!--页面：{{submitImgList}}-->

    </div>
    <!--提示-->
    <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
  </div>
</template>

<script>
  import uploadAttachments from '../../../components/uploadAttachments'
//  import uploadMuchImg from '../../../components/uploadMuchImg'
  //import swiperAndUpload from '../../../components/swiperAndUpload'
  export default {
    name: '',
    components: {
      uploadAttachments,
      //swiperAndUpload
//      uploadMuchImg
    },
    data () {
      return {
        //submitImgList:{picList:[]},
        //dictionaries:['project_image_type'],
        //dictionaries:['running_sub_type', 'standard', 'hotel_rating', 'product_positioning', 'running_type_choose', 'customer_choose'],
        hintIsShow: false, // 提示消息显示隐藏
        costAnalysis: { constanaCostAttachment: [], constanaOtherAttachments: [] }, // 成本分析类目
        reg2: /^\d+(\.\d{1,2})?$/, // 正则校验 :正整数,保留2位小数
        reg: /^[0-9]*$/ // 正则校验 :正整数
      }
    },
    methods: {
      lightTransmit(imgList){
        this.submitImgList=imgList
        // 注意：提交的时候取imgList.picList值
      },
      // 获取数据
      loadings (id) {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/light/v1/lightProject/getMenuDetail',
          data: {lightProjectId: that.childParm.id, titleKey: ['costAnalysis']}
        }).then(function (succeed) {
          // console.log(succeed.data.result)
          that.costAnalysis = succeed.data.result.costAnalysis
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
        let costAnalysis = this.costAnalysis
        let hintText = '请输入正确的'
        if (!this.reg2.test(costAnalysis.constanaTotalCost) && costAnalysis.constanaTotalCost !== '' || costAnalysis.constanaTotalCost > 10000000000) {
          this.hint(hintText + '总建造成本!')
          return
        }
        if (!this.reg.test(costAnalysis.constanaUnilateralCost) && costAnalysis.constanaUnilateralCost !== '' || costAnalysis.constanaUnilateralCost > 1000000) {
          this.hint(hintText + '单方成本!')
          return
        }
        if (!this.reg2.test(costAnalysis.constanaFirstSpaceCost) && costAnalysis.constanaFirstSpaceCost !== '' || costAnalysis.constanaFirstSpaceCost > 10000000000) {
          this.hint(hintText + '一展空间建造成本!')
          return
        }
        if (!this.reg.test(costAnalysis.constanaFirstSquareCost) && costAnalysis.constanaFirstSquareCost !== '' || costAnalysis.constanaFirstSquareCost > 1000000) {
          this.hint(hintText + '一展空间单方成本!')
          return
        }
        if (!this.reg.test(costAnalysis.constanaSingleRoomCost) && costAnalysis.constanaSingleRoomCost !== '' || costAnalysis.constanaSingleRoomCost > 1000000) {
          this.hint(hintText + '冠寓单间成本!')
          return
        }
        if (!this.reg.test(costAnalysis.constanaModificationCost) && costAnalysis.constanaModificationCost !== '' || costAnalysis.constanaModificationCost > 1000000) {
          this.hint(hintText + '改造成本!')
          return
        }
        if (!this.reg.test(costAnalysis.constanaIndoorHardCost) && costAnalysis.constanaIndoorHardCost !== '' || costAnalysis.constanaIndoorHardCost > 1000000) {
          this.hint(hintText + '户内硬装成本!')
          return
        }
        if (!this.reg.test(costAnalysis.constanaFurnitureCost) && costAnalysis.constanaFurnitureCost !== '' || costAnalysis.constanaFurnitureCost > 1000000) {
          this.hint(hintText + '户内家具成本!')
          return
        }
        if (!this.reg.test(costAnalysis.constanaApplianceCost) && costAnalysis.constanaApplianceCost !== '' || costAnalysis.constanaApplianceCost > 1000000) {
          this.hint(hintText + '户内家电成本!')
          return
        }
        if (!this.reg.test(costAnalysis.constanaPubHardSoftCost) && costAnalysis.constanaPubHardSoftCost !== '' || costAnalysis.constanaPubHardSoftCost > 1000000) {
          this.hint(hintText + '公共活动区软硬装成本!')
          return
        }
        if (!this.reg2.test(costAnalysis.constanaConstructionCost) && costAnalysis.constanaConstructionCost !== '' || costAnalysis.constanaConstructionCost > 10000000000) {
          this.hint(hintText + '冠寓建造成本!')
          return
        }
        if (!this.reg2.test(costAnalysis.constanaProdpositLeaseArea) && costAnalysis.constanaProdpositLeaseArea !== '' || costAnalysis.constanaProdpositLeaseArea > 1000000) {
          this.hint(hintText + '承租合同总产权面积!')
          return
        }
        if (!this.reg.test(costAnalysis.constana1stPubHardSoftCost) && costAnalysis.constana1stPubHardSoftCost !== '' || costAnalysis.constana1stPubHardSoftCost > 1000000) {
          this.hint(hintText + '标准层公共区域(含一层过道电梯厅)软硬装成本!')
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
          data: {lightProjectId: that.childParm.id, title: 'costAnalysis', detail: that.costAnalysis}
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
  #costAnalysis{width:100%;}
  #costAnalysis{
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #999;}
    textarea{resize:none;overflow-y:auto;border-radius:4px;border:1px solid #ddd;}
    textarea:focus,input:focus{border-color:#20a0ff}
    .costAnalysisContent{padding:0 2%;width:96%;}
    .costAnalysisContent{
      .titleAndContent,.describeBox{width:100%;position:relative;overflow:hidden;margin-bottom:10px;margin-top:20px;}
      .name{float:left;width:7em;display:block;}
      .textBox{width:81%;padding:2%;height:90px;}
      .statisticsNum{position:absolute;right:6.5%;bottom:10px;}

      .allInputBox{width:85%;overflow:hidden;margin-left:7em;border:1px solid #ddd;border-radius:4px;}
      .allInputBox{
        .everyIndividual{width:45%;float:left;line-height:30px;padding:10px 0;position:relative}
        .everyIndividual:nth-child(2n){width:55%}
        .everyIndividual{
          .text{width:40%;display: inline-block;text-indent:4px;}
          .inputs{height:28px;line-height:24px;margin:0 10px;padding-left:10px;width:32%;}
          .width46{width:46%;}
          .width15{width:15%;}
          .errHint{position:absolute;right:10%;bottom:-7px;color:red;font-size:12px;height:14px;line-height:14px;width:90%;text-align:right;}
          .right30{right: 30%;width: 70%;bottom:2px}
        }
        .everyIndividual:nth-child(2n){
          .text{width:41%;}
          .widthAt{width:auto};
        }
        .width100{width:100%;padding-bottom:20px;}
      }
    }
  }
</style>
