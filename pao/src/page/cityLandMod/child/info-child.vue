<template>
  <li @mouseenter='showbutton' @mouseleave='hidebutton' @click.stop="biaoji(data)">
    <el-row :gutter="10">
      <el-col :span="12">
        <p class="fl" :title="data.label">{{data.name}}</p>
      </el-col>
      <el-button type="text" icon="edit" @click.stop="edit(data)" v-show="isshowbutton">编辑</el-button>&nbsp;
      <el-button type="text" icon="delete" @click.stop="deleteIndustry(data)" v-show="isshowbutton">删除</el-button>
    </el-row>
  </li>
</template>
<script>
export default {
  name: 'licomponent',
  props: ['data', 'map', 'polygon', 'marker'],
  data() {
    return {
      isshowbutton: false
    }
  },
  methods: {
    showbutton() {
      this.isshowbutton = true
    },
    hidebutton() {
      this.isshowbutton = false;
    },
    biaoji(data) {
      if (this.data.type == 1 || this.data.type == 2) {
        for (var i in this.polygon) {
          this.polygon[i].polygon.setFillOpacity(.5);
        }
        this.polygon['id-' + data.id].polygon.setFillOpacity(1);
        return;
      } else if (this.data.type == 3) {
        for (var i in this.marker) {
          this.marker[i].marker.setAnimation(null);
        }
        
        this.marker['id-' + data.id].marker.setAnimation(4);
        return;
      }
    },
    edit(data) {
      this.$emit('edit', data)
    },
    //删除
    deleteIndustry(item) {
      this.$confirm(`此操作将删除${item.name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: item.id
        }
        switch (item.type) {
          case 1:
            this.$http.post('/longcity/services/v1/industryPlate/delete', data).then(res => {
              if(res.data.code==200||res.data.code=='200'){
                console.log(res.data)
                this.$message({
                  type: 'success',
                  message: res.data.message
                });
              } 
            })
            break;
          case 2:
            this.$http.post('/longcity/services/v1/industryPark/delete', data).then(res => {
              if(res.data.code==200||res.data.code=='200'){
                console.log(res.data)
                this.$message({
                  type: 'success',
                  message: res.data.message
                });
              } 
            })
            break;
          case 3:
            this.$http.post('/longcity/services/v1/keyEnterprises/delete', data).then(res => {
              if(res.data.code==200||res.data.code=='200'){
                this.$message({
                  type: 'success',
                  message: res.data.message
                });
              } 
            })
        }
        this.$emit('deleteIndustry')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
<style scoped>
li {
  position: relative;
}
li .el-button {
  position: absolute;
  right: 80px;
  height: 100%;
}
li .el-button:last-child {
  right: 20px;
  height: 100%;
}

</style>



