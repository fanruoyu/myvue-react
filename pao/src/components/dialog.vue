<template>
  <div id="dialog">
    <div class="dialog-wrap">
      <div class="dialog-cover"  v-if="isShow" @click="closeMyself"></div>
      <transition name="drop">
        <div class="dialog-content"  v-if="isShow">
          <!--右上角的关闭按钮-->
          <!--<p class="dialog-close" @click="closeMyself">x</p>-->
          <!--控制子组件的显示，如果无内容则显示slot里的内容，如果有内容则显示父组件内容-->
          <slot>empty</slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    closeMyself () {
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all 1s ease;
}
.drop-enter {
  transform: translateY(-2000px);
}
.drop-leave-active {
  transform: translateY(-2000px);
}

#dialog .dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1005;
}
#dialog .dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#dialog .dialog-content {

  position: fixed;
  /*background: #fff;*/
  top: 50%;
  left: 50%;
  z-index: 100;
  line-height: 1.6;
}
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.dialog-close:hover {
  color: #4fc08d;
}
</style>
