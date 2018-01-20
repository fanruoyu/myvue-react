<template>
  <div id="imageManagement">
    <!--<el-form  :rules="rules" label-width="108px" class="demo-ruleForm form"  >-->
          <!--<el-form-item label="项目图库" class="proPhoto"  prop="region">-->
      <div class="proPhoto">
            <el-button  v-if="btnNone"  type="primary" @click="transImgMangagement()">图片管理</el-button>
            <el-tabs type="border-card" class="tabs">
              <el-tab-pane :label="item.dictName" v-for="(item,index) in otherImgList">
                <p v-if="!item.picturesRef||item.picturesRef.length==0">暂无照片</p>
                <slide-show2 v-else :slides="item.picturesRef"></slide-show2>
              </el-tab-pane>
            </el-tabs>
            <!--<diaLog :is-show="isSwitchImgMangagement">
              <div style="width:800px;position:relative;">
                <submitImg style="left:-50%;top:-200px;":theInitImgData="picturesRef" @closeImgPage="closeImgMangagement" class="submitImg"></submitImg>
              </div>
            </diaLog>-->
            <submitImg  @closeImgPage="closeImgMangagement" class="submitImg"
                        :theInitImgData="picturesRef" :uploadMuchImgIsShow="uploadMuchImgIsShow"
                        ref="transmit"></submitImg>
      </div>
          <!--</el-form-item>-->
      <!--</el-form>-->
  </div>
</template>
<!--
轮播图
-->
<script>
  //import submitImg from '../page/submitImg'
  import submitImg from '../components/heavyAssetUploadImg'
  import diaLog from '../components/dialog'
  import slideShow2 from '../components/slideShow2'
  export default {
    components: {
      slideShow2,
      submitImg,
      diaLog
    },
    props: {
      picturesRef: {
        type: Array,
        default: function(){
          return []
        }
      },
      dictionariesList: {
        type: Array,
        default: function(){
          return []
        }
      },
      dictionariesTitle: {
        type: String,
        default: ''
      },
      btnNone: {
        type: Boolean,
        default: ''
      }
    },
    data() {
      return {
        uploadMuchImgIsShow:false,
        ruleForm: {
          /*name需要校验，element ui存放该变量的位置固定*/
          region: '',
        },
        /*输入框校验*/
        rules: {
          region: [
            { required: true,  trigger: 'blur' },
          ]
        },
//        btnNone:true,          //true 显示
        /*是否显示照片管理*/
        //isSwitchImgMangagement: false,
        /*添加的图片列表*/
        allImgList: [], // dictCode标识;dictName标识名称;
        otherImgList: [], // 不带全部
        keywordList: [], // 保留字典
      }
    },
    methods:{
      transImgMangagement(){
          var that=this;
        //running_sub_type', 'standard', 'hotel_rating', 'product_positioning', 'running_type_choose', 'customer_choose ,'project_image_type'
        this.$refs.transmit.dictTypes(that.dictionariesTitle)
        this.uploadMuchImgIsShow=true
      },
      /*点击x关闭图片管理弹窗*/
    closeImgMangagement(data) {
      this.uploadMuchImgIsShow=false;
      this.allImgList[0].picturesRef=this.picturesRef //将图片管理数据赋值给allImgList的第一个数组
      this.labelAllocation();//更新图片管理图片数据
      var temp=this.picturesRef;
      this.$emit('componentDataSynchronization',temp);//点击关闭按钮，父子组件数据同步
    },
    /*点击图片管理显示图片管理弹窗*/
    /*transImgMangagement(){
        this.isSwitchImgMangagement=true;
      },*/
    //处理图片全量数据和标题
    pictureDataProcessing(){
        var that=this;
      /*图片管理*/
      let dictionaries = that.dictionariesList
      for(let i=0;i<that.dictionariesList.length;i++){
        that.dictionariesList[i].picTag=that.dictionariesList[i].dictCode
      }
      //多次获取导致累加，需要先清空数据
      that.allImgList=[];
      //根据字典接口中图片标签个数生成对应标签数组
      for (let i = 0; i < dictionaries.length; i++) {
        that.allImgList.push({
          picTag: dictionaries[i].dictCode,
          dictName: dictionaries[i].dictName,
          picturesRef: [],
          textTag:[]
        })
      }
      //allImgList的第一个数组存储全部图片
      that.allImgList.unshift({picTag: 0, dictName: '全部', picturesRef: []});
      //将获取接口中的图片管理数据赋值给allImgList的第一个数组
      that.allImgList[0].picturesRef=that.picturesRef
      that.labelAllocation();
      /*图片管理*/
    },
    clear (){
      //最少存在一个标签
      for(let i=1;i<this.allImgList.length;i++){
        this.allImgList[i].picturesRef=[]
      }
    },
    // 标签分配函数
    labelAllocation () {
      this.clear()
      for(let i=0;i<this.allImgList[0].picturesRef.length;i++) {//图片管理中存在图片
        this.allImgList[0].picturesRef[i].textTag=[]//标签置空
        for(let j=0;j<this.allImgList[0].picturesRef[i].picTag.length;j++){//picTag数组中的标签个数
          for (let k = 1; k < this.allImgList.length; k++) {//存在n个标签 起始值为1
            if (this.allImgList[0].picturesRef[i].picTag[j] == this.allImgList[k].picTag) {//根据picTag
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
//      if(this.newCoveId==''&&this.allImgList[1].picturesRef.length>0){
//        this.newCoveId=this.allImgList[1].picturesRef[0].picId
//      }else if(this.allImgList[1].picturesRef.length<1){
//        this.newCoveId=''
//      }
      this.otherImgList=this.allImgList.slice(1)
      //this.isDisplayModel = false
    },
  },
    watch:{
      dictionariesList: function(val) { //此处不要使用箭头函数
        this.pictureDataProcessing();
      }
    }
  }
</script>

<style >
  #imageManagement  .proPhoto{
  }
  #imageManagement  tabs el-tabs el-tabs--border-card{
    box-shadow: 0 0px 0px 0 rgba(0,0,0,0), 0 0 0px 0 rgba(0,0,0,0);
    border:none;
  }
  #imageManagement .el-tabs--border-card>.el-tabs__content {
    padding:0 !important;
  }
  #imageManagement  .tabs  .el-tab-pane{
    height: 300px;
  }

  #imageManagement  .proPhoto .el-button--primary{
    background-color: #67649F;
    border-color: #67649F;
    margin-bottom: 10px;
  }
  #imageManagement  .proPhoto  .el-tabs__content{
    height: 100%;
    width: 100%;
    padding: 0;
  }
  /*定制proPhoto弹窗消息*/
  #imageManagement  .proPhoto .el-dialog .el-dialog__header{

  }
  #imageManagement  .proPhoto .tabs {
    position: relative;
    /*height: 100%;*/
  }
  #imageManagement  .proPhoto .tabs p{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
