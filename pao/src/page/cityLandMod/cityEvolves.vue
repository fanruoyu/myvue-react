<template>
  <!-- 城市演变 -->
  <div id="city-manage" class="view">
    <div class="mod_info" v-show="is_mod_info">
      <p class="mod_info_tit">查看板块信息
        <span @click="close_mod_info">×</span>
      </p>
      <div class="mod_info_con">
        <p>板块名称：
          <span>{{mod_info_cons.name}}</span>
        </p>
        <p>综合得分：
          <span>{{mod_info_cons.compositeScore}}</span>
        </p>
        <p>板块级别：
          <span>{{mod_info_cons.levelInfo}}</span>
        </p>
        <p>板块价值：
          <span>{{mod_info_cons.cost}}</span>
        </p>
        <p>板块级别相对于去年是否调整：
          <span>{{mod_info_cons.levelChangedInfo}}</span>
        </p>
        <p>板块级别调整原因：
          <span>{{mod_info_cons.levelChangedReason}}</span>
        </p>
        <p>板块属性：
          <span>{{mod_info_cons.plateAttrInfo}}</span>
        </p>
      </div>
      <div class="mod_info_btn" :id='mod_info_cons.id' ref="mod_id">
        <button @click="compile_mod_info">编辑</button>
        <button @click="remove_mod_info">删除</button>
      </div>

    </div>
    <div class="module" v-show="ismodel">
      <div class="header">编辑板块
        <span @click="no_add_mod">×</span>
      </div>
      <div class='module_con'>
        <label for="">板块名称</label>
        <input type="text" placeholder="请输入" ref="mod_name">
        <label for="">综合得分</label>
        <input type="text" placeholder="输入综合积分，分值0-5" ref="mod_number" @change="changeactive">
        <p style='font-size:12px;color:red;' v-if='!flag'>{{infocon}}</p>
        <label for="">板块级别</label>
        <select name="" id="" ref='mod_sel1'>
          <option value="" selected>--请选择--</option>
          <option v-for="(v, index) in sel1_item" :key="index" :value="v.dictCode">{{v.dictName}}</option>
        </select>
        <label for="">板块名称相对去年是否调整</label>
        <select name="" id="" ref="mod_sel2">
          <option value="" selected>--请选择--</option>
          <option v-for="(v, index) in sel2_item" :key="index" :value="v.dictCode">{{v.dictName}}</option>
        </select>
        <label for="">板块级别调整原因</label>
        <p class='text-length'><textarea name="" id="" cols="30" rows="5" ref="mod_txt" maxlength="300" @keydown="countlength"></textarea><span>{{count}}/300</span></p>
        
        <label for="">模块属性</label>
        <select name="" id="" ref="mod_sel3">
          <option value="" selected>--请选择--</option>
          <option v-for="(v, index) in sel3_item" :key="index" :value="v.dictCode">{{v.dictName}}</option>
        </select>   
      </div>
      <div class="module_btn">
        <button @click="no_add_mod">取消</button>
        <button @click="sure_add_mod">确认</button>
      </div>
        

    </div>
    <ul class="refer_to">
      <li>
        <span class="zlbj"></span> 战略布局</li>
      <li>
        <span class="zdtz"></span> 重点拓展</li>
      <li>
        <span class="jhjr"></span> 机会进入</li>
      <li>
        <span class="zhjr"></span> 暂缓进入</li>
      <li>
        <span class="qt"></span> 其他</li>
    </ul>
    <div class='dialog' v-show='iseditor'>
      <div class='rich_text_editor'>
        <button class="add_editor" @click="add_editor_btn">保存</button>
        <div class="editor_title" ref="ed_tit" contenteditable></div>
        <div class='editor_content'></div>
      </div>
    </div>
    
    <div id="map"></div>
    <div class="city">
      <div class="editor_btn" @click="add_editor">详细信息</div>
      <el-select v-model="value" filterable size="3" placeholder="" @change="changeCity(value)">
        <el-option v-for="item in cityList" :key="item.cityCode" :label="item.cityName" :value="item.cityCode">
        </el-option>
      </el-select>
    </div>
    <div class="right-list" v-show="list">
      <div class="search">
        <input type="text" v-model="searchKey" @keydown="KeyDown">
        <button class="searchBtn" @click="searchProject(searchKey)">搜索</button>
      </div>
      <div class="new_year">
        <p class="year_info">
          <span @click="isshowyears">{{sel_year}}</span>
          <ul v-show="isyears">
            <li v-for="(v, index) in years" :key="index" @click="checked_year(v)">
              {{v}}
              <div class="del" @click="remove_info">删除</div>
            </li>
          </ul>
        </p>
        <span class="add_year">
          <button @click="add_year_btn" class="xznf">+新增年份</button>
          <div class="year_list" v-show='isaddyear'>
            <p>
              新增年份：
              <select name="" id="" ref="newyear">
                <option value='' selected>-&nbsp;-选择年份-&nbsp;-</option>
                <option v-for="(v, index) in newyear" :key="index" :value="v">{{v}}</option>
              </select>
            </p>
            <p>
              拷贝年份：
              <select name="" id="" ref="oldyear">
                <option value="" selected>-&nbsp;-选择年份-&nbsp;-</option>
                <option v-for="(v, index) in years" :key="index" :value="v">{{v}}</option>
              </select>
            </p>
            <div>
              <button @click="no_addyear_btn">取消</button>
              <button @click="sure_addyear_btn">确定</button>
            </div>
          </div>
        </span>
      </div>
      <ul v-if="projectListLength" class='info-list'>
        <li v-for="(v, index) in projectListCurrentPageData" :key="index" @click="enableEdit(v)">
          <p class="text_nobr" :title="v.id" style="height:36px">{{v.name}}</p>
          <span class="pro1" :class="item_style[index]">{{v.levelInfo}}</span>
          <span class="pro2" :title="v.plateAttrInfo" v-if="v.plateAttrInfo">{{v.plateAttrInfo}}</span>
        </li>

      </ul>
      <div class="page-list" v-if="projectListLength">
        <span class="info_length" ref='info_length'>共{{projectList.length}}条</span>
        <div class="page-box">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="size" layout="prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>

      <div class="no-data" v-else>当前城市暂无项目！</div>

    </div>
    <div :class="{'switch':isSwitch,'switch-close':isSwitchClose}" @click="isShowProjectList"></div>
    <div :class="{'switch2':isSwitch2,'switch2-close':isSwitchClose2}" @click="isShowProject"></div>
  </div>
