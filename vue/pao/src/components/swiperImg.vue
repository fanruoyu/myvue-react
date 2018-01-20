<template>
  <!--轻资产图片管理展示组件-->
  <div id="slide"  v-if="getData">
    <ul class="titleNames">
      <li v-for="(item,index) in imgList" v-if="index!=0" @click="tab(index)" :class="{active:tabIndex==index}">{{item.dictName}}</li>
    </ul>
    <div class="slide-show">
      <div class="slide-img" v-if="imgList[tabIndex].picList!=undefined&&imgList[tabIndex].picList.length>0">
        <span class="numberBox">{{nowIndex+1}}/{{imgList[tabIndex].picList!=undefined&&imgList[tabIndex].picList.length>0?imgList[tabIndex].picList.length:0}}</span>
        <transition name="fade" mode="out-in">
          <div  v-if="isShow" class="imgBox">
            <img :src="imgList[tabIndex].picList!=undefined&&imgList[tabIndex].picList.length>0?imgList[tabIndex].picList[nowIndex].picUrl:''">
          </div>
        </transition>
        <transition name="fade" mode="out-in">
          <p class="describe">{{imgList[tabIndex].picList!=undefined?imgList[tabIndex].picList[nowIndex].remark:''}}</p>
        </transition>
        <span class="prevBtn" @click="goto(prevIndex)"  v-if="imgList[tabIndex].picList!=undefined&&imgList[tabIndex].picList.length>1&&prevIndex!=imgList[tabIndex].picList.length-1"></span>
        <!--<span class="prevBtn bgColor" v-else="imgList[tabIndex].picList!=undefined&&imgList[tabIndex].picList.length>1"></span>-->
        <span class="nextBtn" @click="goto(nextIndex)"  v-if="imgList[tabIndex].picList!=undefined&&imgList[tabIndex].picList.length>1&&nextIndex!=0"></span>
        <!--<span class="nextBtn bgColor"  v-else="imgList[tabIndex].picList!=undefined&&imgList[tabIndex].picList.length>1"></span>-->
      </div>
      <div class="slide-img" v-else="">
        <span class="notHave">暂无照片</span>
      </div>
    </div>

    <div class="slide-father" id="slide-father">
      <transition name="slide-trans">
        <ul class="slide-pages" id="slidePages">
          <li v-for="(item,index) in imgList[tabIndex].picList==undefined?imgList[tabIndex].picList=[]:imgList[tabIndex].picList" @click="goto(index)" :class="{on: index === nowIndex}">
            <span class="img-box">
              <!--<img :src="slides[index].src" alt="">-->
              <img :src="item.snapshotUrl==undefined?'':item.snapshotUrl" alt="">
            </span>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    /*props: {
      slides: {
        type: Array,
        default: []
      },
      inv: {
        type: Number,
        default: 1000
      }
    },*/
    data () {
      return {
        nowIndex: 0,
        isShow: true,
        tabIndex:1,
        reg: /^[0-9]*$/ // 正则校验 :正整数
      }
    },
    computed: {
      prevIndex () {
        if (this.nowIndex === 0) {
          return this.imgList[this.tabIndex].picList.length - 1
        } else {
          return this.nowIndex - 1
        }
      },
      nextIndex () {
        if (this.nowIndex === this.imgList[this.tabIndex].picList.length - 1) {
          return 0
        } else {
          return this.nowIndex + 1
        }
      }
    },
    methods: {
      // 标签切换函数
      tab (index){
        this.tabIndex=index
        this.nowIndex=0
        document.getElementById('slidePages').style.marginLeft=0
      },
      goto (index) {
        if (index === this.nowIndex) {
          return
        }
        this.isShow = false
        let label = document.getElementById('slidePages')
        let external = document.getElementById('slide-father')
        let num = parseInt(external.clientWidth/110)/2
        if(!this.reg.test(num)){
          num=parseInt(num)
        }
        if (index > num && index < this.imgList[this.tabIndex].picList.length - num) {
          label.style.marginLeft = -(index - num) * 110 + 'px'
        } else if (index < num) {
          label.style.marginLeft = 0
        }
        //setTimeout(() => {
          this.isShow = true
          this.nowIndex = index
        //}, 10)
      },
      /*runInv () {
        this.invId = setInterval(() => {
          this.goto(this.nextIndex)
        }, this.inv)
      },*/
      /*clearInv () {
        clearInterval(this.invId)
      }*/
    },
    mounted () {
      // this.runInv();
    },
    props: {
      imgList: Array,
      dictionariesList: Array,
      uploadMuchImgIsShow:Boolean,
      getData:Boolean,
    }
  }
