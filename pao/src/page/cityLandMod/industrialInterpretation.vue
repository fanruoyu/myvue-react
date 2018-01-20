<template>
  <!-- 城市演变 -->
  <div id="project-manage" class="view">
    <div class='rich_text_editor' v-show='iseditor'>
      <button class="add_editor" @click="add_editor_btn">保存</button>
      <div class="editor_title" ref="ed_tit" contenteditable></div>
      <div class='editor_content'></div>
    </div>
    <ul class="refer_to">
      <li>
        <span class="cybk"></span> 产业板块</li>
      <li>
        <span class="cyy"></span> 产业园</li>
      <li>
        <span class="zdqy"></span> 重点企业</li>
    </ul>
    <div id="map"></div>
    <div class="city">
      <div class="editor_btn" @click="add_editor">详细信息</div>
      <el-select v-model="value" filterable size="3" placeholder="" @change="changeCity(value)">
        <el-option v-for="item in cityList" :key="item.cityCode" :label="item.cityName" :value="item.cityCode">
        </el-option>
      </el-select>
    </div>
    <div class="right-list" v-show="list">
      <div class="data-layer" v-show="showIndustryList">数据图层</div>
      <div class="list-two" v-show="!showIndustryList">
        <el-button type="text" icon="arrow-left " @click="showIndustryList = true; whichList = []; rightListLable='';handlerCheckBox(checkList)">返回</el-button>
        <el-button type="text" @click="addForm(rightListLable)">新增</el-button>
        <span>{{rightListLable}}</span>
      </div>
      <div class="search" v-show="!showIndustryList">
        <input type="text" v-model="searchKey" @keydown="KeyDown">
        <button class="searchBtn" @click="searchIndustryList(searchKey)">搜索</button>
      </div>

      <el-checkbox-group v-model="checkList" v-show="showIndustryList">
        <ul style="border-top: 0px;padding-bottom:0px">
          <li>
            <el-checkbox label="重点企业"></el-checkbox>
            <el-button type="text" @click="showIndustryList = false; handelListClick('重点企业')">明细</el-button>
          </li>
        </ul>
        <ul style="border-top: 0px;padding-bottom:0px">
          <li>
            <el-checkbox label="产业园"></el-checkbox>
            <el-button type="text" @click="showIndustryList = false; handelListClick('产业园')">明细</el-button>
          </li>
        </ul>
        <ul style="border-top: 0px;padding-bottom:0px">
          <li>
            <el-checkbox label="产业板块"></el-checkbox>
            <el-button type="text" @click="showIndustryList = false; handelListClick('产业板块')">明细</el-button>
          </li>
        </ul>
      </el-checkbox-group>
      <div class="right-list-industry">
        <div class="list">
          <components is="list" :size='size' :tableData="whichList" v-show="!showIndustryList" :cityCode="cityCode" @edit="editFormChild" :label="rightListLable" @overlays="setOverlays" @finish="finishEdit" :map="map" :polygon="polygon_case_collector" :marker='marker_collector'>
          </components>
        </div>
      </div>
    </div>
    <components :is="whichEdit" :map="map" :item="itemEdit" @finish="finishEdit" :cityCode="cityCode" :polyline='polyline' :obj='obj'></components>
    <div :class="{'switch':isSwitch,'switch-close':isSwitchClose}" @click="isShowProjectList"></div>
    <div :class="{'switch2':isSwitch2,'switch2-close':isSwitchClose2}" @click="isShowProject"></div>
  </div>
</template>
<script>
//提示用户是否删除数据的遮罩层;
import list from './child/right_list.vue';
import qyEdit from './child/qyEdit.vue';
import bkEdit from './child/bkEdit.vue';
import cyyEdit from './child/cyyEdit.vue'
//富文本编辑器;
import E from 'wangeditor';

