<template>
  <div class="clientFixed" id="clientFixed">
    <div class="closeNav">
      <p class=" tit fl" title="">{{childParm.projectName}}</p>
      <div>
        <span class="closeButton fl" @click="close">关闭</span>
        <span class="saveButton fl" @click="save" v-if="childParm.modAuth==2">保存</span>
      </div>
    </div>
    <!--底部tab切换-->
    <div class="tableListBox" id ="conMod">
      <ul class="tabNav">
        <li class="evertLabel" :class="{active:tabIndex==index}" v-for="(item,index) in navList" @click="tab(index)">{{item}}</li>
      </ul>
      <!--tab切换组件总盒子开始-->
      <div class="everyComponent">
        <!--第一个tab开始--项目定位-->
        <div class="componentBox" v-if="tabIndex==0">
          <!--每一个量价排期盒子-->
          <div class="quantityBox">
            <!--每一个量价排期的元素开始-->
            <!--v-for-->
            <div class="messageBox">
              <p class="textName">客户信息--客户来源</p>
              <div class="textareaBox">
                <textarea name="" :disabled="childParm.modAuth!=2" maxlength="300" v-model="parm.customer_channel" class="textarea" placeholder="请输入客户来源"></textarea>
                <span class="statistics">{{parm.customer_channel!=undefined&&!parm.customer_channel.length?0:parm.customer_channel.length}}/300</span>
              </div>
              <div class="special">
                <span class="business">客户信息-客户选择</span>
                <el-select :disabled="childParm.modAuth!=2" style="width:80%;float:right" v-model="parm.customer_choose" multiple placeholder="请选择">
                  <el-option
                    v-for="item in customer_choose"
                    :key="item.dictName"
                    :label="item.dictName"
                    :value="item.dictCode">
                  </el-option>
                </el-select>
              </div>
              <p class="textName">项目素质-有利因素</p>
              <div class="textareaBox">
                <textarea :disabled="childParm.modAuth!=2" maxlength="300" v-model="parm.project_quatity_advantage" class="textarea" placeholder="请输入有利因素"></textarea>
                <span class="statistics">{{parm.project_quatity_advantage==undefined?parm.project_quatity_advantage='':parm.project_quatity_advantage.length}}/300</span>
              </div>
              <p class="textName">项目素质-不利因素</p>
              <div class="textareaBox">
                <textarea :disabled="childParm.modAuth!=2" maxlength="300" v-model="parm.project_quatity_disadvantage" class="textarea" placeholder="请输入不利因素"></textarea>
                <span class="statistics">{{parm.project_quatity_disadvantage==undefined?parm.project_quatity_disadvantage='':parm.project_quatity_disadvantage.length}}/300</span>
              </div>
              <div class="special">
                <span class="business">产品定位-业态选型</span>
                <el-select :disabled="childParm.modAuth!=2" style="width:80%;float:right" v-model="parm.running_type_choose" multiple placeholder="请选择">
                  <el-option
                    v-for="item in running_type_choose"
                    :key="item.dictName"
                    :label="item.dictName"
                    :value="item.dictCode">
                  </el-option>
                </el-select>
              </div>
              <p class="textName">产品定位-产品选型</p>
              <div class="textareaBox">
                <textarea :disabled="childParm.modAuth!=2" maxlength="300" v-model="parm.product_choose" class="textarea" placeholder="请输入产品定位"></textarea>
                <span class="statistics">{{parm.product_choose==undefined?parm.product_choose='':parm.product_choose.length}}/300</span>
              </div>
              <p class="textName">产品定位-价格定位</p>
              <div class="labelNameBox">
                <div class="width50">
                  <span class="labelName labelNameWidth">限价</span>
                  <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="parm.limitPrice" placeholder="请输入">
                  <span class="hint leftPosition0" v-if="parm.limitPrice!=undefined&&!reg4.test(parm.limitPrice)&&parm.limitPrice.length>0||parm.limitPrice>1000000">请输入0~1000000的整数或4位小数。</span>
                  <span class="unit">万元</span>
                </div>
                <div class="width50">
                  <span class="textAlignWidth">正常</span>
                  <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="parm.normalPrice" placeholder="请输入">
                  <span class="hint leftPosition60" v-if="parm.normalPrice!=undefined&&!reg4.test(parm.normalPrice)&&parm.normalPrice.length>0||parm.normalPrice>1000000">请输入0~1000000的整数或4位小数。</span>
                  <span class="unit">万元</span>
                </div>
              </div>
            </div>
          </div>
        </div><!--第一个tab结束--项目定位-->

        <!--第二个tab开始--销售业态量价排期-->
        <div class="componentBox" v-else-if="tabIndex==1">
          <p class="titleComponentName">
            产品量价排期表
            <span class="addButton" @click="addElement(tabIndex,parm.QuantityPrice)"  v-if="childParm.modAuth==2">添加</span>
          </p>

          <!--每一个量价排期盒子-->
          <div class="quantityBox">
            <!--每一个量价排期的元素开始-->
            <!--v-for-->
            <div class="everyQuantity" v-for="(item,index) in parm.QuantityPrice">
              <p class="quantityTil">
                <span class="text">{{parm.QuantityPrice!=undefined&&(parm.QuantityPrice.length-index)<10?'0'+(parm.QuantityPrice.length-index):(parm.QuantityPrice.length-index)}}</span>
                <!--<span class="deleteButton" @click="delElement(index,parm.QuantityPrice)" v-if="parm.QuantityPrice!=undefined&&parm.QuantityPrice.length>1">删除</span>-->
                <span class="deleteButton" v-if="childParm.modAuth==2" @click="delElement(index,parm.QuantityPrice)">删除</span>
              </p>
              <div class="quantityContent">
                <p class="labelNameBox">
                  <span class="labelName">业态</span>
                  <el-select :disabled="childParm.modAuth!=2" v-model="item.runningType" style="width:120px;" placeholder="请选择">
                    <el-option
                      v-for="item in running_sub_type"
                      :key="item.dictName"
                      :label="item.dictName"
                      :value="item.dictCode">
                    </el-option>
                  </el-select>
                </p>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">建筑面积(不含赠送)</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.buildingArea" placeholder="请输入">
                    <span class="hint" v-if="item.buildingArea!=undefined&&!reg2.test(item.buildingArea)&&item.buildingArea!=''||item.buildingArea>1000000">请输入0~1000000的整数或2位小数。</span>
                    <span class="unit">平米</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">建面单价</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.buildingUnitPrice" placeholder="请输入">
                    <span class="hint" v-if="item.buildingUnitPrice!=undefined&&!reg4.test(item.buildingUnitPrice)&&item.buildingUnitPrice!=''||item.buildingUnitPrice>1000000">请输入0~1000000的整数或4位小数。</span>
                    <span class="unit">万元</span>
                  </div>
                </div>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">单套总价</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.totalPrice" placeholder="请输入">
                    <span class="hint" v-if="item.totalPrice!=undefined&&!reg4.test(item.totalPrice)&&item.totalPrice!=''||item.totalPrice>1000000">请输入0~1000000的整数或4位小数。</span>
                    <span class="unit">万元</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">月均销售套数</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.saleNumsMonth" placeholder="请输入">
                    <span class="hint" v-if="item.saleNumsMonth!=undefined&&!reg.test(item.saleNumsMonth)&&item.saleNumsMonth!=''||item.saleNumsMonth>1000000">请输入0~1000000的整数。</span>
                    <span class="unit">套</span>
                  </div>
                </div>
                <div class="labelNameBoxText">
                  <span class="labelName">核心竞品</span>
                  <textarea :disabled="childParm.modAuth!=2" class="textarea" v-model="item.coreCompetitionPro" placeholder="请输入" maxlength="64"></textarea>
                  <span class="statistics specialStatistics">{{item.coreCompetitionPro==undefined?item.coreCompetitionPro='':item.coreCompetitionPro.length}}/64</span>
                </div>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">单套总价</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.totalPriceCp" placeholder="请输入">
                    <span class="hint" v-if="item.totalPriceCp!=undefined&&!reg4.test(item.totalPriceCp)&&item.totalPriceCp!=''||item.totalPriceCp>1000000">请输入0~1000000的整数或4位小数。</span>
                    <span class="unit">万元</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">月均销售套数</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.saleNumsMonthCp" placeholder="请输入">
                    <span class="hint" v-if="item.saleNumsMonthCp!=undefined&&!reg.test(item.saleNumsMonthCp)&&item.saleNumsMonthCp!=''||item.saleNumsMonthCp>1000000">请输入0~1000000的整数。</span>
                    <span class="unit">套</span>
                  </div>
                </div>
              </div>
            </div><!--每一个量价排期的元素结尾-->
            <p class="textName">量价格排期说明</p>
            <div class="textareaBox">
              <textarea :disabled="childParm.modAuth!=2"  maxlength="140" v-model="parm.QuantityPriceState" class="textarea" placeholder="请输入"></textarea>
              <span class="statistics">{{parm.QuantityPriceState==undefined?parm.QuantityPriceState='':parm.QuantityPriceState.length}}/140</span>
            </div>
          </div>
        </div><!--第二个tab结束--销售业态量价排期-->

        <!--第三个tab开始--持有商业-->
        <div class="componentBox" v-else-if="tabIndex==2">
          <p class="titleComponentName">
            持有商业租金预估
            <span class="addButton" @click="addElement(tabIndex,parm.commerceRent)" v-if="childParm.modAuth==2">添加</span>
          </p>
          <!--每一个量价排期盒子-->
          <div class="quantityBox">
            <!--每一个量价排期的元素开始-->
            <!--v-for-->
            <div class="everyQuantity" v-for="(item,index) in parm.commerceRent">
              <p class="quantityTil">
                <span class="text">{{parm.commerceRent!=undefined&&(parm.commerceRent.length-index)<10?'0'+(parm.commerceRent.length-index):(parm.commerceRent.length-index)}}</span>
                <!--<span class="deleteButton" @click="delElement(index,parm.commerceRent)" v-if="parm.commerceRent!=undefined&&parm.commerceRent.length>1">删除</span>-->
                <span class="deleteButton"v-if="childParm.modAuth==2" @click="delElement(index,parm.commerceRent)">删除</span>
              </p>
              <div class="quantityContent">
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">楼层</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.storey" placeholder="请输入">
                    <span class="hint" v-if="item.storey!=undefined&&!reg.test(item.storey)&&item.storey!=''||item.storey>100">请输入0~100的整数。</span>
                    <span class="unit">层&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">主力店面积</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.anchorStoreArea" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.anchorStoreArea!=undefined&&!reg2.test(item.anchorStoreArea)&&item.anchorStoreArea!=''||item.anchorStoreArea>1000000">请输入0~1000000的整数或2位小数。</span>
                    <span class="unit">平米</span>
                  </div>
                </div>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">主力店单价</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.anchorStoreUnitprice" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.anchorStoreUnitprice!=undefined&&!reg.test(item.anchorStoreUnitprice)&&item.anchorStoreUnitprice!=''||item.anchorStoreUnitprice>1000000">请输入0~1000000的整数。</span>
                    <span class="unit">元/平米</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">次主力店面积</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.subAnchorArea" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.subAnchorArea!=undefined&&!reg2.test(item.subAnchorArea)&&item.subAnchorArea!=''||item.subAnchorArea>1000000">请输入0~1000000的整数或2位小数。</span>
                    <span class="unit">平米</span>
                  </div>
                </div>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">次主力店单价</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.subAnchorUnitprice" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.subAnchorUnitprice!=undefined&&!reg.test(item.subAnchorUnitprice)&&item.subAnchorUnitprice!=''||item.subAnchorUnitprice>1000000">请输入0~1000000的整数。</span>
                    <span class="unit">元/平米</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">零售专卖面积</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.retailSalesArea" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.retailSalesArea!=undefined&&!reg2.test(item.retailSalesArea)&&item.retailSalesArea!=''||item.retailSalesArea>1000000">请输入0~1000000的整数或2位小数。</span>
                    <span class="unit">平米</span>
                  </div>
                </div>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">零售专卖单价</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.retailSalesUnitprice" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.retailSalesUnitprice!=undefined&&!reg.test(item.retailSalesUnitprice)&&item.retailSalesUnitprice!=''||item.retailSalesUnitprice>1000000">请输入0~1000000的整数。</span>
                    <span class="unit">元/平米</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">餐饮专门面积</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.cateringArea" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.cateringArea!=undefined&&!reg2.test(item.cateringArea)&&item.cateringArea!=''||item.cateringArea>1000000">请输入0~1000000的整数或2位小数。</span>
                    <span class="unit">平米</span>
                  </div>
                </div>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">餐饮专门单价</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.cateringUnitprice"  class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.cateringUnitprice!=undefined&&!reg.test(item.cateringUnitprice)&&item.cateringUnitprice!=''||item.cateringUnitprice>1000000">请输入0~1000000的整数。</span>
                    <span class="unit">元/平米</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">娱乐面积</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.entertainmentArea"  class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.entertainmentArea!=undefined&&!reg2.test(item.entertainmentArea)&&item.entertainmentArea!=''||item.entertainmentArea>1000000">请输入0~1000000的整数或2位小数。</span>
                    <span class="unit">平米</span>
                  </div>
                </div>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">娱乐单价</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.entertainmentUnitprice" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.entertainmentUnitprice!=undefined&&!reg.test(item.entertainmentUnitprice)&&item.entertainmentUnitprice!=''||item.entertainmentUnitprice>1000000">请输入0~1000000的整数。</span>
                    <span class="unit">元/平米</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">服务家居面积</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.serviceHomeArea" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.serviceHomeArea!=undefined&&!reg2.test(item.serviceHomeArea)&&item.serviceHomeArea!=''||item.serviceHomeArea>1000000">请输入0~1000000的整数或2位小数。</span>
                    <span class="unit">平米</span>
                  </div>
                </div>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">服务家居单价</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.serviceHomeUnitprice" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.serviceHomeUnitprice!=undefined&&!reg.test(item.serviceHomeUnitprice)&&item.serviceHomeUnitprice!=''||item.serviceHomeUnitprice>1000000">请输入0~1000000的整数。</span>
                    <span class="unit">元/平米</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">楼层平均面积</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.floorAvgArea" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.floorAvgArea!=undefined&&!reg2.test(item.floorAvgArea)&&item.floorAvgArea!=''||item.floorAvgArea>1000000">请输入0~1000000的整数或2位小数。</span>
                    <span class="unit">平米</span>
                  </div>
                </div>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">楼层平均单价</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.floorAvgUnitprice" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.floorAvgUnitprice!=undefined&&!reg.test(item.floorAvgUnitprice)&&item.floorAvgUnitprice!=''||item.floorAvgUnitprice>1000000">请输入0~1000000的整数。</span>
                    <span class="unit">元/平米</span>
                  </div>
                </div>
              </div>
            </div><!--每一个量价排期的元素结尾-->
            <p class="textName">出租率（第三年）</p>
            <p class="labelNameBox position">
              <span class="labelName">平均出租率(%)</span>
              <input type="text" :disabled="childParm.modAuth!=2" class="inputs" v-model="parm.commerceLettingRate" placeholder="请输入">
              <span class="hint leftPosition0" v-if="parm.commerceLettingRate!=undefined&&!reg2.test(parm.commerceLettingRate)&&parm.commerceLettingRate!=''||parm.commerceLettingRate>100">请输入0~100的整数或2位小数。</span>
            </p>
          </div>

        </div><!--第三个tab结束--持有商业-->

        <!--第四个tab开始--持有写字楼-->
        <div class="componentBox" v-else-if="tabIndex==3">
          <p class="titleComponentName">
            持有写字楼的客户定位市场研究表格
            <span class="addButton" @click="addElement(tabIndex,parm.officePosition)" v-if="childParm.modAuth==2">添加</span>
          </p>

          <!--每一个量价排期盒子-->
          <div class="quantityBox">
            <!--每一个量价排期的元素开始-->
            <!--v-for-->
            <div class="everyQuantity" v-for="(item,index) in parm.officePosition">
              <p class="quantityTil">
                <span class="text">{{parm.officePosition!=undefined&&(parm.officePosition.length-index)<10?'0'+(parm.officePosition.length-index):(parm.officePosition.length-index)}}</span>
                <!--<span class="deleteButton" @click="delElement(index,parm.officePosition)" v-if="parm.officePosition.length>1">删除</span>-->
                <span class="deleteButton" v-if="childParm.modAuth==2" @click="delElement(index,parm.officePosition)">删除</span>
              </p>
              <div class="quantityContent">
                <p class="labelNameBox">
                  <span class="labelName">标准</span>
                  <el-select :disabled="childParm.modAuth!=2" v-model="item.standard" style="width:120px;" placeholder="请选择">
                    <el-option
                      v-for="item in standard"
                      :key="item.dictName"
                      :label="item.dictName"
                      :value="item.dictCode">
                    </el-option>
                  </el-select>
                </p>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">面积</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.buildingArea" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.buildingArea!=undefined&&!reg2.test(item.buildingArea)&&item.buildingArea!=''||item.buildingArea>1000000">请输入0~1000000的整数或2位小数。</span>
                    <span class="unit">平米</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">实际租金</span>
                    <input type="text" :disabled="childParm.modAuth!=2" v-model="item.actualRent" class="inputs" placeholder="请输入">
                    <span class="hint" v-if="item.actualRent!=undefined&&!reg4.test(item.actualRent)&&item.actualRent!=''||item.actualRent>1000000">请输入0~1000000的整数或4位小数。</span>
                    <span class="unit">万元</span>
                  </div>
                </div>
              </div>
            </div><!--每一个量价排期的元素结尾-->
          </div>
          <p class="textName">出租率（第三年）</p>
          <p class="labelNameBox position">
            <span class="labelName">平均出租率(%)</span>
            <input type="text" :disabled="childParm.modAuth!=2" v-model="parm.officeLettingRate" class="inputs" placeholder="请输入">
            <span class="hint leftPosition0" v-if="parm.officeLettingRate!=undefined&&!reg2.test(parm.officeLettingRate)&&parm.officeLettingRate!=''||parm.officeLettingRate>100">请输入0~100的整数或2位小数。</span>
          </p>
        </div><!--第四个tab结束--持有写字楼-->

        <!--第五个tab开始--持有公寓-->
        <div class="componentBox" v-else-if="tabIndex==4">
          <p class="titleComponentName">
            持有公寓产品定位说明
            <span class="addButton" @click="addElement(tabIndex,parm.apartmentPosition)" v-if="childParm.modAuth==2">添加</span>
          </p>
          <!--每一个量价排期盒子-->
          <div class="quantityBox">
            <!--每一个量价排期的元素开始-->
            <!--v-for-->
            <div class="everyQuantity" v-for="(item,index) in parm.apartmentPosition">
              <p class="quantityTil">
                <span class="text">{{parm.apartmentPosition!=undefined&&(parm.apartmentPosition.length-index)<10?'0'+(parm.apartmentPosition.length-index):(parm.apartmentPosition.length-index)}}</span>
                <!--<span class="deleteButton" @click="delElement(index,parm.apartmentPosition)" v-if="parm.apartmentPosition!=undefined&&parm.apartmentPosition.length>1">删除</span>-->
                <span class="deleteButton" v-if="childParm.modAuth==2" @click="delElement(index,parm.apartmentPosition)">删除</span>
              </p>
              <div class="quantityContent">
                <p class="labelNameBox">
                  <span class="labelName">产品类型</span>
                  <el-select :disabled="childParm.modAuth!=2" v-model="item.productType" style="width:70%;" placeholder="请选择">
                    <el-option
                      v-for="item in product_positioning"
                      :key="item.dictName"
                      :label="item.dictName"
                      :value="item.dictCode">
                    </el-option>
                  </el-select>
                </p>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">建议房间数</span>
                    <input type="text" :disabled="childParm.modAuth!=2" class="inputs" v-model="item.adviseRoomNum" placeholder="请输入">
                    <span class="hint" v-if="item.adviseRoomNum!=undefined&&!reg.test(item.adviseRoomNum)&&item.adviseRoomNum!=''||item.adviseRoomNum>1000000">请输0~1000000的入整数。</span>
                    <span class="unit paddingRight1">间</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">建议房间面积</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.adviseRoomArea" placeholder="请输入">
                    <span class="hint" v-if="item.adviseRoomArea!=undefined&&!reg2.test(item.adviseRoomArea)&&item.adviseRoomArea!=''||item.adviseRoomArea>1000000">请输入0~1000000的整数或2位小数。</span>
                    <span class="unit">平米</span>
                  </div>
                </div>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">租金及服务费</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.rentFee" placeholder="请输入">
                    <span class="hint" v-if="item.rentFee!=undefined&&!reg4.test(item.rentFee)&&item.rentFee!=''||item.rentFee>1000000">请输入0~1000000的整数或4位小数。</span>
                    <span class="unit">万元</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">建议月租金</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.adviseRentMonth" placeholder="请输入">
                    <span class="hint" v-if="item.adviseRentMonth!=undefined&&!reg4.test(item.adviseRentMonth)&&item.adviseRentMonth!=''||item.adviseRentMonth>1000000">请输入0~1000000的整数或4位小数。</span>
                    <span class="unit">万元</span>
                  </div>
                </div>
                <p class="labelNameBox position">
                  <span class="labelName">建议服务费</span>
                  <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.adviseFeeMonth" placeholder="请输入">
                  <span class="hint leftPosition0" v-if="item.adviseFeeMonth!=undefined&&!reg4.test(item.adviseFeeMonth)&&item.adviseFeeMonth!=''||item.adviseFeeMonth>1000000">请输入0~1000000的整数或4位小数。</span>
                  <span class="unit">万元</span>
                </p>
              </div>
            </div><!--每一个量价排期的元素结尾-->
          </div>
          <p class="textName">出租率（稳定期）</p>
          <div class="labelNameBox position">
            <span class="labelName">平均出租率(%)</span>
            <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="parm.apartmentLettingRate" placeholder="请输入">
            <span class="hint leftPosition0" v-if="parm.apartmentLettingRate!=undefined&&!reg2.test(parm.apartmentLettingRate)&&parm.apartmentLettingRate!=''||parm.apartmentLettingRate>100">请输入0~100的整数或2位小数。</span>
          </div>
        </div><!--第五个tab结束--持有公寓-->

        <!--第六个tab开始--持有酒店-->
        <div class="componentBox" v-else-if="tabIndex==5">
          <p class="titleComponentName">
            持有酒店分析表格
            <span class="addButton" @click="addElement(tabIndex,parm.holdHotelAnalysis)" v-if="childParm.modAuth==2">添加</span>
          </p>
          <!--每一个量价排期盒子-->
          <div class="quantityBox">
            <!--每一个量价排期的元素开始-->
            <!--v-for-->
            <div class="everyQuantity" v-for="(item,index) in parm.holdHotelAnalysis">
              <p class="quantityTil">
                <span class="text">{{parm.holdHotelAnalysis!=undefined&&(parm.holdHotelAnalysis.length-index)<10?'0'+(parm.holdHotelAnalysis.length-index):(parm.holdHotelAnalysis.length-index)}}</span>
                <!--<span class="deleteButton" @click="delElement(index,parm.holdHotelAnalysis)" v-if="parm.holdHotelAnalysis.length>1">删除</span>-->
                <span class="deleteButton" v-if="childParm.modAuth==2" @click="delElement(index,parm.holdHotelAnalysis)">删除</span>
              </p>
              <div class="quantityContent">
                <p class="labelNameBox">
                  <span class="labelName">星级</span>
                  <el-select :disabled="childParm.modAuth!=2" v-model="item.hotelRating" style="width:70%;" placeholder="请选择">
                    <el-option
                      v-for="item in hotel_rating"
                      :key="item.dictName"
                      :label="item.dictName"
                      :value="item.dictCode">
                    </el-option>
                  </el-select>
                </p>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">客房数</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.guestRoomNums" placeholder="请输入">
                    <span class="hint" v-if="item.guestRoomNums!=undefined&&!reg.test(item.guestRoomNums)&&item.guestRoomNums!=''||item.guestRoomNums>1000000">请输入0~1000000的整数。</span>
                    <span class="unit">间&nbsp;&nbsp;&nbsp;</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">客房平均价格</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.guestRoomPrice" placeholder="请输入">
                    <span class="hint" v-if="item.guestRoomPrice!=undefined&&!reg4.test(item.guestRoomPrice)&&item.guestRoomPrice!=''||item.guestRoomPrice>1000000">请输入0~1000000的整数或4位小数。</span>
                    <span class="unit">元</span>
                  </div>
                </div>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">宴会会议平均价格</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.meetingRoomPrice" placeholder="请输入">
                    <span class="hint" v-if="item.meetingRoomPrice!=undefined&&!reg4.test(item.meetingRoomPrice)&&item.meetingRoomPrice!=''||item.meetingRoomPrice>1000000">请输入0~1000000的整数或4位小数。</span>
                    <span class="unit">万元</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">宴会会议房间数</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.meetingRoomNums" placeholder="请输入">
                    <span class="hint" v-if="item.meetingRoomNums!=undefined&&!reg.test(item.meetingRoomNums)&&item.meetingRoomNums!=''||item.meetingRoomNums>1000000">请输入0~1000000的整数。</span>
                    <span class="unit">间</span>
                  </div>
                </div>
                <div class="labelNameBox">
                  <div class="width50">
                    <span class="labelName">餐饮月坪效</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.cateringArea" placeholder="请输入">
                    <span class="hint" v-if="item.cateringArea!=undefined&&!reg4.test(item.cateringArea)&&item.cateringArea!=''||item.cateringArea>1000000">请输入0~1000000的整数或4位小数。</span>
                    <span class="unit">万元</span>
                  </div>
                  <div class="width50">
                    <span class="labelName textAlign">餐饮面积</span>
                    <input type="text" class="inputs" :disabled="childParm.modAuth!=2" v-model="item.cateringMonthEfficient" placeholder="请输入">
                    <span class="hint" v-if="item.cateringMonthEfficient!=undefined&&!reg2.test(item.cateringMonthEfficient)&&item.cateringMonthEfficient!=''||item.cateringMonthEfficient>1000000">请输入0~1000000的整数或2位小数。</span>
                    <span class="unit">平米</span>
                  </div>
                </div>
              </div>
            </div><!--每一个量价排期的元素结尾-->
          </div>
        </div><!--第六个tab结束--持有酒店-->

        <!--第七个tab开始--附件-->
        <div class="componentBox" v-else-if="tabIndex==6">
          <div class="titleComponentName">
            <!--附件   <span class="ul-remark-text">注：只支持excel文件</span>-->
            <el-upload
              :disabled="childParm.modAuth!=2"
              class="upload-demo"
              :action="url"
              :data="fileData5"
              :headers="headers"
              :before-upload="beforeAvatarUpload"
              :on-success="success"
              :show-file-list="false"
              :limit="1">
              <el-button size="small" type="primary" v-if="childParm.modAuth==2">上传附件</el-button>
            </el-upload>
          </div>
          <table class="tableBox">
            <tr>
              <th class="width1">附件名称</th>
              <th class="width2">文件大小</th>
              <th class="width2">权限</th>
              <th class="width2">操作</th>
            </tr>
            <tr v-for="(item,index) in parm.otherFile">
              <td><a :href="item.fileUrl" class="downloadUrl" target="_Blank">{{item.fileName}}</a></td>
              <td>{{item.fileSize}}</td>
              <td>
                <el-select :disabled="childParm.modAuth!=2" v-model="item.isPrivate" style="width:80px;border:none"  placeholder="请选择">
                  <el-option
                    v-for="item in privacy"
                    :key="item.dictName"
                    :label="item.dictName"
                    :value="item.dictCode">
                  </el-option>
                </el-select>
              </td>
              <td v-if="childParm.modAuth!=2">删除</td>
              <td @click="otherFileDel(index)" v-else-if="childParm.modAuth==2">删除</td>
            </tr>
          </table>

        </div><!--第七个tab结束--附件-->

        <!--第八个tab开始--关联竞品-->
        <div class="componentBox" v-else-if="tabIndex==7">
          <div class="titleComponentName position">
            关联竞品
            <span class="addButton" @click="addCompetitiveProducts" v-if="childParm.modAuth==2">添加 ({{parm.compare_project_list==undefined?0:parm.compare_project_list.length}}个)</span>
            <transition name="fade" mode="out-in">
              <div class="modelBox" v-if="CompetitiveProductsIsShow">
                <div class="addRelevance" >
                  <p class="CloseBox">
                    <span class="textName">添加竞品</span>
                    <span class="closeBtn" @click="closeBtn"></span>
                  </p>
                  <input type="text" class="search" placeholder="请输入搜索内容" :disabled="childParm.modAuth!=2" v-model="searchMsg" @keyup="selectText(searchMsg)">
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
            </transition>
          </div>

          <div class="contendProduct">
            <!--循环对象-->
            <div class="relevanceBox" v-for="item in parm.compare_project_list" @mouseenter="hover(item.projectId)" @mouseleave="leave()">
              <div class="relevance">
                <!--<div class="imgBox"  @mouseenter="hover(item.projectId)" @mouseleave="leave()">-->
                <div class="imgBox">
                  <img :src="item.picUrl" alt="">
                </div>
                <p class="title">{{item.title}}</p>
                <p class="contentText">{{item.location}}</p>
                <transition name="fade" mode="out-in"><!--添加动画-->
                  <p class="deleteIcon" v-if="item.projectId==hoveImgProjectId&&childParm.modAuth==2" @click="deleteFun(item.projectId)"></p>
                </transition>
              </div>
            </div>
          </div>
        </div><!--第八个tab开始--关联竞品-->

      </div><!--tab切换组件总盒子结束-->
    </div>
    <!--附件上传-->
    <div class="modelBox" :class="{displayModel:isDisplayModel}">
      <p class="loadingStyle">附件上传中请勿刷新!</p>
    </div>
    <!--提示-->
    <p class="tanTip " v-if="hintIsShow">{{hintMessage}}</p>
  </div>
