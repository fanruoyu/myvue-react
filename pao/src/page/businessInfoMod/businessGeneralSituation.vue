<template>
  <div id="businessGeneralSituation">
    <p class="title">收并购及合作概况</p>

    <div class="content">
      <div class="inputs">
        <ul>
          <li style="width:100%">
            <span class="ll">操盘方</span>
            <div class="textareaBox">
              <textarea :disabled="disabled" name="" v-model="proBusinessInfo.runParty" class="decision"
                  placeholder="请输入" maxlength="64"></textarea>
              <span class="statistics">{{proBusinessInfo.runParty ? proBusinessInfo.runParty.length : 0}}/64</span>
            </div>
          </li>
          <li>
            <span>合作及退出方式</span>
            <el-select :disabled="disabled" class="sel" v-model="proBusinessInfo.commercialCooperationWay"
                       placeholder="请选择">
              <el-option
                v-for="item in commercialCooperationWayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
        <ul>
          <li>
            <span>我方股权比例</span>
            <div style="display:inline-block;">
              <input v-validate="{ regex: reg2 }" :class="{'input': true, 'is-danger': errors.has('我方股权比例')}"
                     :disabled="disabled" type="text" v-model="proBusinessInfo.ourStake" name="我方股权比例"
                     placeholder="请输入">
              <div v-show="errors.has('我方股权比例')&&proBusinessInfo.ourStake!=''||proBusinessInfo.ourStake>100" class="help">{{'保留两位小数,0~100'}}</div>
            </div>
            <p class="xiushi">%</p>
          </li>
          <li style="width:100%">
            <span class="ll">并表方</span>
            <div class="textareaBox">
              <textarea :disabled="disabled" name="" v-model="proBusinessInfo.andTable" class="decision"
                        placeholder="请输入" maxlength="64"></textarea>
              <span class="statistics">{{proBusinessInfo.andTable ? proBusinessInfo.andTable.length : 0}}/64</span>
            </div>
          </li>
        </ul>

      </div>
      <div class="tree">
        <p class="subtitle">操盘费用</p>
        <div class="caopancontent">
          <div class="cp">
            <span>操盘费用</span>
            <span class="cpFee">
              <label>{{proBusinessInfo.tradeCost}}</label>
            </span>
            <span>万元</span>
          </div>
          <organizationStructure style="width:500px" :width="500" :num="3"></organizationStructure>
          <div style="overflow: auto">
            <div class="leaf">
              <label class="name">管理费包干</label>
              <div style="overflow: hidden">
                <input v-validate="{ regex: reg4 }" name="管理费包干"
                       :class="{'input': true, 'is-danger': errors.has('管理费包干')}" type="text" :disabled="disabled"
                       v-model="managementFee"
                       placeholder="请输入"/>
                <div v-show="errors.has('管理费包干')&&managementFee!=''||managementFee>1000000" class="help">{{'保留4位小数，0~1000000'}}</div>
                <span class="textfix">万元</span>
              </div>
            </div>
            <div class="leaf leaf-1">
              <label class="name">销售费包干</label>
              <input v-validate="{ regex: reg4 }" name="销售费包干"
                     :class="{'input': true, 'is-danger': errors.has('销售费包干')}" type="text" :disabled="disabled"
                     v-model="saleFee"
                     placeholder="请输入"/>
              <div v-show="errors.has('销售费包干')&&saleFee!=''||saleFee>1000000" class="help">{{'保留4位小数，0~1000000'}}</div>

              <span class="textfix">万元</span>
            </div>
            <div class="leaf leaf-1">
              <label class="name">其他费用及奖励</label>
              <input v-validate="{ regex: reg4 }" name="其他费用及奖励"
                     :class="{'input': true, 'is-danger': errors.has('其他费用及奖励')}" type="text" :disabled="disabled"
                     v-model="otherTradersReward"
                     placeholder="请输入"/>
              <div v-show="errors.has('其他费用及奖励')&&otherTradersReward!=''||otherTradersReward>1000000" class="help">{{'保留4位小数，0~1000000'}}</div>


              <span class="textfix">万元</span>
            </div>
          </div>


          <p style="margin-top:20px;">注：计费基准为销售含销项税</p>
        </div>


      </div>
    </div>

  </div>


