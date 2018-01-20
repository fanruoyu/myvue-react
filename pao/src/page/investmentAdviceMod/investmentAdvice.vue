<template>
  <div id="productInfo">
          <div class="closeNav" ref="closeNav">
            <p class=" tit fl" title="childParm.projectName">{{childParm.projectName}}</p>
            <span class="closeButton fl" @click="theCancelPopup">关闭</span>
            <span class="saveButton" @click="verify" v-show="btnNone" :plain="true">保存</span>
          </div>
          <div id="conMod">
          <div class="investmentAdvice-body">
              <div class="marketBidding">
                <el-col :span="23">
                  <div class="marketBidding-title">
                    <p style="margin-left:10px;">投资建议</p>
                    <hr>
                  </div>
                  <div class="marketBidding-body">
                    <el-col :span="1"><div class="grid-content "></div></el-col>
                    <el-col :span="23">
                      <div class="marketBidding-body-infor" style="clear: both; ">
                        <el-form  :model="ruleForm2" status-icon ref="ruleForm2"  :rules="rules2" label-width="110px" class="demo-ruleForm form" >
                          <div style="clear:both; height:50px;">
                            <el-col :span="12">
                              <div class="left">
                                <el-form-item label="建议楼面地价" prop="obtain_ground_price">
                                  <el-col :span="18"> <el-input   :disabled="disabledFlag"  v-model="ruleForm2.obtain_ground_price"></el-input></el-col>
                                  <el-col :span="6"><span>元／平米</span></el-col>
                                </el-form-item>
                              </div>
                            </el-col>
                          </div>
                        </el-form>
                        <el-form   status-icon  label-width="0px" class="demo-ruleForm form" >
                          <div class="textInput">
                            <p class="textName">项目决策紧迫性</p>
                            <el-form-item label="" prop="project_decision">

                            <textarea name="" v-model='ruleForm2.project_decision' :disabled="disabledFlag" maxlength="140"  class="decision"
                                     placeholder="请输入" ></textarea>
                            <span class="sumNum">{{ruleForm2.project_decision.length}}/140</span>

                            </el-form-item>

                          </div>
                          <div class="textInput">
                            <p class="textName">主要潜在竞争对手</p>
                            <el-form-item label="" prop="hidden_competitor">
                            <textarea name="" v-model='ruleForm2.hidden_competitor' :disabled="disabledFlag" maxlength="140"  class="decision"
                                     placeholder="请输入" ></textarea>
                            <span class="sumNum">{{ruleForm2.hidden_competitor.length}}/140</span>

                            </el-form-item>
                            </div>
                          <div class="textInput">
                            <p class="textName">合作方、资金来源及解决方案</p>
                            <el-form-item label="" prop="origin_solution">
                            <textarea name="" v-model='ruleForm2.origin_solution' :disabled="disabledFlag" maxlength="140"  class="decision"
                                     placeholder="请输入" ></textarea>
                            <span class="sumNum">{{ruleForm2.origin_solution.length}}/140</span>

                            </el-form-item>

                          </div>
                          <div class="textInput">
                            <p class="textName">建议获取时机</p>
                            <el-form-item label="" prop="obtain_opportunity">
                            <textarea name="" v-model='ruleForm2.obtain_opportunity' :disabled="disabledFlag" maxlength="140"  class="decision"
                                     placeholder="请输入" ></textarea>
                            <span class="sumNum">{{ruleForm2.obtain_opportunity.length}}/140</span>

                            </el-form-item>

                          </div>
                          <div class="textInput">
                            <p class="textName">建议投资操作策略</p>
                            <el-form-item label="" prop="operate_policy">
                            <textarea name="" v-model='ruleForm2.operate_policy' :disabled="disabledFlag" maxlength="140"  class="decision"
                                     placeholder="请输入" ></textarea>
                             <span class="sumNum">{{ruleForm2.operate_policy.length}}/140</span>

                            </el-form-item>
                          </div>
                        </el-form>
                      </div>
                    </el-col>
                  </div>
                </el-col>
              </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
  </div>
  </div>
