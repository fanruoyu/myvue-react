<template>
  <div id="light-roject-manage" class="view" style="position:relative">
    <button class="positionBtn" @click="setPosition" v-show="positionBtn">使用当前位置</button>
    <div id="map"></div>
    <div class="city" v-show="showCity">
      <el-select v-model="value"  filterable size="3" placeholder="" @change="changeCity(value)">
        <el-option
          v-for="item in cityList"
          :key="item.cityCode"
          :label="item.cityName"
          :value="item.cityCode">
        </el-option>
      </el-select>
    </div>
    <div class="add-project" v-show="addProjectFlag">
      <div class="addBtn" @click="addProject">
        <img src="../../assets/images/addProject.png">
      </div>
    </div>
    <div class="right-list" v-show="list">
      <div class="search" style="position:fixed">
        <input type="text" v-model="searchKey" @keydown="KeyDown">
        <button class="searchBtn" @click="searchProject()">搜索</button>
      </div>
      <div class="searchTag">
        <input name="searchTag" type="radio" value="-1" v-model="contractStatus" @click="searchProject()" checked/>全部
        <input name="searchTag" type="radio" value="1" v-model="contractStatus" @click="searchProject()" />已签约
        <input name="searchTag" type="radio" value="0" v-model="contractStatus" @click="searchProject()" />待签约
        <input name="searchTag" type="radio" value="2" v-model="contractStatus" @click="searchProject()" />流失
      </div>
      <ul v-if="projectListLength">
        <li v-for="(v, index) in projectListCurrentPageData">
          <el-row :gutter="10" style="padding-top:2px">
            <el-col :span="2">
              <label>{{index+1}}</label>
            </el-col>
            <el-col :span="18">
              <p class="fl" :title="v.name">{{v.name.length<=40?v.name:v.name.slice(0,38)+"..."}}</p>
            </el-col>
            <el-col :span="3">
              <img src="../../assets/images/edit.png" class="fl" @click="editProject(v.id,v.name)">
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="14" :offset="2">
              <span v-if="v.contractStatus>=0" class="fl pro0">{{v.approvalStatus|approvalStatus}}</span>
              <span v-if="v.contractStatus==0" style="width:60px" class="fl pro1">待签约</span>
              <span v-else-if="v.contractStatus==1" style="width:60px" class="fl pro2">已签约</span>
              <span v-else-if="v.contractStatus==2" style="width:60px" class="fl pro3">流失</span>
            </el-col>
          </el-row>
        </li>
      </ul>
      <div class="no-data" v-else>当前城市暂无项目！</div>
      <div class="page-box" v-show="projectListLength">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="size"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
      </div>
    </div>
    <div class="right-con" v-show="rightCon">
      <div class="right-con-l fl">
        <add-project @setMark="setMark" @cancelThePage="cancelThePage" ref="run"  v-if="projectManage==1"></add-project>
        <div v-else-if="projectManage==0 && bNewComp" style="width:100%">
          <lightproject-info @openLoading="openFullScreen" @closeLoading="closeLoading" :newAddress="newAddress" ref="run" :setMark="setMark" :childParm="childParm" @cancelThePage="cancelThePage" v-if="projectTag==1" ></lightproject-info>
          <regional-facilities :childParm="childParm" @cancelThePage="cancelThePage" v-if="projectTag==2"></regional-facilities>
          <market-customer :childParm="childParm" @cancelThePage="cancelThePage" v-if="projectTag==3"></market-customer>
          <product-positioning :childParm="childParm" @cancelThePage="cancelThePage" v-if="projectTag==4"></product-positioning>
          <cost-analysis :childParm="childParm" @cancelThePage="cancelThePage" v-if="projectTag==5"></cost-analysis>
          <operational-indicators :childParm="childParm" @cancelThePage="cancelThePage" v-if="projectTag==6"></operational-indicators>
          <investment-target :childParm="childParm" @cancelThePage="cancelThePage" v-if="projectTag==7"></investment-target>
          <risk-analysis :childParm="childParm" @cancelThePage="cancelThePage" v-if="projectTag==8"></risk-analysis>
          <legal-review :childParm="childParm" @cancelThePage="cancelThePage" v-if="projectTag==9"></legal-review>
          <annex-mod :childParm="childParm" @cancelThePage="cancelThePage" v-if="projectTag==10"></annex-mod>
        </div>
      </div>
      <div class="right-con-r fl" v-if="projectFlag==1">
        <div style="height:282px"></div>
        <ul>
          <li   v-for="(v,index) in infoMod" :class="{'light':index==(projectTag-1)}"  @click="changeMod(index,v.key)">{{v.value}}</li>

        </ul>
      </div>
    </div>
    <div :class="{'switch':isSwitch,'switch-close':isSwitchClose}" @click="isShowProjectList"></div>
    <div :class="{'switch2':isSwitch2,'switch2-close':isSwitchClose2}" @click="isShowProject"></div>
  </div>
