<template>
  <div class="allSlideShow">
    <div class="slide-show" @mouseover="clearInv" @mouseout="">
      <span v-show="slides.length>1" class="prevIndex" @click="goto(nextIndex)">&gt;</span>
      <div class="slide-img">
        <transition :name="transName">
          <img v-if="isShow" :src="slides[nowIndex].src">
          <!--<img  :src="slides[nowIndex].src">-->
        </transition>
      </div>
      <h2 :title="slides[nowIndex].title"><p>{{ slides[nowIndex].title }}</p></h2>
      <span v-show="slides.length>1" class="nextIndex" @click="goto(prevIndex)">&lt;</span>
      <!--<ul class="slide-pages">
        <li @click="goto(prevIndex)">&lt;</li>
        &lt;!&ndash;<li v-for="(item, index) in slides"&ndash;&gt;
        &lt;!&ndash;@click="goto(index)"&ndash;&gt;
        &lt;!&ndash;&gt;&ndash;&gt;
          &lt;!&ndash;<a :class="{on: index === nowIndex}">{{ index + 1 }}</a>&ndash;&gt;
        &lt;!&ndash;</li>&ndash;&gt;
        <li @click="goto(nextIndex)">&gt;</li>
      </ul>-->
    </div>
    <div class="theThumbnail">
      <ul>
        <li v-for="(item,index) in slides" @click="goto(index)">
          <img :class="{active:limit===index}" :src="item.shortSrc"/>
        </li>
      </ul>
    </div>
  </div>
</template>
<!--
轮播图
-->
<script>
  export default {
    props: {

      slides: {
        type: Array,
        default: []
      },
      /*轮播图速度*/
      inv: {
        type: Number,
//      default: 1000
      }
    },
    data() {
      return {
        transName: "slide-trans",
        nowIndex: 0,
        isShow: true,
        /*存储字典信息：图库标题*/
        proOverview: [],
        limit: '',
      }
    },
    computed: {
      prevIndex() {
        if (this.nowIndex === 0) {
          return this.slides.length - 1
        }
        else {
          return this.nowIndex - 1
        }
      },
      nextIndex() {
        if (this.nowIndex === this.slides.length - 1) {
          return 0
        }
        else {
          return this.nowIndex + 1
        }
      }
    },
    methods: {
      goto(index) {

        if (this.nowIndex == index) {
          this.transName = ""
        }else if (this.nowIndex > index) {
          this.transName = "slide-trans"
        } else {
          this.transName = "slide-trans-reverse"
        }

        this.isShow = false
        setTimeout(() => {
          this.isShow = true
          this.nowIndex = index
        }, 10),
          this.handleClicks(index)
      },
      runInv() {
//      this.invId = setInterval(() => {
//        this.goto(this.nextIndex)
//      }, this.inv)
//      this.invId = setInterval(() => {
        this.goto(this.nextIndex)
//      }, this.inv)
      },
      clearInv() {
        clearInterval(this.invId)
      },
      handleClicks(id) {
        this.limit = id;
      }
    },
    mounted() {
      this.runInv();
    }
  }
</script>

<style scoped>
  .allSlideShow {
    /*padding: 5px;;*/
  }

  .slide-trans-enter-active {
    transition: all .5s ease;
  }

  .slide-trans-enter {
    transform: translateX(-900px);
  }

  .slide-trans-reverse-enter-active {
    transition: all .5s ease;
  }

  .slide-trans-reverse-enter {
    transform: translateX(900px);
  }

  .slide-trans-reverse-old-leave-active {
    /*transition: all 5s;*/
    /*transform: translateX(-900px);*/
  }

  .slide-show {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .slide-show h2 {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    height: 30px;
    text-align: left;
    padding-left: 15px;
    font-size: 12px;

  }
  .slide-show p{
    padding-right: 2px;
    width: 80%;
    height: 30px;
    /*超出...*/
    overflow:hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    word-break: normal;
    white-space: nowrap;
  }
  .slide-img {
    text-align: center;
  }

  .slide-img a {
  }

  .slide-img img {
    max-width: 520px;
    max-height: 200px;
  }

  /*轮播图左右按钮*/
  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
    /*position: relative;*/
    z-index: 2;
  }

  .prevIndex {
    position: absolute;
    right: 20px;
    top: 40%;
    color: red;
    font-size: 36px;
    opacity: 0.5;
    cursor: pointer;
  }

  .nextIndex {
    position: absolute;
    left: 20px;
    top: 40%;
    color: red;
    font-size: 36px;
    opacity: 0.5;
    cursor: pointer;
  }

  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
    position: absolute;
    font-size: 30px;

  }

  .slide-pages li:first-child {
    left: 0;
    top: 50%;
    margin-top: 50px;
    margin-left: 20px;
    background-color: red;
    z-index: 10;
  }

  .slide-pages li:last-child {
    right: 0;
    top: 50%;
    margin-top: 50px;
  }

  .slide-pages li .on {
    text-decoration: underline;
  }

  .theThumbnail {
    /*height: 70px;*/

  }

  .theThumbnail ul {
    margin: 20px 0px 0px 10px;
    /*width: 560px;*/
    overflow-x: auto;
    overflow-y: hidden;
    /*overflow:hidden;*/
    white-space: nowrap;
  }

  .theThumbnail ul li {
    padding-left: 4px;
    display: inline-table;
    margin-right: 10px;
    width: 74px;
  }

  .theThumbnail .active {
    display: inline-table;
    width: 74px;
    height: 58px;
    /*border: 1px solid red;*/
    box-shadow: 0 0 4px 4px red;
  }

  .theThumbnail ul li img {
    margin-top: 5px;
    margin-right: 5px;
    display: inline-table;
    width: 74px;
    height: 58px;
  }
</style>