export default {
  name: 'industryManage',
  components: {
    list: list,
    qyEdit: qyEdit,
    bkEdit: bkEdit,
    cyyEdit: cyyEdit
  },
  data() {
    return {
      size: 20,
      polyline: '',
      editor: null,
      iseditor: false,
      searchKey: '',
      obj:{},
      cityList: JSON.parse(localStorage.cityList),
      lng: '',               //城市的经度
      lat: '',               //城市的纬度
      capital: '',           //是否省会直辖市    1为省会直辖市
      cityCode: '',          //城市编码
      value: '',
      map: '',
      polygon_case_collector: {},
      marker_collector: {},
      drawingManager: null,   //声明绘图工具
      list: '',
      isSwitch: true,
      isSwitchClose: false,
      isSwitch2: false,
      isSwitchClose2: false,
      whichEdit: '',
      drawingMode: [],
      drawingModes: [
        BMAP_DRAWING_POLYGON,
        BMAP_DRAWING_MARKER
      ],
      itemEdit: '',
      whichList: [],
      allList: [],
      rightListLable: '', // 子组件标志位
      bkList: [],   // 板块列表
      bkCurrentList: [],   // 板块当前列表
      showBkList: false,
      cyyList: [],  // 产业园列表
      cyyCurrentList: [],   // 产业园当前列表
      showCyyList: false,
      zdqyList: [], // 重点企业列表
      zdqyCurrentList: [], // 重点企业当前列表
      showZdqyList: false,
      industryList: [], // 产业列表
      showIndustryList: true,
      checkList: [],     // 复选框
      styleOptions: {       //绘制图形样式配置
        strokeColor: "red",  //边线颜色。
        fillColor: "skyblue",   //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 2,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
      },
      loading: '',                  //load实例
    }
  },
  props:['isleft'],
  watch: {
    isleft(n,o){
      if(n){
        document.querySelector('.refer_to').style.left='19%';
      }else{
        document.querySelector('.refer_to').style.left='1%';
      }
    },
    checkList: {
      handler: function(val, oldVal) {
        this.map.clearOverlays();
        this.handlerCheckBox(val)
      },
      deep: true
    },
    allList: {
      handler: function(val, oldVal) {
        this.handelListClick(this.rightListLable)
      },
      deep: true
    }

  },
  methods: {
    //打开富文本编辑器
    add_editor() {
      this.iseditor = true;
      this.list = false;
      this.isSwitchClose = true;
      this.isSwitch2 = true;
    },
    //富文本编辑器的保存按钮
    add_editor_btn() {
      this.isSwitch = true;
      this.isSwitchClose = false;
      this.iseditor = false;
      this.list = true;
      this.isSwitch2 = false;
      let that = this;
      this.$http.post('/longcity/services/v1/city/saveCityIndustry', {
        industryTitle: this.$refs.ed_tit.innerHTML,
        code: this.cityCode,
        industryDetails: this.editor.txt.html()
      })
        .then(
        success => {
          if (success.data.code == 200 || success.data.code == '200') {
            this.$message({
              showClose: true,
              message: '保存成功！',
              type: 'success'
            });
            // this.$notify({
            //   title: '成功',
            //   message: success.data.message,
            //   duration: 3000,
            //   type: 'success'
            // });
          }
        }
        )
    },
    //关闭富文本的编辑器，并打开列表
    isShowProject() {
      this.isSwitch = true;
      this.isSwitchClose = false;
      this.iseditor = false;
      this.list = true;
      this.isSwitch2 = false;
    },
    //项目列表的开关事件
    isShowProjectList() {
      this.list = !this.list;
      this.isSwitch = !this.isSwitch;
      this.isSwitchClose = !this.isSwitchClose;
    },
    // 根据checkbox的值获取列表
    handlerCheckBox(val) {
      this.map.clearOverlays();
      if (val.indexOf('产业板块') > -1) {
        this.addPolygon(this.bkList, 0, '#D5E1EC')
      }
      if (val.indexOf('产业园') > -1) {
        this.addPolygon(this.cyyList, 0, '#AEB8E1')
      }
      if (val.indexOf('重点企业') > -1) {
        this.addMarkers(this.zdqyList)
      }
    },
    // 获取点击的标签
    handelListClick(val) {
      this.map.clearOverlays();
      switch (val) {
        case '重点企业':
          this.rightListLable = '重点企业'
          this.whichList = this.zdqyList
          this.drawingMode[0] = this.drawingModes[1]
          break;
        case '产业园':
          this.rightListLable = '产业园'
          this.whichList = this.cyyList
          this.drawingMode[0] = this.drawingModes[0]
          break;
        case '产业板块':
          this.rightListLable = '产业板块'
          this.whichList = this.bkList
          this.drawingMode[0] = this.drawingModes[0]
          break;
        default:
          this.whichList = [];
          this.allList.forEach((item, index) => {
            switch (item.type) {
              case 1:
                this.checkList.splice(0, 1, '产业板块');
                item.label = item.name
                this.addPolygon(this.bkList,0,'#D5E1EC')
                // this.bkList.push(item)
                break;
              case 2:
                this.checkList.splice(1, 1, '产业园');
                item.label = item.name
                this.addPolygon(this.cyyList,0,'#AEB8E1')
                // this.cyyList.push(item)
                break;
              case 3:
                this.checkList.splice(2, 1, '重点企业');
                item.label = item.name
                this.addMarkers(this.zdqyList)
                // this.zdqyList.push(item)
            }
          })
      }
    },
    //画图
    draw() {
      var that = this;
      // this.map.setDefaultCursor("crosshair");  
      that.drawingManager = new BMapLib.DrawingManager(that.map, {
        isOpen: false,
        enableDrawingTool: true,
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT,
          offset: new BMap.Size(200, 5),
          drawingModes: this.drawingMode
        },
        polygonOptions: that.styleOptions, //多边形的样式
      });
      var overlaycomplete = function(v) {

        // 1：板块；2：产业园；3：重点企业；-1：全部
        if (that.rightListLable === '产业板块') {
          that.whichEdit = 'bkEdit';
          v.overlay.getPath().forEach((item, index) => {
            if (index == v.overlay.getPath().length - 1) {
              that.polyline += item.lng + ',' + item.lat
            } else {
              that.polyline += item.lng + ',' + item.lat + ';'
            }
          })
          that.itemEdit = ''
          return;
        }
        if (that.rightListLable === '产业园') {
          v.overlay.getPath().forEach((item, index) => {
            if (index == v.overlay.getPath().length - 1) {
              that.polyline += item.lng + ',' + item.lat
            } else {
              that.polyline += item.lng + ',' + item.lat + ';'
            }
          })
          that.whichEdit = 'cyyEdit'
          that.itemEdit = ''
          return;
        }
        if (that.rightListLable === '重点企业') {
          that.polyline = v.overlay.getPosition().lng + ',' + v.overlay.getPosition().lat;
          that.whichEdit = 'qyEdit';
          that.itemEdit = '';
          return;
        }
      };
      this.drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    },
    // 多边形绘制工具
    addPolygon(polygon_list, clear, mycolor) {
      this.polygon_case_collector = {};
      if (clear === 1) {
        this.map.clearOverlays();
      }
      polygon_list.forEach(value => {
        let arr = value.polyline.split(';');
        let color = '#fff';
        arr = arr.map(item => {
          let item_arr = item.split(',');
          return new BMap.Point(item_arr[0], item_arr[1])
        })
        let polygon_case = ''
        if (mycolor) {
          polygon_case = new BMap.Polygon(arr, { strokeColor: mycolor, strokeWeight: 1, strokeOpacity: 0.5, fillColor: mycolor });
          polygon_case.id = value.id
        } else {
          polygon_case = new BMap.Polygon(arr, { strokeColor: 'blue', strokeWeight: 1, strokeOpacity: 0.5, fillColor: mycolor });
          polygon_case.id = value.id
        }
        this.polygon_case_collector['id-' + value.id] = {
          polygon: polygon_case,
          isedit: false
        };
        this.map.addOverlay(polygon_case);
      });
    },
    // 多边形绘制工具
    addMarkers(markers_list, clear) {
      this.marker_collector = {};
      if (clear === 1) {
        this.map.clearOverlays();
      }
      markers_list.forEach(value => {
        let marker = new BMap.Marker(new BMap.Point(value.longitude, value.latitude));
        if (clear === 1) {
          marker.enableDragging();
        }
        this.marker_collector['id-' + value.id] = {
          marker: marker,
          isedit: false
        }
        this.map.addOverlay(marker);
      });

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
    //城市的onchange事件
    changeCity(cityCode) {
      this.searchKey = '';
      this.showIndustryList = true;
      this.rightListLable = '';
      this.isShowProject();
      var x, y, capital;
      for (var i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i]["cityCode"] == cityCode) {
          this.lng = x = this.cityList[i]["longitude"];
          this.lat = y = this.cityList[i]["latitude"];
          this.capital = capital = parseInt(this.cityList[i]["capital"]);
          this.cityCode = cityCode;
          //
          this.getIndustryList();
          //            this.createMap(x,y);
          this.editor_info(cityCode);
          return false;
        }
      }
    },
    KeyDown(e) {
      if (e.keyCode == 13) {
        this.searchProject(this.searchKey);
      }
    },
    // 隐藏dialog
    finishEdit(v) {
      this.whichEdit ='';
      this.polyline = v;   
      this.getIndustryList();
      this.isSwitchClose=false;
      this.isSwitch=true;
      this.list=true;
    },
    // 编辑事件被触发
    editFormChild(v) {
      this.whichEdit = '';
      this.polyline='';
      this.isShowProjectList()
      if (v.type === 3) {
        for(var i in this.marker_collector){
          this.marker_collector[i].marker.setAnimation();
        }
        const markers = [v]
        this.whichEdit = 'qyEdit'
        this.itemEdit = v;
        this.marker_collector['id-' + v.id].marker.enableDragging()
        this.marker_collector['id-' + v.id].marker.setIcon(BMapLib.MarkerTool.SYS_ICONS[2]);
        this.obj=this.marker_collector['id-' + v.id];
        this.obj.type=3;

      } else {
        if (v.type === 2) {
          const polygon = [v]
          this.whichEdit = 'cyyEdit'
          this.itemEdit = v
        } else if (v.type === 1) {
          const polygon = [v]
          this.whichEdit = 'bkEdit'
          this.itemEdit = v
        }        
        this.polygon_case_collector['id-' + v.id].polygon.enableEditing()
        this.polygon_case_collector['id-' + v.id].polygon.setFillOpacity({ opacity: 1 })
        this.obj=this.polygon_case_collector['id-' + v.id];
        this.obj.type=1;
      }
    },
    // 画图事件被触发
    setOverlays(overlaysList) {

      if (overlaysList.length > 0) {
        if (overlaysList[0].type === 1) {
          const polygon = overlaysList
          this.map.clearOverlays()
          this.addPolygon(polygon, 0, '#D5E1EC')
        }
        if (overlaysList[0].type === 2) {
          const polygon = overlaysList
          this.map.clearOverlays()
          this.addPolygon(polygon, 0, '#AEB8E1')
        }
        if (overlaysList[0].type === 3) {
          const markers = overlaysList
          this.map.clearOverlays()
          this.addMarkers(markers)
        }
      }
    },
    // 新增事件被触发
    addForm(v) {
      this.whichEdit = '';
      this.polyline='';
      this.draw();
      this.isShowProjectList()
    },
    //搜索项目
    searchProject(searchKey) {
      this.getIndustryList('', '', searchKey)
    },
    //初始化地图
    createMap(x, y, capital) {
      if (!x || typeof ("x") == "undefined") {
        x = this.cityList[0]["longitude"];
        y = this.cityList[0]["latitude"];
      }
      if (capital == 1 || capital == "1") {
        var level = 12;
      } else {
        var level = 13;
      }
      var page = 1;
      this.map = new BMap.Map('map', { enableMapClick: false });
      let point = new BMap.Point(x, y);
      this.map.centerAndZoom(point, level);
      this.map.enableScrollWheelZoom(true);
    },
    // 初始化富文本编辑器的内容
    editor_info(code) {
      this.$http.get('/longcity/services/v1/city/getCityIndustry?code=' + code).then(
        success => {
          if (success.data.code == 200 || success.data.code == '200') {
            this.$refs.ed_tit.innerHTML = success.data.result.title
            this.editor.txt.html(`<p>${success.data.result.details}</p>`);
          }
        }
      )
    },
    searchIndustryList(val) {
      this.getIndustryList('', '', val)
    },
    /* 初始产业列表（包括产业板块、产业园、重点企业）
        获取类型1：板块；2：产业园；3：重点企业；-1：全部
     */
    getIndustryList(type, cityCode, name) {
      const data = {
        type: type ? type.toString() : '-1',
        cityCode: cityCode ? cityCode.toString() : this.cityCode,
        name: name ? name.toString() : ''
      }
      this.openFullScreen();
      this.bkList = []
      this.cyyList = []
      this.zdqyList = []
      this.$http.post('/longcity/services/v1/industryPlate/industryList', data).then(
        (success) => {
          if (success.data.code == 200 || success.data.code == '200') {
            this.loading.close()
            this.allList = success.data.result
            success.data.result.forEach((item, index) => {
              switch (item.type) {
                case 1:
                  this.checkList.splice(0, 1, '产业板块');
                  item.label = item.name
                  this.bkList.push(item)
                  break;
                case 2:
                  this.checkList.splice(1, 1, '产业园');
                  item.label = item.name
                  this.cyyList.push(item)
                  break;
                case 3:
                  this.checkList.splice(2, 1, '重点企业');
                  item.label = item.name
                  this.zdqyList.push(item)
                  break;
              }
            })
            this.industryList = [{
              label: '重点企业',
              children: this.zdqyList
            }, {
              label: '产业园',
              children: this.cyyList
            }, {
              label: '产业板块',
              children: this.bkList
            }]
            const x = this.lng;
            const y = this.lat;
            const capital = this.capital;
            this.createMap(x, y, capital)
            
            Promise.resolve(success)
          } else {
            Promise.reject(success)
          }
        }
      )
    }
  },
  mounted() {
    this.editor = new E('.editor_content');
    this.editor.customConfig.zIndex = 100;
    this.editor.customConfig.uploadImgServer = 'http://test-longcity.longfor.com:9080/longcity/services/v1/upload/editor';  //允许本地上传
    this.editor.customConfig.uploadFileName = 'uploadFile'
    this.editor.customConfig.uploadImgHeaders = {
      'platform': 'pc',
      'version': 'v1',
      'token': '7e2d0ec641474c1985758959825cc1f9de29b2f02be84d90b9a7dc1edf731eba'
    }
    this.editor.customConfig.customAlert = function(info) {
      console.log("提示:" + info)
    }
    this.editor.customConfig.uploadImgHooks = {
      customInsert: function(insertImg, result, editor) {
        if (result.code == 200 || result.code == '200') {
          insertImg(result.result.data)
        }
      }
    }
    this.editor.create();
    document.querySelector('.w-e-text-container').style = `
        min-height:100%
      `
    var beiJing = false;
    //判断当前城市有没有北京
    for (var i = 0; i < this.cityList.length; i++) {
      if (this.cityList[i]["cityCode"] == "110100") {
        beiJing = true;
        this.value = this.cityCode = this.cityList[i]["cityCode"];
        this.createMap()
        return false;
      }
    }
    if (!beiJing) {
      this.value = this.cityCode = this.cityList[0]["cityCode"];
      this.createMap()
    }

    console.log(document.querySelector('.el-checkbox__inner'))

  }
}
</script>
<style scoped>
/*板块的颜色  */

