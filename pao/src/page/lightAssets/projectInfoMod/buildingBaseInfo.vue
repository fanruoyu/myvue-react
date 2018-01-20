<template>
  <div id="buildingBaseInfo">

    <div :style="{display: disabled?'none':''}" style="clear: both;height:40px;">
      <el-button type="promise" class="normalBlueAddButton" @click="addPayRhythm()"><span>添加</span></el-button>
    </div>

    <ul>
      <li v-for="(item,index) in proBusinessInfo.prjcBuildingBasicInfor" class="item">
        <div class="itemTitle">
          <span class="num">{{proBusinessInfo.prjcBuildingBasicInfor.length-index}}</span>
          <span :style="{display: disabled?'none':''}" class="del"
                @click="deletePayRhythm(proBusinessInfo.prjcBuildingBasicInfor.length-index-1)">删除</span>
        </div>

        <div class="topArea">
          <div class="left">楼栋号</div>
          <div class="right">
            <input class="baseInput" style="margin-left:0" :disabled="disabled" :maxlength="64"
                   v-model="proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].buildingNo"
                   placeholder="请输入"/>
            <span> 例如：3# </span>
          </div>
        </div>
        <div class="topArea">
          <div class="left">承租楼层</div>
          <div class="right">
            <div class="textareaBox">
              <span>例如：3-10层</span>
              <textarea style="height:80px;" :disabled="disabled" name=""
                        v-model="proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].rentFloors"
                        class="decision"
                        placeholder="请输入" :maxlength="64"></textarea>
              <span
                class="statistics">{{proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].rentFloors ? proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].rentFloors.length : 0}}/64</span>
            </div>
          </div>
        </div>

        <div class="topArea">
          <div class="left">地上层数</div>
          <div class="right">
            <div class="textareaBox">
              <div class="inputCt" style="float:left">
                <input v-validate="{ regex: reg1 }"
                       :class="{'middleInput' : true, 'is-danger': errors.has('overgroundFloors'+index)}"
                       :disabled="disabled"
                       :name="'overgroundFloors'+index"
                       v-model="proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].overgroundFloors"
                       placeholder="请输入"/>
                <div
                  v-show="errors.has('overgroundFloors'+index)"
                  data-location="项目条件->楼栋基本信息->地上层数" class="help">{{'注：整数，0~300'}}
                </div>
                <span>层</span>
              </div>

              <div class="inputCt">
                <span style="margin-left:100px">
                   <span style="float:left">地下层数</span>
                    <div style="position: relative;margin-left:66px">
                    <input v-validate="{ regex: reg1 }" :disabled="disabled" :name="'undergroundFloors'+index"
                           :class="{'baseInput' : true, 'is-danger': errors.has('undergroundFloors'+index)}"
                           v-model="proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].undergroundFloors"
                           placeholder="请输入"/>
                    <div
                      v-show="errors.has('undergroundFloors'+index)"
                      data-location="项目条件->楼栋基本信息->地下层数" class="help">{{'注：整数，0~300'}}
                  </div>
                    <span>层</span>
                      </div>
                </span>
              </div>

            </div>
          </div>
        </div>


        <div class="topArea">
          <div class="left">承租楼层高</div>
          <div class="right">
            <div v-if="bShowTip1" class="tipContainer">
              <p class="tipBubble">例：3楼3m，4-10楼3.5m</p>
            </div>
            <div class="textareaBox">
                <textarea @focus="bShowTip1=true" @blur="bShowTip1=false" style="height:80px;" :disabled="disabled"
                          name=""
                          v-model="proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].floorHeightInfo"
                          class="decision"
                          placeholder="请输入" :maxlength="64"></textarea>
              <span
                class="statistics">{{proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].floorHeightInfo ? proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].floorHeightInfo.length : 0}}/64</span>
            </div>
          </div>
        </div>

        <div class="topArea">
          <div class="left">设备层描述</div>
          <div class="right">
            <div v-if="bShowTip2" class="tipContainer">
              <p class="tipBubble">例：有\无；那一层；层高</p>
            </div>
            <div class="textareaBox">
                <textarea @focus="bShowTip2=true" @blur="bShowTip2=false" style="height:80px;" :disabled="disabled"
                          name=""
                          v-model="proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].deviceFloorInfo"
                          class="decision"
                          placeholder="请输入" :maxlength="64"></textarea>
              <span
                class="statistics">{{proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].deviceFloorInfo ? proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].deviceFloorInfo.length : 0}}/64</span>
            </div>
          </div>
        </div>

        <div class="topArea">
          <div class="left">避难层描述</div>
          <div class="right">
            <div v-if="bShowTip3" class="tipContainer">
              <p class="tipBubble">例：有\无；那一层；层高</p>
            </div>
            <div class="textareaBox">
                <textarea @focus="bShowTip3=true" @blur="bShowTip3=false" style="height:80px;" :disabled="disabled"
                          name=""
                          v-model="proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].refugeFloorInfo"
                          class="decision"
                          placeholder="请输入" :maxlength="64"></textarea>
              <span
                class="statistics">{{proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].refugeFloorInfo ? proBusinessInfo.prjcBuildingBasicInfor[proBusinessInfo.prjcBuildingBasicInfor.length-index-1].refugeFloorInfo.length : 0}}/64</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>
