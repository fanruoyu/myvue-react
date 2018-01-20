<template>
  <div id="marketCustomerAnalysis">
    <div class="closeNav">
      <p class=" tit fl">{{childParm.projectName}}</p>
      <!--<p class=" tit fl">市场及客户分析</p>-->
      <div v-if="btnNone==true">
        <span class="closeButton fl" @click="close">关闭</span>
        <span class="saveButton fl" @click="subMarketCustomerAnalysis">保存</span>
      </div>
      <div v-else="btnNone==false">
        <span class="closeButton fr" @click="close">关闭</span>
      </div>
    </div>
    <div id="conMod">
      <div class="main">
        <el-row justify="center">
          <!--<el-col :span="24"><div class="grid-content bg-purple-dark">sssssssssssss</div></el-col>-->
          <el-col :span="24">
              <el-form  status-icon  label-width="100px" class="demo-ruleForm form" >
                  <header>
                    <p class="primaryTitle">简介</p>
                    <el-form-item label="" prop=""  >
                      <section class="textInput">
                        <el-input
                          :disabled="disabledFlag"
                          :maxlength="140"
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"
                          v-model="MarketCustomer.marketcusInfor">
                        </el-input>
                        <span class="statistics">{{MarketCustomer.marketcusInfor.length}}/{{140}}</span>
                     </section>
                    </el-form-item>
                  </header>
                  <hr class="primaryTitleHr">
                  <article>
                    <p class="primaryTitle">市场及客户分析</p>
                    <section>
                      <el-form-item label="" prop=""  >1111111111111</el-form-item>
                    </section>
                  </article>
                  <hr class="primaryTitleHr">
                  <article>
                    <p class="primaryTitle">竞品分析</p>
                    <section>
                      <el-form-item label="" prop=""  >2222222222222</el-form-item>
                    </section>
                    <section>
                      <el-form-item label="竞品描述" prop=""  >
                        <section class="uploadAttachments">
                          <div style="clear: both;height:40px;margin-top: 5px; ">
                            <el-button v-if="btnNone" size="small" type="primary"  class="btn" ><a target="_Blank" :href='MarketCustomer.marketcusCompetingAttaTemp'>下载竞品描述模板</a></el-button>
                            <el-upload style="float:right;"
                                       class="upload-demo"
                                       :action="url"
                                       :headers="headers"
                                       :on-success="success01"
                                       multiple
                                       :limit="3"
                                       :show-file-list="false"
                                       :before-upload="beforeAvatarUpload"
                                       :data="fileData5"
                            >
                              <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                            </el-upload>
                          </div>
                          <hr class="primaryTitleHr" >
                          <table  border="0" class="table">
                            <tr class="hang">
                              <th>附件名称</th>
                              <th>文件大小</th>
                              <th>权限</th>
                              <th>操作</th>
                            </tr>
                            <tr v-for="(item,index) in MarketCustomer.marketcusCompetingAttachment">
                              <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>
                              <td>{{item.fileSize}}</td>
                              <td>
                                <el-select  v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                  <el-option
                                    :disabled="disabledFlag"
                                    v-for="item in privacy01"
                                    :key="item.dictName"
                                    :label="item.dictName"
                                    :value="item.dictCode">
                                  </el-option>
                                </el-select>
                              </td>
                              <td @click="deleteAvatarUpload01(index)" v-if="btnNone">删除</td>
                            </tr>
                          </table>
                        </section>
                      </el-form-item>
                      <el-form-item label="" prop=""  >
                        <p v-if="isShowBubble===1" class="ract1 LeftBubble">注：项目周边竞品：主要参考长租公寓和普租住宅一居室，其次参考合租主卧、酒店式公寓，备注距离项目距离、主力户型面积、租金、年代、品质</p>
                        <section class="textInput">
                          <el-input
                            @focus="showAirBubbles(1)"
                            @blur="hideAirBubbles(1)"
                            :disabled="disabledFlag"
                            :maxlength="140"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="MarketCustomer.marketcusCompetingDesc">
                          </el-input>
                          <span class="statistics">{{MarketCustomer.marketcusCompetingDesc.length}}/{{140}}</span>
                        </section>
                      </el-form-item >
                      <el-form-item label="冠寓产品策略" prop=""  >
                        <p v-if="isShowBubble===2" class="ract LeftBubble">注：如包物业费、网费等</p>
                        <section class="textInput">
                          <el-input
                            @focus="showAirBubbles(2)"
                            @blur="hideAirBubbles(2)"
                            :disabled="disabledFlag"
                            :maxlength="140"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="MarketCustomer.marketcusProductStrategy">
                          </el-input>
                          <span class="statistics">{{MarketCustomer.marketcusProductStrategy.length}}/{{140}}</span>
                        </section>
                      </el-form-item>
                    </section>
                  </article>
                  <hr class="primaryTitleHr">
                  <article>
                    <p class="primaryTitle">租金测算-价格对标</p>
                    <el-form-item label="租金定价逻辑" prop=""  >
                      <p v-if="isShowBubble===3" class="ract LeftBubble">注：如包物业费、网费等</p>
                      <section class="textInput">
                        <el-input
                          @focus="showAirBubbles(3)"
                          @blur="hideAirBubbles(3)"
                          :disabled="disabledFlag"
                          :maxlength="140"
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"
                          v-model="MarketCustomer.marketcusRentPrice">
                        </el-input>
                        <span class="statistics">{{MarketCustomer.marketcusRentPrice.length}}/{{140}}</span>
                      </section>
                    </el-form-item>
                    <section>
                      <p>不含在租金内的其他费用</p>
                      <el-form-item label="" prop=""  >
                        <p v-if="isShowBubble===4" class="ract LeftBubble" >注：给出冠寓产品均价建议，并给出推导逻辑</p>
                        <section class="textInput">
                          <el-input
                            @focus="showAirBubbles(4)"
                            @blur="hideAirBubbles(4)"
                            :disabled="disabledFlag"
                            :maxlength="140"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="MarketCustomer.marketcusContainsNoOtherFees">
                          </el-input>
                          <span class="statistics">{{MarketCustomer.marketcusContainsNoOtherFees.length}}/{{140}}</span>
                        </section>
                      </el-form-item>
                    </section>
                  </article>
                  <hr class="primaryTitleHr">
                  <footer class="footer">
                    <p class="primaryTitle">其他附件</p>
                    <el-form-item label="" prop=""  >
                      <section class="uploadAttachments">

                        <div style="clear: both;height:40px;margin-top: 5px; ">
                          <el-upload style="float:left;"
                                     class="upload-demo"
                                     :action="url"
                                     :headers="headers"
                                     :on-success="success02"
                                     multiple
                                     :limit="3"
                                     :show-file-list="false"
                                     :before-upload="beforeAvatarUpload"
                                     :data="fileData5"
                          >
                            <div>
                              <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                              <p style="float: right;margin-left: 15px;">注：如有其他附件，请在此上传</p>
                            </div>
                          </el-upload>
                        </div>
                        <hr class="primaryTitleHr">
                        <table  border="0" class="table">
                          <tr class="hang">
                            <th>附件名称</th>
                            <th>文件大小</th>
                            <th>权限</th>
                            <th>操作</th>
                          </tr>
                          <tr v-for="(item,index) in MarketCustomer.marketcusOtherAttachments">
                            <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>
                            <td>{{item.fileSize}}</td>
                            <td>
                              <el-select  v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                <el-option
                                  :disabled="disabledFlag"
                                  v-for="item in privacy02"
                                  :key="item.dictName"
                                  :label="item.dictName"
                                  :value="item.dictCode">
                                </el-option>
                              </el-select>
                            </td>
                            <td @click="deleteAvatarUpload02(index)" v-if="btnNone">删除</td>
                          </tr>
                        </table>
                      </section>
                    </el-form-item>
                  </footer>
              </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'marketCustomerAnalysis',
    data () {
      return {
        fileData5: {
          file: '',
          light: 'light'
        },
        disabledFlag:false,     //disabled 可编辑
        proInformation:{
          /*变量初始化，与接口获取变量名称保持一致*/
          id:'',
        },
        btnNone: true,          //true 显示
        test:'',
        isShowBubble:'',         //是否显示bubble
        url: this.$baseUrl+'/longcity/services/v1/upload/single', //附件上url
        headers: {platform: 'pc', token: localStorage.getItem('token'), version: '1'},
        privacy01: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        privacy02: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        MarketCustomer:{
          marketcusInfor:'',//市场客户简介
          marketcusPic:[],//市场客户图片（图片列表保存修改结构）
          marketcusCompetingPic:[],//竞品分析图片（图片列表保存修改结构）
          marketcusCompetingAttaTemp:'',//竞品描述附件模板
          marketcusCompetingAttachment:[],//竞品描述附件(文件列表保存修改结构）
          marketcusCompetingDesc:'',//竞品描述
          marketcusProductStrategy:'',//冠寓产品策略
          marketcusRentPrice:'',//租金定价
          marketcusContainsNoOtherFees:'',//不含在租金内的其他费用
          marketcusOtherAttachments:[]//市场客户分析其他附件(文件列表保存修改结构）
    },
    }
    },
    props: {
      childParm: Object
    },
    mounted(){
      this.accessMarketCustomerAnalysis();
      this.isEdit();
    },
    methods: {
      isEdit(){
        /*
         **childParm.modAuth==2 可编辑
         **childParm.modAuth==1 可读
         */
        if(this.childParm.modAuth==2 || this.childParm.modAuth=="2"){
          this.btnNone=true;
          this.disabledFlag=false;
        }else if(this.childParm.modAuth==1 || this.childParm.modAuth=="1"){
          this.btnNone=false;
          this.disabledFlag=true;
        }
      },
      close () {
        var that = this;
        this.cancelDialogue(function () {
          that.$emit('cancelThePage', 1);
        });
      },// 关闭函数
      showAirBubbles(value){
          this.isShowBubble=value;
      },//聚焦
      hideAirBubbles(value){
        this.isShowBubble='';
      },//失焦
      // 附件上传前的钩子函数;判断附件名称;大小等
      beforeAvatarUpload (file) {

        var isM = file.size / 1024 / 1024
        if (isM > this.M) {
          this.$message({
            showClose: true,
            message:'上传附件过大,最大为' + this.M + 'M!',
            type: 'success',
            duration:3000,
          });
          return false
        }
      },
      // 附件上传成功函数;element-ui提供方法;成功后将对应的值进行处理展示;方便上传
      /*人防规定原文*/
      success01(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0;
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.MarketCustomer.marketcusCompetingAttachment.unshift(response.result[i])
        }
//         console.log(response, file, fileList)
      },
      success02(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0;
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.MarketCustomer.marketcusOtherAttachments.unshift(response.result[i])
        }
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload01(index){
        this.MarketCustomer.marketcusCompetingAttachment.splice(index,1);
      },      //删除选中的附件
      deleteAvatarUpload02(index){
        this.MarketCustomer.marketcusOtherAttachments.splice(index,1);
      },      //删除选中的附件
      run(fun,parm,obj){
        if(fun=="getId"){
          this.getId(parm,obj);
        }else if(fun=="getPosition"){
          this.getPosition(parm);
        }else if(fun="getPoints"){
          this.getPoints(parm,obj);
        }
      },
      /*从轻资产Management获取页面ID*/
      getId(str,obj){
        this.proInformation.id=parseInt(str);
//        this.childParm.modAuth=obj;
//        this.isEdit();
      },
      /*保存弹窗*/
      thePreservationPopup(){
        this.$message({
          showClose: true,
          message: '恭喜，项目保存成功！',
          type: 'success',
          duration:3000,
        });
        this.cancelThePage(2);
      },
      /*关闭本页面*/
      cancelThePage(operation){
        this.$emit('cancelThePage',operation);
        this.dataInitialization();
      },
      /*通过接口获取数据*/
      accessMarketCustomerAnalysis:function (obj) {
        var that = this;
        this.$http({
          method:'post',
          url:'/longcity/services/light/v1/lightProject/getMenuDetail',
          data:{
            "lightProjectId":that.childParm.id,
            "titleKey":[//菜单对应的titleKEY
//              "LocAndSupp",//区位及配套
              "MarketCustomer",//市场及客户分析
            ]//一级类目字段名,支持多查
          },
        }).then(function (succeed) {
          that.MarketCustomer=succeed.data.result.MarketCustomer;
        },function (err) {
          console.log(err);
        })
      },
      /*通过接口提交数据*/
      subMarketCustomerAnalysis:function (obj) {
        var that = this;
        this.$http({
          method:'post',
          url:'/longcity/services/light/v1/lightProject/saveLightPrjConditions',
          data:{
            "lightProjectId":that.childParm.id,
            "title"://菜单对应的titleKEY
//              "LocAndSupp",//区位及配套
              "MarketCustomer"//市场及客户分析
            ,//一级类目字段名,支持多查
            "detail":that.MarketCustomer,
          },
        }).then(function (succeed) {
          if(succeed.data.code==200 || succeed.data.code=="200"){
            that.thePreservationPopup();
          }else{
            that.$message({
              showClose: true,
              message: '保存失败！',
              type: 'success',
              duration:3000,
            });
          }
          that.MarketCustomer=succeed.data.result.MarketCustomer;
        },function (err) {
          console.log(err);
        })
      },
    }
  }
