<template>
  <div id="businessContact">
    <div style="overflow: auto">
      <p class="title">收并购及外部联系人</p>

      <el-form status-icon :style="{display: disabled?'none':''}" ref="ruleForm2" label-width="100px" class="proPlayers">
        <el-form-item>
          <el-button type="primary" @click="addNewRow()" class="add button"><span>添加</span></el-button>
        </el-form-item>
      </el-form>

    </div>


    <div class="content">
      <div class="tableTitle">
        <span>编号</span>
        <span>姓名</span>
        <span>联系方式</span>
        <span>职位</span>
        <span>操作</span>
      </div>
      <div class="tableContent" v-for="(item, index) in proBusinessInfo.externalContacts">
        <label>{{index+1}}</label>
        <label><input placeholder="请输入" :disabled="disabled" maxlength="5" v-model="item.name"/></label>
        <label style="position: relative">
          <input v-validate="{ regex: /^1[3|4|5|8][0-9]\d{4,8}$/ }" :name="index" :class="{'input': true, 'is-danger': errors.has(index)}" type="text" :disabled="disabled" v-model="item.contactWay"
                 placeholder="请输入"/>
          <div v-show="errors.has(index)" class="help">{{'请输入正确的手机号'}}</div>


        </label>
        <label><input placeholder="请输入" :disabled="disabled" maxlength="64" v-model="item.position"/></label>
        <label class="btn" :class="{disa:disabled}" @click="removeRow(index)">删除</label>
      </div>
    </div>


  </div>


</template>
<script>

  import organizationStructure from './organizationStructure'

  export default {
    components: {organizationStructure},
    name: 'businessContact',
    props: ['disabled', 'proBusinessInfo'],
    data () {
      return {

      }
    },
    methods: {
      addNewRow: function () {
        this.proBusinessInfo.externalContacts.push({
          name: '',
          tel: '',
          position: ''
        })
      },
      removeRow:function (index) {
        if(!this.disabled){
          this.proBusinessInfo.externalContacts.splice(index,1)
        }
      }
    }
  }
</script>
<style scoped lang="less">
  @tableColor:#E2E2ED;


  #businessContact {
    margin: 20px;
    overflow: auto;



    .is-danger {
      border: 1px solid red;
    }

    .help {
      position: absolute;
      line-height: 12px;
      font-size: 12px;
      color: red;
      padding: 2px 8px 0;
      bottom:2px;
    }



    .title {
      border-radius: 4px 4px 0 0;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 40px;
      padding-left: 10px;
      height: 40px;
      float: left;
    }

    .add {
      float: right;

    }

    .content {
      overflow: auto;
      .tableTitle {
        background: @tableColor;
        display:flex;
        span {
          flex:1;
          display: inline-block;
          text-align: center;
          border-right:1px solid #ddd;
        }
      }

      .tableContent {
        display:flex;
        height:35px;
        border:1px solid @tableColor;


        label {
          flex:1;
          text-align: center;
          display: inline-block;
          text-align: center;
          border-right:1px solid @tableColor;
          &:last-child{
            border-right: none;
          }
        }
        .btn{
          cursor:pointer;
          &:hover{
            font-weight: bold;
          }
        }

        .disa{
          &:hover{
            font-weight: normal;
          }
        }

        input {
          width:100px;
          height:30px;
          border:none;
          display: inline-block;
          text-align: center;

        }

      }
    }






    .proPlayers  img{
      width: 15px;
      position: absolute;
      left: 5px;
      display: inline-block;
    }
    .proPlayers  button{
      background-color: #67649F ;
      border-color: #67649F;
      line-height: 1;
      cursor: pointer;
      padding: 10px 15px 10px 5px;
      border-radius: 4px;
      position: relative;
    }
    .proPlayers span:before {
      content:"";
      background:url('../../assets/images/add.png') no-repeat ;
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
    .proPlayers button span{
      /*margin-left: 13px;*/
      color: white;
      font-size: 14px;
      box-sizing: border-box;
      /*line-height:20px;*/
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
      display: table-cell;
      position: relative;
    }
    .proPlayers .proPlayersList img{
      width: 50px;
      height: 50px;
      position: relative;
      margin-top: 10px;
      left:0
    }
    .proPlayers .proPlayersList p {
      margin-top: 12px;
    }
    .proPlayers .proPlayersList p:nth-of-type(1) {
      font-size: 14px;
    }
    .proPlayers .proPlayersList p:nth-of-type(2) {
      font-size: 12px;
    }
    .proPlayers .proPlayersList p:nth-of-type(3) {
      font-size: 8px;
    }
    .proPlayers .proPlayersList p:nth-of-type(4) {
      font-size:8px;
      /*display: block;*/
      display: none;
      line-height: 30px;
    }
    .proPlayers .proPlayersList p:nth-of-type(4):before {
      content:'';
      background:url('../../assets/images/delete.png') no-repeat ;
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
      left: 0px;
      bottom: -12%;
      border-radius: 2px;
    }
    .inputLength .el-select{
      width: 100% !important;
    }



  }






</style>
