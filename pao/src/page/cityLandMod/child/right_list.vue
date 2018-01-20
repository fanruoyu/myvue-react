<template>
  <div>
    <div v-if="currentTableData.length > 0">
      <ul class='info-list'>
        <licomponents v-for="(v, index) in currentTableData" :key='index' :data='v' @edit="edit" @deleteIndustry="deleteIndustry" :map="map" :polygon='polygon' :marker='marker'></licomponents>
      </ul>
    </div>
    <div class="no-data" v-else>当前城市暂无产业！</div>
    <div class="page-list" v-if="currentTableData.length > 0">
      <span class="info_length" ref='info_length'>共{{tableData.length}}条</span>
      <div class="page-box">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="size" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import licomponent from './info-child.vue';
export default {
  data() {
    return {
      currentPage: 0,
      total: 0,
      searchKey: '',
      list: '',
      currentTableData: [],
      wid: this.tableData.length / this.size
    }
  },
  props: ['tableData', 'cityCode', 'label', 'size', 'map', 'polygon', 'marker'],
  components: {
    licomponents: licomponent
  },
  watch: {
    tableData: {
      handler: function(val, oldVal) {
        this.currentPage = 1
        this.total = val.length
        this.handleCurrentChange(this.currentPage)
      },
      deep: true,

    },
    currentPage: {
      handler: function(val, oldVal) {
        this.handleCurrentChange(val)
      },
      deep: true
    }
  },
  methods: {
    showbutton(e) {
      let index = e.path[0].getAttribute('index');
      this.isshowbutton.forEach((item, key, arr) => {
        this.isshowbutton[key] = 0;
      })
      this.isshowbutton[index] = true;
    },
    handleCurrentChange(val, list) {
      setTimeout(() => {
        if (document.querySelector('.info_length')) {
          if (this.tableData.length / this.size >= 5) {
            document.querySelector('.info_length').style = `
                    position:fixed;
                    bottom:20px;
                    right:330px;
                  `
          } else {
            document.querySelector('.info_length').style = `
                  position:fixed;
                  bottom:20px;
                  right:200px;
                `
          }
        }

      }, 100)


      this.isshowbutton = [];
      if (list) {
        this.currentTableData = this.list.slice((val - 1) * this.size, val * this.size);
      } else {
        this.currentTableData = this.tableData.slice((val - 1) * this.size, val * this.size);
      }
      this.currentTableData.forEach((item, key, arr) => {
        this.isshowbutton.push(0)
      })
      this.$emit('overlays', this.currentTableData)
    },
    KeyDown(e) {
      if (e.keyCode == 13) {
        this.searchProject(this.searchKey);
      }
    },
    // 编辑
    edit(v) {
      this.$emit('edit', v)
    },
    // 删除
    deleteIndustry(v) {
      this.$emit('finish','')
    }
  }
}
</script>
<style scoped>
ul.info-list,
.no-data {
  height: 100%;
  position: absolute;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 100px 0 100px;
}

ul.info-list li {
  height: 70px;
  border-bottom: 1px solid #ccc;
  line-height: 69px;
  box-sizing: border-box;
  padding-left: 24px;
  cursor: pointer;
}

ul.info-list li:hover {
  background: #eee;
}

.page-list {
  position: fixed;
  height: 100px;
  background: #fff;
  width: 400px;
  bottom: 0;
  right: 0
}

.page-box {
  position: fixed;
  bottom: 20px;
  right: 10px;
}
</style>
