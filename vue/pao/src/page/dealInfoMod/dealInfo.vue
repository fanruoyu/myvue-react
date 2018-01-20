<template>
  <div id="dealInfo" ref="dealInfo" style="overflow-y:hidden;" v-loading="loadingA"
    element-loading-text="文件上传中,请耐心等待"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.5)">
    <div class="closeNav" ref="closeNav">
      <p class=" tit fl" title="childParm.projectName">{{childParm.projectName}}</p>
      <span class="closeButton fl" @click="close">关闭</span>
      <span class="saveButton" @click="regPrein" v-show="!bool">保存</span>
    </div>
    <div id="conMod">
      <div class="newProject">
        <el-row>
          <el-col :span="24">
            <div class="investmentAdvice-body">
              <div class="marketBidding">
                <el-col :span="24">
                  <div class="marketBidding-title">
                    <p>成交信息</p>
                    <div class="hr" style="margin-top:0px"></div>
                  </div>
                  <div class="marketBidding-body">
                    <p class="marketBidding-p">成交摘要</p>
                    <el-col :span="1">
                      <div class="grid-content "></div>
                    </el-col>
                    <el-col :span="18" style="width:100%;">
                      <div class="marketBidding-body-infor" style="clear: both">
                        <el-form status-icon ref="ruleForm2" v-model="deal_information" label-width="120px" class="demo-ruleForm form">
                          <div style="clear:both">
                            <el-col :span="12" style="height:58px;">
                              <div class="left">
                                <el-form-item label="成交状态" prop="pass">
                                  <el-col :span="17">
                                    <el-select v-model="deal_information.dealStatus" :clearable='true' :disabled="bool" placeholder="请选择" class="selectqp">
                                      <el-option v-for="item in information" :key="item.dictCode" :label="item.dictName" :value="item.dictName">
                                      </el-option>
                                    </el-select>
                                  </el-col>
                                  <el-col :span="7"></el-col>
                                </el-form-item>
                                </el-form-item>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div class="left">
                                <el-form-item label="成交日期" prop="pass">
                                  <el-col :span="17">
                                    <el-date-picker v-model="deal_information.dealDate" type="date" style="width:100%" :placeholder="nowDate"
                                       :disabled="bool">
                                    </el-date-picker>
                                  </el-col>
                                  <el-col :span="7"></el-col>
                                </el-form-item>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div class="left">
                                <el-form-item label="成交总价" prop="pass">
                                  <el-col :span="17">
                                    <el-input v-model="deal_information.dealPrice" :disabled="bool"  ref="sum"></el-input>
                                  </el-col>
                                  <el-col :span="1">
                                    <span></span>
                                  </el-col>
                                  <el-col :span="6">
                                    <span>万元</span>
                                  </el-col>
                                </el-form-item>
                                <span class="hint" v-if="!reg4.test(deal_information.dealPrice)&&deal_information.dealPrice!=''||deal_information.dealPrice>1000000">请输入0~1000,000整数或4位小数。</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div class="left">
                                <el-form-item label="成交单价" prop="pass">
                                  <el-col :span="17">
                                    <el-input v-model="deal_information.dealUnitPrice"  :disabled="bool"></el-input>
                                  </el-col>
                                  <el-col :span="1">
                                    <span></span>
                                  </el-col>
                                  <el-col :span="6">
                                    <span>万元</span>
                                  </el-col>
                                </el-form-item>
                                <span class="hintA" v-if="!reg4.test(deal_information.dealUnitPrice)&&deal_information.dealUnitPrice!=''||deal_information.dealUnitPrice>1000000||parseFloat(deal_information.dealUnitPrice)>=parseFloat(deal_information.dealPrice)">请输入0~1000,000整数或4位小数且不能大于成交总价。</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div class="left">
                                <el-form-item label="经营性楼面价" prop="pass">
                                  <el-col :span="17">
                                    <el-input v-model="deal_information.businessFloorPrice" :disabled="bool" ></el-input>
                                  </el-col>
                                  <el-col :span="1">
                                    <span></span>
                                  </el-col>
                                  <el-col :span="6">
                                    <span>元/平米</span>
                                  </el-col>
                                </el-form-item>
                                <span class="hint" v-if="!reg.test(deal_information.businessFloorPrice)&&deal_information.businessFloorPrice!=''||deal_information.businessFloorPrice>1000000">请输入0~1000,000整数。</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div class="left">
                                <el-form-item label="规划货值" prop="pass">
                                  <el-col :span="17">
                                    <el-input v-model="deal_information.planningValue"  :disabled="bool"></el-input>
                                  </el-col>
                                  <el-col :span="1">
                                    <span></span>
                                  </el-col>
                                  <el-col :span="6">
                                    <span>万元</span>
                                  </el-col>
                                </el-form-item>
                                <span class="hint" v-if="!reg4.test(deal_information.planningValue)&&deal_information.planningValue!=''||deal_information.planningValue>1000000">请输入0~1000,000整数或4位小数。</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div class="left">
                                <el-form-item label="权益比例(%)" prop="pass">
                                  <el-col :span="17">
                                    <el-input v-model="deal_information.powProportionate"  :disabled="bool"></el-input>
                                  </el-col>
                                  <el-col :span="7">
                                    <span></span>
                                  </el-col>
                                </el-form-item>
                                <span class="hint" v-if="!reg2.test(deal_information.powProportionate)&&deal_information.powProportionate!=''||deal_information.powProportionate>100">请输入0~100整数或2位小数。</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div class="left">
                                <el-form-item label="权益后土地款" prop="pass">
                                  <el-col :span="17">
                                    <el-input v-model="deal_information.afterRightLandPrice"  :disabled="bool"></el-input>
                                  </el-col>
                                  <el-col :span="1">
                                    <span></span>
                                  </el-col>
                                  <el-col :span="6">
                                    <span>万元</span>
                                  </el-col>
                                </el-form-item>
                                <span class="hint" v-if="!reg4.test(deal_information.afterRightLandPrice)&&deal_information.afterRightLandPrice!=''||deal_information.afterRightLandPrice>1000000">请输入0~1000,000整数或4位小数。</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div class="left">
                                <el-form-item label="权益后货值" prop="pass">
                                  <el-col :span="17">
                                    <el-input v-model="deal_information.afterRightValue"  :disabled="bool"></el-input>
                                  </el-col>
                                  <el-col :span="1">
                                    <span></span>
                                  </el-col>
                                  <el-col :span="6">
                                    <span>万元</span>
                                  </el-col>
                                </el-form-item>
                                <span class="hint" v-if="!reg4.test(deal_information.afterRightValue)&&deal_information.afterRightValue!=''||deal_information.afterRightValue>1000000">请输入0~1000,000整数或4位小数。</span>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div class="left">
                                <el-form-item label="操盘并表情况" prop="pass">
                                  <el-col :span="17">
                                    <el-select v-model="deal_information.tradersAndTable" :clearable='true' placeholder="请选择" :disabled="bool" class="selectqp">
                                      <el-option v-for="item in tradersAndTable" :key="item.dictCode" :label="item.dictName" :value="item.dictName">
                                      </el-option>
                                    </el-select>
                                  </el-col>
                                  <el-col :span="7"></el-col>
                                </el-form-item>
                              </div>
                            </el-col>
                            <el-col :span="24">
                              <div class="left" style="margin-top:15px;position:relative">
                                <el-form-item label="操盘方" prop="pass" style="padding-right:2%;">
                                  <el-col :span="21">
                                    <textarea name="" v-model='deal_information.dealRunParty' :disabled="bool" maxlength="64"
                                      class="decision" style="width:100%;" placeholder="请输入"  ></textarea>
                                  </el-col>
                                  <span class="statisticss">{{deal_information.dealRunParty.length}}/64</span>
                                  <el-col :span="3"></el-col>
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
            </div>
            <div class="investmentAdvice-body">
              <div class="marketBidding">
                <el-col :span="24">
                  <div class="marketBidding-title">
                    <div class='hr'></div>
                  </div>

                </el-col>
              </div>
            </div>
          </el-col>

        </el-row>
      </div>
      <div class="auction">
        <p>招拍挂</p>
        <el-row>
          <el-col :span="12">
            <div class="left" style="height:50px;margin-top:30px;">
              <el-col :span="3">
                <span></span>
              </el-col>
              <el-col :span="5">
                <span class="left-lable">溢价率(%)</span>
              </el-col>
              <el-col :span="12">
                <el-input v-model="deal_information.premiumRate"  :disabled="bool"></el-input>
              </el-col>
              <span class="hvnt" v-if="!reg2.test(deal_information.premiumRate)&&deal_information.premiumRate!=''||deal_information.premiumRate>100">请输入0~100整数或2位小数。</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="newAdd">
        <span class="newAdd-span">各业态信息</span>
        <span class="newAdd-seco" @click="addModule" v-show="!bool">+添加</span>
      </div>

      <div class="new-add" ref="getNewAdd" v-for="(item,index) in deal_information.businessesInfo">
        <div class="newAdd-two">
          <span class="newAdd-thrie">{{(deal_information.businessesInfo.length-index)
            <10? '0'+(deal_information.businessesInfo.length-index):(deal_information.businessesInfo.length-index)}}</span>
              <span class="newAdd-fore" @click="DelModule(deal_information.businessesInfo.length-1-index)" v-show="!bool">删除</span>
        </div>
        <div>
          <el-row style="position:relative">
            <el-col :span="12" style="margin-top:20px;">
              <el-col :span="4">
                <span></span>
              </el-col>
              <el-col :span="4">
                <span>业态</span>
              </el-col>
              <el-col :span="12">
                <el-select v-model="deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].runningType" :clearable='true' :disabled="bool" placeholder="请选择" class="selectqp">
                  <el-option v-for="item in activities" :key="item.value" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
                </el-input>
              </el-col>
              <el-col :span="4">
                <span></span>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" style="margin-top:20px;">
              <el-col :span="4">
                <span></span>
              </el-col>
              <el-col :span="4">
                <span>持有面积</span>
              </el-col>
              <el-col :span="12">
                <el-input v-model="deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].holdArea"  :disabled="bool" ref="holdArea">386000</el-input>
              </el-col>
              <el-col :span="1">
                <span></span>
              </el-col>
              <el-col :span="3">
                <span>平米</span>
              </el-col>
            </el-col>
            <span class="hont" v-if="!reg2.test(deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].holdArea)&&deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].holdArea!=''||deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].holdArea>1000000">请输入0~1000,000整数或两位小数</span>
            <el-col :span="12" style="margin-top:20px;">
              <el-col :span="4">
                <span></span>
              </el-col>
              <el-col :span="4">
                <span>持有年限</span>
              </el-col>
              <el-col :span="12">
                <el-input v-model="deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].holdTimes" :disabled="bool" ref="holdTimes"></el-input>
              </el-col>
              <el-col :span="1">
                <span></span>
              </el-col>
              <el-col :span="3">
                <span>年</span>
              </el-col>
            </el-col>
            <span class="hbnt" v-if="!reg.test(deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].holdTimes)&&deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].holdTimes!=''||deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].holdTimes>100">请输入0~100整数。</span>
          </el-row>
          <el-row>
            <el-col :span="12" style="margin-top:20px;">
              <el-col :span="4">
                <span></span>
              </el-col>
              <el-col :span="4">
                <span>限价</span>
              </el-col>
              <el-col :span="12">
                <el-input v-model="deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].limitPrice"  :disabled="bool" ref="limitPrice">386000</el-input>
              </el-col>
              <el-col :span="1">
                <span></span>
              </el-col>
              <el-col :span="3">
                <span>万元</span>
              </el-col>
            </el-col>
            <span class="hont" v-if="!reg4.test(deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].limitPrice)&&deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].limitPrice!=''">请输入整数或四位小数。</span>
            <el-col :span="12" style="margin-top:20px;">
              <el-col :span="4">
                <span></span>
              </el-col>
              <el-col :span="4">
                <span>限价面积</span>
              </el-col>
              <el-col :span="12">
                <el-input v-model="deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].limitPriceArea" :disabled="bool"  ref="limitPriceArea">386000</el-input>
              </el-col>
              <el-col :span="1">
                <span></span>
              </el-col>
              <el-col :span="3">
                <span>平米</span>
              </el-col>
            </el-col>
            <span class="hbnt" v-if="!reg2.test(deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].limitPriceArea)&&deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].limitPriceArea!=''||deal_information.businessesInfo[deal_information.businessesInfo.length-1-index].limitPriceArea>1000000">请输入0~1000,000整数或两位小数。</span>
          </el-row>
        </div>
      </div>

      <div class="input-big">
        <p class="textName">其他限制因素</p>
        <div class="textareaBox">
          <textarea name="" v-model='deal_information.otherRestrictiveFactors'  :disabled="bool"  maxlength="140" ref="astrictText" class="decision"
            placeholder="请输入"></textarea>
          <span class="statistics">{{deal_information.otherRestrictiveFactors.length}}/140</span>
         
        </div>
      </div>
      <div class="input-big">
        <p class="textName">竞得企业</p>
        <div class="textareaBox">
          <textarea name="" v-model='deal_information.bidGainEnterprise' :disabled="bool"  maxlength="64"  ref="enterpriseText" class="decision"
            placeholder="请输入"></textarea>
          <span class="statistics">{{deal_information.bidGainEnterprise.length}}/64</span>
         
        </div>
      </div>
      <div class="input-big">
        <p class="textName">其他参与竞买企业</p>
        <div class="textareaBox">
          <textarea name="" v-model='deal_information.otherEnterprise' :disabled="bool" maxlength="140"  ref="otherText" class="decision"
            placeholder="请输入"></textarea>
          <span class="statistics">{{deal_information.otherEnterprise.length}}/140</span>
         
        </div>
      </div>
      <div class="hr" style="margin-top:30px;"></div>
      <p class="marketBidding-p">收并购</p>
      <div class="input-big" style="margin-top:10px;">
        <p class="textName">竞得企业</p>
        <div class="textareaBox">
          <textarea name="" v-model='deal_information.mergerGainEnterprise' :disabled="bool"  maxlength="64" ref="purchaseText" class="decision"
            placeholder="请输入"></textarea>
          <span class="statistics">{{deal_information.mergerGainEnterprise.length}}/64</span>
         
        </div>
      </div>
      <div class="input-big">
        <p class="textName">票据情况</p>
        <div class="textareaBox">
          <textarea name="" v-model='deal_information.billState' maxlength="140"  :disabled="bool" ref="billText" class="decision" placeholder="请输入"></textarea>
          <span class="statistics">{{deal_information.billState.length}}/140</span>
         
        </div>
      </div>
      <div class="footer-gark">
        <div class="input-big">
          <p class="textName">对价情况</p>
          <div class="textareaBox">
            <textarea name="" type="textarea" rows="2" autocomplete="off" v-model='deal_information.considerationState' :disabled="bool" maxlength="140" ref="considerationText"
              class="decision" placeholder="请输入" validateevent="true" style="min-height: 33px;"></textarea>
            <span class="statistics">{{deal_information.considerationState.length}}/140</span>
           
          </div>
        </div>
        <div class="input-big" style="position:relative">
          <p class="textNameA">交易架构</p>
          <div class="textareaBos">
            <textarea name="" v-model='deal_information.dealStructure' :disabled="bool"   maxlength="140" ref="structure" class="decision"
              placeholder="请输入"></textarea>
            <span class="statistics outSpan">{{deal_information.dealStructure.length}}/140</span>
   
          </div>
        </div>
        <div style="clear:both"></div>
        <div class="everyInputBos">
          <span class="nameText width9">交易类别</span>
          <el-select v-model="deal_information.dealType" :clearable='true' :disabled="bool" placeholder="请选择" class="selectOp">
            <el-option v-for="item in dealType" :key="item.dictCode" style="width:100%" :label="item.dictName" :value="item.dictName">
            </el-option>
          </el-select>
        
        </div>
        <div class="everyInputBos">
          <span class="nameText width9">合同签订时间</span>
          <el-date-picker v-model="deal_information.contractSigningDate" type="date" style="width:50%" :placeholder="nowDate" 
            :disabled="bool">
          </el-date-picker>
        </div>
        <div class="everyInputBos">
          <span class="nameText width9">转股时间</span>
          <el-date-picker v-model="deal_information.turnedStockDate" type="date" style="width:50%" :placeholder="nowDate" 
            :disabled="bool">
          </el-date-picker>
        </div>
        <div class="hr"></div>

        <div class="widte-table">
          <span>相关附件</span>
          <el-upload style="width:100px;float:right;" :action='url'
            :on-remove="handleRemoveA" multiple :limit="1" :disabled="childParm.modAuth!=2" :data="fileData5" :headers="headers"
            :show-file-list='false' :on-error="setError" :before-upload="beforeAvatarUpload" :on-success="successDealAnnunciate" :on-progress="upLoad">
            <button size="small" class="clickUp" type="primary" v-show="!bool">+点击上传</button>
          </el-upload>
        </div>
      </div>
      <table class="tableBox">
        <tr style="height:40px;">
          <th class="width1">成交通告</th>
          <th class="width2">文件大小</th>
          <th class="width2">权限</th>
          <th class="width2">操作</th>
        </tr>
        <tr v-for="(item,index) in deal_information.dealAnnunciate">
          <td>
            <a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a>
          </td>
          <td>{{item.fileSize}}</td>
          <td>
            <el-select :disabled="childParm.modAuth!=2" v-model="item.isPrivate" class="selectO" placeholder="请选择">
              <el-option v-for="item in accessory" :key="item.dictName" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
          </td>
          <td v-if="childParm.modAuth!=2">删除</td>
          <td @click="handleRemoveA(index)" v-show="!bool">删除</td>
        </tr>
      </table>

      <div class="widte-table">
        <el-upload style="width:100px;float:right;" :action='url'
          :on-remove="handleRemoveB" multiple :limit="1" :disabled="childParm.modAuth!=2" :data="fileData5" :headers="headers"
          :show-file-list='false' :on-error="setError" :before-upload="beforeAvatarUpload" :on-success="successAgreementAddendum" :on-progress="upLoad">
          <button size="small" class="clickUpa" type="primary" v-show="!bool" >+点击上传</button>
        </el-upload>
      </div>
      <table class="tableBox">
        <tr style="height:40px;">
          <th class="width1">协议附件</th>
          <th class="width2">文件大小</th>
          <th class="width2">权限</th>
          <th class="width2">操作</th>
        </tr>
        <tr v-for="(item,index) in deal_information.agreementAddendum">
          <td>
            <a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a>
          </td>
          <td>{{item.fileSize}}</td>
          <td>
            <el-select :disabled="childParm.modAuth!=2" v-model="item.isPrivate" class="selectO" placeholder="请选择">
              <el-option v-for="item in accessory" :key="item.dictName" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
          </td>
          <td v-if="childParm.modAuth!=2">删除</td>
          <td @click="handleRemoveB(index)" v-show="!bool">删除</td>
        </tr>
        <tr>
          <td style="border-right:none">
            <span class="tb-span">协议审批链接</span>
            <input  class="xielink" v-model="deal_information.agreementApprovalLink" :disabled="bool">
          </td>
          <td colspan="3" style="border-left:none"></td>
        </tr>
        <tr>
          <td style="border:none">
            <span>&nbsp;</span>
            <span class="caution" v-if="!reg5.test(deal_information.agreementApprovalLink.replace( /^\s*/, ''))&& deal_information.agreementApprovalLink!==''">请输入正确的协议审批链接</span>
          </td>
        </tr>
      </table>
      <div>
      </div>
      <div class="widte-table">
        <el-upload style="width:100px;float:right;" :action='url'
          :on-remove="handleRemoveC" multiple :limit="1" :disabled="childParm.modAuth!=2" :data="fileData5" :headers="headers"
          :show-file-list='false' :on-error="setError" :before-upload="beforeAvatarUpload" :on-success="successRelatedBill" :on-progress="upLoad">
          <button size="small" class="clickUpa" type="primary" v-show="!bool">+点击上传</button>
        </el-upload>
      </div>
      <table class="tableBox">
        <tr style="height:40px;">
          <th class="width1">相关票据</th>
          <th class="width2">文件大小</th>
          <th class="width2">权限</th>
          <th class="width2">操作</th>
        </tr>
        <tr v-for="(item,index) in deal_information.relatedBill">
          <td>
            <a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a>
          </td>
          <td>{{item.fileSize}}</td>
          <td>
            <el-select :disabled="childParm.modAuth!=2" v-model="item.isPrivate" class="selectO" placeholder="请选择">
              <el-option v-for="item in accessory" :key="item.dictName" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
          </td>
          <td v-if="childParm.modAuth!=2">删除</td>
          <td @click="handleRemoveC(index)" v-show="!bool">删除</td>
        </tr>
      </table>
      <div class="widte-table">
        <el-upload style="width:100px;float:right;" :action='url'
          :on-remove="handleRemoveD" multiple :limit="1" :disabled="childParm.modAuth!=2" :data="fileData5" :headers="headers"
          :show-file-list='false' :on-error="setError" :before-upload="beforeAvatarUpload" :on-success="successOtherState" :on-progress="upLoad">
          <button size="small" class="clickUpa" type="primary" v-show="!bool">+点击上传</button>
        </el-upload>
      </div>
      <table class="tableBox" style="margin-bottom:100px;">
        <tr style="height:40px;">
          <th class="width1">其他说明</th>
          <th class="width2">文件大小</th>
          <th class="width2">权限</th>
          <th class="width2">操作</th>
        </tr>
        <tr v-for="(item,index) in deal_information.otherState">
          <td>
            <a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a>
          </td>
          <td>{{item.fileSize}}</td>
          <td>
            <el-select :disabled="childParm.modAuth!=2" v-model="item.isPrivate" class="selectO" placeholder="请选择">
              <el-option v-for="item in accessory" :key="item.dictName" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
          </td>
          <td v-if="childParm.modAuth!=2">删除</td>
          <td @click="handleRemoveD(index)" v-show="!bool">删除</td>
        </tr>
      </table>
    </div>
    <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
   
  </div>
  </div>
