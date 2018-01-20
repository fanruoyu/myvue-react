<template>
   <div id="areaProjectApproval" style="overflow:-Scroll;overflow-y:hidden;;background:white;">
    <div class="closeNav" >
      <p class=" tit fl" >重资产集团审批管理</p>
    </div>
    <div id="conModd" :class='{overflow:show1==true}'>
      <div class="newProject">
            <div class="alternative" >
             <el-row>
                <el-col :span="5" class="evelopment">
                    <el-col :span="9"><span>项目所在城市</span></el-col>
                    <el-col :span="1"><span></span></el-col>
                    <el-col :span="12">
                          <el-select v-model="cityId" :disabled="city.length==1" :placeholder="cityM" :clearable="true"    class="">
                            <el-option v-for="item in city" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
                            </el-option>
                          </el-select>
                    </el-col>
               </el-col>
               <el-col :span="5" style="text-align:center;">
                    <el-col :span="6"><span>审批状态</span></el-col>
                    <el-col :span="1"><span></span></el-col>
                    <el-col :span="15">
                          <el-select v-model="status" :clearable="true"  placeholder="请选择" class="">
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
                          <div>
                          <input v-model="search" ref="search" placeholder="请输入关键字" class="searchText"  @blur="abc"   @keyup="get($event)" ></input>
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
            <div style="margin-top:25px;">
            <table class="tableBox" style="margin-top:30px;">
                <tr style="height:40px;">
                  <th class="" style="wdith:5%">序号</th>
                  <th class="" style="width:16%;max-width:140px;">项目名称</th>
                  <th class="" style="width:16%">项目地址</th>
                  <th class="" style="width:7%">所属城市</th>
                  <th class="" style="width:7%">项目版本</th>
                  <th class="" style="width:7%">审批状态</th>  
                  <th class="" style="width:10%">立项通过天数</th>
                  <th class="" style="width:10%">投委通过天数</th>
                  <th class="" style="width:22%">操作</th>
                </tr>
                <tr class="sec-tr" v-if="marst" v-for="(item,index) in messageList" :class="{'active':item.investmentCommitteeStatus==1 || item.projectApprovalStatus==1}">
                    <td class="cen"><span>{{index+1}}</span></td>
                    <td class="cen" ><span style="width:90%;margin-left:5%;word-wrap:break-word ">{{item.projectName}}</span></td>
                    <td class="cen" ><span>{{item.address}}</span></td>
                    <td class="cen"><span>{{item.cityName}}</span></td>
                    <td class="cen"><span>{{item.version}}</span></td>
                    <td class="cen"><span>{{item.statusA}}</span></td>
                    <td class="cen">{{item.projectApprovalTime}}</td>
                    <td class="cen">{{item.investmentCommitteeTime}}</td>
                    <td><div style="width:50%;margin-left:25%;"><span class="repulse" v-if="item.investmentCommitteeStatus==1 || item.projectApprovalStatus==1" @click="repulse(index)">打回</span></div></td>
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
       <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
     </div>
  </div>
