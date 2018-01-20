<template>
  <div id="projectMumber">
    <div class="proPlayers">
      <el-button type="promise" @click="isShowProjectList" class="normalBlueAddButton"><span>添加成员</span></el-button>
      <div class="verScrollBar" v-if="proPlayersList.length>0">
        <ul>
          <li v-for="(item,index) in proPlayersList">
            <div class="proPlayersList ">
              <img :src="item.avatar"  alt="" v-if="item.avatar">
              <img :src="defaultAvatar" alt="" v-else>
              <!--<img src='../../src/assets/images/defaultAvatar.png' alt="">-->
              <p>{{item.shName.substr(0, item.shName.indexOf('(')==-1? item.shName.length : item.shName.indexOf('('))}}</p>
              <p>{{item.group.split('-').pop()}}</p>
              <p>{{item.title}}</p>
              <p class="delete"  @click="thePerDelete(index)"></p>
            </div>
          </li>
        </ul>
      </div>

    </div>
    <!--@toParentPersonnelList="toParentPersonnelList"-->
    <diaLogComp :is-show="isSwitch" >
      <proPopu  @closeAside="isSwitch=false" @subAside="subAside" class="proPopu"></proPopu>
    </diaLogComp>

  </div>


</template>
<script>
  import diaLogComp from '../../../components/dialog'
  import proPopu from '../../../components/proPopuLight'


  export default {
    name: 'projectMumber',
    components: {diaLogComp, proPopu},
    props: ['disabled', 'proBusinessInfo'],
    data() {
      return {
        isSwitch: false,
        proPlayersList:this.proBusinessInfo.stackholders,
        /*默认头像地址*/
        defaultAvatar:require("../../../../src/assets/images/defaultAvatar.png"),



      }
    },

    watch:{
      proPlayersList:{
        handler:function(newData){
          this.proBusinessInfo.stackholders = this.proPlayersList;
        },
        deep: true
      }
    },

    updated() {

    },


    mounted() {

    },


    methods: {

      /*人员管理弹窗点击确定关闭且接收数据*/
      subAside(data){
        this.isSwitch=false;
        /*项目成员去重*/

        this.proPlayersList=this.proPlayersList.concat(data)
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
      },

      isShowProjectList(){
        this.isSwitch=true;
      },

      /*hover删除人员*/
      delPlayersList(index){
        this.proPlayersList.splice(index, 1);
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
//              instance.confirmButtonText = '执行中...';
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
    }
  }
</script>
<style scoped lang="less">
  @tableColor: #E2E2ED;
  @import 'common.less';

  #projectMumber {
    padding: 10px;
    overflow: auto;

    /*弹窗位置*/
    .proPopu{
      position: absolute;
      left: 50%;
      top: 80%;
      /*z-index: 1;*/
      transform: translate(-50%,-50%);
    }



    .proPlayers  img{
      width: 15px;
      position: absolute;
      left: 5px;
      display: inline-block;
    }

    /*定制proPlayers弹窗内容*/
    .proPlayers .el-dialog__title{

    }
    .proPlayers .verScrollBar{
      /*border: 1px solid #000;*/
      height: 410px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .proPlayers ui{
      clear: both;
    }
    .proPlayers li{
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 110px;
      height: 160px;
      float: left;
      margin:10px 10px 10px 0;
      position: relative;
      /*box-sizing: border-box;*/
    }
    .proPlayers .proPlayersList{
      text-align: center;
      vertical-align:center;
      position: relative;
      width:110px;
      height: 100%;
    }
    .proPlayers .proPlayersList img{
      width: 50px;
      height: 50px;
      position: relative;
      margin-top: 10px;
      left:0
    }
    .proPlayers .proPlayersList p {
      text-align: center;
    }
    .proPlayers .proPlayersList p:nth-of-type(1) {
      font-size: 14px;
    }
    .proPlayers .proPlayersList p:nth-of-type(2) {
      color:#cacaca;
      font-size: 12px;
      line-height: 16px;

    }
    .proPlayers .proPlayersList p:nth-of-type(3) {
      font-size: 12px;
      margin-top: 5px;
      line-height: 16px;

    }
    .proPlayers .proPlayersList p:nth-of-type(4) {
      font-size:8px;
      /*display: block;*/
      display: none;
      line-height: 30px;
    }
    .proPlayers .proPlayersList p:nth-of-type(4):before {
      content:'';
      background:url('../../../assets/images/delete.png') no-repeat ;
      background-size:24px 24px;
      width: 24px;
      height: 24px;
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    .proPlayers .proPlayersList:hover .delete{
      font-size: 8px;
      height: 30px;
      width: 100%;
      display: block;
      /*display: none;*/
      opacity: 0.6;
      background: #000000;
      position: absolute;
      left: 0;
      bottom: 0;
      border-radius: 2px;
      cursor:pointer;
    }




  }


</style>
