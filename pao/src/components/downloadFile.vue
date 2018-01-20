<template>
	<div id="downloadFile">
    <table border="0" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th>附件名称</th>
                <th>文件大小</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(v,index) in tableData">
                <td>{{v.fileName}}</td>
                <th>{{v.fileSize}}</th>
                <th><a :href="v.fileUrl" target="_blank">下载</a></th>
              </tr>
            </tbody>
    </table>
  </div>
</template>
<script>
export default {
    name: 'downloadFile',
    data() {
      return {
      }
    },
    methods:{

    },
    props:
    {
      tableData:Array
    }

 }
</script>
<style scoped>
#downloadFile{
	width:100%;
	height: auto
}
#downloadFile .btnBox{
  width:80px;
  height:40px;
  line-height:40px;
  float: right;
}
#downloadFile .btnBox .el-button{
  width:80px;
  height:30px;
  background: #67649F;
  border:0;
}
#downloadFile table{
	width:100%;
}
#downloadFile table thead{
	background: #E2E2ED;
}
#downloadFile table tr{
	height:35px;
	cursor:pointer;
}
#downloadFile table td,#downloadFile table th{
	border:1px solid #ddd;
	padding:0 5px;
}
</style>
