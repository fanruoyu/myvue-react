<template>
  <div id="productInfo" >
      <div class="closeNav">
        <p class=" tit fl" :title="childParm.projectName">{{childParm.projectName}}</p>
        <div v-if="btnNone==true">
          <span class="closeButton fl" @click="close">关闭</span>
          <span class="saveButton fl"  @click="saveProjectInfo">保存</span>
        </div>
        <div v-else="btnNone==false">
          <span class="closeButton fr" @click="close">关闭</span>
        </div>
      </div>
      <div id="conMod">
        <div class="title f18">产品信息</div>
        <div class="img-box">
           <div style="height:40px;line-height:40px">产品信息图片</div>
           <heavy-imageManagement
              @componentDataSynchronization="componentDataSynchronization"
             :picturesRef="product_info_menu_pic"
             :btnNone="btnNone" 
             :dictionariesList="dictionariesList" 
             :dictionariesTitle="dictionariesTitle">
           </heavy-imageManagement>
        </div>
        <div class="main1" id="main1">
          <div class="main1-1">
            <div class="tit color-4 f16">住宅面积(地上+地下)</div>
            <div class="con">
                <div class="level-1" style="text-align:center;position:relative">
                  <span>住宅面积(地上+地下)</span>
                  <input type="text" name="" placeholder="请输入" v-model="datas.houseArea" :disabled="disabledFlag"> 平米
                  <label  style="left:400px" v-if="datas.houseArea!=undefined && datas.houseArea!='' && !reg.test(datas.houseArea)">请输入整数或两位小数</label>
                </div>
                <div class="branch1">
                  <span style="border-left:0px"></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="level-2">
                  <span>销售住宅面积</span>
                  <span>自持住宅面积</span>
                  <span>政策性住房</span>
                  <span>商品住房</span>
                </div>
                <div class="level-3" style="margin-top:20px;position:relative">
                  <input type="text" name="" placeholder="请输入"  v-model="datas.saleArea" :disabled="disabledFlag"> 平米
                  <label  style="left:30px" v-if="datas.saleArea!=undefined && datas.saleArea!='' && !reg.test(datas.saleArea)">请输入整数或两位小数</label>
                  <input type="text" name="" placeholder="请输入"  v-model="datas.selfHouseArea" :disabled="disabledFlag"> 平米
                  <label  style="left:240px" v-if="datas.selfHouseArea!=undefined &&datas.selfHouseArea!='' && !reg.test(datas.selfHouseArea)">请输入整数或两位小数</label>
                  <input type="text" name="" placeholder="请输入"  v-model="datas.policyRelatedHouse" :disabled="disabledFlag"> 平米
                  <label  style="left:440px" v-if="datas.policyRelatedHouse!=undefined && datas.policyRelatedHouse!='' && !reg.test(datas.policyRelatedHouse)">请输入整数或两位小数</label>
                  <input type="text" name="" placeholder="请输入"  v-model="datas.commodityHousing" :disabled="disabledFlag"> 平米
                  <label  style="left:640px" v-if="datas.commodityHousing!=undefined && datas.commodityHousing!='' && !reg.test(datas.commodityHousing)">请输入整数或两位小数</label>
                </div>
                <div class="branch2"></div>
                <div class="branch3"></div>
                <div class="level-4">
                  <span>还建住宅</span>
                  <span>其他住宅</span>
                </div>
                <div class="level-6" style="margin-top:20px;position:relative">
                  <input type="text" name="" placeholder="请输入"  v-model="datas.repayHouse" :disabled="disabledFlag"> 平米
                  <label  style="left:160px" v-if="datas.repayHouse!=undefined && datas.repayHouse!='' && !reg.test(datas.repayHouse)">请输入整数或两位小数</label>
                  <input type="text" name="" placeholder="请输入" style="margin-left:205px"  v-model="datas.otherHouse" :disabled="disabledFlag"> 平米
                  <label  style="left:520px" v-if="datas.otherHouse!=undefined && datas.otherHouse!='' && !reg.test(datas.otherHouse)">请输入整数或两位小数</label>
                </div>
                <div class="branch4"></div>
                <div class="branch5">
                  <span class="fl"></span>
                  <span class="fr"></span>
                </div>
                <div class="level-7">
                  <span>有偿还建</span>
                  <span>无偿还建</span>
                  <span>有偿还建</span>
                  <span>无偿还建</span>
                </div>
                <div class="level-8" style="margin-top:20px;position:relative">
                  <input type="text" name="" placeholder="请输入"  v-model="datas.repayHousePay" :disabled="disabledFlag"> 平米
                   <label  style="left:30px" v-if="datas.repayHousePay!=undefined && datas.repayHousePay!='' && !reg.test(datas.repayHousePay)">请输入整数或两位小数</label>
                  <input type="text" name="" placeholder="请输入"  v-model="datas.repayHouseFree" :disabled="disabledFlag"> 平米
                  <label  style="left:240px" v-if="datas.repayHouseFree!=undefined && datas.repayHouseFree!='' && !reg.test(datas.repayHouseFree)">请输入整数或两位小数</label>
                  <input type="text" name="" placeholder="请输入"  v-model="datas.otherHousePay" :disabled="disabledFlag"> 平米
                  <label  style="left:440px" v-if="datas.otherHousePay!=undefined && datas.otherHousePay!='' && !reg.test(datas.otherHousePay)">请输入整数或两位小数</label>
                  <input type="text" name="" placeholder="请输入"
                   v-model="datas.otherHouseFree" :disabled="disabledFlag"> 平米
                   <label  style="left:640px" v-if="datas.otherHouseFree!=undefined && datas.otherHouseFree!='' && !reg.test(datas.otherHouseFree)">请输入整数或两位小数</label>
                </div>
            </div>
          </div>
          <div class="main1-2">
            <div class="tit color-4 f16">商业面积(地上+地下)</div>
            <div class="con">
              <div class="level-1" style="text-align:center;position:relative">
                  <span>商业面积(地上+地下)</span>
                  <input type="text" name="" placeholder="请输入"  v-model="datas.commercialArea" :disabled="disabledFlag"> 平米
                  <label  style="left:410px" v-if="datas.commercialArea!=undefined && datas.commercialArea!='' && !reg.test(datas.commercialArea)">请输入整数或两位小数</label>
                </div>
                <div class="branch1"></div>
                <div class="level-2">
                  <span>常规公建</span>
                  <span>创新公建</span>
                </div>
                <div class="level-3" style="margin-top:20px;position:relative">
                  <input type="text" name="" placeholder="请输入"  v-model="datas.generalPublic" :disabled="disabledFlag"> 平米
                  <label  style="left:160px" v-if="datas.generalPublic!=undefined && datas.generalPublic!='' && !reg.test(datas.generalPublic)">请输入整数或两位小数</label>
                  <input type="text" name="" placeholder="请输入" style="margin-left:205px" v-model="datas.InnovationPublic" :disabled="disabledFlag"> 平米
                  <label  style="left:520px" v-if="datas.InnovationPublic!=undefined && datas.InnovationPublic!='' && !reg.test(datas.InnovationPublic)">请输入整数或两位小数</label>
                </div>
                <div class="branch2"></div>
                <div class="branch3">
                  <span class="fl"></span>
                  <span class="fr"></span>
                </div>
                <div class="level-4">
                  <span style="margin-left:22px">销售</span>
                  <span style="margin-left:50px">自持</span>
                  <span style="margin-left:60px">销售</span>
                  <span style="margin-left:50px">自持</span>
                </div>
                <div class="level-5" style="margin-top:20px;position:relative">
                  <input type="text" name="" placeholder="请输入"  v-model="datas.generalSaleArea" :disabled="disabledFlag"> 平米
                  <label  style="left:20px" v-if="datas.generalSaleArea!=undefined && datas.generalSaleArea!='' && !reg.test(datas.generalSaleArea)">请输入整数或两位小数</label>
                  <input type="text" style="margin-left:52px" name="" placeholder="请输入"  v-model="datas.generalSelfArea" :disabled="disabledFlag"> 平米
                  <label  style="left:220px" v-if="datas.generalSelfArea!=undefined && datas.generalSelfArea!='' && !reg.test(datas.generalSelfArea)">请输入整数或两位小数</label>
                  <input type="text" style="margin-left:60px" name="" placeholder="请输入" v-model="datas.InnovationSaleArea" :disabled="disabledFlag"> 平米
                  <label  style="left:430px" v-if="datas.InnovationSaleArea!=undefined && datas.InnovationSaleArea!='' && !reg.test(datas.InnovationSaleArea)">请输入整数或两位小数</label>
                  <input type="text" style="margin-left:54px" name="" placeholder="请输入"  v-model="datas.InnovationSelfArea" :disabled="disabledFlag"> 平米
                  <label  style="left:630px" v-if="datas.InnovationSelfArea!=undefined && datas.InnovationSelfArea!='' && !reg.test(datas.InnovationSelfArea)">请输入整数或两位小数</label>
                </div>
                <div class="flagBox" style="position:relative">
                  <div class="level-6" style="margin-top:20px;position:relative">
                    <span>商场</span>
                    <input type="text" name="" placeholder="请输入"  v-model="datas.generalSaleMarketArea" :disabled="disabledFlag"> 平米
                    <label  style="left:30px" v-if="datas.generalSaleMarketArea!=undefined && datas.generalSaleMarketArea!='' && !reg.test(datas.generalSaleMarketArea)">请输入整数或两位小数</label>
                    <span>商场</span>
                    <input type="text" name="" placeholder="请输入"  v-model="datas.generalSelfMarketArea" :disabled="disabledFlag"> 平米
                    <label  style="left:230px" v-if="datas.generalSelfMarketArea!=undefined && datas.generalSelfMarketArea!='' && !reg.test(datas.generalSelfMarketArea)">请输入整数或两位小数</label>
                    <span>长租公寓</span>
                    <input type="text" name="" placeholder="请输入"  v-model="datas.InnovationSaleHouseArea" :disabled="disabledFlag"> 平米
                    <label  style="left:440px" v-if="datas.InnovationSaleHouseArea!=undefined && datas.InnovationSaleHouseArea!='' && !reg.test(datas.InnovationSaleHouseArea)">请输入整数或两位小数</label>
                    <span>长租公寓</span>
                    <input type="text" name="" placeholder="请输入" v-model="datas.InnovationSelfHouseArea" :disabled="disabledFlag"> 平米
                    <label  style="left:640px" v-if="datas.InnovationSelfHouseArea!=undefined && datas.InnovationSelfHouseArea!='' && !reg.test(datas.InnovationSelfHouseArea)">请输入整数或两位小数</label>
                  </div>
                  <div class="level-7" style="margin-top:20px;position:relative">
                    <span>酒店</span>
                    <input type="text" name="" placeholder="请输入"  v-model="datas.generalSaleHotelArea" :disabled="disabledFlag"> 平米
                    <label  style="left:30px" v-if="datas.generalSaleHotelArea!=undefined && datas.generalSaleHotelArea!='' && !reg.test(datas.generalSaleHotelArea)">请输入整数或两位小数</label>
                    <span>酒店</span>
                    <input type="text" name="" placeholder="请输入"  v-model="datas.generalSelfHotelArea" :disabled="disabledFlag"> 平米
                    <label  style="left:230px" v-if="datas.generalSelfHotelArea!=undefined && datas.generalSelfHotelArea!='' && !reg.test(datas.generalSelfHotelArea)">请输入整数或两位小数</label>
                    <span>联合办公</span>
                    <input type="text" name="" placeholder="请输入"  v-model="datas.InnovationSaleOfficeArea" :disabled="disabledFlag"> 平米
                    <label  style="left:440px" v-if="datas.InnovationSaleOfficeArea!=undefined && datas.InnovationSaleOfficeArea!='' && !reg.test(datas.InnovationSaleOfficeArea)">请输入整数或两位小数</label>
                    <span>联合办公</span>
                    <input type="text" name="" placeholder="请输入"  v-model="datas.InnovationSelfOfficeArea" :disabled="disabledFlag"> 平米
                    <label  style="left:640px" v-if="datas.InnovationSelfOfficeArea!=undefined &&datas.InnovationSelfOfficeArea!='' && !reg.test(datas.InnovationSelfOfficeArea)">请输入整数或两位小数</label>
                  </div>
                  <div class="level-8" style="margin-top:20px;position:relative">
                    <span>写字楼</span>
                    <input type="text" name="" placeholder="请输入"  v-model="datas.generalSaleOfficeArea" :disabled="disabledFlag"> 平米
                    <label  style="left:30px" v-if="datas.generalSaleOfficeArea!=undefined && datas.generalSaleOfficeArea!='' && !reg.test(datas.generalSaleOfficeArea)">请输入整数或两位小数</label>
                    <span>写字楼</span>
                    <input type="text" name="" placeholder="请输入"  v-model="datas.generalSelfOfficeArea" :disabled="disabledFlag"> 平米
                    <label  style="left:230px" v-if="datas.generalSelfOfficeArea!=undefined && datas.generalSelfOfficeArea!='' && !reg.test(datas.generalSelfOfficeArea)">请输入整数或两位小数</label>
                  </div>
                  <div class="flag flag1">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div class="flag flag2">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div class="flag flag3">
                    <span></span>
                    <span></span>
                  </div>
                  <div class="flag flag4">
                    <span></span>
                    <span></span>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="main2" id="main2">
          <div class="main2-top">
             <ul>
               <li style="position:relative">
                 <span>容积率设计值</span>
                 <input type="text" name="" placeholder="请输入"  v-model="datas.plotRatioDesign" :disabled="disabledFlag">
                 <label  v-if="datas.plotRatioDesign!=undefined && datas.plotRatioDesign!='' && !reg.test(datas.plotRatioDesign)">请输入整数或两位小数</label>
               </li>
               <li style="position:relative">
                 <span>建筑密度设计值(%)</span>
                 <input type="text" name="" placeholder="请输入"  v-model="datas.buildDensity" :disabled="disabledFlag">
                 <label  v-if="datas.buildDensity!=undefined && datas.buildDensity!='' && !reg.test(datas.buildDensity)">请输入整数或两位小数</label>
               </li >
               <li style="position:relative">
                 <span>地下建筑面积</span>
                 <input type="text" name="" placeholder="请输入"  v-model="datas.undergroundBuildArea" :disabled="disabledFlag">平米
                 <label  v-if="datas.undergroundBuildArea!=undefined && datas.undergroundBuildArea!='' && !reg.test(datas.undergroundBuildArea)">请输入整数或两位小数</label>
               </li>
             </ul>
             <ul>
               <li style="position:relative">
                 <span>绿地率设计值(%)</span>
                 <input type="text" name="" placeholder="请输入"  v-model="datas.greenRate" :disabled="disabledFlag">
                 <label  v-if="datas.greenRate!=undefined && datas.greenRate!='' && !reg.test(datas.greenRate)">请输入整数或两位小数</label>
               </li>
               <li style="position:relative">
                 <span>地上建筑面积</span>
                 <input type="text" name="" placeholder="请输入"  v-model="datas.overgroundBuildArea" :disabled="disabledFlag"> 平米
                  <label v-if="datas.overgroundBuildArea!=undefined && datas.overgroundBuildArea!='' && !reg.test(datas.overgroundBuildArea)">请输入整数或两位小数</label>
               </li>
             </ul>
          </div>
          <div class="main2-bottom">
            <span>总建议</span>
            <textarea maxlength="140" placeholder="请输入" v-model="datas.generalAdvice" :disabled="disabledFlag">
            </textarea>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import { Message } from 'element-ui'
  import heavyImageManagement from '../../components/heavyImageManagement'
  export default {
    name: 'productInfo',
    components: {
      heavyImageManagement
    },
    data() {
      return {
        reg: /^\d+(\.\d{1,2})?$/, // 正则校验 :正整数,保留2位小数
        projectId:'',
        btnNone:false,          //true 显示
        disabledFlag:true,     //disabled 不可编辑
        datas:'',
        product_info_menu_pic:[],
        dictionariesTitle:'',
        dictionariesList:[],
        flag:false
      }
    },
    methods:{
      /*
      ** id: 项目id号
      ** modAuth: 0|1|2 (0没权限，1只可读，2可读可写)
      */
      run(fun,id,modAuth){
      },
      componentDataSynchronization(imgData){
        this.product_info_menu_pic=imgData;
      },
      /**
      **  获取产品信息
      **  titleKey["proProductInfo"]
      **/
      getProjectInfo(projectId){
        var that=this;
        that.projectId=projectId;
        var titleKey=["proProductInfo"];
        this.$http.post('/longcity/services/v1/project/getMenuDetail',{
          "projectId":that.projectId,
          "titleKey":titleKey
        })
        .then(
          success=>{
            if(success.data.code==200 || success.data.code=="200"){
              this.datas=success.data.result.proProductInfo;
              /*theInitImgData 将数据传递给subImg*/
              this.product_info_menu_pic=success.data.result.proProductInfo.product_info_menu_pic;
              this.getImgTag();
            }
          },
        );
      },
      getImgTag(){
        this.$http.post('/longcity/services/v1/dict/dictListByType',{
           "dictTypes":["product_info_menu_pic"]
        })
        .then(
          success=>{
            if(success.data.code==200 || success.data.code=="200"){
              this.dictionariesTitle='product_info_menu_pic';
              this.dictionariesList =success.data.result[0].items // 保留字典关键字数组;
            }
          },
        );
      },
      saveProjectInfo(){
        var labelLen=document.getElementById("main1").getElementsByTagName("label").length;
        var label2Len=document.getElementById("main2").getElementsByTagName("label").length;
        var flag=(labelLen+label2Len);
        if(flag>0){
          alert("请您修改填写的错误项！"); 
          return false;
        }
        var that=this;
        this.datas.product_info_menu_pic=this.datas.product_info_menu_pic;
        var title="proProductInfo";
        this.$http.post('/longcity/services/v1/project/saveProjectPartially',{
          "projectId":that.projectId,
          "title":title,
          "detail":that.datas
        })
        .then(
          success=>{
            if(success.data.code==200 || success.data.code=="200"){
              this.saveSuccessDialogue();
              this.$emit('cancelThePage', 2);
            }else{
              this.saveError();
            }
          },
        );
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
      // 关闭函数
      close () {
        var that=this;
        this.cancelDialogue(function(){
          that.$emit('cancelThePage', 1);
        });
      }
    },
    mounted(){
      this.getProjectInfo(this.childParm.id);
      this.setConHeight();
      this.isEdit();
    },
    props:   
    {
      childParm:Object
    }
  }
</script>
<style scoped>
  #conMod{
    width:100%;
    overflow: auto;
  }
  #productInfo input{
    width:100px;
    height:23px;
    padding:5px;
  }
  #productInfo .title{
    width:96%;
    height:40px;
    line-height:40px;
    color:#fff;
    color:#444;
    padding:0 2%;
    border-bottom:2px solid #f9f9f9;
  }
  #productInfo .img-box{
    width:92%;
    height:470px;
    background: #fff;
    margin-top:2px;
    padding:0 4%;
  }
  #productInfo .main1{
    margin-top:10px;
    width:100%;
    height:auto;
    background: #fff;
    border-top:10px solid #f9f9f9;
  }
  #productInfo .main1 .con{
     width:840px;
     height: auto;
     margin:0 auto;
  }
  #productInfo .main1 .con div,#productInfo .main2 .con div{
    width:100%;
    height:36px;
    /*margin-top:8px;*/
  }
  #productInfo .main1 .con p,#productInfo .main2 .con p{
    margin:0 auto;
  }
  #productInfo .main1 .main1-1,#productInfo .main1 .main1-2{
    width:96%;
    height:500px;
    padding:10px 2%;
  }
  #productInfo .main1 .main1-2{
    height:550px;
  }
  #productInfo .main1 .main1-1 .tit,
  #productInfo .main1 .main1-2 .tit{
    height:40px;
    line-height:40px;
  }
  #productInfo .main1 .main1-1{
    border-bottom:2px solid #f9f9f9;
  }
  #productInfo .main1 label{
    color:red;
    position: absolute;
    top:30px;
    left:0px;
  }
  #productInfo .main1 span{
    padding:5px;
    width:100px;
    text-align: center;
    color: #fff;
  }
  #productInfo .main2 label{
    color:red;
    position: absolute;
    top:25px;
    left:15px;
  }
  #productInfo .main1 .main1-1 .level-1 span,
  #productInfo .main1 .main1-2 .level-1 span
  {
    background: #494949;
    width:140px;
    margin-left:0px;
  }
  #productInfo .main1 .main1-1 .level-2 span,
  #productInfo .main1 .main1-2 .level-2 span
  {
    background: #29B7D5;
  }
  #productInfo .main1 .main1-1 .level-2 span{
    margin:0 35px 0 50px;
  }
  #productInfo .main1 .main1-1 .level-3 input{
    margin-left:50px;
  }
  #productInfo .main1 .main1-1 .level-4 span,
  #productInfo .main1 .main1-2 .level-4 span
  {
    background: #31D0B1;
  }
  #productInfo .main1 .main1-1 .level-4 span{
    margin-left:180px;
    margin-right:60px;
  }
  #productInfo .main1 .main1-1 .level-6 input{
    margin-left:180px;
  }

  #productInfo .main1 .main1-1 .level-7 span{
    background: #FA7043;
  }
  #productInfo .main1 .main1-1 .level-7 span{
    margin:0 35px 0 50px
  }
  #productInfo .main1 .main1-1 .level-8 input{
    margin-left:50px;
  }

  #productInfo .main1 .main1-2 .level-2 span{
    margin-left:180px;
    margin-right:60px;
  }
  #productInfo .main1 .main1-2 .level-3 input{
    margin-left:180px;
  }
  #productInfo .main1 .main1-2 .level-4 span{
    margin:0 35px 0 50px
  }
  #productInfo .main1 .main1-2 .level-5 input{
    margin-left:20px;
  }
  #productInfo .main1 .main1-2 .level-6 span,
  #productInfo .main1 .main1-2 .level-7 span,
  #productInfo .main1 .main1-2 .level-8 span{
    margin-left:30px;
    width:56px;
    background:#FA7043;
  }
  #productInfo .main1 .main1-2 .level-6 input,
  #productInfo .main1 .main1-2 .level-7 input,
  #productInfo .main1 .main1-2 .level-8 input{
     width:60px;
  }
  #productInfo .main2{
    width:100%;
    height:auto;
    border-top:2px solid #f9f9f9;
    padding-top:20px
  }
  #productInfo .main2-top ul{
    width:40%;
    float: left;
    padding:0 5%;

  }
  #productInfo .main2-top ul li{
    width:100%;
    height:35px;
    line-height:35px;
    margin-bottom:15px;
  }
  #productInfo .main2-top ul li span{
    display: inline-block;
     width:120px;
     height:35px;
     line-height:35px;
     text-align:right;
     overflow: hidden;
     float: left;
  }
  #productInfo .main2-top ul li input{
     float: left;
     margin-left:20px;
  }
  #productInfo .main2-bottom{
    clear: both;
    width:90%;
    height: 200px;
    padding:0 5%;
    padding-bottom:80px;
  }
  #productInfo .main2-bottom span{
    width:100px;
    display: inline-block;
    height:200px;
    line-height: 20px;
    text-align: right;
    float:left;
  }
  #productInfo .main2-bottom textarea{
    height:200px;
    width:70%;
    height:200px;
    padding: 5px;
    border:1px solid #bbb;
    border-radius: 4px;
    margin-left:30px;
    float:left;
    background:#f9f9f9;
  }
  #productInfo .main1 .main1-1 .branch1{
    width:620px;
    height:20px;
    border-top:1px solid #494949;
    border-left:1px solid #494949;
    border-right:1px solid #494949;
    margin-top:0px;
    margin-left:100px;
    margin-top:10px;
  }
  #productInfo .main1 .main1-1 .branch1 span{
    height:20px;
    width:200px;
    border-left:1px solid #494949;
    padding: 0px;
  }
  #productInfo .main1 .main1-1 .branch2{
    width:100px;
    height:20px;
    border-left:1px solid #31D0B1;
    margin-top:0px;
    margin-left:500px;
  }
  #productInfo .main1 .main1-1 .branch3{
    width:420px;
    height:20px;
    border-top:1px solid #31D0B1;
    border-left:1px solid #31D0B1;
    border-right:1px solid #31D0B1;
    margin-top:0px;
    margin-left:200px;
  }
  #productInfo .main1 .main1-1 .branch4{
    width:380px;
    height:20px;
    border-left:1px solid #FA7043;
    border-right:1px solid #FA7043;
    margin-top:0px;
    margin-left:220px;
  }
  #productInfo .main1 .main1-1 .branch5{
    width:600px;
    height:20px;
    margin-top:0px;
    margin-left:110px;
  }
  #productInfo .main1 .main1-1 .branch5 span{
    width:220px;
    height:20px;
    border-top:1px solid #FA7043;
    border-left:1px solid #FA7043;
    border-right:1px solid #FA7043;
    padding:0px;
  }
  #productInfo .main1 .main1-2 .branch1{
    width:400px;
    height:20px;
    border-top:1px solid #494949;
    border-left:1px solid #494949;
    border-right:1px solid #494949;
    margin-top:0px;
    margin-left:200px;
    margin-top:10px;
  }
  #productInfo .main1 .main1-2 .branch2{
    width:380px;
    height:20px;
    border-left:1px solid #31D0B1;
    border-right:1px solid #31D0B1;
    margin-top:0px;
    margin-left:220px;

  }
  #productInfo .main1 .main1-2 .branch3{
    width:620px;
    height:20px;
    margin-top:0px;
    margin-left:70px;
  }
  #productInfo .main1 .main1-2 .branch3 span{
    width:240px;
    height:20px;
    border-top:1px solid #31D0B1;
    border-left:1px solid #31D0B1;
    border-right:1px solid #31D0B1;
    padding:0px;
  }
  #productInfo .main1 .main1-2 .flag{
    width:1px;
    height:120px;
    position: absolute;
    background: #FA7043 ;
    top:-30px;
  }
  #productInfo .main1 .main1-2 .flag span{
     display: block;
     width:25px;
     height:1px;
     padding: 0px;
     background: #FA7043 ;
     margin-top:59px;
  }
  #productInfo .main1 .main1-2 .flag1{
    left:20px;
    height:180px;
  }
  #productInfo .main1 .main1-2 .flag2{
    left: 220px;
    height:180px;
  }
  #productInfo .main1 .main1-2 .flag3{
    left:428px;
  }
  #productInfo .main1 .main1-2 .flag4{
    left: 630px;
  }
   #productInfo .tabs  .el-tab-pane{
    height: 300px;
  }
</style>
