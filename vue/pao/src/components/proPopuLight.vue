<template>
  <div class="proPopu">
    <div class="title">
      <div class="left">
        <span>添加项目成员</span>
        <span>(</span>
        <span>{{inputPerson2}}</span>
        <!--<span>/</span>-->
        <!--<span>{{allPerson}}</span>-->
        <span>)</span>
      </div>
      <div class="right" @click="closeAside">
        <img class="img" src="../../src/assets/images/closeWhite.png" alt="">
      </div>
    </div>
    <div class="content">
      <el-select
        v-model="value9"
        multiple
        filterable
        remote
        value
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading">
        <el-option v-for="item in options4" :key="item.label.showName" :label="item.label.showName" :value="item.label.showName" :inputData="item.label" style="height: 90px">
          <!--<div class="bottom">-->
          <!--<p>inputData:{{inputData}}sssssssssssss</p>-->
          <div class="proPersonnelList">
              <div class="left">
                <img :src="item.label.photourl" alt="" v-if="item.label.photourl">
                <img :src="defaultAvatar" alt="" v-else>
                <!--<img src="../../src/assets/images/defaultAvatar.png" alt="">-->
              </div>
              <div class="right">
                <!--<p>{{item.label}}</p>-->
                <p>{{item.label.showName}}</p>
                <p><span>{{item.label.descrshort}}</span><span>{{item.label.jobDescr}}</span></p>
              </div>
            </div>
          <!--</div>-->
        </el-option>
      </el-select>
      <div class="bottom">
        <!--;toParentPersonnelList-->
        <!--<el-button type="promise" @click="accessPersonnelInfo(['test3','yening'])"  class="">确定</el-button>-->
        <el-button type="promise" v-model="value9" @click="accessPersonnelInfo(value9)"  class="">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'proPopuLight',
      data() {
        return {
          states:[],
          /*输入框中选定的名称*/
          value9: [],
          /*传给comProject页面的数据*/
          value10: [],
          options4: [],
          list: [],
          personnelList:[],
          arr:[],
          loading: false,
          person:'',
          inputPerson:0,
          allPerson:0,
          /*默认头像路径*/
          defaultAvatar:require("../../src/assets/images/defaultAvatar.png"),
        }
      },
      mounted() {},
    computed: {
      // 一个计算属性的 getter
      inputPerson2: function () {
        // `this` 指向 vm 实例
        return  this.inputPerson=this.value9.length;
      }
    },
      methods: {
        /*员工名称模糊搜索 搜索框输入的时候自动调用remoteMethod*/
        remoteMethod(query) {
          var that = this;
          that.options4 = [];
          if (query !== '') {
            /*根据输入值远程获取员工列表*/
            this.$http({
              method:'post',
              url:'/longcity/services/v1/user/filter',
              data:{"name":query}
            }).then(function (succeed) {
              if(succeed.data.code==200 || succeed.data.code=="200"){
                that.states=succeed.data.result;
                that.list = that.states.map(item => {
                  return { value: item, label: item};
                });
                that.loading = true;
                setTimeout(() => {
                  that.loading = false;
                  that.options4 = that.list.filter(item => {
                      return item.label.name.toLowerCase()
                          .indexOf(query.toLowerCase()) > -1
                    }
                  );
                }, 200);
              }
            },function (err) {
              console.log(err);
            })
          } else {
            that.allPerson=that.options4.length;
            that.options4 = [];
          }
//          console.log(this.options4)
        },
        /*自定义方法*/
        /*点击x关闭proPopu页面*/
        closeAside: function() {
          this.$emit('closeAside');
          this.value9=[];
          this.inputPerson=0;
          this.allPerson=0;
        },
        /*点击确定关闭proPopu页面，传出value9*/
        subAside: function() {
          this.$emit('subAside',this.personnelList);
          this.value9=[];
          this.inputPerson=0;
          this.allPerson=0;
        },
        /*暂时未使用*/
        toParentPersonnelList(){
          this.$emit("toParentPersonnelList",this.value10);
          /*获取选定人员的详细信息*/
        },
        /*通过接口获取人员模糊搜索的列表信息*/
        accessPersonnelList:function (value) {

        },
        /*通过接口获取人员模糊搜索的详细信息*/
        accessPersonnelInfo:function (arr) {
          var that = this;
          this.$http({
            method:'post',
            url:'/longcity/services/v1/user/userInfoList',
            data:arr,
          }).then(function (succeed) {
//            console.log(succeed);
              that.personnelList=[];
              succeed.data.result.forEach(item=>{
              let temporaryObjects={};
              temporaryObjects.userCode=item.psEmployeeCode;
              //temporaryObjects.id=item.id;
              temporaryObjects.shName=item.showName;
              temporaryObjects.title=item.jobDescr;
              temporaryObjects.group=item.deptDescr;
              temporaryObjects.avatar=item.photourl;
              temporaryObjects.psEmployeeCode=item.psEmployeeCode;

              that.personnelList.push(temporaryObjects);
          });
//            console.log(that.personnelList);
            if(that.personnelList.length<1){
                return;
            }else{
              that.subAside();
            }
          },function (err) {
            console.log(err);
          })
        },
        interfaceTest:function () {
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
          },function (err) {
             console.log(err);
           })
        },
        /*模拟登陆，获取token*/
      },
  }
