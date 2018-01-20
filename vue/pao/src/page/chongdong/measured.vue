<template>
    <div id="measured" class="view">
        <div class="measured-header">
            <h2>研发预案测算</h2>
            <div class="measured-address">
                <span>地区公司</span>
                <el-select v-model="scitycode" placeholder="请选择">
                    <el-option class="padd"
                               v-for="item in companyoptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
                <span style="margin-left: 20px">创建人</span>
                <el-input v-model="screateName" placeholder="请输入内容" style="width: 20%"></el-input>
            </div>

            <div class="measured-business">
                <span>业务选择</span>
                <el-select v-model="smodeSelectCode" multiple placeholder="请选择" size="70">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <button class="formatbutton1" v-on:click="searchData" style="margin-left: 10px">查询</button>
            </div>
        </div>
        <div class="measured-content">
            <button class="formatbutton" v-on:click="add" style="margin-bottom: 20px">+添加研发预案</button>
        </div>
        <el-table
                :data="tableData3"
                v-loading="loading2"
                element-loading-text="拼命加载中"
                height="300"
                border
                style="width: 1380px">
            <el-table-column v-for="(item,index) in tabletiltle"
                             :prop="item.prop"
                             :label="item.name"
                             :resizable="falg"
                             :fit="falg"
                             align="center"
                             :width="item.tdwidth" :key="index">
            </el-table-column>

            <el-table-column
                    label="操作"
                    :resizable="falg"
                    :fit="falg"
                    align="center"
                    width="350">
                <template slot-scope="scope">

                    <a @click="openResult(scope.row)" v-show="scope.row.status==1 || scope.row.status==2" type="text"
                       size="small" style="color: #20a0ff;font-size: 14px;cursor: pointer;">查看并下载</a>
                    <a @click="openResult(scope.row)" v-show="scope.row.status==4||scope.row.status==5" type="text"
                       size="small" style="color: #20a0ff;font-size: 14px;cursor: pointer;">查看参数</a>
                    <el-button type="text" :loading="true" v-show="scope.row.status==3" style="font-size:14px;">计算中
                    </el-button>
                    <el-button @click="openfileupwin(scope.row)" v-show="scope.row.status==1" type="text" size="small"
                               style="font-size:14px;">上传附件
                    </el-button>
                    <el-button @click="openfileDownLoadwin(scope.row)" v-show="scope.row.status==2" type="text"
                               size="small" style="font-size:14px;">查看附件
                    </el-button>
                    <!--<el-button @click="openResult(scope.row)" v-show="scope.row.status==1 || scope.row.status==2" type="text" size="small">查看并下载</el-button>-->
                    <el-button @click="reset(scope.row)" v-show="scope.row.status==6" type="text" size="small"
                               style="font-size:14px;">请点击重试
                    </el-button>
                    <!--<el-button @click="openResult(scope.row)" v-show="scope.row.status==4||scope.row.status==5" type="text" size="small">查看参数</el-button>-->
                    <span class="status-warn" v-show="scope.row.status==4||scope.row.status==5">请检查参数重新添加预案</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                class="pagemenu"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="totalData">
        </el-pagination>
        <div class="file-up" v-if="showfileup">
            <FileUp @closefileUp="closedwin" :dataPlanId="planId"></FileUp>
        </div>
        <div class="file-down" v-if="showfiledown">
            <FileDowload @closefileDown="closedwin" :dataPlanId="planId"></FileDowload>
        </div>
        <div class="file-down" v-if="showresult">
            <Result @closefileResult="closedwin" :dataPlanId="planId"></Result>
        </div>
    </div>