</script>
<style lang="less">
  @import "../../../assets/css/common.css";
  @import "../../../assets/css/base.css";
  #marketCustomerAnalysis {
      /*栅格*/
      .el-col {
        border-radius: 4px;
      }
      .bg-purple-dark {
        background: #99a9bf;
      }
      .bg-purple {
        background: #d3dce6;
      }
      .bg-purple-light {
        background: #e5e9f2;
      }
      .grid-content {
        border-radius: 4px;
        min-height: 36px;
      }
      .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
      }
      /*栅格结束*/
  }
  #marketCustomerAnalysis .main {
    padding: 20px 3%;
    width: 94%;
    height: auto;
  }
  #marketCustomerAnalysis .textInput {
    /*height: 100%;*/
    margin-top: 15px;
  }
  #marketCustomerAnalysis .el-textarea__inner {
    height: 90px;
    resize:none
  }
  /*textarea字数统计*/
  #marketCustomerAnalysis  .statistics {
    position: absolute;
    right: 28px;
    bottom: 15px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #CCCCCC;
    letter-spacing: 0;
    line-height: 14px;
  }
  /*上传附件*/
  #marketCustomerAnalysis .uploadAttachments .btn:before {
    content: "";
    background: url('../../../assets/images/add.png') no-repeat;
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

  #marketCustomerAnalysis .uploadAttachments .btn {
    background-color: #67649F;
    border-color: #67649F;
    line-height: 1;
    cursor: pointer;
    padding: 10px 15px 10px 5px;
    border-radius: 4px;
    position: relative;
    margin-bottom: 10px;
  }
  #marketCustomerAnalysis .uploadAttachments {
    margin: 10px 0 0px 0;
  }

  #marketCustomerAnalysis .uploadAttachments table {
    width: 100%;
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-color: #999999;
    border-collapse: collapse;
    text-align: center;
  }

  #marketCustomerAnalysis .uploadAttachments table th {
    background: #E2E2ED;
    border: 0.5px solid #DDDDDD;
    color:#67649F;

  }
  #marketCustomerAnalysis .uploadAttachments table th span{

  }
  #marketCustomerAnalysis  .uploadAttachments table th {
    width: 15%;
  }

  #marketCustomerAnalysis .uploadAttachments table th:nth-of-type(1) {
    line-height: 10px;
    width: 55%;
    white-space: nowrap;
  }

  #marketCustomerAnalysis .uploadAttachments table tr {
    line-height: 1px;
  }

  #marketCustomerAnalysis .uploadAttachments table .hang {
    line-height: 30px;
  }

  #marketCustomerAnalysis .uploadAttachments table tr td {
    width: 140px;
  }
  #marketCustomerAnalysis .uploadAttachments table tr th:nth-of-type(1) {
    text-align: left;
    padding-left: 15px;
  }
  #marketCustomerAnalysis .uploadAttachments table tr td:nth-of-type(1) {
    line-height: 10px;
    width: 400px;
    white-space: nowrap;
    text-align: left;
  }

  #marketCustomerAnalysis .uploadAttachments table td {
    border: 0.5px solid #DDDDDD;
    padding: 8px;
    background-color: #ffffff;
  }
  /*上传附件*/
  #marketCustomerAnalysis .primaryTitle{
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #666666;
    letter-spacing: 0;
    line-height: 16px;
    font-weight:bold;
  }
  #marketCustomerAnalysis .primaryTitleHr{
    border: 0.5px solid #DDDDDD;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  #marketCustomerAnalysis .el-form-item__label{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 14px;
  }
  /*左三角气泡*/
  .LeftBubble:after{
    content:"";
    position:absolute;
    bottom:-10px;
    left:0;
    border:10px solid transparent;
    border-top-color:#EEF6FF;
    border-bottom:0;
    border-left:0;
  }
  /*气泡矩形*/
  .ract{
    position:absolute;
    box-sizing: border-box;
    left: 0px;
    top: -15px;
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
  .ract1{
    position:absolute;
    box-sizing: border-box;
    left: 0px;
    top: -42px;
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
  .footer {
    margin-bottom: 80px;
  }
</style>
