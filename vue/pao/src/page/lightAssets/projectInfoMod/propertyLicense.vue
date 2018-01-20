<template>
  <div id="propertyLicense">

    <div class="topArea">
      <div class="left">产权状况</div>
      <div class="right">
        <el-select v-model="proBusinessInfo.prjcProduceEvidenceStatus" placeholder="请选择">
          <el-option
            v-for="item in options['prjcProduceEvidenceStatus']"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>


    <div class="topArea">
      <div class="left">消防证照状况</div>
      <div class="right">
        <el-select v-model="proBusinessInfo.prjcFireCertificationStatus" placeholder="请选择">
          <el-option
            v-for="item in options['prjcFireCertificationStatus']"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>



    <div class="topArea">
      <div class="left">物业抵押情况</div>
      <div class="right">
        <el-select v-model="proBusinessInfo.prjcPropertyMortgage" placeholder="请选择">
          <el-option
            v-for="item in options['prjcPropertyMortgage']"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>


    <div class="topArea">
      <div class="left">项目是否转租</div>
      <div class="right">
        <el-select v-model="proBusinessInfo.prjcIfSublet" placeholder="请选择">
          <el-option
            v-for="item in options['prjcIfSublet']"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>


    <div class="topArea">
      <div class="left">备注</div>
      <div class="right">
        <div v-if="bShowTip1" class="tipContainer">
          <p class="tipBubble">注：这里描述对产权证照的备注</p>
        </div>
        <div class="textareaBox">
                <textarea @focus="bShowTip1=true" @blur="bShowTip1=false" :disabled="disabled" name="" v-model="proBusinessInfo.prjcIfRemark" class="decision"
                    placeholder="请输入" :maxlength="300"></textarea>
          <span
            class="statistics">{{proBusinessInfo.prjcIfRemark ? proBusinessInfo.prjcIfRemark.length : 0}}/300</span>
        </div>

      </div>

    </div>

    <div class="topArea">
      <div class="left">竣工日期</div>
      <div class="right">
        <el-date-picker
          :disabled="disabled"
          :editable=false
          value-format="yyyy-MM-dd"
          :default-value="proBusinessInfo.prjcCompDate"
          v-model="dateValue"
          type="date"
          placeholder="选择日期时间">
        </el-date-picker>

      </div>

    </div>


  </div>


</template>
<script>


  export default {
    name: 'propertyLicense',
    props: ['title', 'disabled', 'proBusinessInfo', 'options'],
    data() {
      return {
        bShowTip1:false,
        dateValue:this.proBusinessInfo.prjcCompDate,
      }
    },

    updated() {

    },


    mounted() {


    },

    watch: {
      dateValue: function (da) {
        let year = da.getFullYear();
        let month = da.getMonth() + 1;
        let date = da.getDate();
        date = (date + '').length == 1 ? '0' + date : date;
        this.proBusinessInfo.prjcCompDate = [year, month, date].join('-')
      }
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
          paymentTime: "",
          paymentAmount: "",
          paymentTerms: ""

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
        if (response && response.result) {
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
  @import 'common';

  #propertyLicense {
    padding: 10px;
    overflow: auto;

  }


</style>
