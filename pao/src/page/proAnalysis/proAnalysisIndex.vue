<template>
  <div id="proAnalysisIndex" v-loading="loadingA"
       element-loading-text="文件上传中,请耐心等待"
       element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.5)">
    <div class="newProject " :gutter="20">
      <el-row justify="center">
          <!--<div class="newProject-title">-->
            <!--<div class="survey">-->
              <!--<p>{{childParm.projectName}}</p>-->
              <!--<div class="btn">-->
                <!--<el-button type="primary" @click="theCancelPopup">关闭</el-button>-->
                <!--<el-button v-if="btnNone" type="" @click="subProAnalysisIndex"  :plain="true" class="">保存</el-button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
              <div class="closeNav">
          <p class=" tit fl" :title="childParm.projectName">{{childParm.projectName}}</p>
          <div v-if="btnNone==true">
            <span class="closeButton fl" @click="theCancelPopup">关闭</span>
            <span class="saveButton fl"  @click="subProAnalysisIndex">保存</span>
          </div>
          <div v-else="btnNone==false">
            <span class="closeButton fr" @click="theCancelPopup">关闭</span>
          </div>
        </div>
           <div id="conMod">
              <div class="proAnalysisIndex-body">
            <div class="marketBidding">
              <el-col :span="24">
                <div class="marketBidding-title">
                  <p style="margin-left: 15px;">公开市场竞买信息</p>
                  <hr>
                </div>
                <div class="marketBidding-body">
                  <el-col :span="1"><div class="grid-content "></div></el-col>
                  <el-col :span="23">
                    <div class="marketBidding-body-infor">
                      <el-form  :model="ruleForm2" status-icon ref="ruleForm2" label-width="200px"  :rules="rules2" class="demo-ruleForm form" >
                        <div style="clear:both">
                          <el-col :span="12">
                            <div class="left">
                              <el-form-item label="公告时间" prop="pass" >
                                <div class="block">
                                  <el-date-picker
                                    :disabled="disabledFlag"
                                    :editable="disabledDate"
                                    v-model="noticeDate"
                                    type="date"
                                    @change="dateFormatConversionNoticeDate"
                                      placeholder="选择日期时间">
                                  </el-date-picker>
                                </div>
                              </el-form-item>
                              <el-form-item label="报名起始时间" prop="pass" >
                                <div class="block">
                                  <el-date-picker
                                    :disabled="disabledFlag"
                                    :editable="disabledDate"
                                    v-model="signStartTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                  </el-date-picker>
                                </div>
                              </el-form-item>
                              <el-form-item label="竞价时间" prop="pass">
                                <div class="block">
                                  <el-date-picker
                                    :disabled="disabledFlag"
                                    :editable="disabledDate"
                                    v-model="auction_time"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                  </el-date-picker>
                                </div>
                              </el-form-item>
                              <el-form-item label="竞买保证金额度" prop="auctionAmount">
                                <el-col :span="20"> <el-input :disabled="disabledFlag" v-model="ruleForm2.auctionAmount"></el-input></el-col>
                                <el-col :span="4"><span>万元</span></el-col>
                              </el-form-item>
                              <el-form-item label="资金证明的额度" prop="fundProofAmount">
                                <el-col :span="20"> <el-input :disabled="disabledFlag" v-model="ruleForm2.fundProofAmount"></el-input></el-col>
                                <el-col :span="4"><span>万元</span></el-col>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="right">
                              <el-form-item label="竞买保证金截止时间" prop="pass">
                                <div class="block">
                                  <el-date-picker
                                    :disabled="disabledFlag"
                                    :editable="disabledDate"
                                    v-model="marginEndTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                  </el-date-picker>
                                </div>
                              </el-form-item>
                              <el-form-item label="报名截止时间" prop="pass">
                                <div class="block">
                                  <el-date-picker
                                    :disabled="disabledFlag"
                                    :editable="disabledDate"
                                    v-model="signEndTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                  </el-date-picker>
                                </div>
                              </el-form-item>
                              <el-form-item label="起始总价" prop="totalPriceBegin">
                                <el-col :span="20"> <el-input :disabled="disabledFlag" type="totalPriceBegin"  v-model="ruleForm2.totalPriceBegin"></el-input></el-col>
                                <el-col :span="4"><span>万元</span></el-col>
                              </el-form-item>
                              <el-form-item label="如未获取，保证金退回时间" prop="pass" class="marginReturn">
                                <div class="block">
                                  <el-date-picker
                                    :disabled="disabledFlag"
                                    :editable="disabledDate"
                                    v-model="backAuctionDate"
                                    type="date"
                                    @change="dateFormatConversionBackAuctionDate"
                                    placeholder="选择日期时间">
                                  </el-date-picker>
                                </div>
                              </el-form-item>
                              <el-form-item label="交地标准" prop="pass">
                                <el-select :disabled="disabledFlag" v-model="ruleForm2.acquiescencePayStandard" placeholder="请选择">
                                  <el-option
                                    v-for="item in ruleForm2.payStandard"
                                    :key="item.dictName"
                                    :label="item.dictName"
                                    :value="item.dictCode">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                          </el-col>
                        </div>
                      </el-form>
                    </div>
                  </el-col>
                </div>
              </el-col>
            </div>
            <div class="theSurPlanning">
                <div class="theSurPlanning-title">
                  <p style="margin-left: 15px;">项目周边规划情况</p>
                  <hr>
                </div>
              <el-col :span="23">
                <div class="theSurPlanning-body">
                  <el-col :span="1"><div class="grid-content "></div></el-col>
                  <el-col :span="23">
                    <div class="theSurPlanning-body-info">
                      <div class="imageManagement">
                        <el-form  status-icon  label-width="100px" class="demo-ruleForm form" >
                          <el-form-item label="" class="proPhoto"  >
                            <heavyImageManagement @componentDataSynchronization="peoRoundEnvironmentcomponentDataSynchronization" :picturesRef="peoRoundEnvironment" :btnNone="btnNone"  :dictionariesList="peoRoundEnvironmentdictionariesList" :dictionariesTitle="peoRoundEnvironmentdictionariesTitle"></heavyImageManagement>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div class="detailInformation">
                        <el-form   label-width="180px" class="demo-ruleForm form" >
                          <el-form-item label="竞买方式" class=""  >
                            <el-select :disabled="disabledFlag" v-model="ruleForm2.acquiescenceAuction_type" placeholder="请选择">
                              <el-option
                                v-for="item in ruleForm2.auction_type"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictCode">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-form>
                        <el-form   label-width="100px"  class="demo-ruleForm form" >
                          <el-form-item label="" prop="">
                            <div class="textInput">
                              <p>其他说明</p>
                              <el-input
                                :disabled="disabledFlag"
                                :maxlength="140"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="ruleForm3.otherDescription">
                              </el-input>
                              <span class="statistics">{{ruleForm3.otherDescription.length}}/{{140}}</span>
                            </div>
                          </el-form-item>
                          <el-form-item label="" prop="">
                            <div class="textInput">
                              <p>文件（公告）编号</p>
                              <el-input
                                :disabled="disabledFlag"
                                :maxlength="140"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="ruleForm3.documentNumber">
                              </el-input>
                              <span class="statistics">{{ruleForm3.documentNumber.length}}/{{140}}</span>
                            </div>
                          </el-form-item>
                          <el-form-item label="" prop="">
                            <div class="textInput">
                              <p>地块编号</p>
                              <el-input
                                :disabled="disabledFlag"
                                :maxlength="64"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="ruleForm3.landNumbering">
                              </el-input>
                              <span class="statistics">{{ruleForm3.landNumbering.length}}/{{64}}</span>
                            </div>
                          </el-form-item>
                          <el-form-item label="" prop="">
                            <div class="textInput">
                              <p>一级开发单位</p>
                              <el-input
                                :disabled="disabledFlag"
                                :maxlength="64"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="ruleForm3.primaryDevelopmentUnit">
                              </el-input>
                              <span class="statistics">{{ruleForm3.primaryDevelopmentUnit.length}}/{{64}}</span>
                            </div>
                          </el-form-item>
                          <el-form-item label="" prop="">
                            <div class="textInput">
                              <p>竞买规则</p>
                              <el-input
                                :disabled="disabledFlag"
                                :maxlength="140"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="ruleForm3.biddingRules">
                              </el-input>
                              <span class="statistics">{{ruleForm3.biddingRules.length}}/{{140}}</span>
                            </div>
                          </el-form-item>
                          <el-form-item label="" prop="">
                            <div class="uploadAttachments">
                              <div style="clear: both;height:40px;margin-top: 5px;">
                                <p style="float: left;">标书扫描件</p>
                                <el-upload style="float:right;"
                                           class="upload-demo"
                                           :action="url"
                                           :headers="headers"
                                           :on-success="success13"
                                           multiple
                                           :limit="3"
                                           :on-exceed="handleExceed"
                                           :show-file-list="false"
                                           :before-upload="beforeAvatarUpload"
                                           :on-progress="upLoad"
                                >
                                  <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                                </el-upload>
                              </div>
                              <table  border="0" class="table">
                                <tr class="hang">
                                  <th><span>附件名称</span></th>
                                  <th><span>文件大小</span></th>
                                  <th><span>权限</span></th>
                                  <th><span>操作</span></th>
                                </tr>
                                <tr v-for="(item,index) in uploadAttachments13">
                                  <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>                                      <td>{{item.fileSize}}</td>
                                  <td>
                                    <el-select  v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                      <el-option
                                        :disabled="disabledFlag"
                                        v-for="item in privacy13"
                                        :key="item.dictName"
                                        :label="item.dictName"
                                        :value="item.dictCode">
                                      </el-option>
                                    </el-select>
                                  </td>
                                  <td @click="deleteAvatarUpload13(index)" v-if="btnNone">删除</td>
                                </tr>
                              </table>
                            </div>
                          </el-form-item>
                        </el-form>
                        <el-form :model="ruleForm3" status-icon ref="ruleForm3" :rules="rules3"  label-width="100px" class="demo-ruleForm form" >
                          <el-form-item label="" class=""  >
                            <el-tabs v-model="activeName"  >
                              <el-tab-pane label="占地及规划信息" name="first" class="landPlan">
                                <div  status-icon  label-width="110px" class="demo-ruleForm landPlan01" >
                                  <div class="landPlanSection01">
                                    <el-col :span="12">
                                      <el-form-item label="总占地面积" prop="planed_area_total">
                                        <el-col :span="20"> <el-input :disabled="disabledFlag" v-model="ruleForm3.planed_area_total"></el-input></el-col>
                                        <el-col :span="4"><span>平米</span></el-col>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                      <el-form-item label="建设用地面积" prop="planed_building_area">
                                        <el-col :span="20"> <el-input :disabled="disabledFlag"  v-model="ruleForm3.planed_building_area"></el-input></el-col>
                                        <el-col :span="4"><span>平米</span></el-col>
                                      </el-form-item>
                                    </el-col>
                                  </div>
                                  <div class="landPlanSection01">
                                    <el-col :span="12">
                                      <el-form-item label="计容地上建面" prop="floorCoveredArea">
                                        <el-col :span="20"> <el-input :disabled="disabledFlag" v-model="ruleForm3.floorCoveredArea"></el-input></el-col>
                                        <el-col :span="4"><span>平米</span></el-col>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                      <el-form-item label="综合容积率" prop="plot_ratio">
                                        <el-col :span="20"> <el-input :disabled="disabledFlag" v-model="ruleForm3.plot_ratio"></el-input></el-col>
                                        <el-col :span="4"><span></span></el-col>
                                      </el-form-item>
                                    </el-col>
                                  </div>
                                  <div class="landPlanSection01">
                                    <el-col :span="12">
                                      <el-form-item label="代征土地面积" prop="floorArea">
                                        <el-col :span="20"> <el-input   :disabled="disabledFlag" v-model="ruleForm3.floorArea"></el-input></el-col>
                                        <el-col :span="4"><span>平米</span></el-col>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                      <el-form-item label="可售面积(地上)" prop="merchantableArea">
                                        <el-col :span="20"> <el-input  :disabled="disabledFlag" v-model="ruleForm3.merchantableArea"></el-input></el-col>
                                        <el-col :span="4"><span>平米</span></el-col>
                                      </el-form-item>
                                    </el-col>
                                  </div>
                                  <el-form-item label="规划用地性质"  class="inputLength landPlanSection01">
                                    <el-select :disabled="disabledFlag" v-model="ruleForm3.acquiescenceLandUsage" multiple placeholder="请选择">
                                      <el-option
                                        v-for="item in ruleForm3.landUsage"
                                        :key="item.dictName"
                                        :label="item.dictName"
                                        :value="item.dictCode">
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                </div>
                                <div class="imageManagement">
                                  <el-form  status-icon  label-width="0px" class="demo-ruleForm form" >
                                    <div class="imageManagement">
                                      <el-form-item label="" class="proPhoto"  >
                                        <heavyImageManagement @componentDataSynchronization="buildingPlancomponentDataSynchronization" :btnNone="btnNone" :picturesRef="buildingPlan" :dictionariesList="buildingPlandictionariesList" :dictionariesTitle="buildingPlandictionariesTitle"></heavyImageManagement>
                                      </el-form-item>
                                    </div>
                                  </el-form>
                                </div>
                                <div  status-icon ref="ruleForm3" :rules="rules3" label-width="110px" class="demo-ruleForm meterCapacitance" >
                                  <p style="height:10px;margin-top: 5px;">地块信息</p>
                                  <div style="clear: both;height:40px;margin-top: 5px;">
                                    <!--<el-button v-if="btnNone" type="primary"  class="btn" style="float: right;" @click="addBlockInformation()">添加</el-button>-->
                                  </div>
                                  <ul>
                                    <li v-for="(item,index) in ruleForm3.plotInfo">
                                      <div class="meterCapacitanceInfo">
                                        <div class="meterCapacitanceInfoTitle">
                                          <el-col :span="2"><span class="offsetLeft">{{ruleForm3.plotInfo.length-index}}</span></el-col>
                                          <el-col :span="20"><span></span></el-col>
                                          <!--<el-col :span="2"><span @click="deleteBlockInformation(index)">删除</span></el-col>-->
                                        </div>
                                        <div class="meterCapacitanceInfoBody">
                                          <div class="meterCapacitance01">
                                            <el-col :span="8">
                                              <el-form-item label="地块" prop="landName">
                                                <!--<el-col :span="18"> <el-input  :disabled="true"  v-model="ruleForm3.plotInfo[ruleForm3.plotInfo.length-1-index].landName"></el-input></el-col>-->
                                                <el-col :span="18"> <el-input  :disabled="true"  v-model="item.landName"></el-input></el-col>
                                                <el-col :span="6"><span></span></el-col>
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                              <el-form-item label="建筑密度" prop="buildingDensity">
                                                <el-col :span="18"> <el-input :disabled="disabledFlag"  v-model="item.buildingDensity"
                                                                              v-validate="{ regex: reg2 }" :name="'buildingDensity'+index"
                                                                              :class="{'input': true, 'is-danger': errors.has('buildingDensity'+index)}"
                                                ></el-input>
                                                  <div v-if="errors.has('buildingDensity'+index)&&item.buildingDensity!=''||item.buildingDensity>100" class="help length">{{'保留两位小数,0~100'}}</div>
                                                </el-col>
                                                <el-col :span="6"><span>%</span></el-col>
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                              <el-form-item label="控制高度" prop="controlHeight">
                                                <el-col :span="18"> <el-input :disabled="disabledFlag"  v-model="item.controlHeight"
                                                                              v-validate="{ regex:reg2}" :name="'controlHeight'+index"
                                                                              :class="{'input': true, 'is-danger': errors.has('controlHeight'+index)}"
                                                ></el-input>
                                                  <div v-if="errors.has('controlHeight'+index)&&item.controlHeight!=''||item.controlHeight>10000" class="help length">{{'保留两位小数,0~10000'}}</div>
                                                </el-col>
                                                <el-col :span="6"><span>米</span></el-col>
                                              </el-form-item>
                                            </el-col>
                                          </div>
                                          <div class="meterCapacitance01" >
                                            <el-col :span="8">
                                              <el-form-item label="容积率" prop="volumeRate">
                                                <el-col :span="18"> <el-input :disabled="disabledFlag"  v-model="item.volumeRate"
                                                                              v-validate="{ regex: reg2 }" :name="'volumeRate'+index"
                                                                              :class="{'input': true, 'is-danger': errors.has('volumeRate'+index)}"
                                                ></el-input>
                                                  <div v-if="errors.has('volumeRate'+index)&&item.volumeRate!=''||item.volumeRate>100" class="help length">{{'保留两位小数,0~100'}}</div>
                                                </el-col>
                                                <el-col :span="6"><span></span></el-col>
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                              <el-form-item label="绿地率" prop="greenRate">
                                                <el-col :span="18"> <el-input :disabled="disabledFlag"  v-model="item.greenRate"
                                                                              v-validate="{ regex: /^[0-9|.]*$/ }" :name="'greenRate'+index"
                                                                              :class="{'input': true, 'is-danger': errors.has('greenRate'+index)}"
                                                ></el-input>
                                                  <div v-if="errors.has('greenRate'+index)&&item.greenRate!=''||item.greenRate>100" class="help length">{{'保留两位小数,0~100'}}</div>
                                                </el-col>
                                                <el-col :span="6"><span>%</span></el-col>
                                              </el-form-item>
                                            </el-col>
                                          </div>
                                          <el-form-item label="用地性质" class="inputLength groundSituation">
                                            <el-select :disabled="disabledFlag" v-model="item.landTitle" multiple placeholder="请选择">
                                              <el-option
                                                v-for="items in ruleForm3.landTitle"
                                                :key="items.dictName"
                                                :label="items.dictName"
                                                :value="items.dictCode">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                          <el-form-item label="退线要求" prop="" class="meterCapacitance02 textInput">
                                            <el-input
                                              :disabled="disabledFlag"
                                              :maxlength="64"
                                              type="textarea"
                                              :rows="2"
                                              placeholder="请输入内容"
                                              v-model="item.backlineRequire">
                                            </el-input>
                                            <!--<span class="statistics">{{ruleForm3.plotInfo[ruleForm3.plotInfo.length-1-index].backlineRequire.length}}/{{64}}</span>-->
                                            <span class="statistics">{{item.backlineRequire.length}}/{{64}}</span>
                                          </el-form-item >
                                          <el-form-item label="出入口要求" prop="" class="meterCapacitance02 textInput">
                                            <el-input
                                              :disabled="disabledFlag"
                                              :maxlength="64"
                                              type="textarea"
                                              :rows="2"
                                              placeholder="请输入内容"
                                              v-model="item.entranceRequire">
                                            </el-input>
                                            <!--<span class="statistics">{{ruleForm3.plotInfo[ruleForm3.plotInfo.length-1-index].entranceRequire.length}}/{{64}}</span>-->
                                            <span class="statistics">{{item.entranceRequire.length}}/{{64}}</span>
                                          </el-form-item>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <el-form-item label="" prop="">
                                  <div class="textInput">
                                    <p>日照要求</p>
                                    <el-input
                                      :disabled="disabledFlag"
                                      :maxlength="64"
                                      type="textarea"
                                      :rows="2"
                                      placeholder="请输入内容"
                                      v-model="ruleForm3.daylightingStandard">
                                    </el-input>
                                    <span class="statistics">{{ruleForm3.daylightingStandard.length}}/{{64}}</span>
                                  </div>
                                </el-form-item>
                                <el-form-item label="" prop="">
                                  <div class="textInput">
                                    <p>内部道路要求</p>
                                    <el-input
                                      :disabled="disabledFlag"
                                      :maxlength="64"
                                      type="textarea"
                                      :rows="2"
                                      placeholder="请输入内容"
                                      v-model="ruleForm3.roadStandard">
                                    </el-input>
                                    <span class="statistics">{{ruleForm3.roadStandard.length}}/{{64}}</span>
                                  </div>
                                </el-form-item>
                                <el-form-item label="" prop="">
                                  <div class="textInput">
                                    <p>容积率不平衡使用</p>
                                    <el-input
                                      :disabled="disabledFlag"
                                      :maxlength="64"
                                      type="textarea"
                                      :rows="2"
                                      placeholder="请输入内容"
                                      v-model="ruleForm3.plotRatioUse">
                                    </el-input>
                                    <span class="statistics">{{ruleForm3.plotRatioUse.length}}/{{64}}</span>
                                  </div>
                                </el-form-item>
                                <div  status-icon  :rules="rules3"  label-width="140px" class="demo-ruleForm textInput groundPlansBuildHouse" >
                                  <el-form-item label="地上计容住宅建面" prop="floorPlanHouseArea">
                                    <el-col :span="12"> <el-input :disabled="disabledFlag" v-model="ruleForm3.floorPlanHouseArea"></el-input></el-col>
                                    <el-col :span="4"><span>平米</span></el-col>
                                  </el-form-item>
                                </div>
                                <div  status-icon  label-width="110px" class="demo-ruleForm residential check" >
                                  <el-col :span="24">
                                    <p>住宅</p>
                                    <table>
                                      <tr>
                                        <th>标签</th>
                                        <th>自持年限(年)</th>
                                        <th>面积(平米)</th>
                                        <th>售价(元/平米)</th>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div style="margin:5px 5px 5px 5px;width: 224px;">
                                            <div class="paidForFree">
                                              <el-radio-group v-model="ruleForm3.houseRebuildCompensation">
                                                <el-radio-button :disabled="disabledFlag"  class="up"   label="有偿"></el-radio-button>
                                                <el-radio-button :disabled="disabledFlag"  class="down" label="无偿"></el-radio-button>
                                              </el-radio-group>
                                            </div>
                                            <div class="limitPrice">
                                              <el-radio-group v-model="ruleForm3.houseRebuildLimitPrice">
                                                <el-radio-button :disabled="disabledFlag"  class="up" label="有限价"></el-radio-button>
                                                <el-radio-button :disabled="disabledFlag" class="down"  label="无限价"></el-radio-button>
                                              </el-radio-group>
                                            </div>
                                            <div class="distancePlace">
                                              <el-radio-group v-model="ruleForm3.houseRebuildRemote">
                                                <el-radio-button  :disabled="disabledFlag" class="up" label="异地"></el-radio-button>
                                                <el-radio-button  :disabled="disabledFlag" class="down"  label="原地"></el-radio-button>
                                              </el-radio-group>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <el-form-item label="" prop="houseRebuildLimitAge">
                                            <p>
                                              <el-input :disabled="disabledFlag" v-model="ruleForm3.houseRebuildLimitAge"></el-input>
                                            </p>
                                          </el-form-item>
                                        </td>
                                        <td>
                                          <el-form-item label="" prop="houseRebuildArea">
                                            <p><el-input :disabled="disabledFlag" v-model="ruleForm3.houseRebuildArea"></el-input></p>
                                          </el-form-item>
                                        </td>
                                        <td>
                                          <el-form-item label="" prop="houseRebuildPrice">
                                            <p v-if="ruleForm3.houseRebuildCompensation==='有偿'"><el-input :disabled="false" v-model="ruleForm3.houseRebuildPrice"></el-input></p>
                                            <p v-else><el-input :disabled="true" v-model="ruleForm3.houseRebuildPrice"></el-input></p>
                                          </el-form-item>
                                        </td>
                                      </tr>
                                    </table>
                                  </el-col>
                                </div>
                                <div  status-icon  label-width="110px" class="demo-ruleForm residential check" >
                                  <el-col :span="24">
                                    <p>商业</p>
                                    <table>
                                      <tr>
                                        <th>标签</th>
                                        <th>自持年限(年)</th>
                                        <th>面积(平米)</th>
                                        <th>售价(元/平米)</th>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div style="margin: 5px 5px 5px 5px;width: 224px;">
                                            <div class="paidForFree">
                                              <el-radio-group v-model="ruleForm3.commerceRebuildCompensation">
                                                <el-radio-button :disabled="disabledFlag"  class="up"  label="有偿"></el-radio-button>
                                                <el-radio-button :disabled="disabledFlag"  class="down" label="无偿"></el-radio-button>
                                              </el-radio-group>
                                            </div>
                                            <div class="limitPrice">
                                              <el-radio-group v-model="ruleForm3.commerceRebuildLimitPrice">
                                                <el-radio-button :disabled="disabledFlag"  class="up" label="有限价"></el-radio-button>
                                                <el-radio-button :disabled="disabledFlag"  class="down"  label="无限价"></el-radio-button>
                                              </el-radio-group>
                                            </div>
                                            <div class="distancePlace">
                                              <el-radio-group v-model="ruleForm3.commerceRebuildRemote">
                                                <el-radio-button :disabled="disabledFlag"  class="up" label="异地"></el-radio-button>
                                                <el-radio-button :disabled="disabledFlag"  class="down"  label="原地"></el-radio-button>
                                              </el-radio-group>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <el-form-item label="" prop="commerceRebuildLimitAge">
                                            <p><el-input :disabled="disabledFlag" v-model="ruleForm3.commerceRebuildLimitAge"></el-input></p>
                                          </el-form-item>
                                        </td>
                                        <td>
                                          <el-form-item label="" prop="commerceRebuildArea">
                                            <p><el-input :disabled="disabledFlag" v-model="ruleForm3.commerceRebuildArea"></el-input></p>
                                          </el-form-item>
                                        </td>
                                        <td>
                                          <el-form-item label="" prop="commerceRebuildPrice">
                                            <p v-if="ruleForm3.commerceRebuildCompensation==='有偿'"><el-input :disabled="false" v-model="ruleForm3.commerceRebuildPrice"></el-input></p>
                                            <p v-else><el-input :disabled="true" v-model="ruleForm3.commerceRebuildPrice"></el-input></p>
                                          </el-form-item>
                                        </td>
                                      </tr>
                                    </table>
                                  </el-col>
                                </div>
                                <div  status-icon  label-width="110px" class="demo-ruleForm residential check" >
                                  <el-col :span="24">
                                    <p>写字楼</p>
                                    <table>
                                      <tr>
                                        <th>标签</th>
                                        <th>自持年限(年)</th>
                                        <th>面积(平米)</th>
                                        <th>售价(元/平米)</th>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div style="margin: 5px 5px 5px 5px;width: 224px;">
                                            <div class="paidForFree">
                                              <el-radio-group v-model="ruleForm3.officeRebuildCompensation">
                                                <el-radio-button :disabled="disabledFlag"  class="up"  label="有偿"></el-radio-button>
                                                <el-radio-button :disabled="disabledFlag"  class="down" label="无偿"></el-radio-button>
                                              </el-radio-group>
                                            </div>
                                            <div class="limitPrice">
                                              <el-radio-group v-model="ruleForm3.officeRebuildLimitPrice">
                                                <el-radio-button :disabled="disabledFlag"  class="up" label="有限价"></el-radio-button>
                                                <el-radio-button :disabled="disabledFlag"  class="down"  label="无限价"></el-radio-button>
                                              </el-radio-group>
                                            </div>
                                            <div class="distancePlace">
                                              <el-radio-group v-model="ruleForm3.officeRebuildRemote">
                                                <el-radio-button :disabled="disabledFlag"  class="up" label="异地"></el-radio-button>
                                                <el-radio-button :disabled="disabledFlag"  class="down"  label="原地"></el-radio-button>
                                              </el-radio-group>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <el-form-item label="" prop="officeRebuildLimitAge">
                                            <p><el-input :disabled="disabledFlag" v-model="ruleForm3.officeRebuildLimitAge"></el-input></p>
                                          </el-form-item>
                                        </td>
                                        <td>
                                          <el-form-item label="" prop="officeRebuildArea">
                                            <p><el-input :disabled="disabledFlag" v-model="ruleForm3.officeRebuildArea"></el-input></p>
                                          </el-form-item>
                                        </td>
                                        <td>
                                          <el-form-item label="" prop="officeRebuildPrice">
                                            <p v-if="ruleForm3.officeRebuildCompensation==='有偿'"><el-input :disabled="false" v-model="ruleForm3.officeRebuildPrice"></el-input></p>
                                            <p v-else><el-input :disabled="true" v-model="ruleForm3.officeRebuildPrice"></el-input></p>
                                          </el-form-item>
                                        </td>
                                      </tr>
                                    </table>
                                  </el-col>
                                </div>
                                <!--  注释掉的代码会出现输入下标，闲的时候研究下
                                <div  status-icon  label-width="110px" class="demo-ruleForm residential check" >
                                  <el-col :span="24">
                                    <p>写字楼</p>
                                    <table contenteditable="true">
                                      <tr>
                                        <th>标签</th>
                                        <th>自持年限(年)</th>
                                        <th>面积(平米)</th>
                                        <th>售价(元/平米)</th>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div style="margin: 5px 5px 5px 5px;width: 224px">
                                            <div  class="paidForFree">
                                              <el-radio-group v-model="ruleForm3.officeRebuildCompensation">
                                                <el-radio-button :disabled="disabledFlag" class="up" label="有偿"></el-radio-button>
                                                <el-radio-button :disabled="disabledFlag" class="down" label="无偿"></el-radio-button>
                                              </el-radio-group>
                                            </div>
                                            <div class="limitPrice">
                                              <el-radio-group v-model="ruleForm3.officeRebuildLimitPrice">
                                                <el-radio-button :disabled="disabledFlag" class="up"  label="有限价"></el-radio-button>
                                                <el-radio-button :disabled="disabledFlag" class="down" label="无限价"></el-radio-button>
                                              </el-radio-group>
                                            </div>
                                            <div class="distancePlace">
                                              <el-radio-group v-model="ruleForm3.officeRebuildRemote">
                                                <el-radio-button :disabled="disabledFlag" class="up"  label="异地"></el-radio-button>
                                                <el-radio-button :disabled="disabledFlag"  class="down" label="原地"></el-radio-button>
                                              </el-radio-group>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <el-form-item label="" prop="officeRebuildLimitAge">
                                            <p><el-input :disabled="disabledFlag" v-model="ruleForm3.officeRebuildLimitAge"></el-input></p>
                                          </el-form-item>
                                        </td>
                                        <td>
                                          <el-form-item label="" prop="officeRebuildArea">
                                            <p><el-input :disabled="disabledFlag" v-model="ruleForm3.officeRebuildArea"></el-input></p>
                                          </el-form-item>
                                        </td>
                                        <td>
                                          <el-form-item label="" prop="officeRebuildPrice">
                                            <p v-if="ruleForm3.officeRebuildCompensation==='有偿'"><el-input :disabled="false" v-model="ruleForm3.officeRebuildPrice"></el-input></p>
                                            <p v-else><el-input :disabled="true" v-model="ruleForm3.officeRebuildPrice"></el-input></p>
                                          </el-form-item>
                                        </td>
                                      </tr>
                                    </table>
                                  </el-col>
                                </div>
                                -->
                                <div  status-icon  :rules="rules3" label-width="110px" class="demo-ruleForm residential" >
                                  <p>养老</p>
                                  <div>
                                    <el-col :span="12">
                                      <el-form-item label="盈利(面积)" prop="profitArea">
                                        <el-col :span="18"> <el-input :disabled="disabledFlag" v-model="ruleForm3.profitArea"></el-input></el-col>
                                        <el-col :span="6"><span>平米</span></el-col>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                      <el-form-item label="盈利(售价)" prop="profitPrice">
                                        <el-col :span="18"> <el-input :disabled="disabledFlag" v-model="ruleForm3.profitPrice"></el-input></el-col>
                                        <el-col :span="6"><span>元/平米</span></el-col>
                                      </el-form-item>
                                    </el-col>
                                  </div>
                                  <div style="margin-top: 50px;">
                                    <el-col :span="12">
                                      <el-form-item label="非盈利(面积)" prop="unprofitArea">
                                        <el-col :span="18"> <el-input :disabled="disabledFlag"  v-model="ruleForm3.unprofitArea"></el-input></el-col>
                                        <el-col :span="6"><span>平米</span></el-col>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                      <el-form-item label="非盈利(售价)" prop="unprofitPrice">
                                        <el-col :span="18"> <el-input :disabled="disabledFlag"  v-model="ruleForm3.unprofitPrice"></el-input></el-col>
                                        <el-col :span="6"><span>元/平米</span></el-col>
                                      </el-form-item>
                                    </el-col>
                                  </div>
                                </div>
                                <div  status-icon  label-width="110px" class="demo-ruleForm meterCapacitance02"   style="border: 0px solid #000;">
                                  <p>不出让配套</p>
                                  <div style="clear: both;height:40px;margin-top: 5px;">
                                    <el-button v-if="btnNone" type="primary"  class="btn" style="float: right;" @click="addNoMatching()">添加</el-button>
                                  </div>
                                  <ul>
                                    <li v-for="(item,index) in ruleForm3.noSellAssorts">
                                      <div class="meterCapacitance02Info" >
                                        <div class="meterCapacitance02InfoTitle">
                                          <el-col :span="2"><span class="offsetLeft">{{ruleForm3.noSellAssorts.length-index}}</span></el-col>
                                          <el-col :span="20"><span></span></el-col>
                                          <el-col :span="2"><span v-if="btnNone" @click="deleteNoMatching(index)">删除</span></el-col>
                                        </div>
                                        <div class="meterCapacitance02InfoBody " >
                                          <div style="height: 50px;">
                                            <el-col :span="8">
                                              <el-form-item label="类型" prop="pass">
                                                <el-col :span="18">
                                                  <el-select :disabled="disabledFlag" v-model="item.buildingType" placeholder="请选择">
                                                    <el-option
                                                      v-for="items in ruleForm3.noSellAssort"
                                                      :key="items.dictName"
                                                      :label="items.dictName"
                                                      :value="items.dictCode">
                                                    </el-option>
                                                  </el-select></el-col>
                                                <el-col :span="6"><span></span></el-col>
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                              <el-form-item label="面积" prop="buildingArea">
                                                <el-col :span="18"> <el-input :disabled="disabledFlag" v-model="item.buildingArea"
                                                                              v-validate="{ regex: reg2}" :name="'buildingArea'+index"
                                                                              :class="{'input': true, 'is-danger': errors.has('buildingArea'+index)}"
                                                ></el-input>
                                                  <div v-if="errors.has('buildingArea'+index)&&item.buildingArea!=''||item.buildingArea>1000000" class="help length">{{'保留两位小数,0~1000,000'}}</div>
                                                </el-col>
                                                <el-col :span="6"><span>平米</span></el-col>
                                              </el-form-item>
                                            </el-col>
                                          </div>
                                          <el-form-item label="核心竞品" prop="" class="textInput" >
                                            <el-input
                                              :disabled="disabledFlag"
                                              :maxlength="140"
                                              type="textarea"
                                              :rows="2"
                                              placeholder="请输入内容"
                                              v-model="item.textDesc">
                                            </el-input>
                                            <span class="statistics">{{item.textDesc.length}}/{{140}}</span>
                                          </el-form-item >
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <el-form-item label="" prop="">
                                  <div class="textInput">
                                    <p>其他配套要求</p>
                                    <el-input
                                      :disabled="disabledFlag"
                                      :maxlength="140"
                                      type="textarea"
                                      :rows="2"
                                      placeholder="请输入内容"
                                      v-model="ruleForm3.otherAssort">
                                    </el-input>
                                    <span class="statistics">{{ruleForm3.otherAssort.length}}/{{140}}</span>
                                  </div>
                                </el-form-item>
                                <el-form-item label="" prop="">
                                  <div class="textInput">
                                    <p>车位配建要求</p>
                                    <el-input
                                      :disabled="disabledFlag"
                                      :maxlength="140"
                                      type="textarea"
                                      :rows="2"
                                      placeholder="请输入内容"
                                      v-model="ruleForm3.ParkingAssort">
                                    </el-input>
                                    <span class="statistics">{{ruleForm3.ParkingAssort.length}}/{{140}}</span>
                                  </div>
                                </el-form-item>
                                <el-form-item label="" prop="">
                                  <div class="textInput">
                                    <p>装配式要求</p>
                                    <el-input
                                      :disabled="disabledFlag"
                                      :maxlength="140"
                                      type="textarea"
                                      :rows="2"
                                      placeholder="请输入内容"
                                      v-model="ruleForm3.assembleStandard">
                                    </el-input>
                                    <span class="statistics">{{ruleForm3.assembleStandard.length}}/{{140}}</span>
                                  </div>
                                </el-form-item>
                                <el-form-item label="" prop="">
                                  <div class="textInput">
                                    <p>绿色建筑要求</p>
                                    <el-input
                                      :disabled="disabledFlag"
                                      :maxlength="140"
                                      type="textarea"
                                      :rows="2"
                                      placeholder="请输入内容"
                                      v-model="ruleForm3.afforestStandard">
                                    </el-input>
                                    <span class="statistics">{{ruleForm3.afforestStandard.length}}/{{140}}</span>
                                  </div>
                                </el-form-item>
                                <div class="uploadAttachments">

                                  <div style="clear: both;height:40px;margin-top: 5px; ">
                                    <p style="float: left;">人防规定原文</p>
                                    <el-upload style="float:right;"
                                               class="upload-demo"
                                               :action="url"
                                               :headers="headers"
                                               :on-success="success01"
                                               multiple
                                               :limit="3"
                                               :on-exceed="handleExceed"
                                               :show-file-list="false"
                                               :before-upload="beforeAvatarUpload"
                                               :on-progress="upLoad"
                                    >
                                      <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                                    </el-upload>
                                  </div>
                                  <table  border="0" class="table">
                                    <tr class="hang">
                                      <th>附件名称</th>
                                      <th>文件大小</th>
                                      <th>权限</th>
                                      <th>操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in uploadAttachments01">
                                      <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>
                                      <td>{{item.fileSize}}</td>
                                      <td>
                                        <el-select  v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                          <el-option
                                            :disabled="disabledFlag"
                                            v-for="item in privacy01"
                                            :key="item.dictName"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                          </el-option>
                                        </el-select>
                                      </td>
                                      <td @click="deleteAvatarUpload01(index)" v-if="btnNone">删除</td>
                                    </tr>
                                  </table>
                                </div>
                                <div class="uploadAttachments">
                                  <div style="clear: both;height:40px;margin-top: 5px;">
                                    <p style="float: left;">消防规定原文</p>
                                    <el-upload style="float:right;"
                                               class="upload-demo"
                                               :action="url"
                                               :headers="headers"
                                               :on-success="success02"
                                               multiple
                                               :limit="3"
                                               :on-exceed="handleExceed"
                                               :show-file-list="false"
                                               :before-upload="beforeAvatarUpload"
                                               :on-progress="upLoad"
                                    >
                                      <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                                    </el-upload>
                                  </div>
                                  <table  border="0" class="table">
                                    <tr class="hang">
                                      <th>附件名称</th>
                                      <th>文件大小</th>
                                      <th>权限</th>
                                      <th>操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in uploadAttachments02">
                                      <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>
                                      <td>{{item.fileSize}}</td>
                                      <td>
                                        <el-select  v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                          <el-option
                                            :disabled="disabledFlag"
                                            v-for="item in privacy02"
                                            :key="item.dictName"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                          </el-option>
                                        </el-select>
                                      </td>
                                      <td @click="deleteAvatarUpload02(index)" v-if="btnNone">删除</td>
                                    </tr>
                                  </table>
                                </div>
                                <div class="uploadAttachments">
                                  <div style="clear: both;height:40px;margin-top: 5px;">
                                    <p style="float: left;">园林规定原文</p>
                                    <el-upload style="float:right;"
                                               class="upload-demo"
                                               :action="url"
                                               :headers="headers"
                                               :on-success="success03"
                                               multiple
                                               :limit="3"
                                               :on-exceed="handleExceed"
                                               :show-file-list="false"
                                               :before-upload="beforeAvatarUpload"
                                               :on-progress="upLoad"
                                    >
                                      <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                                    </el-upload>
                                  </div>
                                  <table  border="0" class="table">
                                    <tr class="hang">
                                      <th>附件名称</th>
                                      <th>文件大小</th>
                                      <th>权限</th>
                                      <th>操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in uploadAttachments03">
                                      <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>                                      <td>{{item.fileSize}}</td>
                                      <td>
                                        <el-select  v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                          <el-option
                                            :disabled="disabledFlag"
                                            v-for="item in privacy03"
                                            :key="item.dictName"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                          </el-option>
                                        </el-select>
                                      </td>
                                      <td @click="deleteAvatarUpload03(index)" v-if="btnNone">删除</td>
                                    </tr>
                                  </table>
                                </div>
                                <div class="uploadAttachments">
                                  <div style="clear: both;height:40px;margin-top: 5px;">
                                    <p style="float: left;">规划条例原文</p>
                                    <el-upload style="float:right;"
                                               class="upload-demo"
                                               :action="url"
                                               :headers="headers"
                                               :on-success="success04"
                                               multiple
                                               :limit="3"
                                               :on-exceed="handleExceed"
                                               :show-file-list="false"
                                               :before-upload="beforeAvatarUpload"
                                               :on-progress="upLoad"
                                    >
                                      <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                                    </el-upload>
                                  </div>
                                  <table  border="0" class="table">
                                    <tr class="hang">
                                      <th>附件名称</th>
                                      <th>文件大小</th>
                                      <th>权限</th>
                                      <th>操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in uploadAttachments04">
                                      <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>                                      <td>{{item.fileSize}}</td>
                                      <td>
                                        <el-select  v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                          <el-option
                                            :disabled="disabledFlag"
                                            v-for="item in privacy04"
                                            :key="item.dictName"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                          </el-option>
                                        </el-select>
                                      </td>
                                      <td @click="deleteAvatarUpload04(index)" v-if="btnNone">删除</td>
                                    </tr>
                                  </table>
                                </div>
                                <div class="uploadAttachments">
                                  <div style="clear: both;height:40px;margin-top: 5px;">
                                    <p style="float: left;">计容规定原文</p>
                                    <el-upload style="float:right;"
                                               class="upload-demo"
                                               :action="url"
                                               :headers="headers"
                                               :on-success="success05"
                                               multiple
                                               :limit="3"
                                               :on-exceed="handleExceed"
                                               :show-file-list="false"
                                               :before-upload="beforeAvatarUpload"
                                               :on-progress="upLoad"
                                    >
                                      <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                                    </el-upload>
                                  </div>
                                  <table  border="0" class="table">
                                    <tr class="hang">
                                      <th>附件名称</th>
                                      <th>文件大小</th>
                                      <th>权限</th>
                                      <th>操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in uploadAttachments05">
                                      <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>                                      <td>{{item.fileSize}}</td>
                                      <td>
                                        <el-select  v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                          <el-option
                                            :disabled="disabledFlag"
                                            v-for="item in privacy05"
                                            :key="item.dictName"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                          </el-option>
                                        </el-select>
                                      </td>
                                      <td @click="deleteAvatarUpload05(index)" v-if="btnNone">删除</td>
                                    </tr>
                                  </table>
                                </div>
                                <div class="uploadAttachments">
                                  <div style="clear: both;height:40px;margin-top: 5px;">
                                    <p style="float: left;">单独的“建筑面积计算规定”原文</p>
                                    <el-upload style="float:right;"
                                               class="upload-demo"
                                               :action="url"
                                               :headers="headers"
                                               :on-success="success06"
                                               multiple
                                               :limit="3"
                                               :on-exceed="handleExceed"
                                               :show-file-list="false"
                                               :before-upload="beforeAvatarUpload"
                                               :on-progress="upLoad"
                                    >
                                      <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                                    </el-upload>
                                  </div>
                                  <table  border="0" class="table">
                                    <tr class="hang">
                                      <th>附件名称</th>
                                      <th>文件大小</th>
                                      <th>权限</th>
                                      <th>操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in uploadAttachments06">
                                      <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>                                      <td>{{item.fileSize}}</td>
                                      <td>
                                        <el-select  v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                          <el-option
                                            :disabled="disabledFlag"
                                            v-for="item in privacy06"
                                            :key="item.dictName"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                          </el-option>
                                        </el-select>
                                      </td>
                                      <td @click="deleteAvatarUpload06(index)" v-if="btnNone">删除</td>
                                    </tr>
                                  </table>
                                </div>
                                <div class="uploadAttachments">
                                  <div style="clear: both;height:40px;margin-top: 5px;">
                                    <p style="float: left;">精装修、装配式、海绵城市、外立面等</p>
                                    <el-upload style="float:right;"
                                               class="upload-demo"
                                               :action="url"
                                               :headers="headers"
                                               :on-success="success07"
                                               multiple
                                               :limit="3"
                                               :on-exceed="handleExceed"
                                               :show-file-list="false"
                                               :before-upload="beforeAvatarUpload"
                                               :on-progress="upLoad"
                                    >
                                      <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                                    </el-upload>
                                  </div>
                                  <table  border="0" class="table">
                                    <tr class="hang">
                                      <th>附件名称</th>
                                      <th>文件大小</th>
                                      <th>权限</th>
                                      <th>操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in uploadAttachments07">
                                      <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>                                      <td>{{item.fileSize}}</td>
                                      <td>
                                        <el-select  v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                          <el-option
                                            :disabled="disabledFlag"
                                            v-for="item in privacy07"
                                            :key="item.dictName"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                          </el-option>
                                        </el-select>
                                      </td>
                                      <td @click="deleteAvatarUpload07(index)" v-if="btnNone">删除</td>
                                    </tr>
                                  </table>
                                </div>
                                <div class="uploadAttachments">
                                  <div style="clear: both;height:40px;margin-top: 5px;">
                                    <p style="float: left;">钉桩文件原文</p>
                                    <el-upload style="float:right;"
                                               class="upload-demo"
                                               :action="url"
                                               :headers="headers"
                                               :on-success="success08"
                                               multiple
                                               :limit="3"
                                               :on-exceed="handleExceed"
                                               :show-file-list="false"
                                               :before-upload="beforeAvatarUpload"
                                               :on-progress="upLoad"
                                    >
                                      <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                                    </el-upload>
                                  </div>
                                  <table  border="0" class="table">
                                    <tr class="hang">
                                      <th>附件名称</th>
                                      <th>文件大小</th>
                                      <th>权限</th>
                                      <th>操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in uploadAttachments08">
                                      <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>
                                      <td>{{item.fileSize}}</td>
                                      <td>
                                        <el-select  v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                          <el-option
                                            :disabled="disabledFlag"
                                            v-for="item in privacy08"
                                            :key="item.dictName"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                          </el-option>
                                        </el-select>
                                      </td>
                                      <td @click="deleteAvatarUpload08(index)" v-if="btnNone">删除</td>
                                    </tr>
                                  </table>
                                </div>
                                <!--<div class="uploadAttachments">-->
                                <!--<p>安评</p>-->
                                <!--<div style="clear: both;height:40px;margin-top: 5px;">-->
                                <!--<el-upload style="float:right;"-->
                                <!--class="upload-demo"-->
                                <!--:action="url"-->
                                <!--:headers="headers"-->
                                <!--:on-success="success09"-->
                                <!--multiple-->
                                <!--:limit="3"-->
                                <!--:on-exceed="handleExceed"-->
                                <!--:show-file-list="false"-->
                                <!--&gt;-->
                                <!--<el-button size="small" type="primary"  class="btn">上传</el-button>-->
                                <!--</el-upload>-->
                                <!--</div>-->
                                <!--<table  border="0" class="table">-->
                                <!--<tr class="hang">-->
                                <!--<th>附件名称</th>-->
                                <!--<th>文件大小</th>-->
                                <!--<th>权限</th>-->
                                <!--<th>操作</th>-->
                                <!--</tr>-->
                                <!--<tr v-for="(item,index) in uploadAttachments09">-->
                                <!--<td>{{item.fileName}}</td>-->
                                <!--<td>{{item.fileSize}}</td>-->
                                <!--<td>-->
                                <!--<el-select  v-model="item.isPrivate09" style="width:104px;border:none"  placeholder="请选择">-->
                                <!--<el-option-->
                                <!--v-for="item in privacy09"-->
                                <!--:key="item.dictName"-->
                                <!--:label="item.dictName"-->
                                <!--:value="item.dictCode">-->
                                <!--</el-option>-->
                                <!--</el-select>-->
                                <!--</td>-->
                                <!--<td @click="deleteAvatarUpload09()">删除</td>-->
                                <!--</tr>-->
                                <!--</table>-->
                                <!--</div>-->
                              </el-tab-pane>
                              <el-tab-pane label="项目战略" class="projectStrategy" name="second" >
                                <el-form-item label="" prop="">
                                  <div class="textInput">
                                    <p>板块属性</p>
                                    <el-input
                                      :disabled="disabledFlag"
                                      :maxlength="140"
                                      type="textarea"
                                      :rows="2"
                                      placeholder="请输入内容"
                                      v-model="ruleForm3.boardProperty">
                                    </el-input>
                                    <span class="statistics">{{ruleForm3.boardProperty.length}}/{{140}}</span>
                                  </div>
                                </el-form-item>
                                <el-form-item label="" prop="">
                                  <div class="textInput">
                                    <p>交通区位</p>
                                    <el-input
                                      :disabled="disabledFlag"
                                      :maxlength="140"
                                      type="textarea"
                                      :rows="2"
                                      placeholder="请输入内容"
                                      v-model="ruleForm3.trafficZone">
                                    </el-input>
                                    <span class="statistics">{{ruleForm3.trafficZone.length}}/{{140}}</span>
                                  </div>
                                </el-form-item>
                                <el-form-item label="" prop="">
                                  <div class="textInput">
                                    <p>配套资源</p>
                                    <el-input
                                      :disabled="disabledFlag"
                                      :maxlength="140"
                                      type="textarea"
                                      :rows="2"
                                      placeholder="请输入内容"
                                      v-model="ruleForm3.assortResource">
                                    </el-input>
                                    <span class="statistics">{{ruleForm3.assortResource.length}}/{{140}}</span>
                                  </div>
                                </el-form-item>
                                <el-form-item label="" prop="">
                                  <div class="textInput">
                                    <p>产业辐射及客户资源</p>
                                    <el-input
                                      :disabled="disabledFlag"
                                      :maxlength="140"
                                      type="textarea"
                                      :rows="2"
                                      placeholder="请输入内容"
                                      v-model="ruleForm3.industrialRadiation">
                                    </el-input>
                                    <span class="statistics">{{ruleForm3.industrialRadiation.length}}/{{140}}</span>
                                  </div>
                                </el-form-item>
                              </el-tab-pane>
                              <el-tab-pane label="宗地现状" name="third">
                                <el-form-item label="现状建筑物" class="inputLength groundSituation">
                                  <el-select :disabled="disabledFlag" v-model="ruleForm3.acquiescenceCurrentBuilding" multiple placeholder="请选择">
                                    <el-option
                                      v-for="item in ruleForm3.currentBuilding"
                                      :key="item.dictName"
                                      :label="item.dictName"
                                      :value="item.dictCode">
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                                <el-form-item label="现状构筑物" class="inputLength groundSituation">
                                  <el-select :disabled="disabledFlag" v-model="ruleForm3.acquiescenceStatusStructures" multiple placeholder="请选择">
                                    <el-option
                                      v-for="item in ruleForm3.statusStructures"
                                      :key="item.dictName"
                                      :label="item.dictName"
                                      :value="item.dictCode">
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                                <div style="clear: both;height: 100px;">
                                  <el-form-item label="平整度" class="groundSituation" style="float: left;">
                                    <el-select :disabled="disabledFlag" v-model="ruleForm3.acquiescenceSmoothness" placeholder="请选择">
                                      <el-option
                                        v-for="item in ruleForm3.smoothness"
                                        :key="item.dictName"
                                        :label="item.dictName"
                                        :value="item.dictCode">
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                  <el-form-item label="地块性质" class="groundSituation" style="float: right;">
                                    <el-select :disabled="disabledFlag" v-model="ruleForm3.acquiescenceLandNature" placeholder="请选择">
                                      <el-option
                                        v-for="item in ruleForm3.landNature"
                                        :key="item.dictName"
                                        :label="item.dictName"
                                        :value="item.dictCode">
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                </div>
                              </el-tab-pane>
                              <el-tab-pane label="风险影响" name="fourth" class="riskImpact">
                                <div style="clear: both;height:40px;margin-top: 5px;">
                                  <el-button v-if="btnNone" type="primary"  class="btn" style="float: right;" @click="addRiskImpact()">添加</el-button>
                                </div>
                                <ul>
                                  <li v-for="(item,index) in ruleForm3.riskEffect">
                                    <div class="countAndDelete"><p><span class="offsetLeft">{{ruleForm3.riskEffect.length-index}}</span><span @click="deleteRiskImpact(index)" v-if="btnNone">删除</span></p></div>
                                    <div class="uploadInfor">
                                      <div class="uploadInfor01"></div>
                                      <div class="uploadInfor02">
                                        <el-form  status-icon  label-width="110px" class="demo-ruleForm form" >
                                          <el-col :span="8">
                                            <el-form-item label="风险类型" class="section01">
                                              <el-select :disabled="disabledFlag" v-model="item.riskType" placeholder="请选择">
                                                <el-option
                                                  v-for="item in ruleForm3.riskType"
                                                  :key="item.dictName"
                                                  :label="item.dictName"
                                                  :value="item.dictCode">
                                                </el-option>
                                              </el-select>
                                            </el-form-item>
                                          </el-col>
                                          <el-col :span="8">
                                            <el-form-item label="对收入的影响" class="section01"  prop="incomeEffect">
                                              <el-col :span="16"><el-input :disabled="disabledFlag" v-model="item.incomeEffect"
                                                                           v-validate="{ regex:reg4}" :name="'incomeEffect'+index"
                                                                           :class="{'input': true, 'is-danger': errors.has('incomeEffect'+index)}"
                                              ></el-input>
                                                <div v-if="errors.has('incomeEffect'+index)&&item.incomeEffect!=''||item.incomeEffect>1000000" class="help length">{{'保留四位小数,0~1000,000'}}</div>
                                              </el-col>
                                              <el-col :span="8"><span>万元</span></el-col>
                                            </el-form-item>
                                          </el-col>
                                          <el-col :span="8">
                                            <el-form-item label="对成本的影响"  class="section01" prop="costsEffect">
                                              <!--<el-input :disabled="disabledFlag" v-model="item.costsEffect"></el-input>-->
                                              <el-col :span="16"><el-input :disabled="disabledFlag" v-model="item.costsEffect"
                                                                           v-validate="{ regex: reg4 }" :name="'costsEffect'+index"
                                                                           :class="{'input': true, 'is-danger': errors.has('costsEffect'+index)}"
                                              ></el-input>
                                                <div v-if="errors.has('costsEffect'+index)&&item.costsEffect!=''||item.costsEffect>1000000" class="help length">{{'保留四位小数,0~1000,000'}}</div>
                                              </el-col>
                                              <el-col :span="8"><span>万元</span></el-col>
                                            </el-form-item>
                                          </el-col>
                                        </el-form>
                                      </div>
                                      <div class="uploadInfor02 " >
                                        <div  status-icon  label-width="110px" class="demo-ruleForm form" >
                                          <el-form-item label="风险描述" class="riskDescription"  prop="">
                                            <el-input
                                              :disabled="disabledFlag"
                                              type="textarea"
                                              :maxlength="140"
                                              :rows="2"
                                              placeholder="请输入内容"
                                              v-model="item.riskDesc">
                                            </el-input>
                                            <span class="statistics">{{item.riskDesc.length}}/{{140}}</span>
                                          </el-form-item>
                                          <el-form-item label="其他" class="riskDescription"  prop="">
                                            <el-input
                                              :disabled="disabledFlag"
                                              type="textarea"
                                              :maxlength="140"
                                              :rows="2"
                                              placeholder="请输入内容"
                                              v-model="item.rest">
                                            </el-input>
                                            <span class="statistics">{{item.rest.length}}/{{140}}</span>
                                          </el-form-item>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </el-tab-pane>
                              <el-tab-pane label="市政条件" name="fifth" class="municipalConditions">
                                <div class="municipalConditionsBody">
                                  <div class="title">
                                    <p><span class="bold">周边道路</span></p>
                                    <hr>
                                  </div>
                                  <p class="bold">现状</p>
                                  <el-form-item label="" prop=""  >
                                    <div class="textInput">
                                      <p>现状</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.currentArroundRoad">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.currentArroundRoad.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop=""  >
                                    <div class="textInput">
                                      <p>路板</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.currentRoadBoard">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.currentRoadBoard.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop=""  >
                                    <div class="textInput">
                                      <p>立交桥和匝道</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.currentRoadRamp">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.currentRoadRamp.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop=""  >
                                    <div class="textInput">
                                      <p>允许开口</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.currentRoadOpen">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.currentRoadOpen.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop=""  >
                                    <div class="textInput">
                                      <p>竖向现状</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.currentRoadVertical">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.currentRoadVertical.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop=""  >
                                    <div class="textInput">
                                      <p>天桥</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.currentRoadOverbridge">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.currentRoadOverbridge.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <p style="margin-top: 25px;" class="bold">规划</p>
                                  <el-form-item label="" prop=""  >
                                    <div class="textInput">
                                      <p>规划</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.planRoad">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.planRoad.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop=""  >
                                    <div class="textInput">
                                      <p>路板</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.planRoadBoard">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.planRoadBoard.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop=""  >
                                    <div class="textInput">
                                      <p>立交桥和匝道</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.planRoadRamp">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.planRoadRamp.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop="">
                                    <div class="textInput">
                                      <p>允许开口</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.planRoadOpen">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.planRoadOpen.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop="">
                                    <div class="textInput">
                                      <p>竖向规划</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.planRoadVertical">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.planRoadVertical.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop="">
                                    <div class="textInput">
                                      <p>天桥</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.planRoadOverbridge">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.planRoadOverbridge.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                </div>
                                <div class="municipalConditionsBody">
                                  <div class="title">
                                    <p><span  class="bold">管线</span></p>
                                    <hr>
                                  </div>
                                  <el-form-item label="" prop="">
                                    <p class="bold">现状</p>
                                    <div class="textInput">
                                      <p>开口及标高</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.currentPipeline">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.currentPipeline.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop="">
                                    <div class="textInput">
                                      <p>现状</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.currentPipelineOpen">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.currentPipelineOpen.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop="">
                                    <p style="margin-top: 25px;" class="bold">规划</p>
                                    <div class="textInput">
                                      <p>规划</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.planPipeline">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.planPipeline.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <el-form-item label="" prop="">
                                    <div class="textInput">
                                      <p>开口及标高</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.planPipelineOpen">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.planPipelineOpen.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                </div>
                                <div class="municipalConditionsBody">
                                  <div status-icon ref="ruleForm3" :rules="rules3"  label-width="180px" class="demo-ruleForm form" >
                                    <div class="title">
                                      <div>
                                        <p><span class="bold">轨道交通</span></p>
                                        <hr>
                                      </div>
                                      <div class="railTraffic" style="clear: both; ">
                                        <p class="bold">现状 </p>
                                        <el-col :span="12">
                                          <div class="left"  style="float: left;">
                                            <el-form-item label="站厅层标高" prop="currentTrafficHallHeight">
                                              <el-col :span="20"><el-input :disabled="disabledFlag"  v-model="ruleForm3.currentTrafficHallHeight"></el-input></el-col>
                                              <el-col :span="4"><span>米</span></el-col>
                                            </el-form-item>
                                            <el-form-item label="区间段埋深" prop="currentTrafficExtentDepth" >
                                              <el-col :span="20"><el-input :disabled="disabledFlag"  v-model="ruleForm3.currentTrafficExtentDepth"></el-input></el-col>
                                              <el-col :span="4"><span>米</span></el-col>
                                            </el-form-item>
                                            <el-form-item  label="是否可接驳地下商业" prop="pass" >
                                              <el-radio :disabled="disabledFlag" v-model="ruleForm3.currentTrafficIsConnectUnder" label="1">是</el-radio>
                                              <el-radio :disabled="disabledFlag" v-model="ruleForm3.currentTrafficIsConnectUnder" label="2">否</el-radio>
                                            </el-form-item>
                                            <el-form-item  label="地面构筑物可否改造" prop="pass" >
                                              <el-radio :disabled="disabledFlag" v-model="ruleForm3.currentTrafficIsRemould" label="1">是</el-radio>
                                              <el-radio :disabled="disabledFlag" v-model="ruleForm3.currentTrafficIsRemould" label="2">否</el-radio>
                                            </el-form-item>
                                          </div>
                                        </el-col>
                                        <el-col :span="12">
                                          <div class="right" style="float: right; ">
                                            <el-form-item label="站房埋深和覆土深度" prop="currentTrafficSoilDeptht">
                                              <el-col :span="20"> <el-input :disabled="disabledFlag" v-model="ruleForm3.currentTrafficSoilDeptht"></el-input></el-col>
                                              <el-col :span="4"><span>米</span></el-col>
                                            </el-form-item>
                                            <el-form-item label="站台层标高" prop="currentTrafficFloorHeight" >
                                              <el-col :span="20"><el-input :disabled="disabledFlag" v-model="ruleForm3.currentTrafficFloorHeight"></el-input></el-col>
                                              <el-col :span="4"><span>米</span></el-col>
                                            </el-form-item>
                                            <el-form-item label="区间段是否在地块内下穿" prop="pass" >
                                              <el-radio :disabled="disabledFlag" v-model="ruleForm3.currentTrafficIsExtentUnderPass" label="1">是</el-radio>
                                              <el-radio :disabled="disabledFlag" v-model="ruleForm3.currentTrafficIsExtentUnderPass" label="2">否</el-radio>
                                            </el-form-item>
                                          </div>
                                        </el-col>
                                      </div>
                                      <div  status-icon ref="ruleForm3" :rules="rules3"  label-width=""  >
                                        <el-form-item label="" prop="">
                                          <div class="textInput" >
                                            <p>其它强制要求说明</p>
                                            <el-input
                                              :disabled="disabledFlag"
                                              :maxlength="140"
                                              type="textarea"
                                              :rows="2"
                                              placeholder="请输入内容"
                                              v-model="ruleForm3.currentTrafficOtherForceDemand">
                                            </el-input>
                                            <span class="statistics">{{ruleForm3.currentTrafficOtherForceDemand.length}}/{{140}}</span>
                                          </div>
                                        </el-form-item>
                                      </div>
                                    </div>
                                    <div>
                                      <div class="railTraffic" style="clear: both; ">
                                        <p class="bold">规划</p>
                                        <el-col :span="12">
                                          <div class="left"  style="float: left;">
                                            <el-form-item label="站厅层标高" prop="planTrafficHallHeight">
                                              <el-col :span="20"><el-input :disabled="disabledFlag"  v-model="ruleForm3.planTrafficHallHeight"></el-input></el-col>
                                              <el-col :span="4"><span>米</span></el-col>
                                            </el-form-item>
                                            <el-form-item label="区间段埋深" prop="planTrafficExtentDepth" >
                                              <el-col :span="20"><el-input :disabled="disabledFlag" v-model="ruleForm3.planTrafficExtentDepth"></el-input></el-col>
                                              <el-col :span="4"><span>米</span></el-col>
                                            </el-form-item>
                                            <el-form-item :disabled="disabledFlag" label="是否可接驳地下商业" prop="pass" >
                                              <el-radio :disabled="disabledFlag"  v-model="ruleForm3.planTrafficIsConnectUnder" label="1">是</el-radio>
                                              <el-radio :disabled="disabledFlag"  v-model="ruleForm3.planTrafficIsConnectUnder" label="2">否</el-radio>
                                            </el-form-item>
                                            <el-form-item :disabled="disabledFlag" label="地面构筑物可否改造" prop="pass" >
                                              <el-radio :disabled="disabledFlag"  v-model="ruleForm3.planTrafficIsRemould" label="1">是</el-radio>
                                              <el-radio :disabled="disabledFlag"  v-model="ruleForm3.planTrafficIsRemould" label="2">否</el-radio>
                                            </el-form-item>
                                          </div>
                                        </el-col>
                                        <el-col :span="12">
                                          <div class="right" style="float: right; ">
                                            <el-form-item label="站房埋深和覆土深度" prop="planTrafficSoilDeptht">
                                              <el-col :span="20"> <el-input :disabled="disabledFlag"  v-model="ruleForm3.planTrafficSoilDeptht"></el-input></el-col>
                                              <el-col :span="4"><span>米</span></el-col>
                                            </el-form-item>
                                            <el-form-item label="站台层标高" prop="planTrafficFloorHeight" >
                                              <el-col :span="20"> <el-input :disabled="disabledFlag"  v-model="ruleForm3.planTrafficFloorHeight"></el-input></el-col>
                                              <el-col :span="4"><span>米</span></el-col>
                                            </el-form-item>
                                            <el-form-item label="区间段是否在地块内下穿" prop="pass" >
                                              <el-radio :disabled="disabledFlag"  v-model="ruleForm3.planTrafficIsExtentUnderPass" label="1">是</el-radio>
                                              <el-radio :disabled="disabledFlag"  v-model="ruleForm3.planTrafficIsExtentUnderPass" label="2">否</el-radio>
                                            </el-form-item>
                                            <el-form-item label="通车时间" prop="pass" >
                                              <div class="block">
                                                <el-date-picker
                                                  :disabled="disabledFlag"
                                                  :editable="disabledDate"
                                                  v-model="openTrafficDate"
                                                  type="date"
                                                  @change="dateFormatConversionBackOpenTrafficDate"
                                                  placeholder="选择日期"
                                                  >
                                                </el-date-picker>
                                              </div>
                                            </el-form-item>
                                          </div>
                                        </el-col>
                                      </div>
                                      <div  status-icon ref="ruleForm3" :rules="rules3"  label-width=""  >
                                        <el-form-item label="" prop="">
                                          <div class="textInput">
                                            <p>其它强制要求说明</p>
                                            <el-input
                                              :disabled="disabledFlag"
                                              :maxlength="140"
                                              type="textarea"
                                              :rows="2"
                                              placeholder="请输入内容"
                                              v-model="ruleForm3.planTrafficOtherForceDemand">
                                            </el-input>
                                            <span class="statistics">{{ruleForm3.planTrafficOtherForceDemand.length}}/{{140}}</span>
                                          </div>
                                        </el-form-item>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="municipalConditionsBody">
                                  <div class="title">
                                    <p><span class="bold">公交</span></p>
                                    <hr>
                                  </div>
                                  <!--<p>现状</p>-->
                                  <el-form-item label="" prop="">
                                    <div class="textInput">
                                      <p class="bold">现状</p>
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.currentBus">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.currentBus.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                  <p class="bold">规划</p>
                                  <el-form-item label="" prop="">
                                    <div class="textInput">
                                      <!--<p>规划</p>-->
                                      <el-input
                                        :disabled="disabledFlag"
                                        :maxlength="140"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ruleForm3.planBus">
                                      </el-input>
                                      <span class="statistics">{{ruleForm3.planBus.length}}/{{140}}</span>
                                    </div>
                                  </el-form-item>
                                </div>
                              </el-tab-pane>
                              <el-tab-pane label="自然条件" name="sixth">
                                <el-form-item label="" prop="">
                                <div class="textInput">
                                  <p>河道水位</p>
                                  <el-input
                                    :disabled="disabledFlag"
                                    :maxlength="64"
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="ruleForm3.riverway">
                                  </el-input>
                                  <span class="statistics">{{ruleForm3.riverway.length}}/{{64}}</span>
                                </div>
                                </el-form-item>
                                <el-form-item label="" prop="">
                                <div class="textInput">
                                  <p>泄洪道</p>
                                  <el-input
                                    :disabled="disabledFlag"
                                    :maxlength="64"
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="ruleForm3.spillway">
                                  </el-input>
                                  <span class="statistics">{{ruleForm3.spillway.length}}/{{64}}</span>
                                </div>
                                </el-form-item>
                                <el-form-item label="" prop="">
                                <div class="textInput">
                                  <p>潮汐水位</p>
                                  <el-input
                                    :disabled="disabledFlag"
                                    :maxlength="64"
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="ruleForm3.tide">
                                  </el-input>
                                  <span class="statistics">{{ruleForm3.tide.length}}/{{64}}</span>
                                </div>
                                </el-form-item>
                                <div class="uploadAttachments">
                                  <div style="clear: both;height:40px;margin-top: 5px;">
                                    <p style="float: left;">初勘文件</p>
                                    <el-upload style="float:right;"
                                               class="upload-demo"
                                               :action="url"
                                               :headers="headers"
                                               :on-success="success10"
                                               multiple
                                               :limit="3"
                                               :on-exceed="handleExceed"
                                               :show-file-list="false"
                                               :before-upload="beforeAvatarUpload"
                                               :on-progress="upLoad"
                                    >
                                      <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                                    </el-upload>
                                  </div>
                                  <table  border="0" class="table">
                                    <tr class="hang">
                                      <th>附件名称</th>
                                      <th>文件大小</th>
                                      <th>权限</th>
                                      <th>操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in uploadAttachments10">
                                      <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>                                      <td>{{item.fileSize}}</td>
                                      <td>
                                        <el-select  :disabled="disabledFlag" v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                          <el-option
                                            :disabled="disabledFlag"
                                            v-for="item in privacy10"
                                            :key="item.dictName"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                          </el-option>
                                        </el-select>
                                      </td>
                                      <td @click="deleteAvatarUpload10(index)" v-if="btnNone">删除</td>
                                    </tr>
                                  </table>
                                </div>
                                <div class="uploadAttachments">
                                  <div style="clear: both;height:40px;margin-top: 5px;">
                                    <p style="float: left;">水文资料</p>
                                    <el-upload style="float:right;"
                                               class="upload-demo"
                                               :action="url"
                                               :headers="headers"
                                               :on-success="success11"
                                               multiple
                                               :limit="3"
                                               :on-exceed="handleExceed"
                                               :show-file-list="false"
                                               :before-upload="beforeAvatarUpload"
                                               :on-progress="upLoad"
                                    >
                                      <el-button v-if="btnNone" size="small" type="primary"  class="btn" >上传</el-button>
                                    </el-upload>
                                  </div>
                                  <table  border="0" class="table">
                                    <tr class="hang">
                                      <th>附件名称</th>
                                      <th>文件大小</th>
                                      <th>权限</th>
                                      <th>操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in uploadAttachments11">
                                      <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>                                      <td>{{item.fileSize}}</td>
                                      <td>
                                        <el-select  :disabled="disabledFlag" v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                          <el-option
                                            :disabled="disabledFlag"
                                            v-for="item in privacy11"
                                            :key="item.dictName"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                          </el-option>
                                        </el-select>
                                      </td>
                                      <td @click="deleteAvatarUpload11(index)" v-if="btnNone">删除</td>
                                    </tr>
                                  </table>
                                </div>
                                <div class="uploadAttachments">
                                  <div style="clear: both;height:40px;margin-top: 5px;">
                                    <p style="float: left;">安评</p>
                                    <el-upload style="float:right;"
                                               class="upload-demo"
                                               :action="url"
                                               :headers="headers"
                                               :on-success="success12"
                                               multiple
                                               :limit="3"
                                               :on-exceed="handleExceed"
                                               :show-file-list="false"
                                               :before-upload="beforeAvatarUpload"
                                               :on-progress="upLoad"
                                    >
                                      <el-button v-if="btnNone" size="small" type="primary"  class="btn">上传</el-button>
                                    </el-upload>
                                  </div>
                                  <table  border="0" class="table">
                                    <tr class="hang">
                                      <th><span>附件名称</span></th>
                                      <th><span>文件大小</span></th>
                                      <th><span>权限</span></th>
                                      <th><span>操作</span></th>
                                    </tr>
                                    <tr v-for="(item,index) in uploadAttachments12">
                                      <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>                                      <td>{{item.fileSize}}</td>
                                      <td>
                                        <el-select  v-model="item.isPrivate" style="width:104px;border:none"  placeholder="请选择">
                                          <el-option
                                            :disabled="disabledFlag"
                                            v-for="item in privacy12"
                                            :key="item.dictName"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                          </el-option>
                                        </el-select>
                                      </td>
                                      <td @click="deleteAvatarUpload12(index)" v-if="btnNone">删除</td>
                                    </tr>
                                  </table>
                                </div>
                              </el-tab-pane>
                            </el-tabs>
                          </el-form-item>
                        </el-form>
                      </div>
                    </div>
                  </el-col>
                </div>
              </el-col>
            </div>
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
  import { Message } from 'element-ui';
  const cityOptions = ['上海', '北京'];
  export default {
    name: 'proAnalysisIndex',
    components: {
      heavyImageManagement,
      slideShow,
      submitImg,
      diaLog
    },
    mounted(){
      this.setConHeight();
      this.isEdit();
    },
    data () {
      //可以为空 也可以是0-1000000,保留四位小数
      var checkObtainNumberMax100 = (rule,value,callback) => {
        var reg = /^\d+(\.\d{1,4})?$/; //正则校验 :正整数,保留四位小数
        if (value) {
          if (!reg.test(value)) {
            callback(new Error("保留4位小数，0~100万"));
          }else if(value>1000000){
            callback(new Error("保留4位小数，0~100万"));
          }else{
            callback()
          }
        } else{
          callback()
        }
      };
      //可以为空 整数,保留四位小数
      var checkObtainRoundNumberMax100 = (rule,value,callback) => {
        var reg = /^\d+?$/; //正则校验 :正整数,保留四位小数
        if (value) {
          if (!reg.test(value)) {
            callback(new Error("整数，无小数位,0~100"));
          }else if(value>100){
            callback(new Error("整数，无小数位,0~100"));
          }else{
            callback()
          }
        } else{
          callback()
        }
      };
      //可以为空 整数,0~100保留保留两位小数
      var checkObtainRoundNumber2Max100 = (rule,value,callback) => {
        var reg = /^\d+(\.\d{1,2})?$/; //正则校验 :正整数,保留四位小数
        if (value) {
          if (!reg.test(value)) {
            callback(new Error("保留两位小数,0~100"));
          }else if(value>100){
            callback(new Error("保留两位小数,0~100"));
          }else{
            callback()
          }
        } else{
          callback()
        }
      };
      //可以为空 也可以是0-10000,保留两位小数
      var checkObtainNumberMax10000 = (rule,value,callback) => {
        var reg = /^\d+(\.\d{1,2})?$/; //正则校验 :正整数,保留两位小数
        if (value) {
          if (!reg.test(value)) {
            callback(new Error("保留2位小数，0~10000"));
          }else if(value>10000){
            callback(new Error("保留2位小数，0~10000"));
          }else{
            callback()
          }
        } else{
          callback()
        }
      };
      //可以为空 保留2位小数，0~1000,000
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
      //可以为空 整数，0~1000,000
      var checkObtainRoundNumber = (rule,value,callback) => {
        var reg = /^\d+?$/; //正则校验 :正整数,保留两位小数
        if (value) {
          if (!reg.test(value)) {
            callback(new Error("整数，无小数位,0~1000,000"));
          }else if(value>1000000){
            callback(new Error("整数，无小数位,0~1000,000"));
          }else{
            callback()
          }
        } else{
          callback()
        }
      };
      //长度为140
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

      //长度为64
      var checkCharactersLengthSixtyFour= (rule, value, callback) => {
        if (!Number.isInteger(value)) {
          callback(new Error('最多输入64字符'));
        }
        /*输入内容为0-140个字符*/
//        let reg = /^.{0,64}$/;
//        if (!reg.test(value)) {
//          callback(new Error("最多输入64个字符"));
//        }
        else{
          callback()
        }
      };


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
      //可以为空 也可以是正整数,保留四位小数
      var checkObtainNumberFourDecimal = (rule,value,callback) => {
        var reg = /^\d+(\.\d{1,4})?$/; //正则校验 :正整数,保留四位小数
        if (value) {
          if (!reg.test(value)) {
            callback(new Error("保留4位小数，0~1000,000"));
          }else if(value>1000000){
            callback(new Error("保留2位小数，0~1000,000"));
          }else{
            callback()
          }
        } else{
          callback()
        }
      };
      //可以为空 也可以是正整数,保留四位小数 输入范围为0-1000000
      var checkObtainNumberFourDecimalLength  = (rule, value, callback) => {
        var reg = /^\d+(\.\d{1,4})?$/; //正则校验 :正整数,保留四位小数
//        var reg1 = /^\d+{1,4}?$/; //正则校验 :0-1000000
        if (value) {
          if (!reg.test(value)) {
            callback(new Error("请输入正整数或保留四位小数 "));
          }else if(!reg1.test(value)){
            callback(new Error("请输入0-1000000"));
          }
          else{
            callback()
          }
        }else{
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
      return {
        loadingA: false, //加载中图显
        isDisplayModel: true, // 附件上传遮罩层
        reg4: /^(0|[1-9]\d{0,})+(\.\d{1,4})?$/, // 正则校验 :正整数,保留4位小数
        regn: /^(0|[1-9]\d{0,})+(\.\d{0,})?$/, // 正则校验 :正整数,保留n位小数
        reg2: /^(0|[1-9]\d{0,})+(\.\d{1,2})?$/, // 正则校验 :正整数,保留2位小数
        regz: /^[0-9]*$/, // 正则校验 :正整数
        reg3: /^[\u4E00-\u9FA5]{0,140}$/, //中文验证
        //reg5: /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/,
        reg5: /^[a-zA-z]+:\/\/[^\s]*/,
        M:100,//上传附件最大值
        submitFlag:[],
        btnNone:false,          //true 显示
        disabledFlag:true,     //disabled 可编辑
        disabledDate:false,     //日期 不可输入
        radio3:'',
        /*proAnalysisIndex项目开始*/
        /*公开市场竞买信息*/
        ruleForm2:{
          totalPriceBegin:'',//起始总价
          auctionAmount:'',//竞买保证金额度
          fundProofAmount:'',//资金证明的额度
          acquiescencePayStandard:'',
          payStandard:'',//交地标准 select
          acquiescenceAuction_type:'',
          auction_type:'',//竞买方式 select
        },
        rules2: {
          totalPriceBegin: [
            { validator: checkObtainNumberMax100, trigger: 'blur' }
          ],
          auctionAmount: [
            { validator: checkObtainNumberMax100, trigger: 'blur' }
          ],
          fundProofAmount: [
            { validator: checkObtainNumberMax100, trigger: 'blur' }
          ],
        },
        rules3: {
          /*现状*/
          currentArroundRoad: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          currentRoadBoard: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          currentRoadRamp: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          currentRoadOpen: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          currentRoadVertical: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          currentRoadOverbridge: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          /*规划*/
          planRoad: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          planRoadBoard: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          planRoadRamp: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          planRoadOpen: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          planRoadVertical: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          planRoadOverbridge: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          /*管线*/
          currentPipeline: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          currentPipelineOpen: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          planPipeline: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          planPipelineOpen: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          /*轨道交通*/
          currentTrafficHallHeight: [
            { validator: checkObtainNumberMax10000, trigger: 'blur' }
          ],
          currentTrafficSoilDeptht: [
            { validator: checkObtainNumberMax10000, trigger: 'blur' }
          ],
          currentTrafficFloorHeight: [
            { validator: checkObtainNumberMax10000, trigger: 'blur' }
          ],
          currentTrafficExtentDepth: [
            { validator: checkObtainNumberMax10000, trigger: 'blur' }
          ],
          currentTrafficOtherForceDemand: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          planTrafficHallHeight: [
            { validator: checkObtainNumberMax10000, trigger: 'blur' }
          ],
          planTrafficSoilDeptht: [
            { validator: checkObtainNumberMax10000, trigger: 'blur' }
          ],
          planTrafficFloorHeight: [
            { validator: checkObtainNumberMax10000, trigger: 'blur' }
          ],
          planTrafficExtentDepth: [
            { validator: checkObtainNumberMax10000, trigger: 'blur' }
          ],
          planTrafficOtherForceDemand: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          /*公交*/
          currentBus: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          planBus: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          /*项目战略*/
          boardProperty: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          trafficZone: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          assortResource: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          industrialRadiation: [
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          /*占地及规划信息*/
          planed_area_total: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          planed_building_area: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          floorCoveredArea: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          plot_ratio: [
            { validator: checkObtainRoundNumber2Max100, trigger: 'blur' }
          ],
          floorArea: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          merchantableArea: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          houseRebuildLimitAge:[
            { validator: checkObtainRoundNumberMax100, trigger: 'blur' }
          ],//起始还建住宅自持年限
          houseRebuildArea:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//起始还建住宅面积
          houseRebuildPrice:[
            { validator: checkObtainRoundNumber, trigger: 'blur' }
          ],//起始还建住宅售价
          commerceRebuildLimitAge:[
            { validator: checkObtainRoundNumberMax100, trigger: 'blur' }
          ],//起始还建商业自持年限
          commerceRebuildArea:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//起始还建商业面积
          commerceRebuildPrice:[
            { validator: checkObtainRoundNumber, trigger: 'blur' }
          ],//起始还建商业售价
          officeRebuildLimitAge:[
            { validator: checkObtainRoundNumberMax100, trigger: 'blur' }
          ],//起始还建写字楼自持年限
          officeRebuildArea:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//起始还建写字楼面积
          officeRebuildPrice:[
            { validator: checkObtainRoundNumber, trigger: 'blur' }
          ],//起始还建写字楼售价
          //地块信息
          landName: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//
          controlHeight:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//控制高度
          buildingDensity: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//建筑密度
          volumeRate:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//容积率
          greenRate:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//绿地率
          backlineRequire:[
            { validator: checkCharactersLengthSixtyFour, trigger: 'blur' }
          ],//退线要求
          entranceRequire:[
            { validator: checkCharactersLengthSixtyFour, trigger: 'blur' }
          ],//出入口要求

          daylightingStandard: [
            { validator: checkCharactersLengthSixtyFour, trigger: 'blur' }
          ],//日照要求
          roadStandard: [
            { validator: checkCharactersLengthSixtyFour, trigger: 'blur' }
          ],//内部道路要求
          plotRatioUse: [
            { validator: checkCharactersLengthSixtyFour, trigger: 'blur' }
          ],//容积率不平衡使用
          floorPlanHouseArea: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//地上计容住宅建面
          profitArea:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//盈利面积
          profitPrice:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//盈利售价
          unprofitArea:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//非盈利面积
          unprofitPrice:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//非盈利售价
          //不出让配套
          buildingArea:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          textDesc:[
            { validator: checkCharactersLength, trigger: 'blur' }
          ],
          otherAssort:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//其他配套要求
          ParkingAssort:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//车位配建要求
          assembleStandard:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//装配式要求
          afforestStandard:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//绿色建筑要求
          /*自然条件*/
          riverway:[
            { validator: checkCharactersLength, trigger: 'blur' }
          ],//河道水位
          spillway:[
            { validator: checkCharactersLength, trigger: 'blur' }
          ],//泄洪道
          tide:[
            { validator: checkCharactersLength, trigger: 'blur' }
          ],//潮汐水位
          /*风险影响*/
          costsEffect:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//对成本的影响
          incomeEffect:[
            { validator: checkObtainNumber, trigger: 'blur' }
          ],//对收入的影响
          rest:[
            { validator: checkCharactersLength, trigger: 'blur' }
          ],//其他
          riskDesc:[
            { validator: checkCharactersLength, trigger: 'blur' }
          ],//风险描述
        },

        noticeDate:'',//公告时间
        marginEndTime:'',//保证金截止时间
        signStartTime:'',//报名起始时间
        signEndTime:'',//报名截止时间
        auction_time:'',//竞价时间
        backAuctionDate:'',//如未获取，保证金退回时间
        openTrafficDate:'',//通车时间
        /*项目周边规划情况*/
        ruleForm3:{
          otherDescription:'',//    其他说明
          documentNumber:'',//   文件[公告]编号
          landNumbering:'',//     地块编号
          primaryDevelopmentUnit:'',//   一级开发单位
          biddingRules:'',//       竞买规则

          /*市政条件*/
          /*周边道路*/
          currentArroundRoad:'',//周边道路现状
          currentRoadBoard:'',//周边道路现状路板
          currentRoadRamp:'',//周边道路现状立交桥和匝道
          currentRoadOpen:'',//周边道路现状允许开口
          currentRoadVertical:'',//周边道路现状竖向现状
          currentRoadOverbridge:'',//周边道路现状天桥
          planRoad:'',//周边道路规划
          planRoadBoard:'',//周边道路规划路板
          planRoadRamp:'',//周边道路规划立交桥和匝道
          planRoadOpen:'',//周边道路规划允许开口
          planRoadVertical:'',//周边道路规划竖向规划
          planRoadOverbridge:'',//周边道路规划天桥
          /*管线*/
          currentPipeline:'',//管线现状
          currentPipelineOpen:'',//管线开口及标高现状
          planPipeline:'',//管线规划
          planPipelineOpen:'',//管线开口及标高规划
          /*轨道交通*/
          currentTrafficHallHeight:'',//轨道交通站厅层标高现状
          currentTrafficSoilDeptht:'',//轨道交通站房埋深和覆土深度现状
          currentTrafficFloorHeight:'',//轨道交通站台层标高现状
          currentTrafficExtentDepth:'',//轨道交通区间段埋深现状
          currentTrafficIsConnectUnder:'',//轨道交通是否可接驳地下商业现状
          currentTrafficIsExtentUnderPass:'',//轨道交通区间段是否在地块内下穿现状
          currentTrafficIsRemould:'',//轨道交通地面构筑物可否改造现状
          currentTrafficOtherForceDemand:'',//轨道交通其他强制要求说明现状
          planTrafficHallHeight:'',//轨道交通站厅层标高规划
          planTrafficSoilDeptht:'',//轨道交通站房埋深和覆土深度规划
          planTrafficFloorHeight:'',//轨道交通站台层标高现规划
          planTrafficExtentDepth:'',//轨道交通区间段埋深规划
          planTrafficIsConnectUnder:'',//轨道交通是否可接驳地下商业规划
          planTrafficIsExtentUnderPass:'',//轨道交通区间段是否在地块内下穿规划
          planTrafficIsRemould:'',//轨道交通地面构筑物可否改造规划
          planTrafficOtherForceDemand:'',//轨道交通其他强制要求说明规划
          /*公交*/
          currentBus:'',//公交现状
          planBus:'',//公交规划
          /*项目战略*/
          boardProperty:'',//板块属性
          trafficZone:'',//交通区位
          assortResource:'',//配套资源
          industrialRadiation:'',//产业辐射及客户资源
          /*占地及规划信息*/
          landTitle:'', //用地性质 select
          planed_area_total:'',//占地面积(万平/㎡)
          planed_building_area:'',//建筑面积(万/㎡)
          floorCoveredArea:'',//计容地上建面
          plot_ratio:'',//容积率
          floorArea:'',//代征土地面积
          merchantableArea:'',//可售面积(地上)
          plotInfo:[
            {
              landRect:'',//地块区域勾边
              landName:'',//地块名称
              landCode:'',//地块编号
              longitude:'',//经度
              latitude:'',//纬度
              controlHeight:'',//控制高度
              buildingDensity:'',//建筑密度
              volumeRate:'',//容积率
              greenRate:'',//绿地率
              backlineRequire:'',//退线要求
              entranceRequire:'',//出入口要求
              currentBuilding:'',//现状建筑物
              statusStructures:'',//现状构筑物
              remark:'',//备注信息
              landTitle:[],//用地性质
            }
          ],//地块信息
          daylightingStandard:'',//日照要求
          roadStandard:'',//内部道路要求
          plotRatioUse:'',//容积率不平衡使用
          floorPlanHouseArea:'',//地上计容住宅建面
          houseRebuildCompensation:'',//起始还建住宅有无偿
          houseRebuildLimitPrice:'',//起始还建住宅有无限价
          houseRebuildRemote:'',//起始还建住宅原异地
          houseRebuildLimitAge:'',//起始还建住宅自持年限
          houseRebuildArea:'',//起始还建住宅面积
          houseRebuildPrice:'',//起始还建住宅售价
          commerceRebuildCompensation:'',//起始还建商业有无偿
          commerceRebuildLimitPrice:'',//起始还建商业有无限价
          commerceRebuildRemote:'',//起始还建商业原异地
          commerceRebuildLimitAge:'',//起始还建商业自持年限
          commerceRebuildArea:'',//起始还建商业面积
          commerceRebuildPrice:'',//起始还建商业售价
          officeRebuildCompensation:'',//起始还建写字楼有无偿
          officeRebuildLimitPrice:'',//起始还建写字楼有无限价
          officeRebuildRemote:'',//起始还建写字楼原异地
          officeRebuildLimitAge:'',//起始还建写字楼自持年限
          officeRebuildArea:'',//起始还建写字楼面积
          officeRebuildPrice:'',//起始还建写字楼售价
          profitArea:'',//盈利面积
          profitPrice:'',//盈利售价
          unprofitArea:'',//非盈利面积
          unprofitPrice:'',//非盈利售价
          noSellAssorts:[{
            buildingArea:'',
            textDesc:'',
            buildingType:''
          }],//不出让配套
          otherAssort:'',//其他配套要求
          ParkingAssort:'',//车位配建要求
          assembleStandard:'',//装配式要求
          afforestStandard:'',//绿色建筑要求
          acquiescenceLandUsage:[],
          landUsage:[],//规划用地性质 select
//          acquiescenceNoSellAssort:'',
          noSellAssort:'',//不出让配套(类型) select
          /*自然条件*/
          riverway:'',//河道水位
          spillway:'',//泄洪道
          tide:'',//潮汐水位
          exploration:'',//初勘文件
          hydrology:'',//水文资料
          safetyAssessment:'',//安评
          /*宗地现状*/
          acquiescenceCurrentBuilding:[],
          currentBuilding:'',//现状建筑物 select
          acquiescenceStatusStructures:[],
          statusStructures:'',//现状构筑物 select
          acquiescenceSmoothness:'',
          smoothness:'',//平整度 select
          acquiescenceLandNature:'',
          landNature:'',//地块性质 select
          /*风险影响*/
          riskEffect:[
            {
              projectId:'',//项目id
              costsEffect:'',//对成本的影响
              incomeEffect:'',//对收入的影响
              rest:'',//其他
              riskDesc:'',//风险描述
              acquiescenceRiskType:'',
              riskType:'',//风险类型 select
            },
          ],
          projectId:'',//项目id
          costsEffect:'',//对成本的影响
          incomeEffect:'',//对收入的影响
          rest:'',//其他
          riskDesc:'',//风险描述
          acquiescenceRiskType:'',
          riskType:'',//风险类型 select
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },

        /*项目周边规划情况图片管理*/
        peoRoundEnvironmentdictionariesTitle:'',//
        peoRoundEnvironmentdictionariesList:[],//
        peoRoundEnvironment:[],//项目周边规划情况图片管理*
        buildingPlandictionariesTitle:'',//
        buildingPlandictionariesList:[],//
        buildingPlan:[],//地形及地上物测绘平面图
        /*地形及地上物测绘平面图图片管理图片管理*/
        activeName: 'first',
        radio: '1',
        checkboxGroup1: ['上海'],
        checkboxGroup2: ['上海'],
        checkboxGroup3: ['上海'],
        checkboxGroup4: ['上海'],
        cities: cityOptions,
        projectId:'',
        // 附件 占地及规划信息
        url: this.$baseUrl+'/longcity/services/v1/upload/single',
        headers: {platform: 'pc', token: localStorage.getItem('token'), version: '1'},
        uploadAttachments01:[],
        uploadAttachments02:[],
        uploadAttachments03:[],
        uploadAttachments04:[],
        uploadAttachments05:[],
        uploadAttachments06:[],
        uploadAttachments07:[],
        uploadAttachments08:[],
        uploadAttachments09:[],
        privacy01: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        privacy02: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        privacy03: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        privacy04: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        privacy05: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        privacy06: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        privacy07: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        privacy08: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        privacy09: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        // 附件 占地及规划信息
        // 附件 自然条件
        uploadAttachments10:[],
        uploadAttachments11:[],
        uploadAttachments12:[],
        uploadAttachments13:[],//标书扫描件上传
        privacy10: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        privacy11: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        privacy12: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        privacy13: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        // 附件 自然条件
        /*proAnalysisIndex项目结束*/
      };
    },
    methods: {
      upLoad(event, file, fileList){
        this.loadingA = true;
      },//控制遮罩层
        /*时间save处理*/
      saveTime(){
          var that=this;
          /*年月日*/
          if(that.noticeDate){
            that.noticeDate=that.noticeDate+" 00:00:00";
          }
          if(that.backAuctionDate){
            that.backAuctionDate=that.backAuctionDate+" 00:00:00";
          }
          if(that.openTrafficDate){
            that.openTrafficDate=that.openTrafficDate+" 00:00:00";
          }
          /*年月日时间*/
          if(that.auction_time!=undefined&&that.auction_time!=''){
            that.auction_time=that.gmtToStr(that.auction_time);
          }
          if(that.marginEndTime!=undefined&&that.marginEndTime!=''){
            that.marginEndTime=that.gmtToStr(that.marginEndTime);
          }
          if(that.signEndTime!=undefined&&that.signEndTime!=''){
            that.signEndTime=that.gmtToStr(that.signEndTime);
          }
          if(that.signStartTime!=undefined&&that.signStartTime!=''){
            that.signStartTime=that.gmtToStr(that.signStartTime);
          }
      },
      peoRoundEnvironmentcomponentDataSynchronization(data){
        this.peoRoundEnvironment=data;
      },
      buildingPlancomponentDataSynchronization(data){
        this.buildingPlan=data;
      },
      /*年月日格式转换*/
      dateFormatConversionNoticeDate(date){
//        console.log(date);
//        this.noticeDate=date;//
        this.noticeDate=date;//
//        console.log(this.noticeDate);
      },
      dateFormatConversionBackAuctionDate(date){
        this.backAuctionDate=date;//
      },
      dateFormatConversionBackOpenTrafficDate(date){
        this.openTrafficDate=date;//
      },
      /*年月日格式转换*/
      /*年月日时间转换*/
      timeFormatConversionAuction_time(time){
        this.auction_time=time
      },
      timeFormatConversionMarginEndTime(time){
        this.marginEndTime=time
      },
      timeFormatConversionSignEndTime(time){
        this.signEndTime=time
      },
      timeFormatConversionSignStartTime(time){
        this.signStartTime=time
      },
      /*年月日时间转换*/
      /*提交校验*/
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitFlag.push(true);
          } else {
            this.submitFlag.push(false);
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
      /*proAnalysisIndex项目开始*/

      /*上传附件*/
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // 附件上传前的钩子函数;判断附件名称;大小等
      beforeAvatarUpload (file) {

        var isM = file.size / 1024 / 1024
        if (isM > this.M) {
          this.$message({
            showClose: true,
            message:'上传附件过大,最大为' + this.M + 'M!',
            type: 'success',
            duration:3000,
          });
          return false
        }
        this.isDisplayModel = false
      },
      // 附件上传成功函数;element-ui提供方法;成功后将对应的值进行处理展示;方便上传
      /*人防规定原文*/
      success01(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0;
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments01.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload01(index){
        this.uploadAttachments01.splice(index,1);
      },      //删除选中的附件
      /*消防规定原文*/
      success02(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments02.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload02(index){
        this.uploadAttachments02.splice(index,1);
      },      //删除选中的附件
      /*园林规定原文*/
      success03(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments03.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload03(index){
        this.uploadAttachments03.splice(index,1);
      },      //删除选中的附件
      /*规划条例原文*/
      success04(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments04.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload04(index){
        this.uploadAttachments04.splice(index,1);
      },      //删除选中的附件
      /*计容规定原文*/
      success05(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments05.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload05(index){
        this.uploadAttachments05.splice(index,1);
      },      //删除选中的附件
      /*单独的“建筑面积计算规定”原文*/
      success06(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments06.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload06(index){
        this.uploadAttachments06.splice(index,1);
      },      //删除选中的附件
      /*精装修、装配式、海绵城市、外立面等*/
      success07(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments07.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload07(index){
        this.uploadAttachments07.splice(index,1);
      },      //删除选中的附件
      /*钉桩文件原文*/
      success08(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments08.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload08(index){
        this.uploadAttachments08.splice(index,1);
      },      //删除选中的附件
      /*安评*/
      success09(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments09.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload09(index){
        this.uploadAttachments09.splice(index,1);
      },      //删除选中的附件
      // 附件 自然条件
      success10(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments10.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
      },
      deleteAvatarUpload10(index){
        this.uploadAttachments10.splice(index,1);
      },      //删除选中的附件
      success11(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments11.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload11(index){
        this.uploadAttachments11.splice(index,1);
      },      //删除选中的附件
      success12(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments12.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload12(index){
        this.uploadAttachments12.splice(index,1);
      },      //删除选中的附件
      // 附件 自然条件
      success13(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.uploadAttachments13.unshift(response.result[i])
        }
        this.isDisplayModel = true
        this.loadingA = false
//         console.log(response, file, fileList)
      },
      deleteAvatarUpload13(index){
        this.uploadAttachments13.splice(index,1);
      },      //删除选中的附件

      /*添加地块信息*/
      addBlockInformation:function () {
        let obj={
          landRect:'',//地块区域勾边
          landName:'',//地块名称
          landCode:'',//地块编号
          longitude:'',//经度
          latitude:'',//纬度
          controlHeight:'',//控制高度
          buildingDensity:'',//建筑密度
          volumeRate:'',//容积率
          greenRate:'',//绿地率
          backlineRequire:'',//退线要求
          entranceRequire:'',//出入口要求
          currentBuilding:'',//现状建筑物
          statusStructures:'',//现状构筑物
          remark:'',//备注信息
          landTitle:[],//用地性质
        };
        this.ruleForm3.plotInfo.unshift(obj);
      },
      /*删除地块信息*/
      deleteBlockInformation:function (index) {
        this.ruleForm3.plotInfo.splice(index,1);
      },
      /*添加不出让配套*/
      addNoMatching:function () {
        let obj={
          buildingArea:'',
          textDesc:'',
          buildingType:''
        };
        this.ruleForm3.noSellAssorts.unshift(obj);
      },
      /*删除不出让配套*/
      deleteNoMatching:function (index) {
        this.ruleForm3.noSellAssorts.splice(index,1);
      },
      /*添加风险影响*/
      addRiskImpact:function () {
        let obj= {
          projectId:'',//项目id
          costsEffect:'',//对成本的影响
          incomeEffect:'',//对收入的影响
          rest:'',//其他
          riskDesc:'',//风险描述
          acquiescenceRiskType:'',
          riskType:'',//风险类型 select
        };
        this.ruleForm3.riskEffect.unshift(obj);
      },
      /*删除风险影响*/
      deleteRiskImpact:function (index) {
        this.ruleForm3.riskEffect.splice(index,1);
      },
      /*通过接口获取select类型信息/交地标准/竞买方式/规划用地性质/不出让配套/现状建筑物/现状构筑物/平整度/
       地块性质/风险类型/对收入的影响/对成本的影响*/
      accessSelect:function(){
        var that = this;
        this.$http({
          method:'post',
          url:'/longcity/services/v1/dict/dictListByType',
          /*/交地标准/竞买方式/规划用地性质/不出让配套/现状建筑物/现状构筑物/平整度/地块性质/风险类型/用地性质/项目周边规划情况图片管理/地形及地上物测绘平面图*/
          data:{"dictTypes":["PayStandard","auction_type","planed_land_title","noSellAssort","currentBuilding","statusStructures","smoothness","landNature","riskType","land_title","peoRoundEnvironment","buildingPlan"]},
        }).then(function (succeed) {
          succeed.data.result.forEach(item=>{
            switch(item.dictType){
              case "PayStandard":
                /*交地标准 payStandard*/
                that.ruleForm2.payStandard=item.items;
                break;
              case "auction_type":
                /*竞买方式 auction_type*/
                that.ruleForm2.auction_type=item.items;
                break;
              case "planed_land_title":
                /*规划用地性质 landUsage*/
                that.ruleForm3.landUsage=item.items;
                break;
              case "noSellAssort":
                /*不出让配套 noSellAssort*/
                that.ruleForm3.noSellAssort=item.items;
                break;
              case "currentBuilding":
                /*现状建筑物 currentBuilding*/
                that.ruleForm3.currentBuilding=item.items;
                break;
              case "statusStructures":
                /*现状构筑物 statusStructures*/
                that.ruleForm3.statusStructures=item.items;
                break;
              case "smoothness":
                /*平整度 smoothness*/
                that.ruleForm3.smoothness=item.items;
                break;
              case "landNature":
                /*地块性质 landNature*/
                that.ruleForm3.landNature=item.items;
                break;
              case "riskType":
                /*风险类型 riskType*/
                that.ruleForm3.riskType=item.items;
                break;
              case "land_title":
                /*用地性质 land_title*/
                that.ruleForm3.landTitle=item.items;
                break;
              case "peoRoundEnvironment":
                /*项目周边规划情况图片管理 peoRoundEnvironment*/
                that.peoRoundEnvironmentdictionariesList=item.items;
                that.peoRoundEnvironmentdictionariesTitle="peoRoundEnvironment";

                break;
              case "buildingPlan":
                /*地形及地上物测绘平面图 buildingPlan*/
                that.buildingPlandictionariesTitle="buildingPlan";
                that.buildingPlandictionariesList=item.items;
                break;
            };
          });
        },function (err) {
          console.log(err);
        })
      },
      /*通过接口获取项目信息*/
      accessProAnalysisIndex:function () {
        this.dataInitialization();
        let that = this;
        this.$http({
          method:'post',
          url:'/longcity/services/v1/project/getMenuDetail',
          data:{
            "projectId":that.projectId,
            "titleKey":[//菜单对应的titleKEY
              "proProjectInfo",//项目成本运营
            ]
          }
        }).then(function (succeed) {
          if(succeed.data.code==200 || succeed.data.code=="200"){
            /* 将数据传递给subImg*/
            that.peoRoundEnvironment=succeed.data.result.proProjectInfo.peoRoundEnvironment;//项目周边规划情况
            /*将数据传递给subImg*/
            that.buildingPlan=succeed.data.result.proProjectInfo.buildingPlan;//地形及地上物测绘平面图
            that.accessSelect();
            let proProjectInfo=succeed.data.result.proProjectInfo;
            /*select*/
            that.ruleForm2.acquiescencePayStandard=proProjectInfo.PayStandard;//交地标准 select
            that.ruleForm2.acquiescenceAuction_type=proProjectInfo.auction_type;//竞买方式 select
            that.ruleForm3.acquiescenceLandUsage=proProjectInfo.planed_land_title;//规划用地性质 select
            that.ruleForm3.acquiescenceNoSellAssort=proProjectInfo.noSellAssort;//不出让配套(类型) select
            that.ruleForm3.acquiescenceCurrentBuilding=proProjectInfo.currentBuilding;//现状建筑物 select
            that.ruleForm3.acquiescenceStatusStructures=proProjectInfo.statusStructures;//现状构筑物  select
            that.ruleForm3.acquiescenceSmoothness=proProjectInfo.smoothness;//平整度 select
            that.ruleForm3.riskEffect.acquiescenceRiskType=proProjectInfo.riskEffect.riskType;//风险类型 select
            that.ruleForm3.acquiescenceLandNature=proProjectInfo.landNature;//地块性质 select

            that.ruleForm2.totalPriceBegin=proProjectInfo.totalPriceBegin;
            that.ruleForm2.auctionAmount=proProjectInfo.auctionAmount;
            that.ruleForm2.fundProofAmount=proProjectInfo.fundProofAmount;
//          that.ruleForm2.PayStandard=proProjectInfo.PayStandard;
            that.noticeDate=proProjectInfo.noticeDate.substr(0,10);//公告时间
//            that.noticeDate=proProjectInfo.noticeDate;//公告时间
            if(proProjectInfo.marginEndTime!=''){
              that.marginEndTime=that.strToGmt(new Date(Date.parse(proProjectInfo.marginEndTime.replace(/-/g,"/"))))
            }//保证金截止时间
            if(proProjectInfo.signStartTime!=''){
              that.signStartTime=that.strToGmt(new Date(Date.parse(proProjectInfo.signStartTime.replace(/-/g,"/"))))
            }//报名起始时间
            if(proProjectInfo.signEndTime!=''){
              that.signEndTime=that.strToGmt(new Date(Date.parse(proProjectInfo.signEndTime.replace(/-/g,"/"))))
            }//报名截止时间
            if(proProjectInfo.auction_time!=''){
              that.auction_time=that.strToGmt(new Date(Date.parse(proProjectInfo.auction_time.replace(/-/g,"/"))))
            }//竞价时间
            that.backAuctionDate=proProjectInfo.backAuctionDate.substr(0,10);//如未获取，保证金退回时间
            that.openTrafficDate=proProjectInfo.openTrafficDate.substr(0,10);//通车时间

            that.ruleForm3.otherDescription=proProjectInfo.otherDescription;//其他说明
            that.ruleForm3.documentNumber=proProjectInfo.documentNumber;//文件[公告]编号
            that.ruleForm3.landNumbering=proProjectInfo.landNumbering;//地块编号
            that.ruleForm3.primaryDevelopmentUnit=proProjectInfo.primaryDevelopmentUnit;//一级开发单位
            that.ruleForm3.biddingRules=proProjectInfo.biddingRules;//竞买规则
            that.ruleForm3.tenderScan=proProjectInfo.tenderScan;//标书扫描件
            /*市政条件*/
            /*周边道路*/
            that.ruleForm3.currentArroundRoad=proProjectInfo.currentArroundRoad;//周边道路现状
            that.ruleForm3.currentRoadBoard=proProjectInfo.currentRoadBoard;//周边道路现状路板
            that.ruleForm3.currentRoadRamp=proProjectInfo.currentRoadRamp;//周边道路现状立交桥和匝道
            that.ruleForm3.currentRoadOpen=proProjectInfo.currentRoadOpen;//周边道路现状允许开口
            that.ruleForm3.currentRoadVertical=proProjectInfo.currentRoadVertical;//周边道路现状竖向现状
            that.ruleForm3.currentRoadOverbridge=proProjectInfo.currentRoadOverbridge;//周边道路现状天桥
            that.ruleForm3.planRoad=proProjectInfo.planRoad;//周边道路规划
            that.ruleForm3.planRoadBoard=proProjectInfo.planRoadBoard;//周边道路规划路板
            that.ruleForm3.planRoadRamp=proProjectInfo.planRoadRamp;//周边道路规划立交桥和匝道
            that.ruleForm3.planRoadOpen=proProjectInfo.planRoadOpen;//周边道路规划允许开口
            that.ruleForm3.planRoadVertical=proProjectInfo.planRoadVertical;//周边道路规划竖向规划
            that.ruleForm3.planRoadOverbridge=proProjectInfo.planRoadOverbridge;//周边道路规划天桥
            /*管线*/
            that.ruleForm3.currentPipeline=proProjectInfo.currentPipeline;//管线现状
            that.ruleForm3.currentPipelineOpen=proProjectInfo.currentPipelineOpen;//管线开口及标高现状
            that.ruleForm3.planPipeline=proProjectInfo.planPipeline;//管线规划
            that.ruleForm3.planPipelineOpen=proProjectInfo.planPipelineOpen;//管线开口及标高规划
            /*轨道交通*/
            that.ruleForm3.currentTrafficHallHeight=proProjectInfo.currentTrafficHallHeight;//轨道交通站厅层标高现状
            that.ruleForm3.currentTrafficSoilDeptht=proProjectInfo.currentTrafficSoilDeptht;//轨道交通站房埋深和覆土深度现状
            that.ruleForm3.currentTrafficFloorHeight=proProjectInfo.currentTrafficFloorHeight;//轨道交通站台层标高现状
            that.ruleForm3.currentTrafficExtentDepth=proProjectInfo.currentTrafficExtentDepth;//轨道交通区间段埋深现状
            that.ruleForm3.currentTrafficIsConnectUnder=proProjectInfo.currentTrafficIsConnectUnder;//轨道交通是否可接驳地下商业现状
            that.ruleForm3.currentTrafficIsExtentUnderPass=proProjectInfo.currentTrafficIsExtentUnderPass;//轨道交通区间段是否在地块内下穿现状
            that.ruleForm3.currentTrafficIsRemould=proProjectInfo.currentTrafficIsRemould;//轨道交通地面构筑物可否改造现状
            that.ruleForm3.currentTrafficOtherForceDemand=proProjectInfo.currentTrafficOtherForceDemand;//轨道交通其他强制要求说明现状
            that.ruleForm3.planTrafficHallHeight=proProjectInfo.planTrafficHallHeight;//轨道交通站厅层标高规划
            that.ruleForm3.planTrafficSoilDeptht=proProjectInfo.planTrafficSoilDeptht;//轨道交通站房埋深和覆土深度规划
            that.ruleForm3.planTrafficFloorHeight=proProjectInfo.planTrafficFloorHeight;//轨道交通站台层标高现规划
            that.ruleForm3.planTrafficExtentDepth=proProjectInfo.planTrafficExtentDepth;//轨道交通区间段埋深规划
            that.ruleForm3.planTrafficIsConnectUnder=proProjectInfo.planTrafficIsConnectUnder;//轨道交通是否可接驳地下商业规划
            that.ruleForm3.planTrafficIsExtentUnderPass=proProjectInfo.planTrafficIsExtentUnderPass;//轨道交通区间段是否在地块内下穿规划
            that.ruleForm3.planTrafficIsRemould=proProjectInfo.planTrafficIsRemould;//轨道交通地面构筑物可否改造规划
            that.ruleForm3.planTrafficOtherForceDemand=proProjectInfo.planTrafficOtherForceDemand;//轨道交通其他强制要求说明规划
            /*公交*/
            that.ruleForm3.currentBus=proProjectInfo.currentBus;//公交现状
            that.ruleForm3.planBus=proProjectInfo.planBus;//公交规划
            that.ruleForm3.tenderScan=proProjectInfo.tenderScan;//标书扫描件
            /*项目战略*/
            that.ruleForm3.boardProperty=proProjectInfo.boardProperty;//板块属性
            that.ruleForm3.trafficZone=proProjectInfo.trafficZone;//交通区位
            that.ruleForm3.assortResource=proProjectInfo.assortResource;//配套资源
            that.ruleForm3.industrialRadiation=proProjectInfo.industrialRadiation;//产业辐射及客户资源
            /*占地及规划信息*/
            that.ruleForm3.planed_area_total=proProjectInfo.planed_area_total;//占地面积(万平/㎡)
            that.ruleForm3.planed_building_area=proProjectInfo.planed_building_area;//建筑面积(万/㎡)
            that.ruleForm3.floorCoveredArea=proProjectInfo.floorCoveredArea;//计容地上建面
            that.ruleForm3.plot_ratio=proProjectInfo.plot_ratio;//容积率
            that.ruleForm3.floorArea=proProjectInfo.floorArea;//代征土地面积
            that.ruleForm3.merchantableArea=proProjectInfo.merchantableArea;//可售面积(地上)

            //提出汪亮的一个id为空的bug
            if(proProjectInfo.plotInfo.length>0){
              that.ruleForm3.plotInfo=proProjectInfo.plotInfo.filter(item => {
                item.id === "" && (delete item.id);//地块信息
                return true;
              })
            };
            that.ruleForm3.daylightingStandard=proProjectInfo.daylightingStandard;//日照要求
            that.ruleForm3.roadStandard=proProjectInfo.roadStandard;//内部道路要求
            that.ruleForm3.plotRatioUse=proProjectInfo.plotRatioUse;//容积率不平衡使用
            that.ruleForm3.floorPlanHouseArea=proProjectInfo.floorPlanHouseArea;//地上计容住宅建面
            switch(proProjectInfo.houseRebuildCompensation){
              case "0":
                that.ruleForm3.houseRebuildCompensation='有偿';
                break;
              case "1":
                that.ruleForm3.houseRebuildCompensation='无偿';
                break;
            }
            switch(proProjectInfo.houseRebuildLimitPrice){
              case "0":
                that.ruleForm3.houseRebuildLimitPrice='有限价';
                break;
              case "1":
                that.ruleForm3.houseRebuildLimitPrice='无限价';
                break;
            }
            switch(proProjectInfo.houseRebuildRemote){
              case "0":
                that.ruleForm3.houseRebuildRemote='原地';
                break;
              case "1":
                that.ruleForm3.houseRebuildRemote='异地';
                break;
            }
            switch(proProjectInfo.commerceRebuildCompensation){
              case "0":
                that.ruleForm3.commerceRebuildCompensation='有偿';
                break;
              case "1":
                that.ruleForm3.commerceRebuildCompensation='无偿';
                break;
            }
            switch(proProjectInfo.commerceRebuildLimitPrice){
              case "0":
                that.ruleForm3.commerceRebuildLimitPrice='有限价';
                break;
              case "1":
                that.ruleForm3.commerceRebuildLimitPrice='无限价';
                break;
            }
            switch(proProjectInfo.commerceRebuildRemote){
              case "0":
                that.ruleForm3.commerceRebuildRemote='原地';
                break;
              case "1":
                that.ruleForm3.commerceRebuildRemote='异地';
                break;
            }
            switch(proProjectInfo.officeRebuildCompensation){
              case "0":
                that.ruleForm3.officeRebuildCompensation='有偿';
                break;
              case "1":
                that.ruleForm3.officeRebuildCompensation='无偿';
                break;
            }
            switch(proProjectInfo.officeRebuildLimitPrice){
              case "0":
                that.ruleForm3.officeRebuildLimitPrice='有限价';
                break;
              case "1":
                that.ruleForm3.officeRebuildLimitPrice='无限价';
                break;
            }
            switch(proProjectInfo.officeRebuildRemote){
              case "0":
                that.ruleForm3.officeRebuildRemote='原地';
                break;
              case "1":
                that.ruleForm3.officeRebuildRemote='异地';
                break;
            }
            that.ruleForm3.houseRebuildLimitAge=proProjectInfo.houseRebuildLimitAge;// 起始还建住宅自持年限
            that.ruleForm3.houseRebuildArea=proProjectInfo.houseRebuildArea;// 起始还建住宅面积
            that.ruleForm3.houseRebuildPrice=proProjectInfo.houseRebuildPrice;//       起始还建住宅售价
            that.ruleForm3.commerceRebuildLimitAge=proProjectInfo.commerceRebuildLimitAge;//  起始还建商业自持年限
            that.ruleForm3.commerceRebuildArea=proProjectInfo.commerceRebuildArea;// 起始还建商业面积
            that.ruleForm3.commerceRebuildPrice=proProjectInfo.commerceRebuildPrice;//起始还建商业售价
            that.ruleForm3.officeRebuildLimitAge=proProjectInfo.officeRebuildLimitAge;// 起始还建写字楼自持年限
            that.ruleForm3.officeRebuildArea=proProjectInfo.officeRebuildArea;//    起始还建写字楼面积
            that.ruleForm3.officeRebuildPrice=proProjectInfo.officeRebuildPrice;//       起始还建写字楼售价
            that.ruleForm3.profitArea=proProjectInfo.profitArea;//盈利面积
            that.ruleForm3.profitPrice=proProjectInfo.profitPrice;//盈利售价
            that.ruleForm3.unprofitArea=proProjectInfo.unprofitArea;//非盈利面积
            that.ruleForm3.unprofitPrice=proProjectInfo.unprofitPrice;//非盈利售价
            if(proProjectInfo.noSellAssort.length>0){
              that.ruleForm3.noSellAssorts=proProjectInfo.noSellAssort.filter(item => {
                item.id === "" && (delete item.id);//地块信息
                return true;
              });//不出让配套
            }
            that.ruleForm3.otherAssort=proProjectInfo.otherAssort;//其他配套要求
            that.ruleForm3.ParkingAssort=proProjectInfo.ParkingAssort;//车位配建要求
            that.ruleForm3.assembleStandard=proProjectInfo.assembleStandard;//装配式要求
            that.ruleForm3.afforestStandard=proProjectInfo.afforestStandard;//绿色建筑要求
            /*自然条件*/
            that.ruleForm3.riverway=proProjectInfo.riverway;//河道水位
            that.ruleForm3.spillway=proProjectInfo.spillway;//泄洪道
            that.ruleForm3.tide=proProjectInfo.tide;//潮汐水位
            that.uploadAttachments01=[];
            that.uploadAttachments01=proProjectInfo.civilAirRule;//人防规定原文
            that.uploadAttachments02=[];
            that.uploadAttachments02=proProjectInfo.FireRule;//消防规定原文
            that.uploadAttachments03=[];
            that.uploadAttachments03=proProjectInfo.parkRule;//园林规定原文
            that.uploadAttachments04=[];
            that.uploadAttachments04=proProjectInfo.planRule;//规划条例原文
            that.uploadAttachments05=[];
            that.uploadAttachments05=proProjectInfo.plotRatioRule;//计容规定原文
            that.uploadAttachments06=[];
            that.uploadAttachments06=proProjectInfo.coveredAreaRule;//单独的“建筑面积计算规定”原文
            that.uploadAttachments07=[];
            that.uploadAttachments07=proProjectInfo.refinedDecoration;//精装修、装配式、海绵城市、外立面等
            that.uploadAttachments08=[];
            that.uploadAttachments08=proProjectInfo.nail;//钉桩文件原文
            that.uploadAttachments10=[];
            that.uploadAttachments10=proProjectInfo.exploration;//初勘文件
            that.uploadAttachments11=[];
            that.uploadAttachments11=proProjectInfo.hydrology;//水文资料
            that.uploadAttachments12=[];
            that.uploadAttachments12=proProjectInfo.safetyAssessment;//安评
            that.uploadAttachments13=[];
            that.uploadAttachments13=proProjectInfo.tenderScan;//标书扫描件


            /*风险影响*/
            if(proProjectInfo.riskEffect.length>0){
              that.ruleForm3.riskEffect=proProjectInfo.riskEffect.filter(item => {
                item.id === "" && (delete item.id);//地块信息
                return true;
              });
            }
          }
        },function (err) {
          console.log(err);
        })
      },
      /*获取单选框信息*/
      getMenuBoxInformation:function () {
        var that=this;
        switch(this.ruleForm3.houseRebuildCompensation){
          case "有偿":
            that.ruleForm3.houseRebuildCompensation='0';
            break;
          case "无偿":
            that.ruleForm3.houseRebuildCompensation='1';
            break;
        }
        switch(this.ruleForm3.houseRebuildLimitPrice){
          case "有限价":
            that.ruleForm3.houseRebuildLimitPrice='0';
            break;
          case "无限价":
            that.ruleForm3.houseRebuildLimitPrice='1';
            break;
        }
        switch(this.ruleForm3.houseRebuildRemote){
          case "原地":
            that.ruleForm3.houseRebuildRemote='0';
            break;
          case "异地":
            that.ruleForm3.houseRebuildRemote='1';
            break;
        }
        switch(this.ruleForm3.commerceRebuildCompensation){
          case "有偿":
            that.ruleForm3.commerceRebuildCompensation='0';
            break;
          case "无偿":
            that.ruleForm3.commerceRebuildCompensation='1';
            break;
        }
        switch(this.ruleForm3.commerceRebuildLimitPrice){
          case "有限价":
            that.ruleForm3.commerceRebuildLimitPrice='0';
            break;
          case "无限价":
            that.ruleForm3.commerceRebuildLimitPrice='1';
            break;
        }
        switch(this.ruleForm3.commerceRebuildRemote){
          case "原地":
            that.ruleForm3.commerceRebuildRemote='0';
            break;
          case "异地":
            that.ruleForm3.commerceRebuildRemote='1';
            break;
        }
        switch(this.ruleForm3.officeRebuildCompensation){
          case "有偿":
            that.ruleForm3.officeRebuildCompensation='0';
            break;
          case "无偿":
            that.ruleForm3.officeRebuildCompensation='1';
            break;
        }
        switch(this.ruleForm3.officeRebuildLimitPrice){
          case "有限价":
            that.ruleForm3.officeRebuildLimitPrice='0';
            break;
          case "无限价":
            that.ruleForm3.officeRebuildLimitPrice='1';
            break;
        }
        switch(this.ruleForm3.officeRebuildRemote){
          case "原地":
            that.ruleForm3.officeRebuildRemote='0';
            break;
          case "异地":
            that.ruleForm3.officeRebuildRemote='1';
            break;
        }
      },
      /*通过接口提交项目信息*/
      subProAnalysisIndex:function () {
        var that = this;
        /*提交校验1*/
        this.submitFlag=[]
        this.submitForm('ruleForm2');
        this.submitForm('ruleForm3');
        for(var i=0; i<this.submitFlag.length;i++){
          if(that.submitFlag[i]===false){
            return
          }
        }
        /*提交校验2*/
        let flag=document.getElementsByClassName("length").length;
        if(flag>0){
          return false;
        }
        this.getMenuBoxInformation();//获取单选框信息
        this.saveTime();//时间拼接00:00:00
        this.$http({
          method:'post',
          url:'/longcity/services/v1/project/saveProjectPartially',
          data:{
//            "projectId":1024,
            "projectId":that.projectId,
            "title": "proProjectInfo",
            "detail":{
              "otherDescription": that.ruleForm3.otherDescription,//其他说明
              "documentNumber": that.ruleForm3.documentNumber,//文件[公告]编号
              "landNumbering": that.ruleForm3.landNumbering,// 地块编号
              "primaryDevelopmentUnit": that.ruleForm3.primaryDevelopmentUnit,//一级开发单位
              "biddingRules": that.ruleForm3.biddingRules,//竞买规则
              "tenderScan": that.uploadAttachments13,//标书扫描件
              /*select*/
              "openTrafficDate": that.openTrafficDate,//通车时间
              "marginEndTime": that.marginEndTime,
              "currentTrafficHallHeight":that.ruleForm3.currentTrafficHallHeight ,
              "planRoadRamp": that.ruleForm3.planRoadRamp,
              "currentTrafficOtherForceDemand": that.ruleForm3.currentTrafficOtherForceDemand,
              "currentTrafficExtentDepth": that.ruleForm3.currentTrafficExtentDepth,
              "planTrafficIsRemould": that.ruleForm3.planTrafficIsRemould,
              "commerceRebuildRemote": that.ruleForm3.commerceRebuildRemote,
              "officeRebuildPrice": that.ruleForm3.officeRebuildPrice,
              "planTrafficHallHeight": that.ruleForm3.planTrafficHallHeight,
              "otherAssort": that.ruleForm3.otherAssort,
              "afforestStandard": that.ruleForm3.afforestStandard,
              "planed_building_area": that.ruleForm3.planed_building_area,
              "currentTrafficIsRemould": that.ruleForm3.currentTrafficIsRemould,
              "roadStandard": that.ruleForm3.roadStandard,
              "planBus": that.ruleForm3.planBus,
              "houseRebuildCompensation":that.ruleForm3.houseRebuildCompensation,
              "daylightingStandard": that.ruleForm3.daylightingStandard,
              "currentPipeline": that.ruleForm3.currentPipeline,
              "merchantableArea": that.ruleForm3.merchantableArea,
              "plotRatioUse": that.ruleForm3.plotRatioUse,//容积率不平衡使用
              "auction_type": that.ruleForm2.acquiescenceAuction_type,//select
//              "plotRatioUseplotRatioUse": that.ruleForm3,//select
              "civilAirRule":that.uploadAttachments01,//人防规定原文
//              "FireRule":that.uploadAttachments02,//消防规定原文
//              "parkRule":that.uploadAttachments03,//园林规定原文
//              "planRule":that.uploadAttachments04,//规划条例原文
//              "plotRatioRule":that.uploadAttachments05,//计容规定原文
//              "coveredAreaRule":that.uploadAttachments06,//单独的“建筑面积计算规定”原文
//              "refinedDecoration":that.uploadAttachments07,//精装修、装配式、海绵城市、外立面等
//              "nail":that.uploadAttachments08,//钉桩文件原文
              "exploration":that.uploadAttachments10,//初勘文件
//              "hydrology":that.uploadAttachments11,//水文资料
//              "safetyAssessment":that.uploadAttachments12,//安评
              "FireRule":that.uploadAttachments02,//消防规定原文
              "parkRule":that.uploadAttachments03,//园林规定原文
              "planRule":that.uploadAttachments04,//规划条例原文
              "plotRatioRule":that.uploadAttachments05,//计容规定原文
              "coveredAreaRule":that.uploadAttachments06,//单独的“建筑面积计算规定”原文
              "refinedDecoration":that.uploadAttachments07,//精装修、装配式、海绵城市、外立面等
              "nail":that.uploadAttachments08,//钉桩文件原文
              "exploration":that.uploadAttachments10,//初勘文件
              "hydrology":that.uploadAttachments11,//水文资料
              "safetyAssessment":that.uploadAttachments12,//安评
              "planTrafficOtherForceDemand": that.ruleForm3.planTrafficOtherForceDemand,
              "peoRoundEnvironment":that.peoRoundEnvironment,//项目周边规划情况
              "houseRebuildLimitAge": that.ruleForm3.houseRebuildLimitAge,
              "backAuctionDate": that.backAuctionDate,
              "houseRebuildPrice": that.ruleForm3.houseRebuildPrice,
              "landNature": that.ruleForm3.acquiescenceLandNature,//select 地块性质
              "auctionAmount": that.ruleForm2.auctionAmount,
              "boardProperty": that.ruleForm3.boardProperty,
              "commerceRebuildArea": that.ruleForm3.commerceRebuildArea,
              "ParkingAssort": that.ruleForm3.ParkingAssort,
              "currentTrafficSoilDeptht": that.ruleForm3.currentTrafficSoilDeptht,
              "houseRebuildLimitPrice": that.ruleForm3.houseRebuildLimitPrice,
              "planRoadOpen":that.ruleForm3.planRoadOpen,
              "profitPrice": that.ruleForm3.profitPrice,
              "currentBuilding": that.ruleForm3.acquiescenceCurrentBuilding,//select 现状建筑物 select
              "currentBus": that.ruleForm3.currentBus,
              "currentRoadVertical": that.ruleForm3.currentRoadVertical,
              "profitArea":that.ruleForm3.profitArea,
              "unprofitArea": that.ruleForm3.unprofitArea,
              "signEndTime":that.signEndTime,
              "officeRebuildRemote": that.ruleForm3.officeRebuildRemote,
              "floorArea": that.ruleForm3.floorArea,
              "fundProofAmount": that.ruleForm2.fundProofAmount,
              "houseRebuildArea": that.ruleForm3.houseRebuildArea,
              "industrialRadiation": that.ruleForm3.industrialRadiation,
              "officeRebuildArea": that.ruleForm3.officeRebuildArea,
              "spillway": that.ruleForm3.spillway,
              "currentRoadRamp": that.ruleForm3.currentRoadRamp,
              "smoothness": that.ruleForm3.acquiescenceSmoothness,//select 平整度
              "unprofitPrice": that.ruleForm3.unprofitPrice,
              "currentTrafficFloorHeight": that.ruleForm3.currentTrafficFloorHeight,
              "commerceRebuildLimitPrice": that.ruleForm3.commerceRebuildLimitPrice,
              "planed_area_total": that.ruleForm3.planed_area_total,
              "noSellAssort": that.ruleForm3.noSellAssorts,//不出让配套(类型)
              "tide": that.ruleForm3.tide,
              "houseRebuildRemote": that.ruleForm3.houseRebuildRemote,
              "currentTrafficIsExtentUnderPass":that.ruleForm3.currentTrafficIsExtentUnderPass,
              "currentPipelineOpen": that.ruleForm3.currentPipelineOpen,
              "commerceRebuildPrice": that.ruleForm3.commerceRebuildPrice,
              "officeRebuildLimitAge": that.ruleForm3.officeRebuildLimitAge,
              "planRoadVertical": that.ruleForm3.planRoadVertical,
              "auction_time": that.auction_time,
              "buildingPlan":that.buildingPlan,
              "officeRebuildCompensation":that.ruleForm3.officeRebuildCompensation,
              "planTrafficFloorHeight": that.ruleForm3.planTrafficFloorHeight,
              "currentRoadBoard": that.ruleForm3.currentRoadBoard,
              "currentRoadOverbridge": that.ruleForm3.currentRoadOverbridge,
              "plot_ratio": that.ruleForm3.plot_ratio,
              "commerceRebuildLimitAge": that.ruleForm3.commerceRebuildLimitAge,
              "riverway":that.ruleForm3.riverway,
              "planRoad": that.ruleForm3.planRoad,
              "plotInfo":that.ruleForm3.plotInfo,//地块信息
              "currentRoadOpen": that.ruleForm3.currentRoadOpen,
              "planRoadBoard": that.ruleForm3.planRoadBoard,
              "planTrafficIsExtentUnderPass": that.ruleForm3.planTrafficIsExtentUnderPass,
              "signStartTime": that.signStartTime,
              "assembleStandard": that.ruleForm3.assembleStandard,
              "trafficZone": that.ruleForm3.trafficZone,
              "planTrafficIsConnectUnder": that.ruleForm3.planTrafficIsConnectUnder,
              "planTrafficExtentDepth": that.ruleForm3.planTrafficExtentDepth,
              "officeRebuildLimitPrice": that.ruleForm3.officeRebuildLimitPrice,
              "floorCoveredArea":that.ruleForm3.floorCoveredArea,
              "planTrafficSoilDeptht": that.ruleForm3.planTrafficSoilDeptht,
              "planed_land_title":that.ruleForm3.acquiescenceLandUsage,//select
              "statusStructures": that.ruleForm3.acquiescenceStatusStructures,//select 现状构筑物
              "commerceRebuildCompensation": that.ruleForm3.commerceRebuildCompensation,
              "planPipelineOpen": that.ruleForm3.planPipelineOpen,
              "currentTrafficIsConnectUnder": that.ruleForm3.currentTrafficIsConnectUnder,
              "PayStandard": that.ruleForm2.acquiescencePayStandard,//交地标准
              "assortResource": that.ruleForm3.assortResource,
              "floorPlanHouseArea": that.ruleForm3.floorPlanHouseArea,
              "planRoadOverbridge": that.ruleForm3.planRoadOverbridge,
              "riskEffect":this.ruleForm3.riskEffect,
              "noticeDate": that.noticeDate,
              "planPipeline": that.ruleForm3.planPipeline,
              "totalPriceBegin": that.ruleForm2.totalPriceBegin,
              "currentArroundRoad": that.ruleForm3.currentArroundRoad,
            },
          }
        }).then(function (succeed) {
          if(succeed.data.code==200 || succeed.data.code=="200"){
            that.thePreservationPopup();
          }else{
            that.$message({
              showClose: true,
              message: '保存失败！',
              type: 'error',
              duration:3000,
            });
          }
        },function (err) {
          console.log(err);
        })
      },

      /*从projectManagement获取页面ID*/
      getId(str){
        this.projectId=parseInt(str);
        this.accessProAnalysisIndex();
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
      },
      /*关闭本页面*/
      cancelThePage(operation){
        this.$emit('cancelThePage',operation);
        this.dataInitialization();
      },
      run(fun,parm){
        if(fun=="getId"){
          this.getId(parm);
        }else if(fun=="getPosition"){
          this.getPosition(parm);
        }else if(fun="getPoints"){
          this.getPoints(parm);
        }
      },
      /*页面将数据初始化*/
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
        this.buildingPlanimgCover=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.buildingPlanimgFourto=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.buildingPlanimgFavourableFactor=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.buildingPlanimgNegativeFactor=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
        this.buildingPlanimgActuality=[
          {
            src:'',
            title:'',
            shortSrc:'',
          }
        ];
      }
      /*proAnalysisIndex项目结束*/
    },
    props: {
      childParm: Object
    }
  }
</script>
<style lang="less">
  @import "../../assets/css/common.css";
  @import "../../assets/css/base.css";
  #conMod{
    width:100%;
    overflow: auto;
  }
  #proAnalysisIndex {
  .newProject {
    margin: 0px auto;
    background-color: white;
  }

   .newProject-title {
    height: 50px;
    text-align: center;
    background: #67649F;
    position: fixed;
    width: 63%;
    z-index: 3;
    padding-bottom: 4px;
  }

   .newProject-title .survey {
    clear: both;
    position: relative;
  }

   .newProject-title .survey p {
    width: 80%;
    height: 50px;
    line-height: 50px;
    font-size: 16px !important;
    color: #FFFFFF;
    padding: 0;
    /*超出...*/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    word-break: normal;
  }

   .newProject-title .survey .btn {
    /*float: right;*/
    position: absolute;
    right: 0;
    top: 50% !important;
    transform: translate(0%, -50%);

  }

   .newProject-title .survey .el-button {
    text-align: center;
    width: 80px !important;
    height: 30px !important;
    line-height: 0;
  }

   .newProject-title .survey button:nth-of-type(1) {
    border: 1px solid #fff;
  }

   .newProject-title .survey button:nth-of-type(2) {
    margin-right: 25px;
  }

  .newProject-title .survey .el-button--primary {
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
  .proAnalysisIndex-body {
    margin-top: 10px;
  }

  .proAnalysisIndex-body .marketBidding-body {
    /*height: 100%;*/
  }

  .proAnalysisIndex-body hr {
    opacity: 0.2;
    border: 1px solid #6863C8;
  }

  .proAnalysisIndex-body .marketBidding-body .marketBidding-body-infor .el-form-item__content {
    /*margin-left: 120px!important;*/
  }

  .proAnalysisIndex-body .marketBidding-body .marketBidding-body-infor .left {
    float: left;
  }

  .proAnalysisIndex-body .marketBidding-body .marketBidding-body-infor .right {
    float: left;
  }

  .proAnalysisIndex-body .theSurPlanning {
    /*height: 2000px;*/
  }

  .proAnalysisIndex-body .theSurPlanning-title {
    /*height: 50px;*/
  }

  .proAnalysisIndex-body .theSurPlanning-title hr {
    opacity: 0.2;
    border: 1px solid #6863C8;
  }

  .proAnalysisIndex-body .theSurPlanning .theSurPlanning-body {

  }

  /*图片管理*/
  .theSurPlanning-body .imageManagement .proPhoto .tabs {
    position: relative;
  }

  .theSurPlanning-body .imageManagement .proPhoto .tabs p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .theSurPlanning-body .imageManagement .proPhoto .btn {
    background-color: #67649F;
    border-color: #67649F;
    line-height: 1;
    cursor: pointer;
    padding: 10px 15px 10px 5px;
    border-radius: 4px;
    position: relative;
  }

  .theSurPlanning-body .imageManagement .proPhoto .btn:before {
    content: "";
    background: url('../../assets/images/add.png') no-repeat;
    background-size: 14px 14px;
    text-align: center;
    color: #fff;
    float: left;
    border-radius: 25px;
    display: block;
    width: 14px;
    height: 14px;
    margin-right: 2px;
  }

  .theSurPlanning-body .offsetLeft {
    margin-left: 10px;
  }

  .theSurPlanning-body .meterCapacitance .btn {
    background-color: #67649F;
    border-color: #67649F;
    line-height: 1;
    cursor: pointer;
    padding: 10px 15px 10px 5px;
    border-radius: 4px;
    position: relative;
  }

  .theSurPlanning-body .meterCapacitance .btn:before {
    content: "";
    background: url('../../assets/images/add.png') no-repeat;
    background-size: 14px 14px;
    text-align: center;
    color: #fff;
    float: left;
    border-radius: 25px;
    display: block;
    width: 14px;
    height: 14px;
    margin-right: 2px;
  }

  .theSurPlanning-body .meterCapacitance02 .btn {
    background-color: #67649F;
    border-color: #67649F;
    line-height: 1;
    cursor: pointer;
    padding: 10px 15px 10px 5px;
    border-radius: 4px;
    position: relative;
  }

  .theSurPlanning-body .meterCapacitance02 .btn:before {
    content: "";
    background: url('../../assets/images/add.png') no-repeat;
    background-size: 14px 14px;
    text-align: center;
    color: #fff;
    float: left;
    border-radius: 25px;
    display: block;
    width: 14px;
    height: 14px;
    margin-right: 2px;
  }

  /*上传附件*/
  .theSurPlanning-body .uploadAttachments .btn:before {
    content: "";
    background: url('../../assets/images/add.png') no-repeat;
    background-size: 14px 14px;
    text-align: center;
    color: #fff;
    float: left;
    border-radius: 25px;
    display: block;
    width: 14px;
    height: 14px;
    margin-right: 2px;
  }

  .theSurPlanning-body .uploadAttachments .btn {
    background-color: #67649F;
    border-color: #67649F;
    line-height: 1;
    cursor: pointer;
    padding: 10px 15px 10px 5px;
    border-radius: 4px;
    position: relative;
    margin-bottom: 10px;
  }

  .uploadAttachments {
    margin: 10px 0 30px 0;
  }

  .uploadAttachments table {
    width: 100%;
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-color: #999999;
    border-collapse: collapse;
    text-align: center;
  }

  .uploadAttachments table th {
    background: #E2E2ED;
    border: 0.5px solid #DDDDDD;
    color:#67649F;

  }
  .uploadAttachments table th span{

  }
  .uploadAttachments table th {
    width: 15%;
  }

  .uploadAttachments table th:nth-of-type(1) {
    line-height: 10px;
    width: 55%;
    white-space: nowrap;
  }

  .uploadAttachments table tr {
    line-height: 1px;
  }

  .uploadAttachments table .hang {
    line-height: 30px;
  }

  .uploadAttachments table tr td {
    width: 140px;
  }
  .uploadAttachments table tr th:nth-of-type(1) {
    text-align: left;
    padding-left: 15px;
  }
  .uploadAttachments table tr td:nth-of-type(1) {
    line-height: 10px;
    width: 400px;
    white-space: nowrap;
    text-align: left;
  }

  .uploadAttachments table td {
    border: 0.5px solid #DDDDDD;
    padding: 8px;
    background-color: #ffffff;
  }

  /*上传附件*/
  .theSurPlanning-body .imageManagement tabs el-tabs el-tabs--border-card {
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0), 0 0 0px 0 rgba(0, 0, 0, 0);
    border: none;
  }

  .theSurPlanning-body .imageManagement .tabs .el-tab-pane {
    height: 300px;
  }

  .theSurPlanning-body .imageManagement .form .proPhoto .el-button--primary {
    background-color: #67649F;
    border-color: #67649F;
    margin-bottom: 10px;
  }

  .theSurPlanning-body .imageManagement .form .proPhoto .el-tabs__content {
    height: 100%;
    width: 100%;
    padding: 0;
  }

  .theSurPlanning-body .detailInformation {
    /*height: 1500px;*/
  }

  /*市政条件*/
  .theSurPlanning-body .detailInformation .form .textInput {
    /*height: 100%;*/
    margin-top: 15px;
  }

  .theSurPlanning-body  .el-textarea__inner {
    height: 90px;
    resize:none
  }

  .theSurPlanning-body .detailInformation .form .municipalConditions .railTraffic {
    margin: 15px 0 0px 0;
    height: 285px;
  }

  /*调整样式*/
  .theSurPlanning-body .detailInformation .form .municipalConditions .railTraffic .el-form-item__label {
    width: 180px !important;
  }

  .theSurPlanning-body .detailInformation .form .municipalConditions .railTraffic .el-form-item__content {
    margin-left: 180px !important;
  }

  /*调整样式*/

  .theSurPlanning-body .detailInformation .form .municipalConditions .railTraffic .el-form-item {
    margin-top: 15px;
  }

  .theSurPlanning-body .detailInformation .form .municipalConditions .municipalConditionsBody {
    margin-top: 38px;
  }

  .theSurPlanning-body .detailInformation .form .municipalConditions .municipalConditionsBody .el-form-item {
    margin-bottom: 25px;
  }

  .theSurPlanning-body .detailInformation .form .municipalConditions .municipalConditionsBody .title p span {
    color: #67649F;
  }

  .theSurPlanning-body .detailInformation .form .projectStrategy {
    height: 600px;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .el-form-item {
    margin-bottom: 25px;
  }

  /*调整样式*/
  .theSurPlanning-body .detailInformation .form .landPlan .landPlan01 .el-form-item__label {
    width: 120px !important;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .landPlan01 .el-form-item__content {
    margin-left: 120px !important;
  }

  /*调整样式*/
  .theSurPlanning-body .detailInformation .form .landPlan .landPlanSection01 {
    margin-top: 10px;
    margin-bottom: 20px;
    height: 50px;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .meterCapacitance .meterCapacitanceInfo {
    border: 1px solid #EDEDED;
    border-radius: 4px;
    height: 500px;
    margin-bottom: 20px;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .meterCapacitance .meterCapacitanceInfo .meterCapacitanceInfoTitle {
    height: 40px;
    background: #E2E2ED;
    border-radius: 4px 4px 0 0;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .meterCapacitance .meterCapacitanceInfo .meterCapacitanceInfoBody {
    padding: 10px 20px 0 0;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .meterCapacitance .meterCapacitance01 {
    margin-bottom: 16px;
    height: 50px;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .meterCapacitance .meterCapacitance02 {
    margin-bottom: 16px;
    height: 100px;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .meterCapacitance02 {
    margin-bottom: 16px;
    height: 100%;
  }

  /*调整样式*/
  .theSurPlanning-body .detailInformation .form .landPlan .groundPlansBuildHouse .el-form-item__label {
    width: 140px !important;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .groundPlansBuildHous .el-form-item__content {
    margin-left: 140px !important;
  }

  /*调整样式*/

  .theSurPlanning-body .detailInformation .form .meterCapacitance02Info {
    margin-top: 20px;
  }

  .theSurPlanning-body .detailInformation .form .meterCapacitance02Info .meterCapacitance02InfoTitle {
    height: 40px;
    background: #E2E2ED;
    border-radius: 4px 4px 0 0;
  }

  .theSurPlanning-body .detailInformation .form .meterCapacitance02Info .meterCapacitance02InfoBody {
    padding: 10px 20px 0 0;
    height: 200px;
    border: 1px solid #EDEDED;
    border-radius: 4px;
  }


  .theSurPlanning-body .detailInformation .form .landPlan .residential {
    width: 100%;
  }
  .theSurPlanning-body .detailInformation .form .landPlan .residential  .check .el-input{

  }
  .theSurPlanning-body .detailInformation .form .landPlan .residential table {
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-color: #999999;
    border-collapse: collapse;
    text-align: center;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .residential table p {
    height: 90px;
    line-height: 112px;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .residential table input {
    width: 100%;
  }
  .theSurPlanning-body .detailInformation .form .landPlan .residential table .down .el-radio-button__inner{
     border-left: 1px solid #bfcbd9;
    border-radius: 4px 0 0 4px;
    box-shadow: none!important;
  }/*修改element ui 样式*/
  .theSurPlanning-body .detailInformation .form .landPlan .residential tr {
    width: 100%;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .residential th {
    background-color: #dedede;
    border: 0.5px solid #DDDDDD;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .residential td {
    border: 0.5px solid #DDDDDD;
    background-color: #ffffff;
    padding: 0 5px 0 5px;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .residential table tr td:nth-of-type(1) {
  }

  .theSurPlanning-body .detailInformation .form .landPlan .paidForFree {
    position: relative;
    display: inline-block;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .paidForFree .up {
    position: absolute;
    left: -100px;
    top: -25px;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .paidForFree .down {
    position: absolute;
    left: -100px;
    bottom: -25px;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .limitPrice {
    position: relative;
    display: inline-block;

  }

  .theSurPlanning-body .detailInformation .form .landPlan .limitPrice .up {
    position: absolute;
    left: -33px;
    top: -25px;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .limitPrice .down {
    position: absolute;
    left: -33px;
    bottom: -25px;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .distancePlace {
    position: relative;
    display: inline-block;

  }

  .theSurPlanning-body .detailInformation .form .landPlan .distancePlace .up {
    position: absolute;
    right: -110px;
    top: -25px;
  }

  .theSurPlanning-body .detailInformation .form .landPlan .distancePlace .down {
    position: absolute;
    right: -110px;
    bottom: -25px;
  }

  .theSurPlanning-body .detailInformation .form .groundSituation {
    margin-top: 20px;
  }

  .theSurPlanning-body .detailInformation .form .groundSituation .el-form-item__label {
    width: 100px !important;

  }

  .theSurPlanning-body .detailInformation .form .groundSituation .el-form-item__content {
    margin-left: 100px !important;

  }

  .theSurPlanning-body .detailInformation .form .inputLength .el-select {
    width: 100% !important;
  }

  /*风险影响*/
  .theSurPlanning-body .detailInformation .form .riskImpact {
    clear: both;
  }

  .theSurPlanning-body .riskImpact .btn {
    background-color: #67649F;
    border-color: #67649F;
    line-height: 1;
    cursor: pointer;
    padding: 10px 15px 10px 5px;
    border-radius: 4px;
    position: relative;
  }

  .theSurPlanning-body .riskImpact .btn:before {
    content: "";
    background: url('../../assets/images/add.png') no-repeat;
    background-size: 14px 14px;
    text-align: center;
    color: #fff;
    float: left;
    border-radius: 25px;
    display: block;
    width: 14px;
    height: 14px;
    margin-right: 2px;
  }

  .theSurPlanning-body .detailInformation .form .riskImpact .countAndDelete span:nth-of-type(1) {
    float: left;
  }

  .theSurPlanning-body .detailInformation .form .riskImpact .countAndDelete span:nth-of-type(2) {
    float: right;
    padding-right: 20px;
  }

  .theSurPlanning-body .detailInformation .form .riskImpact .countAndDelete {
    height: 40px;
    background: #E2E2ED;
  }

  .theSurPlanning-body .detailInformation .form .riskImpact .uploadInfor {
    height: 450px;
    border: 1px solid #EDEDED;
    margin-bottom: 10px;
  }

  .theSurPlanning-body .detailInformation .form .riskImpact .uploadInfor {
    height: 360px;
    border: 1px solid #EDEDED;
    margin-bottom: 10px;
    padding-right: 20px;
  }

  .theSurPlanning-body .detailInformation .form .riskImpact .uploadInfor .uploadInfor01 {
    height: 30px;
  }

  .theSurPlanning-body .detailInformation .form .riskImpact .uploadInfor .uploadInfor02 {
    height: 60px;
  }

  .theSurPlanning-body .detailInformation .form .riskDescription {
    margin-top: 20px;
  }

  .theSurPlanning-body .detailInformation .form .riskDescription .el-textarea__inner {
    height: 90px;
  }
  /*校验提示*/
  /*.is-danger {*/
    /*border: 1px solid red;*/
    /*border-radius: 4px;*/
  /*}*/

  .help {
    width: 120%;
    position: absolute;
    line-height: 12px;
    font-size: 12px;
    color: red;
    padding: 2px 10px 0;
    left: -35px;
    bottom: -23px;
  }
  /*标题加粗*/
  .bold{
    font-weight:bold
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
