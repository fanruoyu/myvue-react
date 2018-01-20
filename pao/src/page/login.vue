<template>
    <div id="register">
      <div class="header">
        <img src="../assets/images/logo.png" class="logo" alt="">
        <!-- <span class="text">龙城地图系统</span> -->
      </div>
        <div class="comtent-box">
            <div class="right-box">
                <p class="title">登录</p>
                <p class="input-box beforeImg user">
                    <input type="text" placeholder="请输入用户名" v-model="loginName" @keydown="KeyDown">
                </p>
                <p class="input-box beforeImg pwd">
                    <input type="password" placeholder="请输入密码" v-model="password" @keydown="KeyDown">
                </p>
                <p class="input-box">
                  <label for="checked" >
                    <span id="checked" >
                      <i class="remember" @click="remember" :class="{active:isActive}"></i>记住密码
                    </span>
                  </label>
                </p>
                <p class="input-box">
                    <button type="button" class="btn" @click="login">确定</button>
                </p>
            </div>
            <p class="Power">Power by 龙湖 IT</p>
        </div>
    </div>
</template>


<script>
  export default {
      name: 'register',
      data() {
          return {
            loginName:'',
            password:'',
            isActive:false,//勾选状态
            loading:'',    //load实例
          }
      },
      methods:{
         remember(){
           this.isActive= !this.isActive;
          },
          KeyDown(e){
              if (e.keyCode == 13){
                this.login();
              }
          },
          //页面加载中
          openFullScreen() {
              this.loading = this.$loading({
                lock: true,
                text: '加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          },
          login(){
              this.loginName=this.trim(this.loginName);
              this.password=this.trim(this.password);
              if(this.loginName!==""&&this.password!==""){
                this.openFullScreen();
                  this.$http.post('longcity/services/v1/index/loginAndUserInfo',
                        {"loginName":this.loginName, "password":this.password}
                      ).then(
                          success=>{
                              if(success.data.code==200 || success.data.code=="200"){
                                if(success.data.result.cityList.length==0 || typeof(success.data.result.cityList)=="undefined"){
                                  this.loading.close();
                                  this.alertErrorDialogue("您没有城市权限！");
                                  return false;
                                }
                                localStorage.setItem("token",success.data.result.token);//登录成功保存token
                                if(success.data.result.cityList[0]["cityCode"]=="all"){
                                  var cityList=success.data.result.cityList.slice(1);
                                }else{
                                  var cityList=success.data.result.cityList
                                }
                                cityList=JSON.stringify(cityList);
                                localStorage.setItem("name",success.data.result.nickName);
                                localStorage.setItem("headImg",success.data.result.avatarUrl);
                                localStorage.setItem("cityList",cityList);
                                localStorage.setItem("loginName",success.data.result.loginName);
                                
                                //设置cookie
                                this.setCookie("isLogin",1);
                                this.setCookie("loginName",this.loginName);
                                this.setCookie("password",this.password);
                                this.setCookie("isActive",this.isActive);
                                this.loading.close();     //关闭加载模态框
                                this.$router.push({ path:"/"});
                              }else{
                                this.loading.close();     //关闭加载模态框
                                alert(success.data.message);
                                
                              }
                          },
                          err=>{
                            console.log(err)
                          })
              }else {
                alert("用户名或密码不能为空！");
              }

          }
      },
      mounted(){
        localStorage.token="";
        var loginName=this.getCookie("loginName");
        var password=this.getCookie("password");
        var isActive=this.getCookie("isActive");
        this.loginName=loginName;
        this.password=password;
        if(isActive==true || isActive=="true"){
          this.isActive=true;
        }else{
          this.isActive=false;
        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "../assets/css/common.css";
  @import "../assets/css/base.css";
</style>
<style scoped>

</style>
