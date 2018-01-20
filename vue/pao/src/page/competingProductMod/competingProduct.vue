<template>
  <div id="competingProduct">
    <div class="newProject " :gutter="20">
      <el-row justify="center">
        <!--<div class="newProject-title">-->
        <!--<div class="survey">-->
        <!--<p>{{ruleForm2.name}}</p>-->
        <!--<div class="btn">-->
        <!--<el-button   type="primary" @click="theCancelPopup">关闭</el-button>-->
        <!--<el-button   v-if="btnNone"  type="" @click="subCompetingProduct"  :plain="true" class="">保存</el-button>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="closeNav">
          <p class=" tit fl" :title="ruleForm2.name">{{ruleForm2.name}}</p>
          <div v-if="btnNone==true">
            <span class="closeButton fl" @click="theCancelPopup">关闭</span>
            <span class="saveButton fl"  @click="subCompetingProduct">保存</span>
          </div>
          <div v-else="btnNone==false">
            <span class="closeButton fr" @click="theCancelPopup">关闭</span>
          </div>
        </div>
        <div  id="conMod">
          <div class="competingProduct-body">
            <el-col :span="23">
              <el-form :model="ruleForm2" status-icon ref="ruleForm2" :rules="rules2" label-width="120px" class="demo-ruleForm" >
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="项目基本信息" class="basicProjectInformation" name="first">
                    <div style="height: 150px;" status-icon  label-width="100px" class="demo-ruleForm form" >
                      <el-form-item label="项目名称" prop="name" class="proAddress mandatory01">
                        <el-input :disabled="disabledFlag"  :maxlength="140" placeholder="市+区县+街道+道路名或地标名+出让编号（说明：实际名称中不要加号" v-model="ruleForm2.name"></el-input>
                      </el-form-item>
                      <el-form-item label="项目位置" class="proAddress mandatory02" prop="" >
                        <div v-if="btnNone"  class="proAddress-left2" @click="setMark" >
                          <img src="../../../src/assets/images/mapReaname.png" alt="">
                          <p>地图选点</p>
                        </div>
                        <div class="proAddress-right2">
                          <p>{{!proInformation.locationDescription?'点击按钮在地图中确定项目位置':proInformation.locationDescription}}</p>
                        </div>
                      </el-form-item>
                      <!--<el-form-item label="项目边界" class="proBoundary"  prop="region">-->
                      <!--<div class="proBoundary-left" @click="drawProject">-->
                      <!--<img src="../../../src/assets/images/drawBoundary.png" alt="">-->
                      <!--<p>绘制边界</p>-->
                      <!--</div>-->
                      <!--<div class="proBoundary-right">-->
                      <!--<p>{{ruleForm2.landEdge!==""?'点击查看/编辑项目边界':'点击按钮绘制项目边界'}}</p>-->
                      <!--</div>-->
                      <!--</el-form-item>-->
                    </div>
                    <div style="height:600px;margin-top: 40px;">
                      <div  status-icon  label-width="110px" class="demo-ruleForm form" >
                        <div >
                          <el-col :span="8">
                            <el-form-item label="获取时间" prop="pass">
                              <el-col :span="18">
                                <div class="block">
                                  <el-date-picker
                                    :disabled="disabledFlag"
                                    :editable="disabledDate"
                                    v-model="ruleForm2.acquisitionTime"
                                    type="date"
                                    @change="dateFormatConversionAcquisitionTime"
                                    placeholder="选择日期" >
                                  </el-date-picker>
                                </div>
                              </el-col>
                              <el-col :span="6"><span></span></el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="获取单价" prop="getUnitPrice">
                              <el-col :span="16"> <el-input :disabled="disabledFlag" v-model="ruleForm2.getUnitPrice"></el-input></el-col>
                              <el-col :span="8"><span>元/平米</span></el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="交付标准" prop="pass">
                              <el-col :span="18"> <el-select :disabled="disabledFlag" v-model="ruleForm2.handoverStandard" placeholder="请选择"><el-option
                                v-for="item in ruleForm2.handover_standard"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictCode">
                              </el-option>
                              </el-select>
                              </el-col>
                              <el-col :span="6"><span></span></el-col>
                            </el-form-item>
                          </el-col>
                        </div>
                      </div>
                      <div  status-icon  label-width="110px" class="demo-ruleForm form" >
                        <div >
                          <el-col :span="8">
                            <el-form-item label="建设用地面积" prop="constructionLandArea">
                              <el-col :span="18"> <el-input :disabled="disabledFlag" v-model="ruleForm2.constructionLandArea"></el-input></el-col>
                              <el-col :span="6"><span>平米</span></el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="综合容积率" prop="plotRatio">
                              <el-col :span="18"> <el-input :disabled="disabledFlag"  v-model="ruleForm2.plotRatio"></el-input></el-col>
                              <el-col :span="6"><span></span></el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="建筑面积" prop="buildingConstructionArea">
                              <el-col :span="18"> <el-input :disabled="disabledFlag"  v-model="ruleForm2.buildingConstructionArea"></el-input></el-col>
                              <el-col :span="6"><span>平米</span></el-col>
                            </el-form-item>
                          </el-col>
                        </div>
                      </div>
                      <div  status-icon  label-width="110px" class="demo-ruleForm form" >
                        <div>
                          <el-col :span="8">
                            <el-form-item label="开发商" prop="pass">
                              <el-col :span="18"> <el-select  :disabled="disabledFlag" v-model="ruleForm2.developer" placeholder="请选择"><el-option
                                v-for="item in ruleForm2.developers"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictCode">
                              </el-option>
                              </el-select>
                              </el-col>
                              <el-col :span="6"><span></span></el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="首开时间" prop="pass">
                              <el-col :span="18">
                                <div class="block">
                                  <el-date-picker
                                    :disabled="disabledFlag"
                                    :editable="disabledDate"
                                    v-model="ruleForm2.firstSellTime"
                                    type="date"
                                    placeholder="选择日期"
                                    @change="getSTime"
                                  >
                                  </el-date-picker>
                                </div>
                              </el-col>
                              <el-col :span="6"><span></span></el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="业态" prop="pass">
                              <el-col :span="18"> <el-select :disabled="disabledFlag" v-model="ruleForm2.runningTypeCom" placeholder="请选择"><el-option
                                v-for="item in ruleForm2.runningTypeComAll"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictCode">
                              </el-option>
                              </el-select>
                              </el-col>
                              <el-col :span="6"><span></span></el-col>
                            </el-form-item>
                          </el-col>
                        </div>
                      </div>
                      <div  status-icon  label-width="110px" class="demo-ruleForm form" >
                        <div >
                          <el-col :span="8">
                            <el-form-item label="其中：持有商业建筑面积" prop="includingArea">
                              <el-col :span="18"> <el-input :disabled="disabledFlag" v-model="ruleForm2.includingArea"></el-input></el-col>
                              <el-col :span="6"><span>平米</span></el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="首开时间（持有商业）" prop="pass">
                              <el-col :span="18">
                                <div class="block">
                                  <el-date-picker
                                    :disabled="disabledFlag"
                                    :editable="disabledDate"
                                    v-model="ruleForm2.firstSellTimeBuss"
                                    type="date"
                                    placeholder="选择日期"
                                    @change="dateFormatConversionFirstSellTimeBuss"
                                  >
                                  </el-date-picker>
                                </div>
                              </el-col>
                              <el-col :span="6"><span></span></el-col>
                            </el-form-item>
                          </el-col>
                        </div>
                      </div>
                      <div  status-icon  label-width="110px" class="demo-ruleForm form" >
                        <div>
                          <el-form-item label="规划用地性质" prop="pass " class="inputLength">
                            <el-select :disabled="disabledFlag"  v-model="ruleForm2.planedLandTitles" placeholder="请选择" multiple>
                              <el-option
                                v-for="item in ruleForm2.planed_land_title"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictCode">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>

                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="客户描摹" name="second">
                    <el-form  status-icon label-width="10px" class="demo-ruleForm form" >
                      <el-form-item label="" prop="customerDescription">
                        <div class="textInput">
                          <p>客户描摹</p>
                          <el-input
                            :disabled="disabledFlag"
                            :maxlength="300"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="ruleForm2.customerDescription">
                          </el-input>
                          <span class="statistics">{{ruleForm2.customerDescription.length}}/{{300}}</span>
                        </div>
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="溢价点" name="third">
                    <el-form  status-icon label-width="10px" class="demo-ruleForm form" >
                      <el-form-item label="" prop="projectAdvantage">
                        <div class="textInput">
                          <p>项目优势</p>
                          <el-input
                            :disabled="disabledFlag"
                            :maxlength="300"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="ruleForm2.projectAdvantage">
                          </el-input>
                          <span class="statistics">{{ruleForm2.projectAdvantage.length}}/{{300}}</span>
                        </div>
                      </el-form-item>
                      <el-form-item label="" prop="Weakness">
                        <div class="textInput">
                          <p>项目劣势</p>
                          <el-input
                            :disabled="disabledFlag"
                            :maxlength="300"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="ruleForm2.Weakness">
                          </el-input>
                          <span class="statistics">{{ruleForm2.Weakness.length}}/{{300}}</span>
                        </div>
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="成交信息" name="fourth" class="dealInfor">
                    <div class="imageManagement">
                      <el-form  status-icon  label-width="100px" class="demo-ruleForm form" >
                        <el-form-item label="成交信息" class="proPhoto"  >
                          <heavyImageManagement @componentDataSynchronization="formatPicturecomponentDataSynchronization" :btnNone="btnNone" :picturesRef="formatPicture" :dictionariesList="formatPicturedictionariesList" :dictionariesTitle="formatPicturedictionariesTitle"></heavyImageManagement>
                        </el-form-item>
                      </el-form>
                    </div>
                    <el-form  label-width="100px" class="demo-ruleForm form" >
                      <el-form-item>
                        <div style="clear: both;height:40px;margin-top: 5px;">
                          <el-button v-if="btnNone" type="primary"  class="button" style="float: right;" @click="addDoneInformation()">添加</el-button>
                        </div>
                        <div class="uploadInfor"  v-for="(item,index) in ruleForm2.transactionInformation">
                          <div class=" countAndDelete"><p><span style="margin-left: 10px;">{{ruleForm2.transactionInformation.length-index}}</span><span @click="deleteDoneInformation(index)">删除</span></p></div>
                          <div class="uploadInforBody">
                            <div  status-icon label-width="110px" class="demo-ruleForm form" >
                              <div>
                                <el-col :span="8">
                                  <el-form-item label="业态类型" prop="pass">
                                    <el-col :span="24"> <el-select :disabled="disabledFlag"  v-model="item.runningType" placeholder="请选择"><el-option
                                      v-for="item in ruleForm2.running_type"
                                      :key="item.dictName"
                                      :label="item.dictName"
                                      :value="item.dictCode">
                                    </el-option>
                                    </el-select>
                                    </el-col>
                                    <el-col :span="0"><span></span></el-col>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                  <el-form-item label="售价" prop="sellingPrice">
                                    <el-col :span="12"> <el-input :disabled="disabledFlag" v-model="item.sellingPrice"></el-input></el-col>
                                    <el-col :span="12"><span>元/平米</span></el-col>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                  <el-form-item label="占比面积" prop="areaProportion">
                                    <el-col :span="18">
                                      <el-input
                                        :disabled="disabledFlag" v-model="item.areaProportion"
                                      ></el-input>
                                    </el-col>
                                    <!--<el-col :span="18">-->
                                    <!--<el-input-->
                                    <!--:disabled="disabledFlag" v-model="item.areaProportion"-->
                                    <!--v-validate="{ regex: /^[0-9|.]*$/ }" name="占比面积"-->
                                    <!--:class="{'input': true, 'is-danger': errors.has('占比面积')}"-->
                                    <!--&gt;</el-input>-->
                                    <!--<div v-show="errors.has('占比面积')" class="help">{{'保留两位小数,0~100'}}</div>-->
                                    <!--</el-col>-->

                                    <el-col :span="6"><span>%</span></el-col>
                                  </el-form-item>
                                </el-col>
                              </div>
                            </div>
                            <div  status-icon  label-width="110px" class="demo-ruleForm form" >
                              <div>
                                <el-col :span="8">
                                  <el-form-item label="月度成交量" prop="tradeCount">
                                    <el-col :span="14"> <el-input :disabled="disabledFlag" v-model="item.tradeCount"></el-input></el-col>
                                    <el-col :span="10"><span>平方米</span></el-col>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                  <el-form-item label="月度供应量" prop="tradeSupply">
                                    <el-col :span="16"> <el-input :disabled="disabledFlag" v-model="item.tradeSupply"></el-input></el-col>
                                    <el-col :span="8"><span>平方米</span></el-col>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                  <el-form-item label="当前库存量" prop="tradeStock">
                                    <el-col :span="16"> <el-input :disabled="disabledFlag" v-model="item.tradeStock"></el-input></el-col>
                                    <el-col :span="8"><span>平方米</span></el-col>
                                  </el-form-item>
                                </el-col>
                              </div>
                            </div>
                            <div  status-icon  label-width="110px" class="demo-ruleForm form" >
                              <div>
                                <el-col :span="8">
                                  <el-form-item label="月度成交均价" prop="finalPrice">
                                    <el-col :span="12"> <el-input :disabled="disabledFlag" v-model="item.finalPrice"></el-input></el-col>
                                    <el-col :span="12"><span>元/平方米</span></el-col>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                  <el-form-item label="去化周期" prop="sellPeriod">
                                    <el-col :span="18"> <el-input :disabled="disabledFlag" v-model="item.sellPeriod"></el-input></el-col>
                                    <el-col :span="6"><span>月</span></el-col>
                                  </el-form-item>
                                </el-col>
                                <!--<el-col :span="8">-->
                                <!--<el-form-item label="月均销售套数" prop="sellingNums">-->
                                <!--<el-col :span="18"> <el-input :disabled="disabledFlag" v-model="item.sellingNums"></el-input></el-col>-->
                                <!--<el-col :span="6"><span>套</span></el-col>-->
                                <!--</el-form-item>-->
                                <!--</el-col>-->
                                <el-col :span="8">
                                  <el-form-item label="时间" prop="pass" class="dateLength">
                                    <el-col :span="18">
                                      <div class="block">
                                        <el-date-picker
                                          :disabled="disabledFlag"
                                          :editable="disabledDate"
                                          v-model="item.tradeInfoTime"
                                          type="date"
                                          placeholder="选择日期"
                                        >
                                        </el-date-picker>
                                      </div>
                                    </el-col>
                                    <el-col :span="6"><span></span></el-col>
                                  </el-form-item>
                                </el-col>
                              </div>
                            </div>
                            <!--<div  status-icon  label-width="110px" class="demo-ruleForm form" >-->
                            <!--<div>-->
                            <!---->
                            <!--</div>-->
                            <!--</div>-->
                            <el-form-item label="" prop="">
                              <div class="textInput">
                                <p>赠送方式</p>
                                <el-input
                                  :disabled="disabledFlag"
                                  type="textarea"
                                  :maxlength="64"
                                  :rows="2"
                                  placeholder="请输入内容"
                                  v-model="item.presentedWay">
                                </el-input>
                                <span class="statistics">{{item.presentedWay.length}}/{{64}}</span>
                              </div>
                            </el-form-item>
                          </div>
                        </div>
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="产品规划图" name="fifth">
                    <div class="imageManagement">
                      <el-form  status-icon  label-width="100px" class="demo-ruleForm form" >
                        <el-form-item label="产品规划图" class="proPhoto"  >
                          <heavyImageManagement @componentDataSynchronization="productPlanningDiagramcomponentDataSynchronization" :btnNone="btnNone" :picturesRef="productPlanningDiagram" :dictionariesList="productPlanningDiagramdictionariesList" :dictionariesTitle="productPlanningDiagramdictionariesTitle"></heavyImageManagement>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="热销户型" name="sixth">
                    <div class="imageManagement">
                      <el-form  status-icon  label-width="100px" class="demo-ruleForm form" >
                        <el-form-item label="热销户型" class="proPhoto"  >
                          <heavyImageManagement @componentDataSynchronization="hotHousecomponentDataSynchronization" :btnNone="btnNone"  :picturesRef="hotHouse" :dictionariesList="hotHousedictionariesList" :dictionariesTitle="hotHousedictionariesTitle"></heavyImageManagement>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="关联项目" name="seventh">
                    <div class="componentBox">
                      <div class="titleComponentName position">
                        <span style="margin-left: 15px;">关联项目</span>
                        <span v-if="btnNone" class="addButton" @click="addCompetitiveProducts">添加({{competitors==undefined?0:competitors.length}}个)</span>
                        <div class="modelBox" v-if="CompetitiveProductsIsShow">
                          <div class="addRelevance" >
                            <p class="CloseBox">
                              <span class="textName">添加项目</span>
                              <span class="closeBtn" @click="closeBtn"></span>
                            </p>
                            <input type="text" class="search" placeholder="请输入搜索内容" v-model="searchMsg" @keyup="selectText(searchMsg)">
                            <div class="leftListBox">
                              <ul class="checkBox">
                                <li class="check" v-for="item in temporaryLift">
                                  {{item.title}}
                                  <span class="addAndSubtract littleAddBtn" @click="checkedFun(item.projectId,item.isActive)" :class="{activeCheck:item.isActive==true}"></span>
                                </li>
                              </ul>
                            </div>
                            <div class="rightListBox">
                              <ul class="checkBox">
                                <li class="check" v-for="item in temporaryRight">
                                  {{item.title}}
                                  <span class="addAndSubtract subtract" @click="cancelCompetitiveProducts(item.projectId)">－</span>
                                </li>
                              </ul>
                            </div>
                            <p class="affirmBox"><span class="affirmBtn" @click="affirmBtn">确认({{temporaryRight.length}})</span></p>
                          </div>
                        </div>
                      </div>
                      <div class="contendProduct">
                        <!--循环对象-->
                        <div class="relevanceBox" v-for="item in competitors" @mouseenter="hover(item.projectId)" @mouseleave="leave()">
                          <div class="relevance">
                            <div class="imgBox">
                              <img :src="item.picUrl" alt="">
                            </div>
                            <p class="title">{{item.title}}</p>
                            <p class="contentText">{{item.location}}</p>
                          </div>
                          <transition name="fade" mode="out-in"><!--添加动画-->
                            <p class="deleteIcon" v-if="item.projectId==hoveImgProjectId" @click="deleteFun(item.projectId)"></p>
                          </transition>
                        </div>
                      </div>
                    </div><!--第八个tab开始&#45;&#45;关联竞品-->


                  </el-tab-pane>
                  <el-tab-pane label="项目成员" name="eighth">
                    <div  status-icon  label-width="100px" class="demo-ruleForm form" >
                      <el-form-item label="项目成员" class="proPlayers">
                        <el-button v-if="btnNone" type="promise" @click="isShowProjectList" class="btn">添加成员</el-button>
                        <div class="verScrollBar" v-if="this.proPlayersList.length>0">
                          <ul>
                            <li v-for="(playersList,index) in proPlayersList">
                              <div class="proPlayersList">
                                <img :src="playersList.imgSrc"  alt="" v-if="playersList.imgSrc">
                                <img :src="defaultAvatar" alt="" v-else>
                                <p>{{playersList.per}}</p>
                                <p>{{playersList.dpment}}</p>
                                <p>{{playersList.position}}</p>
                                <p class="delete" v-if="btnNone" @click="thePerDelete(index)"></p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </el-form-item>
                      <diaLog :is-show="isSwitch" >
                        <proPopu style="position: relative;left: -50%;top:-200px;" @closeAside="isSwitch=false" @subAside="subAside" class="proPopu"></proPopu>
                      </diaLog>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-form>
            </el-col>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
  import heavyImageManagement from '../../components/heavyImageManagement'
  import submitImg from '../submitImg.vue'
  import slideShow from '../../components/slideShow'
  import diaLog from '../../components/dialog'
  import proPopu from '../../components/proPopu'
  export default {
    name: 'competingProduct',
    components: {
      heavyImageManagement,
      slideShow,
      submitImg,
      diaLog,
      proPopu
    },
    mounted(){

//      this.disabled = this.childParm.modAuth != 2;
    },
    data() {
      //特殊字符提示
      var specialCharacters = (rule, value, callback) => {
        var reg = /^[a-zA-Z0-9\u4E00-\u9FA5_]+$/;
        if (value) {
          if (reg.test(value)==false) {
            callback(new Error("支持中文、英文（大小写）、下划线，不支持特殊字符 "));
          }
          else{
            callback()
          }
        }else{
          callback();
        }
      };
      var checkObtainRoundNumber = (rule,value,callback) => {
        var reg = /^\d+?$/; //正则校验 :整数,保留两位小数
        if (value) {
          if (!reg.test(value)) {
            callback(new Error("整数，0~1000,000"));
          }else if(value>1000000){
            callback(new Error("整数，0~1000,000"));
          }else{
            callback()
          }
        } else{
          callback()
        }
      };
      var checkObtainNumber = (rule,value,callback) => {
        var reg = /^\d+(\.\d{1,2})?$/; //正则校验 :正整数,保留两位小数
        if (value) {
          if (!reg.test(value)) {
            callback(new Error("保留2位小数，0~1000,000"));
          }else if(value>1000000){
            callback(new Error("保留2位小数，0~1000,000"));
          }else{
            callback()
          }
        } else{
          callback()
        }
      };
      var checkCharactersLength= (rule, value, callback) => {
        if (!Number.isInteger(value)) {
          callback(new Error('最多输入140字符'));
        }
        /*输入内容为0-140个字符*/
//        let reg = /^.{0,140}$/;
//        if (!reg.test(value)) {
//          callback(new Error("最多输入140个字符"));
//        }
        else{
          callback()
        }
      };
      return {
        formatPicturedictionariesTitle:'',//
        formatPicture:[],//成交信息
        formatPicturedictionariesList:[],//
        productPlanningDiagramdictionariesTitle:'',//
        productPlanningDiagram:[],//产品规划图
        productPlanningDiagramdictionariesList:[],//
        hotHousedictionariesTitle:'',//
        hotHouse:[],//热销户型图
        hotHousedictionariesList:[],//
        submitFlag:false,
        btnNone:false,
        childParm:{modAuth:1},
        /*权限*/
        disabledFlag:true,     //disabled 可编辑
        disabledDate:false,     //日期 不可输入
        disabled:true,//设置是否禁止编辑
        /*关联项目*/
        cityCode:'', // 城市识别码
        competitors: [], // 关联竞品数组
        competitorsId: [], // 关联竞品数组Id
        parm:{competitors: []},
        hoveImgProjectId: '', // 鼠标悬浮获取图片id
        CompetitiveProductsIsShow: false, // 添加竞品显示隐藏
        temporaryLift: [], // 临时存储所有竞品列表
        temporaryRight: [], // 临时存储所有竞品列表
        CompetitiveProducts: [], // 所有竞品列表
        searchMsg: '', // 关联竞品搜索
        textList: [], // 搜索临时数据存储
        delShowId: '', // 鼠标悬浮获取id控制显示隐藏
        tabIndex: 0, // tab切换index保留值
        projectId:'',
        ruleForm2:{
//          planedLandTitle:[],//规划用地性质
          firstSellTimeBuss:"", //首开时间(持有商业)
          includingArea:"",//其中:持有商业建筑面积
          runningTypeCom:"", //业态(竞品)
          runningTypeComAll:'',
          planedLandTitles:[],
          planed_land_title:[],//规划用地性质 select
          developer:'',//开发商
          developers:'',//开发商 select
          handoverStandard:'',
          handover_standard:'',//交付标准 select
          running_type:'',//业态类型 select
          /*项目基本信息*/
          name:'',//项目名称
          landEdge:'',//描边
          firstSellTime:'',//首开时间
          acquisitionTime: '',//获取时间
          getUnitPrice: '',//获取单价（元/平米）
          constructionLandArea: '',//建设用地面积（平米）
          plotRatio:'',//容积率
          buildingConstructionArea: '',//建筑面积（平米）

          /*客户描摹*/
          customerDescription: '',//客户描摹
          /*溢价点*/
          projectAdvantage: '',//项目优势
          Weakness: '',//项目劣势
          transactionInformation:[
            {
              runningType: '',//业态类型
              areaProportion: '',//占比面积（%）
              tradeSupply: '',//月度供应量（平方米）
              tradeCount: '',//月度成交量（平方米）
              sellingPrice: '',//售价（元/平米）
              finalPrice: '',//月度成交均价（元/平方米）
              tradeStock: '',//当前库存量（平方米）
              sellingNums: '',//月均销售套数
              sellPeriod: '',//去化周期（月）
              presentedWay: '',//赠送方式
              tradeInfoTime: '',//时间
            }
          ],//成交信息
        },
        rules2: {
          /*项目基本信息*/
          name: [
            { validator: specialCharacters, trigger: 'blur' }
          ],
          bidName:  [
            { validator: specialCharacters, trigger: 'blur' }
          ],
          region: [
            { type: 'date', required: true, message: 's', trigger: 'change' }
          ],
          getUnitPrice: [
            {validator: checkObtainRoundNumber, trigger: 'blur'}
          ],//获取单价（元/平米）
          constructionLandArea: [
            {validator: checkObtainNumber, trigger: 'blur'}
          ],//建设用地面积（平米）
          includingArea: [
            {validator: checkObtainNumber, trigger: 'blur'}
          ],//其中：持有商业建筑面积
          plotRatio:[
            {validator: checkObtainNumber, trigger: 'blur'}
          ],//容积率
          buildingConstructionArea: [
            {validator: checkObtainNumber, trigger: 'blur'}
          ],//建筑面积（平米）

          /*客户描摹*/
          customerDescription:[
            {validator: checkCharactersLength, trigger: 'blur'}
          ],//客户描摹
          /*溢价点*/
          areaProportion:[
            {validator: checkObtainNumber, trigger: 'blur'}
          ],//占比面积（%）
          tradeSupply: [
            {validator: checkObtainNumber, trigger: 'blur'}
          ],//月度供应量（平方米）
          tradeCount: [
            {validator: checkObtainNumber, trigger: 'blur'}
          ],//月度成交量（平方米）
          sellingPrice:[
            {validator: checkObtainNumber, trigger: 'blur'}
          ],//售价（元/平米）
          finalPrice:[
            {validator: checkObtainNumber, trigger: 'blur'}
          ],//月度成交均价（元/平方米）
          tradeStock: [
            {validator: checkObtainNumber, trigger: 'blur'}
          ],//当前库存量（平方米）
          sellingNums: [
            {validator: checkObtainNumber, trigger: 'blur'}
          ],//月均销售套数
          sellPeriod:[
            {validator: checkObtainNumber, trigger: 'blur'}
          ],//去化周期（月）
          presentedWay: [
            {validator: checkCharactersLength, trigger: 'blur'}
          ],//赠送方式
        },
        activeName: 'first',
        proInformation:{
          /*项目地址*/
          locationDescription:'',
          longitude:'',
          latitude:'',
        },
        summary:{},
        /*关联项目*/
        value8:[],
        value:'',
        options:[],
        proPlayersList:[],
        projectUsers:[],//项目成员id
        /*是否显示添加成员*/
        isSwitch:false,
        /*默认头像地址*/
        defaultAvatar:require("../../../src/assets/images/defaultAvatar.png")
      }
    },
    methods:{
      saveTime(){
        var that=this;
        if(that.ruleForm2.acquisitionTime){
          that.ruleForm2.acquisitionTime=that.ruleForm2.acquisitionTime+" 00:00:00";
        }
        if(this.ruleForm2.firstSellTime!=''){
          this.ruleForm2.firstSellTime=this.ruleForm2.firstSellTime+' 00:00:00'
        };
        if(this.ruleForm2.firstSellTimeBuss!=''){
          this.ruleForm2.firstSellTimeBuss=this.ruleForm2.firstSellTimeBuss+' 00:00:00'
        };
        if(this.ruleForm2.transactionInformation.length>0){
          that.ruleForm2.transactionInformation.forEach(item=>{
            if(item.tradeInfoTime!=undefined&&item.tradeInfoTime!=''){
              item.tradeInfoTime=that.gmtToStr(item.tradeInfoTime);
            }//时间
          })
        }
      },
      /*年月日格式转换*/
      dateFormatConversionAcquisitionTime(date){
        this.ruleForm2.acquisitionTime=date;//
      },
      dateFormatConversionFirstSellTimeBuss(date){
        this.ruleForm2.firstSellTimeBuss=date ;//
      },
      /*年月日格式转换*/
      formatPicturecomponentDataSynchronization(data){
        this.formatPicture=data;
      },
      productPlanningDiagramcomponentDataSynchronization(data){
        this.productPlanningDiagram=data;
      },
      hotHousecomponentDataSynchronization(data){
        this.hotHouse=data;
      },
      /*提交校验*/
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitFlag=true;
          } else {
            this.submitFlag=false;
            return false;
          }
        });
      },
      //根据权限设置可否编辑
      isEdit(){
        /*
         **childParm.modAuth==2 可编辑
         **childParm.modAuth==1 可读
         */
        if(this.childParm.modAuth==2 || this.childParm.modAuth=="2"){
          this.btnNone=true;
          this.disabledFlag=false;
        }else if(this.childParm.modAuth==1 || this.childParm.modAuth=="1"){
          this.btnNone=false;
          this.disabledFlag=true;
        }
      },
      /*时间插件转换格式*/
      getSTime(val) {
        this.ruleForm2.firstSellTime=val;//这个sTime是在data中声明的，也就是v-model绑定的值
      },
      getSTime1(payRhythm, date) {
        payRhythm.tradeInfoTime=date + " 00:00:00";//这个sTime是在data中声明的，也就是v-model绑定的值
      },
      handoverStandard () {},
      // 关联竞品鼠标失去焦点
      hover (projectId) {
        this.hoveImgProjectId = projectId
      },
      // 关联竞品鼠标失去焦点
      leave () {
        this.hoveImgProjectId = ''
      },
      // 添加竞品按钮
      addCompetitiveProducts () {
        let that = this
        //CompetitiveProducts存在项目，则不走接口直接赋值给temporaryLift
        if (that.CompetitiveProducts.length > 0) {
          for (var i = 0; i < that.CompetitiveProducts.length; i++) {
            if (that.competitors.length > 0) {//从获取接口获取数据
              for (var j = 0; j < that.competitors.length; j++) {
                if (that.CompetitiveProducts[i].projectId == that.competitors[j].projectId) {
                  that.CompetitiveProducts[i].isActive = true//isActive对号图标选中
                  break
                } else {
                  that.CompetitiveProducts[i].isActive = false
                }
              }
            } else {
              that.CompetitiveProducts[i].isActive = false
            }
          }
          that.temporaryRight=[];
          for (var i = 0; i < that.competitors.length; i++) {
            that.temporaryRight.push(that.competitors[i])
          }
          that.temporaryLift = that.CompetitiveProducts
          that.CompetitiveProductsIsShow = true
        } else {
          this.$http({
            method: 'post',
            url: '/longcity/services/v1/project/searchCompetitive',
            // data: {projectId: 1024, cityCode: 110100}
            data: {projectId: that.projectId, cityCode: that.cityCode}
          }).then(function (succeed) {
            that.CompetitiveProducts = succeed.data.result
            for (var i = 0; i < that.CompetitiveProducts.length; i++) {
              if (that.competitors.length > 0) {//从获取接口获取数据
                for (var j = 0; j < that.competitors.length; j++) {
                  if (that.CompetitiveProducts[i].projectId == that.competitors[j].projectId) {
                    that.CompetitiveProducts[i].isActive = true//isActive对号图标选中
                    break
                  } else {
                    that.CompetitiveProducts[i].isActive = false
                  }
                }
              } else {
                that.CompetitiveProducts[i].isActive = false
              }
            }
            for (var i = 0; i < that.competitors.length; i++) {
              that.temporaryRight.push(that.competitors[i])
            }
            that.temporaryLift = that.CompetitiveProducts
            that.CompetitiveProductsIsShow = true
          })
        }
      },
      // 添加竞品
      checkedFun (projectId, isActive) {
        if (isActive == false) {
          for (let i = 0; i < this.CompetitiveProducts.length; i++) {
            if (this.CompetitiveProducts[i].projectId==projectId) {
              this.CompetitiveProducts[i].isActive = true
              this.temporaryRight.unshift(this.CompetitiveProducts[i])
              return
            }
          }
        } else {
          this.cancelCompetitiveProducts(projectId)
        }
      },
      // 取消竞品
      cancelCompetitiveProducts (projectId) {
        for (let i = 0; i < this.temporaryRight.length; i++) {
          if (this.temporaryRight[i].projectId == projectId) {
            this.temporaryRight.splice(i, 1)
          }
        }
        for (let i = 0; i < this.CompetitiveProducts.length; i++) {
          if (this.CompetitiveProducts[i].projectId==projectId) {
            this.CompetitiveProducts[i].isActive = false
            return
          }
        }
      },
      // 关联竞品下方确认按钮事件
      affirmBtn () {
        this.competitors = []
        for (let i = 0; i < this.temporaryRight.length; i++) {
          this.competitors.push(this.temporaryRight[i])
        }
        console.log(this.competitors)
        this.CompetitiveProductsIsShow = false
      },
      closeBtn () {
        this.CompetitiveProductsIsShow = false
      },
      // 竞品删除
      deleteFun (projectId) {
        this.CompetitiveProductsIsShow = false
        this.delAffirm(projectId)
      },
      // 删除提示函数
      delAffirm (projectId) {

        let that = this
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // type: 'warning'//提示小图标配置,取值为:success/info/warning/error
        }).then(() => {
          console.log(that.competitors)
          for (var i = 0; i < that.competitors.length; i++) {
            if (projectId ==that.competitors[i].projectId) {
              that.competitors.splice(i, 1)
              that.checkedFun(projectId)
              return
            }
          }
        })
      },
      // 本地搜索--关联关联竞品搜索
      selectText (message) {
        if (message == '') {
          this.temporaryLift = this.CompetitiveProducts // 当搜索框为空的时候列表清空
          return
        }
        let item = []
        for (let i = 0; i < this.CompetitiveProducts.length; i++) {
          if (this.CompetitiveProducts[i].title.indexOf(message) >= 0) {
            item.push(this.CompetitiveProducts[i])
          }
        }
        this.temporaryLift = item
        // console.log(this.temporaryLift)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      /*通过接口获取select类型信息/规划用地性质/开发商/交付标准/业态类型*/
      accessSelect:function(){
        var that = this;
        this.$http({
          method:'post',
          url:'/longcity/services/v1/dict/dictListByType',
          /*通过接口获取select类型信息/规划用地性质/开发商/交付标准/业态类型/业态/成交信息/产品规划图/热销户型*/
          data:{"dictTypes":["planed_land_title","developer","handover_standard","running_type","runningTypeCom","formatPicture","productPlanningDiagram","hotHouse"]},
        }).then(function (succeed) {
          succeed.data.result.forEach(item=>{
            switch(item.dictType){
              case "planed_land_title":
                /*规划用地性质 planed_land_title*/
                that.ruleForm2.planed_land_title=item.items;
                break;
              case "developer":
                /*开发商 developer*/
                that.ruleForm2.developers=item.items;
                break;
              case "handover_standard":
                /*交付标准 handover_standard*/
                that.ruleForm2.handover_standard=item.items;
                break;
              case "running_type":
                /*业态类型 running_type*/
                that.ruleForm2.running_type=item.items;
                break;
              case "runningTypeCom":
                /*业态 runningTypeCom*/
                that.ruleForm2.runningTypeComAll=item.items;
                break;
              case "formatPicture":
                /*成交信息 formatPicture*/
                that.formatPicturedictionariesTitle="formatPicture";
                that.formatPicturedictionariesList=item.items;
                break;
              case "productPlanningDiagram":
                /*产品规划图 productPlanningDiagram*/
                that.productPlanningDiagramdictionariesTitle="productPlanningDiagram";
                that.productPlanningDiagramdictionariesList=item.items;
                break;
              case "hotHouse":
                /*热销户型 hotHouse*/
                that.hotHousedictionariesTitle="hotHouse";
                that.hotHousedictionariesList=item.items;
                break;
            };
          });
        },function (err) {
          console.log(err);
        })
      },
      /*整合提交summary信息*/
      getSummary:function () {
        this.summary.formatPicture=this.formatPicture;//业态图
        this.summary.buildingConstructionArea=this.ruleForm2.buildingConstructionArea;//建筑面积（平米）
        this.summary.constructionLandArea=this.ruleForm2.constructionLandArea;//建设用地面积（平米）
        this.summary.hotHouse=this.hotHouse;//热销户型图
        this.summary.acquisitionTime=this.ruleForm2.acquisitionTime;//获取时间
        this.summary.customerDescription=this.ruleForm2.customerDescription;//客户描摹
        this.summary.productPlanningDiagram=this.productPlanningDiagram;//产品规划图
        this.summary.getUnitPrice=this.ruleForm2.getUnitPrice;//获取单价（元/平米）
        this.summary.projectAdvantage=this.ruleForm2.projectAdvantage;//项目优势
        this.summary.Weakness=this.ruleForm2.Weakness;//项目优势
        this.summary.firstSellTimeBuss=this.ruleForm2.firstSellTimeBuss;//首开时间(持有商业)
        this.summary.includingArea=this.ruleForm2.includingArea;//其中:持有商业建筑面积
        this.summary.runningTypeCom=this.ruleForm2.runningTypeCom;//业态(竞品)
      },
      /*通过接口获取新建竞品信息*/
      accessCompetingProduct:function () {
        let that = this;
        this.$http({
          method:'post',
          url:'/longcity/services/v1/project/competitiveSummaryPc',
          data:{
            "id":that.projectId,
          }
        }).then(function (succeed) {
//          console.log(succeed);
          that.accessSelect();
          let competingProductData=succeed.data.result;
          //that.parm=succeed.data.result
          that.ruleForm2.name=competingProductData.name;//项目名称
          that.proInformation.locationDescription=competingProductData.locationDescription;//项目位置
          that.proInformation.latitude=competingProductData.latitude;//项目位置
          that.proInformation.longitude=competingProductData.longitude;//项目位置
//          that.ruleForm2.landEdge=competingProductData.landEdge;//描边
          that.ruleForm2.firstSellTime=competingProductData.firstSellTime.substr(0,10);//首开时间
          //对象非空判断 移动端返回格式和PC端格式不一致导致阻塞
          if(competingProductData.summary.getUnitPrice!=undefined){
            that.ruleForm2.getUnitPrice=competingProductData.summary.getUnitPrice;//获取单价（元/平米）
          }
          if(competingProductData.summary.acquisitionTime!=undefined){
            that.ruleForm2.acquisitionTime=competingProductData.summary.acquisitionTime.substr(0,10);//获取时间
          }
          if(competingProductData.summary.constructionLandArea!=undefined){
            console.log(that.ruleForm2.constructionLandArea);
            that.ruleForm2.constructionLandArea=competingProductData.summary.constructionLandArea;//建设用地面积（平米）
          }
          if(competingProductData.plotRatio!=undefined){
            that.ruleForm2.plotRatio=competingProductData.plotRatio;//容积率
          }
          if(competingProductData.summary.buildingConstructionArea!=undefined){
            that.ruleForm2.buildingConstructionArea=competingProductData.summary.buildingConstructionArea;//建筑面积（平米）
          }
          if(competingProductData.summary.customerDescription!=undefined){
            that.ruleForm2.customerDescription=competingProductData.summary.customerDescription;//客户描摹
          }
          if(competingProductData.summary.projectAdvantage!=undefined){
            that.ruleForm2.projectAdvantage=competingProductData.summary.projectAdvantage;//项目优势
          }
          if(competingProductData.summary.Weakness!=undefined){
            that.ruleForm2.Weakness=competingProductData.summary.Weakness;//项目劣势
          }
          if(competingProductData.summary.firstSellTimeBuss!=undefined){
            that.ruleForm2.firstSellTimeBuss=competingProductData.summary.firstSellTimeBuss.substr(0,10);//首开时间(持有商业)
          }
          if(competingProductData.summary.includingArea!=undefined){
            that.ruleForm2.includingArea=competingProductData.summary.includingArea;//其中:持有商业建筑面积
          }
          if(competingProductData.summary.runningTypeCom!=undefined){
            that.ruleForm2.runningTypeCom=competingProductData.summary.runningTypeCom;//业态(竞品)
          }
          /*成交信息*/
          if(competingProductData.transactionInformation.length>0){
            that.ruleForm2.transactionInformation=competingProductData.transactionInformation;
            that.ruleForm2.transactionInformation.forEach(item=>{
              if(item.tradeInfoTime!=''){
                item.tradeInfoTime=that.strToGmt(new Date(Date.parse(item.tradeInfoTime.replace(/-/g,"/"))))
              }//时间
            })
          }
          /*图片管理*/
          if(competingProductData.summary.formatPicture){
            that.theInitImgData=competingProductData.summary.formatPicture;//
            if(competingProductData.summary.formatPicture.length>0){
              that.formatPicture=competingProductData.summary.formatPicture;//
            }
          }
          if(competingProductData.summary.productPlanningDiagram){
            that.productPlanningDiagramtheInitImgData=competingProductData.summary.productPlanningDiagram;//
            that.productPlanningDiagram=competingProductData.summary.productPlanningDiagram;//
          }

          if(competingProductData.summary.hotHouse){
            that.hotHousetheInitImgData=competingProductData.summary.hotHouse;//
            that.hotHouse=competingProductData.summary.hotHouse;//
          }


          that.ruleForm2.planedLandTitles=competingProductData.planedLandTitles;//
          that.ruleForm2.developer=competingProductData.developer;//
          that.ruleForm2.handoverStandard=competingProductData.handoverStandard;//

          that.competitors = competingProductData.competitors //关联竞品
          /*选定的用户成员信息*/
          that.proPlayersList=[];
          succeed.data.result.stackholders.forEach((item,index)=>{
            let temporaryArray={};
            temporaryArray.imgSrc=succeed.data.result.stackholders[index].avatar;
            temporaryArray.per=succeed.data.result.stackholders[index].shName.split("(",1)[0];
            temporaryArray.dpment=succeed.data.result.stackholders[index].group;
            temporaryArray.position=succeed.data.result.stackholders[index].title;
            temporaryArray.shName=succeed.data.result.stackholders[index].shName;
            that.proPlayersList.push(temporaryArray);
          });
//          that.proPlayersList.sort(that.compare('position'));

        },function (err) {
          console.log(err);
        })
      },
      /*获取向接口提交项目组成员id*/
      getProjectUsersId:function () {
        let that=this;
        this.projectUsers=[];
        let projectUsersShName=[];
        this.proPlayersList.forEach((item)=>
        {
          projectUsersShName.push(item.shName);
        });
        /*获取拼音*/
        if(projectUsersShName.length>0){
          projectUsersShName.forEach(item=>{
            that.projectUsers.push(item.split('(',2)[1].split(')',1)[0]);
          });
        }
      },
      /*获取向接口提交关联项目id*/
      getCompetitorsId:function(){
        var that=this;
        this.competitors.forEach(item=>{
          that.competitorsId.push(item.projectId);
        });
      },
      /*通过接口提交新建竞品信息*/
      subCompetingProduct:function () {
        var that = this;
        /*必填项校验*/
        if(this.ruleForm2.name==''){
          this.$message({
            showClose: true,
            message: '项目名称没有填写，请继续完成填写！',
            type: 'success',
            duration:3000,
          });
          return
        };
        if(this.proInformation.locationDescription==''){
          this.$message({
            showClose: true,
            message: '项目位置没有填写，请继续完成填写！',
            type: 'success',
            duration:3000,
          });
          return
        };
        this.submitForm('ruleForm2');
        if(that.submitFlag==false){
          return
        }
        this.saveTime();
        this.getSummary();
        this.getProjectUsersId();
        this.getCompetitorsId();

        let AllList = that.competitors//获取关联项目id数组
        let arr = []
        for (var i = 0; i < AllList.length; i++) {
          arr.push(that.competitors[i].projectId)
        }
        this.$http({
          method:'post',
          url:'/longcity/services/v1/project/saveCompareProjectPc',
          data:{

            "inputType":1,//0为创建项目，1为创建竞品
            "id":that.projectId,//项目或竞品ID，新建时传0   // "projectId":this.projectId,
            "name":that.ruleForm2.name,//项目名称
            "longitude":that.proInformation.longitude,//经度
            "latitude":that.proInformation.latitude,//纬度
            "locationDescription":that.proInformation.locationDescription,//项目位置
            "plotRatio":that.ruleForm2.plotRatio,//容积率
            "firstSellTime":that.ruleForm2.firstSellTime,//首开时间
            "getUnitPrice":that.ruleForm2.getUnitPrice,//获取单价（元/平米）
            "buildingConstructionArea":that.ruleForm2.buildingConstructionArea,//建筑面积（平米）
            "transactionInformation":that.ruleForm2.transactionInformation,//        /*成交信息*/
            "planedLandTitles":that.ruleForm2.planedLandTitles,//
            "developer":that.ruleForm2.developer,//
            "handoverStandard":that.ruleForm2.handoverStandard,//
            "summary":that.summary,//
            "projectUsers":that.projectUsers ,//项目成员
            "competitors":arr ,//关联项目
          }
        }).then(function (succeed) {
          if(succeed.data.code==200 || succeed.data.code=="200"){
            that.thePreservationPopup();
          }else{
            that.$message({
              showClose: true,
              message: '保存失败！',
              type: 'success',
              duration:3000,
            });
          }
        },function (err) {
          console.log(err);
        })
      },
      /*调用projectManggement页面的画图方法*/
      drawProject(){
        this.$emit('drawProject',this.proInformation.landEdge);
      },
      /*调用projectManggement页面的打点方法*/
      setMark(){
        this.$emit('setMark',this.proInformation.locationDescription);
      },
      /*从projectManagement获取项目地址*/
      getPosition(str){
        this.proInformation.locationDescription=str[0];
        this.proInformation.longitude=str[1];
        this.proInformation.latitude=str[2];
      },
      /*从projectManagement获取页面ID*/
      getId(str,obj,cityCode){
        this.setConHeight();
        this.projectId=parseInt(str);
        this.accessCompetingProduct();
        this.childParm.modAuth=obj;
        this.cityCode=cityCode;
        this.isEdit();
      },
      /*取消弹窗*/
      theCancelPopup(){
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '是否退出当前页面'),
            h('i', { style: 'color: teal' }, )
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                  this.cancelThePage(1);
                  this.dataInitialization();
                }, 5);
              }, 10);
            } else {
              done();
            }
          }
        }).then(action => {
//          this.$message({
//            type: 'info',
//            message: 'action: ' + action
//          });
        });
      },
      /*保存弹窗*/
      thePreservationPopup(){
        this.$message({
          showClose: true,
          message: '恭喜，项目保存成功！',
          type: 'success',
          duration:3000,
        });
        this.cancelThePage(2);
        this.dataInitialization();
      },
      /*关闭本页面*/
      cancelThePage(operation){
        this.$emit('cancelThePage',operation);
      },
      run(fun,parm,obj,cityCode){
        if(fun=="getId"){
          this.getId(parm,obj,cityCode);
        }else if(fun=="getPosition"){
          this.getPosition(parm);
        }else if(fun="getPoints"){
          this.getPoints(parm);
        }
      },
      /*人员管理弹窗点击确定关闭且接收数据*/
      subAside(data){
        this.isSwitch=false;
        /*项目成员去重*/
        this.proPlayersList=this.proPlayersList.concat(data)
        let res=[this.proPlayersList[0]];
        for(let i=1;i<this.proPlayersList.length;i++){
          let repeat=false;
          for(let j=0;j<res.length;j++){
            if(this.proPlayersList[i].shName==res[j].shName){
              repeat=true;
              break;
            }
          }
          if(!repeat){
            res.push(this.proPlayersList[i]);
          }
        };
        this.proPlayersList=res;
      },
      isShowProjectList() {
        this.isSwitch=true;
      },
      /*删除人员时弹出对话框*/
      thePerDelete(index){
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '确认将该成员从项目中移除？'),
            h('i', { style: 'color: teal' }, )
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                this.delPlayersList(index);
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 5);
              }, 10);
            } else {
              done();
            }
          }
        }).then(action => {
//          this.$message({
//            type: 'info',
//            message: 'action: ' + action
//          });
        });
      },
      /*hover删除人员*/
      delPlayersList(index){
        this.proPlayersList.splice(index, 1);
      },
      /*添加成交信息*/
      addDoneInformation:function () {
        let obj= {
          runningType: '',//业态类型
          areaProportion: '',//占比面积（%）
          tradeSupply: '',//月度供应量（平方米）
          tradeCount: '',//月度成交量（平方米）
          sellingPrice: '',//售价（元/平米）
          finalPrice: '',//月度成交均价（元/平方米）
          tradeStock: '',//当前库存量（平方米）
          sellingNums: '',//月均销售套数
          sellPeriod: '',//去化周期（月）
          presentedWay: '',//赠送方式
          tradeInfoTime: '',//时间
        };
        this.ruleForm2.transactionInformation.unshift(obj);
      },
      /*删除成交信息*/
      deleteDoneInformation:function (index) {
        this.ruleForm2.transactionInformation.splice(index,1);
      },
      /*进入页面将数据初始化*/
      dataInitialization(){
        this.imgCover=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.imgFourto=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.imgFavourableFactor=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.imgNegativeFactor=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.imgActuality=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.productPlanningDiagramimgCover=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.productPlanningDiagramimgFourto=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.productPlanningDiagramimgFavourableFactor=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.productPlanningDiagramimgNegativeFactor=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.productPlanningDiagramimgActuality=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.hotHouseimgCover=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.hotHouseimgFourto=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.hotHouseimgFavourableFactor=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.hotHouseimgNegativeFactor=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.hotHouseimgActuality=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
          this.proInformation={
          /*项目地址*/
          locationDescription:'',
          longitude:'',
          latitude:'',
        },
          this.cityCode='', // 城市识别码
//          this.competitors= [], // 关联竞品数组
//          this.competitorsId= [], // 关联竞品数组Id
//          this.hoveImgProjectId= '', // 鼠标悬浮获取图片id
//          this.CompetitiveProductsIsShow= '', // 添加竞品显示隐藏
//          this.temporaryLift= [], // 临时存储所有竞品列表
//          this.temporaryRight= [], // 临时存储所有竞品列表
//          this.CompetitiveProducts= [], // 所有竞品列表
//          this.searchMsg= '', // 关联竞品搜索
//          this.textList= [], // 搜索临时数据存储
          this.delShowId= '', // 鼠标悬浮获取id控制显示隐藏
          this.tabIndex= 0, // tab切换index保留值
          this.projectId='',
          /*存储图片管理中封面的信息*/
          this.imgCover=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          /*存储图片管理中四至的信息*/
          this.imgFourto=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          /*存储图片管理中有利因素的信息*/
          this.imgFavourableFactor=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          /*存储图片管理中不利因素的信息*/
          this.imgNegativeFactor=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          /*存储图片管理中现状的信息*/
          this.imgActuality=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          this.hotHouseimgCover=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],//热销户型图各标签
          this.hotHouseimgFourto=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          this.hotHouseimgFavourableFactor=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          this.hotHouseimgNegativeFactor=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          this.hotHouseimgActuality=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          this.productPlanningDiagramimgCover=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],//产品规划图
          this.productPlanningDiagramimgFourto=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          this.productPlanningDiagramimgFavourableFactor=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          this.productPlanningDiagramimgNegativeFactor=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          this.productPlanningDiagramimgActuality=[
            {
              src:'',
              title:'',
              shortSrc:'',
            }
          ],
          this.ruleForm2= {
            firstSellTimeBuss:"", //首开时间(持有商业)
            includingArea:"",//其中:持有商业建筑面积
            runningTypeCom:"", //业态(竞品)
            planedLandTitles: [],
            planed_land_title: [],//规划用地性质 select
            developer: '',//开发商
            developers: '',//开发商 select
            handoverStandard: '',
            handover_standard: '',//交付标准 select
            running_type: '',//业态类型 select
            /*项目基本信息*/
            name: '',//项目名称
            landEdge: '',//描边
            firstSellTime: '',//首开时间
            acquisitionTime: '',//获取时间
            getUnitPrice: '',//获取单价（元/平米）
            constructionLandArea: '',//建设用地面积（平米）
            plotRatio: '',//容积率
            buildingConstructionArea: '',//建筑面积（平米）

            /*客户描摹*/
            customerDescription: '',//客户描摹
            /*溢价点*/
            projectAdvantage: '',//项目优势
            Weakness: '',//项目劣势
            transactionInformation: [
              {
                runningType: '',//业态类型
                areaProportion: '',//占比面积（%）
                tradeSupply: '',//月度供应量（平方米）
                tradeCount: '',//月度成交量（平方米）
                sellingPrice: '',//售价（元/平米）
                finalPrice: '',//月度成交均价（元/平方米）
                tradeStock: '',//当前库存量（平方米）
                sellingNums: '',//月均销售套数
                sellPeriod: '',//去化周期（月）
                presentedWay: '',//赠送方式
              }
            ],//成交信息

          }
      }
    },