</template>
<script>
  export default {
    name: 'dealInfo',
    data() {
      return {
        accessory: [{
          dictCode: 0,
          dictName: '私密'
        }, {
          dictCode: 1,
          dictName: '公开'
        }],
        activities: [{
          value: '选项1',
          label: '洋房'
        }, {
          value: '选项2',
          label: '高层'
        }],
        headers: {
          platform: 'pc',
          token: localStorage.getItem('token'),
          version: '1'
        },
        fileData5: {
          file: '',
          projectId: ''
        },
        dealType: "", //交易类别
        dealStatus: "", //成交状态
        tradersAndTable: "", //操盘并表情况
        bool: '',
        loadingA: false, //加载中图显
        fullscreenLoading: false,
        dialogVisible: false,
        nowDate: '', //当前日期
        // modelValue:'false',
        // tableValue:'false',
        // textValue:'false',
        fileList: [],
        value: '',
        value1: '',
        url: this.$baseUrl+'longcity/services/v1/upload/single',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        genre: '', //文件展示类型
        //  informationvalue:'',        //项目信息1
        dealTypevalue: '',
        hintIsShow: false, // 提示消息显示隐藏
        hintMessage: '', // 提示消息
        information:'',
        deal_information: {
          dealStatus: '', //项目信息
          afterRightLandPrice: '', //权益后土地款
          afterRightValue: '', //权益后货值
          dealDate: '', //成交日期
          dealPrice: '', //成交总价
          dealUnitPrice: '', //成交单价
          businessFloorPrice: '', //经营性楼面价
          planningValue: '', //规划货值
          powProportionate: '', //权益比例
          dealRunParty: '', //操盘方
          premiumRate: '', //溢价率
          runningType: '', //业态
          holdArea: '', //持有面积
          holdTimes: '', //持有年限
          limitPrice: '', //限价
          limitPriceArea: '', //限价面积
          tradersAndTable: '', //操盘并表情况
          otherRestrictiveFactors: '', //其他限制因素
          bidGainEnterprise: '', //竞得企业
          otherEnterprise: '', //其他参与竞买企业
          mergerGainEnterprise: '', //竞得企业
          billState: '', //票据情况
          considerationState: '', //对价情况
          dealStructure: '', //交易架构
          contractSigningDate: '', //合同签订时间
          turnedStockDate: '', //转股时间  
          businessesInfo: [], //业态信息存储
          agreementAddendum: [], //协议附件
          dealAnnunciate: [], //成交通告
          relatedBill: [], //相关票据
          otherState: [], //其他说明
          agreementApprovalLink: '', //协议审批链接       
          dealType:''      //交易类别
        },
        reg4: /^(0|[1-9]\d{0,})+(\.\d{1,4})?$/, // 正则校验 :正整数,保留4位小数
        reg6: /^(0|[1-9]\d{0,})+(\.\d{0,})?$/, // 正则校验 :正整数,保留n位小数
        reg2: /^(0|[1-9]\d{0,})+(\.\d{1,2})?$/, // 正则校验 :正整数,保留2位小数
        reg: /^[0-9]*$/, // 正则校验 :正整数
        reg3: /^[\u4E00-\u9FA5]{0,140}$/, //中文验证
        //reg5: /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/,
        reg5: /^[a-zA-z]+:\/\/[^\s]*/,


        projectId: '',
        nameList: [],
        M: 100,
        isDisplayModel: true, // 附件上传遮罩层
        blocl: false //bool 变量
      }
    },
    
    mounted: function () {

      // this.post();
      this.getList();
      this.myDate();
      if (this.childParm.modAuth == 1) {
        this.bool = true;
      } else if (this.childParm.modAuth == 2) {
        this.bool = false;
      }

    //  this.setConHeight();
       },
      updated(){
       this.setConHeight();
      },
    props: {
      childParm: Object
    },
    methods: {
      /*
       ** id: 项目id号
       ** modAuth: 0|1|2 (0没权限，1只可读，2可读可写)
       */
      run(fun, parm) {
        if (fun == 'getId') {
          this.fileData5.projectId = parm
          this.projectId = parm
          this.cityCode = this.childParm.cityCode
          // 传递项目id;调用加载页面数据
            this.post()
          // 调用数据字典函数
         // this.getList()
        }
      },
      //关闭
      close() {
        var that = this;
        this.cancelDialogue(function () {
          that.$emit('cancelThePage', 1);
        });
      },
      openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      },

      //保存项目提示
      theSaveKeep() {
        this.$message({
          showClose: true,
          message: '恭喜，项目保存成功！',
          type: 'success',
          duration: 2000,
        });
      },
      successDealAnnunciate(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.deal_information.dealAnnunciate.push(response.result[i])
        }
          this.isDisplayModel = true
          this.loadingA = false
      },
      successAgreementAddendum(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.deal_information.agreementAddendum.push(response.result[i])
        }
          this.isDisplayModel = true
          this.loadingA = false
      },
      successRelatedBill(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.deal_information.relatedBill.push(response.result[i])
        }
          this.isDisplayModel = true
          this.loadingA = false
      },
      successOtherState(response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.deal_information.otherState.push(response.result[i])
        }
          this.isDisplayModel = true
          this.loadingA = false
      },
      upLoad(event, file, fileList){
          this.loadingA = true;
      },
      // beforeAvatarUpload(file) {

      //   if (file.size == 0) {
      //     this.hint('上传的是空文件')
      //     this.handleRemove(index)
      //   }

      //   if (!this.isRepeat(file)) {
      //     this.hint('文件名重复')
      //     this.handleRemove(index)
      //   } else {
      //     this.nameList.push(file.name)
      //   }
      // },
      // 附件上传前的钩子函数;判断附件名称;大小等
      beforeAvatarUpload(file) {
        var isM = file.size / 1024 / 1024
        if (isM > this.M) {
          this.hint('上传附件过大,最大为' + this.M + 'M!')
          return false
        }
        this.isDisplayModel = false
      },
      //附件文件名重复
      isRepeat(file) {
        var flag = true
        this.nameList.map((item) => {
          if (item == file.name) {
            flag = false
          }
        })
        return flag
      },
      //附件删除
      handleRemoveA(index) {
        this.deal_information.dealAnnunciate.splice(index, 1)
      },
      handleRemoveB(index) {
        this.deal_information.agreementAddendum.splice(index, 1)
      },
      handleRemoveC(index) {
        this.deal_information.relatedBill.splice(index, 1)
      },
      handleRemoveD(index) {
        this.deal_information.otherState.splice(index, 1)
      },
      //提交验证
      regPrein() {
          
        let parm = this.deal_information;
        if (!this.reg4.test(parm.dealPrice) && parm.dealPrice !== '' || parm.dealPrice > 1000000) {
          this.hint('请输入正确的成交总价数据!')
          return false
        }
        if (!this.reg4.test(parm.dealUnitPrice) && parm.dealUnitPrice !== '' || parm.dealUnitPrice > 1000000||parseFloat(parm.dealUnitPrice)>parseFloat(parm.dealPrice)) {
          this.hint('请输入正确的成交单价数据!')
          return false
        }
        if (!this.reg.test(parm.businessFloorPrice) && parm.businessFloorPrice !== '' || parm.businessFloorPrice >
          1000000) {
          this.hint('请输入正确的经营性楼面价数据!')
          return false
        }
        if (!this.reg4.test(parm.planningValue) && parm.planningValue !== '' || parm.planningValue > 1000000) {
          this.hint('请输入正确的规划货值数据!')
          return false
        }
        if (!this.reg4.test(parm.afterRightValue) && parm.afterRightValue !== '' || parm.afterRightValue > 1000000) {
          this.hint('请输入正确的权益后货值数据!')
          return false
        }
        if (!this.reg2.test(parm.powProportionate) && parm.powProportionate !== '' || parm.powProportionate > 100) {
          this.hint('请输入正确的权益比例数据!')
          return false
        }
        if (!this.reg4.test(parm.afterRightLandPrice) && parm.afterRightLandPrice !== '' || parm.afterRightLandPrice >
          1000000) {
          this.hint('请输入正确的权益后土地款数据!')
          return false
        }
        if (!this.reg2.test(parm.premiumRate) && parm.premiumRate !== '' || parm.premiumRate > 100) {
          this.hint('请输入正确的溢价率数据!')
          return false
        }
         let businessesInfo = parm.businessesInfo;
         for (let i = 0; i < businessesInfo.length; i++) {
          if (!this.reg2.test(businessesInfo[i].holdArea) && businessesInfo[i].holdArea !== '' || businessesInfo[i].holdArea >
            1000000) {
            this.hint('请输入正确的持有面积!')
            return false
          }
          if (!this.reg.test(businessesInfo[i].holdTimes) && businessesInfo[i].holdTimes !== '' || businessesInfo[i].holdTimes >
            100) {
            this.hint('请输入正确的持有年限!')
            return false
          }
          if (!this.reg4.test(businessesInfo[i].limitPrice) && businessesInfo[i].limitPrice !== '') {
            this.hint('请输入正确的限价!')
            return false
          }
          if (!this.reg2.test(businessesInfo[i].limitPriceArea) && businessesInfo[i].limitPriceArea !== '' ||
            businessesInfo[i].limitPriceArea > 1000000) {
            this.hint('请输入正确的限价面积!')
            return false
          } 
        }
         if (!this.reg5.test(parm.agreementApprovalLink.replace( /^\s*/, '')) && parm.agreementApprovalLink !== '') {
          this.hint('请输入正确的协议审批链接!')
          return false
        }else {
          this.addObject(parm)
        }
        
      },
      //添加业态信息
      addModule() {
         this.deal_information.businessesInfo.push({
          runningType: '',
          holdArea: '',
          holdTimes: '',
          limitPrice: '',
          limitPriceArea: ''
        });
        // console.log(this.deal_information.businessesInfo)
      },
      //删除业态信息
      DelModule(index) {
        this.deal_information.businessesInfo.splice(index, 1)
      },
      //接口传送数据
      addObject: function (obj) {
        let that = this;
        let time=that.deal_information.dealDate
        let timea=that.deal_information.contractSigningDate
        let timeb=that.deal_information.turnedStockDate
        if(time!=undefined&&time!=''){
          that.deal_information.dealDate=that.gmtToStr(time)
        }
        if(timea!=undefined&&timea!=''){
          //alert("timea"+timea)
          that.deal_information.contractSigningDate=that.gmtToStr(timea)
        }
        if(timeb!=undefined&&timeb!=''){
         //alert("timeb"+timeb)
          that.deal_information.turnedStockDate=that.gmtToStr(timeb)
        }
        //获取projectId
        this.projectId = this.childParm.id;
        // console.log(this.projectId)
        //过滤ID
        this.deal_information.businessesInfo = this.deal_information.businessesInfo.filter(item => {
          item.id === "" && (delete item.id)
          return true;
        });
        this.$http({
            method: 'post',
            url: '/longcity/services/v1/project/saveProjectPartially',
            data: {
              "projectId": that.projectId,
              "title": 'doneMessageEntry',
              "detail": obj
            }
          }).then(function (succeed) {
            if (succeed.data.code == 200 || succeed.data.code == "200") {
              that.saveSuccessDialogue()
              that.$emit('cancelThePage', 2);
             }else{
              that.saveError()
              that.$emit('cancelThePage', 2);
            }
          }),
          function (err) {
            console.log(err)
          }
      },
      //获取当前时间
      myDate() {
        var d = new Date();
      
       var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
     /*    var sdate = new Date(Date.parse(d.replace(/-/g,"/")));*/
        this.nowDate = str
      },
      //转换时间格式
     /*   gmtToStr(){
       let value = this.deal_information.dealDate
       this.deal_information.dealDate = value.getFullYear() + '-'+ (value.getMonth()+1) + '-' + value.getDate() + ' '+ value.getHours() + '0:'+ value.getMinutes() + '0:' + value.getSeconds()+ '0'
      },
        gmtToStrA(){
       let value = this.deal_information.contractSigningDate
       this.deal_information.contractSigningDate =value.getFullYear() + '-'+ (value.getMonth()+1) + '-' + value.getDate() + ' '+ value.getHours() + '0:'+ value.getMinutes() + '0:' + value.getSeconds()+ '0'
      },
      gmtToStrB(){
       let value = this.deal_information.turnedStockDate
       this.deal_information.turnedStockDate = value.getFullYear() + '-'+ (value.getMonth()+1) + '-' + value.getDate() + ' '+ value.getHours() + '0:'+ value.getMinutes() + '0:' + value.getSeconds()+ '0'
      }, */
      /*年月日格式转换*/
      dateFormatConversion(name,date){
          if(name=='deal_information.dealDate'){
            this.deal_information.dealDate=date + " 00:00:00";
          }
           if(name=='deal_information.contractSigningDate'){
            this.deal_information.contractSigningDate = date + " 00:00:00";
          }
           if(name=='deal_information.turnedStockDate'){
            this.deal_information.turnedStockDate = date + " 00:00:00";
          }
      },
      //接口获取数据
      post: function () {
        let that = this;
        this.projectId = this.childParm.id;
        //  console.log(this.projectId)
        this.$http({
          method: 'post',
          url: '/longcity/services/v1/project/getMenuDetail',
          data: {
            "projectId": this.projectId,
            "titleKey": ["doneMessageEntry"]
          }
        }).then(function (succeed) {
          that.deal_information = succeed.data.result.doneMessageEntry;
      
          let time = that.deal_information.dealDate
          if(time!=''){
            var sdate = new Date(Date.parse(time.replace(/-/g,"/")));
            that.deal_information.dealDate = that.strToGmt(sdate)
          }

          let timea = that.deal_information.contractSigningDate
          if(timea!=''){
          var sdatea = new Date(Date.parse(timea.replace(/-/g,"/")));
            that.deal_information.contractSigningDate = that.strToGmt(sdatea)
          }

          let timeb = that.deal_information.turnedStockDate
          if(timeb!=''){
            var sdateb = new Date(Date.parse(timeb.replace(/-/g,"/")));
            that.deal_information.turnedStockDate = that.strToGmt(sdateb)
          }
        }, function (err) {
          console.log(err);
        })
      },
      //获取下拉数据
      getList: function () {
        let that = this;
        this.$http({
          method: 'post',
          url: '/longcity/services/v1/dict/dictListByType',
          data: {
            "dictTypes": ["dealStatus", "tradersAndTable", "dealType"]
          }
        }).then(function (succeed) {
          that.information = succeed.data.result[0].items;
         // console.log(that.information)
          that.tradersAndTable = succeed.data.result[1].items;
          that.dealType = succeed.data.result[2].items;
        }, function (err) {
          console.log(err);
        })
      },
      setError(){
          this.loadingA = false;
          this.hint("文件上传失败")
      },
      //提示信息
      hint(message) {
        let that = this
        this.hintIsShow = true
        that.hintMessage = message
       
        setTimeout(function () {
          that.hintIsShow = false
        }, 2000)
         clearTimeout()
      }
    },

    //赋值
    setName() {
      //this.deal_information.tableArr = this.businessesInfo;
      this.deal_information.agreementAddendum = this.fileList;
      this.deal_information.otherRestrictiveFactors = this.$refs.astrictText.value
      //竞得企业
      this.deal_information.bidGainEnterprise = this.$refs.enterpriseText.value
      //其他参与竞买企业
      this.deal_information.otherEnterprise = this.$refs.otherText.value
      //竞得企业
      this.deal_information.mergerGainEnterprise = this.$refs.purchaseText.value
      //票据情况
      this.deal_information.billState = this.$refs.billText.value
      //对价情况
      //其他限制因素
      this.deal_information.considerationState = this.$refs.considerationText.value
      //交易架构
      this.deal_information.dealStructure = this.$refs.structure.value
    }
  }