.cybk {
  background: #D5E1EC;
}

.cyy {
  background: #AEB8E1;
}

.zdqy {
  background:url('../../assets/images/red.png') no-repeat;
  background-size: contain;
}
/*设置单行不换行  */

.text_nobr {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#project-manage {
  position: relative;
}

#map {
  width: 100%;
  height: 100%;
}

.city {
  position: absolute;
  top: 20px;
  left: 22px;
  z-index: 990;
}

.city .el-select,
.el-option {
  height: 30px;
}

.city .editor_btn {
  position: absolute;
  left: 110px;
  top: 0px;
  width: 70px;
  line-height: 36px;
  text-align: center;
  background: #fff;
  cursor: pointer;
  box-shadow: 1px 1px 1px 1px #ccc;
}

.refer_to {
  width: 130px;
  position: fixed;
  left: 19%;
  bottom: 20px;
  z-index: 100;
  background: #fff;
  padding: 5px 0;
}

.refer_to li {
  position: relative;
  line-height: 30px;
  text-indent: 50px;
}

.refer_to li span {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 5px;
  left: 25px;
  border-radius: 2px;
}

.rich_text_editor {
  position: absolute;
  height: 100%;
  width: 850px;
  z-index: 999;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
}

.rich_text_editor .editor_title {
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  background: #fff;
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  padding: 0 100px 0 30px;
  line-height: 50px;
  font-size: 20px;
  border-bottom: 1px solid #ccc;
}

