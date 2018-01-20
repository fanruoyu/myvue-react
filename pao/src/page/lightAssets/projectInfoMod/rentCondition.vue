<template>
  <div id="rentCondition">

    <div class="topArea">
      <el-col :span="12">
        <span class="contLabel">现状房间间数</span>
        <div class="cont">
          <input v-validate="{ regex: regbw }" :disabled="disabled" name="prjcRentRoomNumber"
                 v-model="proBusinessInfo.prjcRentRoomNumber"
                 :class="{'baseInput' : true, 'is-danger': errors.has('prjcRentRoomNumber')}"
                 placeholder="请输入"/>
          <div
            data-location="项目条件->租赁条件->现状房间间数"
            v-show="errors.has('prjcRentRoomNumber')"
            class="help">{{'注：整数，0~100万'}}
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <span class="contLabel">改造后可租赁房间数</span>
        <span class="contVal">{{proBusinessInfo.prodpositTotalModifiedRoom}}间</span>
      </el-col>
    </div>

    <div class="topArea">
      <el-col :span="12">
        <span class="contLabel">现状商铺租赁面积</span>
        <div class="cont">
          <input v-validate="{ regex: regbw2 }" :disabled="disabled" name="prjcRentArea"
                 v-model="proBusinessInfo.prjcRentArea"
                 :class="{'baseInput' : true, 'is-danger': errors.has('prjcRentArea')}"
                 placeholder="请输入"/>
          <div
            data-location="项目条件->租赁条件->现状商铺租赁面积"
            v-show="errors.has('prjcRentArea')"
            class="help">{{'注：保留2位小数，0~100万'}}
          </div>
          <span>平米</span>
        </div>
      </el-col>
      <el-col :span="12">
        <span class="contLabel">改造后商铺租赁面积</span>
        <span class="contVal">{{proBusinessInfo.prodpositBusinessRentArea}}平米</span>
      </el-col>
    </div>


    <div class="topArea">
      <div class="textareaBox">
        <el-col :span="12">
          <span class="contLabel">现有房间平均面积</span>
          <div class="cont">
            <input v-validate="{ regex: regbw2 }" :disabled="disabled" name="prjcExistRoomAvgArea"
                   v-model="proBusinessInfo.prjcExistRoomAvgArea"
                   :class="{'baseInput' : true, 'is-danger': errors.has('prjcExistRoomAvgArea')}"
                   placeholder="请输入"/>
            <div
              data-location="项目条件->租赁条件->现有房间平均建面"
              v-show="errors.has('prjcExistRoomAvgArea')"
              class="help">{{'注：保留2位小数，0~100万'}}
            </div>
            <span>平米</span>
          </div>
        </el-col>
        <el-col :span="12">
          <span class="contLabel">冠寓租赁年限</span>
          <div class="cont">
            <input v-validate="{ regex: regb1 }" :disabled="disabled" name="prjcYearsLease"
                   v-model="proBusinessInfo.prjcYearsLease"
                   :class="{'baseInput' : true, 'is-danger': errors.has('prjcYearsLease')}"
                   placeholder="请输入"/>
            <div
              data-location="项目条件->租赁条件->冠寓租赁年限"
              v-show="errors.has('prjcYearsLease')"
              class="help">{{'注：保留1位小数，0~100'}}
            </div>
            <span>年</span>
          </div>
        </el-col>
      </div>
    </div>


    <div class="topArea">
      <div class="textareaBox">
        <el-col :span="12">
          <span class="contLabel">免租期</span>
          <div class="cont">
            <input v-validate="{ regex: regb1 }" :disabled="disabled" name="prjcRentFreePerio"
                   v-model="proBusinessInfo.prjcRentFreePerio"
                   :class="{'baseInput' : true, 'is-danger': errors.has('prjcRentFreePerio')}"
                   placeholder="请输入"/>
            <div
              data-location="项目条件->租赁条件->免租期"
              v-show="errors.has('prjcRentFreePerio')"
              class="help">{{'注：保留1位小数，0~100'}}
            </div>
            <span>年</span>
          </div>
        </el-col>
        <el-col :span="12">
          <span class="contLabel">房屋剩余使用年限</span>

          <div class="cont">
            <input v-validate="{ regex: regb1 }" :disabled="disabled" name="prjcYearRemaining"
                   v-model="proBusinessInfo.prjcYearRemaining"
                   :class="{'baseInput' : true, 'is-danger': errors.has('prjcYearRemaining')}"
                   placeholder="请输入"/>
            <div
              data-location="项目条件->租赁条件->房屋剩余使用年限"
              v-show="errors.has('prjcYearRemaining')"
              class="help">{{'注：保留1位小数，0~100'}}
            </div>
            <span>年</span>
          </div>
        </el-col>

      </div>
    </div>


    <div class="topArea">
      <div class="textareaBox">
        <el-col :span="12">
          <span class="contLabel">获取形式</span>
          <input class="baseInput" :disabled="disabled" name="" v-model="proBusinessInfo.prjcGetForm"
                 placeholder="请输入"/>
          <span>年</span>
        </el-col>
        <el-col :span="12">
          <span class="contLabel">承租租金</span>
          <div class="cont">
            <input v-validate="{ regex: regbw2 }" :disabled="disabled" name="prjcTenantRent"
                   v-model="proBusinessInfo.prjcTenantRent"
                   :class="{'baseInput' : true, 'is-danger': errors.has('prjcTenantRent')}"
                   placeholder="请输入"/>
            <div
              data-location="项目条件->租赁条件->现状商铺租赁面积"
              v-show="errors.has('prjcTenantRent')"
              class="help">{{'注：保留2位小数，0~100万'}}
            </div>
            <span> 元/平米·天</span>
          </div>

        </el-col>
      </div>
    </div>


    <div class="topArea">
      <div class="textareaBox">
        <el-col :span="12">
          <span class="contLabel">租金支付方式</span>
          <span>
              <span>押</span>
             <div class="cont">
              <input v-validate="{ regex: regb }" :disabled="disabled" name="yaMonth"
                     v-model="yaMonth"
                     :class="{'smallInput' : true, 'is-danger': errors.has('yaMonth')}"
                     placeholder="月"/>
              <div
                data-location="项目条件->租赁条件->租金支付方式"
                v-show="errors.has('yaMonth')"
                class="help">{{'注：整数，0~100'}}
              </div>
            </div>
              <span>付</span>
             <div class="cont">
              <input v-validate="{ regex: regb }" :disabled="disabled" name="fuMonth"
                     v-model="fuMonth"
                     :class="{'smallInput' : true, 'is-danger': errors.has('fuMonth')}"
                     placeholder="月"/>
              <div
                data-location="项目条件->租赁条件->租金支付方式"
                v-show="errors.has('fuMonth')"
                class="help">{{'注：整数，0~100'}}
              </div>
            </div>

            </span>

          <span>年</span>
        </el-col>
        <el-col :span="12">
          <span class="contLabel">交付我司日期</span>
          <el-date-picker
            :disabled="disabled"
            :editable=false
            value-format="yyyy-MM-dd"
            :default-value="proBusinessInfo.prjcOurDeliveryDate"
            v-model="dateValue1"
            type="date"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-col>
      </div>
    </div>


    <div class="topArea">
      <div class="textareaBox">
        <el-col :span="12">
          <span class="contLabel">预计开业日期</span>
          <el-date-picker
            :disabled="disabled"
            :editable=false
            value-format="yyyy-MM-dd"
            :default-value="proBusinessInfo.prjcPlanToHandOverTime"
            v-model="dateValue2"
            type="date"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-col>
        <el-col :span="12">

        </el-col>
      </div>
    </div>


  </div>


