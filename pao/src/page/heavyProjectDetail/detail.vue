<template>
  <div id="project-manage" class="view">
    <span class="drawBtn finish" @click="saveDraw" v-show="drawBtn">完成绘制</span>
    <span class="drawBtn cancel" @click="cancelDraw" v-show="drawBtn">放弃</span>
    <button class="positionBtn" @click="setPosition" v-show="positionBtn">使用当前位置</button>
    <div id="map" @click="closeProject"></div>
    <div class="right-con">
      <div class="right-con-l fl">
        <div style="width:100%">
          <com-project @drawProject="drawProject" @setMark="setMark" @cancelThePage="cancelThePage" :childParm="childParm" ref="run" v-if="projectTag==1" ></com-project>
          <pro-analysis v-else-if="projectTag==2" ref="run" :childParm="childParm" @cancelThePage="cancelThePage">
          </pro-analysis>
          <product-client v-else-if="projectTag==3" ref="run" :childParm="childParm" @cancelThePage="cancelThePage">
          </product-client>
          <product-info v-else-if="projectTag==4" ref="run" :childParm="childParm" @cancelThePage="cancelThePage">
          </product-info>
          <business-info v-else-if="projectTag==5" ref="run" :childParm="childParm" @cancelThePage="cancelThePage"></business-info>
          <economic-indicator v-else-if="projectTag==6" ref="run" :childParm="childParm"  @cancelThePage="cancelThePage"></economic-indicator>
          <investment-advice v-else-if="projectTag==7" ref="run" :childParm="childParm" @cancelThePage="cancelThePage"></investment-advice>
          <video-info v-else-if="projectTag==8" ref="run" :childParm="childParm" @cancelThePage="cancelThePage"></video-info>
          <cost-operation v-else-if="projectTag==9" ref="run" :childParm="childParm" @cancelThePage="cancelThePage"></cost-operation>
          <pro-operat v-else-if="projectTag==10" ref="run" :childParm="childParm" @cancelThePage="cancelThePage"></pro-operat>
          <deal-info v-else-if="projectTag==11" ref="run" :childParm="childParm" @cancelThePage="cancelThePage"></deal-info>
          <approval-info v-else-if="projectTag==12" ref="run" :childParm="childParm" @cancelThePage="cancelThePage"></approval-info>
          <investment-commission v-else-if="projectTag==13" :childParm="childParm" ref="run" @cancelThePage="cancelThePage"></investment-commission>
          <annex-info v-else-if="projectTag==14" ref="run" :childParm="childParm" @cancelThePage="cancelThePage"></annex-info>
        </div>
      </div>
      <div class="right-con-r fl">
        <div></div>
        <ul>
          <li   v-for="(v,index) in infoMod" :class="{'light':index==(projectTag-1)}"  @click="changeMod(index,v.key)">{{v.value}}</li>
          
        </ul>
      </div>
    </div>
    <div :class="{'switch':isSwitch,'switch-close':isSwitchClose}" @click="isShowProjectList"></div>
    <div :class="{'switch2':isSwitch2,'switch2-close':isSwitchClose2}" @click="isShowProject"></div>
    <div class="editInfo add" v-if="editInfoDialog==1">
      <div class="editInfo-tit">
        <span>编辑地块信息</span>
        <label class="fr" @click="closeLand(landNum)">x</label>
      </div>
      <div class="editInfo-con">
        <!-- <p>地块编号：</p>
        <input type="text" name="" placeholder="请输入地块编号" maxlength="64" v-model="landCode"> -->
        <p>地块名称：</p>
        <input type="text" name="" placeholder="请输入地块名称" maxlength="64" v-model="landName">
        <p>地块描述：</p>
        <textarea placeholder="请输入地块描述140字以内" maxlength="140" v-model="remark"></textarea>
        <div class="btnBox">
          <button @click="saveDrawInfo(landNum)">保存</button>
         <!--  <button @click="cancelDrawInfo()">取消</button> -->
          <button  @click="delDrawInfo(landNum)">删除</button>
        </div>
      </div>
    </div>
    <div class="editInfo detail" v-else-if="editInfoDialog==2">
      <div class="editInfo-tit">
        <span>查看地块信息</span>
        <label class="fr" @click="closeLand(landNum)">x</label>
      </div>
      <div class="editInfo-con">
        <!-- <p>地块编号：</p>
        <input type="text" name="" placeholder="请输入地块编号" maxlength="64" v-model="landCode"> -->
        <p>地块名称：</p>
        <div class="landName">{{landName}}</div>
        <p>地块描述：</p>
        <div class="remark">{{remark}}</div>
        <div class="btnBox">
          <button @click="editDrawInfo(landNum)">编辑</button>
          <button @click="delDrawInfo(landNum)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import comProject from '../../page/comProject';