.rich_text_editor .editor_content {
  width: 100%;
  flex: 1;
  max-height: 100%;
  background: #fff;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}

.rich_text_editor .add_editor {
  height: 36px;
  width: 70px;
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  border: 1px solid limegreen;
  color: limegreen;
  border-radius: 5px;
  cursor: pointer;
}

#project-manage .right-list {
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 99;
  width: 400px;
  height: 97%;
  background: #fff;
  overflow: hidden;
  border-color: #ccc;
  -moz-box-shadow: 1px 1px 1px #ccc;
  box-shadow: 1px 1px 1px #ccc;
}
#project-manage .right-list span.el-checkbox__input.is-checked span.el-checkbox__inner{
  background: red;
}
#project-manage .right-list .data-layer {
  line-height: 50px;
  color: #fff;
  background: #67649F;
  text-align: center;
}

#project-manage .right-list .list-two {
  height: 50px;
  line-height: 50px;
  width: 100%;
  text-align: center;
  color: #fff;
  background: #67649F;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 66;
}

#project-manage .right-list .list-two .el-button {
  color: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 12px;
}

#project-manage .right-list .list-two .el-button:nth-child(2) {
  left: auto;
  right: 12px;
}

#project-manage .right-list .search {
  width: 100%;
  height: 50px;
  z-index: 66;
  position: absolute;
  padding: 8px 20px;
  box-sizing: border-box;
  top: 50px;
  left: 0;
  display:flex;
  background: #fff;
}

 #project-manage .right-list .search input {
  flex:1;
  border-radius: 3px 0 0 3px;
}

