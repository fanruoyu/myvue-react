<template>
  <div id="proCostIndex">
      <el-row justify="center">
          <div class="closeNav">
            <p class=" tit fl" :title="childParm.projectName">{{childParm.projectName}}</p>
            <div v-if="btnNone==true">
              <span class="closeButton fl" @click="theCancelPopup">关闭</span>
              <span class="saveButton fl"  @click="subProcost()">保存</span>
            </div>
            <div v-else="btnNone==false">
              <span class="closeButton fr" @click="theCancelPopup">关闭</span>
            </div>
          </div>
        <div  id="conMod">
          <div class="proOperat-body">
            <div class="operationalNode"><p>运营节点</p></div>
            <div class="mainOperationNode"><p><span>主要运营节点</span></p></div>
            <div class="mainOperationNodeContent">
              <el-col :span="3"><div></div></el-col>
              <el-col :span="20">
                <el-form  :model="ruleForm2"  ref="ruleForm2"  :rules="rules2" label-width="0px" class="demo-ruleForm form"  >
                <table  border="0" class="table">
                  <tr class="hang">
                    <th></th>
                    <th>第一期</th>
                    <th>第二期</th>
                    <th>第三期</th>
                    <th>第四期</th>
                    <th>第五期</th>
                    <th>第六期</th>
                    <th>第七期</th>
                    <th>第八期</th>
                  </tr>
                  <tr>
                    <td class="">获取土地</td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="obtain_land01"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="obtain_land02"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="obtain_land03"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="obtain_land04"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="obtain_land05"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="obtain_land06"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="obtain_land07"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="obtain_land08"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>开工时间</td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="start_work_time01"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="start_work_time02"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="start_work_time03"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="start_work_time04"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="start_work_time05"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="start_work_time06"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="start_work_time07"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="start_work_time08"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>开盘时间</td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="opening_time01"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="opening_time02"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="opening_time03"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="opening_time04"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="opening_time05"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="opening_time06"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="opening_time07"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="opening_time08"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>竣工时间</td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="completion_time01"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="completion_time02"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="completion_time03"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="completion_time04"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="completion_time05"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="completion_time06"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="completion_time07"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="completion_time08"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>交房时间</td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="house_delivery_time01"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="house_delivery_time02"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="house_delivery_time03"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="house_delivery_time04"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="house_delivery_time05"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="house_delivery_time06"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="house_delivery_time07"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <el-date-picker
                          :disabled="disabledFlag"
                          :editable="disabledDate"
                          v-model="house_delivery_time08"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>施工周期(月)</td>
                    <td>
                      <div class="demo-ruleForm form"  >
                        <el-form-item label="" prop="construction_period01">
                          <div class="block">
                            <el-input :disabled="disabledFlag" v-model="ruleForm2.construction_period01" placeholder="请输入内容" ></el-input>
                          </div>
                        </el-form-item>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <div class="demo-ruleForm form"  >
                          <el-form-item label="" prop="construction_period02">
                            <div class="block">
                              <el-input :disabled="disabledFlag" v-model="ruleForm2.construction_period02" placeholder="请输入内容"></el-input>
                            </div>
                          </el-form-item>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <div class="demo-ruleForm form"  >
                          <el-form-item label="" prop="construction_period03">
                            <div class="block">
                              <el-input :disabled="disabledFlag" v-model="ruleForm2.construction_period03" placeholder="请输入内容"></el-input>
                            </div>
                          </el-form-item>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <div class="demo-ruleForm form"  >
                          <el-form-item label="" prop="construction_period04">
                            <div class="block">
                              <el-input :disabled="disabledFlag" v-model="ruleForm2.construction_period04" placeholder="请输入内容"></el-input>
                            </div>
                          </el-form-item>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <div class="demo-ruleForm form"  >
                          <el-form-item label="" prop="construction_period05">
                            <div class="block">
                              <el-input :disabled="disabledFlag" v-model="ruleForm2.construction_period05" placeholder="请输入内容"></el-input>
                            </div>
                          </el-form-item>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <div class="demo-ruleForm form"  >
                          <el-form-item label="" prop="construction_period06">
                            <div class="block">
                              <el-input :disabled="disabledFlag" v-model="ruleForm2.construction_period06" placeholder="请输入内容"></el-input>
                            </div>
                          </el-form-item>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <div class="demo-ruleForm form"  >
                          <el-form-item label="" prop="construction_period07">
                            <div class="block">
                              <el-input :disabled="disabledFlag" v-model="ruleForm2.construction_period07" placeholder="请输入内容"></el-input>
                            </div>
                          </el-form-item>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="block">
                        <div class="demo-ruleForm form"  >
                          <el-form-item label="" prop="construction_period08">
                            <div class="block">
                              <el-input :disabled="disabledFlag" v-model="ruleForm2.construction_period08" placeholder="请输入内容"></el-input>
                            </div>
                          </el-form-item>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
                </el-form>
              </el-col>
            </div>
          </div>
        </div>
      </el-row>
    </div>