import productInfo from '../../page/productInfoMod/productInfo';
//项目成本
import costOperation from '../../page/costOperationMod/costOperation'
//投资建议
import investmentAdvice from '../../page/investmentAdviceMod/investmentAdvice';
//运营节点
import proOperat from '../../page/proOperat/proOperatIndex';
//商业信息
import businessInfo from '../../page/businessInfoMod/businessInfo';
//成交信息
import dealInfo from '../../page/dealInfoMod/dealInfo';
//客户产品定位
import productClient from '../../page/productClient/clientFixed';
//立项审批
import approvalInfo from '../../page/approvalMod/approval'
//投委审批
import investmentCommission from '../../page/InvestmentCommissionApprovalMod/InvestmentCommissionApproval'
//项目信息
import proAnalysis from '../../page/proAnalysis/proAnalysisIndex'
//经济指标
import economicIndicator from '../../page/economicIndicatorMod/economicIndicator'
//视频上传
import videoInfo from '../../page/videoMod/video'
//意见讨论
// import commentDiscuss from '../../page/commentDiscussMod/commentDiscuss'
//附件
import annexInfo from '../../page/annexMod/annex'

export default {
  components: {
    comProject:comProject,
    productInfo:productInfo,
    costOperation:costOperation,
    investmentAdvice:investmentAdvice,
    proOperat:proOperat,
    businessInfo:businessInfo,
    dealInfo:dealInfo,
    productClient:productClient,
    approvalInfo:approvalInfo,
    investmentCommission:investmentCommission,
    proAnalysis:proAnalysis,
    economicIndicator:economicIndicator,
    videoInfo:videoInfo,
    annexInfo:annexInfo,
  },
  data(){
    return{
      searchKey:'',
      addProjectFlag:1,    //添加按钮
      projectFlag:'',     //竞品和项目类目0：竞品1:项目 
      cityList: JSON.parse(localStorage.cityList),
      showCity:false,
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
      addBoxFlag:false,
      list:true,
      rightCon:false,
      projectTag:'',          //项目的需要添加的模块的编码默认为项目概览
      isSwitch:true,
      isSwitchClose:false,
      isSwitch2:false,
      isSwitchClose2:false,
      drawBtn:false,
      positionBtn:false,
      editInfoDialog:0,         //勾边信息框
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
        {"key":"summary","value":"项目概览"},
        {"key":"proProjectInfo","value":"项目基本信息"},
        {"key":"proProductOrientation","value":"产品客户定位"},
        {"key":"proProductInfo","value":"产品信息"},
        {"key":"proBusinessInfo","value":"商务信息"},
        {"key":"proEconomyTarget","value":"经济指标"},
        {"key":"proInvestmentAdvice","value":"投资建议"},
        {"key":"regionGeneralVideo","value":"地总视频及反馈"},
        {"key":"proCost","value":"项目成本"},
        {"key":"operateNode","value":"运营节点"},
        {"key":"doneMessageEntry","value":"成交信息"},
        // {"key":"commentDiscuss","value":"意见讨论"},
        {"key":"approvalProject","value":"立项审批"},
        {"key":"approvalInvest","value":"投委审批"},
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
      if(!this.changeModFlag){
      }else{
        //获取当前信息填写模块的权限
        var modAuth=2;
        this.projectTag=(num+1);
        var id=this.projectId;
        //设置子组件需要的参数
        this.childParm={
          "id":id,
          "projectName":this.projectName,
          "modAuth":modAuth,
          "cityCode":this.cityCode
        };
        clearTimeout(timer);
        var timer=setTimeout(function(){
          that.$refs.run.run("getId",id,modAuth);
        },10);
      }
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
      this.drawBtn=false;                  //隐藏取消编辑按钮
      this.deletePolygon();                //隐藏绘图工具栏并且删除绘图
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
      this.$refs.run.run("getPosition",this.positionArr);
    },
    //绘图
    drawProject(points,landEdges){
      var that=this;
      this.addProjectFlag=0;
      that.isShowProject();           //收起内容区
      that.positionBtn=false;
      that.drawBtn=true;              //显示取消编辑按钮
      this.points='';
      this.polygons=[];
      this.overlays=[];
      this.landEdges=[];
      this.overlaysIndex=0;
     /******************调用绘制工具**************/
        let overlaycomplete = function(e){
          //初始化输入框为空
          that.landName="";
          that.remark="";
          that.editInfoTag="";
          that.landNum="";

          /********************绘制结束后的逻辑*****************************/
          //绘制结束后其他逻辑
          e.overlay.enableEditing();     //地块可以编辑
          that.editInfoDialog=1;         //展示编辑信息框
          that.overlays.push(e.overlay);     //地块放在一个全局的集合
          that.overlaysIndex+=1;

          //删除图形绘制工具栏
          that.map.removeControl(that.drawingManager._drawingTool);
          //隐藏取消编辑按钮
          that.drawBtn=false;
        };
        that.drawingManager=new BMapLib.DrawingManager(this.map, {
          isOpen:false,
          enableDrawingTool:true,
          drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            offset: new BMap.Size(200,5),
            drawingModes:[
              // BMAP_DRAWING_POLYLINE,
              BMAP_DRAWING_POLYGON,
              // BMAP_DRAWING_RECTANGLE
            ],
          },
          polygonOptions: that.styleOptions, //多边形的样式
        });
        that.drawingManager.addEventListener('overlaycomplete',overlaycomplete);
      if(points){
        var arr = points.split("|");
        for (let i = 0; i<arr.length; i++) {
          var t = arr[i].split(";");
          var strarr = [];
          for (let j = 0; j < (t.length-1); j++) {
            var xy = t[j].split(",");
            strarr.push( new BMap.Point(xy[0],xy[1]));
          }
          //创建多边形
          var polygon = new BMap.Polygon(strarr, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
          //编辑获取多边形然后储存到编辑的集合
          // this.polygons.push(polygon);
          //增加多边形到地图
          this.map.addOverlay(polygon);
          var obj={};
          if(landEdges.landId){
            obj.id=landEdges[i].landId;
          }else{
            obj.id=0;
          }
          obj.landName=landEdges[i].landName
          obj.remark=landEdges[i].remark;
          obj.landRect=landEdges[i].landRect;
          this.landEdges.push(obj);
          this.overlays.push(polygon);
          //添加点击事件
          polygon.addEventListener("click",function(){
            if(that.landEditFlag==1){
              alert("请保存编辑的地块！");
              return false;
            }
            var overlaysLen=that.overlays.length;
            var landEdgesLen=that.landEdges.length;
            //判断是否有新增的地块
            if(overlaysLen>landEdgesLen){
              alert("请保存当前勾绘的地块！");
              return false;
            }
            that.landName=that.landEdges[i].landName;
            that.remark=that.landEdges[i].remark;
            that.editInfoDialog=2;
            that.landNum=i;

          });
        }
        this.overlaysIndex=(arr.length);
      }
    },
    closeLand(landNum){
      var overlaysLen=this.overlays.length;
      var landEdgesLen=this.landEdges.length;
      if(overlaysLen>landEdgesLen){
        alert("请保存当前勾绘的地块！");
        return false;
      }else{
        this.landEditFlag=0;
        this.overlays[landNum].disableEditing();  //改变当前地块的编辑状态
        this.editInfoDialog=0;
         //添加图形绘制工具栏
        this.map.addControl(this.drawingManager._drawingTool);
        //显示取消编辑按钮
        this.drawBtn=true;
      }

    },
    //保存绘制地块的信息
    saveDrawInfo(landNum){
      var that=this;
      that.landEditFlag=0;
      that.landEditNum='';
      if(typeof(landNum)!="number"){
        var points="";
        var num=(this.overlaysIndex-1);
        for (let j=0; j<this.overlays[num]["po"].length;j++) {
          var x=this.overlays[num]["po"][j]["lng"];
          var y=this.overlays[num]["po"][j]["lat"];
          points+=x+","+y+";"
        }
        var obj={};
        obj.id=0
        obj.landName=this.landName
        obj.remark=this.remark;
        obj.landRect=points;
        this.landEdges.push(obj);
        //当前地块状态变为不可编辑
        this.overlays[num].disableEditing();
        //添加图形绘制工具栏
        this.map.addControl(this.drawingManager._drawingTool);
        //显示取消编辑按钮
        this.drawBtn=true;
        //切换到编辑对话框
        this.editInfoDialog=2;
        //保存成功后编辑按钮获取当前地块的num
        that.landNum=num;
        //添加点击事件
        this.overlays[num].addEventListener("click",function(){
          if(that.landEditFlag==1){
            alert("请保存编辑的地块！");
            return false;
          }
          var overlaysLen=that.overlays.length;
          var landEdgesLen=that.landEdges.length;
          if(overlaysLen>landEdgesLen){
            alert("请保存当前勾绘的地块！");
            return false;
          }
          that.landName=that.landEdges[num].landName;
          that.remark=that.landEdges[num].remark;
          that.landNum=num;
          that.editInfoDialog=2;
        });
      }else{
        //已经保存过的地块进行修改
        var points='';
        for (let j=0; j<this.overlays[landNum]["po"].length;j++) {
          var x=this.overlays[landNum]["po"][j]["lng"];
          var y=this.overlays[landNum]["po"][j]["lat"];
          points+=x+","+y+";"
        }
        this.landEdges[landNum]["landName"]=this.landName;
        this.landEdges[landNum]["remark"]=this.remark;
        this.landEdges[landNum]["landRect"]=points;
        //当前地块状态变为不可编辑
        this.overlays[landNum].disableEditing();
        //添加图形绘制工具栏
        this.map.addControl(this.drawingManager._drawingTool);
        //显示取消编辑按钮
        this.drawBtn=true;
        //切换到编辑对话框
        this.editInfoDialog=2;
        this.overlays[landNum].addEventListener("click",function(){
          var overlaysLen=that.overlays.length;
          var landEdgesLen=that.landEdges.length;
          if(overlaysLen>landEdgesLen){
            alert("请保存当前勾绘的地块！");
            return false;
          }
          that.landName=that.landEdges[landNum].landName;
          that.remark=that.landEdges[landNum].remark;
        });
      }
    },
    /*
    **编辑绘制地块的信息
    **landNum:当前选中的板块编号
    */
    editDrawInfo(landNum){
      //移除图形绘制工具栏
      this.map.removeControl(this.drawingManager._drawingTool);
      //隐藏取消编辑按钮
      this.drawBtn=false;
      this.landNum=landNum;
      //当前地块可以编辑
      this.overlays[landNum].enableEditing();     //地块可以编辑
      //切换到编辑信息的对话框
      this.editInfoDialog=1;
      this.landEditFlag=1;                
      this.landEditNum=landName;          //地块可以编辑下标
    },
    /*
    **删除绘制地块的信息
    **landNum:当前选中的板块编号
    */
    delDrawInfo(landNum){
      var that=this;
      that.w=0;
      if(typeof(landNum)=="number"){
        if (confirm("你确认删除吗？")==true){
          this.map.removeOverlay(this.overlays[landNum]);
          this.overlays[landNum]="";
          this.landEdges[landNum]="";
          //显示取消编辑按钮
          this.drawBtn=true;
          //添加图形绘制工具栏
          this.map.addControl(this.drawingManager._drawingTool);
          //切换到查看信息的对话框
          this.editInfoDialog=0;
        }    
      }else{
        //没有添加到地块集合中的删除
        if (confirm("你确认删除吗？")==true){
          this.overlaysIndex-=1;
          this.map.removeOverlay(this.overlays[this.overlaysIndex]);
          this.overlays=this.overlays.slice(0,this.overlaysIndex);
          //显示取消编辑按钮
          this.drawBtn=true;
          //添加图形绘制工具栏
          this.map.addControl(this.drawingManager._drawingTool);
          //切换到查看信息的对话框
          this.editInfoDialog=0;
        } 
      }
      
    },
    saveDraw(){
      this.drawBtn=false;           //隐藏取消编辑按钮
      this.isShowProject();         //展示内容区
      //删除overlays多边形
      var points="";
      for(let i=0;i<this.overlays.length;i++){
        if(this.overlays[i].po!==undefined){
          this.map.removeOverlay(this.overlays[i]);
          points+="|";
          for (let j=0; j<this.overlays[i]["po"].length;j++) {
            var x=this.overlays[i]["po"][j]["lng"];
            var y=this.overlays[i]["po"][j]["lat"];
            points+=x+","+y+";"
          }
        }
      }
      //删除polygons多边形
      for(let i=0;i<this.polygons.length;i++){
          this.map.removeOverlay(this.polygons[i]);
          points+="|";
          for (let j=0; j<this.polygons[i]["po"].length;j++) {
            var x=this.polygons[i]["po"][j]["lng"];
            var y=this.polygons[i]["po"][j]["lat"];
            points+=x+","+y+";"
          }
      }
      //多边形点拼接为字符
      var landEdges=this.landEdges;
      points=points.slice("1");
      this.$refs.run.run("getPoints",points,landEdges);
      this.editInfoDialog=0;        //关闭地图勾边信息框
      //关闭图形绘制工具栏
      this.map.removeControl(this.drawingManager._drawingTool);
    },
    editDraw(){
      if(this.overlays.length>=1){
        for(let i=0;i<this.overlays.length;i++){
          if(this.overlays[i].po!==undefined){
            this.overlays[i].enableEditing();
          }
        }
      }
      if(this.polygons.length>=1){
        for(let i=0;i<this.polygons.length;i++){
          this.polygons[i].enableEditing();
        }
      }
    },
    cancelDraw(){
      if(confirm("你确认放弃吗？")==true){
        this.drawBtn=false;           //隐藏取消编辑按钮
        this.editInfoDialog=0;        //关闭地图勾边信息框
        this.isShowProject();         //展示内容区
        //删除图形绘制工具栏
        this.map.removeControl(this.drawingManager._drawingTool);
        //设置多边形不可以编辑并且隐藏
        for(let i=0;i<this.overlays.length;i++){
          if(this.overlays[i].po!==undefined){
            this.map.removeOverlay(this.overlays[i]);
          }
        }
        //设置编辑出来的多边形不可以编辑并且隐藏
        // for(let i=0;i<this.polygons.length;i++){
        //     this.map.removeOverlay(this.polygons[i]);
        // }
      }
    },
    //删除多边形的覆盖物
    deletePolygon(){
      for(let i=0;i<this.overlays.length;i++){
        if(this.overlays[i].po!==undefined){
          this.map.removeOverlay(this.overlays[i]);
        }
      }
      //删除polygons多边形
      for(let i=0;i<this.polygons.length;i++){
          this.map.removeOverlay(this.polygons[i]);
      }
      this.drawBtn=false;           //隐藏取消编辑按钮
      //删除图形绘制工具栏
      this.map.removeControl(this.drawingManager._drawingTool);
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
    closeProject(){
      this.addBoxFlag=false;
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
      this.deletePolygon();       //删除地图上的所有多边形
      if(operation==2 || operation=="2"){
        var cityCode=this.cityCode;
        var x=this.lng;
        var y=this.lat;
        var capital=this.capital;
        this.getProjectList(cityCode,x,y,capital);   //刷新项目列表
      }
    },
    showAddBox(){
      this.addBoxFlag=!this.addBoxFlag;
      this.deleteMarkerTool();
    },
    /***
      ** id:项目id
      ** projectName:项目名称
      ** compareTarget:项目标签（0:项目 1：竞品 2：项目和竞品）
    **/
    editProject (id,projectName,compareTarget) {
      var that=this
      this.projectName=projectName;
      this.projectId=id;
      var compareTarget=parseInt(compareTarget);
      //跳转到项目概览
      if(compareTarget==0 || compareTarget==2){
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
          this.changeMod(0,"summary");
      }
    },
    KeyDown(e){

      if (e.keyCode == 13){
        this.searchProject(this.searchKey);
      }
    },
    //获取项目权限
    getMenuAuth(projectId){
      var that=this;
      this.$http.post('/longcity/services/v1/project/getMenuAuth',{
          "projectId":projectId
        })
        .then(
          success=>{
            if(success.data.code==200 || success.data.code=="200"){
              this.menuAuthObj=success.data.result;
              this.loading.close();
              var modAuth=that.checkAuth(that.menuAuthObj,"summary");
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
                this.changeMod(0,"summary");
              }
            }
          },
        );
    },
    //项目列表的开关事件
    isShowProjectList() {
      this.list= !this.list;
      this.isSwitch=!this.isSwitch;
      this.isSwitchClose=!this.isSwitchClose;
      this.addBoxFlag=false;    //关闭添加项目和竞品的选择框
    },
    //项目编辑页的开关事件
    isShowProject () {
      // this.list=true;
      this.rightCon=!this.rightCon;
      this.isSwitch=false;
      this.isSwitchClose=false;
      this.isSwitch2=!this.isSwitch2;
      this.isSwitchClose2=!this.isSwitchClose2;
      this.addBoxFlag=false;    //关闭添加项目和竞品的选择框
      this.deleteMarkerTool();
    },
    //切换城市
    changeCity(cityCode){
      var x,y,capital;
      for(var i=0;i<this.cityList.length;i++){
        if(this.cityList[i]["cityCode"]==cityCode){
          this.lng=x=this.cityList[i]["longitude"];
          this.lat=y=this.cityList[i]["latitude"];
          this.capital=capital=parseInt(this.cityList[i]["capital"]);
          this.cityCode=cityCode;
          this.createMap(x,y,capital);
        }
      }
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
    }
  },
  mounted () {
    this.changeCity(510100);
    this.editProject(2821,"wuyj成都竞品pc成员无zengdp",0); 
  }
}
</script>
<style scoped>
#project-manage{
  position: relative;
}
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
#project-manage .right-list{
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
#project-manage .right-list .search{
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
#project-manage .right-list .search input{
  width:270px;
  height:30px;
  padding:2px;
  float: left;
}
#project-manage .right-list .search .searchBtn{
  width:70px;
  height:35px;
  line-height:35px;
  border:none;
  border-radius:3px;
  cursor: pointer;
  margin-left:10px;
  float: left;
}
#project-manage .right-list ul{
  margin-top:50px;
}
#project-manage .right-list li{
  height:80px;
  border-bottom: 1px solid #c3c3c3;
  cursor: pointer;
  padding:0 5px;
  font-size: #444444;
}
#project-manage .right-list li:hover{
  background: #EEEEEE;
}
#project-manage .right-list li label{
    display: inline-block;
    width:18px;
    height:25px;
    text-align: center;
    line-height: 20px;
    color: #fff;
    margin-top:10px;
    background: url("../../assets/images/position.png") no-repeat;
}
#project-manage .right-list li p{
  clear: both;
  max-height:50px;
  line-height:25px;
  width:100%;
  overflow: hidden;
}
#project-manage .right-list li span{
  height:20px;
  text-align: center;
  line-height:20px;
  border:1px solid #3185E6;
  border-radius:3px;
  color:#3185E6;
  padding:0 3px;
}
#project-manage .right-list li span.pro1{
  color:#fff;
  width:40px;
  background: #398DF3;
  border-color:#398DF3;
  margin-right:5px;
}
#project-manage .right-list li span.pro2{
  color:#fff;
  width: 40px;
  background: #62BEFF;
  border-color:#62BEFF;
}
#project-manage .right-list li img{
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
  height:400px;
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
#project-manage .editInfo{
  position: fixed;
  top:118px;
  right:0px;
  z-index:990;
  background: #fff;
  width:300px;
  height:320px;
}
#project-manage .editInfo .editInfo-tit{
  width:100%;
  height:30px;
  line-height: 30px;
  border-bottom:1px solid #ccc;
  color:#222;
  font-weight: bold;
}
#project-manage .editInfo .editInfo-tit span,
#project-manage .editInfo .editInfo-tit label
{
 padding:0 10px;
 cursor: pointer;
}
#project-manage .editInfo .editInfo-con{
  width:280px;
  padding:0 10px;
}

#project-manage .editInfo .editInfo-con input{
  height:20px;
  padding:2px;
  width:275px;
  font-size:12px;
}
#project-manage .editInfo .editInfo-con textarea{
  width:275px;
  padding:2px;
  height:120px;
  font-size:12px;
  border:1px solid #bbb;
  border-radius: 4px;
  overflow: auto;
}
#project-manage .editInfo .editInfo-con .btnBox{
  height:40px;
  line-height: 40px;
  text-align: center;
  padding:10px;
}
#project-manage .editInfo .editInfo-con button{
  border:none;
  width:60px;
  height: 30px;
  line-height:30px;
  cursor: pointer;
}
#project-manage .editInfo .editInfo-con .landName{
  width:100%;
  height:40px;
  overflow:auto;
  font-size:12px;
  border:1px solid #ccc;
}
#project-manage .editInfo .editInfo-con .remark{
  width:100%;
  height:120px;
  padding: 2px;
  overflow: auto;
  font-size:12px;
  border:1px solid #ccc;
}
</style>
