<template>
  <div class="fileupload">
    <div class="title-header">
      <span>附件上传</span>
      <div class="closed" @click="closedwin"></div>
    </div>
    <div class="splitline pid"></div>
    <div class="step">
      <div class="ul-name">
        <span class="ul-name-label"></span><span class="ul-name-text">投模指标</span>
      </div>
      <div class="ul-file">
        <el-upload
          class="upload-demo"
          :action="url"
          :headers="headers"
          :data="fileData1"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          :file-list="fileList1">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <span class="prompting" v-show="fileList1.length>0?false:true">请点击按钮上传附件</span> -->
        </el-upload>
        <div class="ul-remark"><span class="ul-remark-text">注：只支持excel文件</span></div>
      </div>


    </div>
    <div class="splitline"></div>

    <div class="step">
      <div class="ul-name">
        <span class="ul-name-label"></span><span class="ul-name-text">上传最终户型块及总图</span>
      </div>
      <div class="ul-file">
        <el-upload
          class="upload-demo"
          :action="url"
          :data="fileData2"
          :headers="headers"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload1"
          :file-list="fileList2">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      <div class="ul-remark"><span class="ul-remark-text">注：只支持CAD(dwg)、龙湖通(cpi、3ds、dwg)文件</span></div>
      </div>
    </div>
    <div class="splitline"></div>

    <div class="step">
      <div class="ul-name">
        <span class="ul-name-label"></span><span class="ul-name-text">上传户型的客群信息</span>
      </div>
      <div class="ul-file">
        <el-upload
          class="upload-demo"
          :action="url"
          :data="fileData3"
          :headers="headers"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          :file-list="fileList3">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div class="ul-remark"><span class="ul-remark-text">注：只支持excel文件</span></div>
      </div>



    </div>
    <div class="splitline"></div>

    <div class="step">
      <div class="ul-name">
        <span class="ul-name-label"></span><span class="ul-name-text">上传用地价值分析</span>
      </div>
      <div class="ul-file">
        <el-upload
          class="upload-demo"
          :action="url"
          :data="fileData4"
          :headers="headers"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload2"
          :file-list="fileList4">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div class="ul-remark"><span class="ul-remark-text">注：只支持ppt,pptx文件</span></div>
      </div>
    </div>
    <div class="splitline"></div>

    <div class="step">
      <div class="ul-name">
        <span class="ul-name-label"></span><span class="ul-name-text">勾选推荐项目匹配点</span>
      </div>
      <div class="ul-file">
        <el-upload
          class="upload-demo"
          :action="url"
          :data="fileData5"
          :headers="headers"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          :file-list="fileList5">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div class="ul-remark"><span class="ul-remark-text">注：只支持excel文件</span></div>
      </div>



    </div>
    <div class="splitline"></div>

    <div class="step">
      <div class="ul-name">
        <span class="ul-name-label"></span><span class="ul-name-text">预案评审单</span>
      </div>
      <div class="ul-file">
        <el-upload
          class="upload-demo"
          :action="url"
          :data="fileData6"
          :headers="headers"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          :file-list="fileList6">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div class="ul-remark"><span class="ul-remark-text">注：只支持excel文件</span></div>
      </div>



    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        nameList: [],//收集文件名
        fileList1: [],
        fileList2: [],
        fileList3: [],
        fileList4: [],
        fileList5: [],
        fileList6: [],
        headers: {"platform": "pc", "token": localStorage.getItem('token'), 'version': '1'},
        url: "http://test-longcity.longfor.com:9080/longcity/services/v1/developPlanAttach/upload",
        fileData1: {type: 1, planId: '12'},
        fileData2: {type: 2, planId: '12'},
        fileData3: {type: 3, planId: '12'},
        fileData4: {type: 4, planId: '12'},
        fileData5: {type: 5, planId: '12'},
        fileData6: {type: 6, planId: '12'},
      };
    },
    props: ['dataPlanId'],
    created() {
      this.fileData1 = {type: 1, planId: this.dataPlanId}
      this.fileData2 = {type: 2, planId: this.dataPlanId}
      this.fileData3 = {type: 3, planId: this.dataPlanId}
      this.fileData4 = {type: 4, planId: this.dataPlanId}
      this.fileData5 = {type: 5, planId: this.dataPlanId}
      this.fileData6 = {type: 6, planId: this.dataPlanId}
      this.$http({
        method: 'GET',
        url: 'longcity/services/v1/developPlanAttach/findByPlanId?planId=' + this.dataPlanId,
        headers: {"platform": "pc", "token": localStorage.getItem('token'), "version": "1"},
        emulateJSON: true
      }).then((resp) => {
        if (resp.data.code == 200) {
          console.log(resp.data.message)
          let files = resp.data.result
          for (var i = 0; i < files.length; i++) {
            if (files[i].type == "1") {
              for (var l = 0; l < files[i].items.length; l++) {
                this.fileList1.push({
                  'name': files[i].items[l].fileName,
                  url: files[i].items[l].url,
                  response: {result: {id: files[i].items[l].id}}
                })
                this.nameList.push(files[i].items[l].fileName)
              }
            }
            if (files[i].type == "2") {
              for (var l = 0; l < files[i].items.length; l++) {
                this.fileList2.push({
                  'name': files[i].items[l].fileName,
                  url: files[i].items[l].url,
                  response: {result: {id: files[i].items[l].id}}
                })
                this.nameList.push(files[i].items[l].fileName)
              }
            }
            if (files[i].type == "3") {
              for (var l = 0; l < files[i].items.length; l++) {
                this.fileList3.push({
                  'name': files[i].items[l].fileName,
                  url: files[i].items[l].url,
                  response: {result: {id: files[i].items[l].id}}
                })
                this.nameList.push(files[i].items[l].fileName)
              }
            }
            if (files[i].type == "4") {
              for (var l = 0; l < files[i].items.length; l++) {
                this.fileList4.push({
                  'name': files[i].items[l].fileName,
                  url: files[i].items[l].url,
                  response: {result: {id: files[i].items[l].id}}
                })
                this.nameList.push(files[i].items[l].fileName)
              }
            }
            if (files[i].type == "5") {
              for (var l = 0; l < files[i].items.length; l++) {
                this.fileList5.push({
                  'name': files[i].items[l].fileName,
                  url: files[i].items[l].url,
                  response: {result: {id: files[i].items[l].id}}
                })
                this.nameList.push(files[i].items[l].fileName)
              }
            }
            if (files[i].type == "6") {
              for (var l = 0; l < files[i].items.length; l++) {
                this.fileList6.push({
                  'name': files[i].items[l].fileName,
                  url: files[i].items[l].url,
                  response: {result: {id: files[i].items[l].id}}
                })
                this.nameList.push(files[i].items[l].fileName)
              }
            }
          }
        }
      }, (err) => {
        console.log(err);
      })
    },
    methods: {
      //验证文件名不能重复
      noRepeatName(file) {
        var flag = true;
        this.nameList.map((item) => {
          if (item == file.name) {
            flag = false;
          }
        })
        return flag;
      },
      //删除nameList中指定的元素
      removeName(file) {
        Array.prototype.indexOf = function (val) {
          for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
          }
          return -1;
        };
        Array.prototype.remove = function (val) {
          var index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        this.nameList.remove(file.name)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        if(file.response){
          this.$http({
            method: 'POST',
            url: 'longcity/services/v1/developPlanAttach/delete',
            data: {
              "id": file.response.result.id
            },
            headers: this.headers,
            emulateJSON: true
          }).then((resp) => {
            if (resp.data.code == 200) {
              console.log(resp.data.message)
              this.removeName(file)
            }
          }, (err) => {
            console.log(err);
          })
        }
      },
      handlePreview() {

      },
      closedwin() {
        this.$emit('closefileUp', 'u')
      },
      beforeAvatarUpload(file) {
        var isRrsult = file.name.split(".")[file.name.split(".").length-1] == 'xls' || file.name.split(".")[file.name.split(".").length-1] == 'xlsx'
        if (!isRrsult) {
          alert('上传附件只能是EXCEL格式!');
          return isRrsult;

        }
        if (!this.noRepeatName(file)) {
          alert("文件名重复");
          return false;
        } else {
          this.nameList.push(file.name)
          console.log(this.nameList)
        }
      },
      beforeAvatarUpload1(file) {

        var isRrsult = file.name.split(".")[file.name.split(".").length-1] == 'dwg' || file.name.split(".")[file.name.split(".").length-1] == 'cpi' || file.name.split(".")[file.name.split(".").length-1] == '3ds'

        if (!isRrsult) {
          alert('上传附件只能是CAD(dwg)、龙湖通（cpi、3ds、dwg）格式!');
          return isRrsult;
        }
        if (!this.noRepeatName(file)) {
          alert("文件名重复");
          return false;
        } else {
          this.nameList.push(file.name)
        }

      },
      beforeAvatarUpload2(file) {

        var isRrsult = file.name.split(".")[file.name.split(".").length-1] == 'ppt' || file.name.split(".")[file.name.split(".").length-1] == 'pptx'
        if (!isRrsult) {
          alert('上传附件只能是ppt格式!');
          return isRrsult;
        }
        if (!this.noRepeatName(file)) {
          alert("文件名重复");
          return false;
        } else {
          this.nameList.push(file.name)
        }
      }
    },
    watch: {
      setPalnIdData: function (val) {
      }
    }
  }