</template>
<script>
   export default {
     name: 'heavyGroup',
    data() {
     return {
        n:1,
         city:[],
          approvalStatus:[{dictCode: 10,dictName: '未审批'},{dictCode: 11,dictName: '投委--投发否决'},{dictCode: 12,dictName: '投委--地总否决'},{dictCode: 13,dictName: '立项会超期'}, {dictCode: 14,dictName: '立项否决'},{dictCode: 15,dictName: '投委否决'},{dictCode: 16,dictName: '立项审批中'},
                         {dictCode:17,dictName: '立项--地总否决'},{dictCode:18,dictName: '立项--投发否决'},{dictCode: 20,dictName: '立项通过'}, {dictCode: 26,dictName: '投委审批中'}, {dictCode: 30,dictName: '投委通过'},{dictCode:22,dictName: '投委会超期'}],
         versiona:[{dictCode: 0,dictName: '项储2.0.0'}, {dictCode: 1,dictName: '项储3.0.X'},{dictCode: 2,dictName: '项储3.1.X'},{dictCode: 3,dictName: '项储3.2.X'}],
         cityId: '', //城市id
         cityCode: '',
         status: '', //审批状态
         version:'', //项储状态
         hintIsShow: false, // 提示消息显示隐藏
         hintMessage: '', // 提示消息
         projectName:'',//项目名称
         projectId:'',//项目id
         start: 1, //分页起始也
         getIndexs: '', //要跳转的页面
         presentPageIndex: 1, // 当前页面索引值;当前页面减1所得到的值;初始化为0
         allPage: '',   //总页数 
         totalCount:'',
         heightK: [],  //记录高度
         length:20, //单页面展示数量
         cityList:[], //城市信息
         cityM:'',
         searchMatch:'',
         shade: false,
         show1 : false,
         show3 : false,
         showSearch:false,
         marst: true,
         marsta : false,
         searchData:[],
         search:'', //搜索框
         now: -1,
         pop:false,
         projectApprovalTime: '', //立项通过天数
         InvestmentCommitteeTime :'', //投委通过天数
         projectApprovalStatus : '', //立项通过天数状态(超过30天，设置为1)
         InvestmentCommitteeStatus :'', //投委通过天数状态(超过60天,设置为1)
         list:[],
         finallyLength: 10, // 获取当前页面切换后所显示的长度值;例:第二页的时候该值为presentPageIndex*10+10所得
         messageList:[]
                 }
              },
   /*  computed:{
      cityMaster(){
        return this.city[0].dictName
      }
    }, */
   // created(){this.getHeight()},
    mounted() {
          this.post();
       // this.cityM = this.city[0].dictName
       //<span  class="examine" ><router-link  target = _blank style="width:100%;height:100%;" :to="{path:'/heavyDetailEntry',query: {id:messageList[index].id,projectName:messageList[index].projectName,auth:1}}">查看</router-link></span>
       },
       
     updated(){
        this.getHeight()
        this.defaultCity()
      },
      props: {
      childParm: Object
    },
     watch: {
        /*   // 如果路由有变化，会再次执行该方法
          "$route": "fetchDate" */
        },
    methods:{
      fetchDate(){
          console.log("路由跳转")
      },
      getHeight(){
       this.heightK.push(document.getElementsByClassName("menu-list")[0].clientHeight)
       document.getElementById('conModd').style.height = this.heightK[0]+'px';
      // console.log(document.getElementsByClassName("header")[0].clientWidth - document.getElementsByClassName("menu-list")[0].clientWidth)
      // document.getElementById('titleNav').style.width = document.getElementsByClassName("header")[0].clientWidth - document.getElementsByClassName("menu-list")[0].clientWidth +'px'
     // document.getElementById('title').style.margin-right
      },
     
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
                "cityCode":this.cityCode,
                "start":this.presentPageIndex,
                 "version":this.version,
                "status":this.status
            }
        }).then(function (succeed) {
          that.list = succeed.data.result.projectNameList;
          let citiList = succeed.data.result.cityMessage
          for (let i=0;i<citiList.length;i++){
            that.city.push({'dictName': citiList[i].name,'dictCode':citiList[i].code})
          }
           that.messageList = succeed.data.result.Data.Data;
          
         if(that.messageList.length!=0&& that.messageList.length!='undefined'){
            that.setStatus()
          }
         that.allPage = Math.ceil(succeed.data.result.Data.totalCount/20);
        }, function (err) {
          console.log(err);
        })
      },
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
                "status":this.status,
                "version":this.version,
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
          //console.log(err);
        })
      },
      abc(){
        this.show1 = false;
       /*  this.showSearch = false; */
     /*    console.log("失去焦点") */
      },
    
      popp(){
        this.shade = true;
        this.pop = true;
      },
      abolish(){
        this.pop = false;
        this.shade = false;
      },
     /*  changeDown: function() {
         @keydown.enter="changeEnter()"  @keydown.down="changeDown()" @keydown.prevent.up="changeUp()"
          this.now++;
          // 到了最后一个选项
          if (this.now === this.searchData.length) {
            this.now = -1;
          }
        
        },
        changeEnter: function(){
         this.search.innerHTML = this.searchData[this.now]; 
          this.show1 = false;
         },
        changeUp: function() {
          this.now--;
          // 到了第一个选项
          if (this.now === -2) {
            this.now = this.searchData.length - 1;
          }
       }, */
       /* inputFocus(){
         this.now =-1;
         },
       smart(){
         this.searchData = '';
         this.show3 = false;
       },
       getList(index){
        this.search = this.searchData[index] 
       }, */
       changeBgc(index) {
       this.now = index;
       this.search = this.searchData[index];
       this.searchData = '';
       this.now = -1;
       this.show3 = false;
    },
      //分页索引减少/增加
      reduce(){
        //console.log(this.showSearch)
        this.presentPageIndex--;
        this.getIndexs = '';
        this.$refs.indexMsg.style.border='1px solid #DDDDDD';
        if(this.showSearch){
          this.getSearch()
        }else {
          this.post()
        }
      },
      add(){
       //  console.log(this.showSearch)
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
         this.post();
        this.getIndexs = '';
        }else {
        this.$refs.indexMsg.style.border='1px solid red';
        }
      },
        handleCurrentChange (val) {
        this.presentPageIndex = (val - 1) * 20
        this.finallyLength = (val - 1) * 20 + 20
       },
       //打回操作
       repulse(index){
      /*    console.log(this.messageList[index].id)
         console.log(this.messageList[index].version) */
       let that = this
        this.$confirm('是否确定要打回', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
         }).then(() => {
         let that = this;
         this.$http({
          method: 'post',
          url: '/longcity/services/v1/ProjectApprove/updateVersion',
          data: {
                 "id": this.messageList[index].id,
                 "version" : this.messageList[index].version,
                 "status"  : this.messageList[index].status
                /*  "id":1,
                 "version":"项储2.0.0" */
            }
        }).then(function (succeed) {
          if (succeed.data.code == 200 || succeed.data.code == "200") {
              that.getSearch()
           }
        }, function (err) {
              console.log(err);
        })
      })
      },
      examine(index){
        this.projectName = this.messageList[index].projectName
        this.projectId   = this.messageList[index].id
        this.$emit('transferUser',this.projectName)
      },
       searchMsg(){
       this.allPage = '';
       this.searchMatch = this.search;
       this.showSearch = true;
       this.presentPageIndex = 1;
       this.getSearch(); 
       },
          setStatus(){
            let that = this;
        for(let i=0;i<that.messageList.length;i++){
           if(that.messageList[i].status==0 || that.messageList[i].status==10){
             that.messageList[i].statusA='未审批'}
           if(that.messageList[i].status==11){
             that.messageList[i].statusA="投委--投发否决"} 
           if(that.messageList[i].status==12){
             that.messageList[i].statusA="投委--地总否决"} 
           if(that.messageList[i].status==13){
             that.messageList[i].statusA="立项会超期"} 
           if(that.messageList[i].status==14){
             that.messageList[i].statusA="立项否决"} 
           if(that.messageList[i].status==15){
             that.messageList[i].statusA="投委否决"} 
           if(that.messageList[i].status==16){
             that.messageList[i].statusA="立项审批中"} 
           if(that.messageList[i].status==17){
             that.messageList[i].statusA="立项--地总否决"} 
           if(that.messageList[i].status==18){
             that.messageList[i].statusA="立项--投发否决"} 
           if(that.messageList[i].status==20){
             that.messageList[i].statusA="立项通过"} 
           if(that.messageList[i].status==22){
             that.messageList[i].statusA="投委会超期"}
          if(that.messageList[i].status==26){
             that.messageList[i].statusA="投委审批中"}
           if(that.messageList[i].status==30){
             that.messageList[i].statusA="投委通过"}
           if(that.messageList[i].projectApprovalTime==0 || that.messageList[i].projectApprovalTime==''){
             that.messageList[i].projectApprovalTime="--"}
          
           if(that.messageList[i].investmentCommitteeTime==0 || that.messageList[i].investmentCommitteeTime==''){
             that.messageList[i].investmentCommitteeTime="--"}
             
             that.messageList[i].version = "项储"+ this.messageList[i].version;
          }
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
    
    
  }