</template>
<script>
    import FileUp from './fileupload.vue'
    import FileDowload from './filedowload.vue'
    import Result from './result.vue'

    export default {
        data() {
            return {
                loading2: false,
                eventId: '',
                falg: false,
                planId: '1212121',
                headers: {"platform": "pc", "token": localStorage.getItem('token'), "version": "1"},
                tableData3: [],
                tabletiltle: [{name: '地区公司', prop: 'cityName', tdwidth: 100},
                    {name: '创建人（含龙信ID）', prop: 'createUser', tdwidth: 170},
                    {name: '预案创建时间', prop: 'createTime', tdwidth: 180},
                    {name: '附件上传时间', prop: 'attachUploadTime', tdwidth: 180},
                    {name: '地块编号', prop: 'blockCode', tdwidth: 150}, {
                        name: '相关业态',
                        prop: 'modeSelectName',
                        tdwidth: 100
                    },
                    {name: '预案状态', prop: 'statusText', tdwidth: 150}],
                totalData: 0,
                currentPage: 1,
                showfileup: false,
                showfiledown: false,
                showresult: false,
                scitycode: '',
                screateName: '',
                smodeSelectCode: '',
                fileList1: [],
                fileList: [],
                companyoptions: [{
                    value: '1',
                    label: '杭州'
                }],
                options: [{
                    value: '1',
                    label: '高层'
                }, {
                    value: '2',
                    label: '洋房'
                }, {
                    value: '3',
                    label: '4叠'
                }, {
                    value: '4',
                    label: '联排'
                }]
            }
        },
        methods: {
            handleSuccess(file, fileList) {
                console.log(fileList)
            },
            handleClick(file, fileList) {
                console.log(fileList);
            },
            handleRemove(file, fileList) {
                console.log(fileList);
            },
            handlePreview(file, fileList) {
                console.log(fileList);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.searchData(val)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.searchData(val)
            },
            add: function () {
                this.$router.push({name: 'add', params: {userId: 'wise'}})
            },
            modu: function () {
                this.$router.push({name: 'upfile', params: {userId: 'wise'}})

            },
            closedwin(v) {
                if (v == 'u') {
                    this.showfileup = false
                } else if (v == 'd') {
                    this.showfiledown = false
                } else if (v == 'r') {
                    this.showresult = false
                }

            },
            openfileupwin(row) {
                this.planId = row.id
                this.showfileup = true

            },
            reset(row) {
                this.$http({
                    method: 'GET',
                    url: '/longcity/services/v1/developPlan/reset?id=' + row.id,
                    headers: this.headers,
                    emulateJSON: true
                }).then((resp) => {
                    if (resp.data.code == 200) {
                        alert(resp.data.result)
                    }
                }, (err) => {
                    console.log(err);
                })
            },
            openfileDownLoadwin(row) {
                this.planId = row.id
                this.showfiledown = true

            },
            openResult(row) {
                this.planId = row.id
                if (row.status == 1 || row.status == 2) {
                    window.open('http://test-longcity.longfor.com:9080/longcity-web/#/result/'+row.id+"/view")
                    //window.open('http://localhost:8080/#/result/' + row.id + "/view")
                } else {
                    window.open('http://test-longcity.longfor.com:9080/longcity-web/#/result/'+row.id+"/type")
                    //window.open('http://localhost:8080/#/result/' + row.id + "/type")
                }
//        this.showresult = true

            },
            searchData() {
                this.$http({
                    method: 'POST',
                    url: 'longcity/services/v1/developPlan/list',
                    data: {
                        "start": this.currentPage,
                        "length": 10,
                        "cityCode": this.scitycode,
                        "createName": this.screateName,
                        "modeSelectCode": this.smodeSelectCode.sort().join(",")
                    },
                    headers: this.headers,
                    emulateJSON: true
                }).then((resp) => {
                    if (resp.data.code == 200) {
                        this.tableData3 = resp.data.result.data
                        this.totalData = resp.data.result.total
                    }
                }, (err) => {
                    console.log(err);
                })
            }
        },
        props: ['userId'],
        components: {FileUp, FileDowload, Result},
        destroyed() {
            clearInterval(this.eventId)
        },
        mounted() {
            this.loading2 = this.$route.params.userId
            if(this.loading2){
                setTimeout(() => {
                    this.loading2 = false
                    window.history.go(0);
                }, 3000)
            }
            this.eventId = setInterval(this.searchData, 1000);
            this.tableData3 = []
            this.totalData = 0
            this.$http({
                method: 'POST',
                url: 'longcity/services/v1/developPlan/list',
                data: {
                    "start": 1,
                    "length": 10,
                    "cityCode": "",
                    "createName": "",
                    "modeSelectCode": ""
                },
                headers: this.headers,
                emulateJSON: true
            }).then((resp) => {
                //alert(123)
                if (resp.data.code == 200) {
                    this.tableData3 = resp.data.result.data
                    this.totalData = resp.data.result.total
                }
            }, (err) => {
                console.log(err);
            })
        },
    }
