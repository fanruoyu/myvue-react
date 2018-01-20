<template>
   <div id="areaProjectApproval" style="overflow:-Scroll;overflow-y:hidden;;background:white;" >
     <div class="closeNav" >
      <p class=" tit fl" >轻资产地区审批流</p>
    </div>
    <div id="conModd" :class='{overflow:show1==true}'>
      <div class="newProject">
            <div class="alternative" >
             <el-row>
               <el-col :span="5" class="evelopment">
                    <el-col :span="9"><span>项目所在城市</span></el-col>
                    <el-col :span="1"><span></span></el-col>
                    <el-col :span="12">
                          <el-select v-model="cityId" :clearable="true" :disabled="city.length==1" :placeholder="cityM"  class="">
                            <el-option v-for="item in city" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
                            </el-option>
                          </el-select>
                    </el-col>
               </el-col>
               <el-col :span="5" style="text-align:center;">
                    <el-col :span="6"><span>审批状态</span></el-col>
                    <el-col :span="1"><span></span></el-col>
                    <el-col :span="15">
                          <el-select  v-model="approvalStatus" :clearable="true"  placeholder="请选择" class="">
                            <el-option v-for="item in status" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
                            </el-option>
                          </el-select>
                    </el-col>
               </el-col>
               <el-col :span="5" style="text-align:center;">
                    <el-col :span="9"><span>签约状态</span></el-col>
                    <el-col :span="1"><span></span></el-col>
                    <el-col :span="12">
                        <el-select  v-model="contractStatus" :clearable="true"  placeholder="请选择" class="">
                            <el-option v-for="item in conStatus" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
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
                  <th class="" style="width:18%; max-width:130px;">项目名称</th>
                  <th class="" style="width:18%;">项目地址</th>
                  <th class="" style="width:10%">所属城市</th>
                  <th class="" style="width:10%">签约状态</th>
                  <th class="" style="width:10%">审批状态</th>
                  <th class="" style="width:29%;min-width:300px;">操作</th>
                </tr>
                 <tr class="sec-tr" v-if="marst" v-for="(item,index) in messageList">
                    <td class="cen"><p>{{index+1}}</p></td>
                    <td class="cen"><p style="width:90%;margin-left:5%;word-wrap:break-word ">{{item.projectName}}</p></td>
                    <td class="cen"><p>{{item.address}}</p></td>
                    <td class="cen"><p>{{item.cityName}}</p></td>
                    <td class="cen">{{item.contractStatus | capitalize}}</td>
                    <td class="cen">{{item.approvalStatus | approvals}}</td>
                    <td><span class="examine"  v-if="messageList[index].approvalStatus== 7 || messageList[index].approvalStatus== 6 || messageList[index].approvalStatus== 4 || messageList[index].approvalStatus== 2" ><router-link style="width:100%;height:100%;" :to="{path:'/heavyDetailEntry',query: {id:messageList[index].id,projectName:messageList[index].projectName,auth:1}}">查看</router-link></span><span class="examine" v-if="messageList[index].approvalStatus== 8 || messageList[index].approvalStatus== 5 || messageList[index].approvalStatus== 1 || messageList[index].approvalStatus== 0 || messageList[index].approvalStatus== 3"><router-link style="width:100%;height:100%;" :to="{path:'/heavyDetailEntry',query: {id:messageList[index].id,projectName:messageList[index].projectName,auth:2}}">修改</router-link></span>
                       <span class="repulse"   v-if="messageList[index].contractStatus==1" @click="signDetails(index)" >签约详情</span>
                       <span class="repulse"   v-if="messageList[index].contractStatus==2" @click="lossDetails(index)" >流失详情</span>
                    </td>
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
      
       <div v-if="pop" style="width:100%;height:100%;background-color: rgba(0, 0, 0, 0.3);position: fixed;top: 0;left: 0;z-index:2000;" v-loading="loadingA"
                 element-loading-text="文件下载中,请耐心等待"
                 element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.5)">
         
       <div class="suspension" v-if="qStatus">
        <span style="margin-left:10px;">签约详情</span><span style="float:right;margin-right:20px;cursor:pointer;" @click="abolishX">X</span>
        <hr>
        <table style="width:60%;margin-left:10px;margin-top:15px;">
                    <tr v-for="(item,index) in  loadContract" >
                      <td colspan="5" style="max-width:200px;word-break: break-all; word-wrap:break-word;line-height:100%;">
                        <span class="downloadUrlA">{{item.fileName}}</span>
                       </td>
                      <td ><a :href="item.fileUrl" class="delete" target="_Blank">下载</a></td>
                    </tr>
                </table>
      </div>
       <div class="suspension" v-if="cStatus">
        <span style="margin-left:10px;">流失详情</span><span style="float:right;margin-right:20px;cursor:pointer;" @click="abolishC">X</span>
        <hr>
        <p style="width:94%;margin-left:3%;border:1px solid #DDDDDD;min-height:80px;margin-bottom:20px;">{{loadConsider}}</p>
      </div>
       </div>
     </div>
    </div>
 
