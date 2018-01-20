import Vue from 'vue'
Vue.directive('touch', {
  bind (el, binding, vnode) {
    let start = {}
    let end = {}
    let stime = 0
    let etime = 0
    let {arg, value} = binding
    el.addEventListener('touchstart', (e) => {
      start.X = e.touches[0].pageX
      stime = new Date().getTime()
    })
    el.addEventListener('touchmove', (e) => {
      end.X = e.touches[0].pageX
      etime = new Date().getTime()
    })
    el.addEventListener('touchend', (e) => {
      if (end.X - start.X < 0 && end.X - start.X < -50 && etime - stime < 1000 && arg === 'left') {
        value()
      }
      if (end.X - start.X > 0 && end.X - start.X > 50 && etime - stime < 1000 && arg === 'right') {
        value()
      }
    })
  }
})
