<template>
  <div class="header">
   	<div class="head-left fl">
   		<img class="logo" src="../assets/images/logo.png">
   	</div>
   	<div class="head-right fr">
   		<div class="info-box fl relative">
   			<!-- <span>消息</span> -->
   			<!-- <label class="absolute cursor">99</label> -->
   		</div>
   		<div class="name-box fl">
   			<img class="fl" src="../assets/images/input-bg.jpg">
   			<ul class="fl" style="margin-top:12px">
   				<li class="li-one">{{name}}</li>
   				<!-- <li>投资管理员</li> -->
   			</ul>
   		</div>
   		<div class="exit fl">
   			<span @click="loginOut">退出</span>
   		</div>
   	</div>
  </div>
</template>
<script>
export default {
   data(){
      return {
         name:'',
         headImg:'',
      }
   },
   methods:{
      setUserInfo(){
         this.name=localStorage.name;
         this.headerImg=localStorage.headerImg;
         this.city=localStorage.headerImg
      },
      loginOut(){
         this.$emit('loginOut');
      }

   },
   mounted () {
      this.setUserInfo();
   }
}
</script>