<template>
  <!--轻资产图片管理及上传组件-->
  <div>
    <transition name="fade" mode="out-in">
      <!--<div id="uploadMuchImg" v-if="uploadMuchImgIsShow&&imgArr[0].picList!=undefined">-->
      <div id="uploadMuchImg" v-if="uploadMuchImgIsShow">
        <div class="contentBox">
          <div class="navBox">
            <span class="tilName">图片管理</span>
            <span class="closeIcon" @click="closeImgPage"></span>
          </div>
          <div class="LiftAndRightBox">
            <div class="liftList">
              <ul class="labelList">
                <li v-for="(item,index) in imgArr" :class="{active:tabIndex==index}" @click="tab(index)">{{item.dictName}}({{item.picList==undefined?0:item.picList.length}})</li>
              </ul>
            </div>
            <div class="rightContentBox">
              <div class="hintNav">
                <!--提示信息-->
                <span class="hintTop" v-if="tabIndex>0">最多可上传{{MaxNumImg}}张图片,建议每次上传不超过10张!</span>
                <!--点击按钮-->
                <div class="file" v-if="tabIndex>0">
                  <el-upload
                    class="upload-demo"
                    :action="url"
                    :data="fileData5"
                    :headers="headers"
                    :multiple="true"
                    :before-upload="beforeAvatarUpload"
                    :on-success="success"
                    :show-file-list="false">
                    <!--<el-button size="small" type="primary" v-if="childParm.modAuth==2">上传附件</el-button>-->
                    <el-button size="small" type="primary"  class="mr5">添加照片</el-button>
                  </el-upload>
                </div>
              </div>
              <div class="imgContent">
                <div class="everyImgBox" v-for="(item,index) in imgArr[tabIndex].picList==undefined?imgArr[tabIndex].picList=[]:imgArr[tabIndex].picList.slice(presentPageIndex,finallyLength)">
                  <div class="table" @mouseenter="hover(item.picId)" @mouseleave="leave(item.picId)">
                    <span class="tableCell"><img :src="item.picUrl"></span>
                    <transition name="fade" mode="out-in">
                      <p class="bottomContent" v-if="item.picId==hoveId">
                        <span class="compile" @click="compile(item.picId,item.picTag,item.remark,index)"></span>
                        <span class="delete" @click="del(item.picId,index)"></span>
                      </p>
                    </transition>
                    <transition name="fade" mode="out-in">
                      <div class="compileBox" :class="{top80:index>4}" v-if="coveId==item.picId&&compileIsShow">
                        <p class="tagName">
                          <span class="text">标签:</span>
                          <el-select v-model="item.picTag" :disabled="true" style="width:204px;float:left;" placeholder="请选择">
                            <el-option
                              v-for="item in dictionariesList"
                              :key="item.dictName"
                              :label="item.dictName"
                              :value="item.dictCode">
                            </el-option>
                          </el-select>
                        </p>
                        <div class="textareaBox">
                          <span class="text">描述:</span>
                          <textarea placeholder="不超过200个中文字符" maxlength="200" v-model="temporaryContent"></textarea></div>
                        <p class="cancelAndConfirm">
                          <span class="cancel" @click="cancelCompile">取消</span>
                          <span class="confirm" @click="confirm(item.picId,item.remark,index)">确定</span>
                        </p>
                      </div>
                    </transition>
                  </div>
                  <span class="imgName">{{item.fileName}}</span>
                </div>
              </div>
              <!--分页插件-->
              <div class="page" v-if="imgArr[tabIndex].picList.length>10">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  layout="prev, pager, next"
                  :total="imgArr[tabIndex].picList.length">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--提示-->
    <transition name="fade" mode="out-in">
      <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
    </transition>
    <!--图片上传就提交-->
    <!--<transition name="fade" mode="out-in">
      <div id="modelBox" v-if="isDisplayModel">
        <p class="loadingStyle">图片加载中请勿刷新!</p>
      </div>
    </transition>-->
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        tabIndex: 0, // 当前tab选项卡index值
        M: 5, // 图片大小限制单位:M
        hintIsShow: false, // 提示函数显示隐藏
        hintMessage: '', // 提示函数文本
        isDisplayModel: false, // 图片上传遮罩层显示隐藏
        MaxNumImg: 11, // 最大上传数量