</script>
<style>
  @import "../assets/css/common.css";
  @import "../assets/css/base.css";

  .proPopu{
      width: 600px;
      height: 400px;
      /*border: 1px solid #000;*/
    }
    .proPopu .title{
      width: 600px;
      height: 50px;
      /*border: 1px solid #000;*/
      background-color: #67649F;
      border-radius: 4px;
      position: relative;
    }
    .proPopu .title div{
      position: absolute;
      top:50%;
      /*left: 50%;*/
      color:white;
    }
    .proPopu .title .left{
      transform: translate(10%,-50%);
    }
    .proPopu .title .left span{
      font:16px PingFangSC-Medium ;
    }
    .proPopu .title .right{
      transform: translate(550px,-50%);
    }
    .proPopu .title .right img{
      width: 24px;
      width: 24px;
      color:white
    }
    .proPopu .content{
      background-color: white;
      width: 600px;
      /*border: 1px solid #000;*/
      height: 80%;
      text-align: center;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .proPopu .content .el-select {
      margin: 10px 5px 10px 5px;
    }
    .proPopu .content .el-select,.el-dropdownautocomplete .el-input__inner {
      width: 92%;
    }
    .proPopu .content .el-select,.el-dropdownautocomplete .el-input__inner {
      width: 92%;
    }
    /*覆盖element ui属性*/
    /*.el-select-dropdown__item{*/
    /*}*/
    .el-select-dropdown__list{
      padding:0;
    }
    .el-select-dropdown__item .proPersonnelList{
      /*width: 600px;*/
      /*border: 1px solid #000;*/
      /*background-color: white;*/
      position: relative;
      height: 80px;
      /*border-bottom: 0.5px solid #DDDDDD;*/
      box-sizing:border-box;
    }
    /*更改对号的位置*/
    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
      position: absolute;
      right: 10%;
      top: 34%;
      font-family: element-icons;
      content: "\E608";
      font-size: 11px;
      -webkit-font-smoothing: antialiased;
    }
    .el-select-dropdown__item .proPersonnelList .left{
      position: absolute;
      top:50%;
      left: 4%;
      color:white;
      transform: translate(0%,-50%);
    }
    .el-select-dropdown__item .proPersonnelList .left img{
      width: 48px;
      height: 48px;
    }
    .el-select-dropdown__item .proPersonnelList .right{
      position: absolute;
      top:50%;
      left:16%;
      /*color:white;*/
      transform: translate(0%,-50%);
    }
    .el-select-dropdown__item .proPersonnelList .right p:nth-of-type(2) span{
      margin-right: 10px;
    }
    .el-select-dropdown .el-scrollbar .el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default .el-scrollbar__view el-select-dropdown__list
    .el-select-dropdown__item .proPersonnelList .left{
    }
  .proPopu .bottom {
    /*height: 14px;*/
    /*border: 1px solid #000;*/
    width: 580px;
    margin-top: 170px;
  }
  .proPopu .bottom .el-button{
    float: right;
    background-color: #67649F;
    border-color: #67649F;
    color:white;
    margin-right:3%;
  }
</style>