</template>
<script>
   export default {
    name: 'heavyArea',
    data() {
      return {
         city:[],
         status:[{dictCode: 0,dictName: '投委否决'},{dictCode: 1,dictName: '投委有条件通过'},{dictCode: 2,dictName:'投委通过'},{dictCode: 3,dictName: '地总否决'}, {dictCode: 4,dictName: '投委审批中'},{dictCode: 5,dictName: '地区冠寓负责人否决'},{dictCode: 6,dictName: '地总审批中'},
                         {dictCode:7,dictName: '地区冠寓负责人审批中'},{dictCode:8,dictName: '未审批'}],
         conStatus:[{dictCode: 0,dictName: '待签约'}, {dictCode: 1,dictName: '已签约'},{dictCode: 2,dictName: '流失'}],
         cityId: '', //城市id
         approvalStatus: '', //审批状态
         contractStatus:'', //签约状态
         contract:[],          //合同存储
         radiobutton:'',       //单选框选中的值
         considerationText:'',  //流失文本框
         loadConsider:'',       //流失详情展示内容
         isPopp: true,        //弹框签约
         loss: false,         //弹框流失
         qStatus: false,       //签约详情
         loadContract:'',      //签约详情存储
         loadingA: false,     //加载中
         subMit:false,        //保存按钮的禁用
         url: this.$baseUrl+'longcity/services/v1/upload/single',
         fileName:'',         //上传的文件名称
         extraField:'',       //项目ID
         cStatus: false,
         indexs: '',   //记录index
         fileData5: {
           file: '',
           projectId: ''
        },
         projectName:'',//项目名称
         start: 1, //分页起始也
         getIndexs: '', //要跳转的页面
         presentPageIndex: 1, // 当前页面索引值;当前页面减1所得到的值;初始化为0
         allPage:20 ,   //总页数 
         length: 20, //单页面展示数量
         M: 100,     //上传合同不超过100M
         shade: false,//立项审批、投委审批确认框
         show1: false, //模糊搜索下拉框
         show3: false, //模糊搜索(暂无数据)的状态
         showSearch:false, //限定搜索框的值在点击搜索按钮前不会更改
         heightK: [],  //记录高度
         marst: true,
         marsta : false,
         cityM: '', //城市下拉默认值
         searchData:[],           //模糊搜索列表
         search:'',               //搜索框
         searchMatch:'',          //请求时搜索框的值
         now: -1,
         pop:false,               //遮罩层
         list:[],
         totalCount: '',
         lastInvestVersionIdStatus:'', //经济指标返回状态值
         messageList:[],              //信息列表
         projectId:'',                //项目ID
         projectName:"",              //项目名称
         userCode:"",                 //用户登录名
         userName:"",                 //用户名称
         type:""                      //流程类型：1立项 2 投委
    }
  },
  filters: {
  approvals: function (value) {
   // value = value.toString()
    // if(value){return }
    if(value=='0'){ return value="投委否决"}
    if(value=='1'){ return value="投委有条件通过"}
    if(value=='2'){ return value="投委通过"}
    if(value=='3'){ return value="地总否决"}
    if(value=='4'){ return value="投委审批中"}
    if(value=='5'){ return value="地区冠寓负责人否决"}
    if(value=='6'){ return value="地总审批中"}
    if(value=='7'){ return value="地区冠寓负责人审批中"}
    if(value=='8'){ return value="未审批"}
    return
  },
  capitalize:function(value){
    if(value=='0'){ return value="待签约"}
    if(value=='1'){ return value="已签约"}
    if(value=='2'){ return value="流失"}
    return
  }
},
    computed:{
     
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
          url: '/longcity/services/light/v1/approve/findLightProjectDate',
          data: {
                "cityCode" :this.cityCode,
                "approvalStatus":this.approvalStatus,
                "contractStatus" : this.contractStatus,
                "start"  :this.presentPageIndex,
                "length":"20" 
                }
        }).then(function (succeed) {
          /* 项目名称集合 */
          that.list = succeed.data.result.projectNameList;
          /* 总页数 */
          that.allPage = Math.ceil(succeed.data.result.Data.totalCount/20);
          that.totalCount = succeed.data.result.Data.totalCount;
          /* 城市选项内容 */
          let cityList = succeed.data.result.cityMessage
          for (let i=0;i<cityList.length;i++){
          that.city.push({'dictName': cityList[i].name,'dictCode':cityList[i].code})
          } 
        
          that.messageList = succeed.data.result.Data.Data;
          //console.log(that.messageList)
        }, function (err) {
          console.log(err);
        })
      },
      /*点击搜索按钮的请求 */
        getSearch() { 
         if(this.cityId=="all"){
          this.cityCode = ''
         }else{
           this.cityCode = this.cityId
         }
         //console.log(this.contractStatus)
         let that = this;
         this.$http({
          method: 'post',
          url: '/longcity/services/light/v1/approve/findLightProjectDate',
          data: {
                "cityCode": this.cityCode,  
                "approvalStatus": this.approvalStatus,
                "contractStatus":this.contractStatus,
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
          }
         }, function (err) {
          console.log(err);
        })
      },
      //关键信息弹框的取消
      abolish(){
        this.pop = false;
        this.shade = false;
        this.loss = false;
        this.contract = [];
        this.considerationText ='';
      },
      //点击签约详情
      signDetails(index){
        this.indexs = index;
        this.pop = true;
        this.qStatus = true;
        this.getSignDs();
        console.log(this.indexs)
      },
      //点击流失详情
      lossDetails(index){
        this.indexs = index;
        this.pop = true;
        this.cStatus = true;
        this.getLossDs();
      },
      abolishX(){
        this.pop = false;
        this.qStatus = false;
        this.contract = [];
      },
       abolishC(){
        this.pop = false;
        this.cStatus = false;
        this.loadConsider = '';
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
          this.getHeight()
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
        console.log(this.showSearch)
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
      signingOn(){
      this.isPopp = true;
      this.loss   = false;
      },
      erosion(){
         this.isPopp = false;
         this.loss   = true;
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
          }
        }
        if(this.city.length==1){
          this.cityId = this.city[0].dictCode
        }
      },
      //获取签约详情
      getSignDs(){
         let that = this; 
         this.$http({
          method: 'post',
          url: '/longcity/services/light/v1/approve/lightProject/findLoseOrConvention',
          data: {
                 "lightProjectId" : that.messageList[that.indexs].id,
                 "status"         :  '1'
                }
        }).then(function (succeed) {
           that.loadContract = succeed.data.result
        }, function (err) {
          console.log(err);
        })
      },
        //获取流失详情
      getLossDs(){
         let that = this; 
         this.$http({
          method: 'post',
          url: '/longcity/services/light/v1/approve/lightProject/findLoseOrConvention',
          data: {
                 "lightProjectId" :that.messageList[that.indexs].id,
                 "status"         :  '2'
                }
        }).then(function (succeed) {
         that.loadConsider = succeed.data.result[0].fieldValue
        }, function (err) {
          console.log(err);
        })
      }
      }, 
    mounted(){
        this.post();
      },
    updated(){
        this.getHeight()
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
     /*  height:602px; */
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
       z-index:100;
       left:0px;
     /*   padding-right:20px; */
      }
      .titleNav .title{
      text-align:center;
    /*   margin-left:43%; */
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
    color: #67649F;
    margin-left:5%;
    border: 1px solid #67649F;
    border-radius: 4px;
    cursor:pointer;
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
      min-height:200px;
      max-height:360px;
      position:absolute;
      left:33%;
      background:white;
      border:1px solid gray;
      border-radius:5px;
      z-index:1500;
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
      margin-top:10px;
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
      margin-top:10px;
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
      z-index:2000;
      width:100%;
      position:absolute;
      max-height:200px; 
      overflow:auto; 
  }
  .search-ul li{
    width:100%;
   /*  height:30px; */
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
  #conModd.overflow{overflow:hidden}
  .clickUpa{
    width:70px;
    height:30px;
    line-height:30px;
    text-align:center;
    border:1px solid #DDDDDD;
    border-radius:4px;
    margin-left:10px;
    margin-top:20px;
  }
  .delete{
   width:60px;
   height:25px;
   line-height:25px;
   text-align:center;
   border:1px solid #DDDDDD;
   border-radius:4px;
  }
  .downloadUrl{
    height:80%;
    margin-top:10%;
  }
   .downloadUrlA{
    height:80%;
  }
   .download{
    width:60px;
    height:30px;
    line-height:
  }
  .decision{
    font-size: 14px;
    resize: none;
    width: 94%;
    position:relative;
    min-height:125px;
    overflow:hidden;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    background-color: #fff;
    margin-top:20px;
    margin-left:3%;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
    .decision:hover{
     border-color: #8391a5;
    }
   .decision:focus{
      outline: 0;
      border-color: #20a0ff
    }
   .textareaBox{
     /* position:absolute; */
   }
  .statistics{
    position: relative;
    left: 85%;
    bottom:40px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #CCCCCC;
    letter-spacing: 0;
    line-height: 14px;
  }
</style>
