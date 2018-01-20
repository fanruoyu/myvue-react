<template>
  <div id="entry">
    <v-header @loginOut="loginOut"></v-header>
    <div id="main-con">
      <div class="main-menu-box" v-show="isShowMenu">
        <div class="menu-list">
          <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" v-if="v.showAttr" v-for="(v, k) in menuList" :key="k">
              <el-submenu index="/">
                <template slot="title">{{v.listOne}}</template>
                  <el-menu-item v-if="vv.showAttr" :index="vv.menuUrl" v-for="(vv, kk) in v.listTwo" :key="kk">{{vv.menuName}}</el-menu-item>
              </el-submenu>
          </el-menu>
        </div>
      </div>
      <div class="view-box" id="view-box">
         <div :class="{'switch':isSwitch,'switch-close':isSwitchClose}" @click="showMenu"></div>
         <router-view :isleft="isSwitch"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import header from '../components/header'
import footer from '../components/footer'
export default {
  name: 'app',
  components: {
    vHeader: header,
    vFooter: footer
  },
  data () {
    return {
      isShowMenu:true,
      isSwitch:true,
      isSwitchClose:false,
      dataMenuList:[],
      menuList:[
        {
          "listOne":"重资产","showAttr":"",
          "listTwo":[
            {"menuName":"项目管理","menuUrl":"/","showAttr":""},
            {"menuName":"项目审批(集团)","menuUrl":"/heavyGroup","showAttr":""},
            {"menuName":"项目审批(地区)","menuUrl":"/heavyArea","showAttr":""}
          ]
        },
        {
           "listOne":"轻资产","showAttr":"",
           "listTwo":[
             {"menuName":"项目管理","menuUrl":"/lightprojectManage","showAttr":""},
             {"menuName":"项目审批(集团)","menuUrl":"/lightGroup","showAttr":""},
             {"menuName":"项目审批(审批)","menuUrl":"/lightArea","showAttr":""}
           ]
         },
        {
          "listOne":"城市","showAttr":"",
          "listTwo":[
            {"menuName":"城市演变","menuUrl":"/cityEvolves","showAttr":""},
            {"menuName":"产业解读","menuUrl":"/industrialInterpretation","showAttr":""}

          ]
        }
      ]
    }
  },
  methods: {
    // 设置主要内容区域的高度
    setEntryConHeight(){
      var clientHeight=document.documentElement.clientHeight;
      var mainConHeight=parseInt(clientHeight)-60;
      var conDom=document.getElementById('main-con');//获得元素
      conDom.style.height=mainConHeight+"px";
    },
    loginOut(){
      var isActive=this.getCookie("isActive");
      if(isActive==true || isActive=="true"){
        this.setCookie("isLogin",0);
      }else{
        this.setCookie("isLogin",0);
        this.setCookie("loginName","");
        this.setCookie("password","");
      }

      this.$router.push({ path:"/login"});
    },
    //左侧菜单隐藏和显示
    showMenu(){
      if(this.isSwitch){
        document.getElementById("view-box").style.marginLeft="0px";
        document.getElementById("view-box").style.width="100%";
      }else{
        document.getElementById("view-box").style.marginLeft="18%";
        document.getElementById("view-box").style.width="82%";
      }
      this.isSwitch=!this.isSwitch;
      this.isSwitchClose=!this.isSwitchClose;
      this.isShowMenu=!this.isShowMenu;
    },
    concatMenuList(){
      var that=this;
      for(var i=0;i<that.dataMenuList.length;i++){
        if (that.dataMenuList[i].functionName.indexOf("重资产") >= 0) {
          that.menuList[0]["showAttr"] = that.dataMenuList[i].showAttr;
        } else if (that.dataMenuList[i].functionName.indexOf("项目管理") >= 0) {
          //轻资产项目管理
          if (that.dataMenuList[i].functionId == "qProjectManage") {
            that.menuList[1]["listTwo"][0]["showAttr"] = that.dataMenuList[i].showAttr;
          } else {
            that.menuList[0]["listTwo"][0]["showAttr"] = that.dataMenuList[i].showAttr;
          }
        } else if (that.dataMenuList[i].functionName.indexOf("项目审批（集团）") >= 0) {
          that.menuList[0]["listTwo"][1]["showAttr"] = that.dataMenuList[i].showAttr;
        } else if (that.dataMenuList[i].functionName.indexOf("项目审批（地区）") >= 0) {
          that.menuList[0]["listTwo"][2]["showAttr"] = that.dataMenuList[i].showAttr;
        }
        else if (that.dataMenuList[i].functionName.indexOf("轻资产") >= 0) {
          that.menuList[1]["showAttr"] = that.dataMenuList[i].showAttr;
        }
        else if (that.dataMenuList[i].functionName.indexOf("审批管理（集团）") >= 0) {
          that.menuList[1]["listTwo"][1]["showAttr"] = that.dataMenuList[i].showAttr;
        }else if(that.dataMenuList[i].functionName.indexOf("审批管理（地区）")>=0){
          that.menuList[1]["listTwo"][2]["showAttr"]=that.dataMenuList[i].showAttr;
        }else if(that.dataMenuList[i].functionName.indexOf("城市演变")>=0){
          that.menuList[2]["listTwo"][0]["showAttr"]=that.dataMenuList[i].showAttr;
        }else if(that.dataMenuList[i].functionName.indexOf("城市解读")>=0){
          that.menuList[2]["listTwo"][1]["showAttr"]=that.dataMenuList[i].showAttr;
        }else if(that.dataMenuList[i].functionName.indexOf("城市")>=0){
          that.menuList[2]["showAttr"]=that.dataMenuList[i].showAttr;
        }
      }
    },
    //获取菜单权限
    getMainMenuAuth(){
      this.$http.post('/longcity/services/v1/authFunction/getFunctionListByLoginName',{
          "loginName":localStorage.loginName,
          "webPid":"lightAssets",
          "platform":"ios",
          "authType":"1"
        })
        .then(
          success=>{
            if(success.data.code==200 || success.data.code=="200"){
              this.dataMenuList=success.data.result;
              this.concatMenuList();
            }
          },
        );
    },
  },
  mounted(){
    this.setEntryConHeight();
    this.getMainMenuAuth();
  }
}
</script>
<style>
  @import "../assets/css/common.css";
  @import "../assets/css/base.css";
  @import "https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css";
</style>
<style scoped>
  .switch,.switch-close{
    width:22px;
    height:50px;
    position: absolute;
    top:200px;
    left:0px;
    z-index: 990;
    cursor: pointer;
    background: url("../assets/images/switch-left-close.png") no-repeat;
  }
  .switch-close{
    background: url("../assets/images/switch-left-open.png") no-repeat;
  }
</style>
