<template>
  <div class="video" id="video">
    <transition name="fade" mode="out-in">
      <div class="closeNav">
        <p class=" tit fl" title="">{{childParm.projectName}}</p>
        <div>
          <span class="closeButton fl" @click="close">关闭</span>
          <span class="saveButton fl" @click="save" v-if="childParm.modAuth==2">保存</span>
        </div>
      </div>
    </transition>
    <!--提示-->
    <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
    <!--图片上传就提交-->
    <div class="modelBox" v-if="isDisplayModel">
      <p class="loadingStyle">视频上传中请勿刷新!</p>
    </div>
    <div class="videoContentBox" id="conMod">
      <p class="projectFixed">地总视频</p>
      <div class="video">
        <p class="btnBox">
          <!--<span class="addButton">上传视频</span>-->
          <el-upload
            class="upload-demo"
            :disabled="childParm.modAuth!=2"
            :action="url"
            :data="fileData5"
            :headers="headers"
            :before-upload="beforeAvatarUpload"
            :on-success="success"
            :on-error="err"
            :show-file-list="false"
            :limit="1">
            <el-button size="small" type="primary" v-if="childParm.modAuth==2">上传视频</el-button>
          </el-upload>
        </p>
        <div class="content">
          <video id="videoLabel" v-if="videoSrc!=''&&videoSrc!=undefined&&videoSrc.length>2" :src="videoSrc" class="videoPlay" controls="controls">您的浏览器不支持 video 标签。</video>
          <div class="hintBox" v-if="videoSrc==''||videoSrc==undefined||videoSrc.length<2">
            <div class="addImg">
              <span class="imgBox"></span>
            </div>
            <p class="please">请添加视频</p>
            <p class="hintMsg">为确保视频流畅度，请到APP端上传</p>
            <!--<p class="hintMsg">仅支持格式（MP4、AVI），100M以内</p>-->
            <p class="hintMsg">仅支持格式（MP4），100M以内</p>
          </div>
        </div>
        <div class="textareaBox">
          <p class="textName">地区对立项会决议的回复</p>
          <textarea :disabled="childParm.modAuth!=2" class="replay" placeholder="请输入地区对立项会决议的回复" v-model="reply" maxlength="300"></textarea>
          <span class="statistics">{{reply==undefined?0:reply.length}}/300</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        isDisplayModel: false, // 图片加载遮罩层
        hintIsShow: false, // 提示信息框显示隐藏
        M: 100, // 上传文件大小:单位--》M
        videoSrc: '', // 视频路径
        projectFieldId: '', // 视频上传后返回id
        reply: '', // 地总回复内容
        url: this.$baseUrl + 'longcity/services/v1/project/multimedia',
        fileData5: {
          projectFieldId: '', // 非必传字段
          projectId: '',
          file: '',
          fieldName: 'area_manager_video_url'
        },
        headers: {platform: 'pc', token: localStorage.getItem('token'), version: '1'},
        result: {}
      }
    },
    methods: {
      beforeAvatarUpload (file) {
        // var isRrsult = file.name.split('.')[file.name.split('.').length - 1] == 'mp4' || file.name.split('.')[file.name.split('.').length - 1] == 'avi'
        var isRrsult = file.name.split('.')[file.name.split('.').length - 1] == 'mp4'
        var isM = file.size / 1024 / 1024
        if (!isRrsult) {
          this.hint('仅支持MP4格式!')
          return false
        }
        if (isM > this.M) {
          this.hint('上传失败，附件大小不得超过' + this.M + 'M!')
          return false
        }
        this.isDisplayModel = true
      },
      // 上传成功函数
      success (response, file, fileList) {
        this.result = response.result
        this.videoSrc = response.result.video
        this.projectFieldId = response.result.projectFieldId
        if (response.code === 200) {
          fileList.splice(0)
          this.isDisplayModel = false
          this.hint('视频上传成功!')
        }
      },
      err (errors, file, fileList) {
        this.hint('视频上传失败!')
        this.isDisplayModel = false
      },
      save () {
        if(document.getElementById('videoLabel')!=null){
          document.getElementById('videoLabel').pause()
        }
        // 提交函数
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/project/saveProjectPartially',
          data: {
            projectId: that.fileData5.projectId,
            title: 'regionGeneralVideo',
            detail: {
              area_manager_video_url: that.projectFieldId,
              reply: that.reply
            }
          }
        }).then(function (succeed) {
          if (succeed.data.code === 200 || succeed.data.code === '200') {
            //保存成功提示公共方法
            that.saveSuccessDialogue()
            //保存成功退出当前页面公共方法
            that.$emit('cancelThePage', 2)
          }else {
            //保存失败提示公共方法
            that.saveError()
          }
        }, function (err) {
          console.log(err)
        })
      },
      // 关闭函数
      close () {
        var that = this
        this.cancelDialogue(function () {
          if(document.getElementById('videoLabel')!=null){
            document.getElementById('videoLabel').pause()
          }
          that.$emit('cancelThePage', 1)
        })
      },
      // 从父元素获取id方法
      run (fun, parm) {
        if (fun == 'getId') {
          this.fileData5.projectId = parm
          this.loading(parm)
        }
      },
      // 提示函数
      hint (message) {
        let that = this
        this.hintIsShow = true
        that.hintMessage = message
        setTimeout(function () {
          that.hintIsShow = false
        }, 1500)
        //clearTimeout()
      },
      // 获取数据函数
      loading (id) {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/project/getMenuDetail',
          data: {projectId: id, titleKey: ['regionGeneralVideo']}
        }).then(function (succeed) {
          that.videoSrc = succeed.data.result.regionGeneralVideo.area_manager_video_url.split(',')[1]
          that.reply = succeed.data.result.regionGeneralVideo.reply
        }, function (err) {
          console.log(err)
        })
      }
    },
    mounted () {
      this.setConHeight()
    },
    props: {
      childParm: Object
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #conMod{width:100%;overflow:auto}
  #video{width:100%;background-color:#fff;overflow:auto}
  #video{
    textarea{overflow-y: auto;}
    /*placeholder颜色*/
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #999;}
    .projectFixed{height:50px;line-height:50px;position:relative;text-indent:17px;font-size:16px;color:#444;border-bottom:2px solid #ddd;}
    .projectFixed:before{display:block;content:'';height:16px;width:3px;background-color:#67649F;position:absolute;top:17px;left:0;}
    .video{padding:10px 2%;}
    .btnBox{text-align:left;overflow:hidden;}
    .upload-demo{float:left;}
    .el-button--primary{width:100px;height:32px;background:url("../../assets/images/add.png") 8px 6px no-repeat;background-color:#67649F;border-color:#67649F;background-size:16px;}
    .addButton{display:block;width:100px;height:36px;line-height:36px;color:#fff;font-size:14px;text-align:center;border-radius:4px;margin-top:6px;background:url("../../assets/images/add.png") 12px 9px no-repeat;background-size:16px ;background-color:#67649F;cursor:pointer;text-indent:12px;}
    .content{width:100%;min-height:400px;background-color:#f9f9f9;border-radius:4px;margin-top:10px;position:relative;overflow:hidden;}
    .videoPlay{width:100%;display:block;float:left;}
    .hintBox{width:100%;text-align:center;height:auto;position:absolute;top:40%;left:0;user-select:none;}
    .addImg .imgBox{width:80px;height:80px;background:url("../../assets/images/add.png") center center no-repeat;background-size:40px;background-color:rgba(9,9,9,0.3);line-height:80px;border-radius:50%;}
    .please{font-size:16px;color:#333;line-height:24px;}
    .hintMsg{font-size:12px;color:#999;line-height:18px;}
    .textareaBox{position:relative;}
    .statistics{position:absolute;right:10px;bottom:10px;}
    .textName{font-size:14px;color:#333;line-height:30px;padding:10px 0;}
    .replay{resize: none;width:96%;padding:10px 2%;line-height:18px;border-radius:4px;background-color:#f9f9f9;border:1px solid #ddd;height:80px;font-size:14px;}
    .replay:hover{border-color:#8391a5;}
    .replay:focus{border-color:#20a0ff}
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
    .modelBox.displayModel {
      display: none
    }

    .loadingStyle {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      color: #fff;
      font-size: 16px;
      text-align: center;
      user-select:none;
    }
    /*动画*/
    .fade-enter-active, .fade-leave-active {transition: all 0.5s ease-out;}

    .fade-enter, .fade-leave-active {opacity: 0;}
  }
</style>