//    props: {
//      competitorParm: Object
//    }
  }
</script>
<style lang="less">
  #competingProduct{
  .newProject {
    margin: 0px auto;
    background-color: white;
  }
  .newProject-title {
    height: 50px;
    text-align: center;
    background:#67649F;
    position: fixed;
    width: 63%;
    z-index:3;
    padding-bottom: 4px;
  }
  .newProject-title .survey{
    clear: both;
    position: relative;
  }
  .newProject-title .survey p{
    width:80%;
    height: 50px;
    line-height: 50px;
    font-size: 16px !important;
    color: #FFFFFF;
    padding: 0;
    /*超出...*/
    overflow:hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    word-break: normal;
  }

  .newProject-title .survey .btn{
    /*float: right;*/
    position: absolute;
    right: 0;
    top:50% !important;
    transform:translate(0%,-50%);

  }
  .newProject-title .survey .el-button{
    text-align: center;
    width: 80px!important;
    height: 30px!important;
    line-height: 0;
  }

  .newProject-title .survey button:nth-of-type(1){
    border: 1px solid #fff;
  }
  .newProject-title .survey button:nth-of-type(2){
    margin-right:25px;
  }
  .newProject-title .survey .el-button--primary{
    background-color: #67649F;
    border-color: #67649F;
  }
  /*栅格*/
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  /*栅格结束*/
  .competingProduct-body{
    margin-top: 10px;
    height: 1200px;
  }
  .competingProduct-body .basicProjectInformation .form{
    margin-top: 10px;
    height: 90px;
  }

  .competingProduct-body .form .proAddress{
    clear: both;
  }
  .competingProduct-body .form .mandatory01 .el-form-item__label::before{
    content:"*";
    color: #ff4949;
    position: absolute;
    left: 41px;
    top: 20px;
  }
  .competingProduct-body .form .mandatory02 .el-form-item__label::before{
    content:"*";
    color: #ff4949;
    position: absolute;
    left: 41px;
    top: 77px;
  }
  .inputLength .el-select {
    width: 97% !important;
  }
  .competingProduct-body .form .proAddress .proAddress-left{
    float: left;
    width: 80%;
  }
  .competingProduct-body .form .proAddress .proAddress-right{
    width: 18%;
    float: right;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    /*height: 100px;*/
    vertical-align:center;
    text-align: center;
    display: table-cell;
  }
  .competingProduct-body .form .proAddress .proAddress-left2{
    width: 18%;
    float: left;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    vertical-align:center;
    text-align: center;
    display: table-cell;
    position: relative;
    height: 80px;
  }
  .competingProduct-body .form .proAddress .proAddress-right2{
    margin-left: 10px;
    float: left;
    line-height:80px;
  }
  .competingProduct-body .form .proAddress .proAddress-right img{
    width: 54px;
    height: 54px;

  }
  .competingProduct-body .form .proAddress .proAddress-left2 img{
    width: 54px;
    height: 54px;
    margin-bottom: 10px;
  }
  .competingProduct-body .form .proAddress .proAddress-left2 p{

  }
  .competingProduct-body .form .proBoundary{ clear: both;}
  .competingProduct-body .form .proBoundary .proBoundary-left{
    width: 18%;
    float: left;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    /*height: 100px;*/
    vertical-align:center;
    text-align: center;
    display: table-cell;
    height: 80px;
  }
  /*影响项目地址 图片与文字之间的间距*/
  .competingProduct-body .proAddress .el-form-item__content{
    line-height: 0;
  }
  .competingProduct-body .proBoundary .el-form-item__content{
    line-height: 0;
  }
  .competingProduct-body .proPlayers {

  }
  .competingProduct-body .proPlayers .el-form-item__content{
    line-height: 10px;
  }
  .competingProduct-body .form .proBoundary .proBoundary-left img{  width: 54px;
    height: 54px;
    margin-bottom: 10px;}
  .competingProduct-body .form .proBoundary .proBoundary-left p{
  }
  .competingProduct-body .form .proBoundary .proBoundary-right{  width: 70%;   width: 300px;
    float: left;  }
  .competingProduct-body .form .proBoundary .proBoundary-right p{
    margin-left: 10px;
    float: left;
    line-height:80px;}
  .competingProduct-body   .textInput{
    /*height: 100%;*/
    margin-top: 15px;
  }
  .competingProduct-body  .textInput .el-textarea__inner {
    height: 90px;
    resize:none
  }
  /*图片管理*/
  .competingProduct-body .imageManagement .proPhoto .tabs {
    position: relative;
  }
  .competingProduct-body .imageManagement .proPhoto .tabs p{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .competingProduct-body .imageManagement .proPhoto .btn{
    background-color: #67649F ;
    border-color: #67649F;
    line-height: 1;
    cursor: pointer;
    padding: 10px 15px 10px 5px;
    border-radius: 4px;
    position: relative;
  }
  .competingProduct-body .imageManagement .proPhoto .btn:before {
    content:"";
    background:url('../../assets/images/add.png') no-repeat ;
    background-size:14px 14px;
    text-align: center;
    color: #fff;
    float: left;
    border-radius: 25px;
    display: block;
    width: 14px;
    height: 14px;
    margin-right: 2px;
  }
  .competingProduct-body .imageManagement  tabs el-tabs el-tabs--border-card{
    box-shadow: 0 0px 0px 0 rgba(0,0,0,0), 0 0 0px 0 rgba(0,0,0,0);
    border:none;
  }

  .competingProduct-body .imageManagement  .tabs  .el-tab-pane{
    height: 300px;
  }

  .competingProduct-body .imageManagement  .form .proPhoto .el-button--primary{
    background-color: #67649F;
    border-color: #67649F;
    margin-bottom: 10px;
  }
  .competingProduct-body .imageManagement  .form .proPhoto  .el-tabs__content{
    height: 100%;
    width: 100%;
    padding: 0;
  }

  .competingProduct-body .form  .button{
    background-color: #67649F ;
    border-color: #67649F;
    line-height: 1;
    cursor: pointer;
    padding: 10px 15px 10px 5px;
    border-radius: 4px;
    position: relative;
  }
  .competingProduct-body .form  .button:before {
    content:"";
    background:url('../../assets/images/add.png') no-repeat ;
    background-size:14px 14px;
    text-align: center;
    color: #fff;
    float: left;
    border-radius: 25px;
    display: block;
    width: 14px;
    height: 14px;
    margin-right: 2px;
  }
  .competingProduct-body .meterCapacitance  .btn{
    background-color: #67649F ;
    border-color: #67649F;
    line-height: 1;
    cursor: pointer;
    padding: 10px 15px 10px 5px;
    border-radius: 4px;
    position: relative;
  }
  .competingProduct-body .meterCapacitance  .btn:before {
    content:"";
    background:url('../../assets/images/add.png') no-repeat ;
    background-size:14px 14px;
    text-align: center;
    color: #fff;
    float: left;
    border-radius: 25px;
    display: block;
    width: 14px;
    height: 14px;
    margin-right: 2px;
  }

  .competingProduct-body .countAndDelete span:nth-of-type(1){
    float: left;
  }
  .competingProduct-body .countAndDelete span:nth-of-type(2){
    float: right;
    padding-right: 20px;
  }
  .competingProduct-body .countAndDelete{
    height: 40px;
    background: #E2E2ED;
  }
  .competingProduct-body .dealInfor   .form{

  }
  .competingProduct-body .dealInfor  .uploadInfor {
    height:550px;
    border: 1px solid #EDEDED;
    margin-bottom: 10px;
  }
  .competingProduct-body .dealInfor  .uploadInfor .uploadInforBody{
    margin-top: 20px;
    padding: 20px;
    height: 300px;

  }
  .competingProduct-body .dealInfor  .uploadInfor .uploadInforBody .form{
    height: 80px;
  }
  .competingProduct-body .dealInfor  .uploadInfor .uploadInforBody .form .dateLength .el-date-editor.el-input{
    width: 155px;
  }
  .competingProduct-body .proPlayers {

  }
  .competingProduct-body .proPlayers .el-form-item__content{
    line-height: 10px;
  }
  .competingProduct-body .form .proPlayers  {

  }
  .competingProduct-body .form .proPlayers  img{
    width: 15px;
    position: absolute;
    left: 5px;
    display: inline-block;
  }
  .competingProduct-body .form .proPlayers  button{
    background-color: #67649F ;
    border-color: #67649F;
    line-height: 1;
    cursor: pointer;
    padding: 10px 15px 10px 5px;
    border-radius: 4px;
    position: relative;
  }
  .competingProduct-body .form .proPlayers span:before {
    content:"";
    background:url('../../assets/images/add.png') no-repeat ;
    background-size:14px 14px;
    /*background-position: -10px 0;*/
    /*z-index:100;*/
    /*background:url('../../static/images/test.jpg') ;*/
    /*background-position: 50px 100px;*/
    /*font-weight:bold;*/

    text-align: center;
    /*line-height: 42px;*/
    color: #fff;
    float: left;
    /*position: relative;*/
    /*top: 30px;*/
    border-radius: 25px;
    display: block;
    width: 14px;
    height: 14px;
    margin-right: 2px;
  }
  .competingProduct-body .form .proPlayers button span{
    /*margin-left: 13px;*/
    color: white;
    font-size: 14px;
    box-sizing: border-box;
    /*line-height:20px;*/
  }
  /*定制proPlayers弹窗内容*/
  .competingProduct-body .form .proPlayers .el-dialog__title{

  }
  .competingProduct-body .form .proPlayers .verScrollBar{
    /*border: 1px solid #000;*/
    height: 410px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .competingProduct-body .form .proPlayers ui{
    clear: both;
  }
  .competingProduct-body .form .proPlayers li{
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 110px;
    height: 160px;
    float: left;
    margin:10px 10px 10px 0;
    position: relative;
    /*box-sizing: border-box;*/
  }
  .competingProduct-body .form .proPlayers .proPlayersList{
    text-align: center;
    vertical-align:center;
    display: table-cell;
    position: relative;
    height: 200px;
  }
  .competingProduct-body .form .proPlayers .proPlayersList img{
    width: 50px;
    height: 50px;
    position: relative;
    margin-top: 10px;
    left:0
  }
  .competingProduct-body .form .proPlayers .proPlayersList p {
    margin-top: 12px;
  }
  .competingProduct-body .form .proPlayers .proPlayersList p:nth-of-type(1) {
    font-size: 14px;
  }
  .competingProduct-body .form .proPlayers .proPlayersList p:nth-of-type(2) {
    font-size: 12px;
    line-height: 16px;

  }
  .competingProduct-body .form .proPlayers .proPlayersList p:nth-of-type(3) {
    font-size: 12px;
    line-height: 16px;

  }
  .competingProduct-body .form .proPlayers .proPlayersList p:nth-of-type(4) {
    font-size:8px;
    /*display: block;*/
    display: none;
    line-height: 30px;
  }
  .competingProduct-body .form .proPlayers .proPlayersList p:nth-of-type(4):before {
    content:'';
    background:url('../../assets/images/delete.png') no-repeat ;
    background-size:24px 24px;
    width: 24px;
    height: 24px;
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .competingProduct-body .form .proPlayers .proPlayersList:hover .delete{
    font-size: 8px;
    height: 30px;
    width: 100%;
    display: block;
    /*display: none;*/
    opacity: 0.6;
    background: #000000;
    position: absolute;
    left: 0px;
    top: 160px;
    border-radius: 2px;
  }

  /*上传附件*/
  .componentBox{
  .tableBox{width:100%;}
  .tableBox .width1{width:61%}
  .tableBox .width2{width:13%}
  .tableBox th{background-color:#E2E2ED;color:#67649F;line-height:30px;font-size:14px;}
  .tableBox td{border:1px solid #ddd;text-align:center;line-height:30px;font-size:12px;}
  .tableBox tr td:nth-child(1){text-align: left;text-indent:15px;}
  .tableBox tr td:nth-child(4){cursor:pointer;}
  .upload-demo{float:right;}
  .el-button--primary{width:100px;height:32px;background:url("../../assets/images/add.png") 8px 6px no-repeat;background-color:#67649F;border-color:#67649F;background-size:16px;}
  }
  /*每一个tab切换对应内容最外层盒子*/
  .titleComponentName{height:50px;line-height:50px;text-align:left;}
  .titleComponentName{
  .addButton{display:block;width:125px;height:36px;line-height:36px;color:#fff;font-size:14px;text-align:center;float:right;border-radius:4px;margin-top:6px;background:url("../../assets/images/add.png") 18px 9px no-repeat;background-size:16px ;background-color:#67649F;cursor:pointer;text-indent:12px;}
  /*遮罩层*/
  .modelBox {display: block;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.3);position: fixed;top: 0;left: 0;z-index: 20000;}
  }
  .loadingStyle {position: absolute;top: 50%;left: 0; width: 100%;color: #fff;font-size: 16px;text-align: center;user-select:none;}
  /*关联竞品样式*/
  .position{position:relative;}
  .contendProduct{width:100%;overflow:hidden;}
  .relevanceBox{width:29%;margin:2%;border:1px solid #bbb;border-radius:4px;display:table;text-align:center;height:220px;float:left;padding-bottom:20px;}
  .relevanceBox{position:relative}
  .relevanceBox{
  .deleteIcon{width:100%;height:30px;background:url("../../assets/images/delete.png") center center no-repeat;background-color:rgba(0,0,0,0.4);position: absolute;left:0;bottom:0;cursor:pointer;border-radius:0 0 4px 4px;}
  .relevance{width:90%;height:90%;padding-top:5%;margin:0 auto;user-select: none;}
  .imgBox{display:block; vertical-align:middle;position:relative;width:100%;height:120px;background-color:rgba(9,9,9,0.3);border-radius:4px;line-height:120px;}
  .imgBox img{max-width:100%;max-height:120px;display:block;margin:0 auto;display:block;}
  .title{font-size:14px;color:#444;text-align:left;display:block}
  .contentText{font-size:12px;color:#999;text-align:left;line-height:16px;padding-left:15px;background:url("../../assets/images/locationIcon.png") left center no-repeat;display:block}
  }
  /*关联竞品样式*/
  .position{position:relative;}
  .contendProduct{width:100%;overflow:hidden;}
  .relevanceBox{width:29%;margin:2%;border:1px solid #bbb;border-radius:4px;display:table;text-align:center;height:220px;float:left;padding-bottom:20px;}
  .relevanceBox{
  .relevance{width:90%;height:90%;padding-top:5%;margin:0 auto;user-select: none;}
  .imgBox{display:block; vertical-align:middle;position:relative;width:100%;height:120px;background-color:rgba(9,9,9,0.3);border-radius:4px;line-height:120px;}
  .imgBox img{max-width:100%;max-height:120px;display:block;margin:0 auto;display:block;}
  .imgBox .deleteIcon{width:100%;height:30px;background:url("../../assets/images/delete.png") center center no-repeat;background-color:rgba(0,0,0,0.4);position: absolute;left:0;bottom:0;cursor:pointer;border-radius:0 0 4px 4px;}
  .title{font-size:14px;color:#444;text-align:left;display:block}
  .contentText{font-size:12px;color:#999;text-align:left;line-height:16px;padding-left:15px;background:url("../../assets/images/locationIcon.png") left center no-repeat;display:block}
  }
  /*关联竞品弹出框*/
  .addRelevance{width:500px;height:400px;border:1px solid #ddd;right:0;top:50px;padding:20px;overflow:hidden;background-color:#fff;padding-bottom:80px;margin:0 auto;position:relative;margin-top:50px;}
  .CloseBox{width:100%;height:30px;line-height:30px;}
  .addRelevance .textName{height:30px;line-height:30px;float:left}
  .closeBtn{width:30px;height:30px;line-height:30px;float:right;background:url("../../assets/images/close.png") center center no-repeat;background-size:16px;cursor:pointer;}
  .search{width:90%;height:26px;border:1px solid #ddd;border-radius:4px;background:url("../../assets/images/search.png") 5px center no-repeat;padding-left:25px;background-size:16px;}
  .leftListBox{width:230px;height:90%;display:block;float:left;overflow-y:auto;}
  .rightListBox{width:230px;height:90%;display:block;float:left;overflow-y:auto;padding-left:20px;position:relative;}
  .rightListBox:before{position:absolute;left:0;top:0;border-left:1px solid #ddd;content:'';display:block;height:100%;}
  .affirmBox{width:100%;height:36px;line-height:26px;position:absolute;left:0;bottom:0;background-color:rgba(0,0,0,0.3);text-align:right;z-index:10;}
  .affirmBox .affirmBtn{width:60px;height:24px;line-height:24px;border:1px solid #67649F;background-color:#67649F;border-radius:4px;color:#fff;display:block;text-align:center;float:right;padding:0;cursor:pointer;user-select:none;margin-top:5px;margin-right:20px;}
  .checkBox .check{line-height:24px;position:relative;padding:5px 0;padding-right:32px;}
  .checkBox .check .addAndSubtract{display:block;width:20px;height:20px;position: absolute;top:50%;right:10px;margin-top:-10px;cursor:pointer;}
  .checkBox .check .littleAddBtn{border-radius:50%;border:1px solid #ddd;}
  .checkBox .check .activeCheck{background:url("../../assets/images/checkyes.png") center center no-repeat;background-color:#67649F;border-radius:50%;background-size:24px;}
  .checkBox .check .subtract{background-color:red;border-radius:50%;line-height:16px;color:#fff;text-align:center;font-weight: bold;font-size:20px;}
  .is-danger {
    border: 1px solid red;
    border-radius: 4px;
  }

  .help {
    position: absolute;
    line-height: 12px;
    font-size: 12px;
    color: red;
    padding: 2px 10px 0;
    bottom: -27px;
  }
  /*textarea字数统计*/
  .statistics {
    position: absolute;
    right: 28px;
    bottom: 15px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #CCCCCC;
    letter-spacing: 0;
    line-height: 14px;
  }

  }
</style>