</template>
<script>
  export default {
    name: 'investmentAdvice',
    data() {
      var checkObtainNumber = (rule, value, callback) => {
       /* var reg = /^\d+(\.\d{1,2})?$/; //正则校验 :正整数,保留两位小数*/
      var  reg2 = /^(0|[1-9]\d{0,})+(\.\d{1,2})?$/; // 正则校验 :正整数
        if (value) {
          if (!reg2.test(value) || parseFloat(value)>1000000) {
            callback(new Error("请输入0~1000000正整数或两位小数"));
          }else{
            callback()
          }
        }
      };
      var checkCharactersLength= (rule, value, callback) => {
        if (!Number.isInteger(value)) {
          callback(new Error('最多输入140字符'));
        }
        /*输入内容为0-140个字符*/
//        let reg = /^.{0,140}$/;
//        if (!reg.test(value)) {
//          callback(new Error("最多输入140个字符"));
//        }
        else{
          callback()
        }
      };
      return {
        btnNone:false,          //true 显示
        disabledFlag:false,     //disabled 可编辑
        disabledDate:false,     //日期 不可输入
        reg: /^[0-9]*$/, // 正则校验 :正整数
        reg3: /^[\u4E00-\u9FA5]{0,140}$/, //中文验证
        reg2: /^(0|[1-9]\d{0,})+(\.\d{1,2})?$/, // 正则校验 :正整数,保留2位小数
        reg6: /^(0|[1-9]\d{0,})+(\.\d{0,})?$/, // 正则校验 :正整数,保留n位小数
        hintIsShow: false, // 提示消息显示隐藏
        hintMessage: '', // 提示消息
        ruleForm2:{
          obtain_ground_price:'',//建议楼面地价
          project_decision:'',//项目决策紧迫性
          hidden_competitor:'',//主要潜在竞争对手
          origin_solution:'',//合作方、资金来源及解决方案
          obtain_opportunity:'',//建议获取时机
          operate_policy:'',//建议投资操作策略
        },
        rules2: {
          obtain_ground_price: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          project_decision: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          hidden_competitor: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          origin_solution: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          obtain_opportunity: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          operate_policy: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ]
        },
        projectId:1,
      }
    },
    mounted(){
      this.isEdit();
      this.setConHeight();
    },
    props:
      {
        childParm:Object
      },
    methods:{
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
      /*通过接口获取投资建议信息*/
      accessProInvestmentAdvice:function () {
        let that = this;
        this.$http({
          method:'post',
          url:'/longcity/services/v1/project/getMenuDetail',
          data:{
            "projectId":that.projectId,
            "titleKey":[//菜单对应的titleKEY
              "proInvestmentAdvice",//项目成本运营
            ]
          }
        }).then(function (succeed) {
//          console.log(succeed);
          let proInvestmentAdvice=succeed.data.result.proInvestmentAdvice;
          that.ruleForm2.obtain_ground_price=proInvestmentAdvice.obtain_ground_price;
          that.ruleForm2.project_decision=proInvestmentAdvice.project_decision;
          that.ruleForm2.hidden_competitor=proInvestmentAdvice.hidden_competitor;
          that.ruleForm2.origin_solution=proInvestmentAdvice.origin_solution;
          that.ruleForm2.obtain_opportunity=proInvestmentAdvice.obtain_opportunity;
          that.ruleForm2.operate_policy=proInvestmentAdvice.operate_policy;
        },function (err) {
          console.log(err);
        })
      },
      //过滤双引号单引号
      // setTextA(){this.ruleForm2.project_decision  = this.ruleForm2.project_decision.replace(/^\"|\"$/g,'').replace(/^\'|\'$/g,'');},
      // setTextB(){this.ruleForm2.hidden_competitor  = this.ruleForm2.hidden_competitor.replace(/^\"|\"$/g,'').replace(/^\'|\'$/g,'');},
      // setTextC(){this.ruleForm2.origin_solution    = this.ruleForm2.origin_solution.replace(/^\"|\"$/g,'').replace(/^\'|\'$/g,'');},
      // setTextD(){this.ruleForm2.obtain_opportunity = this.ruleForm2.obtain_opportunity.replace(/^\"|\"$/g,'').replace(/^\'|\'$/g,'');},
      // setTextE(){this.ruleForm2.operate_policy     = this.ruleForm2.operate_policy.replace(/^\"|\"$/g,'').replace(/^\'|\'$/g,'');},
      /*通过接口提交投资建议信息*/
      subProInvestmentAdvice:function () {
        var that = this;
        this.$http({
          method:'post',
          url:'/longcity/services/v1/project/saveProjectPartially',
          data:{
//            "projectId":1024,
            "projectId":this.projectId,
            "title": "proInvestmentAdvice",
            "detail":{
              "obtain_ground_price":this.ruleForm2.obtain_ground_price,//建议楼面地价
              "project_decision":this.ruleForm2.project_decision,//项目决策紧迫性
              "hidden_competitor":this.ruleForm2.hidden_competitor,//主要潜在竞争对手
              "origin_solution":this.ruleForm2.origin_solution,//合作方、资金来源及解决方案
              "obtain_opportunity":this.ruleForm2.obtain_opportunity,//建议获取时机
              "operate_policy":this.ruleForm2.operate_policy,//建议投资操作策略
            },
          }
        }).then(function (succeed) {
          if(succeed.data.code==200 || succeed.data.code=="200"){
            that.thePreservationPopup();
          }else{
            that.$message({
              showClose: true,
              message: '保存失败！',
              type: 'success',
              duration:2000,
            });
          }
        },function (err) {
          console.log(err);
        })
      },
      /*从projectManagement获取页面ID*/
      getId(str){
        this.projectId=parseInt(str);
        this.accessProInvestmentAdvice();
      },
      /*取消弹窗*/
      theCancelPopup(){
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '是否退出当前页面'),
            h('i', { style: 'color: teal' }, )
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                  this.cancelThePage(1);
                }, 5);
              }, 10);
            } else {
              done();
            }
          }
        }).then(action => {
//          this.$message({
//            type: 'info',
//            message: 'action: ' + action
//          });
        });
      },
      /*保存弹窗*/
      thePreservationPopup(){
        this.$message({
          showClose: true,
          message: '恭喜，项目保存成功！',
          type: 'success',
          duration:2000,
        });
        this.cancelThePage(2);
      },
      /*关闭本页面*/
      cancelThePage(operation){
        this.$emit('cancelThePage',operation);
        this.dataInitialization();
      },
      run(fun,parm){
        if(fun=="getId"){
          this.getId(parm);
        }else if(fun=="getPosition"){
          this.getPosition(parm);
        }else if(fun="getPoints"){
          this.getPoints(parm);
        }
      },
      //四舍五入
      // setValueD() {
      //   if (this.ruleForm2.obtain_ground_price !== '' && this.reg6.test(this.ruleForm2.obtain_ground_price)) {
      //     this.ruleForm2.obtain_ground_price = Math.round(this.ruleForm2.obtain_ground_price * 1) / 1;
      //   }
      // },
      //数据验证函数
      verify(){
         if (!this.reg2.test(this.ruleForm2.obtain_ground_price) && this.ruleForm2.obtain_ground_price !== ''||this.ruleForm2.obtain_ground_price>1000000){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
          this.hint('请输入正确的建议楼面地价数据!')
          return false
        }else{
          this.subProInvestmentAdvice();
        }
        // if (!this.reg3.test(this.ruleForm2.project_decision) && this.ruleForm2.project_decision!== '') {
        //   this.hint('请输入正确的项目决策紧迫性!')
        //   return false
        // }
        // if (!this.reg3.test(this.ruleForm2.hidden_competitor) && this.ruleForm2.hidden_competitor!== '') {
        //   this.hint('请输入正确的主要潜在竞争对手!')
        //   return false
        // }
        // if (!this.reg3.test(this.ruleForm2.origin_solution) && this.ruleForm2.origin_solution!== '') {
        //   this.hint('请输入正确的合作方、资金来源及解决方案!')
        //   return false
        // }
        // if (!this.reg3.test(this.ruleForm2.obtain_opportunity) && this.ruleForm2.obtain_opportunity!== '') {
        //   this.hint('请输入正确的建议获取时机!')
        //   return false
        // }

        // if (!this.reg3.test(this.ruleForm2.operate_policy) && this.ruleForm2.operate_policy!== '') {
        //   this.hint('请输入正确的建议投资操作策略!')
        //   return false
       // }
      },
       //提示信息
      hint(message) {
        let that = this
        this.hintIsShow = true
        that.hintMessage = message

        setTimeout(function () {
          that.hintIsShow = false
        }, 2000)
         clearTimeout()
      },
      /*新建项目进入页面将数据初始化*/
      dataInitialization(){
        /*变量初始化，与接口获取变量名称保持一致*/
        this.proInformation.businessCodeName='';
        this.proInformation.industryCodeName='';
        this.proInformation.locationDescription='';
        this.proInformation.realestateCodeName='';
        this.proInformation.landEdge=''
        this.proPlayersList=[];
        this.projectUsers=[];
        this.picturesRef=[];
        this.runType=[];
        this.ruleForm.name='';
        this.value5=[];
        this.imgCover=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.imgFourto=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.imgFavourableFactor=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.imgNegativeFactor=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.imgActuality=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
      },
    }
  }