#project-manage .right-list .search .searchBtn {
  width: 70px;
  background: #67649F;
  color:#fff;
  border: none;
  border-radius: 0 3px 3px 0;
  font-size: 12px;
}

#project-manage .right-list ul {
  border-top: 1px solid rgba(210, 210, 210, 1);
}

#project-manage .right-list li {
  height: 60px;
  border-bottom: 1px solid rgba(210, 210, 210, 1);
  cursor: pointer;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: #444444;
  line-height: 60px;
  position: relative;
}

#project-manage .right-list li:hover {
  background: #EEEEEE;
}

#project-manage .right-list li button {
  position: absolute;
  left: 80%;
  top: 50%;
  transform: translateY(-50%)
}

.switch,
.switch2 {
  width: 22px;
  height: 50px;
  position: absolute;
  top: 3%;
  right: 400px;
  z-index: 900;
  cursor: pointer;
  background: url("../../assets/images/switch-close.png") no-repeat;
}

.switch2 {
  right: 850px;
  top: 3%;
}

.switch-close,
.switch2-close {
  width: 22px;
  height: 50px;
  position: absolute;
  top: 3%;
  z-index: 990;
  cursor: pointer;
  right: 0px;
  background: url("../../assets/images/switch-open.png") no-repeat;
}

.switch2-close {
  top: 10%;
}
.el-button.el-button--text{
  color:#67649F;
}
 span.el-checkbox__input.is-checked .el-checkbox__inner{
    background: red;
    border-color: red;
  }
</style>

