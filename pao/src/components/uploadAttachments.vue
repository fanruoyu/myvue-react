<template>
    <div id="uploadAttachments">
      <div class="componentBox">
        <div class="titleComponentName">
          <!--<slot name="title"></slot>-->
          <slot name="title" class="ul-remark-text"></slot>
          <!--<span class="ul-remark-text"><b>其他附件</b>   注：如有其他附件，请在此上传</span>-->
          <!--:disabled="childParm.modAuth!=2"-->
          <!--<el-upload
            class="upload-demo"
            :action="url"
            :data="fileData5"
            :headers="headers"
            :before-upload="beforeAvatarUpload"
            :on-success="success"
            :show-file-list="false"
            :limit="1">
            &lt;!&ndash;<el-button size="small" type="primary" v-if="childParm.modAuth==2">上传附件</el-button>&ndash;&gt;
            <el-button size="small" type="primary"  class="mr5">上传附件</el-button>
          </el-upload>-->
        </div>
        <div class="titleComponentName">
          <el-upload
            class="upload-demo"
            :action="url"
            :data="fileData5"
            :headers="headers"
            :before-upload="beforeAvatarUpload"
            :on-success="success"
            :show-file-list="false"
            :limit="1">
            <!--<el-button size="small" type="primary" v-if="childParm.modAuth==2">上传附件</el-button>-->
            <el-button size="small" type="primary"  class="mr5">上传附件</el-button>
          </el-upload>
        </div>
        <table class="tableBox">
          <tr style="border-left:1px solid #E2E2ED">
            <th class="width1">附件名称</th>
            <th class="width2">文件大小</th>
            <th class="width2">权限</th>
            <th class="width2">操作</th>
          </tr>
          <tr v-for="(item,index) in this.allOtherFile">
            <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>
            <td>{{item.fileSize}}</td>
            <td>
              <!--<el-select :disabled="childParm.modAuth!=2" v-model="item.isPrivate" style="width:80px;border:none"  placeholder="请选择">-->
              <el-select v-model="item.isPrivate" style="width:80px;border:none"  placeholder="请选择">
                <el-option
                  v-for="item in privacy"
                  :key="item.dictName"
                  :label="item.dictName"
                  :value="item.dictCode">
                </el-option>
              </el-select>
            </td>
            <!--<td v-if="childParm.modAuth!=2">删除</td>-->
            <!--<td v-if="childParm.modAuth!=2">删除</td>-->
            <!--<td @click="otherFileDel(index)" v-else-if="childParm.modAuth==2">删除</td>-->
            <td @click="otherFileDel(index)">删除</td>
          </tr>
        </table>
      </div>
      <!--附件上传-->
      <div class="modelBox" :class="{displayModel:isDisplayModel}">
        <p class="loadingStyle">附件上传中请勿刷新!</p>
      </div>
      <!--提示-->
      <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
    </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        privacy: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        hintIsShow: false, // 提示消息显示隐藏
        M: 100, // 上传附近大小限制:单位M
        isDisplayModel: true, // 附件上传遮罩层
        headers: {platform: 'pc', token: localStorage.getItem('token'), version: '1'},
        fileData5: {
          file: '',
          light: 'light'
        },
        parm: {otherFile: []},
        url: this.$baseUrl + 'longcity/services/v1/upload/single'
      }
    },
    methods: {
      // 附件上传前的钩子函数;判断附件名称;大小等
      beforeAvatarUpload (file) {
        let isRrsult = file.name.split('.')[file.name.split('.').length - 1] == 'xls' || file.name.split('.')[file.name.split('.').length - 1] == 'xlsx' || file.name.split('.')[file.name.split('.').length - 1] == 'ppt' || file.name.split('.')[file.name.split('.').length - 1] == 'pptx'|| file.name.split('.')[file.name.split('.').length - 1] == 'pdf' || file.name.split('.')[file.name.split('.').length - 1] == 'doc' || file.name.split('.')[file.name.split('.').length - 1] == 'docx'|| file.name.split('.')[file.name.split('.').length - 1] == 'jpeg'|| file.name.split('.')[file.name.split('.').length - 1] == 'png'|| file.name.split('.')[file.name.split('.').length - 1] == 'jpg'|| file.name.split('.')[file.name.split('.').length - 1] == 'bmp'|| file.name.split('.')[file.name.split('.').length - 1] == 'mp4'
        if (!isRrsult) {
          this.hint('仅支持ppt、pptx、pdf、xls、xlsx、doc、docx、 jpeg、png、jpg、bmp、MP4格式文件上传!')
          return isRrsult
        }
        let isM = file.size / 1024 / 1024
        if (isM > this.M) {
          this.hint('上传附件过大,最大为' + this.M + 'M!')
          return false
        }
        this.isDisplayModel = false
      },
      // 附件上传成功函数;element-ui提供方法;成功后将对应的值进行处理展示;方便上传
      success (response, file, fileList) {
        for (let i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          console.log(this.allOtherFile)
          this.allOtherFile.unshift(response.result[i])
        }
        this.isDisplayModel = true
      },
      // 附件列表删除函数
      otherFileDel (index) {
        this.delConfirm(index)
      },
      // 删除提示函数
      delConfirm (index) {
        let that = this
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // type: 'warning'//提示小图标配置,取值为:success/info/warning/error
        }).then(() => {
          that.allOtherFile.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          // 下面代码为取消删除后的提示;
          // that.hint("已取消删除!")
        })
      },
      // 提示函数
      hint (message) {
        let that = this
        this.hintIsShow = true
        that.hintMessage = message
        setTimeout(function () {
          that.hintIsShow = false
        }, 2600)
        clearTimeout()
      }
    },
    mounted () {

    },
    props: {
      allOtherFile: Array
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #uploadAttachments{margin-top:10px;width:100%;}
  #uploadAttachments{
    /*上传附件*/
    .componentBox{
      .titleComponentName{height:32px;margin-bottom:15px;position: relative}
      .tableBox{width:84%;margin-left:10%;}
      .tableBox .width1{width:61%}
      .tableBox .width2{width:13%}
      .tableBox th{background-color:#E2E2ED;color:#67649F;line-height:30px;font-size:14px;}
      .tableBox td{border:1px solid #ddd;text-align:center;line-height:30px;font-size:12px;}
      .tableBox tr td:nth-child(1){text-align: left;}
      .downloadUrl{width:100%;text-indent:15px;}
      .tableBox tr td:nth-child(4){cursor:pointer;}
      .upload-demo{position:absolute;top:0;left:10%;}
      .el-button--primary{width:100px;height:32px;background:url("../assets/images/add.png") 8px 6px no-repeat;background-color:#67649F;border-color:#67649F;background-size:16px;}
    }
    /*遮罩层*/
    .modelBox{display: block;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.3);position: fixed;top: 0;left: 0;z-index: 20000;}
    .modelBox.displayModel {display: none}
    .loadingStyle {position:absolute;top: 50%;left: 0;width: 100%;color: #fff;font-size: 16px;text-align: center;user-select:none;}
  }
</style>
