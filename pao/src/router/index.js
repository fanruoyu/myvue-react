import Vue from 'vue'
import Router from 'vue-router'
import entry from '../page/entry'
import login from '../page/login'
import notFound from '../page/notFound'
//重资产项目管理
import projectManage from '../page/project/projectManage'
//重资产集团审批
//import heavyGroup from '../page/heavyAssetsApprovalMod/groupProjectApproval'
const heavyGroup = () => import('../page/heavyAssetsApprovalMod/groupProjectApproval')
//重资产地区审批
//import heavyArea from '../page/heavyAssetsApprovalMod/areaProjectApproval'
const heavyArea = () => import('../page/heavyAssetsApprovalMod/areaProjectApproval')

//轻资产项目管理
//import lightprojectManage from '../page/project/lightProjectManage'
//借用webpack2中的按需加载，减少初始化代码量
const lightprojectManage = () => import('../page/project/lightProjectManage')
//轻资产集团审批
//import lightGroup from '../page/lightAssets/projectApprovalMod/groupProjectApproval'
const lightGroup = () => import('../page/lightAssets/projectApprovalMod/groupProjectApproval')
//轻资产地区审批
//import lightArea from '../page/lightAssets/projectApprovalMod/areaProjectApproval'
const lightArea = () => import('../page/lightAssets/projectApprovalMod/areaProjectApproval')
//城市演变
//import cityEvolves from '../page/cityLandMod/cityEvolves'
const cityEvolves = () => import('../page/cityLandMod/cityEvolves')
//产业解读
//import industrialInterpretation from '../page/cityLandMod/industrialInterpretation'
const industrialInterpretation = () => import('../page/cityLandMod/industrialInterpretation')
//重资产详情入口页面
//import heavyDetailEntry from '../page/heavyProjectDetailEntry'
const heavyDetailEntry = () => import('../page/heavyProjectDetailEntry')
//重资产详情页
//import heavyDetail from '../page/heavyProjectDetail/detail'
const heavyDetail = () => import('../page/heavyProjectDetail/detail')

Vue.use(Router)
function getCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

  if(arr=document.cookie.match(reg))

    return unescape(arr[2]);
  else
    return null;
}
var router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      component: entry,
      children: [
       //重资产项目管理
        {
          path: '/',
          component: projectManage
        },
        //重资产集团审批流
        {
          path: '/heavyGroup',
          component: heavyGroup
        },
        //重资产地区审批流
        {
          path: '/heavyArea',
          component: heavyArea
        },
        //轻资产项目管理
        {
          path: '/lightprojectManage',
          component: lightprojectManage
        },
        //轻资产集团审批流
        {
          path: '/lightGroup',
          component: lightGroup
        },
        //轻资产地区审批流
        {
          path: '/lightArea',
          component: lightArea
        },
        //城市演变
        {
          path: '/cityEvolves',
          component: cityEvolves
        },
        //产业解读
        {
          path: '/industrialInterpretation',
          component: industrialInterpretation
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/heavyDetailEntry',
      component: heavyDetailEntry,
      children: [
       //重资产项目管理
        {
          path: '/',
          component:heavyDetail
        },
      ]
    },
    { 
      path: '*', 
      component:notFound
    }
  ]
});
router.beforeEach((to, from, next) => {
 // 若userkey不存在并且前往页面不是登陆页面，进入登陆
 // 若userkey存在并且前往登陆页面，进入主页
 var isLogin=getCookie("isLogin");
 if(typeof(isLogin)!=="undefined"){
   isLogin=parseInt(isLogin);
 }
 if (!isLogin && to.path !== '/login') {
  next({
   path: '/login'
  })
 } else if (isLogin && to.path === '/login') {
  next({ path: '/' })
 } else {
  next()
 }
});
export default router
