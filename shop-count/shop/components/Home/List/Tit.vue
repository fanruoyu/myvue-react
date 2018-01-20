<template>
  <li ref="list" v-touch:left='touch_left' v-touch:right='touch_right'>
    <em ref="del" :class='{dels: show}'>删除</em>
    <label><input type="checkbox" v-model="checked" @click='change'>{{event}}</label>
    <section>
      <span>￥{{price}}</span>
      <p>
        <b @click='decreat(id, price)'>-</b>
        <input type="text" value="1" v-model="num">
        <b @click="increat(id, price)">+</b>
      </p>
    </section>
  </li>
</template>
<script>
import axios from 'axios'
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
    selected: {
      type: Boolean
    }
  },
  data () {
    return {
      show: false,
      num: 1,
      checked: this.selected,
      sum: 0
    }
  },
  watch: {
    selected (bool) {
      this.checked = bool
    },
    checked (bool) {
      this.$emit('send', {'id': this.id, 'bool': bool, 'sum': this.num * this.price})
    }
  },
  methods: {
    increat (id, price) {
      if (this.num < 10) {
        this.num ++
        this.$emit('send', {'id': this.id, 'bool': this.checked, 'sum': this.num * this.price})
      }
    },
    decreat (id, price) {
      if (this.num > 1) {
        this.num --
        this.$emit('send', {'id': this.id, 'bool': this.checked, 'sum': this.num * this.price})
      }
    },
    change () {
      this.$emit('changecheck', !this.checked)
    },
    touch_left () {
      this.show = true
      if (this.$refs['del']) {
        this.$refs['del'].addEventListener('click', (ev) => {
          axios.post('/list', {msg: 'change'})
               .then((res) => {
               })
          // ev.path[1].remove()
          // if (ev.path[2].querySelectorAll('li').length < 3) {
          //   ev.path[2].remove()
          // }
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
section span{
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

