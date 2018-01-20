<template>
  <div class="fileBox" id="fileBox" v-on:imgSrc="imgSrc" v-on:imgNum="imgNumber" v-on:options="options"  :coverId="coverTitleImgIndex" v-on:AllList="" v-on:TabIndex="" v-on:maxLength="">
    <div class="addNav">
      <slot name="reminder" class="textFile"></slot>
      <!--查看时时数据传递状态-->
     <!-- <span>{{imgNumber}}</span>
      <span>{{maxNumber}}</span>-->
      <!--<div class="file" v-if="displayNone" :class="imgNumber<maxNumber?'':'disabled'||AllList[TabIndex].ArrayName.length==maxLength?'':'disabled'">-->
      <div class="file" v-if="displayNone">
        <span class="text">添加照片</span>
        <input type="file" v-if="imgNumber<maxNumber?true:false||AllList[TabIndex].ArrayName.length==maxLength?false:true"  @change="file"  id="photo" accept="image/jpg,image/jpeg,image/png" multiple="multiple"/>
      </div>
    </div>
    <div class="imgBox">
      <!--:class="{mt0:index>4}"用途：当到第二行的时候margin-bottom为0-->
      <div class="content" :class="{mt0:index>4}" v-for="(todo,index) in showImgLisensd.slice(presentPageIndex,finallyLength)">
        <div class="every" @mouseenter="hover(index)" @mouseleave="leave(index)">
          <!--todo.fileData!=''此条件判断当图片上传失败返回空的URL的时候不出现封面设置-->
          <transition name="fade" mode="out-in"><!--添加动画-->
            <p v-if="TabIndex>0" v-show="todo.id!=coverTitleImgIndex&&todo.fileData!=''&&todo.isShow" class="cover"  @click="cover(index,todo.id,todo)">设为封面</p>
          </transition>
          <span class="coverTitleImg" v-if="todo.id==coverTitleImgIndex"></span>
          <span class="littleBox">
              <img :src="todo.fileData"/>
          </span>
          <transition name="fade" mode="out-in">
            <p v-if="TabIndex>0" v-show="todo.isShow" class="bottomContent" >
              <span class="compile" @click="compile(index)" v-if="todo.fileData!=''"></span>
              <span class="delete" @click="deletes(index)"></span>
            </p>
          </transition>
          <transition name="fade" mode="out-in">
            <span v-if="TabIndex>0" v-show="index==compileIndex" class="triangle"></span>
          </transition>
          <transition name="fade" mode="out-in">
            <div v-if="TabIndex>0" v-show="index==compileIndex&&compileIndex!=null" class="compileContent" :class="{leftPosition:(index+1)%5==0}">
              <!--(index+1)%5 (当第五个的时候index为4所以+1)当第五的倍数添加类名 -->
              <!--选择标签-->
              <!--<p class="labelBox">
                  <span class="names">标签：</span>
                  <el-select width="95%" filterable allow-create v-model="labelList" multiple placeholder="请选择">
                      <el-option
                          v-for="item in options"
                          style="line-height:36px;text-indent:10px;"
                          :key="item.value"
                          :value="item.value">
                      </el-option>
                  </el-select>
              </p>-->
              <!--第一期不是实现该功能-->
              <!--<p class="labelBox">
                <span class="names">标签：</span>
                <span>{{todo.dictName}}</span>
              </p>-->
              <p class="labelBox">
                <span class="names">坐标：</span>
                <input type="text" class="longAndLat" maxlength="21" v-model="coordinate" placeholder="经度在前，纬度在后，英文逗号分开，小数点后六位"/>
              </p>
              <p class="labelBox">
                <span class="names describeName">描述：</span>
                <textarea v-model="describeContent" class="textImport" maxlength="200" placeholder="不超过200个中文字符"></textarea>
              </p>
              <p class="cancelAndConfirm">
                <span class="cancel" @click="cancel">取消</span>
                <span class="confirm" @click="confirm(index)">确定</span>
              </p>
            </div>
          </transition>
        </div>
        <p class="text">{{todo.fileName}}</p>
      </div>
    </div>
    <!--分页插件-->
    <div class="page" v-if="imgSrc.length>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        layout="prev, pager, next"
        :total="imgSrc.length">
      </el-pagination>
    </div>
    <!--提示-->
    <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
    <!--图片上传就提交-->
    <div class="modelBox" :class="{displayModel:isDisplayModel}">
      <p class="loadingStyle">图片加载中请勿刷新!</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'fileImg',
    data() {
      return {
        //displayNone:true,//配置上传图片按钮显示及隐藏;需要在父组件中配置;已配置
        //imgSrc:[],//图片URL地址存放数组
        Index:0,
        All:[],
        showImgLise:[],
        imgNumber:0,//目前图片上传个数后面做判断使用无需更改;此处为固定值
        //maxNumber:20,//允许上传的最大图片数量
        maxNumber:this.maxLength,//允许上传的最大图片数量
        M:5,//图片大小设置单位M
        skipPageNum:1,//初始化跳转页面值
        isLast:false,//初始化上一页按钮
        isNext:false,//初始化下一页按钮
        coverTitleImgIndex:null,//初始化设置封面时候对应的index值
        compileIndex:null,//接受当前点击的编辑按钮的index值
        pageIndex:0,//留住当前页面的page值
        presentPageIndex:0,//当前页面索引值;当前页面减1所得到的值;初始化为0
        finallyLength:10,//获取当前页面切换后所显示的长度值;例:第二页的时候该值为presentPageIndex*10+10所得
        coordinate:'',//坐标点
        describeContent:'',//描述内容
        labelList: [],//插件选择标签暂存数组
        currentPage4: 10,//分页插件
        isDisplayModel:true,
        hintMessage:'',//提示消息
        hintIsShow:false,
      }
    },
    computed:{
      showImgLisensd(){
        return this.imgSrc
      }
    },
    methods:{
      //分页函数
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        let that=this;
        this.pageIndex=(val-1);
        this.presentPageIndex=(val-1)*10;
        this.finallyLength=(val-1)*10+10;
        //console.log(`当前页: ${val}`);
      },
      //点击编辑栏的确认函数
      confirm(index){
        //获取对应的值；将其赋值给对应的对象；然后将其所有的内容继续清空;
        //this.labelList;
        //console.log(this.pageIndex);
        let that=this;
        let presentImgSrc=this.imgSrc[10*this.pageIndex+index];
        //presentImgSrc.coordinate=[this.coordinate];
        //注释原因：后台数据结构为一个字符串
        let strs= new Array();
        let point=/^([1-9]{2,3}\.[0-9]{6})$/;
        let nsds=this.coordinate;
        strs=nsds.split(",");//将字符串切割为数组
        //presentImgSrc.coordinate=strs;//添加一个coordinate的字段并赋值:存储经纬度坐标点
        if(point.test(strs[0])==true&&point.test(strs[1])==true){
          presentImgSrc.coordinate=this.coordinate;//添加一个coordinate的字段并赋值:存储经纬度坐标点
          presentImgSrc.remark=this.describeContent;//添加一个describeContent的字段并赋值:存储描述内容
          //console.log(this.imgSrc);
          this.cancel();//调用关闭函数;将编辑窗口关闭
        }else{
          that.hint("请输入正确的坐标点!");
        }
      },
      //点击取消按钮隐藏对应的编辑框
      cancel(){
        this.compileIndex=null;
        //vue中数据具有双向绑定功能;当点击取消的时候应该将对应的值清空;
        //console.log(this.labelList);
        this.labelList=[];//但点击取消清除标签对应的数组;
        this.coordinate='';
        this.describeContent='';
      },
      /*openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 3000);
      },*/
      //点击编辑函数
      compile(index){
        //this.openFullScreen()
        if(this.compileIndex!=null){
          this.compileIndex=null;
        }else {
          this.compileIndex=index;
          this.labelList=[];//但点击取消清除标签对应的数组;
        }
      },
      //设为封面函数
      cover(index,id,todo){//当前是图片的id;todo是图片的所有属性
        //console.log(this.AllList[0].ArrayName);
        this.AllList[1].ArrayName=[];
        this.AllList[1].ArrayName.push(todo);
        this.coverTitleImgIndex=id;
        //this.imgSrc[1].ArrayName
        //console.log(this.imgSrc);
        //this.coverTitleImgIndex=10*this.pageIndex+index;
      },
      //鼠标进入显示编辑和删除函数
      hover(index){
        //this.imgSrc[index].isShow=true;
        this.imgSrc[10*this.pageIndex+index].isShow=true;
        //this.showImgLise[index*this.pageIndex+index].isShow=true;
      },
      //鼠标退出隐藏编辑和删除函数
      leave(index){
        //this.imgSrc[index].isShow=false;
        let that=this;
        this.imgSrc[10*this.pageIndex+index].isShow=false;
        /*clearTimeout();
        setTimeout(function () {
          if(that.compileIndex!=null&&that.coordinate==""&&that.describeContent==""){
            that.compileIndex=null;
          }
        },5000)*/
        //this.showImgLise[index*this.pageIndex+index].isShow=false;
      },
      //图片删除函数
      deletes(index){
        //console.log(this.imgSrc)
        var delIndex=10*this.pageIndex+index;//10代表页面显示的个数;this.pageIndex是当前第几页减1的值;从而获取imgSrc数组对象中所对应的值从而进行删除操作;上面使用到的计算方法相同
        this.open2(delIndex);
        this.cancel();//点击删除调用隐藏函数;
        /*this.imgSrc.splice(index,1);//删除数组中对应的值--现在移动到open2提示函数里面了
        console.log(this.imgSrc);
        this.imgNumber--;
        if(index==this.coverTitleImgIndex){//判断当删除封面图片的时候将原有的数值清空
          this.coverTitleImgIndex=null;
        }*/
      },
      file(){
        let that=this;
        //let arr=this.imgSrc;//本地预览使用
        let arr=[];//服务器使用
        let files = document.getElementById('photo').files;

        that.imgNumber=this.AllList[this.TabIndex].ArrayName.length;
        that.maxNumber=this.maxLength;
        //判断浏览器是否支持FileReader
        if (typeof FileReader == "undefined") {
          //that.imgUpDataErr("您的浏览器不支持图片上传功能，请升级或者更换高版本浏览器！");
          that.hint("您的浏览器不支持图片上传功能，请升级或者更换高版本浏览器!")
          //document.write('<a href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html">下载chrome</a>')
          return
        } else {
          //document.write("您的浏览器支持FileReader");
        }
        if(this.TabIndex==1&&that.AllList[that.TabIndex].ArrayName.length>=1){//判断当为封面数组内部有一张封面停止上传图片
          return;
        }
        var img = new Image();
        for(var i=0;i<files.length;i++){
          var len=files.length;
          //var img = new Image();
          var reader = new FileReader();
          reader.readAsDataURL(files[i]);
          //console.log(files[i].name)
          var name=files[i].name;
          var type=files[i].type.split('/')[1];
          //写成闭包;否则for循环中读取的最后一个i的值,并将当前的i和name名传入;
          function closure(i,imgName) {
            reader.onload = function(e){
              //var kb = (e.total/1024);
              var ImgSize = (e.total/1024/1024);
              if(type=='jpeg'||type=='png'||type=='jpg'){
                if(that.imgNumber<=that.maxNumber||that.maxNumber<files.length){
                  if(that.M>=ImgSize){
                    that.imgNumber++;
                    img.src = this.result;
                    if(i<that.maxNumber&&that.imgNumber<=that.maxNumber){
                      arr.push({fileData:img.src,fileName:imgName});
                      that.showImgLise=that.imgSrc;
                      if(arr.length==files.length&&arr.length>0||arr.length==that.maxNumber||that.imgNumber==that.maxNumber){//防止接口重复调用;且当传入所有的图片符合的上传图片的要求情况下直接调用接口
                        that.isDisplayModel=false;
                        that.loading(arr);
                      }
                    }
                  }else {
                    //that.imgUpDataErr("您选择的图片太大;最大为"+that.M+"M!");
                    that.hint("您选择的图片太大;最大为"+that.M+"M!");
                    var len=arr.length;
                    len++;
                    if(len>=files.length&&arr.length>0){//当有部分图片大于上传允许的范围后上传的图片个数有变化；需要使用该方法调用上传接口
                      //that.imgUpDataErr("图片上传中,请勿刷新页面!");
                      that.isDisplayModel=false;
                      that.loading(arr);
                    }
                  }
                }else {
                  //that.imgUpDataErr("最多可上传"+that.maxNumber+"张图片!");
                  that.hint("最多可上传"+that.maxNumber+"张图片!");
                  return false;
                }
              }else{
                that.hint("请选择正确的图片格式!");
                //that.imgUpDataErr("请选择正确的图片格式!");
              }
            }
          }
          closure(i,name);
        }
      },
      //将图片上传至服务器返回链接函数
      loading(obj){
        let that=this;
        // 需要添加判断如果提交的数组为空将不提交
        this.$http({
          method:'post',
          url:'longcity/services/v1/upload/pc/multi',//多图上传接口
          //url:'http://test-longcity.longfor.com:9080/longcity/services/v1/upload/multi',
          data:obj
        }).then(function (succeed) {
          console.log(succeed);
          if(succeed.data.code==303){
            that.hint(succeed.data.message)
          }else {
            //添加判断返回的成功状态
            let list=succeed.data.result;
            //console.log(that.AllList)
            let everyObj=that.AllList[that.TabIndex]
            for(var i=0;i<list.length;i++){
              that.imgSrc.push({id:list[i].id,fileData:list[i].url,fileName:list[i].fileName,isShow:false,dictName:everyObj.dictName,dictCode:everyObj.dictCode})
            }
            if(that.TabIndex==1){
              that.coverTitleImgIndex=list[0].id;
            }
            //console.log(that.imgSrc)
            that.isDisplayModel=true;
            document.getElementById('photo').value='';//修复再次选择同一张图片的时候change事件检测未改变的bug
          }

          //console.log(document.getElementById('photo').files)
        },function (err) {
          console.log(err)
        });
      },

      //删除提示函数
      open2(index) {
        let that=this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          //type: 'warning'//提示小图标配置,取值为:success/info/warning/error
        }).then(() => {
          //console.log(that.imgSrc);
          //console.log(that.coverTitleImgIndex);
          if(that.imgSrc[index].id==this.coverTitleImgIndex){//判断当删除封面图片的时候将原有的数值清空
            this.AllList[1].ArrayName=[];
            this.coverTitleImgIndex=null;
            that.imgSrc.splice(index,1);
          }else {
            that.imgSrc.splice(index,1);
          }
          that.imgNumber=that.imgSrc.length;
          //下面代码为删除成功后的提示;
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          //下面代码为取消删除后的提示;
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //提示函数
      hint(message){
        let that=this;
        this.hintIsShow=true;
        that.hintMessage=message;
        clearTimeout();
        setTimeout(function(){
          that.hintIsShow=false;
        },3000);
      }
    },
    mounted(){
      //this.register()//模拟时候使用;获取到token注释;token过期重新调用
    },
    //,props:["displayNone"]
    props:{
      displayNone:Boolean,
      //coverCorrelation:Boolean,//该属性作用是控制封面中按钮上传与否
      imgSrc:Array,
      AllList:Array,
      imgNum:Number,
      TabIndex:Number,
      maxLength:Number,
      options:Array,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{margin:0;padding:0;}
  /*.imgBox{padding:30px 28px;padding-bottom:0;height:390px;}*/
  .imgBox{padding:15px 9px;padding-bottom:0;height:315px;}
  .fileBox .content{width:20%;height:150px;float:left;position:relative;margin-bottom:15px;}
  .fileBox .mt0{margin-bottom:0;}
  .fileBox .content .text{font-size:12px;color:#666;line-height:18px;word-wrap: break-word; word-break: normal;overflow:hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;margin-top:10px;text-align:left;}
  /*.imgBox .every{width:116px;height:116px;position:relative;border:1px solid #ddd;}*/
  .imgBox .every{width:100px;height:100px;position:relative;border:1px solid #ddd;margin:0 auto;}
  .imgBox .content:nth-child(5n){margin-right:0;}
  /*点击按钮下方编辑栏*/
  .imgBox .every .triangle{width:0; height:0; border-left:10px solid transparent; border-right:10px solid transparent; border-bottom:10px solid #ddd;position:absolute;top:117px;left:50%;margin-left:-10px;z-index:10;}
  /*.imgBox .every .compileContent{width:285px;min-height:255px;display:block;border:1px solid #ddd;position:absolute;left:0;top:127px;background-color:#fff;z-index:10;border-radius: 4px;font-size:12px;}*/
  .imgBox .every .compileContent{width:285px;min-height:215px;display:block;border:1px solid #ddd;position:absolute;left:0;top:127px;background-color:#fff;z-index:10;border-radius: 4px;font-size:12px;}
  .imgBox .every .leftPosition{left:-140px;}

  /*.fileBox{width:728px;}*/
  .fileBox{width:100%;}
  .addNav{width:100%;height:50px;border-bottom:1px solid #ddd;}
  .fileBox .file{display:block;width:100px;height:36px;border:1px solid #eee;position:relative;float:right;background-color:#67649F;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;cursor:pointer;margin-top:6px;margin-right:3px;}
  .fileBox .disabled{background-color:#2c3e50}
  .fileBox .file .text{font-size:14px;color:#fff;height:36px;line-height:36px;padding-left:18px;position:relative;cursor:pointer;text-indent:12px;}
  .fileBox .file .text:before{content:"+";font-size:18px;color:#fff;line-height:36px;position:absolute;left:0;top:-1px;}

  /*编辑栏样式*/
  .fileBox .labelBox{margin-top:10px;text-align:left;padding:0 10px;}
  .fileBox .labelBox .longAndLat{width:217px;height:36px;line-height:28px;font-size:12px;outline:none;border-radius:4px;border:1px solid #bfcbd9;text-indent:6px;padding-right:6px;}
  .fileBox .labelBox .describeName{float:left;margin-right:4px;}
  .fileBox .labelBox .textImport{width:211px;height:100px;line-height:28px;font-size:14px;outline:none;border-radius:4px;border:1px solid #bfcbd9;padding:5px 6px;resize: none;}
  .fileBox .every .cancelAndConfirm{height:30px;line-height:30px;font-size:14px;text-align: center}
  .fileBox .every .cancelAndConfirm .cancel,.fileBox .every .cancelAndConfirm .confirm{border-radius:4px;border:1px solid #2c3e50;padding:5px 10px;background-color: #2c3e50;color:#fff;cursor:pointer;height:18px;line-height:18px;}
  .fileBox .every .cancelAndConfirm .confirm{background-color:#67649F;border-color:#67649F;}

  /*分页样式*/
  .fileBox .page{padding:10px 15px;height:26px;line-height:26px;font-size:12px;}
  /*.imgBox .every .littleBox{width:118px;height:118px;display:table-cell;vertical-align:middle;text-align:center;}*/
  .imgBox .every .littleBox{width:100px;height:100px;display:table-cell;vertical-align:middle;text-align:center;}
  .imgBox .every .cover{width:100%;height:27px;background-color:#67649F;font-size:12px;text-align: center;line-height:27px;color:#fff;position:absolute;top:0;left:0;cursor:pointer;}
  /*.bottomContent{position: absolute;bottom:0;right:0;cursor:pointer;background-color:rgba(0,0,0,0.6);width:66px;height:26px;padding:5px 25px;}*/
  .bottomContent{position: absolute;bottom:0;right:0;cursor:pointer;background-color:rgba(0,0,0,0.6);width:70px;height:26px;padding:5px 15px;}
  .bottomContent .compile,.bottomContent .delete{width:24px;height:24px;display: block;background-size:24px 24px;}
  .bottomContent .compile{float:left;background:url("../assets/images/compile.png") center center no-repeat;}
  .bottomContent .delete{float:right;background:url("../assets/images/delete.png") center center no-repeat;}
  /*.every img{max-width:116px;max-height:116px;}*/
  .every img{max-width:100px;max-height:100px;}
  #photo{width:100px;height:36px;position:absolute;top:0;left:0;z-index:2;opacity:0;cursor:pointer;}
  /*动画*/
  .fade-enter-active,.fade-leave-active{transition:all 0.5s ease-out;}
  .fade-enter,.fade-leave-active{opacity:0;}
  /*设置为封面页面的右上角图标*/
  .coverTitleImg{background:url("../assets/images/coverTitle.png") left top no-repeat;background-size:40px 40px;display:block;width:40px;height:40px;position: absolute;left:0;top:0;}
  /*遮罩层*/
  .modelBox{display:block;width:100%;height:100%;background-color:rgba(0,0,0,0.3);position:fixed;top:0;left:0;z-index:20000;}
  .modelBox.displayModel{display:none}
  .loadingStyle{position: absolute;top:50%;left:0;width:100%;color:#fff;font-size:14px;text-align:center;}

  /*提示函数 */
  .tanTip{height: 38px;width: 380px;border-radius: 4px;box-shadow: 3px 3px 3px #ddd;text-align: center;line-height: 38px;color: #ffffff;font-size: 14px;position: absolute;top: 10%;left: 50%;margin-left: -136px;z-index: 9999;background-color:rgba(0,0,0,0.4)}
  /*placeholder颜色*/
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { color: #999; }
</style>
