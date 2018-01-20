<template>
  <!--重资产图片管理-->
  <div>
    <div id="uploadMuchImg" v-if="uploadMuchImgIsShow">
      <div class="contentBox">
        <div class="navBox">
          <span class="tilName">图片管理</span>
          <span class="closeIcon" @click="closeImgPage"></span>
        </div>
        <div class="LiftAndRightBox">
          <div class="liftList">
            <ul class="labelList">
              <li v-for="(item,index) in allImgList" :class="{active:tabIndex==index}" @click="tab(index)">{{item.dictName}}({{item.picturesRef.length}})</li>
            </ul>
          </div>
          <div class="rightContentBox">
            <div class="hintNav">
              <!--提示信息-->
              <span class="hintTop" v-if="tabIndex>0">最多可上传{{temporaryMaxNumImg}}张图片 <em v-if="MaxNumImg<=temporaryMaxNumImg">,建议每次上传不超过10张</em>!</span>
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
                  <el-button size="small" type="primary"  class="mr5">添加照片</el-button>
                </el-upload>
              </div>
            </div>
            <div class="imgContent" v-if="bGetData">
              <div class="everyImgBox" v-for="(item,index) in allImgList[tabIndex].picturesRef.slice(presentPageIndex,finallyLength)">
                <div class="table" @mouseenter="hover(item.picId)" @mouseleave="leave(item.picId)">
                  <transition name="fade" mode="out-in"><!--添加动画-->
                    <p class="cover" v-if="item.picId==hoveId&&newCoveId!=item.picId&&dictionariesList[0].picTag=='coverPic'" @click="cover(item.picId)">设为封面</p>
                    <span class="coverTitleImg" v-if="newCoveId==item.picId&&dictionariesList[0].picTag=='coverPic'"></span>
                  </transition>
                  <span class="tableCell">
                    <img :src="item.picUrl" :title="'标签: '+item.textTag+(!item.coordinate?'':'  坐标:  '+item.coordinate)+(!item.remark?'':'  描述内容:  '+item.remark)">
                  </span>
                  <transition name="fade" mode="out-in">
                    <p class="bottomContent" v-if="item.picId==hoveId">
                      <span class="compile" @click="compile(item.picId,item.coordinate,item.remark,index,item.picTag)"></span>
                      <span class="delete" @click="del(item.picId,index)"></span>
                    </p>
                  </transition>
                  <transition name="fade" mode="out-in">
                    <div class="compileBox" :class="{top80:index>4}" v-if="coveId==item.picId&&compileIsShow">
                      <p class="tagName">
                        <span class="text">标签:</span>
                        <!--{{picTag}}
                        {{specialCoverPic}}-->
                        <el-select v-model="picTag" multiple :disabled="false" style="width:204px;float:left" placeholder="请选择">
                          <el-option
                            v-for="item in keywordList.slice(specialCoverPic,keywordList.length)"
                            :key="item.dictName"
                            :label="item.dictName"
                            :value="item.dictCode">
                          </el-option>
                        </el-select>
                      </p>
                      <p class="tagName">
                        <span class="text">坐标:</span>
                        <input type="text" class="longAndLat" v-model="temporaryCoordinate" maxlength="21"
                               placeholder="请输入经纬度,经度在前纬度在后"/>
                      </p>
                      <div class="textareaBox">
                        <span class="text">描述:</span>
                        <textarea placeholder="不超过200个中文字符" maxlength="200" v-model="temporaryContent"></textarea></div>
                      <p class="cancelAndConfirm">
                        <span class="cancel" @click="cancelCompile">取消</span>
                        <span class="confirm" @click="confirm(item.picId,item.coordinate,item.remark,item.picTag)">确定</span>
                      </p>
                    </div>
                  </transition>
                </div>
                <span class="imgName">{{item.fileName}}</span>
              </div>
            </div>
            <!--分页插件-->
            <div class="page" v-if="bGetData && allImgList[tabIndex].picturesRef.length>10">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="allImgList[tabIndex].picturesRef.length">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        bGetData:false,
        picturesRef:[],
        tabIndex: 0, // 当前tab选项卡index值
        M: 5, // 图片大小限制单位:M
        hintIsShow: false, // 提示函数显示隐藏
        hintMessage: '', // 提示函数文本
        //isDisplayModel: false, // 图片上传遮罩层显示隐藏
        MaxNumImg: 100, // 最大上传数量
        temporaryMaxNumImg:1,// 临时存储最大图片数量
        //uploadMuchImgIsShow: true, // 控释组件显示隐藏
        hoveId: '', // 当前悬浮的图片id
        newCoveId:'',// 当前封面图片id
        coveId:'', // 编辑框父元素id
        compileIsShow:'', // 编辑框显示隐藏
        currentPage: 10, // 分页插件个数设置
        headers: {platform: 'pc', token: localStorage.getItem('token'), version: '1'}, // 接口头信息
        fileData5: {file: '',picTag:''}, // 图片上传数组
        url: this.$baseUrl + 'longcity/services/v1/upload/singlePic',
        presentPageIndex: 0, // 当前页面索引值;当前页面减1所得到的值;初始化为0
        finallyLength: 10, // 获取当前页面切换后所显示的长度值;例:第二页的时候该值为presentPageIndex*10+10所得
        imgNumber:0, // 当前数量计数
        picTag:[], // 临时存储标签值
        temporaryContent: '', // 存储临时文本内容
        temporaryCoordinate: '', // 存储临时坐标点输入
        // allImgList:[{picTag: 0, dictName: '全部', picturesRef: []}],
        allImgList: [], // dictCode标识;dictName标识名称;
        dictionariesList:[],// 字典数组
        keywordList: [], // 保留字典
        specialCoverPic:0,// 处理封面标签显示问题(主要在select下面显示)
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
        // 判断上传图片张数
        let len=this.allImgList[this.tabIndex].picturesRef.length
        if(len>this.temporaryMaxNumImg||this.imgNumber+len>this.temporaryMaxNumImg||this.imgNumber>this.temporaryMaxNumImg){
          this.hint('最多可上传' + this.temporaryMaxNumImg + '张图片!')
          return false
        }
        let isM = file.size / 1024 / 1024
        if (isM > this.M + 0.0099) {
          this.hint('上传图片过大,最大为' + this.M + 'M!')
          return false
        }
        this.fileData5.picTag=this.dictionariesList[this.tabIndex-1].dictCode
        this.hint('图片上传中,请勿刷新页面!')
        //this.isDisplayModel = true
      },
      // 附件上传成功函数;element-ui提供方法;成功后将对应的值进行处理展示;方便上传
      success (response, file, fileList) {
        //console.log(response.result)
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
          if(response.result.picTag=='coverPic'){
            this.newCoveId=response.result.urls[i].id
          }
          this.allImgList[0].picturesRef.unshift({picUrl:response.result.urls[i].url,picId:response.result.urls[i].id,fileName:response.result.urls[i].fileName,picTag:[response.result.picTag],snapshotUrl:snapshotUrls,coordinate:'',remark:'',photoDirection:'',textTag:[]})
        }
        this.labelAllocation()
      },
      clear (){
        for(let i=1;i<this.allImgList.length;i++){
          this.allImgList[i].picturesRef=[]
        }
      },
      // 标签分配函数
      labelAllocation () {
        this.clear()
        for(let i=0;i<this.allImgList[0].picturesRef.length;i++) {
          this.allImgList[0].picturesRef[i].textTag=[]
          for(let j=0;j<this.allImgList[0].picturesRef[i].picTag.length;j++){
            for (let k = 1; k < this.allImgList.length; k++) {
              if (this.allImgList[0].picturesRef[i].picTag[j] == this.allImgList[k].picTag) {
                this.allImgList[k].picturesRef.push(this.allImgList[0].picturesRef[i])
              }
            }
            for(let l=0;l<this.dictionariesList.length;l++){
              if(this.allImgList[0].picturesRef[i].picTag[j]==this.dictionariesList[l].dictCode){
                this.allImgList[0].picturesRef[i].textTag.push(this.dictionariesList[l].dictName)
                break
              }
            }
          }
        }
        if(this.newCoveId==''&&this.allImgList[1].picturesRef.length>0){
          this.newCoveId=this.allImgList[1].picturesRef[0].picId
        }else if(this.allImgList[1].picturesRef.length<1){
          this.newCoveId=''
        }
        //this.isDisplayModel = false
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
        if(this.allImgList[index].picTag=='coverPic'||this.allImgList[index].dictName=='封面'){
          this.temporaryMaxNumImg=1
          this.specialCoverPic=0
        }else {
          this.temporaryMaxNumImg=this.MaxNumImg
          this.specialCoverPic=1
        }
        this.tabIndex = index
        this.compileIsShow=false
        this.presentPageIndex=0
        this.finallyLength=10
        this.imgNumber=0
      },
      // 关闭图片上传
      closeImgPage () {
        let arr=this.allImgList
        this.$emit('closeImgPage', arr)
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
      },
      //设为封面函数
      cover(id){
        this.coveId=''
        this.compileIsShow=''
        //点击设为封面
        for(let i=0;i<this.allImgList[0].picturesRef.length;i++){
          if(this.allImgList[0].picturesRef[i].picId==this.newCoveId){
            for(let j=0;j<this.allImgList[0].picturesRef[i].picTag.length;j++){
              if(this.allImgList[0].picturesRef[i].picTag[j]=='coverPic'){
                this.allImgList[0].picturesRef[i].picTag.splice(j,1)
              }
              if(this.allImgList[0].picturesRef[i].picTag.length<1){
                this.allImgList[0].picturesRef.splice(i,1)
                break
              }
            }
          }
        }
        for(let i=0;i<this.allImgList[0].picturesRef.length;i++){
          if(this.allImgList[0].picturesRef[i].picId==id){
            this.allImgList[0].picturesRef[i].picTag.unshift('coverPic')
            break
          }
        }
        this.newCoveId=id
        this.labelAllocation()
      },
      // 编辑函数
      compile (id,coordinate,remark,index,picTag) {
        for(let i=0;i<picTag.length;i++){
          if(this.dictionariesList[0].picTag=='coverPic'){
            if(picTag[i]=='coverPic'){
              this.specialCoverPic=0
              break
            }else {
              this.specialCoverPic=1
            }
          }else {
            this.specialCoverPic=0
            break
          }
        }
        this.keywordList=this.dictionariesList
        this.coveId=id
        this.compileIsShow=true
        this.picTag=picTag
        this.temporaryContent=remark
        this.temporaryCoordinate=coordinate
      },
      // 确认函数
      confirm (id,coordinate,remark,picTag) {
        if(this.picTag.length<1){
          this.hint('标签不能为空')
          return
        }
        for(let i=0;i<this.allImgList[0].picturesRef.length;i++){
          if(this.allImgList[0].picturesRef[i].picId==id){
            this.allImgList[0].picturesRef[i].picTag=this.picTag
            this.allImgList[0].picturesRef[i].remark=this.temporaryContent
            this.allImgList[0].picturesRef[i].coordinate=this.temporaryCoordinate
            break
          }
        }
        //this.allImgList[this.tabIndex].picturesRef[index].remark=this.temporaryContent
        this.labelAllocation()
        this.coveId=''
        this.compileIsShow=''
      },
      // 取消编辑函数
      cancelCompile (){
        this.coveId=''
        this.temporaryContent=''
        this.temporaryCoordinate=''
        this.compileIsShow=''
        this.picTag=''
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
          for(let i=0;i<that.allImgList[0].picturesRef.length;i++){
            if(that.allImgList[0].picturesRef[i].picId==id){
              that.allImgList[0].picturesRef.splice(i,1)
              break
            }
          }
          that.labelAllocation();
          if(that.allImgList[that.tabIndex].picturesRef.length<=10){
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
      // 左侧导航栏内容加载函数
      leftDictionariesList (dictionariesName) {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/dict/dictListByType',
          // data: {'dictTypes': [that.dictionariesName]}
          //data: {'dictTypes': ['project_image_type']}
          //running_sub_type', 'standard', 'hotel_rating', 'product_positioning', 'running_type_choose', 'customer_choose
          data: {'dictTypes': [dictionariesName]}
        }).then(function (succeed) {
          let dictionaries = succeed.data.result[0].items
          that.dictionariesList = succeed.data.result[0].items // 保留字典关键字数组;
          if(dictionaries.length<1){
            that.closeImgPage()
            that.hint('获取标签列表为空!')
            return
          }

          that.bGetData = true;
          for(let i=0;i<that.dictionariesList.length;i++){
            that.dictionariesList[i].picTag=that.dictionariesList[i].dictCode
          }
          for (let i = 0; i < dictionaries.length; i++) {
            that.allImgList.push({
              picTag: dictionaries[i].dictCode,
              dictName: dictionaries[i].dictName,
              picturesRef: [],
              textTag:[]
            })
          }
          that.allImgList.unshift({picTag: 0, dictName: '全部', picturesRef: []})
          that.allImgList[0].picturesRef=that.theInitImgData
          that.labelAllocation()
        }, function (err) {
          console.log(err)
        })
      },
      // 从父组件获取字典字段方法
      dictTypes(dictionariesName){
        if(dictionariesName==undefined||dictionariesName==''){
          //此处判断当父页面传值为空或者未传值的时候提示信息
          this.hint('获取数据错误!')
        }else {
          if(this.dictionariesList.length>0){
            return
          }else {
            this.leftDictionariesList(dictionariesName)
          }
        }
      },
      // 提示函数
      hint (message) {
        let that = this
        this.hintIsShow = true
        that.hintMessage = message
        //clearTimeout()
        setTimeout(function () {
          that.hintIsShow = false
        }, 3000)
      }
    },
    mounted () {
      //this.leftDictionariesList()
      //console.log(this.theInitImgData)
    },
    props: {
      theInitImgData:Array,
      uploadMuchImgIsShow:Boolean
      /*dictionariesList: Array,
      picTagList: Array,
      uploadMuchImgIsShow:Boolean*/
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #uploadMuchImg{width:100%;height:100%;position:fixed;top:0;left:0;background-color:rgba(0,0,0,0.3);z-index:1000;}
  /*#modelBox{width:100%;height:100%;position:fixed;top:0;left:0;background-color: rgba(0, 0, 0, 0.3);z-index:1002;}*/
  #modelBox .loadingStyle {position: absolute;top: 50%;left: 0;width: 100%;color: #fff;font-size: 14px;text-align: center;user-select:none;}
  #uploadMuchImg{
    .contentBox{border:1px solid #ddd;width:70%;height:80%;margin:5% auto 0;border-radius:4px;background-color:#fff;}
    .navBox{height:8%;position:relative;background-color:#67649F;border-radius:4px 4px 0 0;}
    .navBox:before{content:'';display:block;width:100%;position:absolute;bottom:0;left:0;border-bottom:1px solid #ddd;z-index:1;}
    .tilName{height:24px;line-height:24px;position:absolute;top:50%;margin-top:-12px;left:15px;color:#fff;font-size:16px;}
    .closeIcon{float: right;cursor: pointer;background: url("../assets/images/close.png") center center no-repeat;width: 24px;height: 24px;position: absolute;top:50%;margin-top:-12px;right:15px;}
    .LiftAndRightBox{height:92%;width:100%;clear:both;}
    .liftList{height:100%;width:15%;float:left;position:relative}
    .labelList{height:100%;overflow:hidden;background-color:#f4f4f4;}
    .labelList li{float:left;min-height:20px;line-height:20px;font-size:14px;width:94%;cursor:pointer;user-select:none;padding:10px 3%;}
    .labelList li.active{color:#67649f;cursor:context-menu;background-color:#fff;}
    .rightContentBox{width:85%;height:100%;float:left;position:relative;}
    .rightContentBox:before{content:'';display:block;width:0;height:100%;position:absolute;top:0;left:0;border-right:1px solid #ddd;z-index:1;}
    .hintNav{height:10%;width:100%;}
    .hintNav{height:10%;max-height:40px;width:100%;position:relative;}
    .hintTop{position: absolute;height:24px;line-height:24px;top:50%;left:15px;margin-top:-12px;user-select:none;}
    .hintNav:before{content:'';display:block;width:0;width:100%;position:absolute;left:0;bottom:0;border-bottom:1px solid #ddd;z-index:1;}
    .everyImgBox{width:19%;height:180px;position:relative;float:left;margin:1% 0.5%;display:block;}
    .table{display:block;width:100%;height:120px;border:1px solid #ddd;border-radius:4px;position:relative;}
    .cover {width: 100%;height: 27px;background-color: #67649F;font-size: 12px;text-align: center;line-height: 27px;color: #fff;position: absolute;top: 0;left: 0;cursor: pointer;border-radius:4px 4px 0 0;}
    /*设置为封面页面的右上角图标*/
    .coverTitleImg {
      background: url("../assets/images/coverTitle.png") left top no-repeat;background-size: 40px 40px;display: block;width: 40px;height: 40px;position: absolute;left: 0;top: 0;}
    .tableCell{display:block;vertical-align:middle;width:100%;height:120px;line-height:120px;overflow:hidden;text-align:center;}
    .tableCell img{max-width:165px;max-height:120px;margin:0 auto;}
    .imgName{display:block;width:100%;height:40px;line-height:20px;overflow:hidden;word-wrap: break-word;display: -webkit-box !important;text-overflow: ellipsis;word-break: break-all; -webkit-box-orient: vertical;-webkit-line-clamp: 2;margin-top:10px;}

    .rightContentBox .page{position:absolute;bottom:10px;left:20px;}
    .bottomContent { position: absolute; bottom: 0; right: 0; cursor: pointer; background-color: rgba(0, 0, 0, 0.6); width:100%; height: 26px;border-radius:0 0 4px 4px;}
    .bottomContent .compile, .bottomContent .delete { width: 24px; height: 24px; display: block; background-size: 24px 24px;}
    .bottomContent .compile {float: left;background:url("../assets/images/compile.png") center center no-repeat;margin-left:20%;}
    .bottomContent .delete {float:right;background:url("../assets/images/delete.png") center center no-repeat;margin-right:20%;}
    .file{display: block; width: 100px; height: 32px;position: absolute;right:15px;top:50%;margin-top:-17px;}
    .el-button--primary{width:100px;height:32px;background:url("../assets/images/add.png") 8px 6px no-repeat;background-color:#67649F;border-color:#67649F;background-size:16px;}
    .compileBox{position:absolute;width:260px;border:1px solid #ddd;border-radius:4px;min-height:240px;background-color:#fff;z-index:10;top:100%;left:0;}
    .top80{top:-10%;}
    .textareaBox{overflow:hidden;}
    .textareaBox textarea{width: 190px;height: 100px;line-height: 28px;font-size: 14px;outline: none;border-radius: 4px;border: 1px solid #bfcbd9;padding: 5px 6px;resize: none;overflow:auto;}
    .compileBox .tagName{min-height:36px;line-height:36px;margin:5px 0;}
    .compileBox .text{float:left;margin:0 10px;}
    .cancelAndConfirm {font-size: 14px;text-align: center;overflow:hidden;}
    .compileBox .cancelAndConfirm .cancel, .compileBox .cancelAndConfirm .confirm {border-radius: 4px;border: 1px solid #2c3e50;padding: 5px 10px;background-color: #2c3e50;color: #fff;cursor: pointer;height: 18px;line-height: 18px;}
    .compileBox .cancelAndConfirm .confirm {background-color: #67649F;border-color: #67649F;}
    .longAndLat {width:202px;height: 36px;line-height: 28px; font-size: 12px; outline: none; border-radius: 4px; border: 1px solid #bfcbd9;text-indent: 6px;}
    /*动画*/
    .fade-enter-active, .fade-leave-active {transition: all 0.5s ease-out;}
    .fade-enter, .fade-leave-active {opacity: 0;}
  }
</style>