</template>
<script>
  //添加项目
  import addProject from '../lightAssets/projectInfoMod/addProjectInfo'
  //项目条件
  import lightprojectInfo from '../lightAssets/projectInfoMod/projectInfo'
  //区位及配套
  import regionalFacilities from '../lightAssets/regionalFacilitiesMod/regionalFacilities'
  //市场及客户分析
  import marketCustomer from '../lightAssets/marketCustomerAnalysisMod/marketCustomerAnalysis'
  //产品定位
  import productPositioning from '../lightAssets/productPositioningMod/productPositioning'
  //成本分析
  import costAnalysis from '../lightAssets/costAnalysisMod/costAnalysis'
  //运营指标
  import operationalIndicators from '../lightAssets/operationalIndicatorsMod/operationalIndicators'
  //投资指标
  import investmentTarget from '../lightAssets/investmentTargetMod/investmentTarget'
  //风险分析
  import riskAnalysis from '../lightAssets/riskAnalysisMod/riskAnalysis'
  //法务文件审核
  import legalReview from '../lightAssets/legalReviewMod/legalReview'
  //附件
  import annexMod from '../lightAssets/annexMod/annex'
  import icon_1 from '../../assets/images/icon_1.png';
  import position_1 from '../../assets/images/position-01.png';
  import position_2 from '../../assets/images/position-02.png';
  import position_3 from '../../assets/images/position-03.png';
  import position_4 from '../../assets/images/position-04.png';
  import position_5 from '../../assets/images/position-05.png';
  import position_6 from '../../assets/images/position-06.png';
  import position_7 from '../../assets/images/position-07.png';
  import position_8 from '../../assets/images/position-08.png';
  import position_9 from '../../assets/images/position-09.png';
  import position_10 from '../../assets/images/position-10.png';
  export default {
    name:'projectManage',
    components: {
      //添加项目
      addProject:addProject,
      //项目条件
      lightprojectInfo:lightprojectInfo,
      //区位及配套
      regionalFacilities:regionalFacilities,
      //市场及客户分析
      marketCustomer:marketCustomer,
      //产品定位
      productPositioning:productPositioning,
      //成本分析
      costAnalysis:costAnalysis,
      //运营指标
      operationalIndicators:operationalIndicators,
      //投资指标
      investmentTarget:investmentTarget,
      //风险分析
      riskAnalysis:riskAnalysis,
      //法务文件审核
      legalReview:legalReview,
      //附件
      annexMod:annexMod
    },
    filters: {
      //审核状态过滤器
      approvalStatus: function (value) {
          let v='';
          if(value==0){
            return v="投委否决";
          }else if(value==1){
            return v="投委有条件通过";
          }else if(value==2){
            return v="投委通过";
          }else if(value==3){
            return v="地总否决";
          }else if(value==4){
            return v="投委审批中";
          }else if(value==5){
            return v="地区冠寓负责人否决";
          }else if(value==6){
            return v="地总审批中";
          }else if(value==7){
            return v="地区冠寓负责人审批中";
          }else if(value==8){
            return v="未审批";
          }
      }
    },
    data(){
      return{
        bNewComp: true,
        newAddress:[],       //地图选点后最新的坐标和地址
        searchKey:'',
        contractStatus:-1,   //筛选分类 -1：全选
        addProjectFlag:1,    //添加按钮显示不显示
        projectFlag:'',      //轻资产项目类目：1
        cityList: JSON.parse(localStorage.cityList),
        showCity:true,
        lng:'',               //城市的经度
        lat:'',               //城市的纬度
        capital:'',           //是否省会直辖市    1为省会直辖市
        cityCode:'',          //城市编码
        value:'',
        projectManage:null,   //0编辑 1添加项目 2添加竞品
        map:'',
        polygons:[],         //编辑展示的多边形集合
        markTool:'',         //marktool在地图上的mark
        mkr:'',               //marktool的实例
        drawingManager:'',   //声明绘图工具
        points:'',           //编辑勾图返回的坐标字符串
        positionArr:'',
        list:true,
        rightCon:false,
        projectTag:'',          //项目的需要添加的模块的编码默认为项目概览
        isSwitch:true,
        isSwitchClose:false,
        isSwitch2:false,
        isSwitchClose2:false,
        positionBtn:false,
        currentPage:1,
        total:0,
        size:10,
        totalPage:0,
        projectListCurrentPageData:null,
        projectListNoCurrentPageData:null,
        projectListLength:'',
        projectList:'',
        projectId:'',          //编辑的项目id号
        projectName:'',        //编辑的项目NAME
        styleOptions :{       //绘制图形样式配置
          strokeColor:"red",  //边线颜色。
          fillColor:"#fff",   //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 2,       //边线的宽度，以像素为单位。
          strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
          fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
          strokeStyle: 'solid' //边线的样式，solid或dashed。
        },
        infoMod:[
          {"key":"prjConditions","value":"项目条件"},
          {"key":"LocAndSupp","value":"区位及配套"},
          {"key":"MarketCustomer","value":"市场及客户分析"},
          {"key":"productPosit","value":"产品定位"},
          {"key":"costAnalysis","value":"成本分析"},
          {"key":"OperIndicators","value":"运营指标"},
          {"key":"investmentTarget","value":"投资指标"},
          {"key":"riskAnalysis","value":"风险分析"},
          {"key":"legalDocReview","value":"法务文件审核"},
          {"key":"specialty_files_title","value":"附件"},
        ],
        menuAuthObj:'',              //权限集合
        changeModFlag:false ,        //右侧菜单模块不可点击
        competitorParm:{},           //竞品子组件竞品需要的参数集合
        childParm:{},                //项目子组件需要的参数集合
        loading:'',                  //load实例
        overlaysIndex:0,            //用户绘制的地块索引
        overlays:[],                //用户绘制的地块集合
        landRect:'',
        landName:'',
        remark:'',
        landEdges:[],               //用户保存过的地块集合
        landNum:'',                 //用户保存过的块块标识
        landTag:'',                 //地块tag为1：保存过；0：未保存
        landEditFlag:0,             //地块处于编辑中的标识
        landEditNum:'',             //地块处于编辑中下标
        originlandData:'',          //地块编辑前的样子集合
        projectKey:''
      }
    },
    methods: {
      /*
      ** 点击右侧栏修改信息模块
      ** modName: 右侧模块对应的数据库字段名称
      ** modAuth: 0|1|2 (0没权限，1只可读，2可读可写)
      */
      changeMod(num,modName){
        var that=this;
        if(this.changeModFlag){
          //获取当前信息填写模块的权限
          // var modAuth=this.checkAuth(this.menuAuthObj,modName);
          var modAuth=2;
          if(!modAuth){
            return false;
          }
          this.projectTag=(num+1);
          var id=this.projectId;
          //设置子组件需要的参数
          this.childParm={
            "id":id,
            "projectName":this.projectName,
            "modAuth":modAuth,
            "cityCode":this.cityCode
          };
          /*this.$nextTick(()=>{
            this.$refs.run.run("getId",id,modAuth);
          });*/
        }
      },
      checkAuth(menuAuthObj,modName){
        //判断是否有读的权限 1为有 0 为无
        var readAuth=parseInt(menuAuthObj[modName][0]);
        //判断是否有编辑的权限 1为有 0 为无
        var editAuth=parseInt(menuAuthObj[modName][1]);
        if(readAuth==0 && editAuth==0){
          alert("没有权限");
          var modAuth=0;
        }else if(editAuth==1){
          var modAuth=2;
        }else{
          var modAuth=1;
        }
          return  modAuth;
      },
      //地图标注
      createMark(map,data,icon){
        if(icon){
          var myIcon = new BMap.Icon(icon_1, new BMap.Size(15,15));
        }
        var data_info=data;
        var opts = {
              width :100,     // 信息窗口宽度
              height:40,     // 信息窗口高度
              enableMessage:false//设置允许信息窗发送短息
           };
        for(var i=0;i<data_info.length;i++){
          if(icon){
            var marker = new BMap.Marker(new BMap.Point(data_info[i]["longitude"],data_info[i]["latitude"]),{icon:myIcon});
            map.addOverlay(marker);
          }else{
            switch(i)
              {
              case 0:
                var myIcon = new BMap.Icon(position_1, new BMap.Size(18,25));
                break;
              case 1:
               var myIcon = new BMap.Icon(position_2, new BMap.Size(18,25));
                break;
              case 2:
               var myIcon = new BMap.Icon(position_3, new BMap.Size(18,25));
                break;
              case 3:
               var myIcon = new BMap.Icon(position_4, new BMap.Size(18,25));
                break;
              case 4:
               var myIcon = new BMap.Icon(position_5, new BMap.Size(18,25));
                break;
              case 5:
               var myIcon = new BMap.Icon(position_6, new BMap.Size(18,25));
                break;
              case 6:
               var myIcon = new BMap.Icon(position_7, new BMap.Size(18,25));
                break;
              case 7:
               var myIcon = new BMap.Icon(position_8, new BMap.Size(18,25));
                break;
              case 8:
               var myIcon = new BMap.Icon(position_9, new BMap.Size(18,25));
                break;
              case 9:
               var myIcon = new BMap.Icon(position_10, new BMap.Size(18,25));
                break;
              }
            //创建标注
            var marker = new BMap.Marker(new BMap.Point(data_info[i]["longitude"],data_info[i]["latitude"]),{icon:myIcon});
            marker.setZIndex(100);
            map.addOverlay(marker);
            marker.setAnimation(4);
            marker.setAnimation(null);
          }
          var content = data_info[i]["projectName"];
          addClickHandler(content,marker);

        }
        function addClickHandler(content,marker){
          marker.addEventListener("click",function(e){
            openInfo(content,e)}
          );
        }
        function openInfo(content,e){
          var p = e.target;
          var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
          var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
          map.openInfoWindow(infoWindow,point); //开启信息窗口
        }
      },
      /*
      **geoc:new BMap.Geocoder();
      **pt:地图上的一个point
      **根据pt解析为中文地址
      */
      analysisPosition(geoc,pt){
        var that=this;
        geoc.getLocation(pt, function(rs){
          var addComp = rs.addressComponents;
          var positionName=addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
          var content=positionName;
          that.positionArr=[positionName,pt.lng,pt.lat];
          /********************添加info标注**********************/
          var opts = {
            width :100,     // 信息窗口宽度
            height:40,     // 信息窗口高度
            enableMessage:false//设置允许信息窗发送短息
          };
          //添加info信息框
          var point = new BMap.Point(pt.lng, pt.lat);
          // 创建信息窗口对象
          var infoWindow = new BMap.InfoWindow(content,opts);
          //开启信息窗口
          that.map.openInfoWindow(infoWindow,point);
        });
      },
      //地图添加标注和逆地址解析
      setMark(){
        this.addProjectFlag=0;                //隐藏添加项目按钮
        var that=this;
        this.isShowProject();
        //添加标注
        var mkrTool = new BMapLib.MarkerTool(this.map,{autoClose: true});
        mkrTool.open();
        var icon = BMapLib.MarkerTool.SYS_ICONS[0];
        mkrTool.setIcon(icon);
        this.positionBtn=true;
        //逆地址解析
        var geoc = new BMap.Geocoder();
        //markend结束后的流程
        mkrTool.addEventListener("markend", function(e){
            var mkr = e.marker;
            var pt=mkr.getPosition();        //获取当前marker的坐标
            that.analysisPosition(geoc,pt);  //解析地址
            mkr.enableMassClear();          //允许在地图覆盖物上移除
            that.markTool=mkr;
            that.map.addOverlay(that.markTool);
            mkr.enableDragging();                //允许拖拽
            mkr.addEventListener('dragend',function(e){
              var pt=e.point;
              that.analysisPosition(geoc,pt);
            });

        });
        this.mkr=mkrTool;
      },
      //删除marker工具和绘制的marker
      deleteMarkerTool(){
        if(this.mkr){
          this.positionBtn=false;                 //使用当前位置按钮隐藏
          this.map.removeOverlay(this.markTool);  //移除绘制的marker
          this.mkr.close();                      //关闭markertool绘制工具
        }
      },
      //使用当前位置
      setPosition(){
        this.isShowProject();                  //展示内容区
        this.deleteMarkerTool();
        this.map.closeInfoWindow();
        //this.$refs.run && this.$refs.run.run("getPosition",this.positionArr);
        this.newAddress = this.positionArr;
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
      closeLoading(){
        this.loading.close();
      },
      changeCity(cityCode){
        this.searchKey='';      //设置搜索关键字为空
        this.contractStatus=-1; //设置全部选中
        this.openFullScreen();
        var x,y,capital;
        for(var i=0;i<this.cityList.length;i++){
          if(this.cityList[i]["cityCode"]==cityCode){
            this.lng=x=this.cityList[i]["longitude"];
            this.lat=y=this.cityList[i]["latitude"];
            this.capital=capital=parseInt(this.cityList[i]["capital"]);
            this.cityCode=cityCode;
            this.getProjectList(cityCode,x,y,capital);
            // this.createMap(x,y);
            return false;
          }
        }

      },
      /*
      **operation 值是1为取消操作！2为保存操作
      */
      cancelThePage(operation){
        this.addProjectFlag=1;
        this.isSwitchClose=false;
        this.isSwitchClose2=false;
        this.isSwitch2=false;
        this.rightCon=false;
        this.list=true;
        this.isSwitch=true;
        this.showCity=true;         //展示city列表
        if(operation==2 || operation=="2"){
          var cityCode=this.cityCode;
          var x=this.lng;
          var y=this.lat;
          var capital=this.capital;
          this.getProjectList(cityCode,x,y,capital);   //刷新项目列表
        }
      },
      KeyDown(e){

        if (e.keyCode == 13){
          this.searchProject(this.searchKey,this.contractStatus);
        }
      },
      /*搜索项目
      **searchKey:搜索关键字
      **contractStatus：选中状态
      */
      searchProject(){
        var that=this;
        this.openFullScreen();
        var cityCode=this.cityCode
        this.$http.post('/longcity/services/light/v1/lightProject/searchFilter',{
            "cityCode":cityCode,
            "pageSize":-1,
            "contractStatus":this.contractStatus,
            "keyWord":this.searchKey
          })
          .then(
            success=>{
              if(success.data.code==200 || success.data.code=="200"){
                this.loading.close();          //关闭加载模态框
                this.projectList=success.data.result.items;
                this.currentPage=1;
                this.getCurrentPageData(this.projectList,1,this.size);
                this.setPage();          //初始化分页
                var x=this.lng;
                var y=this.lat;
                var capital=this.capital;
                this.createMap(x,y,capital);
              }
            },
          );
      },
      /***
        ** id:项目id
        ** projectName:项目名称
      **/
      editProject (id,projectName) {
        this.projectName=projectName;
        this.projectId=id;
        //跳转到项目概览
        this.openFullScreen();
        this.getMenuAuth(id);

        this.bNewComp = false;
        this.$nextTick(()=>{
          this.bNewComp = true
        })
      },
      //获取项目权限
      getMenuAuth(projectId){
        var that=this;
        this.$http.post('/longcity/services/light/v1/lightProject/getMenuAuthForLight',{
            "lightProjectId":projectId
          })
          .then(
            success=>{
              if(success.data.code==200 || success.data.code!="200"){
                this.menuAuthObj=success.data.result;
                //this.loading.close();
                // var modAuth=that.checkAuth(that.menuAuthObj,"prjConditions");
                var modAuth=2;
                //有权限的执行逻辑
                if(modAuth!=0 || modAuth!="0"){
                  this.showCity=false;         //隐藏city列表
                  this.list=false;
                  this.isSwitch=false;
                  this.isSwitchClose=false;
                  this.projectManage=0;        //引入编辑组件
                  this.isSwitchClose2=false;
                  this.isSwitch2=true;
                  this.rightCon=true;
                  this.projectFlag=1;
                  this.changeModFlag=true;    //右侧菜单模块可以点击
                  this.changeMod(0,"prjConditions");
                }
              }
            },
          );
      },
       //添加项目
      addProject () {
        this.changeModFlag=false;        //右侧菜单模块不可以点击
        this.projectTag=1;               //默认选中第一项
        this.list=false;
        this.isSwitch=false;
        this.isSwitchClose=false;
        this.isSwitchClose2=false;
        this.isSwitch2=true;
        this.rightCon=true;
        this.showCity=false;      //隐藏city列表
        this.projectManage=1;
        this.projectFlag=1;
        this.deleteMarkerTool();
      },
      //项目列表的开关事件
      isShowProjectList() {
        this.list= !this.list;
        this.isSwitch=!this.isSwitch;
        this.isSwitchClose=!this.isSwitchClose;
      },
      //项目编辑页的开关事件
      isShowProject () {
        // this.list=true;
        this.rightCon=!this.rightCon;
        this.isSwitch=false;
        this.isSwitchClose=false;
        this.isSwitch2=!this.isSwitch2;
        this.isSwitchClose2=!this.isSwitchClose2;
        this.deleteMarkerTool();
      },
      //初始化分页
      setPage () {
        this.total=this.projectList.length;
        if(this.total>0){
          this.projectListLength=true;
        }else{
          this.projectListLength=false;
        }
        this.totalPage=Math.ceil(this.total/this.size);
      },
      //获取当前页数据(listdata为全量数据)
      getCurrentPageData(listData,currentPage,size){
        var starNum=(currentPage-1)*size;
        var endNum=currentPage*size;
        return this.projectListCurrentPageData=listData.slice(starNum,endNum);
      },
      //获取非当前页数据(listdata为全量数据)
      getNoCurrentPageData(listData,currentPage,size){
        var currentPage=parseInt(currentPage);
        var totalPage=this.totalPage;
        if(currentPage==1){
          var startNum=currentPage*size;
          this.projectListNoCurrentPageData=listData.slice(startNum);
        }else if(1<currentPage<totalPage){
          var starNum=currentPage*size;
          var endNum=(currentPage-1)*size;
          var arr1=listData.slice(0,endNum);
          var arr2=listData.slice(starNum);
          this.projectListNoCurrentPageData=arr1.concat(arr2);
        }else{
          var endNum=(currentPage-1)*size;
          this.projectListNoCurrentPageData=listData.slice(0,endNum);
        }
        return this.projectListNoCurrentPageData;
      },
      //点击当前页获取当前页的数据
      handleCurrentChange(val) {
        this.map.clearOverlays();
        var currentList=this.getCurrentPageData(this.projectList,val,this.size);
        var noCurrentList=this.getNoCurrentPageData(this.projectList,val,this.size);
        this.createMark(this.map,currentList);    //当前页数据在地图标注
        this.createMark(this.map,noCurrentList,1);    //非当前页数据地图标注
      },
      //获取项目列表
      getProjectList(cityCode,x,y,capital){
        this.$http.post('/longcity/services/light/v1/lightProject/searchFilter',{
          "cityCode":cityCode,
          "pageSize":-1,
          "contractStatus":-1
        })
        .then(
          success=>{
            if(success.data.code==200 || success.data.code=="200"){
              this.loading.close();          //关闭加载模态框
              this.projectList=success.data.result.items;
              this.currentPage=1;
              this.getCurrentPageData(this.projectList,1,this.size);
              this.setPage();          //初始化分页
              this.createMap(x,y,capital);
            }
          },
          err=>{

          }
        );
      },
      //初始化地图
      createMap(x,y,capital) {
        if(!x || typeof("x")=="undefined"){
          x=this.cityList[0]["longitude"];
          y=this.cityList[0]["latitude"];
        }
        if(capital==1 || capital=="1"){
          var level=12;
        }else{
          var level=13;
        }
        var page=1;
        this.map = new BMap.Map('map',{enableMapClick:false});
        let point = new BMap.Point(x,y);
        this.map.centerAndZoom(point, level);
        this.map.enableScrollWheelZoom(true);
        var currentList=this.getCurrentPageData(this.projectList,1,this.size);//获取第一页数据
        var noCurrentList=this.getNoCurrentPageData(this.projectList,page,this.size);//获取非当前页数据
        this.createMark(this.map,currentList);    //当前页标注
        this.createMark(this.map,noCurrentList,1);    //当前页标注
      }
    },
    mounted () {
      var beiJing=false;
      //判断当前城市有没有北京
      for(var i=0;i<this.cityList.length;i++){
        if(this.cityList[i]["cityCode"]=="110100"){
          beiJing=true;
          this.value=this.cityList[i]["cityCode"];
          return false;
        }
      }
      if(!beiJing){
        this.value=this.cityList[0]["cityCode"];
      }
    }
  }
</script>
<style scoped lang="less">
#light-roject-manage{

    #map{
      width:100%;
      height:100%;
    }
    .city{
      position: absolute;
      top:10px;
      left:22px;
      z-index:990;
    }
    .drawBtn{
      display: inline-block;
      position: absolute;
      padding:0 5px;
      top:6px;
      height:46px;
      line-height:46px;
      text-align: center;
      z-index:990;
      cursor: pointer;
      background: #67649F;
      color:#fff;
      border-radius:2px;
    }
    .positionBtn{
      position: absolute;
      top:6px;
      height:40px;
      text-align: center;
      right:180px;
      z-index:990;
      cursor: pointer;
      color:#fff;
      background: #67649F;
      border:1px solid #67649F;
      border-radius: 2px;
      padding:0 5px;
    }
    .finish{
      right:80px;
    }
    .edit{
      right:108px;
    }
    .cancel{
      right:148px;
    }
    .add-project{
      width:220px;
      height:225px;
      position: absolute;
      bottom:20px;
      left:5px;
      z-index: 990;
      cursor: pointer;
    }
    .add-project .addBtn{
      position: absolute;
      width:80px;
      height:80px;
      border-radius:80px;
      left:70px;
      bottom:0px;
    }
    .add-project .add-box{
      width:100%;
      height:160px;
      border-radius:5px;
      margin: 0 auto;
      background: url(../../assets/images/back1.png) no-repeat;
    }
    .add-project .add-box .m{
      width:80px;
      height:140px;
      padding:10px;
    }
    .add-project .add-box .m1{
      padding-left:15px;
    }
    .add-project .add-box .m span{
      width:80px;
      height:80px;
      text-align: center;
    }
    .add-project .add-box .m span img{
      margin-top:10px;
    }
    .add-project .add-box .m label{
      display: block;
      text-align: center;
    }
    .right-list{
      position: absolute;
      bottom:0px;
      right:0px;
      z-index:990;
      width:400px;
      height:97%;
      background:#fff;
      overflow-y: auto;
      border-color:#ccc;
      -moz-box-shadow: 1px 1px 1px #ccc;
      box-shadow: 1px 1px 1px #ccc;
    }
    .right-list .search{
      width:380px;
      padding:8px 10px;
      height:34px;
      line-height:50px;
      background:#534F96;
      position:fixed;
      z-index:990;
      border:none;
      border-radius:0;
    }
    .right-list .search input{
      width:270px;
      height:30px;
      padding:2px;
      float: left;
    }
    .right-list .search .searchBtn{
      width:70px;
      height:35px;
      line-height:35px;
      border:none;
      border-radius:3px;
      cursor: pointer;
      margin-left:10px;
      float: left;
    }
    .right-list .searchTag{
      width:100%;
      height:40px;
      line-height:40px;
      margin-top:50px;
      border-bottom:1px solid #c3c3c3;
      background: #fff;
      position: fixed;
      z-index: 990;
    }
    .right-list .searchTag input{
      margin-left:20px;
    }
    .right-list ul{
      margin-top:90px;
    }
    .right-list li{
      height:80px;
      border-bottom: 1px solid #c3c3c3;
      cursor: pointer;
      padding:0 5px;
    }
    .right-list li:hover{
      background: #EEEEEE;
    }
     .right-list li label{
        display: inline-block;
        width:18px;
        height:25px;
        text-align: center;
        line-height: 20px;
        color: #fff;
        margin-top:10px;
        background: url("../../assets/images/position.png") no-repeat;
    }
    .right-list li p{
      clear: both;
      max-height:50px;
      line-height:25px;
      width:100%;
      overflow: hidden;
    }
    .right-list li span{
      height:20px;
      text-align: center;
      line-height:20px;
      border:1px solid #3185E6;
      border-radius:3px;
      color:#3185E6;
      padding:0 3px;
    }
    .right-list li span.pro0{
      color:#1495EB ;
      padding:0 2px;
      border-color:#1495EB;
      margin-right:5px;
    }
    .right-list li span.pro1{
      color:#fff;
      width: 40px;
      background: #62BEFF;
      border-color:#62BEFF;
    }
    .right-list li span.pro2{
      color:#fff;
      width:40px;
      background: #398DF3;
      border-color:#398DF3;
      margin-right:5px;
    }
    .right-list li span.pro3{
      color:#fff;
      width: 40px;
      background: #aaa;
      border-color:#aaa;
    }
    .right-list li img{
      margin-top:2px;
    }
    .no-data{
      width:100%;
      height:40px;
      line-height:40px;
      text-align: center;
      margin-top:50px;
    }
    .switch,.switch2{
      width:22px;
      height:50px;
      position: absolute;
      top:3%;
      right:397px;
      z-index:900;
      cursor: pointer;
      background: url("../../assets/images/switch-close.png") no-repeat;
    }
    .switch2{
      left:0px;
      top:3%;
    }
    .switch-close,.switch2-close{
      width:22px;
      height:50px;
      position: absolute;
      top:3%;
      z-index: 990;
      cursor: pointer;
      right:0px;
      background: url("../../assets/images/switch-open.png") no-repeat;
    }
    .switch2-close{
      top:10%;
    }
    .right-con{
      width:98%;
      position: absolute;
      bottom:0px;
      left:2%;
      z-index:990;
      height:97%;
      overflow-y: auto;
    }
    .right-con .right-con-l{
      width:80%;
      height:100%;
      background: #fff;
      overflow-y: auto;
    }
    .right-con .right-con-r{
      width:19%;
      height:100%;
      margin-left:1%;
      background: #fff;
      position: relative;
      overflow-y: auto;
    }
    .right-con .right-con-r div{
      width:3px;
      height:425px;
      background: #bbb;
      margin:30px 0 10px 30px;
      float:left;

    }
    .right-con .right-con-r ul{
      width:80%;
      margin:20px 0 10px 0px;
      float: left;
      position: absolute;
      left:27px;
    }
    .right-con .right-con-r ul li{
      width:72%;
      height:30px;
      line-height:30px;
      padding:0 14%;
      cursor: pointer;
      background: url("../../assets/images/jian.png") no-repeat;
      background-position:0px -85px;
    }
    .right-con .right-con-r ul .light{
      color:#67649F;
      font-size:16px;
      background: url("../../assets/images/icon_2.png") no-repeat;
      background-size:11px 11px;
      background-position:0px 9px;
    }
    .page-box{
    /*  position: fixed;
      bottom:0px;*/
    }
    .editInfo{
      position: fixed;
      top:118px;
      right:0px;
      z-index:990;
      background: #fff;
      width:300px;
      height:320px;
    }
    .editInfo .editInfo-tit{
      width:100%;
      height:30px;
      line-height: 30px;
      border-bottom:1px solid #ccc;
      color:#222;
      font-weight: bold;
    }
    .editInfo .editInfo-tit span,
    .editInfo .editInfo-tit label
    {
     padding:0 10px;
     cursor: pointer;
    }
    .editInfo .editInfo-con{
      width:280px;
      padding:0 10px;
    }

    .editInfo .editInfo-con input{
      height:20px;
      padding:2px;
      width:275px;
      font-size:12px;
    }
    .editInfo .editInfo-con textarea{
      width:275px;
      padding:2px;
      height:120px;
      font-size:12px;
      border:1px solid #bbb;
      border-radius: 4px;
      overflow: auto;
    }
    .editInfo .editInfo-con .btnBox{
      height:40px;
      line-height: 40px;
      text-align: center;
      padding:10px;
    }
    .editInfo .editInfo-con button{
      border:none;
      width:60px;
      height: 30px;
      line-height:30px;
      cursor: pointer;
    }
    .editInfo .editInfo-con .landName{
      width:100%;
      height:40px;
      overflow:auto;
      font-size:12px;
      border:1px solid #ccc;
    }
    .editInfo .editInfo-con .remark{
      width:100%;
      height:120px;
      padding: 2px;
      overflow: auto;
      font-size:12px;
      border:1px solid #ccc;

    }
}
</style>