</template>
<script>
//富文本编辑器;
import E from 'wangeditor';
//toast提示
import { Message } from 'element-ui';

export default {
  name: 'city-manage',
  data() {
    return {
      count:0,
      flag:true,
      infocon:'',
      sel1_item: [],
      sel2_item: [],
      sel3_item: [],
      editor: null,
      is_mod_info: false,
      mod_info_cons: {},
      isaddyear: false,
      iseditor: false,
      sel_year: '',
      ismodel: false,
      years: [],
      newyear: [],
      item_style: [],
      isyears: false,
      searchKey: '',
      add_hot: 0,          //1表示更新，0表示添加
      cityList: JSON.parse(localStorage.cityList),
      lng: '',               //城市的经度
      lat: '',               //城市的纬度
      capital: '',           //是否省会直辖市    1为省会直辖市
      cityCode: '',          //城市编码
      value: '',
      map: '',
      polygon_case_collector: {},
      drawingManager: null,   //声明绘图工具
      polygoninfo: '',
      list: true,
      isSwitch: true,
      isSwitchClose: false,
      isSwitch2: false,
      isSwitchClose2: false,
      currentPage: 1,
      total: 0,
      size: 15,
      totalPage: 0,
      projectListCurrentPageData: [],          //每页渲染的数据
      projectListLength: '',
      projectList: [],
      styleOptions: {       //绘制图形样式配置
        strokeColor: "red",  //边线颜色。
        fillColor: "blue",   //填充颜色。当参数为空时，圆形将没有填充效果。
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
    projectListCurrentPageData(n, o) {
      this.polygon(n)
    },
    sel_year(n, o) {
      this.getProjectList(this.cityCode, this.lng, this.lat, this.capital)
    },
    isleft(n,o){
      if(n){
        document.querySelector('.refer_to').style.left='19%';
      }else{
        document.querySelector('.refer_to').style.left='1%';
      }
    }
  },
  methods: {
    no_add_mod() {
      this.ismodel = false;
      this.$confirm( `确定要放弃编辑？放弃后所有的编辑将不会被保存`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(
        ()=>{
          this.$message({
            type: 'info',
            message: '已取消了编辑状态！'
          });
          this.getProjectList(this.cityCode, this.lng, this.lat, this.capital);
          this.polygoninfo = '';
        }
      ).catch(() => {          
         this.ismodel = true;
        });
    },
    //更新或者添加板块
    sure_add_mod() {
      if (this.flag) {
        var num='';
        if(this.$refs.mod_number.value.trim()==''){
          num='';
        }else{
          num=parseFloat(this.$refs.mod_number.value.trim()).toFixed(2)
        }
        if (this.add_hot) {
          let pts = this.polygon_case_collector['id-' + this.$refs.mod_id.id].polygon.getPath();//Point
          let rt = '';
          pts.forEach((item, index) => {
            if (index == pts.length - 1) {
              rt += item.lng + ',' + item.lat
            } else {
              rt += item.lng + ',' + item.lat + ';'
            }
          })       
          this.$http.post('/longcity/services/v1/realestatePlate/save', {
            name: this.$refs.mod_name.value.trim(),
            polyline: rt,
            dateTime: this.sel_year,
            level: this.$refs.mod_sel1.value,
            levelChanged: this.$refs.mod_sel2.value,
            levelChangedReason: this.$refs.mod_txt.value.trim(),
            compositeScore:num,
            cost: '',
            plateAttr: this.$refs.mod_sel3.value,
            id: this.$refs.mod_id.id
          }).then(
            success => {
              if (success.data.code == 200 || success.data.code == '200') {
                this.getProjectList(this.cityCode, this.lng, this.lat, this.capital);
                this.ismodel = false;
                this.polygoninfo = '';
                this.$message({
                  showClose: true,
                  message: '保存成功！',
                  type: 'success'
                });
              }
            }
            )

        } else {
          this.$http.post('/longcity/services/v1/realestatePlate/save', {
            name: this.$refs.mod_name.value.trim(),
            polyline: this.polygoninfo,
            dateTime: this.sel_year,
            level: this.$refs.mod_sel1.value,
            levelChanged: this.$refs.mod_sel2.value,
            levelChangedReason: this.$refs.mod_txt.value.trim(),
            compositeScore:num,
            cost: '',
            plateAttr: this.$refs.mod_sel3.value
          }).then(
            success => {
              if (success.data.code == 200 || success.data.code == '200') {
                this.ismodel = false;
                this.getProjectList(this.cityCode, this.lng, this.lat, this.capital);
                this.polygoninfo = '';
                this.$message({
                  showClose: true,
                  message: '保存成功！',
                  type: 'success'
                });
              }
            }
            )
        }
      }
    },
    //打开富文本编辑器
    add_editor() {
      this.iseditor = true;
      this.list = false;
      this.isSwitchClose = true;
      this.isSwitch2 = true;
      this.is_mod_info=false;
      this.ismodel=false;
    },
    //富文本编辑器的保存按钮
    add_editor_btn() {
      this.isSwitch = true;
      this.isSwitchClose = false;
      this.iseditor = false;
      this.list = true;
      this.isSwitch2 = false;
      this.$http.post('/longcity/services/v1/city/saveCityEvolution', {
        evolutionTitle: this.$refs.ed_tit.innerHTML,
        code: this.cityCode,
        evolutionDetails: this.editor.txt.html()
      })
        .then(
        success => {
          if (success.data.code == 200 || success.data.code == '200') {
            this.$message({
              showClose: true,
              message: '保存成功！',
              type: 'success'
            });
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
      this.is_mod_info=false;
      this.ismodel=false;
      for (var i in this.polygon_case_collector) {
        this.polygon_case_collector[i].isedit = false
        this.polygon_case_collector[i].polygon.disableEditing();
      }
    },
    //切换年份信息的状态
    isshowyears() {
      this.isyears = !this.isyears;
      this.isaddyear = false;
    },
    //设置点击年份为当前年份
    checked_year(year) {
      this.sel_year = year;
      this.isyears = false;
    },
    //提示用户是否删除
    remove_info(e) {
      var del_year = (e.target.parentNode.childNodes[0].nodeValue).trim();
      this.isyears = false;
      this.$confirm(`此操作将删除${del_year}年的数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(
        ()=>{
          this.$http.post('/longcity/services/v1/realestatePlate/deletePlateYear', {
            cityCode: this.cityCode,
            year: del_year
          })
            .then(
            success => {
              if (success.data.code == 200 || success.data.code == '200') {
                this.$message({
                  showClose: true,
                  message: '已成功删除' + del_year + '年的数据！',
                  type: 'success'
                });
                this.getyears(this.cityCode);
              }else{
                this.$message({
                  type: 'info',
                  message: '删除失败，请至少保留一个年份的数据！'
                });
              }
            })
        }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //新增年份按钮点击事件，显示年份拷贝的信息页面
    add_year_btn() {
      this.isaddyear = true;
      this.isyears = false;
    },
    //年份拷贝的信息页面取消按钮，（返回事件，并关闭此信息页面）
    no_addyear_btn() {
      this.$message({
          type: 'info',
          message: '已取消新增年份'
        });
      this.isaddyear = false;
    },
    //表单校验
    changeactive(){
      if(!this.$refs.mod_number.value.trim()){
        this.flag=true;
      }else{
          if(isNaN(this.$refs.mod_number.value)){
          this.flag=false;
          this.infocon='综合积分应为数字'
        }else{
          if(parseFloat(this.$refs.mod_number.value)<0||parseFloat(this.$refs.mod_number.value)>5){
            this.flag=false;
            this.infocon='综合积分应为0-5之间的有效数字'
          }else{
            this.flag=true;
          }
        }
      }
    },
    //统计数据的长度
    countlength(){
      if(this.$refs.mod_txt.value.length>=300){
        this.count=300
      }else{
        this.count=this.$refs.mod_txt.value.length;
      }
      
    },
    //年份拷贝的信息页面确定按钮，（拷贝事件，并关闭此信息页面）
    sure_addyear_btn() {
      var that = this;
      if(!this.$refs.newyear.value&&!this.$refs.oldyear.value){
        this.$message({
          type:'info',
          message:'新增的年份于拷贝年份为必选项，请选择！'
        })
      }else if(!this.$refs.newyear.value){
        this.$message({
          type:'info',
          message:'请选择要新增的年份！'
        })
      }else if(!this.$refs.oldyear.value){
        this.$message({
          type:'info',
          message:'请选择要拷贝的年份！'
        })
      }else{
          this.isaddyear = false;
          this.$http.post('/longcity/services/v1/realestatePlate/copyPlateYear', {
          cityCode: that.cityCode,
          newYear: that.$refs.newyear.value,
          copyYear: this.$refs.oldyear.value
        })
          .then(
          success => {
            if (success.data.code == 200 || success.data.code == '200') {
              this.getyears(that.cityCode)
              this.$message({
                showClose: true,
                message: '新增成功！',
                type: 'success'
              });
            }
          }
          )
      }
        

    },
    //关闭板块信息
    close_mod_info() {
      this.is_mod_info = false;
    },
    //删除板块信息
    remove_mod_info() {
      this.is_mod_info = false;
      this.$confirm(`此操作将删除${this.mod_info_cons.name}, 是否继续?`, '警告', {
        confirmButtonText: '继续删除',
        cancelButtonText: '放弃删除',
        type: 'warning'
      }).then(
        () => {

          this.$http.post('/longcity/services/v1/realestatePlate/delete', {
            id: this.$refs.mod_id.id
          }).then(
            success => {
              if (success.data.code == 200 || success.data.code == '200') {
                this.is_mod_info = false;
                this.$message({
                  showClose: true,
                  message: '删除成功！',
                  type: 'success'
                });

                this.getProjectList(this.cityCode, this.lng, this.lat, this.capital)
              }
            }
            )

        }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    //编辑板块信息
    compile_mod_info() {     
      for (var i in this.polygon_case_collector) {
        this.polygon_case_collector[i].isedit = false
        this.polygon_case_collector[i].polygon.disableEditing();
      }
      if (this.mod_info_cons.level == 5) {
        this.$refs.mod_sel1.options[0].selected = true;
      } else {
        this.$refs.mod_sel1.value = this.mod_info_cons.level;
      }
      this.polygon_case_collector['id-' + this.$refs.mod_id.id].isedit = true;
      this.polygon_case_collector['id-' + this.$refs.mod_id.id].polygon.enableEditing();
      this.$refs.mod_name.value = this.mod_info_cons.name;
      this.$refs.mod_number.value = this.mod_info_cons.compositeScore|| '0';
      this.$refs.mod_sel2.value = this.mod_info_cons.levelChanged;
      this.$refs.mod_txt.value = this.mod_info_cons.levelChangedReason || '';
      this.$refs.mod_sel3.value = this.mod_info_cons.plateAttr;
      this.is_mod_info = false;
      this.polygoninfo = this.mod_info_cons.polyline;
      this.ismodel = true;
      this.add_hot = 1;
      this.list=false;
      this.isSwitch=false;ma
      this.isSwitchClose=true;
      this.count=this.mod_info_cons.levelChangedReason.length;
    },
    //画图
    draw() {
      var that = this;
      that.drawingManager = new BMapLib.DrawingManager(that.map, {
        isOpen: false,
        enableDrawingTool: true,
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT,
          offset: new BMap.Size(200, 5),
          drawingModes: [
            BMAP_DRAWING_POLYGON,
          ],
        },
        polygonOptions: that.styleOptions, //多边形的样式
      });
      var overlaycomplete = function(e) {
        that.add_hot = 0;
        that.$refs.mod_name.value = '';
        that.$refs.mod_number.value = '';
        that.$refs.mod_sel1.options[0].selected = true;
        that.$refs.mod_txt.value = '';
        that.$refs.mod_sel2.options[0].selected = true;
        that.$refs.mod_sel3.options[0].selected = true;
        that.ismodel = true;
        e.overlay.getPath().forEach((item, idx, arr) => {
          if (idx == e.overlay.getPath().length - 1) {
            that.polygoninfo += item.lng + "," + item.lat
          } else {
            that.polygoninfo += item.lng + "," + item.lat + ';'
          }
        })
      };
      this.drawingManager.addEventListener('overlaycomplete', overlaycomplete);

    },
    //多边形绘制工具
    polygon(polygon_list) {
      var that = this;
      this.map.clearOverlays();
      polygon_list.forEach(value => {
        let arr = value.polyline.split(';');
        let color = '#fff';
        arr = arr.map(item => {
          let item_arr = item.split(',');
          return new BMap.Point(item_arr[0], item_arr[1])
        })
        switch (value.levelInfo) {
          case "战略布局": color = '#E59392';
            break;
          case "重点拓展": color = '#F4B99F';
            break;
          case "机会进入": color = '#F5D29C';
            break;
          case "暂缓进入": color = '#D0D0D0';
            break;
          default:
            color = '#9ECBFF';
        }
        let polygon_case = new BMap.Polygon(arr, { strokeColor: color, strokeWeight: 2, strokeOpacity: .5, fillColor: color });
        this.polygon_case_collector['id-' + value.id] = {
          polygon: polygon_case,
          isedit: false
        };
        this.map.addOverlay(polygon_case);

      });
      for (let i in this.polygon_case_collector) {
        this.polygon_case_collector[i].polygon.addEventListener("click", function() {
          let temp_id = i.split('-')[1];
          that.isaddyear=false;
          that.$http.get('/longcity/services/v1/realestatePlate/getPlateInfo?id=' + temp_id)
            .then(
            success => {
              if (success.data.code == 200 || success.data.code == '200') {
                that.mod_info_cons = success.data.result;
                for (var j = 0; j < that.projectListCurrentPageData.length; j++) {
                  var id = that.projectListCurrentPageData[j].id;
                  switch (that.projectListCurrentPageData[j].levelInfo) {
                    case "战略布局": that.polygon_case_collector['id-' + id].polygon.setStrokeColor('#E59392');
                      break;
                    case "重点拓展": that.polygon_case_collector['id-' + id].polygon.setStrokeColor('#F4B99F');
                      break;
                    case "机会进入": that.polygon_case_collector['id-' + id].polygon.setStrokeColor('#F5D29C');
                      break;
                    case "暂缓进入": that.polygon_case_collector['id-' + id].polygon.setStrokeColor('#D0D0D0');
                      break;
                    default:
                      that.polygon_case_collector['id-' + id].polygon.setStrokeColor('#C4DAED');
                  }
                  that.polygon_case_collector['id-' + id].polygon.setStrokeOpacity(.5);
                }



                let color = '';
                switch (that.mod_info_cons.levelInfo) {
                  case "战略布局": color = '#DC3030';
                    break;
                  case "重点拓展": color = '#F66F34';
                    break;
                  case "机会进入": color = '#FFA41C';
                    break;
                  case "暂缓进入": color = '#767676';
                    break;
                  default:
                    color = '#0075FE';
                };
                that.polygon_case_collector[i].polygon.setStrokeColor(color);
                that.polygon_case_collector[i].polygon.setStrokeOpacity(1);
                that.is_mod_info = true;
              }
            }
            )
        }, false)
      }

    },
    enableEdit(v) {
      this.is_mod_info = false;
      for (var i in this.polygon_case_collector) {
        switch (v.levelInfo) {
          case "战略布局": this.polygon_case_collector[i].polygon.setStrokeColor('#E59392');
            break;
          case "重点拓展": this.polygon_case_collector[i].polygon.setStrokeColor('#F4B99F');
            break;
          case "机会进入": this.polygon_case_collector[i].polygon.setStrokeColor('#F5D29C');
            break;
          case "暂缓进入": this.polygon_case_collector[i].polygon.setStrokeColor('#D0D0D0');
            break;
          default:
            this.polygon_case_collector[i].polygon.setStrokeColor('#C4DAED');
        }
        this.polygon_case_collector[i].polygon.setStrokeOpacity(.5);
      }

      let target_polygon = this.polygon_case_collector['id-' + v.id]
        , color = '';
      switch (v.levelInfo) {
        case "战略布局": color = '#DC3030';
          break;
        case "重点拓展": color = '#F66F34';
          break;
        case "机会进入": color = '#FFA41C';
          break;
        case "暂缓进入": color = '#767676';
          break;
        default:
          color = '#0075FE';
      };
      target_polygon.polygon.setStrokeColor(color);
      target_polygon.polygon.setStrokeOpacity(1);
      let point = new BMap.Point(v.center.split(",")[0], v.center.split(",")[1]);
      if (this.capital == 1 || this.capital == "1") {
        var level = 12;
      } else {
        var level = 13;
      }
      this.map.centerAndZoom(point, level);
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
      this.isyears = false;
      this.isaddyear = false;
      this.isShowProject();
      this.openFullScreen();
      var x, y, capital;
      for (var i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i]["cityCode"] == cityCode) {
          this.lng = x = this.cityList[i]["longitude"];
          this.lat = y = this.cityList[i]["latitude"];
          this.capital = capital = parseInt(this.cityList[i]["capital"]);
          this.cityCode = cityCode;
          
          this.getProjectList(cityCode, x, y, capital);
          return false;
        }
      }
    },
    KeyDown(e) {
      if (e.keyCode == 13) {
        this.searchProject(this.searchKey);
      }
    },
    //搜索项目
    searchProject(searchKey) {
      var that = this;
      this.openFullScreen();
      this.$http.post('/longcity/services/v1/realestatePlate/plateList', {
        year: that.sel_year,
        cityCode: that.cityCode,
        name: searchKey
      })
        .then(
        success => {
          if (success.data.code == 200 || success.data.code == "200") {
            this.loading.close();          //关闭加载模态框
            that.projectList = success.data.result;
            this.currentPage = 1;
            that.projectListCurrentPageData = this.projectList.slice(0, 10);
            this.setPage(that.projectList);          //初始化分页
            var x = this.lng;
            var y = this.lat;
            var capital = this.capital;
            this.createMap(x, y, capital);
          }
        }
        )
    },
    //初始化分页
    setPage(values) {
      this.total = values.length;
      if (this.total > 0) {
        this.projectListLength = true;
      } else {
        this.projectListLength = false;
      }
      this.totalPage = Math.ceil(this.total / this.size);

      setTimeout(() => {
        if (document.querySelector('.info_length')) {

          if (this.totalPage >= 4) {
            document.querySelector('.info_length').style = `
            position:absolute;
            bottom:10px;
            right:330px;
          `
          } else {
            document.querySelector('.info_length').style = `
            position:absolute;
            bottom:10px;
            right:200px;
          `
          }

        }

      }, 100)
    },
    handleCurrentChange(val) {
      this.projectListCurrentPageData = this.projectList.slice((val - 1) * this.size, val * this.size);
    },
    //获取项目列表
    getProjectList(cityCode, x, y, capital) {
      var that = this;
      this.item_style = [];
      this.is_mod_info = false;
      this.ismodel = false;
      this.createMap(x, y);
      this.getyears(cityCode);
      this.editor_info(cityCode);
      this.add_newyear(cityCode);
      this.$http.post('/longcity/services/v1/realestatePlate/plateList', {
        year: this.sel_year,
        cityCode: cityCode
      }).then(
        success => {
          if (success.data.code === 200 || success.data.code === '200') {
            this.loading.close();
            if (success.data.result.length > 0) {
              that.projectList = success.data.result;
              for (var i = 0; i < that.projectList.length; i++) {
                switch (that.projectList[i].levelInfo) {
                  case "战略布局":
                    that.item_style.push('zlbj_list')
                    break;
                  case "重点拓展":
                    that.item_style.push('zdtz_list')
                    break;
                  case "暂缓进入":
                    that.item_style.push('zhjr_list')
                    break;
                  case "机会进入":
                    that.item_style.push('jhjr_list')
                    break;
                  default:
                    that.item_style.push('qt_list')
                }
              }
              that.projectListLength = true;
              that.projectListCurrentPageData = this.projectList.slice(0, this.size);
              that.setPage(that.projectList);
            }
          }
        }
        )
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
      this.draw();
      document.querySelector('.BMapLib_Drawing').style = `
            position: absolute;
            z-index: 10;
            text-size-adjust: none;
            bottom: auto;
            top: 5px;
            height:36px;
            left:250px;
        `
    },
    //可填年份的获取
    add_newyear(code) {
      var that = this;
      this.$http.get('/longcity/services/v1/realestatePlate/getPlatePresetYearList?code=' + code)
        .then(
        success => {
          if (success.data.code == 200 || success.data.code == '200') {
            that.newyear = success.data.result.plateYears;
          }
        }
        )
    },
    //已有年份的获取
    getyears(year) {
      var that = this;
      this.$http.get('/longcity/services/v1/realestatePlate/getPlateYearList?code=' + year)
        .then(
        success => {
          if (success.data.code == 200 || success.data.code == '200') {
            that.years = success.data.result.plateYears;
            that.sel_year = that.years[0];
          }
        }
        )
    },
    //初始化富文本编辑器的内容
    editor_info(code) {
      this.$http.get('/longcity/services/v1/city/getCityEvolution?code=' + code).then(
        success => {
          if (success.data.code == 200 || success.data.code == '200') {
            this.$refs.ed_tit.innerHTML = success.data.result.title
            this.editor.txt.html(`<p>${success.data.result.details}</p>`);
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
    var beiJing = false;
    document.querySelector('.w-e-text-container').style = `
        min-height:100%      
      `
    //判断当前城市有没有北京
    for (var i = 0; i < this.cityList.length; i++) {
      if (this.cityList[i]["cityCode"] == "110100") {
        beiJing = true;
        this.value = this.cityList[i]["cityCode"];
        return false;
      }
    }
    if (!beiJing) {
      this.value = this.cityList[0]["cityCode"];
    }
  },
  created() {
    this.$http.post('/longcity/services/v1/dict/dictListByType', {
      dictTypes: ['plate_realestate_level', 'plate_realestate_level_changed', 'plate_realestate_attr']
    }).then(
      success => {
        if (success.data.code == 200 || success.data.code == '200') {
          this.sel1_item = success.data.result[0].items;
          this.sel2_item = success.data.result[1].items;
          this.sel3_item = success.data.result[2].items;
        }
      }
      )
  }
}
</script>
<style scoped>
/*板块的颜色  */

.zlbj_list {
  border: 1px solid #E59392 !important;
  color: #E59392 !important;
}

.zdtz_list {
  border: 1px solid #F4B99F !important;
  color: #F4B99F !important;
}

.jhjr_list {
  border: 1px solid #F5D29C !important;
  color: #F5D29C !important;
}

.zhjr_list {
  border: 1px solid #D0D0D0 !important;
  color: #D0D0D0 !important;
}

.qt_list {
  border: 1px solid #C4DAED !important;
  color: #9ECBFF !important;
}

.zlbj {
  background: #E59392;
}

.zdtz {
  background: #F4B99F;
}

.jhjr {
  background: #F5D29C;
}

.zhjr {
  background: #D0D0D0;
}

.qt {
  background: #9ECBFF;
}







/*设置单行不换行  */

.text_nobr {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#city-manage {
  position: relative;
}
.dialog{
  position: absolute;
  width: 100%;
  height:100%;
  z-index:666;
  background: rgba(255,255,255,0);
}

#city-manage .mod_info {
  position: fixed;
  z-index: 99999999;
  width: 400px;
  height: 400px;
  background: #fff;
  border-radius: 4px;
  bottom: 20px;
  right: 150px;
  overflow: hidden;
}

#city-manage .mod_info .mod_info_tit {
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
  padding: 0 15px;
  font-weight: bolder;
  position: relative;
  color: #000;
  background: #67649F;
  color: #fff;
  text-align: center;
}

#city-manage .mod_info .mod_info_tit span {
  font-size: 30px;
  position: absolute;
  width: 50px;
  height: 50px;
  right: 0;
  top: 0;
  line-height: 50px;
  text-align: center;
  font-weight: normal;
  cursor: pointer;
}

#city-manage .mod_info .mod_info_con {
  box-sizing: border-box;
  padding: 5px 15px;
  border-top: 1px solid rgba(228, 228, 228, 1);
  border-bottom: 1px solid rgba(228, 228, 228, 1);
  height: 300px;
  overflow-y: auto;
}

#city-manage .mod_info .mod_info_con p {
  line-height: 40px;
}

#city-manage .mod_info .mod_info_con p span {
  color: #AEAEAE;
}

#city-manage .mod_info .mod_info_btn {
  height: 50px;
  text-align: right;
  line-height: 50px;
}

#city-manage .mod_info .mod_info_btn button {
  border: 1px solid #67649F;
  background: #ffffff;
  color:#67649F;
  height: 33px;
  width: 80px;
  border-radius: 5px;
  margin-right:20px;
}
 #city-manage .mod_info .mod_info_btn button:nth-child(2){
  background:#67649F;
  color: #fff;
} 

#city-manage .module {
  width: 400px;
  height:500px;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

#city-manage .module .header {
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  height: 50px;
  background: #67649F;
  line-height: 50px;
  text-align: center;
  color: #fff;
}
#city-manage .module .module_con{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 60px 20px 70px;
  overflow-y: auto;
}
#city-manage .module .module_con .text-length{
  position: relative;
  width: 100%;
  height: 92px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding-bottom: 20px; 
  overflow: hidden;

}
#city-manage .module .module_con .text-length span{
  position: absolute;
  font-size: 12px;
  bottom:5px;
  right: 5px;
  text-align: right;
  height: 12px;
  line-height: 12px;
}
#city-manage .module .module_btn{
  position: absolute;
  height: 60px;
  width: 100%;
  bottom:0;
  left:0;
  background: #fff;
  box-sizing: border-box;
}

#city-manage .module .module_con input,
#city-manage .module .module_con select {
  width: 100%;
  height: 30px;
  font-size: 12px;
  box-sizing: border-box;
  padding: 0 6px;
}

#city-manage .module .module_con textarea {
   width: 100%; 
   height:100%;
   border: 0;
}

#city-manage .module .header span {
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}

#city-manage .module label {
  display: block;
}

#city-manage .module button {
  font-size: 12px;
  padding: 0;
  height: 36px;
  width: 84px;
  position: absolute;
  bottom: 12px;
  border-radius: 4px;
  border: 1px solid #534F96;
  background: #fff;
  color: #534F96;
  right: 120px;
  cursor: pointer;
}

#city-manage .module button:last-child {
  right: 15px;
  color: #fff;
  background: #534F96;
}

#map {
  width: 100%;
  height: 100%;
}

#map .BMapLib_Drawing {
  left: 200px;
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

#city-manage .right-list {
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 99;
  width: 400px;
  height: 97%;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  border-color: #ccc;
  -moz-box-shadow: 1px 1px 1px #ccc;
  box-shadow: 1px 1px 1px #ccc;
}

#city-manage .right-list .new_year {
  width: 100%;
  line-height: 36px;
  background-color: rgba(242, 242, 242, 1);
  padding: 14px 0;
  position: absolute;
  top: 50px;
  left: 0;
}

#city-manage .right-list .new_year .year_info {
  width: 260px;
  border: 1px solid rgba(121, 121, 121, .6);
  height: 36px;
  float: left;
  margin-left: 8px;
  position: relative;
}

#city-manage .right-list .new_year .year_info span {
  text-indent: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#city-manage .right-list .new_year .year_info span:after {
  content: "";
  width: 0;
  height: 0;
  border: 5px transparent solid;
  border-top-color: #333;
  position: absolute;
  top: 18px;
  right: 10px;
}

#city-manage .right-list .new_year .year_info span:before {
  content: "";
  width: 0;
  height: 0;
  border: 5px transparent solid;
  border-bottom-color: #333;
  position: absolute;
  top: 6px;
  right: 10px;
}

#city-manage .right-list .new_year .year_info ul {
  position: absolute;
  width: 100%;
  top: 35px;
  left: -1px;
  background: #ffffff;
  border: 1px solid rgba(121, 121, 121, .6);
  z-index: 999;
}

#city-manage .right-list .new_year .year_info ul li {
  line-height: 52px;
  height: 52px;
  position: relative;
}

#city-manage .right-list .new_year .year_info ul li .del {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 52px;
  text-align: center;
  display: none;
}

#city-manage .right-list .new_year .year_info ul li:hover .del {
  display: block;
}

#city-manage .right-list .new_year .year_info ul li:last-child {
  border: 0;
}

#city-manage .right-list .new_year .add_year {
  width: 80px;
  height: 36px;
  color: #333333;
  text-align: center;
  margin: 0 0 0 16px;
  position: relative;
}

#city-manage .right-list .new_year .add_year .xznf {
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
  color: #fff;
  background: #534F96;
  border-radius: 4px;
}

#city-manage .right-list .new_year .add_year .year_list {
  width: 350px;
  height: 170px;
  position: absolute;
  z-index: 111;
  border: 1px solid #ccc;
  left: -260px;
  border: 1px solid rgba(121, 121, 121, .6);
  background: #fff;
  top: 65px;
  font-weight: 200;
  font-size: 12px;
}

#city-manage .right-list .new_year .add_year .year_list:after {
  content: "";
  width: 25px;
  height: 20px;
  position: absolute;
  background: red;
  border-top: 1px solid rgba(121, 121, 121, .6);
  border-right: 1px solid rgba(121, 121, 121, .6);
  transform: rotate(-40deg);
  background: #fff;
  top: -11px;
  left: 80%;
}

#city-manage .right-list .new_year .add_year .year_list p {
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 40px;
  margin-top: 10px;
}

#city-manage .right-list .new_year .add_year .year_list p select {
  flex: 1;
  height: 30px;
  margin-left: 10px;
  font-weight: 200;
  color: #666;
  font-size: 12px;
}

#city-manage .right-list .new_year .add_year .year_list button {
  width: 60px;
  height: 30px;
  padding: 0;
  font-weight: 200;
  font-size: 12px;
  border-radius: 4px;
  color: #534F96;
  background: #fff;
  border: 1px solid #534F96;
  margin-top: 10px;
}

#city-manage .right-list .new_year .add_year .year_list button:nth-child(2) {
  color: #fff;
  background: #534F96;
  border: 1px solid #534F96;
  position: absolute;
  bottom: 10px;
  right: 40px;
}

#city-manage .right-list .new_year .add_year button,
#city-manage .right-list .new_year .remove_list button {
  height: 100%;
  width: 100%;
  padding: 0;
  cursor: pointer;
}

#city-manage .right-list .search {
  width: 380px;
  padding: 8px 10px;
  height: 34px;
  line-height: 50px;
  background: #534F96;
  position: absolute;
  z-index: 990;
  border: none;
  border-radius: 0;
  font-size: 12px;
  top: 0;
  left: 0;
}

#city-manage .right-list .search input {
  width: 270px;
  height: 30px;
  padding: 2px;
  float: left;
}

#city-manage .right-list .search .searchBtn {
  width: 70px;
  height: 35px;
  line-height: 35px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 10px;
  float: left;
}

#city-manage .right-list .page-list {
  height:80px;
  width:400px;
  background: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  
}

#city-manage .right-list ul.info-list {
  border-top: 1px solid rgba(210, 210, 210, 1);
  box-sizing: border-box;
  padding: 127px 0 80px 0;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

#city-manage .right-list .page-box {
  position: absolute;
  bottom: 10px;
  right: 0;
}

#city-manage .right-list li {
  height: 70px;
  border-bottom: 1px solid rgba(210, 210, 210, 1);
  cursor: pointer;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: #444444;
}

#city-manage .right-list li:hover {
  background: #EEEEEE;
}

#city-manage .right-list li p {
  width: 100%;
  line-height: 36px;
}

#city-manage .right-list li span {
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  font-size: 12px;
}

#city-manage .right-list li span.pro1 {
  width: 60px;
  background: #fff;
  margin-right: 5px;
}

#city-manage .right-list li span.pro2 {
  color: #FF6262;
  background: #fff;
  border-color: #FF6262;
  padding: 0 5px;
}

#city-manage .right-list li img {
  margin-top: 2px;
}

.no-data {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-top: 50px;
}

.switch,
.switch2 {
  width: 22px;
  height: 50px;
  position: absolute;
  top: 3%;
  right: 397px;
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

.el-pagination {
  text-align: right;
  margin-top: 10px;
}
</style>