</script>
<style lang="less">
  #productInfo{
    #conMod {
    width: 100%;
    overflow: auto
  }
  .newProject {
    margin: 0px auto;
    /*padding-top: 10px;*/
    background-color: white;
    /*height: 1024px;*/
  }
  .newProject-title{
    background:#67649F;
    text-align: center;
    position: fixed;
    width: 63%;
    z-index:1000;
  }
   .newProject-title p{
    color:white;
    padding: 10px;
  }
  .newProject-title .survey{
    height: 50px;
    clear: both;
    /*padding:0 20px 5px 20px;*/
    position: relative;
  }
  .newProject-title .survey p{
    /*float: left;*/
    /*font-weight:bold;*/
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
   .newProject-title .survey .btn{
    /*float: right;*/
    position: absolute;
    right: 0;
    top: 12%;
    /*transform:translate(-50%,-50%);*/
  }
   .newProject-title .survey button:nth-of-type(2){
    margin-right:25px;
  }
  .newProject-title .survey .el-button--primary{
    /*float: right;*/
    background-color: #67649F;
    border-color: #67649F;
  }
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
  .investmentAdvice-body{
    margin-top: 10px;
  }
  .investmentAdvice-body  .textInput{
    /*height: 100%;*/
    margin-top: 15px;
    height: 100%;
  }
  .investmentAdvice-body .marketBidding-title{
    width:100%;
    height:51px;
  }
  .investmentAdvice-body .marketBidding-body{
    height: 100%;
  }
  .investmentAdvice-body  .marketBidding-body-infor{
    height: 100%;
    margin-top: 15px;
    margin-bottom: 60px;
  }
  .investmentAdvice-body .textInput .el-textarea__inner {
    height: 90px;
    overflow:hidden;
  }
  .sumNum{
    position: absolute;
    right: 8px;
    bottom: 2px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #CCCCCC;
    letter-spacing: 0;
    line-height: 14px;
  }
  .hint{
    position: absolute;
    left: 0%;
    bottom: -17px;
    font-size: 12px;
    color: red;
    width: 60%;
    line-height: 12px;
  }
   .tanTip{
    height: 38px;
    width: 380px;
    border-radius: 4px;
    box-shadow: 3px 3px 3px #ddd;
    text-align: center;
    line-height: 38px;
    color: #ffffff;
    font-size: 14px;
    position: absolute;
    top: 10%;
    left: 50%;
    margin-left: -25%;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .decisiom{
     overflow:hidden;
     color:red
  }
  .decision {
    font-size: 14px;
    resize: none;
    width: 98%;
    height: 80px;
    overflow:hidden;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    background-color: #fff;
    padding: 5px 7px;
    margin-top:-10px;
    margin-bottom:-20px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
 
  .decision:hover{
     border-color: #8391a5;
  }
   .decision:focus{
      outline: 0;
      border-color: #20a0ff
  }
  .textName{
    margin-bottom:5px;
  }
  }
</style>
