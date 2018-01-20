<template>
  <div class="fileupload">
    <div class="title-header">
      <span>附件下载</span>
      <div class="closed"  @click="closedwin"></div>
    </div>
    <div class="splitline pid"></div>
    <div class="step">
      <div class="ul-name">
        <span class="ul-name-label"></span><span class="ul-name-text">投模指标</span>
      </div>
      <div class="ul-file">
        <a class ="" :class="fileType1.length<=1?'formatAherf':'formatAherfActive'" :href="fileType1.length<=1?'javascript:;':loadlurl1">全部下载</a>
        <ul>
          <li v-for="(item,index) in fileType1" :key="index">
            <a :href="url+item.id+token">{{item.fileName}}</a>
          </li>
        </ul>
      </div>
      <div class="ul-remark"><span class="ul-remark-text">注：excel</span></div>

    </div>
    <div class="splitline"></div>

    <div class="step">
      <div class="ul-name">
        <span class="ul-name-label"></span><span class="ul-name-text">上传最终户型块及总图</span>
      </div>
      <div class="ul-file">
        <a class ="formatAherf" :class="fileType2.length<=1?'formatAherf':'formatAherfActive'" :href="fileType2.length<=1?'javascript:;':loadlurl2">全部下载</a>
        <ul>
          <li v-for="(item,index) in fileType2" :key="index">
            <a :href="url+item.id+token">{{item.fileName}}</a>
          </li>
        </ul>
      </div>
      <div class="ul-remark"><span class="ul-remark-text">注：CAD(dwj)、龙湖通（下周给格式</span></div>


    </div>
    <div class="splitline"></div>

    <div class="step">
      <div class="ul-name">
        <span class="ul-name-label"></span><span class="ul-name-text">上传户型的客群信息</span>
      </div>
      <div class="ul-file">
        <a class ="formatAherf" :class="fileType3.length<=1?'formatAherf':'formatAherfActive'" :href="fileType3.length<=1?'javascript:;':loadlurl3">全部下载</a>
        <ul>
          <li v-for="(item,index) in fileType3" :key="index">
            <a :href="url+item.id+token">{{item.fileName}}</a>
          </li>
        </ul>
      </div>
      <div class="ul-remark"><span class="ul-remark-text">注：CAD(dwj)、jpg</span></div>


    </div>
    <div class="splitline"></div>

    <div class="step">
      <div class="ul-name">
        <span class="ul-name-label"></span><span class="ul-name-text">上传用地价值分析</span>
      </div>
      <div class="ul-file">
        <a class ="formatAherf" :class="fileType4.length<=1?'formatAherf':'formatAherfActive'" :href="fileType4.length<=1?'javascript:;':loadlurl4">全部下载</a>
        <ul>
          <li v-for="(item,index) in fileType4" :key="index">
            <a :href="url+item.id+token">{{item.fileName}}</a>
          </li>
        </ul>
      </div>
      <div class="ul-remark"><span class="ul-remark-text">注：excel</span></div>


    </div>
    <div class="splitline"></div>

    <div class="step">
      <div class="ul-name">
        <span class="ul-name-label"></span><span class="ul-name-text">勾选推荐项目匹配点</span>
      </div>
      <div class="ul-file">
        <a class ="formatAherf" :class="fileType5.length<=1?'formatAherf':'formatAherfActive'" :href="fileType5.length<=1?'javascript:;':loadlurl5">全部下载</a>
        <ul>
          <li v-for="(item,index) in fileType5" :key="index">
            <a :href="url+item.id+token">{{item.fileName}}</a>
          </li>
        </ul>
      </div>
      <div class="ul-remark"><span class="ul-remark-text">注：excel</span></div>


    </div>
    <div class="splitline"></div>

    <div class="step">
      <div class="ul-name">
        <span class="ul-name-label"></span><span class="ul-name-text">预案评审单</span>
      </div>
      <div class="ul-file">
        <a class ="formatAherf" :class="fileType6.length<=1?'formatAherf':'formatAherfActive'" :href="fileType6.length<=1?'javascript:;':loadlurl6">全部下载</a>
        <ul>
          <li v-for="(item,index) in fileType6" :key="index">
            <a :href="url+item.id+token">{{item.fileName}}</a>
          </li>
        </ul>
      </div>
      <div class="ul-remark"><span class="ul-remark-text">注：excel</span></div>


    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        loadlurl1:'http://test-longcity.longfor.com:9080',
        loadlurl2:'http://test-longcity.longfor.com:9080',
        loadlurl3:'http://test-longcity.longfor.com:9080',
        loadlurl4:'http://test-longcity.longfor.com:9080',
        loadlurl5:'http://test-longcity.longfor.com:9080',
        loadlurl6:'http://test-longcity.longfor.com:9080',
        newplanId:'http://test-longcity.longfor.com:9080',
        url:'http://test-longcity.longfor.com:9080/longcity/services/v1/developPlanAttach/download?id=',
        token: '&token='+localStorage.getItem('token'),
        fileType1:[],
        fileType2:[],
        fileType3:[],
        fileType4:[],
        fileType5:[],
        fileType6:[],
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    methods: {
      closedwin(){
        this.$emit('closefileDown', 'd')
      }
    },
    props:['dataPlanId'],
    created(){
      this.newplanId = this.dataPlanId
      this.loadlurl1= this.loadlurl1+'/longcity/services/v1/developPlanAttach/downloadZip?planId='+this.dataPlanId+'&type=1&token='+localStorage.getItem('token')
      this.loadlurl2= this.loadlurl2+'/longcity/services/v1/developPlanAttach/downloadZip?planId='+this.dataPlanId+'&type=2&token='+localStorage.getItem('token')
      this.loadlurl3= this.loadlurl3+'/longcity/services/v1/developPlanAttach/downloadZip?planId='+this.dataPlanId+'&type=3&token='+localStorage.getItem('token')
      this.loadlurl4= this.loadlurl4+'/longcity/services/v1/developPlanAttach/downloadZip?planId='+this.dataPlanId+'&type=4&token='+localStorage.getItem('token')
      this.loadlurl5= this.loadlurl5+'/longcity/services/v1/developPlanAttach/downloadZip?planId='+this.dataPlanId+'&type=5&token='+localStorage.getItem('token')
      this.loadlurl6= this.loadlurl6+'/longcity/services/v1/developPlanAttach/downloadZip?planId='+this.dataPlanId+'&type=6&token='+localStorage.getItem('token')
      this.$http({
        method:'GET',
        url:'longcity/services/v1/developPlanAttach/findByPlanId?planId='+this.newplanId,
        headers:{"platform": "pc","token":localStorage.getItem('token'),"version":"1"},
        emulateJSON: true
      }).then((resp)=>{
        if(resp.data.code==200){
          console.log(resp.data.message)
          let files = resp.data.result
          for(var i =0;i<files.length;i++){
            if(files[i].type=="1"){
              this.fileType1 = files[i].items
            }
            if(files[i].type=="2"){
              this.fileType2 = files[i].items
            }
            if(files[i].type=="3"){
              this.fileType3 = files[i].items
            }
            if(files[i].type=="4"){
              this.fileType4 = files[i].items
            }
            if(files[i].type=="5"){
              this.fileType5 = files[i].items
            }
            if(files[i].type=="6"){
              this.fileType6 = files[i].items
            }
          }
        }
      },(err)=>{
        console.log(err);
      })
    }
  }
</script>
<style scoped>
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
  .pid{
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
  .ul-name{
    padding-top:12px;
    margin-bottom: 20px;
  }
  .ul-file{
    width:500px;
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

  .ul-name-label{
    width: 5px;
    height: 16px;
    background: #67649f;
    margin-right:10px;
    vertical-align: middle;

  }
  .ul-remark{
    position: absolute;
    top:0;
    right: -420px;
    height: 36px;
    width:400px;
    line-height: 36px;
  }
  .ul-remark-text{
    color: red;
  }
  .ul-name-text{
    font-size: 16px;
    line-height: 32px;
    vertical-align: middle;
  }
  .step {
    margin: 0 34px 20px;
  }
  /*按钮样式*/
  .formatAherf {
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    text-align: center;
    min-width: 200px;
    cursor: pointer;
    border-radius: 4px;
    color: #bfcbd9;
    background-color: #eef1f6;
    border: 1px solid #d8d5d5;
    margin-bottom: 20px;
  }
  /*按钮样式*/
  .formatAherfActive {
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    text-align: center;
    min-width: 200px;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #fff;
    background-color: #67649F;
    margin-bottom: 20px;
  }
  @import "add.css";
</style>