</script>
<style scoped>

    .pagemenu {
        float: right;
        margin: 30px 0 20px;
    }

    #measured {
        font-family: PingFangSC-Regular;
        background: #fff;
        box-sizing: border-box;
        padding: 0 30px;
    }

    .measured-header h2 {
        width: 100%;
        font-size: 16px;
        color: #6863C8;
        line-height: 50px;
        height: 50px;
        border-bottom: 1px solid #f4f3fc;
    }

    .measured-address {
        padding-top: 20px;
        line-height: 60px;
        height: 60px;
    }

    .measured-address span {
        color: #666;
        margin-right: 6px;
        font-size: 14px;
    }

    .measured-address select {
        width: 107px;
        height: 39px;
        margin-right: 20px;
        border-radius: 4px;
        font-size: 14px;
    }

    .measured-address input {
        box-sizing: border-box;
        padding-left: 15px;
        width: 171px;
        height: 39px;
        border: 1px solid #bbb;
        border-radius: 4px;
        color: #000;
    }

    .el-input, .el-input__inner {
        /* width: 100%; */
        display: inline-block;
    }

    .measured-address input:placeholder {
        color: #bbb;
    }

    .measured-business {
        height: 60px;
        display: flex;
        align-items: center;
    }

    .measured-business span {
        color: #666;
        font-size: 14px;
        margin-right: 10px;
    }

    .measured-business a {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        width: 84px;
        color: #fff;
        background: #38C68C;
        border-radius: 4px;
        margin-left: 5px;
    }

    .business-choose {
        width: 50%;
        height: 40px;
        line-height: 40px;
        border: 1px solid #bbb;
        border-radius: 4px;
    }

    .measured-content {
        padding-top: 37px;
    }

    .measured-content a {
        display: block;
        color: #fff;
        background: #6863C8;
        width: 134px;
        height: 36px;
        border-radius: 4px;
        line-height: 36px;
        text-align: center;
    }

    .measured-table {
        margin-top: 30px;
        text-align: center;
        border: 1px solid #bbb;
        width: 1045px;
        border-collapse: collapse;
        font-size: 14px;
        color: #333;
    }

    .measured-table tr {
        height: 60px;
        line-height: 60px;
    }

    .measured-table th {
        border: 1px solid #bbb;
        padding: 0 10px;
        background: #f8f8f8;
    }

    .measured-table td {
        border: 1px solid #bbb;
        padding: 0 10px;
    }

    .measured-table td a {
        color: #77B2FF;
    }

    .measured-table td a:visited {
        color: #FF6363;
    }

    .measured-page {
        width: 1045px;
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .measured-page span {
        margin-left: 10px;
    }

    .measured-page input {
        width: 68px;
        height: 26px;
        text-align: center;
        margin-left: 10px;
        border-radius: 4px;
        border: 1px solid #bbb;
    }

    .measured-page a:first-of-type {
        margin-left: 10px;
        width: 24px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        box-sizing: border-box;
        border: 1px solid #bbb;
        border-radius: 4px;
    }

    .measured-page a:last-of-type {
        margin-left: 10px;
        width: 68px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #bbb;
    }

    /* .el-table .caret-wrapper, .el-table th>.cell{
      font-weight:600;
    } */
    /*按钮样式*/
    .formatbutton {
        display: inline-block;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        text-align: center;
        min-width: 134px;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 4px;
        color: #fff;
        background-color: #67649F;
    }

    .formatbutton1 {
        display: inline-block;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        text-align: center;
        min-width: 84px;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 4px;
        color: #fff;
        background-color: #38C68C;
    }

    /* 文件上传*/

    @import "add.css";
    .file-up {
        position: fixed;
        top: 100px;
        left:280px;
        background: #fff;
        width: 800px;
        border: 1px solid darkgrey;
        overflow-y: auto;
        max-height: 400px;
        overflow-x: hidden;
        box-shadow: 4px 7px 13px #000;
        z-index: 1000;
    }

    .file-down {
        position: fixed;
        top: 100px;
        left:280px;
        background: #fff;
        width: 800px;
        border: 1px solid darkgrey;
        overflow-y: auto;
        max-height: 400px;
        overflow-x: hidden;
        box-shadow: 4px 7px 13px #000;
    }

    .title-header {
        margin: auto 20px;
        text-align: center;
        font-size: 24px;
        padding: 10px;
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
        position: relative;
    }

    .ul-file {
        position: relative;
        left: 300px;
        top: -40px
    }

    .ul-name-label {
        width: 10px;
        height: 20px;
        background: #20a0ff;

    }

    .status-warn {
        padding-left: 5px;
        color: #d00;
    }

    .ul-remark {
        position: relative;
        left: 600px;
        top: -70px
    }

    .ul-remark-text {
        color: red;
    }

    .ul-name-text {
        font-size: 24px;
    }

    .step {
        margin: auto 50px;
    }

    .closed {
        position: relative;
        top: -7px;
        float: right;
        font-size: 20px;
        right: -74px;
        width: 100px;
        cursor: pointer;
    }

    .el-select-dropdown > .el-scrollbar > .el-select-dropdown__wrap > .el-scrollbar__view {
        position: relative;
        top: 180px;
    }

    /* table样式调整 */
    
</style>
