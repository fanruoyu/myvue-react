<template>
  <div id="swiperAndUpload">
    <!--{{allDataList}}-->
    <!--{{allImgList}}-->
    <!--图片轮播区域-->
    <p class="imgManage"><span class="manageBtn" @click="imgManagefn">图片管理</span></p>
    <div id="swiperBox">
      <swiper-img  v-if="allDataList!=undefined" :imgList="allDataList" :dictionariesList="dictionariesList" :uploadMuchImgIsShow="uploadMuch" :getData="getData"></swiper-img>
    </div>
    <!--组件：{{computedImgList}}-->
    <!--图片上传-->
    <!--<div v-show="false" style="width:0;height:0;overflow:hidden;">{{computedImgList}}</div>-->
    <div id="Upload" v-bind="computedImgList">
      <upload-much-img  v-if="picTagList!=undefined" @closeImgPage="closeImgUpLoad" :imgArr="allDataList" :dictionariesList="dictionariesList" :picTagList="picTagList" :uploadMuchImgIsShow="uploadMuch"></upload-much-img>
    </div>
  </div>
</template>

<script>
  import uploadMuchImg from '../components/uploadMuchImg'
  import swiperImg from '../components/swiperImg'
  export default {
    name: '',
    components: {
      uploadMuchImg,
      swiperImg
    },
    data () {
      return {
        dictionariesName: '', // 动态字典名称
        dictionariesList: [], // 字典列表
        allDataList: [{picTag: -1, dictName: '全部', picList: []}], // dictCode标识;dictName标识名称;
        picTagList: [0],
        uploadMuch:false,
        getData:false
      }
    },
    computed:{
      computedImgList:function () {
        let that=this
        if(that.allDataList[0].picList!=undefined&&that.allDataList[0].picList.length>0){
          this.$emit('lightTransmit',that.allDataList.slice(1,that.allDataList.length))
        }else {
          return
        }
      }
    },
    methods: {
      closeImgUpLoad(){
        this.uploadMuch=false
      },
      //图库管理函数
      imgManagefn(){
        this.uploadMuch=true
      },
      // 左侧导航栏内容加载函数
      leftDictionariesList (dictionaries) {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/dict/dictListByType',
          data: {'dictTypes': [dictionaries]}
        }).then(function (succeed) {
          let dictionaries = succeed.data.result[0].items
          that.dictionariesList = succeed.data.result[0].items // 保留字典关键字数组;
          for(let i=0;i<that.dictionariesList.length;i++){
            that.dictionariesList[i].picTag=that.dictionariesList[i].dictCode
          }
          for (let i = 0; i < dictionaries.length; i++) {
            that.allDataList.push({
              picTag: dictionaries[i].dictCode,
              dictName: dictionaries[i].dictName,
              picList: []
            })
            that.picTagList.push(dictionaries[i].dictCode)
          }
          for(let i=0;i<that.allImgList.length;i++){
            for(let j=0;j<that.allImgList[i].picList.length;j++){
              that.allImgList[i].picList[j].picTag=that.allImgList[i].picTag
              that.allDataList[0].picList.push(that.allImgList[i].picList[j])
            }
          }
          that.getData=true
        }, function (err) {
          console.log(err)
        })
      }
    },
    mounted () {
      this.leftDictionariesList(this.dictionaries)
    },
    props:{
      dictionaries:String,//需要获取的字典报文参数值
      allImgList:Array
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #swiperAndUpload{}
  #swiperAndUpload{
    .imgManage{width:100%;height:50px;line-height:50px;margin:10px 0;}
    .imgManage .manageBtn{width:100px;height:36px;line-height:36px;text-align:center;font-size:14px;color:#fff;background-color:#67649F;border-radius:4px;user-select:none;cursor:pointer;}
    /*动画*/
    .fade-enter-active, .fade-leave-active {transition: all 0.5s ease-out;}

    .fade-enter, .fade-leave-active {opacity: 0;}
  }
</style>