</template>

<script>
  import submitImg from '../submitImg.vue'
  import slideShow from '../../components/slideShow'
  import diaLog from '../../components/dialog'
  import { Message } from 'element-ui';
  export default {
    name: 'proCostIndex',
    components: {
      slideShow,
      submitImg,
      diaLog
    },

    data() {
      var checkObtainNumber = (rule, value, callback) => {
        var reg = /^\d+(\.\d)?$/; //正则校验 :正整数,保留两位小数
        var reg02 = /^(?:0|[1-9][0-9]?|100)$/; //正则校验 :正整数,保留两位小数
        if (value) {
          if (!reg.test(value)) {
            callback(new Error("请输入正整数"));
          }else{
            if (!reg02.test(value)) {
              callback(new Error("请输入0-100"));
            }else{
              callback()
            }
          }
        }else{
          callback()
        }
      };
      return {
        btnNone:false,          //true 显示
        disabledFlag:false,     //disabled 可编辑
        disabledDate:false,     //日期 不可输入
        ruleForm2:{
          construction_period01:'',
          construction_period02:'',
          construction_period03:'',
          construction_period04:'',
          construction_period05:'',
          construction_period06:'',
          construction_period07:'',
          construction_period08:'',/*施工周期（月）*/
        },
        rules2: {
          construction_period01: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          construction_period02: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          construction_period03: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          construction_period04: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          construction_period05: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          construction_period06: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          construction_period07: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
          construction_period08: [
            { validator: checkObtainNumber, trigger: 'blur' }
          ],
        },
        operateNodetable:[],
        /*获取土地*/
        obtain_land01:'',
        obtain_land02:'',
        obtain_land03:'',
        obtain_land04:'',
        obtain_land05:'',
        obtain_land06:'',
        obtain_land07:'',
        obtain_land08:'',
        /*开工时间*/
        start_work_time01:'',
        start_work_time02:'',
        start_work_time03:'',
        start_work_time04:'',
        start_work_time05:'',
        start_work_time06:'',
        start_work_time07:'',
        start_work_time08:'',
        /*开盘时间*/
        opening_time01:'',
        opening_time02:'',
        opening_time03:'',
        opening_time04:'',
        opening_time05:'',
        opening_time06:'',
        opening_time07:'',
        opening_time08:'',
        /*竣工时间*/
        completion_time01:'',
        completion_time02:'',
        completion_time03:'',
        completion_time04:'',
        completion_time05:'',
        completion_time06:'',
        completion_time07:'',
        completion_time08:'',
        /*交房时间*/
        house_delivery_time01:'',
        house_delivery_time02:'',
        house_delivery_time03:'',
        house_delivery_time04:'',
        house_delivery_time05:'',
        house_delivery_time06:'',
        house_delivery_time07:'',
        house_delivery_time08:'',
        projectId:'',
        submitFlag:false,
        datas:''
      }
    },
    mounted(){
      this.setConHeight();
      this.isEdit();
    },
    props:
      {
        childParm:Object
      },
    methods:{
      /*年月日格式转换*/
      dateFormatConversion(name,date){
          if(name=='obtain_land01'){
            this.obtain_land01=date + " 00:00:00";
          }
      },
      /*年月日格式转换*/
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
      /*通过接口获取运营节点信息*/
      accessProcost:function () {
        var that = this;
        this.$http({
          method:'post',
          url:'/longcity/services/v1/project/getMenuDetail',
          data:{
            "projectId":that.projectId,
            "titleKey":[//菜单对应的titleKEY
              "operateNode",//项目成本运营
            ]
          },
        }).then(function (succeed) {
//          console.log(succeed);
          let operateNodetable=succeed.data.result.operateNode.operateNodetable;
          /*获取土地*/
          that.obtain_land01=operateNodetable[0].obtainLand.substr(0,10);
          that.obtain_land02=operateNodetable[1].obtainLand.substr(0,10);
          that.obtain_land03=operateNodetable[2].obtainLand.substr(0,10);
          that.obtain_land04=operateNodetable[3].obtainLand.substr(0,10);
          that.obtain_land05=operateNodetable[4].obtainLand.substr(0,10);
          that.obtain_land06=operateNodetable[5].obtainLand.substr(0,10);
          that.obtain_land07=operateNodetable[6].obtainLand.substr(0,10);
          that.obtain_land08=operateNodetable[7].obtainLand.substr(0,10);
          /*开工时间*/
          that.start_work_time01=operateNodetable[0].startWorkTime.substr(0,10);
          that.start_work_time02=operateNodetable[1].startWorkTime.substr(0,10);
          that.start_work_time03=operateNodetable[2].startWorkTime.substr(0,10);
          that.start_work_time04=operateNodetable[3].startWorkTime.substr(0,10);
          that.start_work_time05=operateNodetable[4].startWorkTime.substr(0,10);
          that.start_work_time06=operateNodetable[5].startWorkTime.substr(0,10);
          that.start_work_time07=operateNodetable[6].startWorkTime.substr(0,10);
          that.start_work_time08=operateNodetable[7].startWorkTime.substr(0,10);
          /*开盘时间*/
          that.opening_time01=operateNodetable[0].openingTime.substr(0,10);
          that.opening_time02=operateNodetable[1].openingTime.substr(0,10);
          that.opening_time03=operateNodetable[2].openingTime.substr(0,10);
          that.opening_time04=operateNodetable[3].openingTime.substr(0,10);
          that.opening_time05=operateNodetable[4].openingTime.substr(0,10);
          that.opening_time06=operateNodetable[5].openingTime.substr(0,10);
          that.opening_time07=operateNodetable[6].openingTime.substr(0,10);
          that.opening_time08=operateNodetable[7].openingTime.substr(0,10);
          /*竣工时间*/
          that.completion_time01=operateNodetable[0].completionTime.substr(0,10);
          that.completion_time02=operateNodetable[1].completionTime.substr(0,10);
          that.completion_time03=operateNodetable[2].completionTime.substr(0,10);
          that.completion_time04=operateNodetable[3].completionTime.substr(0,10);
          that.completion_time05=operateNodetable[4].completionTime.substr(0,10);
          that.completion_time06=operateNodetable[5].completionTime.substr(0,10);
          that.completion_time07=operateNodetable[6].completionTime.substr(0,10);
          that.completion_time08=operateNodetable[7].completionTime.substr(0,10);
          /*交房时间*/
          that.house_delivery_time01=operateNodetable[0].houseDeliveryTime.substr(0,10);
          that.house_delivery_time02=operateNodetable[1].houseDeliveryTime.substr(0,10);
          that.house_delivery_time03=operateNodetable[2].houseDeliveryTime.substr(0,10);
          that.house_delivery_time04=operateNodetable[3].houseDeliveryTime.substr(0,10);
          that.house_delivery_time05=operateNodetable[4].houseDeliveryTime.substr(0,10);
          that.house_delivery_time06=operateNodetable[5].houseDeliveryTime.substr(0,10);
          that.house_delivery_time07=operateNodetable[6].houseDeliveryTime.substr(0,10);
          that.house_delivery_time08=operateNodetable[7].houseDeliveryTime.substr(0,10);
          /*施工周期（月）*/
          that.ruleForm2.construction_period01=operateNodetable[0].constructionPeriod;
          that.ruleForm2.construction_period02=operateNodetable[1].constructionPeriod;
          that.ruleForm2.construction_period03=operateNodetable[2].constructionPeriod;
          that.ruleForm2.construction_period04=operateNodetable[3].constructionPeriod;
          that.ruleForm2.construction_period05=operateNodetable[4].constructionPeriod;
          that.ruleForm2.construction_period06=operateNodetable[5].constructionPeriod;
          that.ruleForm2.construction_period07=operateNodetable[6].constructionPeriod;
          that.ruleForm2.construction_period08=operateNodetable[7].constructionPeriod;
        },function (err) {
          console.log(err);
        })
      },
      /*按照接口格式整合运营节点数据*/
      operationNodeData:function () {
        let item01={
          "periods_no":"1",
          "obtain_land":this.obtain_land01,
          "start_work_time":this.start_work_time01,
          "opening_time":this.opening_time01,
          "completion_time":this.completion_time01,
          "house_delivery_time":this.house_delivery_time01,
          "construction_period":this.ruleForm2.construction_period01,
        };//第一期
        let item02={
          "periods_no":"2",
          "obtain_land":this.obtain_land02,
          "start_work_time":this.start_work_time02,
          "opening_time":this.opening_time02,
          "completion_time":this.completion_time02,
          "house_delivery_time":this.house_delivery_time02,
          "construction_period":this.ruleForm2.construction_period02,
        };
        let item03={
          "periods_no":"3",
          "obtain_land":this.obtain_land03,
          "start_work_time":this.start_work_time03,
          "opening_time":this.opening_time03,
          "completion_time":this.completion_time03,
          "house_delivery_time":this.house_delivery_time03,
          "construction_period":this.ruleForm2.construction_period03,
        };
        let item04={
          "periods_no":"4",
          "obtain_land":this.obtain_land04,
          "start_work_time":this.start_work_time04,
          "opening_time":this.opening_time04,
          "completion_time":this.completion_time04,
          "house_delivery_time":this.house_delivery_time04,
          "construction_period":this.ruleForm2.construction_period04,
        };
        let item05={
          "periods_no":"5",
          "obtain_land":this.obtain_land05,
          "start_work_time":this.start_work_time05,
          "opening_time":this.opening_time05,
          "completion_time":this.completion_time05,
          "house_delivery_time":this.house_delivery_time05,
          "construction_period":this.ruleForm2.construction_period05,
        };
        let item06={
          "periods_no":"6",
          "obtain_land":this.obtain_land06,
          "start_work_time":this.start_work_time06,
          "opening_time":this.opening_time06,
          "completion_time":this.completion_time06,
          "house_delivery_time":this.house_delivery_time06,
          "construction_period":this.ruleForm2.construction_period06,
        };
        let item07={
          "periods_no":"7",
          "obtain_land":this.obtain_land07,
          "start_work_time":this.start_work_time07,
          "opening_time":this.opening_time07,
          "completion_time":this.completion_time07,
          "house_delivery_time":this.house_delivery_time07,
          "construction_period":this.ruleForm2.construction_period07,
        };
        let item08={
          "periods_no":"8",
          "obtain_land":this.obtain_land08,
          "start_work_time":this.start_work_time08,
          "opening_time":this.opening_time08,
          "completion_time":this.completion_time08,
          "house_delivery_time":this.house_delivery_time08,
          "construction_period":this.ruleForm2.construction_period08,
        };
        this.operateNodetable=[];
        this.operateNodetable.push(item01,item02,item03,item04,item05,item06,item07,item08);
      },
      /*通过接口提交运营节点信息*/
      subProcost:function () {
        var that = this;
        this.submitForm('ruleForm2');
        if(that.submitFlag==false){
            return
        }
        this.operationNodeData();
        this.$http({
          method:'post',
          url:'/longcity/services/v1/project/saveProjectPartially',
          data:{
//            "projectId":1024,
            "projectId":that.projectId,
            "title": "operateNode",
            "detail":{
              "operateNodetable":that.operateNodetable,
            },
          }
        }).then(function (succeed) {
//          console.log(succeed);
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
        this.accessProcost();
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
//          instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                this.cancelThePage(1);
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
    },
  }
</script>
<style lang="less">
  @import "../../assets/css/common.css";
  @import "../../assets/css/base.css";
  #conMod{
    width:100%;
    overflow: auto;
  }
  #proCostIndex{
  .newProject {
    margin: 0px auto;
    /*padding-top: 10px;*/
    background-color: white;
    /*height: 1024px;*/
  }
  .newProject-title{
    background:#67649F;
    text-align: center;
    position: fixed;
    width: 63%;
    z-index:1000;
  }
  .newProject-title p{
    color:white;
    padding: 10px;
  }
  .newProject-title .survey{
    height: 50px;
    clear: both;
    /*padding:0 20px 5px 20px;*/
    position: relative;
  }
  .newProject-title .survey p{
    /*float: left;*/
    /*font-weight:bold;*/
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  .newProject-title .survey .btn{
    /*float: right;*/
    position: absolute;
    right: 0;
    top: 12%;
    /*transform:translate(-50%,-50%);*/
  }
  .newProject-title .survey button:nth-of-type(2){
    margin-right:25px;
  }
  .newProject-title .survey .el-button--primary{
    /*float: right;*/
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
  .proOperat-body {
    width: 97%;
    margin: 0;
    padding: 0 1% ;
  }
  .proOperat-body .el-form-item{
    margin-bottom: 10px;
  }
  .proOperat-body .operationalNode p{
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #444444;
    letter-spacing: 0;
    line-height: 16px;
    margin-bottom: 10px;
    padding-left: 10px;
    height: 16px;
    width: 100%;
  }
  .proOperat-body .mainOperationNode{

  }
  .proOperat-body .mainOperationNode p{
    background: #F9F9F9;
    margin-bottom: 10px;
    height: 60px;
    line-height: 60px;
    width: 100%;
  }
  .proOperat-body .mainOperationNode p span{
    padding-left: 10px;
  }
  .proOperat-body  .mainOperationNodeContent {
    /*width: 835px;*/
    width: 100%;
    overflow-x: auto;
    overflow-y:hidden;
    border: 1px solid #EDEDED;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .proOperat-body  .mainOperationNodeContent table {
    font-family: verdana,arial,sans-serif;
    font-size:11px;
    color:#333333;
    border-color: #999999;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  .proOperat-body  .mainOperationNodeContent table th {
    /*border-width: 1px;*/
    /*padding: 8px;*/
    background-color: #dedede;
    border: 0.5px solid #DDDDDD;
  }

  .proOperat-body  .mainOperationNodeContent table tr {
    line-height:1px;
  }
  .proOperat-body  .mainOperationNodeContent table .hang {
    line-height:30px;
  }
  .proOperat-body  .mainOperationNodeContent table tr td:nth-of-type(1){
    line-height:10px;
    width: 300px;
    white-space: nowrap;
  }
  .proOperat-body  .mainOperationNodeContent table td {
    border: 0.5px solid #DDDDDD;
    padding: 8px;
    background-color: #ffffff;
  }
  }
</style>