</template>

<script>
  export default {
    name: 'clientFixed',
    components: {
    },
    data () {
      return {
        privacy: [{dictCode: 0, dictName: '私密'}, {dictCode: 1, dictName: '公开'}],
        hintIsShow: false, // 提示消息显示隐藏
        hintMessage: '', // 提示消息文本
        hoveImgProjectId: '', // 鼠标悬浮获取图片id
        CompetitiveProductsIsShow: false, // 添加竞品显示隐藏
        temporaryLift: [], // 临时存储所有竞品列表
        temporaryRight: [], // 临时存储所有竞品列表
        CompetitiveProducts: [], // 所有竞品列表
        searchMsg: '', // 关联竞品搜索
        textList: [], // 搜索临时数据存储
        delShowId: '', // 鼠标悬浮获取id控制显示隐藏
        tabIndex: 0, // tab切换index保留值
        navList: ['项目定位', '销售业态量价排期', '持有商业', '持有写字楼', '持有公寓', '持有酒店', '附件', '关联竞品'],
        headers: {platform: 'pc', token: localStorage.getItem('token'), version: '1'},
        M: 100, // 上传附近大小限制:单位M
        isDisplayModel: true, // 附件上传遮罩层
        fileData5: {
          file: '',
          projectId: ''
        },
        projectId: '', // 项目id
        cityCode: '', // 城市代号
        running_sub_type: '', // 高层字典
        standard: '', // 国际顶级字典
        hotel_rating: '', // 五星级字典
        product_positioning: '', // A-中低端产品字典
        running_type_choose: '', // 产品定位-业态选型
        customer_choose: '', // 客户信息-客户选择
        // 数据列表==>存储所有取回的数据:声明目的避免报错length
        // parm: {QuantityPriceState: '', customer_channel: '', product_choose: '', project_quatity_advantage: '', project_quatity_disadvantage: ''},
        parm: {QuantityPrice: '', QuantityPriceState: '', apartmentLettingRate: '', apartmentPosition: '', commerceLettingRate: '', commerceRent: '', compare_project_list: '', customer_channel: '', customer_choose: '', holdHotelAnalysis: '', limitPrice: '', normalPrice: '', officeLettingRate: '', officePosition: '', otherFile: '', product_choose: '', project_quatity_advantage: '', project_quatity_disadvantage: '', running_type_choose: ''
        },
        /* 下面的对象声明作用:方便动态创建一个循环对象 */
        // 产品量价排期表
        /*QuantityPrice: {
          projectId: '', // 项目ID
          runningType: '', // 业态
          buildingArea: '', // 建筑面积（不含赠送）
          buildingUnitPrice: '', // 建面单价
          totalPrice: '', // 单套总价,
          saleNumsMonth: '', // 月均销售套数
          coreCompetitionPro: '', // 核心竞品
          totalPriceCp: '', // 竞品单套总价
          saleNumsMonthCp: ''// 竞品月均销售套数
        },
        // 持有商业
        commerceRent: {
          projectId: '', // 项目id
          storey: '', // 楼层
          anchorStoreArea: '', // 主力店面积（平米）
          anchorStoreUnitprice: '', // 主力店单价（元
          subAnchorArea: '', // 次主力店面积（平米）
          subAnchorUnitprice: '', // 次主力店单价（元
          retailSalesArea: '', // 零售专卖面积（平米）retail_sales_area
          retailSalesUnitprice: '', // 零售专卖单价（元
          cateringArea: '', // 餐饮专门面积（平米）
          cateringUnitprice: '', // 餐饮专门单价（元
          entertainmentArea: '', // 娱乐面积（平米）
          entertainmentUnitprice: '', // 娱乐单价（元）
          serviceHomeArea: '', // 服务家居面积平米
          serviceHomeUnitprice: '', // 服务家居单价（元）
          floorAvgArea: '', // 楼层平均面积（平米）
          floorAvgUnitprice: ''// 楼层平均单
        },
        // 持有写字楼
        officePosition: {
          projectId: '', // 项目id
          standard: '', // 标准
          buildingArea: '', // 面积（平米）
          actualRent: ''// 实际租金
        },
        // 持有公寓
        apartmentPosition: {
          projectId: '', // 项目id
          productType: '', // 产品类型
          adviseRoomNum: '', // 建议房间数
          adviseRoomArea: '', // 建议房间面积（平米）
          rentFee: '', // 租金及服务费（万元）
          adviseRentMonth: '', // 建议月租金（万元）
          adviseFeeMonth: ''// 建议服务费（万元）
        },
        // 持有酒店
        holdHotelAnalysis: {
          projectId: '', // 项目id
          hotelRating: '', // 星级
          guestRoomNums: '', // 客房数
          guestRoomPrice: '', // 客房平均价格（元）
          meetingRoomNums: '', // 宴会会议房间数
          meetingRoomPrice: '', // 宴会会议平均价格（元）
          cateringArea: '', // 餐饮面积
          cateringMonthEfficient: ''// 餐饮面积
        },*/
        // 附件
        otherFile: [],
        // 关联竞品
        compare_project_list: {
          picUrl: '', // 图片url
          projectId: '', // 竞品id
          title: '', // 竞品描述内容
          location: '' // 竞品地理位置
        },
        reg4: /^\d+(\.\d{1,4})?$/, // 正则校验 :正整数,保留4位小数
        reg2: /^\d+(\.\d{1,2})?$/, // 正则校验 :正整数,保留2位小数
        reg: /^[0-9]*$/, // 正则校验 :正整数
        url: this.$baseUrl + '/longcity/services/v1/upload/single'
      }
    },
    methods: {
      handleOptionClick () {

      },
      // tab切换函数
      tab (index) {
        this.tabIndex = index
      },
      // 附件上传前的钩子函数;判断附件名称;大小等
      beforeAvatarUpload (file) {
         let isRrsult = file.name.split('.')[file.name.split('.').length - 1] == 'xls' || file.name.split('.')[file.name.split('.').length - 1] == 'xlsx' || file.name.split('.')[file.name.split('.').length - 1] == 'ppt' || file.name.split('.')[file.name.split('.').length - 1] == 'pptx'|| file.name.split('.')[file.name.split('.').length - 1] == 'pdf' || file.name.split('.')[file.name.split('.').length - 1] == 'doc' || file.name.split('.')[file.name.split('.').length - 1] == 'docx'|| file.name.split('.')[file.name.split('.').length - 1] == 'jpeg'|| file.name.split('.')[file.name.split('.').length - 1] == 'png'|| file.name.split('.')[file.name.split('.').length - 1] == 'jpg'|| file.name.split('.')[file.name.split('.').length - 1] == 'bmp'|| file.name.split('.')[file.name.split('.').length - 1] == 'mp4'
         if (!isRrsult) {
           this.hint('仅支持ppt、pptx、pdf、xls、xlsx、doc、docx、 jpeg、png、jpg、bmp、MP4格式文件上传!')
           return isRrsult
         }
        var isM = file.size / 1024 / 1024
        if (isM > this.M) {
          this.hint('上传附件过大,最大为' + this.M + 'M!')
          return false
        }
        this.isDisplayModel = false
      },
      // 附件上传成功函数;element-ui提供方法;成功后将对应的值进行处理展示;方便上传
      success (response, file, fileList) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].isPrivate = 0
          response.result[i].fileUrl = response.result[i].url
          response.result[i].fileId = response.result[i].id
          this.parm.otherFile.unshift(response.result[i])
        }
        this.isDisplayModel = true
        // console.log(response, file, fileList)
      },
      // 获取字典数据
      dictionaries () {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/dict/dictListByType',
          data: {'dictTypes': ['running_sub_type', 'standard', 'hotel_rating', 'product_positioning', 'running_type_choose', 'customer_choose']}
        }).then(function (succeed) {
          that.running_sub_type = succeed.data.result[0].items
          that.standard = succeed.data.result[1].items
          that.hotel_rating = succeed.data.result[2].items
          that.product_positioning = succeed.data.result[3].items
          that.running_type_choose = succeed.data.result[4].items
          that.customer_choose = succeed.data.result[5].items
        })
      },
      // 获取数据
      loadings (id) {
        let that = this
        this.$http({
          method: 'post',
          url: '/longcity/services/v1/project/getMenuDetail',
          // data: {projectId: 1024, titleKey: ['proProductOrientation']}
          data: {projectId: that.projectId, titleKey: ['proProductOrientation']}
        }).then(function (succeed) {
          that.parm = succeed.data.result.proProductOrientation
          //  过滤id否则提交不成功
          for (let i = 0; i < that.parm.QuantityPrice.length; i++) {
            if (that.parm.QuantityPrice[i].id !== undefined && that.parm.QuantityPrice[i].id === '') {
              that.parm.QuantityPrice[i].id = undefined
            }
            if (that.parm.QuantityPrice[i].projectId !== undefined && that.parm.QuantityPrice[i].projectId === '') {
              that.parm.QuantityPrice[i].projectId = undefined
            }
          }
          for (let i = 0; i < that.parm.apartmentPosition.length; i++) {
            if (that.parm.apartmentPosition[i].id !== undefined && that.parm.apartmentPosition[i].id === '') {
              that.parm.apartmentPosition[i].id = undefined
            }
            if (that.parm.apartmentPosition[i].projectId !== undefined && that.parm.apartmentPosition[i].projectId === '') {
              that.parm.apartmentPosition[i].projectId = undefined
            }
          }
          for (let i = 0; i < that.parm.commerceRent.length; i++) {
            if (that.parm.commerceRent[i].id !== undefined && that.parm.commerceRent[i].id === '') {
              that.parm.commerceRent[i].id = undefined
            }
            if (that.parm.commerceRent[i].projectId !== undefined && that.parm.commerceRent[i].projectId === '') {
              that.parm.commerceRent[i].projectId = undefined
            }
          }
          for (let i = 0; i < that.parm.holdHotelAnalysis.length; i++) {
            if (that.parm.holdHotelAnalysis[i].id !== undefined && that.parm.holdHotelAnalysis[i].id === '') {
              that.parm.holdHotelAnalysis[i].id = undefined
            }
            if (that.parm.holdHotelAnalysis[i].projectId !== undefined && that.parm.holdHotelAnalysis[i].projectId === '') {
              that.parm.holdHotelAnalysis[i].projectId = undefined
            }
          }
          for (let i = 0; i < that.parm.officePosition.length; i++) {
            if (that.parm.officePosition[i].id !== undefined && that.parm.officePosition[i].id === '') {
              that.parm.officePosition[i].id = undefined
            }
            if (that.parm.officePosition[i].projectId !== undefined && that.parm.officePosition[i].projectId === '') {
              that.parm.officePosition[i].projectId = undefined
            }
          }
          if (that.parm.otherFile == '') {
            that.parm.otherFile = []
          }
        })
      },
      // 添加每一个对应的数据列表节点
      addElement (tabIndex, parm) {
        // 当前的parm和data中定义的parm不是同一个
        if (tabIndex === 1) {
          parm.unshift({
            projectId: '', // 项目ID
            runningType: '', // 业态
            buildingArea: '', // 建筑面积（不含赠送）
            buildingUnitPrice: '', // 建面单价
            totalPrice: '', // 单套总价,
            saleNumsMonth: '', // 月均销售套数
            coreCompetitionPro: '', // 核心竞品
            totalPriceCp: '', // 竞品单套总价
            saleNumsMonthCp: ''// 竞品月均销售套数
          })
        }
        if (tabIndex === 2) {
          parm.unshift({
            projectId: '', // 项目id
            storey: '', // 楼层
            anchorStoreArea: '', // 主力店面积（平米）
            anchorStoreUnitprice: '', // 主力店单价（元
            subAnchorArea: '', // 次主力店面积（平米）
            subAnchorUnitprice: '', // 次主力店单价（元
            retailSalesArea: '', // 零售专卖面积（平米）retail_sales_area
            retailSalesUnitprice: '', // 零售专卖单价（元
            cateringArea: '', // 餐饮专门面积（平米）
            cateringUnitprice: '', // 餐饮专门单价（元
            entertainmentArea: '', // 娱乐面积（平米）
            entertainmentUnitprice: '', // 娱乐单价（元）
            serviceHomeArea: '', // 服务家居面积平米
            serviceHomeUnitprice: '', // 服务家居单价（元）
            floorAvgArea: '', // 楼层平均面积（平米）
            floorAvgUnitprice: ''// 楼层平均单
          })
        }
        if (tabIndex === 3) {
          parm.unshift({
            projectId: '', // 项目id
            standard: '', // 标准
            buildingArea: '', // 面积（平米）
            actualRent: ''// 实际租金
          })
        }
        if (tabIndex === 4) {
          parm.unshift({
            projectId: '', // 项目id
            productType: '', // 产品类型
            adviseRoomNum: '', // 建议房间数
            adviseRoomArea: '', // 建议房间面积（平米）
            rentFee: '', // 租金及服务费（万元）
            adviseRentMonth: '', // 建议月租金（万元）
            adviseFeeMonth: ''// 建议服务费（万元）
          })
        }
        if (tabIndex === 5) {
          parm.unshift({
            projectId: '', // 项目id
            hotelRating: '', // 星级
            guestRoomNums: '', // 客房数
            guestRoomPrice: '', // 客房平均价格（元）
            meetingRoomNums: '', // 宴会会议房间数
            meetingRoomPrice: '', // 宴会会议平均价格（元）
            cateringArea: '', // 餐饮面积
            cateringMonthEfficient: ''// 餐饮面积
          })
        }
      },
      // 删除每一个对应的数据列表节点
      delElement (index, parm) {
        // 当前的parm和data中定义的parm不是同一个
        parm.splice(index, 1)
      },
      // 附件列表删除函数
      otherFileDel (index) {
        this.parm.otherFile.splice(index, 1)
      },
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
        if (that.CompetitiveProducts.length > 0) {
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
              if (that.parm.compare_project_list.length > 0) {
                for (var j = 0; j < that.parm.compare_project_list.length; j++) {
                  if (that.CompetitiveProducts[i].projectId == that.parm.compare_project_list[j].projectId) {
                    that.CompetitiveProducts[i].isActive = true
                    break
                  } else {
                    that.CompetitiveProducts[i].isActive = false
                  }
                }
              } else {
                that.CompetitiveProducts[i].isActive = false
              }
            }
            for (var i = 0; i < that.parm.compare_project_list.length; i++) {
              that.temporaryRight.push(that.parm.compare_project_list[i])
            }
            that.temporaryLift = that.CompetitiveProducts
            that.CompetitiveProductsIsShow = true
          })
        }
      },
      // 添加竞品
      checkedFun (projectId, isActive) {
        if (isActive === false) {
          for (var i = 0; i < this.CompetitiveProducts.length; i++) {
            if (this.CompetitiveProducts[i].projectId === projectId) {
              this.CompetitiveProducts[i].isActive = true
              this.temporaryRight.unshift(this.CompetitiveProducts[i])
              break
            }
          }
        } else {
          this.cancelCompetitiveProducts(projectId)
        }
      },
      // 取消竞品
      cancelCompetitiveProducts (projectId) {
        for (var i = 0; i < this.temporaryRight.length; i++) {
          if (this.temporaryRight[i].projectId == projectId) {
            this.temporaryRight.splice(i, 1)
          }
        }
        for (var i = 0; i < this.CompetitiveProducts.length; i++) {
          if (this.CompetitiveProducts[i].projectId==projectId) {
            this.CompetitiveProducts[i].isActive = false
            return
          }
        }
      },
      // 关联竞品下方确认按钮事件
      affirmBtn () {
        this.parm.compare_project_list = []
        for (var i = 0; i < this.temporaryRight.length; i++) {
          this.parm.compare_project_list.push(this.temporaryRight[i])
        }
        // console.log(this.parm.compare_project_list)
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
          for (var i = 0; i < that.parm.compare_project_list.length; i++) {
            if (projectId ==that.parm.compare_project_list[i].projectId) {
              that.parm.compare_project_list.splice(i, 1)
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
      // 提交之前正则验证
      regularExpression () {
        let parm = this.parm
        // 校验输入内容是否正确
        // 产品定位-价格定位验证
        let projectText = '请输入正确的项目定位'
        if (!this.reg4.test(parm.limitPrice) && parm.limitPrice !== '' || parm.limitPrice > 1000000) {
          this.hint(projectText + '限价数据!')
          return false
        }
        if (!this.reg4.test(parm.normalPrice) && parm.normalPrice !== '' || parm.normalPrice > 1000000) {
          this.hint(projectText + '正常数据!')
          return false
        }
        let QuantityPrice = this.parm.QuantityPrice
        // 添加判断:当点击提交的时候如果所有值为空或者填入的值符合需求则提交成功
        // 产品量价排期表验证开始
        let QuantityPriceText = '请输入正确的销售业态量价排期'
        for (let i = 0; i < QuantityPrice.length; i++) {
          if (!this.reg2.test(QuantityPrice[i].buildingArea) && QuantityPrice[i].buildingArea !== '' || QuantityPrice[i].buildingArea > 1000000) {
            this.hint(QuantityPriceText + '建筑面积!')
            return false
          }
          if (!this.reg4.test(QuantityPrice[i].buildingUnitPrice) && QuantityPrice[i].buildingUnitPrice !== '' || QuantityPrice[i].buildingUnitPrice > 1000000) {
            this.hint(QuantityPriceText + '建面单价!')
            return false
          }
          if (!this.reg4.test(QuantityPrice[i].totalPrice) && QuantityPrice[i].totalPrice !== '' || QuantityPrice[i].totalPrice > 1000000) {
            this.hint(QuantityPriceText + '单套总价!')
            return false
          }
          if (!this.reg.test(QuantityPrice[i].saleNumsMonth) && QuantityPrice[i].saleNumsMonth !== '' || QuantityPrice[i].saleNumsMonth > 1000000) {
            this.hint(QuantityPriceText + '月均销售套数!')
            return false
          }
          if (!this.reg4.test(QuantityPrice[i].totalPriceCp) && QuantityPrice[i].totalPriceCp !== '' || QuantityPrice[i].totalPriceCp > 1000000) {
            this.hint(QuantityPriceText + '竞品单套总价!')
            return false
          }
          if (!this.reg.test(QuantityPrice[i].saleNumsMonthCp) && QuantityPrice[i].saleNumsMonthCp !== '' || QuantityPrice[i].saleNumsMonthCp > 1000000) {
            this.hint(QuantityPriceText + '竞品月均销售套数!')
            return false
          }
        }
        // 持有商业验证开始
        let commerceRent = this.parm.commerceRent
        let commerceRentText = '请输入正确的持有商业'
        for (let i = 0; i < commerceRent.length; i++) {
          if (!this.reg.test(commerceRent[i].storey) && commerceRent[i].storey !== '' || commerceRent[i].storey > 100) {
            this.hint(commerceRentText + '楼层!')
            return false
          }
          if (!this.reg2.test(commerceRent[i].anchorStoreArea) && commerceRent[i].anchorStoreArea !== '' || commerceRent[i].anchorStoreArea > 1000000) {
            this.hint(commerceRentText + '主力店面积(平米)!')
            return false
          }
          if (!this.reg.test(commerceRent[i].anchorStoreUnitprice) && commerceRent[i].anchorStoreUnitprice !== '' || commerceRent[i].anchorStoreUnitprice > 1000000) {
            this.hint(commerceRentText + '主力店面积单价!')
            return false
          }
          if (!this.reg2.test(commerceRent[i].subAnchorArea) && commerceRent[i].subAnchorArea !== '' || commerceRent[i].subAnchorArea > 1000000) {
            this.hint(commerceRentText + '次主力店面积!')
            return false
          }
          if (!this.reg.test(commerceRent[i].subAnchorUnitprice) && commerceRent[i].subAnchorUnitprice !== '' || commerceRent[i].subAnchorUnitprice > 1000000) {
            this.hint(commerceRentText + '次主力店单价!')
            return false
          }
          if (!this.reg2.test(commerceRent[i].retailSalesArea) && commerceRent[i].retailSalesArea !== '' || commerceRent[i].retailSalesArea > 1000000) {
            this.hint(commerceRentText + '零售专卖面积!')
            return false
          }
          if (!this.reg.test(commerceRent[i].retailSalesUnitprice) && commerceRent[i].retailSalesUnitprice !== '' || commerceRent[i].retailSalesUnitprice > 1000000) {
            this.hint(commerceRentText + '零售专卖单价!')
            return false
          }
          if (!this.reg2.test(commerceRent[i].cateringArea) && commerceRent[i].cateringArea !== '' || commerceRent[i].cateringArea > 1000000) {
            this.hint(commerceRentText + '餐饮专门面积!')
            return false
          }
          if (!this.reg.test(commerceRent[i].cateringUnitprice) && commerceRent[i].cateringUnitprice !== '' || commerceRent[i].cateringUnitprice > 1000000) {
            this.hint(commerceRentText + '餐饮专门单价!')
            return false
          }
          if (!this.reg2.test(commerceRent[i].entertainmentArea) && commerceRent[i].entertainmentArea !== '' || commerceRent[i].entertainmentArea > 1000000) {
            this.hint(commerceRentText + '娱乐面积!')
            return false
          }
          if (!this.reg.test(commerceRent[i].entertainmentUnitprice) && commerceRent[i].entertainmentUnitprice !== '' || commerceRent[i].entertainmentUnitprice > 1000000) {
            this.hint(commerceRentText + '娱乐单价!')
            return false
          }
          if (!this.reg2.test(commerceRent[i].serviceHomeArea) && commerceRent[i].serviceHomeArea !== '' || commerceRent[i].serviceHomeArea > 1000000) {
            this.hint(commerceRentText + '服务家居面积!')
            return false
          }
          if (!this.reg.test(commerceRent[i].serviceHomeUnitprice) && commerceRent[i].serviceHomeUnitprice !== '' || commerceRent[i].serviceHomeUnitprice > 1000000) {
            this.hint(commerceRentText + '服务家居单价!')
            return false
          }
          if (!this.reg2.test(commerceRent[i].floorAvgArea) && commerceRent[i].floorAvgArea !== '' || commerceRent[i].floorAvgArea > 1000000) {
            this.hint(commerceRentText + '楼层平均面积!')
            return false
          }
          if (!this.reg.test(commerceRent[i].floorAvgUnitprice) && commerceRent[i].floorAvgUnitprice !== '' || commerceRent[i].floorAvgUnitprice > 1000000) {
            this.hint(commerceRentText + '楼层平均单价!')
            return false
          }
        }
        if (!this.reg2.test(parm.commerceLettingRate) && parm.commerceLettingRate !== '' || parm.commerceLettingRate > 100) {
          this.hint(commerceRentText + '持有商业平均出租率!')
          return false
        }
        // 持有商业验证结束
        // 持有写字楼验证开始
        let officePosition = this.parm.officePosition
        let officePositionText = '请输入正确的持有写字楼'
        for (let i = 0; i < officePosition.length; i++) {
          if (!this.reg2.test(officePosition[i].buildingArea) && officePosition[i].buildingArea !== '' || officePosition[i].buildingArea > 1000000) {
            this.hint(officePositionText + '面积!')
            return false
          }
          if (!this.reg4.test(officePosition[i].actualRent) && officePosition[i].actualRent !== '' || officePosition[i].actualRent > 1000000) {
            this.hint(officePositionText + '实际租金!')
            return false
          }
        }
        if (!this.reg2.test(parm.officeLettingRate) && parm.officeLettingRate !== '' || parm.officeLettingRate > 100) {
          this.hint(officePositionText + '平均出租率!')
          return false
        }
        // 持有写字楼结束

        // 持有公寓判断开始
        let apartmentPosition = this.parm.apartmentPosition
        let positionText = '请输入正确的持有公寓'
        for (let i = 0; i < apartmentPosition.length; i++) {
          if (!this.reg.test(apartmentPosition[i].adviseRoomNum) && apartmentPosition[i].adviseRoomNum !== '' || apartmentPosition[i].adviseRoomNum > 1000000) {
            this.hint(positionText + '建议房间数!')
            return false
          }
          if (!this.reg2.test(apartmentPosition[i].adviseRoomArea) && apartmentPosition[i].adviseRoomArea !== '' || apartmentPosition[i].adviseRoomArea > 1000000) {
            this.hint(positionText + '建议房间面积!')
            return false
          }
          if (!this.reg4.test(apartmentPosition[i].rentFee) && apartmentPosition[i].rentFee !== '' || apartmentPosition[i].rentFee > 1000000) {
            this.hint(positionText + '租金及服务费!')
            return false
          }
          if (!this.reg4.test(apartmentPosition[i].adviseRentMonth) && apartmentPosition[i].adviseRentMonth !== '' || apartmentPosition[i].adviseRentMonth > 1000000) {
            this.hint(positionText + '建议月租金!')
            return false
          }
          if (!this.reg4.test(apartmentPosition[i].adviseFeeMonth) && apartmentPosition[i].adviseFeeMonth !== '' || apartmentPosition[i].adviseFeeMonth > 1000000) {
            this.hint(positionText + '建议服务费!')
            return false
          }
        }
        if (!this.reg2.test(parm.apartmentLettingRate) && parm.apartmentLettingRate !== '' || parm.apartmentLettingRate > 100) {
          this.hint('请输入正确的持有公寓平均出租率!')
          return false
        }
        // 持有公寓判断结束
        // 持有酒店
        let holdHotelAnalysis = this.parm.holdHotelAnalysis
        let HotelText = '请输入正确的持有酒店'
        for (let i = 0; i < holdHotelAnalysis.length; i++) {
          if (!this.reg.test(holdHotelAnalysis[i].guestRoomNums) && holdHotelAnalysis[i].guestRoomNums !== '' || holdHotelAnalysis[i].guestRoomNums > 1000000) {
            this.hint(HotelText + '客房数!')
            return false
          }
          if (!this.reg4.test(holdHotelAnalysis[i].guestRoomPrice) && holdHotelAnalysis[i].guestRoomPrice !== '' || holdHotelAnalysis[i].guestRoomPrice > 1000000) {
            this.hint(HotelText + '客房平均价格!')
            return false
          }
          if (!this.reg.test(holdHotelAnalysis[i].meetingRoomNums) && holdHotelAnalysis[i].meetingRoomNums !== '' || holdHotelAnalysis[i].meetingRoomNums > 1000000) {
            this.hint(HotelText + '宴会会议房间数!')
            return false
          }
          if (!this.reg4.test(holdHotelAnalysis[i].meetingRoomPrice) && holdHotelAnalysis[i].meetingRoomPrice !== '' || holdHotelAnalysis[i].meetingRoomPrice > 1000000) {
            this.hint(HotelText + '宴会会议平均价格!')
            return false
          }
          if (!this.reg4.test(holdHotelAnalysis[i].cateringArea) && holdHotelAnalysis[i].cateringArea !== '' || holdHotelAnalysis[i].cateringArea > 1000000) {
            this.hint(HotelText + '餐饮月坪效!')
            return false
          }
          if (!this.reg2.test(holdHotelAnalysis[i].cateringMonthEfficient) && holdHotelAnalysis[i].cateringMonthEfficient !== '' || holdHotelAnalysis[i].cateringMonthEfficient > 1000000) {
            this.hint(HotelText + '餐饮面积!')
            return false
          } else {
            if (i + 1 === holdHotelAnalysis.length) {
              this.submit()
            }
          }
        }
      },
      // 保存函数
      save () {
        this.regularExpression()
      },
      submit () {
        let that = this
        let AllList = that.parm
        let arr = []
        for (var i = 0; i < AllList.compare_project_list.length; i++) {
          arr.push(that.parm.compare_project_list[i].projectId)
        }
        AllList.compare_project_list = arr
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/project/saveProjectPartially',
          data: {projectId: that.projectId, title: 'proProductOrientation', 'detail': AllList}
        }).then(function (succeed) {
          if (succeed.data.code === 200 || succeed.data.code === '200') {
            that.saveSuccessDialogue()
            that.$emit('cancelThePage', 2)
          }else {
            that.saveError()
          }
        })
      },
      // 关闭函数
      close () {
        var that = this
        this.cancelDialogue(function () {
          that.$emit('cancelThePage', 1)
        })
      },
      // 从父元素获取id方法
      run (fun, parm) {
        if (fun == 'getId') {
          this.fileData5.projectId = parm
          this.projectId = parm
          this.cityCode = this.childParm.cityCode
          // 传递项目id;调用加载页面数据
          this.loadings(parm)
          // 调用数据字典函数
          this.dictionaries()
        }
      },
      // 提示函数
      hint (message) {
        let that = this
        this.hintIsShow = true
        that.hintMessage = message
        setTimeout(function () {
          that.hintIsShow = false
        }, 1500)
        clearTimeout()
      }
    },
    mounted () {
      this.setConHeight()
    },
    props: {
      childParm: Object
    }
  }
