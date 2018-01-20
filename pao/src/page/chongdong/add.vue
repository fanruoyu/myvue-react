<template>
  <div class="chongdong view">
    <div class="step">
      <el-steps :active="stepindex" finish-status="success" :align-center="true">
        <el-step v-for="(item,index) in todos" :key="index" :title="item.text"></el-step>
      </el-steps>
    </div>
    <div class="splitline" style="display:none;"></div>
    <div class="main">
      <div class="step1">
        <span class="requied">注：带*的为必输项</span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="165px" class="demo-ruleForm">
          <table>
            <tr>
              <td>
                <el-form-item label="地块编码" prop="blockCode">
                  <el-col :span="20">
                    <el-input :disabled="stepindex!=1" type="blockCode" v-model="ruleForm.blockCode" auto-complete="off"
                              placeholder="项目该地块唯一编码"></el-input>
                  </el-col>
                  <el-col class="line" :span="1"></el-col>

                </el-form-item>
              </td>
              <td>
                <el-form-item label="用地性质" prop="landType">
                  <el-col :span="20">
                  <el-select :disabled="stepindex!=1" typeof="landType" v-model="ruleForm.landType" placeholder="请选择"
                             @change="changeLandType">
                    <el-option
                      v-for="item in labntypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  </el-col>
                  <el-col class="line" :span="1"></el-col>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="地上计容住宅建面占比" prop="groundCapacity" required>
                  <el-col :span="20">
                    <el-input type="groundCapacity" v-model="ruleForm.groundCapacity" auto-complete="off"
                              placeholder="百分比整数，如90" :disabled="stepindex!=1"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">%</el-col>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="总占地面积" prop="totalArea">
                  <el-col :span="20">
                    <el-input type="totalArea" v-model="ruleForm.totalArea" auto-complete="off"
                              :disabled="stepindex!=1"
                              placeholder=">0整数"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">㎡</el-col>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="建设用地面积" prop="buildArea" required>
                  <el-col :span="20">
                    <el-input :class="discrepancy" type="buildArea" v-model="ruleForm.buildArea" auto-complete="off"
                              :disabled="stepindex!=1"
                              placeholder=">0整数"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">㎡</el-col>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="代征土地面积" prop="collectArea">
                  <el-col :span="20">
                    <el-input type="collectArea" v-model="ruleForm.collectArea" auto-complete="off"
                              :disabled="stepindex!=1"
                              placeholder=">=0整数"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">㎡</el-col>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="计容地上建面" prop="designGroundCapacity" required>
                  <el-col :span="20">
                    <el-input :class="discrepancy" type="designGroundCapacity" v-model="ruleForm.designGroundCapacity"
                              :disabled="stepindex!=1"
                              auto-complete="off" placeholder=">0整数"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">㎡</el-col>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="容积率" prop="volumeRate">
                  <el-col :span="20">
                    <el-input type="volumeRate" v-model="ruleForm.volumeRate" auto-complete="off"
                              :disabled="stepindex!=1"
                              placeholder=">0，可保留两位小数"></el-input>
                  </el-col>
                  <el-col class="line" :span="1"></el-col>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="控制高度" prop="controlHeight" required>
                  <el-col :span="20">
                    <el-input type="controlHeight" v-model="ruleForm.controlHeight" auto-complete="off"
                              :disabled="stepindex!=1"
                              placeholder=">0，可保留两位小数"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">m</el-col>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="绿地率" prop="greenbeltRate">
                  <el-col :span="20">
                    <el-input type="greenbeltRate" v-model="ruleForm.greenbeltRate" auto-complete="off"
                              :disabled="stepindex!=1"
                              placeholder="百分比整数，如90"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">%</el-col>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="建筑密度" prop="buildingDensity" required>
                  <el-col :span="20">
                    <el-input type="buildingDensity" v-model="ruleForm.buildingDensity" auto-complete="off"
                              :disabled="stepindex!=1"
                              placeholder=">百分比整数，如90"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">%</el-col>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="配套占比" prop="matchProportion" required>
                  <el-col :span="20">
                    <el-input type="matchProportion" v-model="ruleForm.matchProportion" auto-complete="off"
                              :disabled="stepindex!=1"
                              placeholder="百分比后两位，如90.01"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">%</el-col>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="高层退界面积" prop="upperBoundArea">
                  <el-col :span="20">
                    <el-input type="upperBoundArea" v-model="ruleForm.upperBoundArea" auto-complete="off"
                              :disabled="stepindex!=1"
                              placeholder=">0整数"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">㎡</el-col>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="多层退界面积" prop="multilArea">
                  <el-col :span="20">
                    <el-input type="multilArea" v-model="ruleForm.multilArea" auto-complete="off"
                              :disabled="stepindex!=1"
                              placeholder=">0整数"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">㎡</el-col>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="日照退界后用地面积" prop="sunshineArea">
                  <el-col :span="20">
                    <el-input type="sunshineArea" v-model="ruleForm.sunshineArea" auto-complete="off"
                              :disabled="stepindex!=1"
                              placeholder=">0整数"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">㎡</el-col>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-form-item label="商业用地扣除后面积" prop="deductionBusiArea">
                  <el-col :span="20">
                    <el-input type="deductionBusiArea" v-model="ruleForm.deductionBusiArea" auto-complete="off"
                              :disabled="stepindex!=1"
                              placeholder=">0整数"></el-input>
                  </el-col>
                  <el-col class="line" :span="1">㎡</el-col>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
      </div>
      <div class="splitline" v-show="stepindex>1"></div>
      <div class="step2" v-show="stepindex>1">
        <el-form :model="ruleForm2" ref="ruleForm2" label-width="110px" class="demo-ruleForm">
          <table cellspacing="20" style="border-collapse:separate; border-spacing:0px 0px;">
            <tr>
              <td>
                <el-col :span="1">
                  <span class="rule-text required"></span>
                </el-col>
                <el-form-item label="地区公司" prop="companyId">
                  <el-col :span="19">
                    <el-select type="companyId" v-model="ruleForm2.companyId" placeholder="请选择"
                               :disabled="stepindex!=2">
                      <el-option
                        v-for="item in companyOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col class="line" :span="1"></el-col>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
                <el-col :span="1">
                  <span class="rule-text required"></span>
                </el-col>
                <el-form-item  label="业态选择" prop="modeSelectCode">

                  <el-col :span="19">
                    <el-select v-model="ruleForm2.modeSelectCode" multiple placeholder="请选择" style="width: 500px"
                               @change="selectCodeMode(value)" :disabled="stepindex!=2">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </td>
            </tr>
            <tr class="fangan-list">
              <td>
                <el-form-item label="各业态容积率取值" required label-width="150px">
                  <el-col :span="20">
                    <table border="0" cellspacing="1" cellpadding="0" style="border: 1px solid rgb(190, 203, 217)">
                      <tr v-show="step2data[0].show">
                        <td style="width: 100px;height: 70px;text-align: center">{{step2data[0].name}}</td>
                        <td style="width: 580px;height: 70px;padding-top: 10px;">
                          <div style="float:left">
                            <el-input v-model="ruleForm2.modeVolumeRate1st" style="width: 70px;margin-left: 10px;"
                                      :disabled="stepindex!=2"></el-input>
                            <div class="demonstration" style="width: 70px;margin-left: 20px;">开始值</div>
                          </div>
                          <div style="float:left;margin-left: 90px;margin-right: 85px;">
                            <el-input type="modeVolumeRate1" v-model="ruleForm2.modeVolumeRate1"
                                      style="width: 70px;margin-left: 10px;" :disabled="stepindex!=2"></el-input>
                            <div class="demonstration" style="width: 70px;margin-left: 20px;">经验值</div>
                          </div>
                          <div style="float:left">
                            <el-input v-model="ruleForm2.modeVolumeRate1en" style="width: 70px;margin-left: 10px;"
                                      :disabled="stepindex!=2"></el-input>
                            <div class="demonstration" style="width: 70px;margin-left: 20px;">结束值</div>
                          </div>
                        </td>
                      </tr>
                      <tr v-show="step2data[1].show">
                        <td style="width: 100px;height: 70px;text-align: center">{{step2data[1].name}}</td>
                        <td style="width: 580px;height: 70px;padding-top: 10px;">
                          <div style="float:left">
                            <el-input v-model="ruleForm2.modeVolumeRate2st" style="width: 70px;margin-left: 10px;"
                                      :disabled="stepindex!=2"></el-input>
                            <div class="demonstration" style="width: 70px;margin-left: 20px;">开始值</div>
                          </div>
                          <div style="float:left;margin-left: 90px;margin-right: 85px;">
                            <el-input v-model="ruleForm2.modeVolumeRate2" style="width: 70px;margin-left: 10px;"
                                      :disabled="stepindex!=2"></el-input>
                            <div class="demonstration" style="width: 70px;margin-left: 20px;">经验值</div>
                          </div>
                          <div style="float:left">
                            <el-input v-model="ruleForm2.modeVolumeRate2en" style="width: 70px;margin-left: 10px;"
                                      :disabled="stepindex!=2"></el-input>
                            <div class="demonstration" style="width: 70px;margin-left: 20px;">结束值</div>
                          </div>
                        </td>
                      </tr>
                      <tr v-show="step2data[2].show">
                        <td style="width: 100px;height: 70px;text-align: center">{{step2data[2].name}}</td>
                        <td style="width: 580px;height: 70px;padding-top: 10px;">
                          <div style="float:left">
                            <el-input v-model="ruleForm2.modeVolumeRate3st" style="width: 70px;margin-left: 10px;"
                                      :disabled="stepindex!=2"></el-input>
                            <div class="demonstration" style="width: 70px;margin-left: 20px;font-size: 10px">开始值</div>
                          </div>
                          <div style="float:left;margin-left: 90px;margin-right: 85px;">
                            <el-input v-model="ruleForm2.modeVolumeRate3" style="width: 70px;margin-left: 10px;"
                                      :disabled="stepindex!=2"></el-input>
                            <div class="demonstration" style="width: 70px;margin-left: 20px;">经验值</div>
                          </div>
                          <div style="float:left">
                            <el-input v-model="ruleForm2.modeVolumeRate3en" style="width: 70px;margin-left: 10px;"
                                      :disabled="stepindex!=2"></el-input>
                            <div class="demonstration" style="width: 70px;margin-left: 20px;">结束值</div>
                          </div>
                        </td>
                      </tr>
                      <tr v-show="step2data[3].show">
                        <td style="width: 100px;height: 70px;text-align: center">{{step2data[3].name}}</td>
                        <td style="width: 580px;height: 70px;padding-top: 10px;">
                          <div style="float:left">
                            <el-input v-model="ruleForm2.modeVolumeRate4st" style="width: 70px;margin-left: 10px;"
                                      :disabled="stepindex!=2"></el-input>
                            <div class="demonstration" style="width: 70px;margin-left: 20px;">开始值</div>
                          </div>
                          <div style="float:left;margin-left: 90px;margin-right: 85px;">
                            <el-input v-model="ruleForm2.modeVolumeRate4" style="width: 70px;margin-left: 10px;"
                                      :disabled="stepindex!=2"></el-input>
                            <div class="demonstration" style="width: 70px;margin-left: 20px;">经验值</div>
                          </div>
                          <div style="float:left">
                            <el-input v-model="ruleForm2.modeVolumeRate4en" style="width: 70px;margin-left: 10px;"
                                      :disabled="stepindex!=2"></el-input>
                            <div class="demonstration" style="width: 70px;margin-left: 20px;">结束值</div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </el-col>
                </el-form-item>
              </td>
            </tr>

          </table>
        </el-form>
        <span class="errmsg">{{errmsg}}</span>
      </div>
      <div class="splitline" v-show="stepindex>2"></div>
      <div class="step3" v-show="stepindex>2">
        <table style="border-collapse:separate; border-spacing:12px 10px;">
          <tr>
            <td v-show="step3data[0].show" class="required">高层层数</td>
            <td v-show="step3data[0].show">
              <el-input @blur="threeBlur(1)" v-model="modeFloorNumber1" style="width: 70px;float: left"
                        :disabled="stepindex!=3"></el-input>

            </td>
            <td v-show="step3data[0].show">层</td>
            <td v-show="step3data[1].show" class="required">洋房层数</td>
            <td v-show="step3data[1].show">
              <el-input @blur="threeBlur(2)" v-model="modeFloorNumber2" style="width: 70px;float: left"
                        :disabled="stepindex!=3"></el-input>

            </td>
            <td v-show="step3data[1].show">层</td>
            <td v-show="step3data[2].show" class="required">4叠层数</td>
            <td v-show="step3data[2].show">
              <el-input @blur="threeBlur(3)" v-model="modeFloorNumber3" style="width: 70px;float: left"
                        :disabled="stepindex!=3"></el-input>

            </td>
            <td v-show="step3data[2].show">层</td>
            <td v-show="step3data[3].show" class="required">联排层数</td>
            <td v-show="step3data[3].show">
              <el-input @blur="threeBlur(4)" v-model="modeFloorNumber4" style="width: 70px;float: left"
                        :disabled="stepindex!=3"></el-input>

            </td>
            <td v-show="step3data[3].show">层</td>
          </tr>
          <tr>
            <td v-show="step3data[0].show" class="required">高层单价</td>
            <td v-show="step3data[0].show">
              <el-input @blur="threeBlur(5)" v-model="modeSelectPrice1" style="width: 70px;float: left"
                        :disabled="stepindex!=3"></el-input>

            </td>
            <td v-show="step3data[0].show">万元／㎡</td>
            <td v-show="step3data[1].show" class="required">洋房单价</td>
            <td v-show="step3data[1].show">
              <el-input @blur="threeBlur(6)" v-model="modeSelectPrice2" style="width: 70px;float: left"
                        :disabled="stepindex!=3"></el-input>
            </td>
            <td v-show="step3data[1].show">万元／㎡</td>
            <td v-show="step3data[2].show" class="required">4叠单价</td>
            <td v-show="step3data[2].show">
              <el-input @blur="threeBlur(7)" v-model="modeSelectPrice3" style="width: 70px;float: left"
                        :disabled="stepindex!=3"></el-input>
            </td>
            <td v-show="step3data[2].show">万元／㎡</td>
            <td v-show="step3data[3].show" class="required">联排单价</td>
            <td v-show="step3data[3].show">
              <el-input @blur="threeBlur(8)" v-model="modeSelectPrice4" style="width: 70px;float: left"
                        :disabled="stepindex!=3"></el-input>

            </td>
            <td v-show="step3data[3].show">万元／㎡</td>
          </tr>
        </table>
         <ul class="ug-errmsg">
            <li>{{errmsg1}}</li>
            <li>{{errmsg2}}</li>
            <li>{{errmsg3}}</li>
            <li>{{errmsg4}}</li>
            <li>{{errmsg5}}</li>
            <li>{{errmsg6}}</li>
            <li>{{errmsg7}}</li>
            <li>{{errmsg8}}</li>
          </ul>
      </div>
    </div>
    <div class="btns">
      <button id="skipstart" v-on:click="skipstart" v-show="stepindex>1">取消</button>
      <button id="submit" v-on:click="submityuan" v-show="stepindex==3">提交生成预案</button>
      <button id="nextBtn" v-on:click="nextStep" v-show="stepindex!=3">下一步</button>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    //可以为空 也可以是正整数,保留两位小数
    var checkNumNullcan = (rule, value, callback) => {
      var reg = /^\d+(\.\d{1,2})?$/; //正则校验 :正整数,保留两位小数
      if (value != "" && !reg.test(value)) {
        callback(new Error("请输入正整数或保留两位小数 "));
      }else{
        callback()
      }
      //value为空
      if (!value) {
        callback();
      }
    };
    //必须是正数,保留小数点后两位
    var checkPositiveNum = (rule, value, callback) => {
      var reg = /^\d+(\.\d{1,2})?$/; //正则校验 :正数,保留两位小数
      if (!reg.test(value)) {
        callback(new Error("请输入正整数或保留两位小数"));
      }else{
        callback()
      }
    };
    //可以为空 也可以是正整数
    var checkNumOrNullcan = (rule, value, callback) => {
      var reg = /^\d+$/; //正则校验 :必须是正整数
      if (value != "" && !reg.test(value)) {
        callback(new Error("请输入正整数"));
      }else{
        callback()
      }
      if (!value) {
        callback();
      }
    };
    //必须是正整数
    var checkNum = (rule, value, callback) => {
      var reg = /^\d+$/; //正则校验 :必须是正整数
      if (!reg.test(value)) {
        callback(new Error("请输入正整数"));
      }else{
        callback()
      }
    };
    //验证地块编码
    var checkBlockCode = (rule, value, callback) => {
      let regEn = /^.{0,50}$/;//验证地块编码长度不超过50位
      if (value != "" && !regEn.test(value)) {
        callback(new Error("地块编码不合法"));
      } else {
        callback();
      }
    };
    return {
      labntypeOptions: [
        {
          value: "1",
          label: "住宅用地"
        },
        {
          value: "2",
          label: "商业用地"
        },
        {
          value: "3",
          label: "住宅商业混合用地"
        },
        {
          value: "4",
          label: "商办用地"
        }
      ],
      errmsg1: "",
      errmsg2: "",
      errmsg3: "",
      errmsg4: "",
      errmsg5: "",
      errmsg6: "",
      errmsg7: "",
      errmsg8: "",
      //判断地上计容建面与建设用地面积比值信息
      discrepancy:"",
      errmsg:"",
      companyOptions: [
        {
          value: "1",
          label: "杭州"
        }
      ],
      options: [
        {
          value: "1",
          label: "高层"
        },
        {
          value: "2",
          label: "洋房"
        },
        {
          value: "3",
          label: "4叠"
        },
        {
          value: "4",
          label: "联排"
        }
      ],
      step2data: [
        { st: 22, en: 56, index: 1, show: false, name: "高层" },
        { st: 17, en: 20, index: 2, show: false, name: "洋房" },
        { st: 10, en: 13, index: 3, show: false, name: "4叠" },
        { st: 6, en: 8, index: 4, show: false, name: "联排" }
      ],
      step3data: [
        { st: 22, en: 56, index: 1, show: false, name: "高层" },
        { st: 17, en: 20, index: 2, show: false, name: "洋房" },
        { st: 10, en: 13, index: 3, show: false, name: "4叠" },
        { st: 6, en: 8, index: 4, show: false, name: "联排" }
      ],
      value: "",
      todos: [
        { text: "地块信息", num: "1" },
        { text: "地区业态经验容积率", num: "2" },
        { text: "业态对应均价", num: "3" },
        { text: "生成预案", num: "4" }
      ],
      submitflag: false,
      stepindex: 1,
      ruleForm: {
        blockCode: "", // 地块编码
        landType: "", // 用地性质
        landTypeName: "", // 用地性质
        groundCapacity: "", // 地上计容住宅建面
        totalArea: "", // 总占地面积
        buildArea: "", // 建设用地面积
        collectArea: "", // 代征土地面积
        designGroundCapacity: "", // 计容地上建面
        volumeRate: "", // 容积率
        controlHeight: "", // 控制高度
        greenbeltRate: "", // 绿地率
        buildingDensity: "", // 建筑密度
        matchProportion: "", // 配套占比
        upperBoundArea: "", // 高层退界面积
        multilArea: "", // 多层退界面积
        sunshineArea: "", // 日照退界后用地面
        deductionBusiArea: "", // 商业用地扣除后面积
        rate1: "",
        rate2: "",
        rate3: "",
        rate4: ""
      },
      ruleForm2: {
        companyId: "",
        companyName: "",
        modeCode: "",
        modeName: "",
        modeSelectCode:[],
        modeVolumeRate1: "",
        modeVolumeRate2: "",
        modeVolumeRate3: "",
        modeVolumeRate4: "",
        modeVolumeRate1st: "2.2",
        modeVolumeRate1en: "5.6",
        modeVolumeRate2st: "1.7",
        modeVolumeRate2en: "2.0",
        modeVolumeRate3st: "1.0",
        modeVolumeRate3en: "1.3",
        modeVolumeRate4st: "0.6",
        modeVolumeRate4en: "0.8"
      },
      modeFloorNumber1: "",
      modeFloorNumber2: "",
      modeFloorNumber3: "",
      modeFloorNumber4: "",
      modeSelectPrice1: "",
      modeSelectPrice2: "",
      modeSelectPrice3: "",
      modeSelectPrice4: "",
      rules: {
        groundCapacity: [
          { validator: checkPositiveNum, trigger: "blur" },
          { required: true, message: "请输入数字" }
        ],
        totalArea: [
          { validator: checkNumOrNullcan, trigger: "blur" },
          {message: "请输入数字" }
        ],
        buildArea: [
          { validator: checkNum, trigger: "blur" },
          { required: true, message: "请输入数字" }
        ],
        collectArea: [
          { validator: checkNumOrNullcan, trigger: "blur" },
          {message: "请输入数字" }
        ],
        designGroundCapacity: [
          { validator: checkNum, trigger: "blur" },
          { required: true, message: "请输入数字" }
        ],
        greenbeltRate: [
          { validator: checkNumOrNullcan, trigger: "blur" },
          { message: "请输入数字" }
        ],
        buildingDensity: [
          { validator: checkNum, trigger: "blur" },
          { required: true, message: "请输入数字" }
        ],
        upperBoundArea: [
          { validator: checkNumOrNullcan, trigger: "blur" },
          { message: "请输入数字" }
        ],
        multilArea: [
          { validator: checkNumOrNullcan, trigger: "blur" },
          { message: "请输入数字" }
        ],
        sunshineArea: [
          { validator: checkNumOrNullcan, trigger: "blur" },
          { message: "请输入数字" }
        ],
        deductionBusiArea: [
          { validator: checkNumOrNullcan, trigger: "blur" },
          { message: "请输入数字" }
        ],
        controlHeight: [
          { validator: checkPositiveNum, trigger: "blur" },
          { message: "请输入数字" }
        ],
        volumeRate: [
          { validator: checkNumNullcan, trigger: "blur" },
          { message: "请输入数字" }
        ],
        matchProportion: [
          { validator: checkPositiveNum, trigger: "blur" },
          { required: true, message: "请输入数字" }
        ],
        blockCode: [{ validator: checkBlockCode, trigger: "blur" }],

      }
    };
  },
  methods: {
    //三层失焦验证
    threeBlur(val) {
      var regLayer = /^\d+$/; //正则校验 :必须是正整数
      var regPrice = /^\d+(\.\d{1})?$/;//正则验证:正数保留一位小数
        switch(val){
          case 1 :if (this.modeFloorNumber1 != "" && !regLayer.test(this.modeFloorNumber1)) {
            this.errmsg1="高层楼层必须为正整数";
          }else{
            this.errmsg1="";
          }
          break;
          case 2 :if (this.modeFloorNumber2 != "" && !regLayer.test(this.modeFloorNumber2)) {
            this.errmsg2="洋房楼层必须为正整数";
          }else{
            this.errmsg2="";
          }
          break;
          case 3 :if (this.modeFloorNumber3 != "" && !regLayer.test(this.modeFloorNumber3)) {
            this.errmsg3="4叠楼层必须为正整数";
          }else{
            this.errmsg3="";
          }
          break;
          case 4 : if (this.modeFloorNumber4 != "" && !regLayer.test(this.modeFloorNumber4)) {
            this.errmsg4="联排楼层必须为正整数";
          }else{
            this.errmsg4="";
          }
          break;
          case 5 :if (this.modeSelectPrice1 != "" && !regPrice.test(this.modeSelectPrice1)) {
            this.errmsg5="高层楼层均价必须是正数,保留一位小数";
          }else{
            this.errmsg5="";
          }
          break;
          case 6 :if (this.modeSelectPrice2 != "" && !regPrice.test(this.modeSelectPrice2)) {
            this.errmsg6="洋房楼层均价必须是正数,保留一位小数";
          }else{
            this.errmsg6="";
          }
          break;
          case 7 :if (this.modeSelectPrice3 != "" && !regPrice.test(this.modeSelectPrice3)) {
            this.errmsg7="4叠楼层均价必须是正数,保留一位小数";
          }else{
            this.errmsg7="";
          }
          break;
          case 8 :if (this.modeSelectPrice4 != "" && !regPrice.test(this.modeSelectPrice4)) {
            this.errmsg8="联排楼层均价必须是正数,保留一位小数";
          }else{
            this.errmsg8="";
          }
          break;
        }
    },
    changeLandType(val) {
      this.ruleForm.landTypeName = this.labntypeOptions[
        parseInt(val) - 1
      ].label;
    },
    submitForm(formName) {
      console.log(formName)
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.submitflag = true;
        } else {
          console.log("error submit!!");
          that.submitflag = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    selectCodeMode: function(value) {
      for (var i = 0; i < this.step2data.length; i++) {
        this.step2data[i].show = false;
      }
      for (i = 0; i < this.ruleForm2.modeSelectCode.length; i++) {
        this.step2data[this.ruleForm2.modeSelectCode[i] - 1].show = true;
      }
      for (i = 0; i < this.step3data.length; i++) {
        this.step3data[i].show = false;
      }
      for (i = 0; i < this.ruleForm2.modeSelectCode.length; i++) {
        this.step3data[this.ruleForm2.modeSelectCode[i] - 1].show = true;
      }
    },
    formatTooltip(val) {
      return val / 10;
    },
    change() {
      alert(121);
    },
    nextStep: function() {
      if (this.stepindex === 1) {
        if (
          this.ruleForm.totalArea * 1 !==
          this.ruleForm.buildArea * 1 + this.ruleForm.collectArea * 1
        ) {
          alert("总占地面积必须为建设用地面积和代征土地面积的和");
          return;
        }
        if (
          this.ruleForm.controlHeight <=40
        ) {
          this.ruleForm2.modeVolumeRate1st = "2.2";
          this.ruleForm2.modeVolumeRate1en = "2.6";
        }
        if (
          this.ruleForm.controlHeight > 40 &&
          this.ruleForm.controlHeight <= 60
        ) {
          this.ruleForm2.modeVolumeRate1st = "2.7";
          this.ruleForm2.modeVolumeRate1en = "3.5";
        }
        if (
          this.ruleForm.controlHeight > 60 &&
          this.ruleForm.controlHeight <= 80
        ) {
          this.ruleForm2.modeVolumeRate1st = "3.6";
          this.ruleForm2.modeVolumeRate1en = "4.0";
        }
        if (this.ruleForm.controlHeight > 80) {
          this.ruleForm2.modeVolumeRate1st = "4.0";
          this.ruleForm2.modeVolumeRate1en = "5.6";
        }
        this.discrepancy="";
      }
      if (this.stepindex === 2) {
        if (this.ruleForm2.companyId === "") {
          alert("请选择公司");
          return;
        }
        var a=this.ruleForm2.modeVolumeRate1*1;
        var b=this.ruleForm2.modeVolumeRate2*1;
        var c=this.ruleForm2.modeVolumeRate3*1;
        var d=this.ruleForm2.modeVolumeRate4*1;
        var min=Math.min(a,b,c,d);
        var max=Math.max(a,b,c,d);
        if(this.ruleForm.designGroundCapacity/this.ruleForm.buildArea<min||this.ruleForm.designGroundCapacity/this.ruleForm.buildArea>max){
          this.errmsg="计容地上面建面和建设用地面积的比值应在各业态选取的容积率值得范围内,请取消并更正面积数";
          this.discrepancy="discrepancy";
          return;
        }else{
          this.errmsg="";
          this.discrepancy="";
        }
        if (this.ruleForm2.modeSelectCode.length < 1) {
          alert("请选择业态值");
          return;
        }
        for (var i = 0; i < this.ruleForm2.modeSelectCode.length; i++) {
          if (this.ruleForm2.modeSelectCode[i] == 1) {
            if (this.ruleForm2.modeVolumeRate1 == "") {
              alert("请选择经验值");
              return;
            }
          }
          if (this.ruleForm2.modeSelectCode[i] == 2) {
            if (this.ruleForm2.modeVolumeRate2 == "") {
              alert("请选择经验值");
              return;
            }
          }
          if (this.ruleForm2.modeSelectCode[i] == 3) {
            if (this.ruleForm2.modeVolumeRate3 == "") {
              alert("请选择经验值");
              return;
            }
          }
          if (this.ruleForm2.modeSelectCode[i] == 4) {
            if (this.ruleForm2.modeVolumeRate4 == "") {
              alert("请选择经验值");
              return;
            }
          }
        }
        var msg = [];
        if (this.ruleForm2.modeVolumeRate1 !== "") {
          if (
            parseFloat(this.ruleForm2.modeVolumeRate1) <
              parseFloat(this.ruleForm2.modeVolumeRate1st) ||
            parseFloat(this.ruleForm2.modeVolumeRate1) >
              parseFloat(this.ruleForm2.modeVolumeRate1en)
          ) {
            msg.push("高层的容积率");
          }
        }
        if (this.ruleForm2.modeVolumeRate2 !== "") {
          if (
            parseFloat(this.ruleForm2.modeVolumeRate2) <
              parseFloat(this.ruleForm2.modeVolumeRate2st) ||
            parseFloat(this.ruleForm2.modeVolumeRate2) >
              parseFloat(this.ruleForm2.modeVolumeRate2en)
          ) {
            msg.push("洋房的容积率");
          }
        }
        if (this.ruleForm2.modeVolumeRate3 !== "") {
          if (
            parseFloat(this.ruleForm2.modeVolumeRate3) <
              parseFloat(this.ruleForm2.modeVolumeRate3st) ||
            parseFloat(this.ruleForm2.modeVolumeRate3) >
              parseFloat(this.ruleForm2.modeVolumeRate3en)
          ) {
            msg.push("4叠的容积率");
          }
        }
        if (this.ruleForm2.modeVolumeRate4 !== "") {
          if (
            parseFloat(this.ruleForm2.modeVolumeRate4) <
              parseFloat(this.ruleForm2.modeVolumeRate4st) ||
            parseFloat(this.ruleForm2.modeVolumeRate4) >
              parseFloat(this.ruleForm2.modeVolumeRate4en)
          ) {
            msg.push("联排的容积率");
          }
        }
        if (msg.length > 0) {
          msg = msg.join(",") + "必须在开始和结束范围之内";
          alert(msg);
          return;
        }
        let reg=/^\d+(\.\d{1})?$/;//正则验证:正数保留一位小数
        if(!(reg.test(a)&&reg.test(b)&&reg.test(c)&&reg.test(d))){
          alert("业态容积率必须为正数,保留一位小数");
          return;
        }
      }
      this.submitForm("ruleForm" + this.stepindex);
      if (this.submitflag) {
        if (this.stepindex < this.todos.length) {
          this.stepindex = this.stepindex + 1;
        }
      }
    },
    prevStep: function() {
      this.resetForm("ruleForm1");
      if (this.stepindex > 1) {
        this.stepindex = this.stepindex - 1;
      }
    },
    skipstart: function() {
      this.stepindex = 1;

      this.errmsg="";
      this.ruleForm2.modeSelectCode=[];
      this.ruleForm2.companyId = "";
      this.ruleForm2.companyName = "";
      this.ruleForm2.modeCode = "";
      this.ruleForm2.modeName = "";
      this.ruleForm2.modeVolumeRate1 = "";
      this.ruleForm2.modeVolumeRate2 = "";
      this.ruleForm2.modeVolumeRate3 = "";
      this.ruleForm2.modeVolumeRate4 = "";
      this.modeFloorNumber1 = "";
      this.modeFloorNumber2 = "";
      this.modeFloorNumber3 = "";
      this.modeFloorNumber4 = "";
      this.modeSelectPrice1 = "";
      this.modeSelectPrice2 = "";
      this.modeSelectPrice3 = "";
      this.modeSelectPrice4 = "";
      this.resetForm("formName2")
    },
    submityuan: function() {
      //验证
      if (this.stepindex === 3) {
        if(this.errmsg1||this.errmsg2||this.errmsg3||this.errmsg4||this.errmsg5||this.errmsg6||this.errmsg7||this.errmsg8){
          alert(this.errmsg1 + this.errmsg2 + this.errmsg3+ this.errmsg4 +this.errmsg5 +this.errmsg6+ this.errmsg7 +this.errmsg8)
          return;
        }
        for (var i = 0; i < this.step3data.length; i++) {
          if (this.step3data[i].show && this.step3data[i].index == 1) {
            if (this.modeFloorNumber1 == "" || this.modeSelectPrice1 == "") {
              alert("请填写楼层与均价");
              return;
            }
          }
          if (this.step3data[i].show && this.step3data[i].index == 2) {
            if (this.modeFloorNumber2 == "" || this.modeSelectPrice2 == "") {
              alert("请填写楼层与均价");
              return;
            }
          }
          if (this.step3data[i].show && this.step3data[i].index == 3) {
            if (this.modeFloorNumber3 == "" || this.modeSelectPrice3 == "") {
              alert("请填写楼层与均价");
              return;
            }
          }
          if (this.step3data[i].show && this.step3data[i].index == 4) {
            if (this.modeFloorNumber4 == "" || this.modeSelectPrice4 == "") {
              alert("请填写楼层与均价");
              return;
            }
          }
        }
      }
      // 提交预案信息
      this.searchData();
      this.stepindex = 1;
      this.$router.push({ name: "measured", params: { userId: true } });
    },
    searchData() {
      var modeSelectArr = this.ruleForm2.modeSelectCode.sort();
      var modeSelectName = [];
      var modeVolumeRate = [];
      var modeFloorNumber = [];
      var modeSelectPrice = [];
      for (var i = 0; i < modeSelectArr.length; i++) {
        if (modeSelectArr[i] === "1") {
          modeSelectName.push(this.options[0].label);
          modeVolumeRate.push(this.ruleForm2.modeVolumeRate1);
          modeFloorNumber.push(this.modeFloorNumber1);
          modeSelectPrice.push(this.modeSelectPrice1);
        }
        if (modeSelectArr[i] === "2") {
          modeSelectName.push(this.options[1].label);
          modeVolumeRate.push(this.ruleForm2.modeVolumeRate2);
          modeFloorNumber.push(this.modeFloorNumber2);
          modeSelectPrice.push(this.modeSelectPrice2);
        }
        if (modeSelectArr[i] === "3") {
          modeSelectName.push(this.options[2].label);
          modeVolumeRate.push(this.ruleForm2.modeVolumeRate3);
          modeFloorNumber.push(this.modeFloorNumber3);
          modeSelectPrice.push(this.modeSelectPrice3);
        }
        if (modeSelectArr[i] === "4") {
          modeSelectName.push(this.options[3].label);
          modeVolumeRate.push(this.ruleForm2.modeVolumeRate4);
          modeFloorNumber.push(this.modeFloorNumber4);
          modeSelectPrice.push(this.modeSelectPrice4);
        }
      }

      this.$http({
        method: "POST",
        url: "longcity/services/v1/developPlan/save",
        data: {
          blockCode: this.ruleForm.blockCode,
          landType: this.ruleForm.landType,
          landTypeName: this.ruleForm.landTypeName,
          groundCapacity: this.ruleForm.groundCapacity,
          totalArea: this.ruleForm.totalArea,
          buildArea: this.ruleForm.buildArea,
          collectArea: this.ruleForm.collectArea,
          designGroundCapacity: this.ruleForm.designGroundCapacity,
          volumeRate: this.ruleForm.volumeRate,
          controlHeight: this.ruleForm.controlHeight,
          greenbeltRate: this.ruleForm.greenbeltRate,
          buildingDensity: this.ruleForm.buildingDensity,
          matchProportion: this.ruleForm.matchProportion,
          upperBoundArea: this.ruleForm.upperBoundArea,
          multilArea: this.ruleForm.multilArea,
          sunshineArea: this.ruleForm.sunshineArea,
          deductionBusiArea: this.ruleForm.deductionBusiArea,
          cityCode: this.ruleForm2.companyId,
          cityName: "杭州",
          modeSelectNumber: this.ruleForm2.modeSelectCode.length, // 选择的业态数
          modeSelectCode: this.ruleForm2.modeSelectCode.sort().join(","), // 选择的业态编码
          modeSelectName: modeSelectName.join(","), // 选择的业态名字
          modeVolumeRate: modeVolumeRate.join(","), // 业态容积率
          modeFloorNumber: modeFloorNumber.join(","), // 业态楼层数
          modeSelectPrice: modeSelectPrice.join(",") // 业态单价
        },
        headers: {"platform": "pc", "token": localStorage.getItem('token'), 'version': '1'},
        emulateJSON: true
      }).then(
        resp => {
          if (resp.data.code === 200) {
            console.log(resp.data.code);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>
<style scoped>
.chongdong{
  background:#fff;
}
.step {
  margin: 30px 0px 30px 100px;
  width: 90%;
  background:#fff;
}

/* .el-steps{
  box-sizing: border-box;
  padding-left:50px;
} */
/* .el-input{
  width:140px;
} */
.required:before{
  content:"*";
  color:red;
  margin-right:4px;
}
.step1 {
  width: 98%;
  margin: 10px 10px 20px 10px;
}
.step2{
  margin: 30px 10px 20px 10px;
}
.step3{
  margin: 20px 10px 20px 10px;
  padding-bottom:25px;
}
.btns {
  float: right;
  margin-right:30px;
  background:#fff;
}
.el-col-1{
  /* width:166px; */
  margin-left:4px;
}
/* 样式修改右对齐 */
/*.el-form-item__label{
  text-align: left;
}
 .el-form-item.is-required .el-form-item__label:before{
  content:"";
}
.el-form-item.is-required .el-form-item__label:after{
  content:"*";
  color: #ff4949;
  margin-left: 2px;
} */
.requied {
  display: block;
  width:165px;
  text-align: right;
  box-sizing: border-box;
  padding-right:12px;
  margin-bottom:10px;
  color: red;
}
.ug-errmsg li{
  color:red;
}
/* 判断地上计容建面与建设用地面积比值信息不符 */
.errmsg{
  display: block;
  text-align: left;
  box-sizing: border-box;
  padding-left: 140px;
  margin-bottom:10px;
  color:red;
}
.discrepancy{
  border: 1px solid red;
  border-radius: 4px;
}

/*按钮样式*/
button {
  position: relative;
  top:-20px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  text-align: center;
  min-width: 150px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  background-color: #67649f;
}

.fangan-list table td {
  border: 1px solid #becbd9;
}
.rule-text{
  position: relative;
  left: 60px;
  top: 5px;
}
@import "add.css";
</style>
