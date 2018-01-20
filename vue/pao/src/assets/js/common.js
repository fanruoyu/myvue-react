export default{
  install(Vue,options)
  {
    //设置项目添加中的内容区域的高度
    Vue.prototype.setConHeight= function () {
        var clientHeight=document.documentElement.clientHeight;
        var mainConHeight=parseInt(clientHeight)-130;
        var conDom=document.getElementById('conMod');//获得元素
        conDom.style.height=mainConHeight+"px";
    },
    Vue.prototype.getCookie=function(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

      if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
    },
    Vue.prototype.setCookie=function(name,value){
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    //公用的保存成功对话框
    Vue.prototype.saveSuccessDialogue=function(){
         this.$message({
           showClose: true,
           message: '恭喜您，保存成功！',
           type: 'success',
           duration:3000,
         })
    },
    //公用的动态弹出提示内容的对话框 
    Vue.prototype.alertDialogue=function(con){
         this.$message({
           showClose: true,
           message: con,
           type: 'success',
           duration:3000,
         })
    },
    //公用的保存失败对话框
      Vue.prototype.saveError=function(){
        this.$message({
          showClose: true,
          message: '保存失败！',
          type: 'error',
          duration:3000,
        })
      },
    //公用的动态弹出错误提示内容的对话框 
    Vue.prototype.alertErrorDialogue=function(con){
         this.$message({
           showClose: true,
           message: con,
           type: 'error',
           duration:3000,
         })
    },
    /****
    **公用的取消二次确认对话框
    **fn:点击确定需要回调的函数
    */
    Vue.prototype.cancelDialogue=function(fn){
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '是否退出当前页面'),
            h('i', { style: 'color: teal' }, )
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              fn();
            } else {
              done();
            }
          }
        }).then(action => {
        });
    },
    /****
    **公用的删除二次确认对话框
    **fn:点击确定需要回调的函数
    */

    Vue.prototype.delDialogue=function(fn){
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '您确定要删除吗？'),
            h('i', { style: 'color: teal' }, )
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              fn();
            } else {
              done();
            }
          }
        }).then(action => {
        });
    },
    //日期转化为 2017-08-09 00:00:00
    Vue.prototype.gmtToStr=function(date){
      var str="";
      var hour=parseInt(date.getHours());
      var minnutes=parseInt(date.getMinutes());
      var seconds=parseInt(date.getSeconds());
      str+=date.getFullYear()+"-";
      str+=(date.getMonth() + 1)+"-";
      str+=date.getDate()+" ";
      if(hour<10){
        str+="0"+hour+":";
      }else{
        str+=hour+":";
      }

      if(minnutes<10){
        str+="0"+minnutes+":"
      }else{
        str+=minnutes+":";
      }
      if(seconds<10){
        str+="0"+seconds
      }else{
        str+=seconds;
      }
      return str
    },
    // 2017-08-09 00:00:00转化为日期
    Vue.prototype.strToGmt=function(str){
      let GMT = new Date(str)
      return GMT
    },
     //删除俩边空格
    Vue.prototype.trim=function(str){ //删除左右两端的空格
　　     return str.replace(/(^\s*)|(\s*$)/g, "");
　　 }
  }
}
