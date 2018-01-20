<template>
   <div id="areaProjectApproval" style="overflow:-Scroll;overflow-y:hidden;;background:white;" >
   
    <div class="closeNav" >
      <p class=" tit fl"  ref="title">重资产地区审批管理</p>
    </div>
    <div id="conModd" :class='{overflow:show1==true}'>
      <div class="newProject">
            <div class="alternative" >
             <el-row>
               <el-col :span="5" class="evelopment">
                    <el-col :span="9"><span>项目所在城市</span></el-col>
                    <el-col :span="1"><span></span></el-col>
                    <el-col :span="12">
                          <el-select v-model="cityId" :clearable="true" :disabled="oneself" :placeholder="cityM"  class="">
                            <el-option v-for="item in city" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
                            </el-option>
                          </el-select>
                    </el-col>
               </el-col>
               <el-col :span="5" style="text-align:center;">
                    <el-col :span="6"><span>审批状态</span></el-col>
                    <el-col :span="1"><span></span></el-col>
                    <el-col :span="15">
                          <el-select  v-model="status" :clearable="true"  placeholder="请选择" class="">
                            <el-option v-for="item in approvalStatus" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
                            </el-option>
                          </el-select>
                    </el-col>
               </el-col>
               <el-col :span="5" style="text-align:center;">
                    <el-col :span="9"><span>项目版本</span></el-col>
                    <el-col :span="1"><span></span></el-col>
                    <el-col :span="12">
                        <el-select  v-model="version" :clearable="true"  placeholder="请选择" class="">
                            <el-option v-for="item in versiona" :key="item.dictCode" :label="item.dictName" :value="item.dictName">
                            </el-option>
                          </el-select>
                    </el-col>
               </el-col>
                <el-col :span="6" style="text-align:center;">
                    <el-col :span="22">
                        <div style="position:relative;">
                          <input v-model="search" ref="search" placeholder="请输入关键字" class="searchText" @blur="abc"      @keyup="get($event)"  ></input>
                          <transition name="ul">
                          <ul class="search-ul" style="" v-show="search!==''&& show1">
                            <li  v-for="(item,index) in searchData" @click="changeBgc(index)"   :class="{gray:index===now}">{{item}}</li>
                            <li v-if="this.searchData.length==0&&show3"><span>暂无数据</span></li>
                          </ul>
                          </transition >
                        </div>
                    </el-col>
               </el-col>
               <el-col :span="2">
                  <el-col :span="10"><span class="demand" @click="searchMsg">搜索</span></el-col>
              </el-col>
            </el-row>
             <div >
            <table class="tableBox" style="margin-top:30px;">
                <tr style="height:40px;">
                  <th class="" style="width:5%">序号</th>
                  <th class="" style="width:14%; max-width:130px;">项目名称</th>
                  <th class="" style="width:14%;">项目地址</th>
                  <th class="" style="width:6%">所属城市</th>
                  <th class="" style="width:6%">项目版本</th>
                  <th class="" style="width:10%">审批状态</th>
                  <th class="" style="width:9%">立项通过天数</th>
                  <th class="" style="width:9%">投委通过天数</th>
                  <th class="" style="width:27%;min-width:300px;">操作</th>
                </tr>
                 <tr class="sec-tr" v-if="marst" v-for="(item,index) in messageList" :class="{'active':item.investmentCommitteeStatus==1 || item.projectApprovalStatus==1}">
                    <td class="cen"><p>{{index+1}}</p></td>
                    <td class="cen"><p style="width:90%;margin-left:5%;word-wrap:break-word ">{{item.projectName}}</p></td>
                    <td class="cen"><p>{{item.address}}</p></td>
                    <td class="cen"><p>{{item.cityName}}</p></td>
                    <td class="cen"><p>项储{{item.version}}</p></td>
                    <td class="cen"><p>{{item.status}}</p></td>
                    <td class="cen">{{item.projectApprovalTime}}</td>
                    <td class="cen">{{item.investmentCommitteeTime}}</td>
                    <td>
                       <span class="repulse" :class="{'eee':messageList[index].version=='2.0.0','ddd':messageList[index].status=='未审批' || messageList[index].status=='立项否决' ||messageList[index].status=='立项--地总否决'||messageList[index].status=='立项--投发否决'|| messageList[index].status=='立项会超期' || messageList[index].status=='投委否决'|| messageList[index].status=='投委--投发否决'|| messageList[index].status=='投委--地总否决'}"  @click="popp(index)">提交立项审批</span>
                       <span class="repulse" :class="{ddd:messageList[index].status=='立项通过'|| messageList[index].status=='投委会超期'}"  @click="poppp(index)">提交投委审批</span></td>
                </tr>
                <tr v-show="marsta">
                    <td colspan="10" style="text-align:center">
                          <span>暂无数据</span>
                    </td>
                </tr>
              </table>
            <div class="pagination" >
                <div class="pagination-mess" v-if="allPage>1|| messageList.length>=20 && !marsta">
                <span class="box"  v-if="presentPageIndex>1" @click="reduce()"><</span><span class="sumNum">{{presentPageIndex}}/{{allPage}}</span><span class="boxAdd" v-if="presentPageIndex!==allPage"   @click="add()">></span>
                <span class="pagTexta">第</span><input class="indexMsg" ref="indexMsg" v-model="getIndexs" style=""><span class="pagText">页</span>
                <span class="skips" @click="skips">跳转</span>
                </div>
            </div>
          </div>
         </div>
       </div>
      
       <div v-if="shade" style="width:100%;height:100%;background-color: rgba(0, 0, 0, 0.3);position: fixed;top: 0;left: 0;">
          <div class="suspension" v-if="pop">
            <span style="margin-left:10px;">关键信息确认</span><span style="float:right;margin-right:20px;cursor:pointer;" @click="abolish">X</span>
             <hr>
            <span class="red">您即将发起审批,请再次确认一下信息是否正确</span>
            <p><span>获取方式&nbsp;:</span> <span>{{acquiescenceAccessMethods}}</span></p>
            <p>业务类型&nbsp;:</p> 
              <div style="width:370px;float:left;margin-top:-30px;margin-left:75px;">
                  <ul class="acquies">
                    <li v-for="item in acquiescenceBusinessType"><span>{{item}}</span></li>
                  </ul> 
              </div>
            <p v-if="videoUrlStatus!=1"><span>地总视频&nbsp;:</span> <span>未上传</span></p>
            <p v-if="lastInvestVersionIdStatus!=1"><span>经济指标&nbsp;:</span><span>未关联投摸数据</span></p>
            <p v-if="lastInvestVersionIdStatus!=1"><span class="redOne" >您尚未关联投摸数据，请到经济指标页面进行关联!</span></p>
            <p><span class="left" @click="subMiter() ">确认提交</span><span class="right" @click="abolish">取消</span></p>
            
       </div>
       </div>
       <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
     </div>
    </div>
 
