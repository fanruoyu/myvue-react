<template>
  <div class="edit">
    <el-dialog title="编辑重点企业" :visible.sync="dialogFormVisible" size="tiny" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="form" label-position="top" ref="form" :rules="rules">
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name" auto-complete="off" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="所在产业园名称" prop="parkCode">
          <el-select v-model="form.parkCode" filterable placeholder="所在产业园" prop="industryCode">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主营业务" prop="majorBusiness">
          <el-input v-model="form.majorBusiness" auto-complete="off" type="textarea" :rows="5" placeholder="主营业务" :maxlength="300"></el-input>
        </el-form-item>
        <el-form-item label="成立时间" prop="setupTime">
          <el-date-picker v-model="form.setupTime" type="date" :editable='false' placeholder="选择日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="国内行业排名" prop="ranking">
          <el-input v-model="form.ranking" auto-complete="off" placeholder="请输入" :maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label="总产值" prop="totalProduction">
          <el-input placeholder="请输入" v-model="form.totalProduction">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="企业总人数" prop="totalPeople">
          <el-input placeholder="请输入" v-model="form.totalPeople">
            <template slot="append">人</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('finish','')">取 消</el-button>
        <el-button type="primary" @click="save('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  <!--</div>-->
</template>

<script type="text/ecmascript-6">
export default {
  name: 'qyEdit',
  data() {
    /*
     * 校验规则
     */
    var validateRank = (rule, value, callback) => {
      if (value.toString().trim()) {
        if (!isNaN(value)) {
          if (!Number.isInteger(parseFloat(value))) {
            callback(new Error('请输入整数'));
          } else {
            if (parseFloat(value) < 1 || parseFloat(value) > 10000) {
              callback(new Error('国内行业排名仅为1至10000'));
            }
          }
          callback();
        } else {
          callback(new Error("国内排名为1-10000之间的有效数字"));
        }
      } else {
        callback()
      }
    };
    var validateProduction = (rule, value, callback) => {
      if (value.toString().trim()) {
        if (!isNaN(value)) {
          if (parseFloat(value).toFixed(4) != parseFloat(value)) {
            callback(new Error('请保留小数点后4位'));
          } else {
            if (parseFloat(value) > 100000000 || parseFloat(value) < -100000000) {
              callback(new Error('总产值，单位：万元，最值±100,000,000'));
            }
          }
        } else {
          callback(new Error("总产值为有效数字"));
        }
        callback();
      } else {
        callback();
      }
    };
    var validatePeople = (rule, value, callback) => {
      if (value.toString().trim()) {
        if (!isNaN(value)) {
          if (!Number.isInteger(parseFloat(value))) {
            callback(new Error('人数必为整数'));
          } else {
            if (parseFloat(value) < 0) {
              callback(new Error('人数不可为负数'));
            }
            if (parseFloat(value) > 1000000) {
              callback(new Error('人数最大值1,000,000'));
            }
          }
          callback();
        } else {
          callback(new Error('人数应为1-1000000之间的有效数字'));
        }
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: true,
      options: [],
      modal: false,
      form: {
        name: '',
        center: '',
        flag: '',
        parkCode: '',   // 所在产业园ID
        majorBusiness: '',  // 主营业务
        setupTime: '', // 成立时间，精确到天20121210
        ranking: '',  // 国内行业排名，值域范围[1,10000]，步长为1
        totalProduction: '',     // 总产值，单位：万元，最值±100,000,000，保留小数点后4位，允许为负数
        totalPeople: ''   // 企业总人数，单位：人，最大值1,000,000,不允许为负数
      },
      rules: {
        name: [
          { required: false, max: 64, message: '最多为64个字符', trigger: 'blur' },
        ],
        ranking: [
          { required: false, validator: validateRank, trigger: 'blur' }
        ],
        totalProduction: [
          { required: false, validator: validateProduction, trigger: 'blur' }
        ],
        totalPeople: [
          { required: false, validator: validatePeople, trigger: 'blur' }
        ]
      }
    }
  },
  props: ['map', 'item', 'cityCode', 'polyline', 'obj'],
  components: {},
  watch: {
    item: {
      handler: function(val, oldVal) {
        console.log('item', val)
      },
      deep: true
    }

  },
  methods: {
    getInfo(id) {
      this.$http.get(`/longcity/services/v1/industryPlate/getEnterprisesInfo?id=${id}`).then(res => {
        if (res.data.code == 200 || res.data.code == '200') {
          this.form = res.data.result;
          if (this.form.setupTime) {
            var str = res.data.result.setupTime.replace(/\D/g, '-');
            this.form.setupTime = new Date(str.replace(/(^\-|\-$)/g, ''));
          }else{
            this.form.setupTime='';
          }
          this.$emit('edit', res.data.result)
        }
      })
    },// 重置表单
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
    // 获取板块下拉列表项
    getOptions() {
      const data = {
        type: '2',
        cityCode: this.cityCode,
        name: ''
      }
      this.$http.post('/longcity/services/v1/industryPlate/industryList', data).then(res => {
        if (res.data.code == 200 || res.data.code == '200') {
          this.options = []
          res.data.result.forEach((v, i) => {
            let item = {
              label: v.name,
              value: v.code
            }
            this.options.push(item)
          })
        }
      })
    },
    /*
     * 保存企业
     */
    save(formName) {
      function tofixedtwo(num) {
        if (num < 10) {
          num = "0" + num;
        } else {
          num = num;
        }
        return num;
      }
      if (this.submitForm(formName)) {
        var num;
        if (!this.form.setupTime) {
         num = '';
        } else {
         num = new Date(this.form.setupTime).getFullYear().toString() + tofixedtwo(new Date(this.form.setupTime).getMonth() + 1) + tofixedtwo(new Date(this.form.setupTime).getDate());
        }
        var rt = '';
        rt = this.polyline;
        if (this.flag === '编辑') {
          var str = '';
          if (this.obj.type == 3) {
            str = this.obj.marker.getPosition().lng + ',' + this.obj.marker.getPosition().lat
          }
          rt = str;
        }
        let data = {
          name: this.form.name,
          center: rt,   // 地图坐标 "116.341182,39.923885",
          parkCode: this.form.parkCode,   // 所在产业园ID
          majorBusiness: this.form.majorBusiness,  // 主营业务
          setupTime: num, // 成立时间，精确到天20121210
          ranking: this.form.ranking,  // 国内行业排名，值域范围[1,10000]，步长为1
          totalProduction: this.form.totalProduction,     // 总产值，单位：万元，最值±100,000,000，保留小数点后4位，允许为负数
          totalPeople: this.form.totalPeople   // 企业总人数，单位：人，最大值1,000,000,不允许为负数
        }
        if (this.flag === '编辑') {
          data.id = this.item.id
        }
        console.log(data)
        this.$http.post('/longcity/services/v1/keyEnterprises/save', data).then(res => {
          if (res.data.code === 200 || res.data.code === '200') {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'success'
            });
            this.$emit('finish', '');
          }
        })
      }
    }
  },
  created() {
    this.getOptions()
    if (this.item) {
      this.flag = '编辑'
      this.getInfo(this.item.id)
    } else {
      this.flag = '新增';
      this.form.setupTime=new Date();
    }
  },
  mounted() {
    if (this.flag === '新增') {
      document.getElementsByClassName('el-dialog__wrapper')[0].style.position = 'fixed !important'
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
  top: auto !important;
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
</style>
