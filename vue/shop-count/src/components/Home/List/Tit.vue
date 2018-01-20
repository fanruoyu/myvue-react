<template>
  <li ref="list" v-touch:left='touch_left' v-touch:right='touch_right'>
    <em ref="del" :class='{dels: show}'>删除</em>
    <label><span :class="{active: checked}" @click="total"></span>{{event}}</label>
    <section>
      <small>￥{{price}}</small>
      <p>
        <b @click='decreat(id, price)'>-</b>
        <input type="text" value="1" v-model="num">
        <b @click="increat(id, price)">+</b>
      </p>
    </section>
  </li>
</template>
<script>
export default {
  props: {
    event: {
      type: String
    },
    id: {
      type: Number
    },
    tit: {
      type: String
    },
    price: {
      type: String
    },
    ind: {
      type: Number
    },
    checked: {
      type: Boolean
    }
  },
  data () {
    return {
      show: false,
      num: 1
    }
  },
  methods: {
    total () {
      this.$store.commit('change_checked', {
        ind: this.ind,
        id: this.id,
        checked: !this.checked
      })
      this.$store.commit('getSum')
    },
    increat (id, price) {
      if (this.num < 10) {
        this.num ++
        this.$store.commit('getcount', {
          ind: this.ind,
          id: this.id,
          count: this.num
        })
        this.$store.commit('getSum')
      }
    },
    decreat (id, price) {
      if (this.num > 1) {
        this.num --
        this.$store.commit('getcount', {
          ind: this.ind,
          id: this.id,
          count: this.num
        })
        this.$store.commit('getSum')
      }
    },
    touch_left () {
      this.show = true
      if (this.$refs['del']) {
        this.$refs['del'].addEventListener('click', (ev) => {
          ev.path[1].remove()
          if (ev.path[2].querySelectorAll('li').length < 3) {
            ev.path[2].remove()
          }
        })
      }
    },
    touch_right () {
      this.show = false
    }
  }
}
</script>
<style scoped>
li{
  position: relative;
}
li span{
  margin-right: .2rem;
 display: inline-block;
  width:.4rem;
  height: .4rem;
  border-radius: 50%;
  border:1px solid #333;
  vertical-align: middle;
  position: relative;
}
li .active::after{
  content: '';
  position: absolute;
  width: .25rem;
  height: .25rem;
  border-radius: 50%;
  background: #333;
  top:50%;
  left:50%;
  margin-left:-38%;
  margin-top:-38%;
}
li input{
  margin-right: .2rem;
  width: .4rem;
  height: .4rem;;
  vertical-align: middles;
}
em{
  position: absolute;
  width: .7rem;
  height: 100%;
  background:lightcoral;
  color:#fff;
  font-size: .4rem;
  top:0;
  right: 0;
  transform: translateX(100%);
  transition: transform .5s linear
}
li .dels{
  transform: translateX(0%)
}
section{
  position: relative;
}
section small{
  line-height: .8rem;
}
section  p{
  position: absolute;
  right: 1rem;
  top:.2rem;;
}
section  p input{
  width: .5rem;
  text-align: center;;
  margin:0 .2rem;
}
section p b{
  border:1px solid #ccc;
  padding:0 .1rem;
}
</style>

