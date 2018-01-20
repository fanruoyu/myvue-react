<template>
  <div class="container">
    <div class="left">{{title}}</div>
    <div class="right">
      <el-select :disabled="disabled" style="width:100%" v-model="proBusinessInfo[text]" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode">
        </el-option>
      </el-select>

      <div class="textareaBox">
        <textarea :disabled="disabled" name="" v-model="proBusinessInfo[text+'State']" class="decision"
                  placeholder="请输入" :maxlength="textLen"></textarea>
        <span class="statistics">{{proBusinessInfo[text+'State'] ? proBusinessInfo[text+'State'].length : 0}}/{{textLen || 140}}</span>
      </div>

    </div>
  </div>


</template>
<script>
  export default {
    name: 'businessInputItem',
    props: ['disabled', 'title', 'options', 'text', 'textLen', 'proBusinessInfo'],
    data() {
      return {
        value: [],
        textValue: this.text.sync
        /* textValue: this.text,
         value:[]*/
      }
    },
    methods: {},
    mounted: function () {

    }
  }
</script>
<style scoped lang="less">

  .container {
    margin-bottom: 20px;
    .left {
      float: left;
      width: 80px;
      text-align: center;

    }

    .right {

      margin-left: 80px;
      padding: 0 10px;
      .textareaBox {
        position: relative;
        .decision {
          width: 100%;
          box-sizing: border-box;
          margin: 5px 0;
          height: 100px;
          border: 1px solid #bfcbd9;
          border-radius: 4px;
          cursor: pointer;
          overflow: auto;
          background-color: #f9f9f9;
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

    }
  }


</style>
