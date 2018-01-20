<template>
  <div id="legalReviewTabOne">
    <div class="main">
      <div class="c1 c-tag">
        <div class="fl c1-tit">签约主体</div>
        <div class="fl c1-con">
          <el-select v-model="value"  filterable size="12" placeholder="" @change="changeTag(value)">
            <el-option 
              v-for="item in signList"
              :key="item.signCode"
              :label="item.signName"
              :value="item.signCode">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="tag-con" v-if="tagCon==1">
        <div class="c2">
          <el-tabs type="border-card" class="tabs">
            <el-tab-pane v-for="(item,key) in imgBox1" :label="item.label">
              <p v-if="item.data.length==0">暂无照片</p>
              <slide-show :slides="item.data" v-else="false"></slide-show>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="c3 c-file">
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">企业信用报告</span>
            </load-file>
          </div>
        </div>
      </div>
      <div class="tag-con" v-if="tagCon==2">
        <div class="c2">
          <el-tabs type="border-card" class="tabs">
            <el-tab-pane v-for="(item,key) in imgBox2" :label="item.label">
              <p v-if="item.data.length==0">暂无照片</p>
              <slide-show :slides="item.data" v-else="false"></slide-show>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="c3 c-file">
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">企业信用报告</span>
            </load-file>
          </div>
        </div>
      </div>
      <div class="tag-con" v-if="tagCon==3">
        <div class="c2">
          <el-tabs type="border-card" class="tabs">
            <el-tab-pane v-for="(item,key) in imgBox3" :label="item.label" >
              <p v-if="item.data.length==0">暂无照片</p>
              <slide-show :slides="item.data" v-else="false"></slide-show>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="c3 c-file">
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">企业信用报告</span>
            </load-file>
          </div>
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">前手租赁合同</span>
            </load-file>
          </div>
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">同意转租证明</span>
            </load-file>
          </div>
        </div>
      </div>
      <div class="tag-con" v-if="tagCon==4">
        <div class="c2">
          <el-tabs type="border-card" class="tabs">
            <el-tab-pane v-for="(item,key) in imgBox4" :label="item.label">
              <p v-if="item.data.length==0">暂无照片</p>
              <slide-show :slides="item.data" v-else="false"></slide-show>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="c3 c-file">
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">企业信用报告</span>
            </load-file>
          </div>
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">前手租赁合同</span>
            </load-file>
          </div>
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">同意转租证明</span>
            </load-file>
          </div>
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">委托管理合同</span>
            </load-file>
          </div>
          <div class="c-file-con">
            <load-file  :allOtherFile="constanaOtherAttachments">
              <span slot="title">同意转租委托证明</span>
            </load-file>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import slideShow from '../../../components/pictureView/slideShow'
  import loadFile from '../../../components/uploadAttachments'
  export default {
    components: {
      slideShow,
      loadFile,
    },
    data () {
      return {    
        value:1,
        tagCon:1,
        constanaOtherAttachments:[],
        signList:[
          {
            signCode:1,
            signName:'产权人-公司'
          },
          {
            signCode:2,
            signName:'非产权人-公司'
          },
          {
            signCode:3,
            signName:'非产权人-二房东'
          },
          {
            signCode:4,
            signName:'非产权人-受托管理人'
          },
        ],
        imgBox1: [
          {
            "label": "营业执照",
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
            "label": "法人身份",
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
          },
          {
            "label": "基本信息",
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
              }
            ]
          },
          {
            "label": "司法风险",
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
              }
            ]
          },
          {
            "label": "经营风险",
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
              }
            ]
          }
        ],
        imgBox2: [
          {
            "label": "营业执照",
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
            "label": "法人身份",
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
          },
          {
            "label": "基本信息",
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
              }
            ]
          },
          {
            "label": "司法风险",
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
              }
            ]
          },
          {
            "label": "经营风险",
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
              }
            ]
          }
        ],
        imgBox3: [
          {
            "label": "营业执照",
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
            "label": "法人身份",
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
          },
          {
            "label": "基本信息",
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
              }
            ]
          },
          {
            "label": "司法风险",
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
              }
            ]
          },
          {
            "label": "经营风险",
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
              }
            ]
          }
        ],
        imgBox4: [
          {
            "label": "营业执照",
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
            "label": "法人身份",
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
          },
          {
            "label": "基本信息",
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
              }
            ]
          },
          {
            "label": "司法风险",
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
              }
            ]
          },
          {
            "label": "经营风险",
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
              }
            ]
          }
        ],
      }
    },
    methods: {
      changeTag(v){
        this.tagCon=v;
      }
    },
    mounted(){
    }
  }
</script>
<style lang="less">
#legalReviewTabOne{
  .main,
  {
    width:96%;
    padding:0 2%;
    height: auto;
    padding-bottom:50px;
  }
  .c1{
    width:100%;
    height:50px;
    line-height:50px;
  }
  .c1 .c1-tit{
    width:10%;
  }
  .c2{
    width:80%;
    margin-left:10%;
  }
}
</style>