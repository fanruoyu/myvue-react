<template>
  <div>
    <el-dialog title="编辑产业园信息" :visible.sync="dialogFormVisible" size="tiny" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="form" label-position="top" ref="form" :rules="rules">
        <el-form-item label="产业园名称" prop="name">
          <el-input v-model="form.name" auto-complete="off" placeholder="请输入板块名称"></el-input>
        </el-form-item>
        <el-form-item label="所在产业板块名称" prop="industryCode">
          <el-select v-model="form.industryCode" filterable placeholder="请选择所在板块" prop="industryCode">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最近一年产值" prop="yearProduction">
          <el-input placeholder="最值±100,000,000，保留小数点后4位，允许为负数" v-model="form.yearProduction">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="产值近三年复合增长率(%)" prop="threeYearRate">
          <el-input placeholder="最值±100,000，保留小数点后2位，允许为负数" v-model="form.threeYearRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="最近一年增加值" prop="yearAdd">
          <el-input placeholder="最值±100,000,000，保留小数点后4位，允许为负数" v-model="form.yearAdd">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="增加值近三年复合增长率(%)" prop="threeYearAddRate">
          <el-input placeholder="最值±100,000，保留小数点后2位，允许为负数" v-model="form.threeYearAddRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="产业园区简介" prop="parkDesc">
          <el-input v-model="form.parkDesc" auto-complete="off" type="textarea" :rows="5" placeholder="请输入简介" :maxlength="500"></el-input>
        </el-form-item>
        <el-form-item label="管委会领导" prop="manageLeader">
          <el-input v-model="form.manageLeader" auto-complete="off" type="textarea" :rows="5" placeholder="管委会领导" :maxlength="64"></el-input>
        </el-form-item>
        <el-form-item label="领导主职位" prop="manageJob">
          <el-input v-model="form.manageJob" auto-complete="off" type="textarea" :rows="5" placeholder="领导主职位" :maxlength="64"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('finish','')">取 消</el-button>
        <el-button type="primary" @click="save('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'cyyEdit',
  data() {
     var validateYearAdd = (rule, value, callback) => {
       if(value===''){
         callback();
       }else{
        if (!isNaN(value)) {
          if (parseFloat(value).toFixed(4) != parseFloat(value)) {
            callback(new Error('请保留小数点后4位'));
          } else {
            if (parseFloat(value) > 100000000 || parseFloat(value) < -100000000) {
              callback(new Error('总产值，单位：万元，最值±100,000,000'));
            }
          }
          callback();
        } else {
          callback(new Error("总产值为有效数字"));
        }
       }
    };
    var validateThreeYearRate = (rule, value, callback) => {
      if(value===''){
        callback()
      }else{
      if (!isNaN(value)) {
          if (parseFloat(value).toFixed(2) != parseFloat(value)) {
            callback(new Error('请保留小数点后2位'));
          } else {
            if (parseFloat(value) > 100000 || parseFloat(value) < -100000) {
              callback(new Error('总产值，单位：万元，最值±100,000'));
            }
          }
          callback();
        } else {
          callback(new Error("总产值为有效数字"));
        }        
      }
    };
    return {
      dialogFormVisible: true,
      options: [],
      modal: false,
      polygon: '',
      form: {
        name: '',
        polyline: '',
        industryCode: '',   // 产业园的所属产业板块code
        yearProduction: '',  // 最近一年产值，单位：万元，最值±100,000,000，保留小数点后4位，允许为负数
        threeYearRate: '', // 产值近三年复合增长率，单位：%,最值±100,000，保留小数点后2位，允许为负数
        yearAdd: '',  // 最近一年增加值，单位：万元，最值±100,000,000，保留小数点后4位，允许为负数
        threeYearAddRate: '',     // 增加值近三年复合增长率，单位：%,最值±100,000，保留小数点后2位，允许为负数
        parkDesc: '',   // 产业园简介
        manageLeader: '',   // 管委会领导
        manageJob: ''  // 领导主职位
      },
      rules: {
        name: [
          { required: false, max: 64, message: '最多为64个字符', trigger: 'blur' },
        ],
        threeYearRate: [
          { required: false, validator: validateThreeYearRate, trigger: 'blur' }
        ],
        threeYearAddRate: [
          { required: false, validator: validateThreeYearRate, trigger: 'blur' }
        ],
        yearAdd: [
          { required: false, validator: validateYearAdd, trigger: 'blur' }
        ],
        yearProduction: [
          { required: false, validator: validateYearAdd, trigger: 'blur' }
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
    /*
     * 根据板块Id获取详细信息
     */
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
    getInfo(id) {
      this.$http.get(`/longcity/services/v1/industryPlate/getParkInfo?id=${id}`).then(res => {
        if (res.data.code == 200 || res.data.code == '200') {
          this.$emit('edit', res.data.result);
          this.form = res.data.result
        }
      })
    },
    // 获取板块下拉列表项
    getOptions() {
      const data = {
        type: '1',
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
        Promise.resolve('res', res)
      })
    },
    // 产业园保存
    save(formName) {
      if (this.submitForm(formName)){
        var rt = '';
        rt = this.polyline;
        if (this.flag === '编辑') {
          var str = '';
          if (this.obj.type == 1) {
            this.obj.polygon.getPath().forEach((item, index) => {
              if (index == this.obj.polygon.getPath().length - 1) {
                str += item.lng + ',' + item.lat
              } else {
                str += item.lng + ',' + item.lat + ';'
              }
            })
          }
          rt = str;
        }
        console.log(rt)
        const data = {
          name: this.form.name,
          polyline: rt,
          industryCode: this.form.industryCode,   // 产业园的所属产业板块code
          yearProduction: this.form.yearProduction,  // 最近一年产值，单位：万元，最值±100,000,000，保留小数点后4位，允许为负数
          yearAdd: this.form.yearAdd, // 产值近三年复合增长率，单位：%,最值±100,000，保留小数点后2位，允许为负数
          threeYearRate: this.form.threeYearRate,  // 最近一年增加值，单位：万元，最值±100,000,000，保留小数点后4位，允许为负数
          threeYearAddRate: this.form.threeYearAddRate,     // 增加值近三年复合增长率，单位：%,最值±100,000，保留小数点后2位，允许为负数
          parkDesc: this.form.parkDesc,   // 产业园简介
          manageLeader: this.form.manageLeader,   // 管委会领导
          manageJob: this.form.manageJob  // 领导主职位
        }
        if (this.flag === '编辑') {
          data.id = this.item.id
        }
        console.log(data)
        this.$http.post('/longcity/services/v1/industryPark/save', data).then(res => {
          if (res.data.code === 200 || res.data.code === '200') {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'success'
            });
            this.$emit('finish', '')
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
      this.flag = '新增'
      this.modal = true
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
</style>
