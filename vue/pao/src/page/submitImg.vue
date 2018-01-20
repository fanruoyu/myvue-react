<template>
  <div class="submitImg" id="submitImg">
    <!--内容区域-->
    <div class="contentBox">
      <p class="checkboxImgTil">
        <span class="checkText">图片管理</span>
        <span class="rightIcon" @click="closeImgPage"></span>
      </p>
      <!--左侧列表栏-->
      <div class="leftList">
        <ul class="labelBoxLeft">
          <li class="label" v-for="(item,index) in AllDataList" @click="tab(index)"
              :class="isActive==index?'active':''">{{item.dictName}}({{item.picturesRef.length}})
          </li>
        </ul>
      </div>
      <!--右侧图片展示区域-->
      <div class="rightContent">
        <div class="addNav">
          <!--提示信息-->
          <span class="hintTop" v-if="isActive!==0">最多可上传{{maxNumbe}}张图片<em v-if="isActive>1">,建议每次上传不超过10张!</em></span>
          <!--点击按钮-->
          <div class="file" v-if="displayNone">
            <span class="text">添加照片</span>
            <input type="file" v-if="AllDataList[isActive].picturesRef.length<maxNumbe" id="photo"
                   accept="image/jpg,image/jpeg,image/png" @change="file" multiple="multiple"/>
          </div>
        </div>
        <!--图片内容展示区域-->
        <div class="imgBox">
          <!--每一个图片内容展示区域-->
          <div class="content"
               v-for="(todo,index) in AllDataList[isActive].picturesRef.slice(presentPageIndex,finallyLength)"
               :class="{mt0:index>4}">
            <div class="every" @mouseenter="hover(todo.picId)" @mouseleave="leave(todo.picId)">
              <transition name="fade" mode="out-in"><!--添加动画-->
                <p class="cover" v-if="todo.picId==hoveId&&newCoveId!=todo.picId" @click="cover(todo.picId)">设为封面</p>
              </transition>
              <!--编辑小图标-->
              <span class="coverTitleImg" v-if="newCoveId==todo.picId"></span>
              <span class="littleBox">
                <img :src="todo.picUrl" :title="'标签: '+todo.textTag+(!todo.coordinate?'':'  坐标:  '+todo.coordinate)+(!todo.remark?'':'  描述内容:  '+todo.remark)">
              </span>
              <transition name="fade" mode="out-in">
                <p class="bottomContent" v-if="todo.picId==hoveId">
                  <span class="compile" @click="compile(todo.picId,todo.textTag,todo.coordinate,todo.remark)"></span>
                  <span class="delete" @click="del(todo.picId)"></span>
                </p>
              </transition>
              <!--倒三角形-->
              <!--<transition name="fade" mode="out-in">
                <span class="triangle" v-if="todo.picId==coveIndex&&isCompile==true"></span>
              </transition>-->
              <!--编辑区域-->
              <transition name="fade" mode="out-in">
                <div class="compileContent" v-if="todo.picId==coveIndex&&isCompile==true"
                     :class="{leftPosition:(index+1)%5==0,leftPosition4:(index+1)%4==0,bottomPosition:index>4,leftBttomPosition:(index+1)%4==0&&index>4,leftBottomPosition:(index+1)%5==0&&index>4}">
                  <!--(index+1)%5 (当第五个的时候index为4所以+1)当第五的倍数添加类名 -->
                  <!--选择标签-->
                  <p class="labelBox">
                    <span class="names">标签：</span>
                    <el-select width="95%" filterable allow-create v-model="options" multiple placeholder="请选择">
                      <el-option
                        v-for="item in keywordList.slice(1,keywordList.length)"
                        style="padding:0;line-height:36px;text-indent:10px;"
                        :key="item.dictCode"
                        :value="item.dictName">
                      </el-option>
                    </el-select>
                  </p>
                  <p class="labelBox">
                    <span class="names">坐标：</span>
                    <input type="text" class="longAndLat" v-model="temporaryCoordinate" maxlength="21"
                           placeholder="请输入经纬度,经度在前纬度在后"/>
                  </p>
                  <p class="labelBox">
                    <span class="names describeName">描述：</span>
                    <textarea class="textImport" v-model="temporaryContent" maxlength="200"
                              placeholder="不超过200个中文字符"></textarea>
                  </p>
                  <p class="cancelAndConfirm">
                    <span class="cancel" @click="cancel">取消</span>
                    <span class="confirm"
                          @click="confirm(todo.picId,todo.textTag,todo.coordinate,todo.remark)">确定</span>
                  </p>
                </div>
              </transition>
            </div>
            <p class="text">{{todo.fileName}}</p>
            <!--<p class="text">{{todo.fileName!=undefined&&todo.fileName.length>15?todo.fileName.slice(0,15)+'...':todo.fileName}}</p>-->
          </div>
        </div>
        <!--分页插件-->
        <div class="page" v-if="AllDataList[isActive].picturesRef.length>10">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next"
            :total="AllDataList[isActive].picturesRef.length">
          </el-pagination>
        </div>
      </div>
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
    name: 'submitImg',
    data () {
      return {
        isActive: 0, // 左侧标签栏选中值(当前选中的index)
        isCompile: false, // 编辑按钮控制显示隐藏
        M: 5, // 图片大小
        coveImgLength: 1, // 封面
        maxImgLength: 100, // 图片个数
        maxNumbe: 0, // 图片个数
        hintMessage: '', // 提示消息
        hintIsShow: false, // 提示消息框控制显示和隐藏
        keywordList: [], // 保留字典
        displayNone: false, // 显示隐藏
        displayNoneInput: false, // 显示隐藏上传按钮
        options: [], // 存储临时字典标签值
        temporaryCoordinate: '', // 存储临时坐标点输入
        temporaryContent: '', // 存储临时文本内容
        // keyword:,// 保留字典
        hoveId: '', // 当前悬浮的图片id
        coveIndex: '', // 留住点击编辑框id
        AllDataList: [{dictCode: 0, dictName: '全部', picturesRef: []}], // dictCode标识;dictName标识名称;
        isDisplayModel: true, // 图片加载遮罩层
        presentPageIndex: 0, // 当前页面索引值;当前页面减1所得到的值;初始化为0
        finallyLength: 10, // 获取当前页面切换后所显示的长度值;例:第二页的时候该值为presentPageIndex*10+10所得
        // oldCoveId:null,// 留住设为封面图片的id做查询使用;
        newCoveId: null, // 留住设为封面图片的id;
        currentPage: 10 // 分页插件个数设置
      }
    },
    methods: {
      // 关闭方法;该方法名及方法如有更改需要配合新建页中也需要更改
      closeImgPage () { // 处理数据
        for (var i = 0; i < this.AllDataList[0].picturesRef.length; i++) {
          var str = this.AllDataList[0].picturesRef[i].picUrl
          var snapshotUrls
          if (str.indexOf('.png') > -1) { // 判断返回url结尾然后切割;拼接将小图片链接返回
            snapshotUrls = str.split('.png')[0] + '-small.png'
          } else if (str.indexOf('.jpg') > -1) {
            snapshotUrls = str.split('.jpg')[0] + '-small.jpg'
          } else if (str.indexOf('.jpeg') > -1) {
            snapshotUrls = str.split('.jpeg')[0] + '-small.jpeg'
          }
          this.AllDataList[0].picturesRef[i].snapshotUrl = snapshotUrls
        }
        this.showImgLisensd()
        var allList = this.AllDataList
        // console.log(allList)
        // this.$emit('closeImgPage', allList.slice(1, allList.length));//关闭的时候将所有的数据传递过去;
        this.$emit('closeImgPage', allList) // 关闭的时候将所有的数据传递过去;
      },
      // 分页函数
      handleSizeChange (val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        this.presentPageIndex = (val - 1) * 10
        this.finallyLength = (val - 1) * 10 + 10
        // console.log(`当前页: ${val}`)
      },
      tab (index) {
        this.isActive = index
        if (index == 0) { // 判断显示上传图片按钮
          this.displayNone = false
        } else {
          this.displayNone = true
        }
        if (index == 1) {
          this.maxNumbe = 1
        } else if (index > 1) {
          this.maxNumbe = this.maxImgLength
        }
        if (this.AllDataList[this.isActive].picturesRef.length <= 10) {
          this.handleCurrentChange(1)
        }
        this.coveIndex=''
        this.isCompile=false
      },
      // 左侧导航栏内容加载函数
      leftList () {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/dict/dictListByType',
          data: {'dictTypes': ['project_image_type']}
        }).then(function (succeed) {
          // console.log(succeed.data.result[0].items)
          let dictionariesList = succeed.data.result[0].items
          that.keywordList = succeed.data.result[0].items // 保留字典关键字数组;
          for (var i = 0; i < dictionariesList.length; i++) {
            that.AllDataList.push({
              dictCode: dictionariesList[i].dictCode,
              dictName: dictionariesList[i].dictName,
              picturesRef: []
            })
          }
          /* 动态添加汉字标签数组 */
          if (that.theInitImgData === undefined) {
            that.theInitImgData = []
          }
          for (var i = 0; i < that.theInitImgData.length; i++) {
            that.theInitImgData[i].textTag = []
          }
          /* 将原来的标签值转换并对应到textTag数组中 */
          for (var i = 0; i < that.theInitImgData.length; i++) {
            for (var j = 0; j < that.theInitImgData[i].picTag.length; j++) {
              for (var k = 0; k < that.keywordList.length; k++) {
                if (that.theInitImgData[i].picTag[j] == that.keywordList[k].dictCode) {
                  // console.log(that.keywordList[k].dictName);
                  that.theInitImgData[i].textTag.push(that.keywordList[k].dictName)
                  // console.log(that.theInitImgData[i].textTag);
                }
              }
            }
          }
          // console.log(that.theInitImgData)
          /* 将传递过来的所有数组赋值循环给that.AllDataList[0]中-->全部的数组 */
          for (let i = 0; i < that.theInitImgData.length; i++) {
            that.AllDataList[0].picturesRef.push(that.theInitImgData[i])
          }
          /* 执行分发标签 */
          that.showImgLisensd()
        }, function (err) {
          console.log(err)
        })
      },
      // 上传图片file函数;将图片处理成base64格式;
      file () {
        let that = this
        let arr = [] // 服务器使用
        let files = document.getElementById('photo').files;
        // 判断浏览器是否支持FileReader
        if (typeof FileReader == 'undefined') {
          that.hint('您的浏览器不支持图片上传功能，请升级或者更换高版本浏览器!')
          return
        }
        let statistics = that.AllDataList[that.isActive].picturesRef.length // 当前标签对应标签的图片数量
        if (that.isActive == 1 && statistics > 1) {
          this.hint('封面最多可上传1张图片!')
          return
        }
        let imgNumber = statistics
        var img = new Image()
        for (var i = 0; i < files.length; i++) {
          var len = files.length
          var reader = new FileReader()
          reader.readAsDataURL(files[i])
          var name = files[i].name
          var type = files[i].type.split('/')[1]

          // 写成闭包;否则for循环中读取的最后一个i的值,并将当前的i和name名传入;
          function closure (i, imgName) {
            reader.onload = function (e) {
              // var kb = (e.total/1024);
              var ImgSize = (e.total / 1024 / 1024)
              if (type == 'jpeg' || type == 'png' || type == 'jpg') {
                if (imgNumber < that.maxNumbe || that.maxNumbe < files.length) {
                  // that.M 指限制的图片大小;+ 0.0099作用是window系统中图片大小是保留2位浮点数;只显示两位小数;有可能造成用户看到的是限制的大小;但是传不上去的问题
                  if (that.M + 0.0099 >= ImgSize) {
                    if (i <= files.length) {
                      imgNumber++
                      img.src = this.result
                      if (imgNumber <= that.maxNumbe && i + statistics <= that.maxNumbe) {
                        arr.push({fileData: img.src, fileName: imgName})
                        if (arr.length == files.length && arr.length > 0 || arr.length == that.maxNumbe || imgNumber == that.maxNumbe) {
                          that.isDisplayModel = false
                          that.loading(arr)
                        }
                      } else {
                        that.hint("最多可上传" + that.maxNumbe + "张图片!")
                      }
                    } else {
                      that.hint("最多可上传" + that.maxNumbe + "张图片!")
                    }

                  } else {
                    that.hint("您选择的图片太大;最大为" + that.M + "M!")
                  }
                }
              } else {
                that.hint("请选择正确的图片格式!")
              }
            }
          }
          closure(i, name);
        }
      },
      // 将图片上传至服务器返回链接函数
      loading (obj) {
        let that = this;
        // 需要添加判断如果提交的数组为空将不提交
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/upload/pc/multi',//多图上传接口
          //url:'http://test-longcity.longfor.com:9080/longcity/services/v1/upload/multi',
          data: obj
        }).then(function (succeed) {
          //console.log(succeed);
          if (succeed.data.code == 303) {
            that.hint(succeed.data.message)
          } else {
            //添加判断返回的成功状态
            let list = succeed.data.result;
            //alert(that.isActive-1)
            let index = that.isActive - 1;
            for (var i = 0; i < list.length; i++) {
              //that.AllDataList[0].picturesRef.push({
              that.AllDataList[0].picturesRef.unshift({
                picId: list[i].id,
                picUrl: list[i].url,
                fileName: list[i].fileName,
                picTag: [that.keywordList[index].dictCode],
                textTag: [that.keywordList[index].dictName],
                coordinate: '',
                remark: '',
                cove: [],
                snapshotUrl: ''
              })
              if (index == 0) {
                that.newCoveId = list[i].id;
                //that.oldCoveId=list[i].id;
              }
            }
            that.showImgLisensd();
            document.getElementById('photo').value = '';//修复再次选择同一张图片的时候change事件检测未改变的bug
            that.isDisplayModel = true;
          }
          //console.log(document.getElementById('photo').files)
        }, function (err) {
          console.log(err)
        });
      },
      // 当数据发生变化的时候将旧的数组对象清空
      clear () {
        for (var i = 1; i < this.AllDataList.length; i++) {
          this.AllDataList[i].picturesRef = [];
        }
      },
      // 数据发生变化的时候去处理相对应的标签函数(分发函数)
      showImgLisensd () {
        this.clear()
        // 处理点击封面的时候原来的封面图片(标签为空了)
        for (var i = 0; i < this.AllDataList[0].picturesRef.length; i++) {
          if (this.AllDataList[0].picturesRef[i].picTag.length == 0) {
            this.AllDataList[0].picturesRef.splice(i, 1)
          }
        }
        // 分发对应的图片数组循环
        for (var i = 0; i < this.AllDataList[0].picturesRef.length; i++) {
          for (var j = 0; j < this.AllDataList[0].picturesRef[i].picTag.length; j++) {
            for (var k = 1; k < this.AllDataList.length; k++) {
              if (this.AllDataList[0].picturesRef[i].picTag[j] == this.AllDataList[k].dictCode) {
                this.AllDataList[k].picturesRef.push(this.AllDataList[0].picturesRef[i]);
              }
            }
          }
        }
        this.coverHave()
      },
      // 此函数循环执行当某个标签点击设置封面后又删除封面标签去更改标签的id（斜三角形的图标）
      coverHave () {
        for (var i = 0; i < this.AllDataList[0].picturesRef.length; i++) {
          for (var j = 0; j < this.AllDataList[0].picturesRef[i].picTag.length; j++) {
            for (var k = 1; k < this.AllDataList.length; k++) {
              if (this.AllDataList[0].picturesRef[i].picTag[j] == this.keywordList[0].dictCode) {
                this.newCoveId = this.AllDataList[0].picturesRef[i].picId
                return
              } else {
                this.newCoveId = null
              }
            }
          }
        }
      },
      // 鼠标进入显示编辑和删除函数
      hover (id) {
        if (this.coveIndex == id && this.isCompile == true) {
          return
        } else {
          this.hoveId = id
          this.coveIndex = id
          this.isCompile = false
        }
      },
      // 鼠标退出隐藏编辑和删除函数
      leave (id) {
        this.hoveId = ''
      },
      // 确认函数
      confirm (id, tag, coordinate, remark) {
        if (tag.length <= 0 || this.options.length <= 0) {
          this.hint('标签不能为空!')
          return
        }
        remark = this.temporaryContent
        coordinate = this.temporaryCoordinate
        if (coordinate != '') {
          // let strs = new Array()
          // let point = /^([1-9]{2,3}\.[0-9]{6})$/
          // strs = this.temporaryCoordinate.split(',') // 将字符串切割为数组
          // if (point.test(strs[0]) == true && point.test(strs[1]) == true) {
          for (var i = 0; i < this.AllDataList[0].picturesRef.length; i++) {
            if (this.AllDataList[0].picturesRef[i].picId == id) {
              this.AllDataList[0].picturesRef[i].coordinate = coordinate
              this.AllDataList[0].picturesRef[i].remark = remark
            }
          }
          for (var i = 0; i < this.AllDataList[0].picturesRef.length; i++) {
            if (this.AllDataList[0].picturesRef[i].picId == id) {
              // console.log(this.AllDataList[0].picturesRef[i])
              this.AllDataList[0].picturesRef[i].picTag = []
              this.AllDataList[0].picturesRef[i].textTag = this.options
              for (var j = 0; j < this.AllDataList[0].picturesRef[i].textTag.length; j++) {
                for (var k = 0; k < this.keywordList.length; k++) {
                  if (this.AllDataList[0].picturesRef[i].textTag[j] == this.keywordList[k].dictName) {
                    this.AllDataList[0].picturesRef[i].picTag.push(this.keywordList[k].dictCode)
                  }
                }
              }
              // console.log(this.AllDataList[0].picturesRef[i])
            }
          }
          this.showImgLisensd()
          this.cancel()// 调用关闭函数;将编辑窗口关闭
          // } else {
          // this.hint('请输入正确的坐标点(经度在前,纬度在后,英文逗号分开,小数点后保留六位小数)!')
          // return
          // }
        } else {
          for (var i = 0; i < this.AllDataList[0].picturesRef.length; i++) {
            if (this.AllDataList[0].picturesRef[i].picId == id) {
              //console.log(this.AllDataList[0].picturesRef[i])
              this.AllDataList[0].picturesRef[i].picTag = [];
              this.AllDataList[0].picturesRef[i].textTag = this.options;
              for (var j = 0; j < this.AllDataList[0].picturesRef[i].textTag.length; j++) {
                for (var k = 0; k < this.keywordList.length; k++) {
                  if (this.AllDataList[0].picturesRef[i].textTag[j] == this.keywordList[k].dictName) {
                    this.AllDataList[0].picturesRef[i].picTag.push(this.keywordList[k].dictCode);
                  }
                }
              }
              //console.log(this.AllDataList[0].picturesRef[i]);
            }
          }
          for (var i = 0; i < this.AllDataList[0].picturesRef.length; i++) {
            if (this.AllDataList[0].picturesRef[i].picId == id) {
              this.AllDataList[0].picturesRef[i].coordinate = coordinate;
              this.AllDataList[0].picturesRef[i].remark = remark;
            }
          }
          this.showImgLisensd();
          this.cancel();//调用关闭函数;将编辑窗口关闭
        }
      },
      // 取消函数
      cancel () {
        this.hoveId = "";
        this.coveIndex = '';
        this.isCompile = false;
        this.showImgLisensd();
      },
      // 编辑函数
      compile (id, tag, coordinate, remark) {
        this.temporaryCoordinate = coordinate;
        this.temporaryContent = remark;
        this.options = tag;
        this.isCompile = true;
      },
      // 删除函数
      del (id) {
        this.open2(id)
      },
      // 删除提示函数
      open2 (id) {
        let that = this
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // type: 'warning'//提示小图标配置,取值为:success/info/warning/error
        }).then(() => {
          for (var i = 0; i < that.AllDataList[0].picturesRef.length; i++) {
            if (that.AllDataList[0].picturesRef[i].picId == id) {
              // console.log(this.AllDataList[0].picturesRef[i]);
              that.AllDataList[0].picturesRef.splice(i, 1)
              that.showImgLisensd()
              if (that.AllDataList[that.isActive].picturesRef.length == 10) {
                that.handleCurrentChange(1)
              }
              // that.hint("删除成功!")
              return
            }
          }
          if (id == that.newCoveId) {
            that.newCoveId = ''
          }
          /*this.$message({
            type: 'success',
            message: '删除成功!'
          });*/
        }).catch(() => {
          // 下面代码为取消删除后的提示;
          // that.hint("已取消删除!")
        })
      },
      // 点击设为封面函数
      cover (id) {
        //点击设为封面
        for (var i = 0; i < this.AllDataList[0].picturesRef.length; i++) {
          if (this.AllDataList[0].picturesRef[i].picId == id) {
            this.AllDataList[0].picturesRef[i].picTag.push(this.keywordList[0].dictCode);
            this.AllDataList[0].picturesRef[i].textTag.push(this.keywordList[0].dictName);
          }
          if (this.newCoveId == this.AllDataList[0].picturesRef[i].picId) {
            // 点击设为封面标签查找删除原来的设为封面函数中的标签;
            Array.prototype.indexOf = function (val) {
              for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i
              }
              return -1
            }
            Array.prototype.remove = function (val) {
              var index = this.indexOf(val)
              if (index > -1) {
                this.splice(index, 1)
              }
            }
            let array = this.AllDataList[0].picturesRef[i].picTag
            array.remove(this.keywordList[0].dictCode)
            this.AllDataList[0].picturesRef[i].picTag = array
            array = this.AllDataList[0].picturesRef[i].textTag
            array.remove(this.keywordList[0].dictName)
            this.AllDataList[0].picturesRef[i].textTag = array
            // console.log(this.AllDataList[0].picturesRef);
          }
        }
        this.newCoveId = id
        this.showImgLisensd()
      },
      // 提示函数
      hint (message) {
        let that = this
        this.hintIsShow = true
        that.hintMessage = message
        setTimeout(function () {
          that.hintIsShow = false
        }, 3000)
        clearTimeout()
      }
    },
    mounted () {
      let that = this
      this.leftList() // 左侧列表函数调用
      for(var i=0;i<that.theInitImgData.length;i++){
        that.theInitImgData[i].textTag=[];
        for(var j=0;j<that.theInitImgData[i].picTag.length;j++){
          for(var k=0;k<that.keywordList.length;k++){
            // console.log(that.keywordList[k].dictCode)
            if(that.theInitImgData[i].picTag[j]==that.keywordList[k].dictCode){
              that.theInitImgData[i].textTag.push(that.keywordList[k].dictName);
            }
          }
        }
      }
    }, props: {
      theInitImgData: Array
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/css/common.css";
  @import "../assets/css/base.css";
</style>
<style lang="less">
  #submitImg {
    width: 100%;
    left: 0;
    position: absolute;
    border: 1px solid #ddd;
    background-color: #fff;
  }

  #submitImg {

    .contentBox {
      width: 100%;
      height: 500px;
    }

    .contentBox .checkboxImgTil {
      height: 20px;
      padding: 15px;
      background-color: #67649F;
    }

    .contentBox .checkboxImgTil .checkText {
      float: left;
      line-height: 20px;
      color: #fff;
      font-size: 16px;
    }

    .checkboxImgTil .rightIcon {
      float: right;
      cursor: pointer;
      background: url("../assets/images/close.png") center center no-repeat;
      width: 24px;
      height: 24px;
    }

    .leftList {
      float: left;
      width: 20%;
      height: 498px;
      background-color: #f4f4f4;
    }
    .labelBoxLeft .label{
      line-height:40px;
      text-indent:15px;
      cursor:pointer;
      font-size:14px;
    }
    .labelBoxLeft .label.active{
      color: #67649f;
      cursor: context-menu;
      background-color:#fff;
    }
    .rightContent {
      float: left;
      width: 80%;
      height: 360px;
      position: relative
    }

    .rightContent:before {
      content: "";
      display: block;
      width: 0;
      height: 100%;
      border-left: 1px solid #ddd;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0
    }

    /*右侧按钮栏样式*/
    .addNav {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #ddd;
    }

    .file {
      display: block;
      width: 100px;
      height: 36px;
      border: 1px solid #eee;
      position: relative;
      float: right;
      background-color: #67649F;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      cursor: pointer;
      /*margin-top: 17px;*/
      margin-right: 3px;
    }

    .addNav .hintTop {
      display: block;
      float: left;
      height: 36px;
      line-height: 36px;
      /*margin-top: 17px;*/
      text-indent: 20px;
    }

    /*.disabled{background-color:#2c3e50}*/
    .file .text {
      font-size: 14px;
      color: #fff;
      height: 36px;
      line-height: 36px;
      padding-left: 18px;
      position: relative;
      cursor: pointer;
      text-indent: 12px;
    }

    .file .text:before {
      content: "+";
      font-size: 18px;
      color: #fff;
      line-height: 36px;
      position: absolute;
      left: 0;
      top: -1px;
    }

    #photo {
      width: 100px;
      height: 36px;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 1;
    }

    .content {
      width: 20%;
      height: 170px;
      float: left;
      position: relative;
      margin-bottom: 20px;
    }

    .content.mt0 {
      margin-bottom: 0;
    }

    .labelBox {
      width:100%;
      text-align: left;
    }

    .labelBox .label {
      line-height:40px;
      cursor: pointer;
      text-indent: 15px;
    }

    .labelBox .label.active {
      cursor: context-menu;
    }

    .imgBox {
      padding-top: 10px;
      float: left;
      width: 100%;
      height: 350px;
    }

    .imgBox .every {
      width: 116px;
      height: 116px;
      position: relative;
      border: 1px solid #ddd;
      margin: 0 auto;
    }

    .imgBox .content .text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 20px;
      padding: 0 10px;
      word-wrap: break-word;
      word-break: normal;
      height:40px;
    }

    .imgBox .every .littleBox {
      width: 118px;
      height: 118px;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }

    .imgBox .every .cover {
      width: 100%;
      height: 27px;
      background-color: #67649F;
      font-size: 12px;
      text-align: center;
      line-height: 27px;
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
    }

    .labelBox .longAndLat {
      width: 217px;
      height: 36px;
      line-height: 28px;
      font-size: 12px;
      outline: none;
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      text-indent: 6px;
      padding-right: 6px;
    }

    .labelBox .describeName {
      float: left;
      margin-right: 4px;
    }

    .labelBox .textImport {
      width: 211px;
      height: 100px;
      line-height: 28px;
      font-size: 14px;
      outline: none;
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      padding: 5px 6px;
      resize: none;
    }

    .every .cancelAndConfirm {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      text-align: center
    }

    .every .cancelAndConfirm .cancel, .every .cancelAndConfirm .confirm {
      border-radius: 4px;
      border: 1px solid #2c3e50;
      padding: 5px 10px;
      background-color: #2c3e50;
      color: #fff;
      cursor: pointer;
      height: 18px;
      line-height: 18px;
    }

    .every .cancelAndConfirm .confirm {
      background-color: #67649F;
      border-color: #67649F;
    }

    /*点击按钮下方编辑栏*/
    .imgBox .every .triangle {
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #ddd;
      position: absolute;
      top: 117px;
      left: 50%;
      margin-left: -10px;
      z-index: 10;
    }

    .imgBox .every .compileContent {
      width: 285px;
      min-height: 215px;
      display: block;
      border: 1px solid #ddd;
      position: absolute;
      left: 25px;
      bottom: -50%;
      background-color: #fff;
      z-index: 10;
      border-radius: 4px;
      font-size: 12px;
    }

    .imgBox .every .leftPosition {
      left: -167px;
    }
    .imgBox .every .leftBttomPosition {
      left: -167px;
    }
    .imgBox .every .bottomPosition {
      bottom:0;
    }
    .imgBox .every .leftBottomPosition4 {
      left: -86px;
      bottom:0;
    }

    .imgBox .every .leftPosition4 {
      left: -86px;
    }

    /*编辑栏样式*/
    .labelBox {
      margin-top: 10px;
      text-align: left;
      padding: 0 10px;
    }

    .labelBox .longAndLat {
      width: 217px;
      height: 36px;
      line-height: 28px;
      font-size: 12px;
      outline: none;
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      text-indent: 6px;
      padding-right: 6px;
    }

    .labelBox .describeName {
      float: left;
      margin-right: 4px;
    }

    .labelBox .textImport {
      width: 211px;
      height: 100px;
      line-height: 28px;
      font-size: 14px;
      outline: none;
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      padding: 5px 6px;
      resize: none;
    }

    .every .cancelAndConfirm {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      text-align: center
    }

    .every .cancelAndConfirm .cancel, .every .cancelAndConfirm .confirm {
      border-radius: 4px;
      border: 1px solid #2c3e50;
      padding: 5px 10px;
      background-color: #2c3e50;
      color: #fff;
      cursor: pointer;
      height: 18px;
      line-height: 18px;
    }

    .every .cancelAndConfirm .confirm {
      background-color: #67649F;
      border-color: #67649F;
    }

    /*分页样式*/
    .page {
      padding:0px 15px;
      height: 26px;
      line-height: 26px;
      font-size: 12px;
      clear: both;
    }

    .imgBox .every .littleBox {
      width: 118px;
      height: 118px;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }

    .imgBox .every .cover {
      width: 100%;
      height: 27px;
      background-color: #67649F;
      font-size: 12px;
      text-align: center;
      line-height: 27px;
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
    }

    .bottomContent {
      position: absolute;
      bottom: 0;
      right: 0;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.6);
      width: 66px;
      height: 26px;
      padding: 5px 25px;
    }

    .bottomContent .compile, .bottomContent .delete {
      width: 24px;
      height: 24px;
      display: block;
      background-size: 24px 24px;
    }

    .bottomContent .compile {
      float: left;
      background: url("../assets/images/compile.png") center center no-repeat;
    }

    .bottomContent .delete {
      float: right;
      background: url("../assets/images/delete.png") center center no-repeat;
    }

    .every img {
      max-width: 116px;
      max-height: 116px;
    }

    #photo {
      width: 100px;
      height: 36px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      opacity: 0;
      cursor: pointer;
    }

    /*动画*/
    .fade-enter-active, .fade-leave-active {
      transition: all 0.5s ease-out;
    }

    .fade-enter, .fade-leave-active {
      opacity: 0;
    }

    /*设置为封面页面的右上角图标*/
    .coverTitleImg {
      background: url("../assets/images/coverTitle.png") left top no-repeat;
      background-size: 40px 40px;
      display: block;
      width: 40px;
      height: 40px;
      position: absolute;
      left: 0;
      top: 0;
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

    .modelBox.displayModel {
      display: none
    }

    .loadingStyle {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      color: #fff;
      font-size: 14px;
      text-align: center;
    }

    /*提示函数 */
    .tanTip {
      height: 38px;
      width: 380px;
      border-radius: 4px;
      box-shadow: 3px 3px 3px #ddd;
      text-align: center;
      line-height: 38px;
      color: #ffffff;
      font-size: 14px;
      position: absolute;
      top: 10%;
      left: 50%;
      margin-left: -136px;
      z-index: 9999;
      background-color: rgba(0, 0, 0, 0.4)
    }

    /*placeholder颜色*/
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: #999;
    }

  }
</style>