</script>
<style scoped>
      #areaProjectApproval{
        -webkit-user-select:none; 
        -moz-user-select:none; 
        -ms-user-select:none; 
        user-select:none;
      }
      #conModd {
      width: 100%;
     /*  height:590px; */
      overflow: auto
     }
      #titleNav{
       width: 100%;
       height: 50px;
       background-color: #67649F;
       line-height:50px;
       position:fixed;
       z-index:300;
      }
      #titleNav #title{
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
    /*  .tableBox .width5 {
      width: 5%;
     
     }
     .tableBox .width1 {
      width: 10%;
     }
     .tableBox .width15 {
      width: 15%;
     }
     .tableBox .width3 {
      width: 30%;
     }
     .tableBox .width4 {
      width: 5%;
     } */
    .examine{
    display: inline-block;
    width: 50px;
    height: 32px;
    position:relative;
    left:0;
    line-height: 32px;
    text-align: center;
    border: 1px solid #67649F;
    border-radius: 4px;
    cursor:pointer;
    color: #67649F;
      }
    .repulse{
    display: inline-block;
    width: 50px;
    height: 32px;
    line-height: 32px;
    text-align: center;
   /*  position:relative; */
    float:right;
    border: 1px solid #67649F;
    border-radius: 4px;
    cursor:pointer;
    color: #67649F;
    }
    .sec-tr td{
      border:1px solid #EDEDED;
      height:47px;
      line-height:100%;
      max-width:140px;
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
    .pagination-mess{
      width:256px;
      float: right;
      margin-right:2%;
      position:relative;
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
     .pagTexta{
       width:30px;
       text-align:center;
       position:absolute;
       right:100px;
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
       .gray {
     background: gray
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
      z-index:2000;
      width:23%;
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
 #conModd.overflow{overflow:hidden}
</style>
