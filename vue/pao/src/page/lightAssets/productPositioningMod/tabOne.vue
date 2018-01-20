<template>
  <div id="productPositionTabOne">
    <div class="main">
      <div class="c1">
        <ul>
          <li>
            <span>承租合同总产权面积</span>
            <input type="text" name="">
            <label>平米</label>
          </li>
          <li>
            <span>项目总建设面积</span>
            <input type="text" name="">
            <label>平米</label>
          </li>
          <li>
            <span style="line-height:20px">长租公寓及配套商业总可租赁面积</span>
            <input type="text" name="">
            <label>平米</label>
          </li>
          <li>
            <span>承租项目原房间数</span>
            <input type="text" name="">
            <label>间</label>
          </li>
          <li>
            <span>改造后房间总套数</span>
            <input type="text" name="">
            <label>套</label>
          </li>
          <li>
            <span>改造后卧室总间数</span>
            <input type="text" name="">
            <label>间</label>
          </li>
        </ul>
      </div>
      <div class="tag-con">
        <div class="tag-tit fl">产品图片</div>
        <div class="c2 fl">
          <el-button  type="primary" @click="">图片管理
            </el-button>
          <el-tabs type="border-card" class="tabs">
            <el-tab-pane :label="item.label" v-for="(item,key) in imgBox1">
              <p v-if="item.data.length==0">暂无照片</p>
              <slide-show :slides="item.data" v-else="false"></slide-show>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import slideShow from '../../../components/pictureView/slideShow'
  export default {
    components: {
      slideShow,
    },
    data () {
      return {
        constanaOtherAttachments:[],
        imgBox1: [
          {
            "label": "各层总平面图",
            data: [
              {
                "picUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/u=49366202,632101467&fm=27&gp=0.jpg",
                "coordinate": "",
                "picTag": [
                  "3"
                ],
                "picText": "",
                "snapshotUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/u=49366202,632101467&fm=27&gp=0-small.jpg",
                "photoDirection": "",
                "remark": "",
                "picTitle": "u=49366202,632101467&fm=27&gp=0.jpg",
                "picId": 13946
              },
              {
                "picUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/a.jpg",
                "coordinate": "",
                "picTag": [
                  "3"
                ],
                "picText": "",
                "snapshotUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/a-small.jpg",
                "photoDirection": "",
                "remark": "",
                "picTitle": "a.jpg",
                "picId": 13945
              },
              {
                "picUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/3.jpg",
                "coordinate": "",
                "picTag": [
                  "3"
                ],
                "picText": "",
                "snapshotUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/3-small.jpg",
                "photoDirection": "",
                "remark": "",
                "picTitle": "3.jpg",
                "picId": 13944
              },
              {
                "picUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/u=49366202,632101467&fm=27&gp=0.jpg",
                "coordinate": "",
                "picTag": [
                  "3"
                ],
                "picText": "",
                "snapshotUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/u=49366202,632101467&fm=27&gp=0-small.jpg",
                "photoDirection": "",
                "remark": "",
                "picTitle": "u=49366202,632101467&fm=27&gp=0.jpg",
                "picId": 13946
              },
              {
                "picUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/a.jpg",
                "coordinate": "",
                "picTag": [
                  "3"
                ],
                "picText": "",
                "snapshotUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/a-small.jpg",
                "photoDirection": "",
                "remark": "",
                "picTitle": "a.jpg",
                "picId": 13945
              },
              {
                "picUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/3.jpg",
                "coordinate": "",
                "picTag": [
                  "3"
                ],
                "picText": "",
                "snapshotUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/3-small.jpg",
                "photoDirection": "",
                "remark": "",
                "picTitle": "3.jpg",
                "picId": 13944
              },
              {
                "picUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/u=49366202,632101467&fm=27&gp=0.jpg",
                "coordinate": "",
                "picTag": [
                  "3"
                ],
                "picText": "",
                "snapshotUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/u=49366202,632101467&fm=27&gp=0-small.jpg",
                "photoDirection": "",
                "remark": "",
                "picTitle": "u=49366202,632101467&fm=27&gp=0.jpg",
                "picId": 13946
              },
              {
                "picUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/a.jpg",
                "coordinate": "",
                "picTag": [
                  "3"
                ],
                "picText": "",
                "snapshotUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/a-small.jpg",
                "photoDirection": "",
                "remark": "",
                "picTitle": "a.jpg",
                "picId": 13945
              },
              {
                "picUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/3.jpg",
                "coordinate": "",
                "picTag": [
                  "3"
                ],
                "picText": "",
                "snapshotUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/3-small.jpg",
                "photoDirection": "",
                "remark": "",
                "picTitle": "3.jpg",
                "picId": 13944
              }
            ]
          },
          {
            "label": "主力户型信息",
            data: [
              {
                "picUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/a.jpg",
                "coordinate": "",
                "picTag": [
                  "2"
                ],
                "picText": "",
                "snapshotUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/a-small.jpg",
                "photoDirection": "",
                "remark": "",
                "picTitle": "a.jpg",
                "picId": 13943
              },
              {
                "picUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/3.jpg",
                "coordinate": "",
                "picTag": [
                  "2"
                ],
                "picText": "",
                "snapshotUrl": "http://dev-longcity.longfor.com:9080/fileserver/longcity/upload/1711281730/3-small.jpg",
                "photoDirection": "",
                "remark": "",
                "picTitle": "3.jpg",
                "picId": 13942
              }
            ]
          }
        ],
      }
    },
    methods: {
    },
    mounted(){
    }
  }
</script>
<style lang="less">
#productPositionTabOne{
  .main{
    width:96%;
    padding:0 2%;
    height: auto;
    padding-bottom:50px;
  }
  .c1{
    width:92%;
    margin-left:4%;
    height:140px;
    border:1px solid #DDDDDD;
    padding:10px 0;
    border-radius:4px;
  }
  .c1 ul{
    width:100%
  }
  .c1 ul li{
    width:49%;
    float:left;
    height:50px;
  }
  .c1 ul li span{
    width:150px;
    height:50px;
    line-height:40px;
    float:left;
    text-align:right;
  }
  .c1 ul li input{
    height:30px;
    padding:2px;
    float:left;
    margin:0 10px;
  }
  .c1 ul li label{
    display:inline-block;
    height:40px;
    line-height:40px;
    float:left;
  }
  .tag-con {
    width:100%;
  }
  .tag-con .tag-tit{
    width:10%;
    height:40px;
    line-height:40px;
  }
  .c2{
    width:80%;
  }
}
</style>