//        uploadMuchImgIsShow: true, // 控释组件显示隐藏
        hoveId: '', // 当前悬浮的图片id
        coveId:'', // 编辑框父元素id
        compileIsShow:'', // 编辑框显示隐藏
        currentPage: 10, // 分页插件个数设置
        headers: {platform: 'pc', token: localStorage.getItem('token'), version: '1'}, // 接口头信息
        fileData5: {file: '',light: 'light',picTag:''}, // 图片上传数组
        url: this.$baseUrl + 'longcity/services/v1/upload/singlePic',
        presentPageIndex: 0, // 当前页面索引值;当前页面减1所得到的值;初始化为0
        finallyLength: 10, // 获取当前页面切换后所显示的长度值;例:第二页的时候该值为presentPageIndex*10+10所得
        imgNumber:0, // 当前数量计数
        picTag:[], // 临时存储标签值
        temporaryContent: '', // 存储临时文本内容
      }
    },
    methods: {
      // 附件上传前的钩子函数;判断附件名称;大小等
      beforeAvatarUpload (file) {
        var isRrsult = file.name.split(".")[file.name.split(".").length-1] == 'jpeg' ||file.name.split(".")[file.name.split(".").length-1] == 'jpg' || file.name.split(".")[file.name.split(".").length-1] == 'png'
        if (!isRrsult) {
          this.hint("请选择正确的图片格式!")
          return isRrsult;

        }
        this.imgNumber++
        let len=this.imgArr[this.tabIndex].picList.length
        if(len>this.MaxNumImg||this.imgNumber+len>this.MaxNumImg||this.imgNumber>this.MaxNumImg){
          this.hint('最多可上传' + this.MaxNumImg + '张图片!')
          return false
        }
        let isM = file.size / 1024 / 1024
        if (isM > this.M + 0.0099) {
          this.hint('上传图片过大,最大为' + this.M + 'M!')
          return false
        }
        this.fileData5.picTag=this.picTagList[this.tabIndex]
        this.hint('图片上传中,请勿刷新页面!')
        //this.isDisplayModel = true
      },
      // 附件上传成功函数;element-ui提供方法;成功后将对应的值进行处理展示;方便上传
      success (response, file, fileList) {
        for (let i = 0; i < response.result.urls.length; i++) {
          let str = response.result.urls[i].url
          let snapshotUrls
          if (str.indexOf('.png') > -1) { // 判断返回url结尾然后切割;拼接将小图片链接返回
            snapshotUrls = str.split('.png')[0] + '-small.png'
          } else if (str.indexOf('.jpg') > -1) {
            snapshotUrls = str.split('.jpg')[0] + '-small.jpg'
          } else if (str.indexOf('.jpeg') > -1) {
            snapshotUrls = str.split('.jpeg')[0] + '-small.jpeg'
          }
          this.imgArr[0].picList.unshift({picUrl:response.result.urls[i].url,picId:response.result.urls[i].id,fileName:response.result.urls[i].fileName,picTag:response.result.picTag,snapshotUrl:snapshotUrls,remark:''})
        }
        this.labelAllocation()
      },
      clear (){
        for(let i=1;i<this.imgArr.length;i++){
          this.imgArr[i].picList=[]
        }
      },
      // 标签分配函数
      labelAllocation () {
        this.clear()
        for(let i=0;i<this.imgArr[0].picList.length;i++){
          for(let j=1;j<this.imgArr.length;j++){
            if(this.imgArr[0].picList[i].picTag==this.imgArr[j].picTag){
              this.imgArr[j].picList.unshift(this.imgArr[0].picList[i])
            }
          }
        }
        this.isDisplayModel = false
      },
      // 分页函数
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        this.presentPageIndex = (val - 1) * 10
        this.finallyLength = (val - 1) * 10 + 10
      },
      // tab选项卡切换函数
      tab (index) {
        this.tabIndex = index
        this.compileIsShow=false
        this.presentPageIndex=0
        this.finallyLength=10
        this.imgNumber=0
      },
      // 关闭图片上传
      closeImgPage () {
        this.$emit('closeImgPage') // 关闭的时候将所有的数据传递过去;
        this.coveId=''
        this.compileIsShow=''
      },
      // 鼠标进入显示编辑和删除函数
      hover (id) {
        this.hoveId = id
      },
      // 鼠标退出隐藏编辑和删除函数
      leave (id) {
        this.hoveId = ''
        /*if (this.hoveId == id && this.compileIsShow == true) {
          return
        } else {
          this.hoveId = id
          // this.compileIsShow = false
        }*/
      },
      // 编辑函数
      compile (id,picTag,remark,index) {
        this.coveId=id
        this.compileIsShow=true
        /*this.picTag=[]
        this.picTag.push(picTag)*/
        if(remark==undefined){
          this.imgArr[this.tabIndex].picList[index].remark=''
        }
        this.temporaryContent=remark
      },
      // 确认函数
      confirm (id,remark) {
        for(let i=0;i<this.imgArr[0].picList.length;i++){
          if(this.imgArr[0].picList[i].picId==id){
            this.imgArr[0].picList[i].remark=this.temporaryContent
            break
          }
        }
        //this.imgArr[this.tabIndex].picList[index].remark=this.temporaryContent
        this.labelAllocation()
        this.coveId=''
        this.compileIsShow=''
      },
      // 取消编辑函数
      cancelCompile (){
        this.coveId=''
        this.temporaryContent=''
        this.compileIsShow=''
      },
      // 删除函数
      del (id,index) {
        this.delConfirm(id,index)
      },
      // 删除确认
      delConfirm (id,index){
        let that = this
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // type: 'warning'//提示小图标配置,取值为:success/info/warning/error
        }).then(() => {
          for(let i=0;i<that.imgArr[0].picList.length;i++){
            if(that.imgArr[0].picList[i].picId==id){
              that.imgArr[0].picList.splice(i,1)
              break
            }
          }
          that.labelAllocation();
          if(that.imgArr[that.tabIndex].picList.length<=10){
            that.handleCurrentChange(1)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
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
        }, 3000)
        //clearTimeout()
      }
    },
    mounted () {

    },
    props: {
      imgArr: Array,
      dictionariesList: Array,
      picTagList: Array,
      uploadMuchImgIsShow:Boolean
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #uploadMuchImg{width:100%;height:100%;position:fixed;top:0;left:0;background-color:rgba(0,0,0,0.3);z-index:1000;}
  /*#modelBox{width:100%;height:100%;position:fixed;top:0;left:0;background-color: rgba(0, 0, 0, 0.3);z-index:1002;}
  #modelBox .loadingStyle {position: absolute;top: 50%;left: 0;width: 100%;color: #fff;font-size: 14px;text-align: center;user-select:none;}*/
  #uploadMuchImg{
    .contentBox{border:1px solid #ddd;width:70%;height:80%;margin:5% auto 0;border-radius:4px;background-color:#fff;}
    .navBox{height:8%;position:relative;background-color:#67649F;border-radius:4px 4px 0 0;}
    .navBox:before{content:'';display:block;width:100%;position:absolute;bottom:0;left:0;border-bottom:1px solid #ddd;z-index:1;}
    .tilName{height:24px;line-height:24px;position:absolute;top:50%;margin-top:-12px;left:15px;color:#fff;font-size:16px;}
    .closeIcon{float: right;cursor: pointer;background: url("../assets/images/close.png") center center no-repeat;width: 24px;height: 24px;position: absolute;top:50%;margin-top:-12px;right:15px;}
    .LiftAndRightBox{height:92%;width:100%;clear:both;}
    .liftList{height:100%;width:15%;float:left;position:relative}
    .labelList{height:100%;overflow:hidden;background-color:#f4f4f4;}
    .labelList li{float:left;height:40px;line-height:40px;font-size:14px;text-indent:15px;width:100%;cursor:pointer;}
    .labelList li.active{color:#67649f;cursor:context-menu;background-color:#fff;}
    .rightContentBox{width:85%;height:100%;float:left;position:relative;}
    .rightContentBox:before{content:'';display:block;width:0;height:100%;position:absolute;top:0;left:0;border-right:1px solid #ddd;z-index:1;}
    .hintNav{height:10%;width:100%;}
    .hintNav{height:10%;max-height:40px;width:100%;position:relative;}
    .hintTop{position: absolute;height:24px;line-height:24px;top:50%;left:15px;margin-top:-12px;}
    .hintNav:before{content:'';display:block;width:0;width:100%;position:absolute;left:0;bottom:0;border-bottom:1px solid #ddd;z-index:1;}
    .everyImgBox{width:19%;height:180px;position:relative;float:left;margin:1% 0.5%;display:block;}
    .table{display:block;width:100%;height:120px;border:1px solid #ddd;border-radius:4px;position:relative;}
    .tableCell{display:block;vertical-align:middle;width:100%;height:120px;line-height:120px;overflow:hidden;text-align:center;}
    /*.tableCell img{max-width:165px;max-height:120px;margin:0 auto;}*/
    .tableCell img{max-width:150px;max-height:120px;margin:0 auto;}
    .imgName{display:block;width:100%;height:40px;line-height:20px;overflow:hidden;word-wrap: break-word;display: -webkit-box !important;text-overflow: ellipsis;word-break: break-all; -webkit-box-orient: vertical;-webkit-line-clamp: 2;margin-top:10px;}

    .rightContentBox .page{position:absolute;bottom:10px;left:20px;}
    .bottomContent { position: absolute; bottom: 0; right: 0; cursor: pointer; background-color: rgba(0, 0, 0, 0.6); width:100%; height: 26px;border-radius:0 0 4px 4px;}
    .bottomContent .compile, .bottomContent .delete { width: 24px; height: 24px; display: block; background-size: 24px 24px;}
    .bottomContent .compile {float: left;background:url("../assets/images/compile.png") center center no-repeat;margin-left:20%;}
    .bottomContent .delete {float:right;background:url("../assets/images/delete.png") center center no-repeat;margin-right:20%;}
    .file{display: block; width: 100px; height: 32px;position: absolute;right:15px;top:50%;margin-top:-17px;}
    .el-button--primary{width:100px;height:32px;background:url("../assets/images/add.png") 8px 6px no-repeat;background-color:#67649F;border-color:#67649F;background-size:16px;}
    .compileBox{position:absolute;width:260px;border:1px solid #ddd;border-radius:4px;height:200px;background-color:#fff;z-index:10;top:100%;left:0;}
    .top80{top:60%;}
    .textareaBox{overflow:hidden;}
    .textareaBox textarea{width: 190px;height: 100px;line-height: 22px;font-size: 14px;outline: none;border-radius: 4px;border: 1px solid #bfcbd9;padding: 5px 6px;resize: none;overflow:auto;}
    .compileBox .tagName{height:36px;line-height:36px;margin:5px 0;}
    .compileBox .text{float:left;margin:0 10px;}
    .cancelAndConfirm {font-size: 14px;text-align: center;overflow:hidden;}
    .compileBox .cancelAndConfirm .cancel, .compileBox .cancelAndConfirm .confirm {border-radius: 4px;border: 1px solid #2c3e50;padding: 5px 10px;background-color: #2c3e50;color: #fff;cursor: pointer;height: 18px;line-height: 18px;}
    .compileBox .cancelAndConfirm .confirm {background-color: #67649F;border-color: #67649F;}
    /*动画*/
    .fade-enter-active, .fade-leave-active {transition: all 0.5s ease-out;}

    .fade-enter, .fade-leave-active {opacity: 0;}
  }
</style>
