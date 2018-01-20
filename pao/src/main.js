// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './page/App'
import router from './router'
import axios from 'axios'
import "babel-polyfill";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import common from './assets/js/common'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, {
  locale: 'zh_CN',
});

var baseUrl= window.__bOnline ? "https://api-longcity.longfor.com:6443/" : "http://dev-longcity.longfor.com:9080/"
// var baseUrl="https://api-longcity.longfor.com:6443/"    // 生产地址
//var baseUrl="http://dev-longcity.longfor.com:9080/"    // 测试地址
Vue.config.productionTip = false;
Vue.use(common);
Vue.use(ElementUI);
// 创建一个axios实例
var $http = axios.create({
	headers: {
		'platform': 'pc',
	  	'version':'v1'
	},
	baseURL:baseUrl
});
function getCookie(name){
  	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

   	if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
};
function setCookie(name,value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
};
//axios全局设置token
$http.interceptors.request.use(
	config => {
	    // 这里一个token，你需要在这里取到你设置好的token的值
	    const token = localStorage.token;
	    if (token) {
	        // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
	        config.headers.token = token;
	    }
	    return config
	},
	error => {
	    return Promise.reject(error)
	}
);
//axios全局设置响应
$http.interceptors.response.use(
    response => {
    	if(response.data.code==200 || response.data.code=="200"){
    		return response;
    	}else if(response.data.code==303 || response.data.code=="303"){
    		var isActive=getCookie("isActive");
		    if(isActive==true || isActive=="true"){
		    	setCookie("isLogin",0);
		    }else{
		    	setCookie("isLogin",0);
		    	setCookie("loginName","");
		    	setCookie("password","");
		    }
    		window.location.href="/";
    	}else{
    		return response;
    	}
    },
    error => {
    	alert(error.response.data.message)   // 返回接口返回的错误信息
    }
);
Vue.prototype.$http = $http;
Vue.prototype.$baseUrl = baseUrl;
new Vue({
	el: '#app',
  	router,
  	template: '<App/>',
  	components: { App },
})