</template>
<script>
   export default {
    name: 'heavyArea',
    data() {
      return {
         city:[],
         approvalStatus:[{dictCode: 10,dictName: '未审批'},{dictCode: 11,dictName: '投委--投发否决'},{dictCode: 12,dictName: '投委--地总否决'},{dictCode: 13,dictName: '立项会超期'}, {dictCode: 14,dictName: '立项否决'},{dictCode: 15,dictName: '投委否决'},{dictCode: 16,dictName: '立项审批中'},
                         {dictCode:17,dictName: '立项--地总否决'},{dictCode:18,dictName: '立项--投发否决'},{dictCode: 20,dictName: '立项通过'}, {dictCode: 26,dictName: '投委审批中'}, {dictCode: 30,dictName: '投委通过'},{dictCode:22,dictName: '投委会超期'}],
         versiona:[{dictCode: 0,dictName: '项储2.0.0'}, {dictCode: 1,dictName: '项储3.0.X'},{dictCode: 2,dictName: '项储3.1.X'},{dictCode: 3,dictName: '项储3.2.X'}],
         cityId: '', //城市id
         status: '', //审批状态
         version:'', //项储状态
         projectName:'',//项目名称
         start: 1, //分页起始也
         getIndexs: '', //要跳转的页面
         presentPageIndex: 1, // 当前页面索引值;当前页面减1所得到的值;初始化为0
         heightK: [],  //记录高度
         allPage:20 ,   //总页数 
         length: 20, //单页面展示数量
         shade: false,//立项审批、投委审批确认框
         show1: false, //模糊搜索下拉框
         show3: false, //模糊搜索(暂无数据)的状态
         showSearch:false, //限定搜索框的值在点击搜索按钮前不会更改
         marst: true,
         marsta : false,
         oneself: false,  //城市下拉框禁用
         cityM: '', //城市下拉默认值
         searchData:[],           //模糊搜索列表
         search:'',               //搜索框
         searchMatch:'',          //请求时搜索框的值
         hintIsShow: false,       // 提示消息显示隐藏
         hintMessage: '', // 提示消息
         clickDouble: false,  //记录提交立项审批点击
         now: -1,
         pop:false,
         projectApprovalTime: '', //立项通过天数
         InvestmentCommitteeTime :'', //投委通过天数
         projectApprovalStatus : '', //立项通过天数状态(超过30天，设置为1)
         InvestmentCommitteeStatus :'', //投委通过天数状态(超过60天,设置为1)
         list:[],
         totalCount: '',
         lastInvestVersionIdStatus:'', //经济指标返回状态值
         messageList:[],              //信息列表
         acquiescenceAccessMethods:'',//获取方式
         acquiescenceBusinessType:'', //业务类型
         videoUrlStatus:'',           //视频状态
         projectId:'',                //项目ID
         projectName:"",              //项目名称
         userCode:"",                 //用户登录名
         userName:"",                 //用户名称
         type:"",                     //流程类型：1立项 2 投委
         dide:false
                  }
         
    },
    computed:{
    //<span  class="examine"  v-if="messageList[index].status=='立项审批中' || messageList[index].status=='投委审批中'" ><router-link  target = _blank style="width:100%;height:100%;" :to="{path:'/heavyDetailEntry',query: {id:messageList[index].id,projectName:messageList[index].projectName,auth:1}}">查看</router-link></span><span  class="examine" v-if="messageList[index].status!='立项审批中' && messageList[index].status!='投委审批中'"><router-link  target = _blank style="width:100%;height:100%;" :to="{path:'/heavyDetailEntry',query: {id:messageList[index].id,projectName:messageList[index].projectName,auth:2}}">修改</router-link></span>
    },
    methods:{
       getHeight(){
        this.heightK.push(document.getElementsByClassName("menu-list")[0].clientHeight)
        document.getElementById('conModd').style.height = this.heightK[0]+'px';
     },
      //input框keyup
      get(ev){
           if(ev.keyCode == 13){  
                return true; 
               }  
            if(this.search !==''){
             this.searchData = []
             for(let x in this.list){
               if(this.list[x].indexOf(this.search)!== -1){
                 this.show1 = true;
                 this.searchData.push(this.list[x])
              }else{
                 this.show1 = true;
                 this.show3 = true;
               }
             }
           }
         },
      //获取初始化信息
       post() {
          if(this.cityId=="all"){
          this.cityCode = ''
         }else{
           this.cityCode = this.cityId
         }
         let that = this; 
         this.$http({
          method: 'post',
          url: '/longcity/services/v1/ProjectApprove/findAllProjectDate',
          data: {
                "cityCode" :this.cityCode,
                "version":this.version,
                "status" : this.status,
                "start"  :this.presentPageIndex,
                "length":"20"
            }
        }).then(function (succeed) {
          /* 项目名称集合 */
          that.list = succeed.data.result.projectNameList;
          /* 获取审批信息中的userCode */
          that.userCode = succeed.data.result.userCode
           /* 获取审批信息中的userName */
          that.userName = succeed.data.result.userName
          //console.log(that.userCode)
          /* 总页数 */
          that.allPage = Math.ceil(succeed.data.result.Data.totalCount/20);
          that.totalCount = succeed.data.result.Data.totalCount;
          /* 城市选项内容 */
          let cityList = succeed.data.result.cityMessage
         for (let i=0;i<cityList.length;i++){
          that.city.push({'dictName': cityList[i].name,'dictCode':cityList[i].code})
          }
          /* 转换status的值 */
          that.messageList = succeed.data.result.Data.Data;
            if(that.messageList.length!=0&& that.messageList.length!='undefined'){
            that.setStatus()
          }
        }, function (err) {
          console.log(err);
        })
      },
      /* 点击搜索按钮的请求 */
      getSearch() { 
         if(this.cityId=="all"){
          this.cityCode = ''
         }else{
           this.cityCode = this.cityId
         }
         let that = this;
         this.$http({
          method: 'post',
          url: '/longcity/services/v1/ProjectApprove/findAllProjectDate',
          data: {
                "cityCode":this.cityCode,
                "version" :this.version,
                "status"  : this.status, 
                "projectName":this.searchMatch,
                "start":this.presentPageIndex,
            }
        }).then(function (succeed) {
       if(succeed.data.result.Data.totalCount==0){
            that.marst = false;
            that.marsta = true;
            return
          }else{
          that.marst = true;
          that.marsta = false;
          that.totalCount = succeed.data.result.Data.totalCount
          that.messageList = succeed.data.result.Data.Data;
          that.allPage = Math.ceil(succeed.data.result.Data.totalCount/20);
          that.setStatus()
          }
         }, function (err) {
          console.log(err);
        })
      },
      //提交立项审批的点击
      popp(index){
        if(this.messageList[index].version=='2.0.0'){return}
        if(this.messageList[index].status=='未审批' || this.messageList[index].status=='立项否决' || this.messageList[index].status=='立项--地总否决' || this.messageList[index].status=='立项--投发否决' || this.messageList[index].status=='立项会超期' || this.messageList[index].status=='投委否决'|| this.messageList[index].status=='投委--投发否决'|| this.messageList[index].status=='投委--地总否决'){
         this.projectId=this.messageList[index].id
         this.projectName=this.messageList[index].projectName
         this.type = 1
         this.shade = true;
         this.pop = true;
         this.setMatch(index)
        }else{
        this.shade =false;
        this.pop = false;
        }
        
      },
      //提交投委审批的点击
      poppp(index){
       
        if(this.messageList[index].status=='投委会超期' || this.messageList[index].status=='立项通过' ){
        this.projectId=this.messageList[index].id
        this.projectName=this.messageList[index].projectName
        this.type = 2
        this.shade = true;
        this.pop = true;
        this.setMatch(index)
        }else{
        this.shade =false;
        this.pop = false;
        }
      },
      //关键信息弹框的取消
      abolish(){
        this.pop = false;
        this.shade = false;
      },
      //input的键盘上下
      changeDown: function() {
          this.now++;
          // 到了最后一个选项
         if (this.now === this.searchData.length) {
            this.now = -1;
          }
        },
        changeEnter: function(){
          this.search = this.searchData[this.now];
          this.show1 = false;
         
       //   this.getHeight()
          //document.getElementById("conModd").style.overflow='auto'
         },
        changeUp: function() {
           this.now--;
          // 到了第一个选项
          if (this.now === -2) {
            this.now = this.searchData.length - 1;
          }
       },
      //模糊搜索下拉点击取值
       changeBgc(index) {
       this.now = index;
       this.search = this.searchData[index];
       this.searchData = '';
       this.now = -1;
       this.show3 = false;
    },
     setStatus(){
          let that = this;
        for(let i=0;i<that.messageList.length;i++){
           if(that.messageList[i].status==0 || that.messageList[i].status==10){
             that.messageList[i].status='未审批'}
           if(that.messageList[i].status==11){
             that.messageList[i].status="投委--投发否决"} 
           if(that.messageList[i].status==12){
             that.messageList[i].status="投委--地总否决"} 
           if(that.messageList[i].status==13){
             that.messageList[i].status="立项会超期"} 
           if(that.messageList[i].status==14){
             that.messageList[i].status="立项否决"} 
           if(that.messageList[i].status==15){
             that.messageList[i].status="投委否决"} 
           if(that.messageList[i].status==16){
             that.messageList[i].status="立项审批中"} 
           if(that.messageList[i].status==17){
             that.messageList[i].status="立项--地总否决"} 
           if(that.messageList[i].status==18){
             that.messageList[i].status="立项--投发否决"} 
           if(that.messageList[i].status==20){
             that.messageList[i].status="立项通过"} 
           if(that.messageList[i].status==22){
             that.messageList[i].status="投委会超期"}
           if(that.messageList[i].status==24){
             that.messageList[i].status="投委驳回"}
           if(that.messageList[i].status==26){
             that.messageList[i].status="投委审批中"}
           if(that.messageList[i].status==30){
             that.messageList[i].status="投委通过"}
           if(that.messageList[i].projectApprovalTime==0 || that.messageList[i].projectApprovalTime==''){
             that.messageList[i].projectApprovalTime="--"}
          
           if(that.messageList[i].investmentCommitteeTime==0 || that.messageList[i].investmentCommitteeTime==''){
             that.messageList[i].investmentCommitteeTime="--"}

          }
          
     },
    //分页索引减少
      reduce(){
        this.presentPageIndex--;
        this.getIndexs = '';
        this.$refs.indexMsg.style.border='1px solid #DDDDDD';
       if(this.showSearch){
          this.getSearch()
        }else {
          this.post()
        }
      },
      //分页索引增加
      add(){
        this.presentPageIndex++;
        this.getIndexs = '';
        this.$refs.indexMsg.style.border='1px solid #DDDDDD';
        if(this.showSearch){
          this.getSearch()
        }else {
          this.post()
        }
      },
      //分页的跳转
      skips(){
        if(this.getIndexs<=this.allPage&&this.getIndexs!=0){
        this.$refs.indexMsg.style.border='1px solid #DDDDDD';
        this.presentPageIndex = this.getIndexs;
        if(this.showSearch){
          this.getSearch()
        }else {
          this.post()
        }
        this.getIndexs = '';
        }else {
        this.$refs.indexMsg.style.border='1px solid red';
        }
      },
      //搜索按钮
       searchMsg(){
       this.allPage = '';
       this.searchMatch = this.search;
       this.showSearch = true;
       this.presentPageIndex = 1;
       this.getSearch();
       
       },
       //获取业态信息
        setMatch(index){
      
        let that = this;
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/project/getProjectVerify',
          data: {
            "id":this.messageList[index].id
          }
        }).then(function (succeed) {
           that.acquiescenceAccessMethods = succeed.data.result.summary.accessMethods;
           if(that.acquiescenceAccessMethods==1){
            that.acquiescenceAccessMethods="公开市场"
          }else if(that.acquiescenceAccessMethods==2){
            that.acquiescenceAccessMethods="其他收并购"
          }else if(that.acquiescenceAccessMethods==3){
            that.acquiescenceAccessMethods="在建工程转让"
          }else if(that.acquiescenceAccessMethods==4){
            that.acquiescenceAccessMethods="股权转让"
          }else if(that.acquiescenceAccessMethods==5){
            that.acquiescenceAccessMethods="一二级联动"
          }
           that.acquiescenceBusinessType =succeed.data.result.summary.businessType;
           for(let i=0;i<that.acquiescenceBusinessType.length;i++){
             if(that.acquiescenceBusinessType[i]==1){
               that.acquiescenceBusinessType[i]="持有酒店"
             }
             if(that.acquiescenceBusinessType[i]==2){
               that.acquiescenceBusinessType[i]="持有冠寓"
             }
             if(that.acquiescenceBusinessType[i]==3){
               that.acquiescenceBusinessType[i]="持有写字楼"
             }
             if(that.acquiescenceBusinessType[i]==4){
               that.acquiescenceBusinessType[i]="涉及其他创新业务"
             }
             if(that.acquiescenceBusinessType[i]==5){
               that.acquiescenceBusinessType[i]="涉及持有商业"
             }
             if(that.acquiescenceBusinessType[i]==6){
               that.acquiescenceBusinessType[i]="销售物业"
             }
             if(that.acquiescenceBusinessType[i]==7){
               that.acquiescenceBusinessType[i]="一展"
             } 
             if(that.acquiescenceBusinessType[i]==8){
               that.acquiescenceBusinessType[i]="养老"
             } 
           } 
            that.videoUrlStatus = succeed.data.result.videoUrlStatus;
            that.lastInvestVersionIdStatus = succeed.data.result.lastInvestVersionIdStatus;
            },function (err) {
          console.log(err);
        })
       },
       bbb(){
         console.log("aaa")
       },
       //关键信息确认提交接口
       subMiter() {
        if(this.clickDouble){
          return
        }
        this.clickDouble = true;
       /*  if(this.lastInvestVersionIdStatus!=1){
          return;} */
        let that = this;
        this.$http({
          method: 'post',
          url: '/longcity/services/v1/bpmWorkflow/startWorkflow',
          data: {
           "projectId":this.projectId,      //项目ID
            "projectName":this.projectName,  //项目名称
            "userCode": this.userCode,       //用户信息
            "userName":this.userName,        
            "type": this.type 
           /*   "projectId":"3006",
             "projectName":"验证",
             "userCode":"guoliming",
             "userName":"郭立明",
             "type":"1" */
          }
        }).then(function (succeed) {
           if (succeed.data.code == 200 || succeed.data.code == "200") {
               that.shade =false;
               that.pop = false;
                if(that.showSearch){
                // console.log("111")
                that.getSearch()
                }else {
                //  console.log("222")
                that.post()
               }
               that.clickDouble = false;
            }else{
                that.shade =false;
                that.pop = false;
                that.hint('提交关键信息失败')
                that.clickDouble = false;
            }
        }, function (err) {
           
        })
      },
      //input失焦
      abc(){
        this.show1 = false;
        /* this.showSearch = false; */
         },
        examine(index){
        this.projectName = this.messageList[index].projectName
        this.projectId   = this.messageList[index].id
        this.$emit('transferUser',this.projectName)
      },
      //判断城市下拉的默认情况
      defaultCity(){
        for(let i =0;i<this.city.length;i++){
          if(this.city[i].dictCode=='all'){
            this.cityM = '请选择';
            return 
          }else {
            this.cityM = this.city[0].dictName;
          //  this.cityId = this.city[0].dictName;
          }
      
        }
        if(this.city.length==1){
          this.cityId = this.city[0].dictCode
          this.oneself = true
          return
        }
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
      }
    },
    mounted(){
      this.post();
    },
    updated(){
        this.getHeight()
        this.defaultCity()
      },
   }
