<template>
  <div id="organizationStructure">
    <div class="top"></div>
    <div class="middle"></div>
    <div class="bottom">
      <span :style="{left:item.left}" class="single" v-for="(item,index) in bottomJson"></span>
    </div>

  </div>


</template>
<script>
  export default {
    name: 'organizationStructure',
    props: {

      width: {
        type: Number,
        default: 400
      },
      num: {
        type: Number,
        default: 0
      }
    },

    data () {
      return {
        bottomJson: [],


      }
    },
    methods: {
      /**
       * 初始化
       */
      init: function () {
        let num = this.num|0;
        let span = Math.floor(this.width/(num-1))-1;
        for(let i=0; i<num; i++){
          let left = i*span;
          this.bottomJson.push({
            left: left+'px'
          })
        }

      },
    },

    computed: {

    },

    mounted:function(){
      this.init()
    }

  }
</script>
<style scoped lang="less">

  @height:20px;
  @color:#eaeaea;
  @stroke:2px;
  @padWidth: 50px;

  #organizationStructure {
    margin: 10px;
    padding: 0 @padWidth;



    .item{
      width:@stroke;
      height:@height;
      background-color:@color;
    }


    .top{
      width:@stroke;
      height:@height;
      background-color:@color;
      margin:0 auto;


    }
    .middle{
      border-bottom:@stroke solid @color;
      position: relative;
    }

    .bottom{
      position: relative;
      height: @height;
      .single{
        .item;
        position: absolute;
      }
    }

  }


</style>
