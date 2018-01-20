<template>
  <div class="details">
    <div class="details-title"><p>项目详情</p></div>
    <div class="details-center">
        <p>项目名称：</p><br>
        <p>项目位置：</p><br>
        <p>业态：</p><br>
        <p>项目状态：</p><br>
        <div><p>所在地产板块</p><p>所在商业板块</p><p>所在产业板块</p></div>
        <div>项目图库：</div><br>
    </div>
    <div class="details-bottom"></div>
    <!--主页右边-->
    <div class="index-right">
      <!--封装了一个轮播图-->
      <slide-show :slides="slides" :inv="invTime"></slide-show>
    </div>
  </div>
</template>
<script>
  import slideShow from '../components/slideShow'
  export default {
    name: 'details',
    components: {
      slideShow
    },
    data () {
      return {
        invTime: 2000,
        slides: [
          {
            src: require('../assets/slideShow/pic1.jpg'),
            title: 'xxx1',
            href: 'detail/analysis'
          },
          {
            src: require('../assets/slideShow/pic2.jpg'),
            title: 'xxx2',
            href: 'detail/count'
          },
          {
            src: require('../assets/slideShow/pic3.jpg'),
            title: 'xxx3',
            href: 'http://xxx.xxx.com'
          },
          {
            src: require('../assets/slideShow/pic4.jpg'),
            title: 'xxx4',
            href: 'detail/forecast'
          }
        ],
        /*自己做的假数据*/
      }
    }
  }
</script>

<style scoped>
  .details {
    width: 1200px;
    margin: 200px auto;
    overflow: hidden;
  }
  .details-title{
    background: #67649f;
  }
  .index-right {
  }
</style>
