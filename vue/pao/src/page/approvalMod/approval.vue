<template>
  <div id="approve">
      <transition name="fade" mode="out-in">
        <div class="closeNav">
          <p class=" tit fl" :title="childParm.projectName">{{childParm.projectName}}</p>
          <div v-if="btnNone==true">
            <span class="closeButton fl" @click="close">关闭</span>
            <span class="saveButton fl"  @click="saveApproveInfo">保存</span>
          </div>
          <div v-else="btnNone==false">
            <span class="closeButton fr" @click="close">关闭</span>
          </div>
        </div>
      </transition>
      <div id="conMod" class="contentBox">
        <p class="projectFixed">立项审批</p>
        <div class="AllTextAreaBox">
          <p class="textName blod">审批意见汇总</p>
          <div class="commonality">
            <span class="name">投发</span>
            <textarea name="" :disabled="disabledFlag" v-model="parmList.approvalSendOut" class="textarea"></textarea>
          </div>
          <div class="commonality">
            <span class="name">客研</span>
            <textarea name="" :disabled="disabledFlag" v-model="parmList.approvalCustomer" class="textarea"></textarea>
          </div>
          <div class="commonality">
            <span class="name">研发</span>
            <textarea name="" :disabled="disabledFlag" v-model="parmList.approvalDevelopment" class="textarea"></textarea>
          </div>
          <div class="commonality">
            <span class="name">成本</span>
            <textarea name="" :disabled="disabledFlag" v-model="parmList.approvalCost" class="textarea"></textarea>
          </div>
          <div class="commonality">
            <span class="name">财务</span>
            <textarea name="" :disabled="disabledFlag" v-model="parmList.approvalFinance" class="textarea"></textarea>
          </div>
          <div class="commonality">
            <span class="name">商业</span>
            <textarea name="" :disabled="disabledFlag" v-model="parmList.approvalCommerce" class="textarea"></textarea>
          </div>
          <div class="commonality">
            <span class="name">创新</span>
            <textarea name="" :disabled="disabledFlag" v-model="parmList.approvalInnovate" class="textarea"></textarea>
          </div>
          <div class="commonality">
            <span class="name">法律</span>
            <textarea name="" :disabled="disabledFlag" v-model="parmList.approvalLaw" class="textarea"></textarea>
          </div>
          <div class="commonality">
            <span class="name">冠寓</span>
            <textarea name="" :disabled="disabledFlag" v-model="parmList.approvalApartment" class="textarea"></textarea>
          </div>
          <div class="commonality">
            <span class="name">运营</span>
            <textarea name="" :disabled="disabledFlag" v-model="parmList.approvalRun" class="textarea"></textarea>
          </div>
          <div class="commonality">
            <span class="name blod">立项会决议</span>
            <textarea name="" :disabled="disabledFlag" v-model="parmList.approvalDecision" class="textarea"></textarea>
          </div>
          <div class="commonality">
            <span class="name blod">立项会召开时间</span>
            <textarea name="" :disabled="disabledFlag" v-model="parmList.approvalSetUpTime" class="textarea"></textarea>
          </div>
        </div>

      </div>
  </div>
</template>
<script>
  export default {
    name: 'approve',
    data () {
      return {
        projectId:'',
        parmList:'',
        btnNone:false,          //true 显示
        disabledFlag:true,     //disabled 不可编辑
      }
    },
    methods: {
      /*
      ** id: 项目id号
      ** modAuth: 0|1|2 (0没权限，1只可读，2可读可写)
      */
      run (fun,id,modAuth) {

      },
      /**
      **  获取立项审批信息
      **  titleKey["approvalProject"]
      **/
      getApproveInfo(projectId){
        var that=this;
        that.projectId=projectId;
        var titleKey=["approvalProject"];
        this.$http.post('/longcity/services/v1/project/getMenuDetail',{
          "projectId":that.projectId,
          "titleKey":titleKey
        })
        .then(
          success=>{
            if(success.data.code==200 || success.data.code=="200"){
              this.parmList=success.data.result.approvalProject;
            }
          },
        );
      },
       // 关闭函数
      close () {
        var that=this;
        this.cancelDialogue(function(){
          that.$emit('cancelThePage', 1);
        });
      },
      //保存
      saveApproveInfo(){
        var that=this;
        var title="approvalProject";
        this.$http.post('/longcity/services/v1/project/saveProjectPartially',{
          "projectId":that.projectId,
          "title":title,
          "detail":that.parmList
        })
        .then(
          success=>{
            if(success.data.code==200 || success.data.code=="200"){
              this.saveSuccessDialogue();
              this.$emit('cancelThePage', 2)
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
      }
    },
    mounted(){
      this.setConHeight();
      this.getApproveInfo(this.childParm.id);
      this.isEdit();
    },
    props:   
    {
      childParm:Object
    }
  }
</script>
<style scoped lang="less">
  #approve{width:100%;}
  #approve{
   /*placeholder颜色*/
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #999;}
  .contentBox{
    width:100%;
    overflow:auto;
  }
  .projectFixed{
    width:96%;
    padding:0 2%;
    height:50px;
    line-height:50px;
    font-size:16px;
    color:#444;
    border-bottom:2px solid #ddd;
  }
  .textName{font-size:14px;color:#666;
  }
  .AllTextAreaBox{width:96%;padding:10px 2%;}
  .commonality{width:100%;margin-top:5px;}
  .commonality .name{width:12%;float:left;text-align:right;padding-right:10px;}
  .commonality .textarea{width:80%;height:50px;padding:10px;border:1px solid #ddd;background-color:#f4f4f4;border-radius:4px;overflow:auto}
  }
</style>