</template>
<script>

  import organizationStructure from './organizationStructure'

  export default {
    components: {organizationStructure},
    name: 'businessGeneralSituation',
    props: ['proBusinessInfo', 'disabled', 'commercialCooperationWayItems', 'title', 'textLen'],
    data() {
      return {
        commercialCooperationWay: "",
        managementFee: "",
        saleFee: "",
        otherTradersReward: "",
        reg4: /^(0|[1-9]\d{0,})+(\.\d{1,4})?$/, // 正则校验 :正整数,保留4位小数
        reg6: /^(0|[1-9]\d{0,})+(\.\d{0,})?$/, // 正则校验 :正整数,保留n位小数
        reg2: /^([1-9]\d{0,})+(\.\d{1,2})?$/ // 正则校验 :正整数,保留2位小数
      }
    },

    computed: {
      /*合作退出方式下拉框*/
      commercialCooperationWayOptions: function () {
        return this.commercialCooperationWayItems.map(item => {
          return {
            label: item.dictName,
            value: item.dictCode
          }
        })
      }
    },
    watch: {
      managementFee: function (newValue) {
        this.proBusinessInfo.managementFee = newValue;
        if (newValue && isNaN(this.proBusinessInfo.managementFee)) {
          this.proBusinessInfo.tradeCost = '';
        } else {
          this.sum();
        }

      },
      saleFee: function (newValue) {
        this.proBusinessInfo.saleFee = newValue;
        if (newValue && isNaN(this.proBusinessInfo.saleFee)) {
          this.proBusinessInfo.tradeCost = '';
        } else {
          this.sum();
        }
      },
      otherTradersReward: function (newValue) {
        this.proBusinessInfo.otherTradersReward = newValue;
        if (newValue && isNaN(this.proBusinessInfo.otherTradersReward)) {
          this.proBusinessInfo.tradeCost = '';
        } else {
          this.sum();
        }
      }
    },


    updated: function () {
      if (this.proBusinessInfo) {
        this.managementFee = this.proBusinessInfo.managementFee;
        this.saleFee = this.proBusinessInfo.saleFee;
        this.otherTradersReward = this.proBusinessInfo.otherTradersReward
      }
    },
    methods: {
      sum: function () {
        let rt = 0;
        const fv = 100000;
        if (this.proBusinessInfo.managementFee && !isNaN(this.proBusinessInfo.managementFee)) {
          let managementFee = parseFloat(this.proBusinessInfo.managementFee);
          rt += managementFee*fv;
        }
        if (this.proBusinessInfo.saleFee && !isNaN(this.proBusinessInfo.saleFee)) {
          let saleFee = parseFloat(this.proBusinessInfo.saleFee);
          rt += saleFee*fv;
        }
        if (this.proBusinessInfo.otherTradersReward && !isNaN(this.proBusinessInfo.otherTradersReward)) {
          let otherTradersReward = parseFloat(this.proBusinessInfo.otherTradersReward);
          rt += otherTradersReward*fv;
        }

        this.proBusinessInfo.tradeCost = rt/fv || "";
      }

    }
  }
</script>
<style scoped lang="less">

  #businessGeneralSituation {
    margin: 20px;
    overflow: auto;
    border: 1px solid #E2E2ED;

    .ll{
      float:left;
    }

    .textareaBox {
      position: relative;
      margin-left:110px;
      .decision {
        width: 100%;
        margin: 5px 0;
        height: 60px;
        border: 1px solid #bfcbd9;
        border-radius: 4px;
        cursor: pointer;
        overflow: auto;
        background-color: #f9f9f9;
        box-sizing: border-box;
        padding:10px;

      }
      .statistics {
        position: absolute;
        right: 6px;
        bottom: 16px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #CCCCCC;
        letter-spacing: 0;
        line-height: 14px;
      }
    }

    .is-danger {
      border: 1px solid red;
    }

    .help {
      position: absolute;
      line-height: 12px;
      font-size: 12px;
      color: red;
      padding: 2px 8px 0 10px;
    }

    input {
      margin-left: 10px;
      width: 100px;
      height: 23px;
      padding: 5px;
    }
    .title {
      background: #E2E2ED;
      border-radius: 4px 4px 0 0;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #67649F;
      letter-spacing: 0;
      line-height: 40px;
      padding-left: 10px;
      height: 40px;
    }

    .content {
      padding: 15px 10px;
      .inputs {
        overflow: hidden;
        ul {
          display: block;
          li {
            width: 45%;
            margin-bottom: 15px;
            float: left;

            span {
              display: inline-block;
              width: 100px;

              text-align: right;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              float: left;
            }
            p.xiushi {
              display: inline-block;
              margin-left: 5px;
              line-height: 30px;
              height: 30px;
            }

            .sel {
              width: 200px;
              display: inline-block;
              margin-left: 10px
            }
          }
        }

      }

      .tree {
        p.subtitle {
          width: 100px;
          text-align: right;
          display: inline-block;
        }

        .caopancontent {
          padding-left: 50px;
          .cp {
            margin-left: 245px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #666666;
            letter-spacing: 0;
            height:46px;

            span{
              height:28px;
              line-height: 28px;

            }

            .cpFee {
              display: inline-block;
              label {
                text-align: center;
                color: #7e7cae;
                display: inline-block;
                font-size: 28px;
                height:28px;
                padding:0 10px;
              }

            }
          }

          .leaf {
            display: inline-block;
            float: left;
            label {
              display: block;
              margin-left: 10px;
            }

            .textfix {
              display: inline-block;
              margin-left: 5px;
            }

          }

          .leaf-1 {
            margin-left: 100px;
          }
        }
      }
    }

  }


</style>