</template>
<script>


  export default {
    name: 'rentCondition',
    props: ['title', 'disabled', 'proBusinessInfo'],
    data() {
      return {
        yaMonth: '',
        fuMonth: '',
        dateValue1: '',
        dateValue2: '',
        regbw: /^(\d{1,6}|1000000)$/,//0-1000000
        regbw2: /^(\d{1,6})(\.\d{1,2})?$/, // 正则校验 :保留2位小数0-1000000
        regb1: /^(\d{1,2})(\.\d)?$/, // 正则校验 :保留1位小数0-100
        regb: /^\d{1,2}|100$/, // 正则校验 :正整数 0-100

      }
    },

    computed: {
      prjcRentPayment: function () {
        let rt = [];
        this.yaMonth && rt.push[this.yaMonth];
        this.fuMonth && rt.push[this.fuMonth];
        return rt.join(',')
      }
    },

    watch: {
      prjcRentPayment: function (dt) {
        proBusinessInfo.prjcRentPayment = dt
      }
    },

    updated() {

    },


    mounted() {


    },


    watch: {

      dateValue1: function (da) {
        let year = da.getFullYear();
        let month = da.getMonth() + 1;
        let date = da.getDate();
        date = (date + '').length == 1 ? '0' + date : date;
        this.proBusinessInfo.prjcOurDeliveryDate = [year, month, date].join('-')
      },
      dateValue2: function (da) {
        let year = da.getFullYear();
        let month = da.getMonth() + 1;
        let date = da.getDate();
        date = (date + '').length == 1 ? '0' + date : date;
        this.proBusinessInfo.prjcPlanToHandOverTime = [year, month, date].join('-')
      }
    },

    methods: {


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
  @import 'common';

  #rentCondition {

    padding: 10px 20px;

    .contLabel {
      width: 130px;
      text-align: right;
      float: left;
      margin-right: 10px;

    }
    .cont {
      display: inline-block;
      height: 45px
    }

    .contVal {
      color: #999;
      margin-left: 10px;

    }
  }


</style>
