<template>
    <div id="register">
        <div class="comtent-box">
            <div class="right-box">
                <p class="title">龙城地图用户登录</p>
                <p class="input-box">
                    <input type="text" class="user" placeholder="请输入用户名" v-model="loginName">
                </p>
                <p class="input-box">
                    <input type="password" class="pwd" placeholder="请输入密码" v-model="password">
                </p>
                <p class="input-box">
                    <button type="button" class="btn" @click="register">登录</button>
                </p>
            </div>
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
          }
      },
      methods:{
          register(){
              if(this.loginName!==""&&this.password!==""){
                  this.$http.post(
                        'http://172.18.63.152:8888/longcity/services/v1/index/login',
                        {"loginName":this.loginName, "password":this.password}
                      ).then(
                          success=>{
                              console.log(success);
                              localStorage.setItem("token",success.data.result.token);//登录成功保存token
                              //window.location.href="https:www.baidu.com"//登录成功跳转测试
                          },
                          err=>{
                            console.log(err)
                          })
              }else {
                  return
              }

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