</script>
<style scope>
  #conMod {
    width: 100%;
    overflow: auto
  }

  #dealInfo .newProject {
    width: 100%;
    margin: 0px auto;
    background-color: white;
    margin-top: -40px;
  }

  #dealInfo .newProject-title {
    background: #67649F;
    position: fixed;
    z-index: 1000;
    width: 63%;
    overflow: hidden;
  }

  #dealInfo .newProject-title p {
    color: white;
    padding: 10px;
  }

  #dealInfo .newProject-title .survey {
    height: 50px;

    clear: both;
    /*padding:0 20px 5px 20px;*/
    position: relative;
    /*border: 1px solid red;*/
  }

  #dealInfo .newProject-title .survey p {
    /*float: left;*/
    /*font-weight:bold;*/
    font-family: PingFangSC-Medium;
    font-size: 18px;
    text-align: center;
    color: #FFFFFF;
    letter-spacing: 0;
  }

  #dealInfo .newProject-title .survey .btn {
    /*float: right;*/
    position: absolute;
    right: 0;
    top: 12%;
    /*transform:translate(-50%,-50%);*/
  }

  #deal_information .btnClose {
    width: 80px;
    height: 30px;
    line-height: 30px;
    margin-right: 15px;
    text-align: center;
    border: 1px solid #fff;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }

  #dealInfo .tableBox {
    width: 92%;
    margin-left: 4%;
  }

  #dealInfo .tableBox .width1 {
    width: 61%;
    text-align: left;
    padding-left: 2%;
  }

  #dealInfo .tableBox .width2 {
    width: 13%
  }

  #dealInfo .tableBox th {
    background-color: #E2E2ED;
    color: #67649F;
    line-height: 30px;
    font-size: 14px;
  }

  #dealInfo .tableBox td {
    border: 1px solid #ddd;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
  }

  #dealInfo .tableBox tr td:nth-child(1) {
    text-align: left;
  }

  #dealInfo .downloadUrl {
    width: 100%;
    text-indent: 15px;
  }

  #dealInfo .tableBox tr td:nth-child(4) {
    cursor: pointer;
  }

  #dealInfo .auction {
    width: 92%;
    margin-left: 4%;
  }

  #dealInfo .auction p {
    font-weight: 600;
    font-size: 14px;
    color: #444444;
  }

  #dealInfo .newProject-title .survey button:nth-of-type(2) {
    margin-right: 25px;
  }

  #dealInfo .newProject-title .survey .el-button--primary {
    /*float: right;*/
    background-color: #67649F;
    border-color: #67649F;
  }
  /*栅格*/

  #dealInfo .el-col {
    border-radius: 4px;
    line-height: 38px;
  }

  #dealInfo .bg-purple-dark {
    background: #99a9bf;
  }

  #dealInfo .bg-purple {
    background: #d3dce6;
  }

  #dealInfo .bg-purple-light {
    background: #e5e9f2;
  }

  #dealInfo .selectO {
    text-align: center;
    width: 100%;
    height: 100%;
  }

  #dealInfo .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  #dealInfo .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  /*栅格结束*/

  #dealInfo .investmentAdvice-body {
    margin-top:40px;
    height: 100%;
  }

  #dealInfo .investmentAdvice-body .textInput {
    /*height: 100%;*/
    margin-top: 15px;
    height: 100%;
  }

  #dealInfo .investmentAdvice-body .marketBidding-body {
    width: 100%;
  }

  #dealInfo .investmentAdvice-body .marketBidding-body-infor {
    height: 100%;
    margin-top: 15px;
    margin-bottom: 60px;
  }

  #dealInfo .investmentAdvice-body .textInput .el-textarea__inner {
    height: 90px;
  }

  #dealInfo .marketBidding-title p {
    font-size: 18px;
    color: #444444;
    margin-left: 10px;
    height:51px;
    line-height:51px;
  }

  #dealInfo .marketBidding-p {
    font-size: 14px;
    color: #444444;
    margin-left: 30px;
  }

  #dealInfo .hr {
    width: 100%;
    height: 1px;
    border-top: 1px solid #DDDDDD;
    margin-top: 10px;
    padding-bottom: 5px;
  }

  #dealInfo .marketBing-body {
    height: 100%;
  }

  #dealInfo .el-p {
    text-align: center;
    background: #E2E2ED;
    font-size: 13px;
    color: #666666;
  }

  #dealInfo .input-big {
    width: 92%;
    margin-left: 4%;
    margin-top: 30px;
  }

  #dealInfo .textareaBox {
    position: relative;
    width: 100%;
    margin-top: 10px;
  }

  #dealInfo .decision {
    font-size: 14px;
    resize: none;
    width: 98%;
    height: 80px;
    overflow:hidden;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    background-color: #fff;
    padding: 5px 7px;
    margin-top:-10px;
    margin-bottom:-20px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }
    #dealInfo .decision:hover{
     border-color: #8391a5;
    }
    #dealInfo .decision:focus{
      outline: 0;
      border-color: #20a0ff
    }
  #dealInfo .textName{
    margin-bottom:0px;
  }
  #dealInfo .textNameA{
     margin-bottom:5px;
  }
  #dealInfo .statistics {
    position: absolute;
    right: 10px;
    bottom: 0px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #CCCCCC;
    letter-spacing: 0;
    line-height: 14px;
  }

  #dealInfo .left-lable {
    display: blocl;
    width: 100%;
    text-align: left;
    vertical-align: middle;
    float: right;
    font-size: 14px;
    color: #48576a;
    line-height: 1;
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
  }

  #dealInfo .statisticss {
    position: absolute;
    right: 12%;
    bottom: 0px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #CCCCCC;
    letter-spacing: 0;
    line-height: 14px;
  }

  #dealInfo .everyInputBos {
    width: 49%;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    margin-top: 25px;
    margin-left: 5%
  }

  .nameText {
    width: 6em;
    margin-left: 10%;
    text-align: left;
    font-size: 14px;
    coloe: #666;
  }

  .width9 {
    width: 9em;
    ;
  }

  .width12 {
    width: 13em;
  }

  #dealInfo .row-table {
    width: 92%;
    height: 40px;
    line-height: 40px;
    margin-left: 4%;
    color: #67649F;
    background: #E2E2ED;
  }

  #dealInfo .caution {

    position: relative;
    left: 23%;
    color: red;
  }
  #dealInfo .tanTip{
    height: 38px;
    width: 380px;
    border-radius: 4px;
    box-shadow: 3px 3px 3px #ddd;
    text-align: center;
    line-height: 38px;
    color: #ffffff;
    font-size: 14px;
    position: absolute;
    top: 10%;
    left: 50%;
    margin-left: -25%;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.4);
  }
  #dealInfo .row-table span {
    display: block;
    text-align: center;
  }

  #dealInfo .row-message {
    width: 92%;
    height: 40px;
    line-height: 40px;
    margin-left: 4%;
  }

  #dealInfo .row-xieyi {
    border: 1px solid #DDDDDD
  }

  #dealInfo .a {
    border: 1px solid #DDDDDD;
  }

  #dealInfo .row-message span {
    display: block;
    text-align: center;
  }

  #dealInfo .footer-marketBing {
    margin-top: 70px;
  }

  #dealInfo .margetAdd {
    width: 60px;
    height: 30px;
    text-align: center;
    display: block;
    position: absolute;
    right: 5%;
    top: 0%;
    border: 1px solid #DDDDDD
  }

  #dealInfo .margetDel {
    width: 60px;
    height: 30px;
    text-align: center;
    display: block;
    position: absolute;
    top: 0%;
    right: -7%;
    border: 1px solid #DDDDDD
  }

  #dealInfo .amargetDel {
    width: 60px;
    height: 35px;
    text-align: center;
    display: block;
    position: absolute;
    top: 0%;
    right: 5%;
    border: 1px solid #DDDDDD
  }

  #dealInfo .selectOp {
    width: 50%
  }

  #dealInfo .selectqp {
    width: 100%;
    font-size: 12px;
  }

  #dealInfo .optionOne {
    width: 78%;
    height: 40px;
    border: 1px solid #DDDDDD;
    margin-left: 5%;
  }

  #dealInfo .elcol-span {
    float: left;
    margin-left: 5%;
  }

  #dealInfo .elcol-spana {
    float: left;
    margin-left: 5%;
  }

  #dealInfo .elrowDiv {
    width: 78%;
    height: 50px;
    margin-left: 5%;
    border: 1px solid #DDDDDD;
  }

  #dealInfo .row-message select {
    border: 0;
    display: block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    padding-right: .6rem;
    background-color: #eee;
    background: transparent;
    appearance: none;
    -moz-appearance: none;
    /* Firefox */
    -webkit-appearance: none;
    /* Safari 和 Chrome */
  }

  #dealInfo .newAdd {
    width: 92%;
    height: 36px;
    margin-left: 4%;
    margin-top: 5px;
  }

  #dealInfo .newAdd .newAdd-span {
    display: block;
    float: left;
  }

  #dealInfo .newAdd .newAdd-seco {
    display: block;
    float: right;
    width: 100px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    background: #67649F;
    color: white;
    border-radius: 4px;
    cursor:pointer;
  }

  #dealInfo .new-add {
    width: 92%;
    height: 240px;
    margin-left: 4%;
    border-radius: 4px;
    border: 1px solid #DDDDDD;
    margin-top: 20px;
  }

  #dealInfo .newAdd-two {
    width: 100%;
    height: 36px;
    background: #E2E2ED;
    color: #67649F;
    line-height: 36px;
  }

  #dealInfo .newAdd-thrie {
    display: block;
    float: left;
    font-size: 20px;
    margin-left: 2%
  }

  #dealInfo .newAdd-two .newAdd-fore {
    display: block;
    float: right;
    margin-right: 2%;
    cursor:pointer;
  }

  #dealInfo .widte-table {
    width: 92%;
    margin-left: 4%;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  #dealInfo .newAdd-forea {
    display: block;
    float: right;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-right: 2%;
    background: #67649F;
    color: white;
    border-radius: 4px;
  }

  #dealInfo .sucrey {
    width: 100%;
  }

  #dealInfo .tb-span {
    margin-left: 2%;
  }

  #dealInfo .xielink {
    width: 80%;
    float:right;
    height:23px;
    margin-top:2px;
    }

  #dealInfo .tableAdd {
    width: 92%;
    margin-left: 4%;
  }

  #dealInfo .tableAdd table td {
    height: 50px;
    text-align: center;
  }

  #dealInfo .clickUp {
    float: right;
    background: #67649F;
    width: 100px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    background: #67649F;
    color: white;
    border:none;
    border-radius: 4px;
    cursor:pointer;
  }

  #dealInfo .clickUpa {
    float: right;
    background: #67649F;
    width: 100px;
    height: 36px;
    margin-top: 20px;
    text-align: center;
    line-height: 36px;
    border:none;
    color: white;
    border-radius: 4px;
    cursor:pointer;
  }

  #dealInfo .el-upload {
    width: 100%;
  }

  #dealInfo .left {
    position: relative;
    top:-30px;
  }

  #dealInfo .titleP {
    color: white;
    padding: 10px;
  }

  #dealInfo .hint {
    position: absolute;
    left: 28%;
    bottom: -17px;
    font-size: 12px;
    color: red;
    width: 60%;
    line-height: 12px;
  }
  #dealInfo .hintA {
    position: absolute;
    left: 28%;
    bottom: -23px;
    font-size: 12px;
    color: red;
    width: 60%;
    line-height: 12px;
  }
  #dealInfo .hont {
    position: absolute;
    left: 17%;
    bottom: -20px;
    font-size: 12px;
    color: red;
    width: 60%;
    line-height: 12px;
  }

  #dealInfo .hvnt {
    position: absolute;
    left: 35%;
    bottom: -15px;
    font-size: 12px;
    color: red;
    width: 100%;
    line-height: 12px;
  }

  #dealInfo .hbnt {
    position: absolute;
    right: 3%;
    bottom: -19px;
    font-size: 12px;
    color: red;
    width: 30%;
    line-height: 12px;
  }

</style>
