<template>
	<div id="addFile">
		<div class="btnBox">
          <el-upload
            class=""
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary"><label style="margin-right:10px">+</label>上传</el-button>
          </el-upload>
        </div>
        <table border="0" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th>附件名称</th>
                <th>文件大小</th>
                <th>权限</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              	<tr>
                	<td>test</td>
                	<th>434.m</th>
                	<th>
                 	 	<select>
                    		<option selected>公开</option>
                    		<option>私密</option>
                  		</select>
                	</th>
                	<th>删除</th>
              	</tr>
              	<tr>
                	<td>test</td>
                	<th>434.m</th>
                	<th>
                 	 	<select>
                    		<option selected>公开</option>
                    		<option>私密</option>
                  		</select>
                	</th>
                	<th>删除</th>
              	</tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'addFile',
    data() {
      return {

      }
    },
    methods:{
         
    }
 }
</script>
<style scoped>
#addFile{
	width:100%;
	height: auto
}
#addFile .btnBox{
  width:80px;
  height:40px;
  line-height:40px;
  float: right;
}
#addFile .btnBox .el-button{
  width:80px;
  height:30px;
  background: #67649F;
  border:0;
}
#addFile table{
	width:100%;
}
#addFile table thead{
	background: #E2E2ED;
}
#addFile table tr{
	height:35px;
	cursor:pointer;
}
#addFile table td,#addFile table th{
	border:1px solid #ddd;
	padding:0 5px;
	overflow: hidden;
}
</style>