<script>

  export default {
    name: 'buildingBaseInfo',
    props: ['disabled', 'proBusinessInfo'],
    data() {
      return {
        bShowTip1: false,
        bShowTip2: false,
        bShowTip3: false,
        //proBusinessInfo.prjcBuildingBasicInfor:this.proBusinessInfo.proBusinessInfo.prjcBuildingBasicInfor || [],
        reg1: /^(\d{1,2}|[1,2]\d{2}|300)$/,//0-300

      }
    },

    updated() {

    },


    mounted() {

    },

    /*watch:{
      proBusinessInfo.prjcBuildingBasicInfor:{
        handler(){
          this.proBusinessInfo.proBusinessInfo.prjcBuildingBasicInfor = this.proBusinessInfo.prjcBuildingBasicInfor
        },
        deep:true
      }
    },
*/

    methods: {
      initFirstData() {
        let pb = this.proBusinessInfo.proBusinessInfo.prjcBuildingBasicInfor;
        if (!pb || pb.length < 1) {
          pb = [];
          this.proBusinessInfo.proBusinessInfo.prjcBuildingBasicInfor = pb;
        }
        return pb
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

      /*增加一条支付节奏*/
      addPayRhythm() {
        this.proBusinessInfo.prjcBuildingBasicInfor.push({
          "buildingNo": "",//楼栋号
          "rentFloors": "",//承租楼层
          "overgroundFloors": "",//地上层数
          "undergroundFloors": "",//地下层数
          "floorHeightInfo": "",//承租楼层层高
          "deviceFloorInfo": "",//设备层描述
          "refugeFloorInfo": ""//避难层描述
        })
      },
      /*删除一条支付节奏*/
      deletePayRhythm(index) {
        this.proBusinessInfo.prjcBuildingBasicInfor.splice(index, 1)
      },

    }
  }
</script>
<style scoped lang="less">
  @import 'common';

  #buildingBaseInfo {
    padding: 10px;
    overflow: auto;

    .item {
      border: 1px solid #ddd;
      margin-bottom: 10px;
      .itemTitle {
        background: #E2E2ED;
        border-radius: 4px 4px 0 0;
        height: 40px;
        padding: 0 10px;
        margin-bottom: 20px;
        span {
          line-height: 40px;
        }
        .num {
          float: left;

        }
        .del {
          float: right;
          cursor: pointer;
          &:hover {
            font-weight: bold;
          }
        }
      }

    }

    .midInput {
      margin: 5px 0;
      padding-right: 10px;
    }

  }


</style>