</script>

<style scoped lang="less">
  #clientFixed{overflow:auto}
  #conMod{width:100%;overflow:auto}
  #clientFixed{
    textarea{overflow-y: auto}
    /*公共部分页面样式--项目定位*/
    /*placeholder颜色*/
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #999;}
    .contentBoxTop{width:100%;border:1px solid #ddd;background-color:#fff;}
    .contentBoxTop{
      .projectFixed{height:50px;line-height:50px;position:relative;text-indent:17px;font-size:16px;color:#444;border-bottom:2px solid #ddd;}
      .projectFixed:before{display:block;content:'';height:16px;width:3px;background-color:#67649F;position:absolute;top:17px;left:0;}
      .messageBox{padding:20px;}
      .textName{font-size:14px;color:#666;}
      .textareaBox{position:relative;width:100%;}
      .textareaBox{
        .textarea{resize: none;width:97.6%;height:100px;background-color:#f9f9f9;border-radius:4px;line-height:18px;text-indent:10px;padding:1%;border:1px solid #ddd;}
        .textarea:hover{border-color:#8391a5;}
        .textarea:focus{border-color:#20a0ff}
        .statistics{position:absolute;right:10px;bottom:10px;}
      }
      .special{width:100%;position: relative;overflow: hidden;margin:20px 0;}
      .business{font-size:14px;color:#666;}
      .special .business{position: absolute;top:50%;left:0;margin-top:-14px;}
    }
    /*底部table切换内容样式*/
    .tableListBox{
      .tabNav{width:100%;height:50px;border-bottom:1px solid #ddd;}
      .tabNav .evertLabel{display:block;float:left;margin:0 2.5%;line-height:50px;height:50px;position:relative;color:#666;font-size:14px;cursor: pointer;user-select:none;}
      .tabNav .evertLabel.active{color:#67649F;cursor:context-menu;}
      .tabNav .evertLabel.active:after{display:block;content:'';width:100%;height:0;border-bottom:4px solid #67649F;position: absolute;left:0;bottom:0;}
      .everyComponent{width:96%;background-color:#fff;padding:2%}
      /*总盒子*/
      .everyComponent{
        /*每一个tab切换对应内容最外层盒子*/
        .titleComponentName{height:50px;line-height:50px;text-align:left;}
        .titleComponentName{
          .addButton{display:block;width:125px;height:36px;line-height:36px;color:#fff;font-size:14px;text-align:center;float:right;border-radius:4px;margin-top:6px;background:url("../../assets/images/add.png") 18px 9px no-repeat;background-size:16px ;background-color:#67649F;cursor:pointer;text-indent:12px;}
          /*遮罩层*/
          /*.modelBox {display: block;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.3);position: fixed;top: 0;left: 0;z-index: 20000;}*/
        }
        .quantityBox{
          .textName{height:50px;line-height:50px;}
          .textareaBox{position:relative;}
          .textareaBox{
            .textarea{resize: none;width:98%;height:100px;background-color:#f9f9f9;border-radius:4px;line-height:18px;text-indent:10px;padding:1%;border:1px solid #ddd;}
            .textarea:hover{border-color:#8391a5;}
            .textarea:focus{border-color:#20a0ff}
            .statistics{position:absolute;right:10px;bottom:10px;}
          }
        }
        .quantityBox .everyQuantity{margin-bottom:20px;}
        .quantityBox .everyQuantity{
          .quantityTil{height:30px;line-height:30px;overflow:hidden;background-color:#E2E2ED;padding:0 15px;border-radius:4px 4px 0 0;}
          .quantityTil .text{height:30px;line-height:30px;color:#67649F;font-size:18px;}
          .quantityTil .deleteButton{display:block;float:right;height:30px;line-height:30px;color:#67649F;font-size:12px;cursor:pointer;}
          .quantityContent{padding:15px 20px;border:1px solid #ddd;border-top:none;border-radius:0 0 4px 4px;}
        }
        .labelNameBox{line-height:50px;height:50px;}
        .position{position: relative}
        .labelNameBox .width50{width:49%;display:inline-block;position:relative}
        .labelNameBox .hint{position:absolute;right:35px;bottom:-8px;font-size:12px;color:red;width:60%;line-height:12px;text-align:center;}
        .labelNameBox .labelName{width:150px;}
        .labelNameBox .labelNameWidth{width:60px;}
        .labelNameBox .unit{margin-left:20px;}
        .labelNameBox .paddingRight1{padding-right:1em;}
        .labelNameBox .textAlign{width:100px;text-align:left;margin-left:50px;}
        .labelNameBox .textAlignWidth{width:60px;text-align:center;margin-left:50px;}
        .labelNameBox .inputs{width:117px;height:32px;border-radius:4px;outline:none;border:1px solid #bfcbd9;text-indent:10px}
        .labelNameBox .inputs:hover{border-color:#8391a5;}
        .labelNameBox .inputs:focus{border-color:#20a0ff}
        .labelNameBoxText{position:relative;margin-top:10px;}
        .labelNameBoxText{
          .labelName{float:left;width:150px;}
          .textarea{width:75%;max-width:70%;height:70px;padding:10px;line-height:18px;resize: none;margin-left:3px;border-radius:4px;border:1px solid #bfcbd9;background-color:#f9f9f9;}
          .textarea:hover{border-color:#8391a5;}
          .statistics{position:absolute;left:100%;bottom:10px;margin-left:-110px;}
          .specialStatistics{left:70%;bottom:10px;margin-left:130px;}
        }
        .leftPosition0{left:0}
        .leftPosition60{left:60px}
        /*上传附件*/
        .componentBox{
          .tableBox{width:100%;}
          .tableBox .width1{width:61%}
          .tableBox .width2{width:13%}
          .tableBox th{background-color:#E2E2ED;color:#67649F;line-height:30px;font-size:14px;}
          .tableBox td{border:1px solid #ddd;text-align:center;line-height:30px;font-size:12px;}
          .tableBox tr td:nth-child(1){text-align: left;}
          .downloadUrl{width:100%;text-indent:15px;}
          .tableBox tr td:nth-child(4){cursor:pointer;}
          .upload-demo{float:right;}
          .el-button--primary{width:100px;height:32px;background:url("../../assets/images/add.png") 8px 6px no-repeat;background-color:#67649F;border-color:#67649F;background-size:16px;}
        }
        .loadingStyle {position: absolute;top: 50%;left: 0; width: 100%;color: #fff;font-size: 16px;text-align: center;user-select:none;}
        /*关联竞品样式*/
        .position{position:relative;}
        .contendProduct{width:100%;overflow:hidden;}
        .relevanceBox{width:29%;margin:2%;border:1px solid #bbb;border-radius:4px;display:block;text-align:center;height:248px;float:left;padding-bottom:20px;}
        .relevanceBox{position:relative}
        .relevanceBox{
          .deleteIcon{width:100%;height:30px;background:url("../../assets/images/delete.png") center center no-repeat;background-color:rgba(0,0,0,0.4);position: absolute;left:0;bottom:0;cursor:pointer;border-radius:0 0 4px 4px;}
          .relevance{width:90%;height:90%;padding-top:5%;margin:0 auto;user-select: none;}
          /*.imgBox{display:block; vertical-align:middle;position:relative;width:100%;height:120px;background-color:rgba(9,9,9,0.3);border-radius:4px;line-height:120px;}*/
          .imgBox{display:block; vertical-align:middle;width:100%;height:120px;background-color:rgba(9,9,9,0.3);border-radius:4px;line-height:120px;}
          .imgBox img{max-width:100%;max-height:120px;display:block;margin:0 auto;display:block;}
          .imgBox .deleteIcon{width:100%;height:30px;background:url("../../assets/images/delete.png") center center no-repeat;background-color:rgba(0,0,0,0.4);position: absolute;left:0;bottom:0;cursor:pointer;border-radius:0 0 4px 4px;}
          .title{font-size:14px;color:#444;text-align:left;word-wrap: break-word; word-break: normal;overflow-x: hidden}
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
        .affirmBox{width:100%;height:36px;line-height:26px;position:absolute;left:0;bottom:0;background-color:#f1f1f1;text-align:right;z-index:10;}
        .affirmBox .affirmBtn{width:60px;height:24px;line-height:24px;border:1px solid #67649F;background-color:#67649F;border-radius:4px;color:#fff;display:block;text-align:center;float:right;padding:0;cursor:pointer;user-select:none;margin-top:5px;margin-right:20px;}
        .checkBox .check{line-height:24px;position:relative;padding:5px 0;padding-right:32px;word-wrap: break-word; word-break: normal;}
        .checkBox .check .addAndSubtract{display:block;width:20px;height:20px;position: absolute;top:50%;right:10px;margin-top:-10px;cursor:pointer;}
        .checkBox .check .littleAddBtn{border-radius:50%;border:1px solid #ddd;}
        .checkBox .check .activeCheck{background:url("../../assets/images/checkyes.png") center center no-repeat;background-color:#67649F;border-radius:50%;background-size:24px;}
        .checkBox .check .subtract{background-color:red;border-radius:50%;line-height:16px;color:#fff;text-align:center;font-weight: bold;font-size:20px;}
        .special{overflow:hidden;min-height:40px;line-height:36px;margin-top:15px;}
      }
    }
    /*遮罩层*/
    .modelBox{display: block;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.3);position: fixed;top: 0;left: 0;z-index: 20000;}
    .modelBox.displayModel {display: none}
    .loadingStyle {position:absolute;top: 50%;left: 0;width: 100%;color: #fff;font-size: 16px;text-align: center;user-select:none;}
    /*动画*/
    .fade-enter-active, .fade-leave-active {transition: all 0.5s ease-out;}

    .fade-enter, .fade-leave-active {opacity: 0;}
  }
</style>