</script>

<style scoped lang="less">
  #slide{width:840px;overflow:hidden;margin:0 auto;}
  #slide{
    .titleNames{overflow:hidden;background-color:#eee;width:auto;}
    .titleNames li{height:40px;line-height:40px;padding:0 8px;float:left;text-align:center;font-size:14px;min-width:4em;cursor:pointer;}
    .titleNames li.active{background-color:#ddd;border-radius:8px 8px 0 0;cursor: context-menu;}
    .slide-trans-enter-active { transition: all .5s; }
    .slide-trans-enter { transform: translateX(900px); }
    .slide-trans-old-leave-active { transition: all .5s; transform: translateX(-900px); }
    .slide-show {position: relative;width: 100%;height: 460px;}
    .slide-show:before {position: absolute;width:99.8%;height:100%;border:1px solid #ddd;content:'';display:block;left:0px;top:0;z-index:88}
    .slide-show .describe {position:absolute;width:98%;color:#fff;background:#000;opacity:.5;left:0;bottom:0; line-height:22px;text-align:left;padding:0 1%;user-select:none;word-wrap: break-word; word-break: normal;}
    .slide-show .numberBox{position:absolute;right:20px;top:10px;font-size:18px;}
    .slide-img{ width:100%; height:100%; overflow:hidden; text-align:center; }
    .slide-img{position:relative;display:table;user-select:none;}
    .slide-img .notHave{position:absolute;top:50%;left:0;display:block;width:100%;text-align:center;font-size:14px;line-height:30px;height:30px;margin-top:-15px;}
    .imgBox{width:100%;height:460px;display: table-cell;vertical-align: middle;}
    .slide-img img {max-width:840px;max-height:460px;}

    .prevBtn,.nextBtn{display:block;position:absolute;width:20px;height:60px;top:50%;margin-top:-30px;cursor: pointer;z-index: 100;}
    /*.prevBtn{left:30px;background:url("../assets/images/swiperLift.png") center center no-repeat;background-size:20px 60px;background-color:#67649F;border-radius:4px 0 0 4px;}
    .nextBtn{right:30px;background:url("../assets/images/swiperRight.png") center center no-repeat;background-size:20px 60px;background-color:#67649F;border-radius:0 4px 4px 0;}
    .bgColor{background-color:rgba(0,0,0,0.3);cursor: context-menu;}*/
    .prevBtn{left:30px;background:url("../assets/images/swiperLift.png") center center no-repeat;background-size:20px 60px;background-color:rgba(0,0,0,0.3);border-radius:4px 0 0 4px;}
    .nextBtn{right:30px;background:url("../assets/images/swiperRight.png") center center no-repeat;background-size:20px 60px;background-color:rgba(0,0,0,0.3);border-radius:0 4px 4px 0;}
    /*.bgColor{background-color:rgba(0,0,0,0.3);cursor: context-menu;}*/
    .slide-father{ width:100%; height:60px;margin:10px 0;overflow:hidden;user-select:none; }
    .slide-pages {height:60px; transition: all 0.5s;}
    .slide-pages li { width:100px; height:60px; float:left; position:relative; padding:0 5px; cursor:pointer;}
    .slide-pages li .img-box{ text-align:center;display:table-cell;width:100px;margin:0 auto;line-height:60px;height:60px;vertical-align:middle;}
    .slide-pages li:before{ position:absolute; content:''; display: block; width:98px; height:56px; top:0px; left:4px; border:2px solid transparent; }
    .slide-pages li img{ max-width:100px; max-height:60px; display:block; margin:0 auto;vertical-align:middle}
    .slide-pages li.on{cursor:auto}
    .slide-pages li.on:before { border-color:#67649F; }
    .slide-pages li .on { text-decoration: underline; }
    /*动画*/
    .fade-enter-active, .fade-leave-active {transition: all 0.5s ease-out;}

    .fade-enter, .fade-leave-active {opacity: 0;}
  }

</style>
