<template>
  <div class="costOperation" id="costOperation">
    <div class="closeNav">
      <p class=" tit fl" title="">{{childParm.projectName}}</p>
      <div>
        <span class="closeButton fl" @click="close">关闭</span>
        <span class="saveButton fl" v-if="childParm.modAuth==2" @click="submit">保存</span>
      </div>
    </div>
    <div class="contentBoxTop" id="conMod">
      <p class="projectFixed">项目成本</p>
      <table class="projectCostTab">
        <tr>
          <th class="width15">指标项</th>
          <th>
            <p>合价</p>
            <p>（万元）</p>
          </th>
          <th>
            <p>成本占比</p>
            <p>（%）</p>
          </th>
          <th>
            <p>可售单方成本【含地库】</p>
            <p>（元／平米）</p>
          </th>
          <th>
            <p>对标口径单方成本【含地库】</p>
            <p>（元／平米）</p>
          </th>
        </tr>
        <!--税前项目成本（不含税价）-->
        <tr>
          <td>
            <p>税前项目成本</p>
            <p>（不含税价）</p>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[0].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[0].combinedPrice)&&pramList[0].combinedPrice!=''||pramList[0].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[0].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[0].costPercent)&&pramList[0].costPercent!=''||pramList[0].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[0].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[0].saleSquareCost)&&pramList[0].saleSquareCost!=''||pramList[0].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[0].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[0].compSaleSquareCost)&&pramList[0].compsaleSquareCost!=''||pramList[0].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--开发成本-->
        <tr>
          <td> <p>开发成本</p> </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[1].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[1].combinedPrice)&&pramList[1].combinedPrice!=''||pramList[1].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[1].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[1].costPercent)&&pramList[1].costPercent!=''||pramList[1].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[1].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[1].saleSquareCost)&&pramList[1].saleSquareCost!=''||pramList[1].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[1].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[1].compSaleSquareCost)&&pramList[1].compsaleSquareCost!=''||pramList[1].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--土地获得款价-->
        <tr>
          <td><p>土地获得款价</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[2].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[2].combinedPrice)&&pramList[2].combinedPrice!=''||pramList[2].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[2].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[2].costPercent)&&pramList[2].costPercent!=''||pramList[2].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[2].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[2].saleSquareCost)&&pramList[2].saleSquareCost!=''||pramList[2].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[2].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[2].compSaleSquareCost)&&pramList[2].compsaleSquareCost!=''||pramList[2].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--行政及经营性收费-->
        <tr>
          <td><p>行政及经营性收费</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[3].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[3].combinedPrice)&&pramList[3].combinedPrice!=''||pramList[3].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[3].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[3].costPercent)&&pramList[3].costPercent!=''||pramList[3].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[3].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[3].saleSquareCost)&&pramList[3].saleSquareCost!=''||pramList[3].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[3].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[3].compSaleSquareCost)&&pramList[3].compsaleSquareCost!=''||pramList[3].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--主体建安费-->
        <tr>
          <td><p>主体建安费</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[4].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[4].combinedPrice)&&pramList[4].combinedPrice!=''||pramList[4].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[4].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[4].costPercent)&&pramList[4].costPercent!=''||pramList[4].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[4].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[4].saleSquareCost)&&pramList[4].saleSquareCost!=''||pramList[4].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[4].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[4].compSaleSquareCost)&&pramList[4].compsaleSquareCost!=''||pramList[4].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--环境景观工程费-->
        <tr>
          <td><p>环境景观工程费</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[5].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[5].combinedPrice)&&pramList[5].combinedPrice!=''||pramList[5].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[5].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[5].costPercent)&&pramList[5].costPercent!=''||pramList[5].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[5].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[5].saleSquareCost)&&pramList[5].saleSquareCost!=''||pramList[5].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[5].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[5].compSaleSquareCost)&&pramList[5].compsaleSquareCost!=''||pramList[5].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--工程相关费-->
        <tr>
          <td><p>工程相关费</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[6].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[6].combinedPrice)&&pramList[6].combinedPrice!=''||pramList[6].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[6].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[6].costPercent)&&pramList[6].costPercent!=''||pramList[6].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[6].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[6].saleSquareCost)&&pramList[6].saleSquareCost!=''||pramList[6].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[6].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[6].compSaleSquareCost)&&pramList[6].compsaleSquareCost!=''||pramList[6].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--期间费用-->
        <tr>
          <td><p>期间费用</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[7].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[7].combinedPrice)&&pramList[7].combinedPrice!=''||pramList[7].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[7].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[7].costPercent)&&pramList[7].costPercent!=''||pramList[7].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[7].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[7].saleSquareCost)&&pramList[7].saleSquareCost!=''||pramList[7].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[7].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[7].compSaleSquareCost)&&pramList[7].compsaleSquareCost!=''||pramList[7].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--后续工程费-->
        <tr>
          <td><p>后续工程费</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[8].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[8].combinedPrice)&&pramList[8].combinedPrice!=''||pramList[8].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[8].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[8].costPercent)&&pramList[8].costPercent!=''||pramList[8].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[8].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[8].saleSquareCost)&&pramList[8].saleSquareCost!=''||pramList[8].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[8].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[8].compSaleSquareCost)&&pramList[8].compsaleSquareCost!=''||pramList[8].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--勘测设计费-->
        <tr>
          <td><p>勘测设计费</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[9].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[9].combinedPrice)&&pramList[9].combinedPrice!=''||pramList[9].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[9].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[9].costPercent)&&pramList[9].costPercent!=''||pramList[9].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[9].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[9].saleSquareCost)&&pramList[9].saleSquareCost!=''||pramList[9].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[9].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[9].compSaleSquareCost)&&pramList[9].compsaleSquareCost!=''||pramList[9].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--三通一平费-->
        <tr>
          <td><p>三通一平费</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[10].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[10].combinedPrice)&&pramList[10].combinedPrice!=''||pramList[10].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[10].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[10].costPercent)&&pramList[10].costPercent!=''||pramList[10].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[10].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[10].saleSquareCost)&&pramList[10].saleSquareCost!=''||pramList[10].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[10].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[10].compSaleSquareCost)&&pramList[10].compsaleSquareCost!=''||pramList[10].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--基础设施费-->
        <tr>
          <td><p>基础设施费</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[11].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[11].combinedPrice)&&pramList[11].combinedPrice!=''||pramList[11].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[11].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[11].costPercent)&&pramList[11].costPercent!=''||pramList[11].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[11].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[11].saleSquareCost)&&pramList[11].saleSquareCost!=''||pramList[11].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[11].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[11].compSaleSquareCost)&&pramList[11].compsaleSquareCost!=''||pramList[11].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--配套设施费-->
        <tr>
          <td><p>配套设施费</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[12].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[12].combinedPrice)&&pramList[12].combinedPrice!=''||pramList[12].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[12].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[12].costPercent)&&pramList[12].costPercent!=''||pramList[12].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[12].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[12].saleSquareCost)&&pramList[12].saleSquareCost!=''||pramList[12].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[12].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[12].compSaleSquareCost)&&pramList[12].compsaleSquareCost!=''||pramList[12].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--不可预见费-->
        <tr>
          <td><p>不可预见费</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[13].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[13].combinedPrice)&&pramList[13].combinedPrice!=''||pramList[13].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[13].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[13].costPercent)&&pramList[13].costPercent!=''||pramList[13].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[13].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[13].saleSquareCost)&&pramList[13].saleSquareCost!=''||pramList[13].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[13].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[13].compSaleSquareCost)&&pramList[13].compsaleSquareCost!=''||pramList[13].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
        <!--项目总成本-->
        <tr>
          <td><p>项目总成本</p></td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[14].combinedPrice"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg4.test(pramList[14].combinedPrice)&&pramList[14].combinedPrice!=''||pramList[14].combinedPrice>1000000">请输入1~1000000的整数或四位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[14].costPercent"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg2.test(pramList[14].costPercent)&&pramList[14].costPercent!=''||pramList[14].costPercent>100">请输入0~100的整数或两位小数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[14].saleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder" v-if="!reg.test(pramList[14].saleSquareCost)&&pramList[14].saleSquareCost!=''||pramList[14].saleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
          <td class="position">
            <input type="text" :disabled="childParm.modAuth!=2" v-model="pramList[14].compSaleSquareCost"  class="input" placeholder="请输入">
            <span class="reminder"  v-if="!reg.test(pramList[14].compSaleSquareCost)&&pramList[14].compsaleSquareCost!=''||pramList[14].compSaleSquareCost>1000000">请输入0~1000000的整数</span>
          </td>
        </tr>
      </table>

    </div>
    <!--提示-->
    <transition name="fade">
      <p class="tanTip" v-if="hintIsShow">{{hintMessage}}</p>
    </transition>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        isShow: true,
        hintMessage: '', // 提示函数文本
        hintIsShow: false, // 提示信息框显示隐藏
        pramList: [
          {id: 0, indexItems: 'preTaxCost', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''},  // 税前项目成本
          {id: 0, indexItems: 'developCost', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 开发成本
          {id: 0, indexItems: 'landGainPrice', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 土地获得款价
          {id: 0, indexItems: 'manageCost', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 行政及经营性收费
          {id: 0, indexItems: 'mainBodyCost', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 主体建安费
          {id: 0, indexItems: 'environmentalCost', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 环境景观工程费
          {id: 0, indexItems: 'EngineerCost', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 工程相关费
          {id: 0, indexItems: 'periodCost', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 期间费用
          {id: 0, indexItems: 'SubsequentConstructionCost', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 后续工程费
          {id: 0, indexItems: 'surveyDesignCost', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 勘测设计费
          {id: 0, indexItems: 'LevelingFee', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 三通一平费
          {id: 0, indexItems: 'InfrastructureFee', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 基础设施费
          {id: 0, indexItems: 'facilitiesFee', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 配套设施费
          {id: 0, indexItems: 'accidentalCost', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}, // 不可预见费用
          {id: 0, indexItems: 'proTotalCost', combinedPrice: '', costPercent: '', saleSquareCost: '', compSaleSquareCost: ''}// 项目总成本
        ],
        textList: ['税前项目成本', '开发成本', '土地获得款价', '行政及经营性收费', '主体建安费', '环境景观工程费', '工程相关费', '期间费用', '后续工程费', '勘测设计费', '三通一平费', '基础设施费', '配套设施费', '不可预见费用', '项目总成本'],
        labelList: [],
        backups: ['preTaxCost', 'developCost', 'landGainPrice', 'manageCost', 'mainBodyCost', 'environmentalCost', 'EngineerCost', 'periodCost', 'SubsequentConstructionCost', 'surveyDesignCost', 'LevelingFee', 'InfrastructureFee', 'facilitiesFee', 'accidentalCost', 'proTotalCost'],
        projectId: '', // 接收ID
        reg4: /^\d+(\.\d{1,4})?$/, // 正则校验 :正整数,保留4位小数
        reg2: /^\d+(\.\d{1,2})?$/, // 正则校验 :正整数,保留2位小数
        reg: /^[0-9]*$/ // 正则校验 :正整数
      }
    },
    methods: {
      // 关闭函数
      close () {
        var that = this
        this.cancelDialogue(function () {
          that.$emit('cancelThePage', 1)
        })
      },
      submit () {
        let pram = this.pramList
        let that = this
        // 添加判断:当点击提交的时候如果所有值为空或者填入的值符合需求则提交成功
        for (let i = 0; i < pram.length; i++) {
          if (!this.reg4.test(pram[i].combinedPrice) && pram[i].combinedPrice !== '' || pram[i].combinedPrice > 1000000) {
            this.hint('请输入正确的' + that.textList[i] + '合价')
            return
          }
          if (!this.reg2.test(pram[i].costPercent) && pram[i].costPercent !== '' || pram[i].costPercent > 100) {
            this.hint('请输入正确的' + that.textList[i] + '成本占比')
            return
          }
          if (!this.reg.test(pram[i].saleSquareCost) && pram[i].saleSquareCost !== '' || pram[i].saleSquareCost > 1000000) {
            this.hint('请输入正确的' + that.textList[i] + '可售单方成本')
            return
          }
          if (!this.reg.test(pram[i].compSaleSquareCost) && pram[i].compSaleSquareCost !== '' || pram[i].compSaleSquareCost > 1000000) {
            this.hint('请输入正确的' + that.textList[i] + '对标口径单方成本')
            return
          } else {
            if (i == pram.length - 1) {
              this.add(pram)
            }
          }
        }
      },
      // 添加接口调通;
      add (obj) {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/project/saveProjectPartially',
          data: {'projectId': that.projectId, 'title': 'proCost', 'detail': {projectCost: obj}}
        }).then(function (succeed) {
          if (succeed.data.code === 200 || succeed.data.code === '200') {
            //保存成功提示公共方法
            that.saveSuccessDialogue()
            //保存成功退出当前页面公共方法
            that.$emit('cancelThePage', 2)
          }else {
            //保存失败提示公共方法
            that.saveError()
          }
          // console.log(succeed)
        }, function (err) {
          console.log(err)
        })
      },
      // 查询数据接口
      acquire (parm) {
        let that = this
        this.$http({
          method: 'post',
          url: 'longcity/services/v1/project/getMenuDetail',
          data: {projectId: parm, titleKey: ['proCost']}
        }).then(function (succeed) {
          let list = succeed.data.result.proCost.projectCost
          if (list.length < 1) {
            return
          }
          for (let i = 0; i < that.pramList.length; i++) {
            for (let j = 0; j < list.length; j++) {
              if (that.pramList[i].indexItems == list[j].indexItems) {
                if (list[j].combinedPrice == undefined) {
                  list[j].combinedPrice = ''
                }
                if (list[j].costPercent == undefined) {
                  list[j].costPercent = ''
                }
                if (list[j].saleSquareCost == undefined) {
                  list[j].saleSquareCost = ''
                }
                if (list[j].compSaleSquareCost == undefined) {
                  list[j].compSaleSquareCost = ''
                }
                that.pramList[i] = list[j]
                break
              }
            }
          }
          let arr = []
          for (let i = 0; i < that.pramList.length; i++) {
            arr.push(that.pramList[i])
          }
          that.pramList = arr
        }, function (err) {
          console.log(err)
        })
      },
      // 从父元素获取id方法
      run (fun, parm) {
        if (fun == 'getId') {
          this.projectId = parm
          this.acquire(parm)
        }
      },
      // 提示函数
      hint (message) {
        let that = this
        this.hintIsShow = true
        that.hintMessage = message
        setTimeout(function () {
          that.hintIsShow = false
        }, 2600)
        //clearTimeout()
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #costOperation{width:100%;}
  #conMod{width:100%;overflow:auto}
  #costOperation{
    /*placeholder颜色*/
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #999;}
    .contentBoxTop{width:100%;background-color:#fff;}
    .contentBoxTop {
      .projectFixed{height:50px;line-height:50px;position:relative;text-indent:17px;font-size:16px;color:#444;}
      .projectFixed:before{display:block;content:'';height:16px;width:3px;background-color:#67649F;position:absolute;top:17px;left:0;}
      .projectCostTab{width:98%;border:1px solid #ddd;margin:0 auto;}
      .projectCostTab tr th{background: #E2E2ED;border-radius: 4px 4px 0 0;border:none;color:#67649F;}
      .width15{width:12%}
      .projectCostTab tr th>p,.projectCostTab tr td>p{line-height:20px;font-size:12px;}
      .projectCostTab tr td{border:1px solid #ddd;text-align:center;line-height:60px;font-size:12px;}
      .projectCostTab tr .position{position:relative;vertical-align:top;}
      .projectCostTab tr .input{width:80%;height:28px;line-height:24px;text-indent:10px;}
      .projectCostTab tr .input:hover{border-color:#8391a5;}
      .projectCostTab tr .input:focus{border-color:#20a0ff;}
      .projectCostTab tr .reminder{position:absolute;width:100%;line-height:16px;font-size:12px;color:red;bottom:0;left:0;letter-spacing:-1px;}
      /*动画*/
      .fade-enter-active, .fade-leave-active {transition: all 0.5s ease-out;}

      .fade-enter, .fade-leave-active {opacity: 0;}
    }
  }
</style>
