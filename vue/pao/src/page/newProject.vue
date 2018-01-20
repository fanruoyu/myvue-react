<template>
  <div id="newProject" class="newProject" :gutter="20">
    <div class="closeNav">
      <p class=" tit fl">新建项目</p>
      <div>
        <span class="closeButton fl" @click="theCancelPopup">关闭</span>
        <span class="saveButton fl"  @click="onSubmit">保存</span>
      </div>
    </div>
    <el-row justify="center">
      <div id="conMod">
      <el-col :span="2"><div class="grid-content "></div></el-col>
      <el-col :span="18" >
        <div class="newProject-body ">
          <div class="survey">
            <p>项目概览</p>
            <div class="btn">
              <!--<el-button type="primary" @click="onSubmit" class="">保存</el-button>-->
              <!--<el-button>取消</el-button>-->
            </div>
          </div>
          <hr>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="108px" class="demo-ruleForm form"  >
            <el-form-item label="项目名称" prop="name" class="mandatory01">
              <el-input v-model="ruleForm.name" :maxlength="64" placeholder="市+区县+街道+道路名或地标名+出让编号（说明：实际名称中不要加号）"></el-input>
            </el-form-item>
            <el-form-item label="标书名称" prop="bidName" class="mandatory02">
              <el-input v-model="ruleForm.bidName"  :maxlength="64"></el-input>
            </el-form-item>
            <el-form-item label="项目位置" class="proAddress" prop="region">
              <!-- 需求变动 不要地址级联 -->
              <!--<div class="proAddress-left">-->
              <!--</el-select>-->
              <!--<cityLink></cityLink>-->
              <!--<el-input v-model="form.name" placeholder="请输入详细地址"></el-input>-->
              <!--</div>-->
              <!--<div class="proAddress-right">-->
              <!--<img src="../../src/assets/slideShow2/mapReaname.png" alt="">-->
              <!--<p>地图选项</p>-->
              <!--</div>-->
              <div class="proAddress-left2" @click="setMark" >
                <img src="../../src/assets/images/mapReaname.png" alt="">
                <p>地图选点</p>
              </div>
              <div class="proAddress-right2">
                <p>{{!proInformation.locationDescription?'点击按钮在地图中确定项目位置':proInformation.locationDescription}}</p>
              </div>
            </el-form-item>
            <el-form-item label="项目边界" class="proBoundary"  prop="region">
              <div class="proBoundary-left" @click="drawProject">
                <img src="../../src/assets/images/drawBoundary.png" alt="">
                <p>绘制边界</p>
              </div>
              <div class="proBoundary-right">
                <p>{{proInformation.landEdge!==""?'您已勾绘'+proInformation.num+"个地块":'点击按钮绘制项目边界'}}</p>
              </div>
            </el-form-item>
            <el-form-item label="所属地区公司" prop="region" class="inputLength">
              <el-select   :disabled="disabledFlag" v-model="proInformation.owerCompanyCode"   placeholder="请选择">
                <el-option
                  v-for="item in owerCompanyCodeAll"
                  :key="item.companyName"
                  :label="item.companyName"
                  :value="item.companyId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业态" class="inputLength">
              <el-select   :disabled="disabledFlag" v-model="value5" multiple  placeholder="请选择">
                <el-option
                  v-for="item in formats"
                  :key="item.dictName"
                  :label="item.dictName"
                  :value="item.dictCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="获取方式" class="inputLength">
              <el-select v-model="acquiescenceAccessMethods" placeholder="请选择">
                <el-option
                  v-for="item in accessMethods"
                  :key="item.value"
                  :label="item.dictName"
                  :value="item.dictCode"
                  :acquiescenceAccessMethods="item.dictCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合作方式" class="inputLength">
              <el-select v-model="acquiescenceCooperationWay" placeholder="请选择">
                <el-option
                  v-for="item in cooperationWay"
                  :key="item.dictName"
                  :label="item.dictName"
                  :value="item.dictCode"
                  :acquiescenceCooperationWay="item.dictCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务类型" class="inputLength">
              <el-select v-model="acquiescenceBusinessType" multiple placeholder="请选择">
                <el-option
                  v-for="item in businessType"
                  :key="item.value"
                  :label="item.dictName"
                  :value="item.dictCode"
                  :acquiescenceBusinessType="item.dictCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目状态">
              <p>{{!proInformation.projectStatusTag?'项储1.0':proInformation.projectStatusTag}}</p>
            </el-form-item>
            <div label="所在地产板块" class="proSector">
              <!--<p>所在地产板块<span>{{proInformation.realestateCodeName}}</span></p>-->
              <p>所在地产板块<span>{{!proInformation.realestateCodeName?"暂无板块信息":proInformation.realestateCodeName}}</span></p>
              <p style="margin-left: 30px;">所在商业板块<span>{{!proInformation.businessCodeName?"暂无板块信息":proInformation.businessCodeName}}</span></p>
              <p style="margin-left: 30px;">所在产业板块<span>{{!proInformation.industryCodeName?"暂无板块信息":proInformation.industryCodeName}}</span></p>
            </div>
            <el-form-item label="项目图库" class="proPhoto">
              <heavyImageManagement @componentDataSynchronization="componentDataSynchronization"  :btnNone="btnNone" :picturesRef="picturesRef" :dictionariesList="dictionariesList" :dictionariesTitle="dictionariesTitle"></heavyImageManagement>
            </el-form-item>
            <el-form-item label="项目成员" class="proPlayers">
              <el-button type="promise" @click="isShowProjectList" class="btn">添加成员</el-button>
              <div class="verScrollBar" v-if="this.proPlayersList.length>0">
                <ul>
                  <li v-for="(playersList,index) in proPlayersList">
                    <div class="proPlayersList ">
                      <img :src="playersList.imgSrc"  alt="" v-if="playersList.imgSrc">
                      <img :src="defaultAvatar" alt="" v-else>
                      <!--<img src='../../src/assets/images/defaultAvatar.png' alt="">-->
                      <p>{{playersList.per.split("(",1)[0]}}</p>
                      <p>{{playersList.dpment}}</p>
                      <p>{{playersList.position}}</p>
                      <p class="delete"  @click="thePerDelete(index)"></p>
                    </div>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-form>
          <diaLog :is-show="isSwitch" >
            <proPopu  @closeAside="isSwitch=false" @subAside="subAside" class="proPopu"></proPopu>
          </diaLog>
        </div>
      </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
  import heavyImageManagement from '../components/heavyImageManagement'
  import submitImg from '../page/submitImg.vue'
  import proPopu from '../components/proPopu'
  import slideShow from '../components/slideShow'
  import cityLink from '../components/cityLink'
  import diaLog from '../components/dialog'
  export default {
    name: 'newProject',
    components: {
      heavyImageManagement,
      slideShow,
      cityLink,
      proPopu,
      submitImg,
      diaLog
    },
    mounted(){
//      this.interfaceTest();
      this.accessFormats();
      this.setConHeight();
      this.accessOwerCompanyCode();
    },
    data () {
      //特殊字符提示
      var specialCharacters = (rule, value, callback) => {
        var reg = /^[a-zA-Z0-9\u4E00-\u9FA5_]+$/;
        if (value) {
          if (reg.test(value)==false) {
            callback(new Error("支持中文、英文（大小写）、下划线，不支持特殊字符 "));
          }
          else{
            callback()
          }
        }else{
          callback();
        }
      };
      return {
        btnNone:true,
        flag:true,
        dictionariesTitle:'',//字典名称
        dictionariesList:[],// 字典数组
        owerCompanyCodeAll:[],
        disabledFlag:false,     //disabled 可编辑
        message:'1',
        ruleForm: {
          /*name需要校验，element ui存放该变量的位置固定*/
          name: '',
          bidName:'',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        /*输入框校验*/
        rules: {
          name: [
            { validator: specialCharacters, trigger: 'blur' }
          ],
          bidName:  [
            { validator: specialCharacters, trigger: 'blur' }
          ],
          region: [
            { required: true,  trigger: 'blur' },
          ],
        },
        proPlayersList:[
//          {
//            imgSrc:'',
//            per:'',
//            dpment:'',
//            position:'',
//          },
        ],
        /*业态的选定值*/
        value5:[],
        runningTypes:[],
        /*自定义属性*/
        /*是否显示添加成员*/
        isSwitch:false,
        /*存储字典信息：业态*/
        formats:{},
        /*存储字典信息:图库标题*/
        proOverview:{},
        /*通过接口获取页面信息：*/
        landEdges:'',
        proInformation:{
          /*变量初始化，与接口获取变量名称保持一致*/
          realestateCodeName:'',
          businessCodeName:'',
          industryCodeName:'',
          locationDescription:'',
          id:1,
          num:'',//n个地块
          landEdge:'',
          runningTypes:'',
          /*经度*/
          businessCodeName:'',
          /*纬度*/
          industryCodeName:'',
          /*项目地址*/
          locationDescription:'',
          owerCompanyCode:'',
        },
        /*添加的项目组成员*/
        projectUsers:[],
        /*添加的图片列表*/
        picturesRef:[],
        runType:[],
        /*默认头像地址*/
        defaultAvatar:require("../../src/assets/images/defaultAvatar.png"),
        cooperationWay:'',
        accessMethods:'',
        businessType:'',
        acquiescenceCooperationWay:'',
        acquiescenceAccessMethods:'',
        acquiescenceBusinessType:[],
        summary:{
          "cooperationWay": "",//合作方式
          "accessMethods": "",//获取方式
          "businessType": ""//业务类型，多选项
        },
      }
    },
    methods: {
      componentDataSynchronization(data){
        this.picturesRef=data;
      },
      onSubmit() {
        if(this.flag===false){
          return
        }
        this.getProjectUsersId();
        this.getRunningType();
        this.getSummary();
        /*必填项校验*/
        if(this.ruleForm.name==''){
          this.$message({
            showClose: true,
            message: '项目名称没有填写，请继续完成填写！',
            type: 'success',
            duration:3000,
          });
          return
        };
        if(this.ruleForm.bidName==''){
          this.$message({
            showClose: true,
            message: '标书名称没有填写，请继续完成填写！',
            type: 'success',
            duration:3000,
          });
          return
        };
        if(this.proInformation.locationDescription==''){
          this.$message({
            showClose: true,
            message: '项目位置没有填写，请继续完成填写！',
            type: 'success',
            duration:3000,
          });
          return
        };
        if(this.proInformation.landEdge==''){
          this.$message({
            showClose: true,
            message: '项目边界没有填写，请继续完成填写！',
            type: 'success',
            duration:3000,
          });
          return
        };
        if(this.proInformation.owerCompanyCode==''){
          this.$message({
            showClose: true,
            message: '所属地区公司没有填写，请继续完成填写！',
            type: 'success',
            duration:3000,
          });
          return
        };
//        if(this.picturesRef.length<1){
//          this.$message({
//            showClose: true,
//            message: '图片信息没有填写，请继续完成填写！',
//            type: 'success',
//            duration:3000,
//          });
//          return
//        };
          let obj1={
            "inputType":0,//0为创建项目，1为创建竞品
            "id":0,//项目或竞品ID，新建时传0
            "locationDescription":this.proInformation.locationDescription,//项目位置
            "longitude": this.proInformation.longitude,
            "latitude": this.proInformation.latitude,
            "name": this.ruleForm.name,//项目名称
            "landEdge":this.proInformation.landEdge,//说明/描边坐标，解析方式见新建项目接口,
            "projectUsers":this.projectUsers,//添加的项目组成员
            "picturesRef":this.picturesRef,//添加的图片
            "runningTypes":this.runningTypes,//添加的业态
            "summary":this.summary,//添加的summary
            "bidName": this.ruleForm.bidName,//标书名称
            "landEdges":this.landEdges,//说明
            "owerCompanyCode":this.proInformation.owerCompanyCode,//添加的地区公司
          };
          let obj2={
            "inputType":0,//0为创建项目，1为创建竞品
            "id":9,//项目或竞品ID，新建时传0
            "locationDescription":"北京朝阳区酒仙桥将台路5号",//项目位置
            "name": "朝阳区CF20175674X8地块",//项目名称
            "longitude": 116.413777,
            "latitude": 39.920533,
            "landEdge":"234.144,345.234;22.9972,42.23459",//描边坐标，解析方式见新建项目接口,
            //每个地块用“|”分割，一个地块的点用“;”号分割，一个经纬度用“,”分割，前纬度///后维度，一个地块的点按顺时针或逆时针顺序排列
            /*格式为字符串*/
            "projectUsers":[],//添加的项目组成员
            "picturesRef":[//图片列表
              {
                "picId":12,  //图片ID
                "coordinate":"123.234234234,23.45234234234",//拍照经度,纬度
                "photoDirection":"90",//拍照角度，相对于正北方
                "picTag":[
                  "advantage","school"
                ],//图片标签
                "remark":"图片的一段文字说明"
              },],
            "runningType": [
              {
                "runningType":"1", // 商运,对应字典接口的dictCode
                "runningSubTypes":[]
              }]

//业态类型
          };
          this.subProInformation(obj1);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /*自定义方法*/
      isShowProjectList() {
        this.isSwitch=true;
      },
      /*删除人员时弹出对话框*/
      thePerDelete(index){
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '确认将该成员从项目中移除？'),
            h('i', { style: 'color: teal' }, )
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              this.delPlayersList(index);
              setTimeout(() => {
                instance.confirmButtonLoading = false;
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
      /*hover删除人员*/
      delPlayersList(index){
        this.proPlayersList.splice(index, 1);
      },
      /*人员管理弹窗点击确定关闭且接收数据*/
      subAside(data){
        this.isSwitch=false;
        /*项目成员去重*/
        this.proPlayersList=this.proPlayersList.concat(data);
        let res=[this.proPlayersList[0]];
        for(let i=1;i<this.proPlayersList.length;i++){
          let repeat=false;
          for(let j=0;j<res.length;j++){
            if(this.proPlayersList[i].shName==res[j].shName){
              repeat=true;
              break;
            }
          }
          if(!repeat){
            res.push(this.proPlayersList[i]);
          }
        };
        this.proPlayersList=res;
        this.proPlayersList.sort(this.compare('position'));
      },
      /*通过接口获取业态和图库标题、获取方式、合作方式、业务类型*/
      accessFormats:function(){
        var that = this;
        this.$http({
          method:'post',
//             测试：http://192.168.36.121:9080
          /*数据字典列表*/
          url:'/longcity/services/v1/dict/dictListByType',
//          data:{"dictTypes":["running_type","project_image_type"]},
          data:{"dictTypes":["running_type","project_image_type","cooperationWay","accessMethods","businessType"]},
        }).then(function (succeed) {
          that.formats=[];
          that.formats=succeed.data.result[0].items;
          that.cooperationWay=succeed.data.result[2].items;
          that.accessMethods=succeed.data.result[3].items;
          that.businessType=succeed.data.result[4].items;
          /*图片管理*/
          that.dictionariesTitle='project_image_type';
          that.dictionariesList = succeed.data.result[1].items // 保留字典关键字数组;
          /*图片管理*/
        },function (err) {
          console.log(err);
        })
      },
      /*通过接口获取地区公司*/
      accessOwerCompanyCode:function(){
        var that = this;
        this.$http({
          method:'post',
//             测试：http://192.168.36.121:9080
          /*数据字典列表*/
          url:'/longcity/services/v1/cuserviceOrg/queryCuserviceOrgByParentId',
        }).then(function (succeed) {
          that.owerCompanyCodeAll=succeed.data.result;
        },function (err) {
          console.log(err);
        })
      },
      /*通过接口获取项目概览初始化信息*/
      accessProInformation:function () {
        var that = this;
        this.$http({
          method:'post',
          url:'longcity/services/v1/project/summary',
//          data:{"id":this.proInformation.id},
//          data:{"id":1024},
        }).then(function (succeed) {

          /*判断下不为空的情况下才执行，否则浏览器下会打印错误信息*/
          that.landEdges=succeed.data.result.landEdges;
          that.proInformation=succeed.data.result;
          /*项目名称*/
          that.ruleForm.name=that.proInformation.name;
          if(that.proInformation.bidName){
            that.ruleForm.bidName=that.proInformation.bidName;
          }
          /*选定的业态*/
          if(that.proInformation.runningTypes.length >0){
            that.proInformation.runningTypes.forEach(item =>{
              that.value5.push(item.runningType);
          });
          }
          /*选定的图片信息*/
          that.picturesRef=succeed.data.result.picturesRef;
          /*选定的用户成员信息*/
          that.proPlayersList=[];
          succeed.data.result.stackholders.forEach((item,index)=>{
            let temporaryArray={};
            if(succeed.data.result.stackholders[index].avatar==''){
              temporaryArray.imgSrc=that.defaultAvatar;
            }else{
              temporaryArray.imgSrc=succeed.data.result.stackholders[index].avatar;
            }
            temporaryArray.per=succeed.data.result.stackholders[index].shName;
            temporaryArray.dpment=succeed.data.result.stackholders[index].group;
            temporaryArray.position=succeed.data.result.stackholders[index].title;
            temporaryArray.shName=succeed.data.result.stackholders[index].shName;
            that.proPlayersList.push(temporaryArray);
          });
          that.proPlayersList.sort(that.compare('position'));
//          console.log(that.proPlayersList);
        },function (err) {
          console.log(err);
        })
      },
      /*用户成员信息按照部门首字母进行排序*/
      compare:function (property){
        return function(obj1,obj2){
          var value1 = obj1[property];
          var value2 = obj2[property];
          return value1.localeCompare(value2);
        }
      },
      /*提交接口提交项目概览初始化信息*/
      subProInformation:function (obj) {
        var that = this;
        that.flag=false;
        this.$http({
          method:'post',
          /*新建更新项目竞品接口（接口*/
          url:'longcity/services/v1/project/saveProjectPc',
          data:obj,
        }).then(function (succeed) {
          if(succeed.data.code==200 || succeed.data.code=="200"){
            that.$message({
              showClose: true,
              message: '恭喜，项目保存成功！',
              type: 'success',
              duration:3000,
            });
            that.cancelThePage(2);//退出当前页面
            that.dataInitialization();
          }else if(succeed.data.code==300 || succeed.data.code=="300"){
            if(succeed.data.message.indexOf("项目名称不能重复")>=0){
              that.alertErrorDialogue(succeed.data.message);
            }else{
              that.alertErrorDialogue("保存失败！");
            }
          }else{
            that.$message({
              showClose: true,
              message: '保存失败！',
              type: 'error',
              duration:3000,
            });
          }
          that.flag=true;
        },function (err) {
          console.log(err);
        })
      },
      /*获取向接口提交项目组成员id*/
      getProjectUsersId:function () {
        let that=this;
        this.projectUsers=[];
        let projectUsersShName=[];
        /*获取shName*/
        this.proPlayersList.forEach((item)=>
        {
          projectUsersShName.push(item.shName);
        });
        /*截取拼音*/
        if(projectUsersShName.length>0){
          projectUsersShName.forEach(item=>{
            that.projectUsers.push(item.split('(',2)[1].split(')',1)[0]);
        });
        }
      },
      /*获取向接口提交项目组成员runningType*/
      getRunningType:function () {
        let that=this;
        let temp=[];
        if(that.value5.length>0){
          that.value5.forEach(item=>{
            let obj= {
              runningType:'',
              runningSubTypes:[]
            };
            obj.runningType=item;
            temp.push(obj);
          })
        };
        that.runningTypes=[].concat(temp);//value5结构和接口结构不一致，会闪现。所以提交再定义一个变量
      },

      /*变量名转换*/
      /*获取向接口提交summary数据(合作方式 获取方式 业务类型)*/
      getSummary:function () {
        let that=this;
        that.summary.cooperationWay=that.acquiescenceCooperationWay;
        that.summary.accessMethods=that.acquiescenceAccessMethods;
        that.summary.businessType=that.acquiescenceBusinessType.join(',');
      },
      /*接口测试*/
      interfaceTest:function(){
        var that = this;
        this.$http({
          method:'post',
//             测试：http://192.168.36.121:9080
          /*人员模糊搜索*/
//             url:'http://test-longcity.longfor.com:9080/longcity/services/v1/user/filter',
//             data:{"name":'李'}
          /*项目概览*/
//             url:'http://test-longcity.longfor.com:9080/longcity/services/v1/project/summary',
//             data:{"id":1024},
          /*新建更新项目竞品接口（接口*/
//            url:'http://test-longcity.longfor.com:9080/longcity/services/v1/project/saveProject',
          /*数据字典列表*/
//              url:'http://test-longcity.longfor.com:9080/longcity/services/v1/dict/dictListByType',
//              data:{"dictTypes":["running_type","project_image_type"]},
        }).then(function (succeed) {
//          console.log(succeed);
        },function (err) {
          console.log(err);
        })
      },
      /*调用projectManggement页面的画图方法*/
      drawProject(){
        this.$emit('drawProject',this.proInformation.landEdge,this.landEdges);
      },
      /*调用projectManggement页面的打点方法*/
      setMark(){
        this.$emit('setMark',this.proInformation.locationDescription);
      },
      /*从projectManagement获取项目地址*/
      getPosition(str){
        this.proInformation.locationDescription=str[0];
        this.proInformation.longitude=str[1];
        this.proInformation.latitude=str[2];
      },
      /*从projectManagement获取项目边界*/
      getPoints(str,obj,num){
        this.proInformation.num=num;
        this.proInformation.landEdge=str;
        this.landEdges=obj;
      },
      /*从projectManagement获取页面ID*/
      getId(str){
        this.proInformation.id=parseInt(str);
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
          instance.confirmButtonText = '执行中...';
          setTimeout(() => {
            done();
          this.cancelThePage(1);
          this.dataInitialization();
          setTimeout(() => {
            instance.confirmButtonLoading = false;
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
          message: '恭喜，项目创建成功！',
          type: 'success',
          duration:3000,
        });
        this.cancelThePage(2);
//        this.dataInitialization();
      },
      /*关闭本页面*/
      cancelThePage(operation){
        this.$emit('cancelThePage',operation);
      },
      /*新建项目进入页面将数据初始化*/
      dataInitialization(){
        /*变量初始化，与接口获取变量名称保持一致*/
        this.proInformation.owerCompanyCode=''
        this.proInformation.businessCodeName='';
        this.proInformation.industryCodeName='';
        this.proInformation.locationDescription='';
        this.proInformation.realestateCodeName='';
        this.proInformation.landEdge='';
        this.proPlayersList=[];
        this.projectUsers=[];
        this.picturesRef=[];
        this.runType=[];
        this.ruleForm.name='';
        this.ruleForm.bidName='';
        this.value5=[];
        this.acquiescenceCooperationWay='';
        this.acquiescenceAccessMethods='';
        this.acquiescenceBusinessType=[];
      },
      run(fun,parm,obj,num){
        if(fun=="getId"){
          this.getId(parm);
        }else if(fun=="getPosition"){
          this.getPosition(parm);
        }else if(fun="getPoints"){
          this.getPoints(parm,obj,num);
        }
      },
    },
  }
</script>
<style lang="less">
  @import "../assets/css/common.css";
  @import "../assets/css/base.css";
  #newProject{
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
  /*element ui 分栏结束*/
  .newProject {
    margin: 0px auto;
    background-color: white;
    width: 100%;
  }
  .newProject-title{
    background:#67649F;
    text-align: center;
    position: fixed;
    z-index:1000;
    width: 63%;
  }
   .newProject-title p{
    color:white;
    height: 50px;
    line-height: 50px;
  }
   .newProject-title .survey .el-button{
    text-align: center;
    width: 80px!important;
    height: 30px!important;
    line-height: 0;
  }
   .newProject-title .survey{
    height: 50px;
    clear: both;
    /*padding:0 20px 5px 20px;*/
    position: relative;
  }
  .newProject-title .survey p{
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  .newProject-title .survey .btn{
    position: absolute;
    right: 0;
    top: 12%;
  }
  .newProject-title .survey button:nth-of-type(1){
    border: 1px solid #fff;
  }
  .newProject-title .survey button:nth-of-type(2){
    margin-right:25px;
  }
  .newProject-title .survey .el-button--primary{
    background-color: #67649F;
    border-color: #67649F;
  }
  .newProject-body{
    margin-top: 10px;
    position: relative;
  }
  .newProject-body .survey{
    height: 30px;
    clear: both;
    padding:0 20px 5px 20px;
  }
  .newProject-body .survey p{
    float: left;
    font-weight:bold;
  }
  .newProject-body .survey .btn{
    float: right;
  }
  .newProject-body .survey .el-button--primary{
    float: right;
    background-color: #67649F;
    border-color: #67649F;
  }
  .newProject-body .form{
    margin-top: 20px;
  }
  .newProject-body .form .mandatory01 .el-form-item__label::before {
    content:"*";
    color: #ff4949;
    position: absolute;
    left: 30px;
    top: 75px;
  }
  .newProject-body .form .mandatory02 .el-form-item__label::before {
    content:"*";
    color: #ff4949;
    position: absolute;
    left: 30px;
    top: 132px;
  }
  .newProject-body .form .proAddress{
    clear: both;
  }
  .newProject-body .form .proAddress .proAddress-left{
    float: left;
    width: 80%;
  }
  .newProject-body .form .proAddress .proAddress-right{
    width: 18%;
    float: right;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    /*height: 100px;*/
    vertical-align:center;
    text-align: center;
    display: table-cell;
  }
  .newProject-body .form .proAddress .proAddress-left2{
    width: 18%;
    float: left;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    vertical-align:center;
    text-align: center;
    display: table-cell;
    position: relative;
    height: 80px;
  }
  .newProject-body .form .proAddress .proAddress-right2{
    margin-left: 10px;
    float: left;
    line-height:80px;
  }
  .newProject-body .form .proAddress .proAddress-right img{
    width: 54px;
    height: 54px;

  }
  .newProject-body .form .proAddress .proAddress-left2 img{
    width: 54px;
    height: 54px;
    margin-bottom: 10px;
  }
  .newProject-body .form .proAddress .proAddress-left2 p{

  }
  .newProject-body .form .proBoundary{ clear: both;}
  .newProject-body .form .proBoundary .proBoundary-left{
    width: 18%;
    float: left;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    /*height: 100px;*/
    vertical-align:center;
    text-align: center;
    display: table-cell;
    height: 80px;
  }
  /*影响项目地址 图片与文字之间的间距*/
  .newProject-body .proAddress .el-form-item__content{
    line-height: 0;
  }
  .newProject-body .proBoundary .el-form-item__content{
    line-height: 0;
  }
  .newProject-body .proPlayers {

  }
  .newProject-body .proPlayers .el-form-item__content{
    line-height: 10px;
  }
  .newProject-body .form .proBoundary .proBoundary-left img{  width: 54px;
    height: 54px;
    margin-bottom: 10px;}
  .newProject-body .form .proBoundary .proBoundary-left p{
  }
  .newProject-body .form .proBoundary .proBoundary-right{  width: 70%;   width: 300px;
    float: left;  }
  .newProject-body .form .proBoundary .proBoundary-right p{
    margin-left: 10px;
    float: left;
    line-height:80px;}
  .newProject-body .form .proSector{

  }
  .newProject-body .form .proSector p{
    display: inline;
    margin-left: 10px;
  }
  .newProject-body .form .proSector span{
    /*background-color: #EFEFEF;*/
    margin:0 0 20px 10px ;
    padding: 5px;
    color: #444444;
  }
  .newProject-body .form .proPhoto{

  }
  .newProject-body tabs el-tabs el-tabs--border-card{
    box-shadow: 0 0px 0px 0 rgba(0,0,0,0), 0 0 0px 0 rgba(0,0,0,0);
    border:none;
  }

  .newProject-body .tabs  .el-tab-pane{
    height: 300px;
  }

  .newProject-body .form .proPhoto .el-button--primary{
    background-color: #67649F;
    border-color: #67649F;
    margin-bottom: 10px;
  }
  .newProject-body .form .proPhoto  .el-tabs__content{
    height: 100%;
    width: 100%;
    padding: 0;
  }
  /*定制proPhoto弹窗消息*/
  .newProject-body .form .proPhoto .el-dialog .el-dialog__header{

  }
  .newProject-body .form .proPhoto .tabs {
    position: relative;
    /*height: 100%;*/
  }
  .newProject-body .form .proPhoto .tabs p{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .newProject-body .form .proPlayers  {

  }
  .newProject-body .form .proPlayers  img{
    width: 15px;
    position: absolute;
    left: 5px;
    display: inline-block;
  }
  .newProject-body .form .proPlayers  button{
    background-color: #67649F ;
    border-color: #67649F;
    line-height: 1;
    cursor: pointer;
    padding: 10px 15px 10px 5px;
    border-radius: 4px;
    position: relative;
  }
  .newProject-body .form .proPlayers span:before {
    content:"";
    background:url('../assets/images/add.png') no-repeat ;
    background-size:14px 14px;
    /*background-position: -10px 0;*/
    /*z-index:100;*/
    /*background:url('../../static/images/test.jpg') ;*/
    /*background-position: 50px 100px;*/
    /*font-weight:bold;*/

    text-align: center;
    /*line-height: 42px;*/
    color: #fff;
    float: left;
    /*position: relative;*/
    /*top: 30px;*/
    border-radius: 25px;
    display: block;
    width: 14px;
    height: 14px;
    margin-right: 2px;
  }
  .newProject-body .form .proPlayers button span{
    /*margin-left: 13px;*/
    color: white;
    font-size: 14px;
    box-sizing: border-box;
    /*line-height:20px;*/
  }
  /*定制proPlayers弹窗内容*/
  .newProject-body .form .proPlayers .el-dialog__title{

  }
  .newProject-body .form .proPlayers .verScrollBar{
    /*border: 1px solid #000;*/
    height: 350px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .newProject-body .form .proPlayers ui{
    clear: both;
  }
  .newProject-body .form .proPlayers li{
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 110px;
    float: left;
    margin:10px 10px 10px 0;
    position: relative;
    /*box-sizing: border-box;*/
  }
  .newProject-body .form .proPlayers .proPlayersList{
    text-align: center;
    vertical-align:center;
    display: table-cell;
    position: relative;
    height: 200px;
  }
  .newProject-body .form .proPlayers .proPlayersList img{
    width: 50px;
    height: 50px;
    position: relative;
    margin-top: 10px;
    left:0;
  }
  .newProject-body .form .proPlayers .proPlayersList p {
    margin-top: 12px;
  }
  .newProject-body .form .proPlayers .proPlayersList p:nth-of-type(1) {
    font-size: 14px;
  }
  .newProject-body .form .proPlayers .proPlayersList p:nth-of-type(2) {
    line-height: 16px;

    font-size: 12px;
  }
  .newProject-body .form .proPlayers .proPlayersList p:nth-of-type(3) {
    line-height: 16px;

    font-size: 12px;
  }
  .newProject-body .form .proPlayers .proPlayersList p:nth-of-type(4) {
    font-size:8px;
    /*display: block;*/
    display: none;
    line-height: 30px;
  }
  .newProject-body .form .proPlayers .proPlayersList p:nth-of-type(4):before {
    content:'';
    background:url('../assets/images/delete.png') no-repeat ;
    background-size:24px 24px;
    width: 24px;
    height: 24px;
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .newProject-body .form .proPlayers .proPlayersList:hover .delete{
    font-size: 8px;
    height: 30px;
    width: 100%;
    display: block;
    /*display: none;*/
    opacity: 0.6;
    background: #000000;
    position: absolute;
    left: 0px;
    top: 160px;
    border-radius: 2px;
  }
  .newProject-body .form .inputLength .el-select{
    width: 100% !important;
  }
  /*弹窗位置*/
  .proPopu{
    position: absolute;
    left: 50%;
    top: 80%;
    /*z-index: 1;*/
    transform: translate(-50%,-50%);
  }
  .submitImg{
    /*display: none;*/
    position: absolute;
    left: 10%;
    top: 0;
    /*z-index:2;*/
    top: 42%;
  }
  }
</style>
