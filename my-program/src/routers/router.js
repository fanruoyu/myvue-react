import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
import Upload from '../components/upload/upload.vue'
const router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'Upload',
			component: Upload
		}
	]
})
export default router;
