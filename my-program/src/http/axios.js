import axios from 'axios';
import Vue from 'vue';
const $http = axios.create({
	baseURL: 'http://localhost:3000'
})
Vue.prototype.$http = $http;
export default $http;
