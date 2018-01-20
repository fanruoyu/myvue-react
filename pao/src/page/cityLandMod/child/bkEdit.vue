<template>
  <div>
    <el-dialog title="编辑产业板块信息" :visible.sync="dialogFormVisible" size="tiny" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="ruleForm1" label-position="top" ref="ruleForm1" :rules="rules">
        <el-form-item label="产业板块名称" prop="name">
          <el-input v-model="ruleForm1.name" auto-complete="off" placeholder="请输入板块名称"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="plateDesc">
          <el-input v-model="ruleForm1.plateDesc" auto-complete="off" type="textarea" :rows="5" placeholder="请输入简介名称" :maxlength="300"></el-input>
        </el-form-item>
        <el-form-item label="板块主产业" prop="mainIndustry">
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="(item,index) in bkinfolist" :key="item.dictCode" :label="item.dictName"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('finish','')">取 消</el-button>
        <el-button type="primary" @click="save('ruleForm1')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'bkEdit',
  data() {
    return {
      dialogFormVisible: true,
      checkList: [],
      modal: false,
      bkinfolist: [],
      checkListKey: [],
      polygon: '',
      ruleForm1: {
        name: '',
        polyline: '',     // 116.341182,39.923885;116.34026,39.938133
        mainIndustry: [],
        plateDesc: ''
      },
      rules: {
        name: [
          { required: false, max: 64, message: '最多为64个字符', trigger: 'blur' },
        ]
      }
    }
  },
  props: ['map', 'item','polyline','obj'],
  watch: {
    checkList: {
      handler: function(val, oldVal) {
        this.checkListKey = val.map((item) => {
          let keys = ''
          this.bkinfolist.forEach((v, i) => {
            if (v.dictName === item) {
              keys = v.dictCode
            }
          })
          return keys
        })
      },
      deep: true
    }
  },
  methods: {
    /*
     * 根据板块Id获取详细信息
     */
    getInfo(id) {
      this.$http.get(`/longcity/services/v1/industryPlate/getPlateInfo?id=${id}`).then(res => {
        if(res.data.code==200||res.data.code=='200'){
          this.$emit('edit',res.data.result)
          this.ruleForm1 = {
            name: res.data.result.name,
            plateDesc: res.data.result.plateDesc,
            mainIndustry: res.data.result.mainIndustry.split(',')
          }
          this.checkList = res.data.result.mainIndustryInfo.split(',');
        }
        
      })
    },
    // 产业板块保存
    save(formName) {
      if (this.submitForm(formName)) {
        var rt='';
        rt=this.polyline;
        if (this.flag === '编辑') {
          var str='';
          if(this.obj.type==1){
            this.obj.polygon.getPath().forEach((item, index) => {
              if (index == this.obj.polygon.getPath().length - 1) {
                str += item.lng + ',' + item.lat
              } else {
                str += item.lng + ',' + item.lat + ';'
              }
            })
          }
          rt=str;
        }
        console.log(rt)
        var data = {
          name: this.ruleForm1.name,
          polyline: rt,
          mainIndustry: this.checkListKey.toString(),   // 板块的主产业，多选标签，key来自字典，以,分隔
          plateDesc: this.ruleForm1.plateDesc     // 产业板块的简介描述
        }
        if (this.flag === '编辑') {
          data.id = this.item.id;
        }     
        console.log(data)  
        this.$http.post('/longcity/services/v1/industryPlate/save', data).then(res => {
          if (res.data.code === 200||res.data.code === '200') {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'success'
            });
            this.$emit('finish','')
          }
        })
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 验证表单
    submitForm(formName) {
      let flag = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true
        } else {
          flag = false
        }
      });
      return flag
    },
    // 获取checkbox带选框
    getCheckBox() {
      this.$http.post('/longcity/services/v1/dict/dictListByType', {
        dictTypes: ['plate_industry_main_industry']
      }).then(
        success => {
          if (success.data.code == 200 || success.data.code == '200') {
            this.bkinfolist = success.data.result[0].items;
          }
        }
        )
    }
  },
  created() {
    this.getCheckBox()
    if (this.item) {
      this.flag = '编辑'
      this.getInfo(this.item.id)
    } else {
      this.flag = '新增'
      this.modal = true
    }
  },
  mounted() {
    if (this.flag === '新增') {
      document.getElementsByClassName('el-dialog__wrapper')[0].style.position = 'fixed !important';
    } else {
      document.querySelector('div.el-dialog__wrapper').setAttribute('style', 'position: inherit !important')
    }
  }
}
</script>
<style>
div.el-dialog__wrapper {
  position: inherit;
}

div.el-dialog.el-dialog--tiny {
  height: 500px;
  width: 400px;
  overflow: hidden;
  border-radius: 4px;
  top:auto !important;
  bottom: 0;
  right: 0;
  left: auto;
  transform: translateX(0);
}
div.el-dialog.el-dialog--tiny div.el-dialog__header {
  background: #67649F;
  color: #fff;
  padding: 0;
  height: 50px;
  text-align: center;
}

div.el-dialog.el-dialog--tiny div.dialog-footer {
  height: 50px;
}

div.el-dialog.el-dialog--tiny div.el-dialog__footer {
  padding: 0;
}

div.el-dialog.el-dialog--tiny div.el-dialog__body {
  height: 400px;
  box-sizing: border-box;
  overflow-y: auto;
}

div.el-dialog.el-dialog--tiny .el-button {
  padding: 0;
  height: 36px;
  width: 84px;
  margin: 0 25px 0 0;
}

div.el-dialog.el-dialog--tiny button.el-button.el-button--primary {
  background: #67649F;
  border-color: #67649F;
}

div.el-dialog.el-dialog--tiny span.el-dialog__title {
  color: #fff;
  line-height: 50px;
}

label.el-checkbox+.el-checkbox {
  margin-left: 0px;
}

label.el-checkbox {
  margin-right: 15px;
}
</style>
