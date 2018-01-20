<template>
  <div id="baseInfo">
    <div class="topArea" style="margin-top: 19px">
      <div class="left">项目名称</div>
      <div class="right">
        <div v-if="bShowTip1" class="tipContainer">
          <p class="tipBubble">例：北京中医药大学学生宿舍</p>
        </div>
        <div class="textareaBox">
            <textarea @focus="bShowTip1=true" @blur="bShowTip1=false" :disabled="disabled" name=""
                      v-model="proBusinessInfo.lightProjectBaseInfo.name" class="decisionSmall"
                      placeholder="请输入省+市+区县+路+建筑物名称" :maxlength="64"></textarea>
          <span class="statistics">{{proBusinessInfo.lightProjectBaseInfo.name.length}}/64</span>
        </div>
      </div>
    </div>
    <div class="topArea">
      <div class="left">项目位置</div>
      <div class="right">
        <div v-if="bShowTip2" class="tipContainer">
          <p class="tipBubble">例：北京市朝阳区北京中医药大学南区南门</p>
        </div>
        <div class="textareaBox">
              <textarea @focus="bShowTip2=true" @blur="bShowTip2=false" :disabled="disabled" name=""
                        v-model="proBusinessInfo.lightProjectBaseInfo.address" class="decisionSmall"
                        placeholder="请输入项目位置" :maxlength="64"></textarea>
          <span class="statistics">{{proBusinessInfo.lightProjectBaseInfo.address.length}}/64</span>
        </div>

        <div>
          <div style="float:left;cursor:pointer" @click="setMark">
            <img src="../../../../src/assets/images/mapReaname.png" alt="">
            <p>地图选点</p>
          </div>
          <div style="margin-left:80px;line-height: 90px">
            <p>{{!newAddress[0] ? '点击按钮在地图中确定项目位置' : newAddress[0]}}</p>
            <!--<p>{{proInformation.locationDescription}}</p>-->
          </div>
        </div>
      </div>

    </div>

    <div class="topArea">
      <div class="left">承租合同产权面积</div>
      <div class="right">
        <div class="textareaBox">
          <div class="inputCt">
            <input v-validate="{ regex: reg2 }" name="rentContractArea"
                   :class="{'baseInput' : true, 'is-danger': errors.has('rentContractArea')}" :disabled="disabled"
                   v-model="proBusinessInfo.lightProjectBaseInfo.rentContractArea" placeholder="请输入"/>
            <div
              data-location="项目条件->基本信息->承租合同产权面积"
              v-show="errors.has('rentContractArea')||proBusinessInfo.lightProjectBaseInfo.rentContractArea>1000000"
              class="help">{{'注：保留2位小数，0~100万'}}
            </div>
            <span>平米</span>
          </div>

        </div>
      </div>
    </div>

    <!--项目包含业态-->
    <div class="topArea">
      <div class="left">项目包含业态</div>
      <div class="right">
        <el-checkbox-group v-model="proBusinessInfo.prjcContainsForms">
          <el-checkbox v-for="(item, index) in options['prjcContainsForms']" :key="index" :label="item.dictCode" name="type">
            {{item.dictName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <!--区位类型-->
    <div class="topArea">
      <div class="left">区位类型</div>
      <div class="right">
        <el-checkbox-group v-model="proBusinessInfo.prjcLocationType">
          <el-checkbox v-for="(item, index) in options['prjcLocationType']" :key="index" :label="item.dictCode" name="type">
            {{item.dictName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <!--用地性质-->
    <div class="topArea">
      <div class="left">用地性质</div>
      <div class="right">
        <el-checkbox-group v-model="proBusinessInfo.prjcNatureOfLand">
          <el-checkbox v-for="item in options['prjcNatureOfLand']" :label="item.dictCode" :key="item.dictCode">
            {{item.dictName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <div class="topArea">
      <div class="left">目前房屋使用性质</div>
      <div class="right">
        <el-checkbox-group v-model="proBusinessInfo.prjcHomeUseProperties">
          <el-checkbox v-for="item in options['prjcHomeUseProperties']" :label="item.dictCode" :key="item.dictCode">
            {{item.dictName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>


    <div class="topArea">
      <div class="left">项目是否有违建</div>
      <div class="right">
        <div style="float:left">
          <el-radio-group :disabled="disabled" v-model="proBusinessInfo.prjcIfHill">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
          <!--<el-checkbox-group :disabled="disabled" v-model="proBusinessInfo.prjcIfHill">
            <el-checkbox label="是"></el-checkbox>
          </el-checkbox-group>-->
        </div>


        <el-select :style="{'margin-left':'10px', visibility:proBusinessInfo.prjcIfHill==1 ? 'visible' : 'hidden'}"
                   :disabled="disabled" v-model="proBusinessInfo.prjcHillAreaPerc" placeholder="违建比例">
          <el-option
            v-for="item in options['prjcHillAreaPerc']"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>


    <div class="topArea">
      <div class="left">违建描述</div>
      <div class="right">
        <div v-if="bShowTip3" class="tipContainer">
          <p class="tipBubble">注：(位置+现状用途)</p>
        </div>
        <div class="textareaBox">
            <textarea @focus="bShowTip3=true" @blur="bShowTip3=false" :disabled="disabled" name=""
                      v-model="proBusinessInfo.prjcHillDesc" class="decision"
                      placeholder="请输入省+市+区县+路+建筑物名称" :maxlength="300"></textarea>
          <span
            class="statistics">{{proBusinessInfo.prjcHillDesc.length}}/300</span>
        </div>
      </div>
    </div>

    <div class="topArea">
      <div class="left">不利因素</div>
      <div class="right">
        <el-checkbox-group v-model="proBusinessInfo.prjcAdverseFactors">
          <el-checkbox v-for="item in options['prjcAdverseFactors']" :label="item.dictCode" :key="item.dictCode">
            {{item.dictName}}
          </el-checkbox>
        </el-checkbox-group>
        <div class="textareaBox">
            <textarea :disabled="disabled" name="" v-model="proBusinessInfo.prjcAdverseFactorsInfor" class="decision"
                      placeholder="请输入不利因素" :maxlength="300"></textarea>
          <span
            class="statistics">{{proBusinessInfo.prjcAdverseFactorsInfor.length}}/300</span>
        </div>
      </div>
    </div>

    <div class="topArea">
      <div class="left">其它重要信息</div>
      <div class="right">
        <div class="textareaBox">
            <textarea :disabled="disabled" name="" v-model="proBusinessInfo.prjcOtherImportantInformation"
                      class="decision"
                      placeholder="请输入其它重要信息" :maxlength="300"></textarea>
          <span
            class="statistics">{{proBusinessInfo.prjcOtherImportantInformation.length}}/300</span>
        </div>
      </div>
    </div>

    <div class="topArea">
      <div class="left">停车位情况</div>
      <div class="right">
        <div v-if="bShowTip4" class="tipContainer">
          <p class="tipBubble">注：(位置、数量)</p>
        </div>
        <div class="textareaBox">
            <textarea @focus="bShowTip4=true" @blur="bShowTip4=false" :disabled="disabled" name=""
                      v-model="proBusinessInfo.prjcParkingSituation" class="decision"
                      placeholder="请输入停车位情况" :maxlength="300"></textarea>
          <span
            class="statistics">{{proBusinessInfo.prjcParkingSituation.length}}/300</span>
        </div>
      </div>
    </div>

    <div class="topArea">
      <div class="left">电费</div>
      <div class="right">
        <div class="textareaBox">
            <textarea :disabled="disabled" name="" v-model="proBusinessInfo.prjcElectricity" class="decision"
                      placeholder="请输入电费相关信息" :maxlength="300"></textarea>
          <span
            class="statistics">{{proBusinessInfo.prjcElectricity.length}}/300</span>
        </div>
      </div>
    </div>


    <div class="topArea">
      <div class="left">水费</div>
      <div class="right">
        <div class="textareaBox">
            <textarea :disabled="disabled" name="" v-model="proBusinessInfo.prjcWater" class="decision"
                      placeholder="请输入水费相关信息" :maxlength="300"></textarea>
          <span
            class="statistics">{{proBusinessInfo.prjcWater.length}}/300</span>
        </div>
      </div>
    </div>

    <div class="topArea">
      <div class="left">物业费</div>
      <div class="right">
        <div class="textareaBox">
            <textarea :disabled="disabled" name="" v-model="proBusinessInfo.prjcManagementFee" class="decision"
                      placeholder="请输入物业费相关信息" :maxlength="300"></textarea>
          <span
            class="statistics">{{proBusinessInfo.prjcManagementFee.length}}/300</span>
        </div>
      </div>
    </div>

    <div class="topArea">
      <div class="left">物业费管理范围</div>
      <div class="right">
        <div v-if="bShowTip5" class="tipContainer">
          <p class="tipBubble">注：出租方提供的物业服务范围</p>
        </div>
        <div class="textareaBox">
            <textarea @focus="bShowTip5=true" @blur="bShowTip5=false" :disabled="disabled" name=""
                      v-model="proBusinessInfo.prjcScopeOfManagement" class="decision"
                      placeholder="请输入物业费管理范围" :maxlength="300"></textarea>
          <span
            class="statistics">{{proBusinessInfo.prjcScopeOfManagement.length}}/300</span>
        </div>
      </div>
    </div>


    <div class="topArea">
      <div class="left">计划移交时间</div>
      <div class="right">
        <el-date-picker
          :disabled="disabled"
          :editable=false
          value-format="yyyy-MM-dd"
          :default-value="proBusinessInfo.prjcPlanToHandOverTime"
          v-model="dateValue"
          type="date"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
    </div>


    <div style="border-top:1px solid #f9f9f9"></div>


    <p style="font-weight: bold">承租楼栋描述</p>


    <div class="topArea">
      <div class="left">房屋结构</div>
      <div class="right">
        <el-checkbox-group :disabled="disabled" v-model="proBusinessInfo.prjcBuildingStructure">
          <el-checkbox v-for="item in options['prjcBuildingStructure']" :label="item.dictCode" :key="item.dictCode">
            {{item.dictName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>


    <div class="topArea">
      <div class="left">结构加固</div>
      <div class="right">
        <el-checkbox-group :disabled="disabled" v-model="proBusinessInfo.prjcStructural">
          <el-checkbox v-for="item in options['prjcStructural']" :label="item.dictCode" :key="item.dictCode">
            {{item.dictName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <div class="topArea">
      <div class="left">天井</div>
      <div class="right">
        <el-select :disabled="disabled" v-model="proBusinessInfo.prjcPatio" placeholder="请选择">
          <el-option
            v-for="item in options['prjcPatio']"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>


    <div class="topArea">
      <div class="left">外立面</div>
      <div class="right">
        <el-checkbox-group :disabled="disabled" v-model="proBusinessInfo.prjcFacade">
          <el-checkbox v-for="item in options['prjcFacade']" :label="item.dictCode" :key="item.dictCode">
            {{item.dictName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>


    <div class="topArea">
      <div class="left">外立面整改需求</div>
      <div class="right">
        <el-select v-model="proBusinessInfo.prjcFacadeFitNeed" placeholder="请选择">
          <el-option
            v-for="item in options['prjcFacadeFitNeed']"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>


    <div class="topArea">
      <div class="left">现有装修</div>
      <div class="right">
        <el-select v-model="proBusinessInfo.prjcExistingDecorate" placeholder="请选择">
          <el-option
            v-for="item in options['prjcExistingDecorate']"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="topArea">
      <div class="left">外窗现状</div>
      <div class="right">
        <el-checkbox-group :disabled="disabled" v-model="proBusinessInfo.prjcOutsideWindow">
          <el-checkbox v-for="item in options['prjcOutsideWindow']" :label="item.dictCode" :key="item.dictCode">
            {{item.dictName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>


    <div class="topArea">
      <div class="left">外窗更换需求</div>
      <div class="right">
        <el-select v-model="proBusinessInfo.prjcOutsideWindowNeed" placeholder="请选择">
          <el-option
            v-for="item in options['prjcOutsideWindowNeed']"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>


    <div class="topArea">
      <div class="left">供水是否需要增容</div>
      <div class="right">
        <el-radio-group :disabled="disabled" v-model="proBusinessInfo.prjcWaterNeed">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </div>
    </div>


    <div class="topArea">
      <div class="left">供电是否需要增容</div>
      <div class="right">
        <el-radio-group :disabled="disabled" v-model="proBusinessInfo.prjcPowerNeed">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </div>
    </div>


    <div class="topArea">
      <div class="left">是否需要新增排水排污</div>
      <div class="right">
        <el-radio-group :disabled="disabled" v-model="proBusinessInfo.prjcDrainageNeed">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </div>
    </div>


    <div class="topArea">
      <div class="left">集中供热供暖</div>
      <div class="right">
        <el-select :disabled="disabled" v-model="proBusinessInfo.prjcHeatingNeed" placeholder="请选择">
          <el-option
            v-for="item in options['prjcHeatingNeed']"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>


    <div class="topArea">
      <div class="left">空调</div>
      <div class="right">
        <el-checkbox-group :disabled="disabled" v-model="proBusinessInfo.prjcAir">
          <el-checkbox v-for="item in options['prjcAir']" :label="item.dictCode" :key="item.dictCode">
            {{item.dictName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>


    <div class="topArea">
      <div class="left">电梯</div>
      <div class="right">
        <el-select :disabled="disabled" v-model="proBusinessInfo.prjcElevator" placeholder="请选择">
          <el-option
            v-for="item in options['prjcElevator']"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>


    <div class="topArea">
      <div class="left">消防</div>
      <div class="right">
        <el-select :disabled="disabled" v-model="proBusinessInfo.prjcFire" placeholder="请选择">
          <el-option
            v-for="item in options['prjcFire']"
            :key="item.dictCode"
            :label="item.dictName"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </div>
    </div>


    <div class="topArea">
      <div class="left">其它描述</div>
      <div class="right">
        <div class="textareaBox">
            <textarea :disabled="disabled" name="" v-model="proBusinessInfo.prjcOtherDescription" class="decision"
                      placeholder="其它描述" :maxlength="300"></textarea>
          <span
            class="statistics">{{proBusinessInfo.prjcOtherDescription.length}}/300</span>
        </div>
      </div>
    </div>


  </div>


</template>
<script>


  export default {
    name: 'baseInfo',
    props: ['disabled', 'proBusinessInfo', 'options', 'newAddress', 'errors1'],
    data() {
      return {
        bShowTip1: false,
        bShowTip2: false,
        bShowTip3: false,
        bShowTip4: false,
        bShowTip5: false,


        dateValue: this.proBusinessInfo.prjcPlanToHandOverTime,


        loadingA: false,
        reg4: /^(0|[0-9]\d{0,})+(\.\d{1,4})?$/, // 正则校验 :正整数,保留4位小数
        reg6: /^(0|[0-9]\d{0,})+(\.\d{0,})?$/, // 正则校验 :正整数,保留n位小数
        reg2: /^([0-9]\d{0,})+(\.\d{1,2})?$/, // 正则校验 :正整数,保留2位小数


        radio: 1,
        headers: {platform: 'pc', token: localStorage.getItem('token'), version: '1'},
        nameList: [], // 收集文件名
        transactionWay: []

      }
    },

    computed: {},

    watch: {
      newAddress: {
        handler: function (da) {
          //this.proBusinessInfo.lightProjectBaseInfo.address = da[0];
          this.proBusinessInfo.lightProjectBaseInfo.longitude = da[1];
          this.proBusinessInfo.lightProjectBaseInfo.latitude = da[2];
        },
        deep: true
      },
      dateValue: function (da) {
        let year = da.getFullYear();
        let month = da.getMonth() + 1;
        let date = da.getDate();
        date = (date + '').length == 1 ? '0' + date : date;
        this.proBusinessInfo.prjcPlanToHandOverTime = [year, month, date].join('-')
      }
    },


    updated() {

    },


    mounted() {

      this.$emit('switchLoading', true)

    },


    methods: {

      run() {

      },

      /*从projectManagement获取项目地址*/
      getPosition(str) {
        this.proBusinessInfo.lightProjectBaseInfo.address = str[0];
        this.proBusinessInfo.lightProjectBaseInfo.longitude = str[1];
        this.proBusinessInfo.lightProjectBaseInfo.latitude = str[2];
      },


      /*调用projectManggement页面的打点方法*/
      setMark() {
        this.$emit('setMark');
      },


      cloneObj(obj) {
        var str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
          return;
        } else if (window.JSON) {
          str = JSON.stringify(obj), //序列化对象
            newobj = JSON.parse(str); //还原
        } else {//如果不支持以上方法
          for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
          }
        }
        return newobj;
      },


    }
  }
</script>
<style scoped lang="less">
  @tableColor: #E2E2ED;
  @import 'common.less';

  #baseInfo {
    padding: 10px;
    overflow: auto;

    .switchPanel {
      border: 1px solid #67649F;
      border-radius: 30px;
      display: inline-block;
      padding: 1px;
      margin-top: 5px;

      .panel {
        display: inline-block;
        line-height: 33px;
        height: 33px;
        width: 84px;
        border-radius: 24px;
        text-align: center;
        cursor: pointer;
      }
      .panelActive {
        background: #67649F;
        color: #fff;
      }
    }

    .panelContent {
      margin-top: 10px;
    }

    .submitImg {
      /*display: none;*/
      position: absolute;
      left: 10%;
      top: 0;
      /*z-index:2;*/
      top: 42%;
    }

    .proPhoto {

    }

    .tabs el-tabs el-tabs--border-card {
      box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0), 0 0 0px 0 rgba(0, 0, 0, 0);
      border: none;
    }

    .tabs .el-tab-pane {
      height: 300px;
    }

  }


</style>