</script>
<style scoped>
      body {overflow: hidden; overflow-y:auto}
      #areaProjectApproval{
        -webkit-user-select:none; 
        -moz-user-select:none; 
        -ms-user-select:none; 
        user-select:none;
      }
      #conModd {
      width: 100%;
      /* height:602px; */
      overflow: auto
     }
      .gray {
    background: gray
  }
      .titleNav{
       width: 100%;
       height: 50px;
       background-color: #67649F;
       line-height:50px;
       position:fixed;
       z-index:300;
       
     /*   padding-right:20px; */
      }
      .titleNav .title{
      text-align:center;
      width:20%;
      margin-left:35%;
      ont-family: PingFangSC-Medium;
      font-size: 18px;
      color: #FFFFFF;
    }
    .alternative{
      height:60px;
      background: #E9E9E9;
      line-height:60px;
    }
   .demand{
      display:block;
      width:95px;
      height:36px;
     
      line-height:36px;
      text-align:center;
      background: #67649F;
      border-radius: 4px;
      color:#FFFFFF;
      margin-top:12px;
      cursor: pointer;
    }
    .rest{
      display:block;
      width:95px;
      height:34px;
      line-height:36px;
      text-align:center;
      border-radius: 4px;
      color: #666666;
      margin-top:12px;
      border: 1px solid #67649F;
      cursor: pointer;
    }
    .alternative .evelopment{
      margin-left:2%;
    }
    .search{
      display:block;
      width:95px;
      height:36px;
      line-height:36px;
      text-align:center;
      background: #67649F;
      border-radius: 4px;
      color:#FFFFFF;
      margin-top:12px;
      cursor: pointer;
      }
      .tableBox{
      width:96%;
      margin-left:2%;
     }
      .tableBox th {
      background-color: #E2E2ED;
      color: #67649F;
      line-height: 30px;
      font-size: 14px;
      border: 1px solid #DDDDDD;
      }
     .tableBox .width1 {
      width: 3%;
     }
     .tableBox .width2 {
      width: 7%;
     }
     .tableBox .width5 {
      width: 10%;
     }
     .tableBox .width3 {
      width: 20%;
     }
     .tableBox .width4 {
      width: 5%;
     }
     .examine{
    display: inline-block;
    width: 50px;
    height: 32px;
    margin-left:4%;
    line-height: 32px;
    text-align: center;
    border: 1px solid #67649F;
    border-radius: 4px;
    color: #67649F;
    cursor:pointer;
      }
    .repulse{
    display: inline-block;
    width: 95px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #DDDDDD;
    margin-left:5%;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    cursor:pointer;
    }
     .ddd{
    border:1px solid #67649F;
    color: #67649F;
    border-radius: 4px;
  }
      .eee{
    border:1px solid #DDDDDD;
    color: #DDDDDD;
    border-radius: 4px;
  }
    .sec-tr td{
      border:1px solid #EDEDED;
      height:47px;
      line-height:100%;
      max-width:146px;
    }

     .cen{
      text-align:center;
    }
    .sec-tr p{
      margin-top:5%;
      margin-bottom:5%;
    }
    .actions{
      background: rgba(255,140,140,0.17);
      border-color:#FF8C8C;
    }
    .box{
      width:24px;
      height:24px;
      text-align:center;
      line-height:24px;
      border:1px solid #DDDDDD;
      cursor: pointer;
      position:absolute;
      right:205px;
      top:18px;
    }
    .box:focus{
      border-color: #67649F;
    }
   /*  .pagination{
      position:absolute;
      right:2%;
    } */
    .pagination-mess{
      width:256px;
      float: right;
      margin-right:2%;
      position:relative;
    }
    .pagTexta{
       width:30px;
       text-align:center;
       position:absolute;
       right:100px;
     }
     .boxAdd{
      width:24px;
      height:24px;
      text-align:center;
      line-height:24px;
      border:1px solid #DDDDDD;
      cursor: pointer;
      position:absolute;
      right:130px;
      top:18px;
    }
    .boxAdd:focus{
      border-color: #67649F;
    }
    .skips{
      width:46px;
      height:24px;
      text-align:center;
      line-height:24px;
      border:1px solid #DDDDDD;
      cursor: pointer;
      position:absolute;
      right:0px;
      top:18px;
     }
     .sumNum{
       display:inline-block;
       width:50px;
       text-align:center;
       font-family: PingFangSC-Medium;
       font-size: 12px;
       color: #444444;
       letter-spacing: 0;
       line-height: 12px;
       position:absolute;
       right:155px;
       top:25px;
     }
      .indexMsg{
      width:23px;
      height:23px;
      border-radius:0;
      position:absolute;
      top:18px;
      right:75px;
    }
    .indexMsg:focus{
      border-color: #67649F;
    }
     .pagText{
       width:30px;
       text-align:center;
       position:absolute;
       right:45px;
     }
       /*动画*/
    .ul-enter-active, .ul-leave-active {
      transition: all 0.5s ease-out;
    }

    .ul-enter, .ul-leave-active {
      opacity: 0;
    }
      .active{
     background: rgba(255,140,140,0.17);
     border-color:#FF8C8C;
    }
     .suspension{
      width:450px;
      /* min-height:240px;
      max-height:360px; */
      position:absolute;
      left:33%;
      background:white;
      border:1px solid gray;
      border-radius:5px;
      /* z-index:1000; */
      top:30%;
    }
    .suspension p{
      margin-left:20px;
      font-size:16px;
    }
    .left{
      width:70px;
      height:30px;
      text-align:center;
      line-height:30px;
      border:1px solid #DDDDDD;
      margin-left:25%;
      cursor: pointer;
      border-radius:5px;
      margin-top:20px;
      margin-bottom:15px;
      font-size:16px;
      }
    .right{
      width:60px;
      height:30px;
      text-align:center;
      line-height:30px;
      border:1px solid #DDDDDD;
      margin-left:20px;
      cursor: pointer;
      margin-top:20px;
      margin-bottom:15px;
      border-radius:5px;
    }
    .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .searchText{
    width:100%;
    height:33px;
  }
  .searchText:hover{
     border-color: #8391a5;
  }
  .searchText:focus{
    border:1px solid  #20a0ff;
  }
  .search-ul{
      border:1px solid #DDDDDD;
      margin-top:-12px;
      background:#FFFFFF;
      z-index:200;
      width:100%;
      position:absolute;
      max-height:200px; 
      overflow:auto; 
  }
  .search-ul li{
    width:100%;
    word-wrap: break-word;  
    word-break: normal;  
    line-height:30px;
    text-align:left;
    cursor: pointer;
  }
  .search-ul li:hover{
    background:#DDDDDD;
  }
  .search-ul li a{
    width:100%;
  }
  .search-ul li a:hover{
    background:#DDDDDD;
  }
 
  .acquies{
    width:100%;
    height:100%;
    margin-left:20px;
  }
  .acquies li{
    float:left;
    height:30px;
    margin-right:10px;
    line-height:30px;
    text-align:center;
    background:#DDDDDD;
    padding-right:10px;
    margin-top:5px;
    border-radius:5px;
  }
  .acquies li span{
    width:100%;
    text-align:center;
    margin-left:5%;
    margin-right:5%;
  }
  .red{
   color:red;
   font-size:14px;
   margin-left:20px;
   margin-top:-5px;
   font-weight:800
  }
  .redOne{
   color:red;
   font-size:14px;
   margin-top:-5px;
   font-weight:800
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
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.4);
  }
  #conModd.overflow{overflow:hidden}
</style>
