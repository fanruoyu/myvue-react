<template>
  <div id="businessUpLoadFile">
    <div class="componentBox">
      <div class="titleComponentName">
        <p style="float:left">{{title}}</p>
        <el-upload
          :style="{display: disabled?'none':'', float:'left'}"
          class="upload-demo"
          :action="url"
          :data="fileData5"
          :headers="headers"
          :before-upload="beforeAvatarUpload"
          :on-success="success"
          :on-error="error"
          :show-file-list="false"
          :limit="1">
          <el-button type="promise" class="normalBlueAddButton"><span>上传</span></el-button>
        </el-upload>
      </div>
      <table class="tableBox">
        <tr>
          <th class="width1">附件名称</th>
          <th class="width2">文件大小</th>
          <th class="width2">文件格式</th>
          <th class="width2">操作</th>
        </tr>
        <tr v-for="(item,index) in fileObj[fieldName]">
          <td><a class="downloadurl" target="_blank" :href="item.fileUrl">{{item.fileName}}</a></td>
          <td>{{item.fileSize}}</td>
          <td>
            <el-select :disabled="disabled" v-model="item.isPrivate" style="width:80px;border:none"
                       placeholder="请选择">
              <el-option
                v-for="item in privacy"
                :key="item.dictName"
                :label="item.dictName"
                :value="item.dictCode">
              </el-option>
            </el-select>
          </td>
          <td v-if="disabled">删除</td>
          <td v-else class="del" @click="removeRow(index)">删除</td>
        </tr>
      </table>

    </div>

    <!--提示-->
    <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
  </div>


</template>
<script>
  export default {
    name: 'upLoadFile',
    props: ['title', 'disabled', 'fieldName', 'fileObj'],
    data() {
      return {
        hintIsShow: false, // 提示消息显示隐藏
        hintMessage: '', // 提示消息文本
        fileData5: {
          file: '',
          projectId: ''
        },
        M:100,
        privacy: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        headers: {platform: 'pc', token: localStorage.getItem('token'), version: '1'},
        url: this.$baseUrl+'longcity/services/v1/upload/single',
      }
    },

    computed: {
      nameList: function () {
        let rt = []
        for (let i = 0; i < this.fileObj[this.fieldName].length; i++) {
          rt.push(this.fileObj[this.fieldName][i].fileName)
        }
        return rt;
      }
    },

    methods: {
      // 附件上传成功函数;element-ui提供方法;成功后将对应的值进行处理展示;方便上传
      success(response, file, fileList) {
        this.$emit('switchLoading', false)
        for (var i = 0; i < response.result.length; i++) {
          let rt = response.result[i];
          this.fileObj[this.fieldName].unshift({
            "fileId":parseInt(rt.id),
            "fileType":rt.fileType,//文件类型
            "fileName":rt.fileName,//文件名
            "fileSize":rt.fileSize,//文件大小
            "upload":rt.upload,
            "fileUrl":rt.url,//访问url
            "isPrivate":0  //1公开 0私有
          })
        }
      },

      error() {
        this.$emit('switchLoading', false)
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
        var isM = file.size / 1024 / 1024
        if (isM > this.M) {
          this.hint('上传附件过大,最大为' + this.M + 'M!')
          return false
        }

        this.$emit('switchLoading', true)

      /*  if (!this.noRepeatName(file)) {
          this.hint('文件名重复')
          return false
        } else {
          this.nameList.push(file.name)
        }*/
      },

      // 提示函数
      hint(message) {
        let that = this
        this.hintIsShow = true
        that.hintMessage = message
        clearTimeout()
        setTimeout(function () {
          that.hintIsShow = false
        }, 1500)
      },

      // 附件列表删除函数
      removeRow: function (index) {
        this.fileObj[this.fieldName].splice(index, 1)
      }
    }
  }
</script>
<style scoped lang="less">
  @tableColor: #E2E2ED;
  #businessUpLoadFile {

    .downloadurl{
      &:hover{
        font-weight: bold;
      }
    }


    .titleComponentName {
      height: 50px;
      line-height: 50px;
      text-align: left;
    }
    .titleComponentName {
      .addButton {
        display: block;
        width: 100px;
        height: 36px;
        line-height: 36px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        float: right;
        border-radius: 4px;
        margin-top: 6px;
        background: url("../assets/images/add.png") 18px 9px no-repeat;
        background-size: 16px;
        background-color: #67649F;
        cursor: pointer;
        text-indent: 12px;
      }
      /*遮罩层*/
      .modelBox {
        display: block;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20000;
      }
    }

    /*上传附件*/
    .componentBox {
      .tableBox {
        width: 100%;
        .del{
          &:hover{
            font-weight: bold;
          }
        }
      }
      .tableBox .width1 {
        width: 61%
      }
      .tableBox .width2 {
        width: 13%
      }
      .tableBox th {
        background-color: #E2E2ED;
        color: #67649F;
        line-height: 30px;
        font-size: 14px;
      }
      .tableBox td {
        border: 1px solid #ddd;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
      }
      .tableBox tr td:nth-child(1) {
        text-align: left;
        text-indent: 15px;
      }
      .tableBox tr td:nth-child(4) {
        cursor: pointer;
      }
      .upload-demo {
        float: right;
      }
      .el-button--primary {
        width: 50px;
        height: 32px;
        background: url("../assets/images/add.png") 8px 6px no-repeat;
        background-color: #67649F;
        border-color: #67649F;
        background-size: 16px;
      }
    }


    .normalBlueAddButton{
      background-color: #67649F ;
      border-color: #67649F;
      line-height: 1;
      cursor: pointer;
      padding: 10px 15px 10px 5px;
      border-radius: 4px;
      position: relative;

      span{
        /*margin-left: 13px;*/
        color: white;
        font-size: 14px;
        box-sizing: border-box;
        /*line-height:20px;*/

        &:before{
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
      }
    }


  }




</style>