</script>
<style scoped>
  @import "add.css";

  .title-header {
    width: 800px;
    height: 72px;
    line-height: 72px;
    position: fixed;
    text-align: left;
    font-size: 24px;
    background: #fff;
    box-sizing: border-box;
    padding-left:34px;
    z-index: 100;
    font-weight: 600;
    border-bottom: 1px solid #a7acaf;
  }

  .pid {
    padding-top: 68px;
  }

  .el-upload-list__item {
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    font-size: 14px;
    color: #48576a;
    line-height: 1.8;
    margin-top: 5px;
    box-sizing: border-box;
    border-radius: 4px;
    width: 10%;
    position: relative;
  }

  .el-upload-list li {
    float: left;
    width: 200px;
  }

  .ul-name {
    padding-top:12px;
    margin-bottom: 20px;
  }

  .ul-file {
    width:200px;
    position: relative;
  }
  .el-upload>.el-button{
    width:200px;
    height: 36px;
    background:#67649f;
    border:0;
    border:none;
    margin-bottom:10px;
    font-size:14px;
  }

  .ul-name-label {
    width: 5px;
    height: 16px;
    background: #67649f;
    margin-right:10px;
    vertical-align: middle;
  }

  .ul-remark {
    position: absolute;
    top:0;
    right: -420px;
    height: 36px;
    width:400px;
    line-height: 36px;
  }

  .ul-remark-text {
    color: red;
  }

  .ul-name-text {
    font-size: 16px;
    line-height: 32px;
    vertical-align: middle;
  }

  .step {
    margin: 0 34px 20px;
  }

</style>
