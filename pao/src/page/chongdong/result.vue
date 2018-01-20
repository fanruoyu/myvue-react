<template>
    <div class="chongdong">
        <div class="titlename">研发预案测算报告</div>
        <div class="echart-list" v-show="showlist">
            <el-row :gutter="20" v-show="showchart1">
                <el-col :span="6"><div class="ll">业态数1</div></el-col>
            </el-row>
            <el-row :gutter="20" v-show="showchart1">
                <el-col :span="8"><div id="echats2" style="width: 412px;height: 351px;"></div></el-col>
                <el-col :span="8"><div id="echats3" style="width: 412px;height: 351px;"></div></el-col>
                <el-col :span="8"><div id="echats4" style="width: 412px;height: 351px;"></div></el-col>
            </el-row>
            <el-row :gutter="20" v-show="showchart2">
                <el-col :span="6"><div class="ll">业态数2</div></el-col>
            </el-row>
            <el-row :gutter="20" v-show="showchart2">
                <el-col :span="8"><div id="echats5" style="width: 412px;height: 351px;"></div></el-col>
                <el-col :span="8"><div id="echats6" style="width: 412px;height: 351px;"></div></el-col>
                <el-col :span="8"><div id="echats7" style="width: 412px;height: 351px;"></div></el-col>
            </el-row>
            <el-row :gutter="20" v-show="showchart3">
                <el-col :span="6"><div class="ll">业态数3</div></el-col>
            </el-row>
            <el-row :gutter="20" v-show="showchart3">
                <el-col :span="8"><div id="echats8" style="width: 412px;height: 351px;"></div></el-col>
                <el-col :span="8"><div id="echats9" style="width: 412px;height: 351px;"></div></el-col>
                <el-col :span="8"><div id="echats10" style="width: 412px;height: 351px;"></div></el-col>
            </el-row>
            <el-row :gutter="20" v-show="showchart4">
                <el-col :span="6"><div class="ll">业态数4</div></el-col>
            </el-row>
            <el-row :gutter="20" v-show="showchart4">
                <el-col :span="8"><div id="echats11" style="width: 412px;height: 351px;"></div></el-col>
                <el-col :span="8"><div id="echats12" style="width: 412px;height: 351px;"></div></el-col>
                <el-col :span="8"><div id="echats13" style="width: 412px;height: 351px;"></div></el-col>
            </el-row>
        </div>
        <div class="show" style="text-align: center;margin-bottom: 64px;margin-top: 10px;" v-show="showlist">
            <a class="formatAherf" :href="loadlurl">下载附件</a>
        </div>
        <div class="splitline line"></div>
        <div class="result">
            <span class="lt">方案参数</span>
            <div class="step1">

                <table cellspacing="20" style="border-collapse:separate; border-spacing:0px 20px;">
                    <tr>
                        <td nowrap>地块编码</td>
                        <td class="">
                            <el-input v-model="blockCode" disabled ></el-input>
                        </td>
                        <td></td>
                        <td nowrap>用地性质</td>
                        <td>
                            <el-input v-model="landTypeName" disabled></el-input>
                        </td>
                        <td></td>
                        <td nowrap>地上计容住宅建面占比<span class="required"></span></td>
                        <td nowrap="">
                            <el-input v-model="groundCapacity" disabled></el-input>
                            <span>%</span></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td nowrap>总占地面积</td>
                        <td nowrap>
                            <el-input v-model="totalArea" disabled></el-input>
                            <span>㎡</span></td>
                        <td></td>
                        <td nowrap>建设用地面积<span class="required"></span></td>
                        <td nowrap>
                            <el-input v-model="buildArea" disabled></el-input>
                            <span>㎡</span></td>
                        <td></td>
                        <td nowrap>代征土地面积</td>
                        <td nowrap>
                            <el-input v-model="collectArea" disabled></el-input>
                            <span>㎡</span></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td nowrap>计容地上建面<span class="required"></span></td>
                        <td nowrap="">
                            <el-input v-model="designGroundCapacity" disabled></el-input>
                            <span>㎡</span></td>
                        <td></td>
                        <td nowrap>容积率</td>
                        <td>
                            <el-input v-model="volumeRate" disabled></el-input>
                        </td>
                        <td></td>
                        <td nowrap>控制高度<span class="required"></span></td>
                        <td nowrap="">
                            <el-input v-model="controlHeight" disabled></el-input>
                            <span>m</span></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td nowrap>绿地率</td>
                        <td nowrap>
                            <el-input v-model="greenbeltRate" disabled></el-input>
                            <span>%</span></td>
                        <td></td>
                        <td nowrap>建筑密度<span class="required"></span></td>
                        <td nowrap>
                            <el-input v-model="buildingDensity" disabled></el-input>
                            <span>%</span></td>
                        <td></td>
                        <td nowrap>配套占比<span class="required"></span></td>
                        <td nowrap>
                            <el-input v-model="matchProportion" disabled></el-input>
                            <span>%</span></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td nowrap>高层退界面积</td>
                        <td nowrap>
                            <el-input v-model="upperBoundArea" disabled></el-input>
                            <span>㎡</span></td>
                        <td></td>
                        <td nowrap>多层退界面积</td>
                        <td nowrap>
                            <el-input v-model="multilArea" disabled></el-input>
                            <span>㎡</span></td>
                        <td></td>
                        <td nowrap>日照退界后用地面积</td>
                        <td nowrap>
                            <el-input v-model="sunshineArea" disabled></el-input>
                            <span>㎡</span></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td nowrap>商业用地扣除后面积</td>
                        <td nowrap>
                            <el-input v-model="deductionBusiArea" disabled></el-input>
                            <span>㎡</span></td>
                        <td></td>
                        <td nowrap></td>
                        <td></td>
                        <td></td>
                        <td nowrap></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div class="splitline"></div>
            <div class="step2">
                <table cellspacing="20" style="border-collapse:separate; border-spacing:0px 10px;">
                    <tr>
                        <td nowrap>地区公司<span class="required"></span></td>
                        <td>
                            <el-input v-model="cityName" disabled></el-input>
                        </td>
                        <td></td>
                        <td nowrap></td>
                        <td></td>
                        <td></td>
                        <td nowrap></td>
                        <td nowrap></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td nowrap>各业态容积率取值<span class="required"></span></td>
                        <td nowrap colspan="7">
                            <div style="margin-top: 20px" class="fangan-list">
                                <div v-for="(item,index) in modeSelectCode" :key="index"
                                     style="float: left;margin-right: 20px;margin-bottom: 20px">
                                    <span class="fan-w">{{item.name}}</span>
                                    <span class="fan-b">{{item.value}}</span>
                                </div>
                            </div>
                        </td>
                    </tr>

                </table>
            </div>
            <div class="splitline"></div>
            <div class="step3">
                <el-row :gutter="20" style="margin-top: 20px">
                    <el-col :span="6" v-for="(item,index) in modeSelectName" :key="index">
                        <td style="vertical-align:middle; text-align:center;" class="required">{{item.name}}</td>
                        <td>
                            <el-input :value="item.value" style="width: 70px;float: left" disabled></el-input>
                        </td>
                        <td style="vertical-align:middle; text-align:center;">层</td>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-top: 20px">
                    <el-col :span="6" v-for="(item,index) in modeSelectPrice" :key="index">
                        <td style="vertical-align:middle; text-align:center;" class="required">{{item.name}}</td>
                        <td>
                            <el-input :value="item.value" style="width: 70px;float: left" disabled></el-input>
                        </td>
                        <td style="vertical-align:middle; text-align:center;">万元/㎡</td>
                    </el-col>
                </el-row>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: 'HelloWorld',
        data() {
            return {
                showlist: false,
                loadlurl: '',
                newplanId: '',
                charts: '',
                opinion: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                opinionData: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'}
                ],
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                value5: [],
                blockCode: "",
                landTypeName: "",
                groundCapacity: "",
                totalArea: "",
                buildArea: "",
                collectArea: "",
                designGroundCapacity: '',
                volumeRate: '',
                controlHeight: '',
                greenbeltRate: '',
                buildingDensity: '',
                matchProportion: '',
                upperBoundArea: '',
                multilArea: '',
                sunshineArea: '',
                deductionBusiArea: '',
                cityName: '',
                modeSelectCode: [],
                modeSelectName: [],
                modeSelectPrice: [],
                showchart1: false,
                showchart2: false,
                showchart3: false,
                showchart4: false
            }
        },
        methods: {
            closedwin() {
                this.$emit('closefileResult', 'r')
            },
            downloadedFile() {
                this.$http({
                    method: 'GET',
                    url: 'longcity/services/v1/developPlan/download?id=' + this.dataPlanId,
                    headers: {"platform": "pc", "token": localStorage.getItem('token'), 'version': '1'},
                    emulateJSON: true
                }).then((resp) => {
                    },
                    (err) => {
                        console.log(err);
                    }
                )
            },
            nextStep: function () {
                if (this.step < this.todos.length) {
                    this.step = this.step + 1
                    this.progresswidth = this.progresswidth + this.stepwidth
                } else {

                }
            },
            prevStep: function () {
                if (this.step > 1) {
                    this.step = this.step - 1
                    this.progresswidth = this.progresswidth - this.stepwidth
                }

            },
            skipstart: function () {
                this.step = 1
                this.progresswidth = this.stepwidth
            },
            submityuan: function () {
                this.step = 1
                this.progresswidth = this.stepwidth
                this.$router.push({name: 'measured', params: {userId: 'wise'}})
            },
            drawPie: function (id, datas) {
                this.charts = echarts.init(document.getElementById(id))
                var opinionData = []
                for (var i = 0; i < datas.opinionData.length; i++) {
                    opinionData.push({
                        value: parseInt(datas.opinionData[i].modeFloorAreaProportion),
                        name: datas.opinionData[i].modeComb,
                        area: parseInt(datas.opinionData[i].modeFloorArea),
                        proportion: datas.opinionData[i].modeFloorAreaRatio
                    })
                }
                var colors = []
                for (var i = 0; i < opinionData.length; i++) {
                    if (opinionData[i].name === "高层") {
                        colors.push('#896CE2')
                    }
                    if (opinionData[i].name === "洋房") {
                        colors.push('#FF80B6')
                    }
                    if (opinionData[i].name === "4叠") {
                        colors.push('#00BEFF')
                    }
                    if (opinionData[i].name === "联排") {
                        colors.push('#FFD47E')
                    }
                }
                this.charts.setOption({
                    title: {
                        text: datas.title,
                        left: 'center',
                        top: '0'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params, ticket, callback) {
                            return params.data.name + '<br/>容积率：' + params.data.proportion + '<br/>' + '面积：' + params.data.area + '㎡<br/>面积占比:' + params.data.value + '%';
                        }
                    },
                    color: colors,
                    graphic: {
                        type: 'text',
                        left: 'center',
                        top: 'center',
                        style: {
                            text: (datas.opinionData[0].groundTotalValue / 10000).toFixed(1) + "亿" + "\n\n" + parseInt(datas.opinionData[0].buildingCoverage) + "%",
                            textAlign: 'center',
                            fill: '#333',
                            font: '22px "STHeiti", sans-serif'
                        }
                    },
                    series: [
                        {
                            name: datas.title,
                            type: 'pie',
                            radius: ['33%', '63%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    formatter: function (params) {
                                        return params.data.name + '\n' + params.data.proportion
                                    },
                                    align: 'left'
                                }
                            },
                            data: opinionData
                        }
                    ]
                })
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.newplanId = this.dataPlanId
                if (this.$route.params.requesttype === 'view') {
                    this.showlist = true
                } else {
                    this.showlist = false
                }
                this.loadlurl = '/longcity/services/v1/developPlan/download?id=' + this.$route.params.dataPlanId + '&token=' + localStorage.getItem('token')
                this.$http({
                    method: 'GET',
                    url: 'longcity/services/v1/developPlan/findById?id=' + this.$route.params.dataPlanId,
                    headers: {"platform": "pc", "token": localStorage.getItem('token'), 'version': '1'},
                    emulateJSON: true
                }).then((resp) => {
                    if (resp.data.code === 200) {
                        this.blockCode = resp.data.result.blockCode
                        this.landTypeName = resp.data.result.landTypeName
                        this.groundCapacity = resp.data.result.groundCapacity
                        this.totalArea = resp.data.result.totalArea
                        this.buildArea = resp.data.result.buildArea
                        this.collectArea = resp.data.result.collectArea
                        this.designGroundCapacity = resp.data.result.designGroundCapacity
                        this.volumeRate = resp.data.result.volumeRate
                        this.controlHeight = resp.data.result.controlHeight
                        this.greenbeltRate = resp.data.result.greenbeltRate
                        this.buildingDensity = resp.data.result.buildingDensity
                        this.matchProportion = resp.data.result.matchProportion
                        this.upperBoundArea = resp.data.result.upperBoundArea
                        this.multilArea = resp.data.result.multilArea
                        this.sunshineArea = resp.data.result.sunshineArea
                        this.deductionBusiArea = resp.data.result.deductionBusiArea
                        this.cityName = resp.data.result.cityName
                        var modeSelectCodes = resp.data.result.modeSelectCode.split(",")
                        var modeSelectNames = resp.data.result.modeSelectName.split(",")
                        var modeVolumeRates = resp.data.result.modeVolumeRate.split(",")
                        var modeFloorNumbers = resp.data.result.modeFloorNumber.split(",")
                        var modeSelectPrices = resp.data.result.modeSelectPrice.split(",")

                        for (var i = 0; i < modeSelectCodes.length; i++) {
                            this.modeSelectCode.push({name: modeSelectNames[i], value: modeVolumeRates[i]})
                            this.modeSelectName.push({name: modeSelectNames[i], value: modeFloorNumbers[i]})
                            this.modeSelectPrice.push({name: modeSelectNames[i], value: modeSelectPrices[i]})

                        }
                    }
                }, (err) => {
                    console.log(err);
                })
                this.$http({
                    method: 'GET',
                    url: 'longcity/services/v1/developPlan/chartOption?id=' + this.$route.params.dataPlanId,
                    headers: {"platform": "pc", "token": localStorage.getItem('token'), 'version': '1'},
                    emulateJSON: true
                }).then((resp) => {
                        if (resp.data.code == 200) {
                            var datas = resp.data.result.rowCharts
                            for (var i = 0; i < datas.length; i++) {
                                if (datas[i].title === "业态数1" && datas[i].chartOptions.length>0) {
                                    this.showchart1 = true
                                    if (datas[i].chartOptions[0]) {
                                        this.drawPie("echats2", datas[i].chartOptions[0])
                                    }
                                    if (datas[i].chartOptions[1]) {
                                        this.drawPie("echats3", datas[i].chartOptions[1])
                                    }
                                    if (datas[i].chartOptions[2]) {
                                        this.drawPie("echats4", datas[i].chartOptions[2])
                                    }
                                }
                                if (datas[i].title === "业态数2" && datas[i].chartOptions.length>0) {
                                    this.showchart2 = true
                                    if (datas[i].chartOptions[0]) {
                                        this.drawPie("echats5", datas[i].chartOptions[0])
                                    }
                                    if (datas[i].chartOptions[1]) {
                                        this.drawPie("echats6", datas[i].chartOptions[1])
                                    }
                                    if (datas[i].chartOptions[2]) {
                                        this.drawPie("echats7", datas[i].chartOptions[2])
                                    }
                                }
                                if (datas[i].title === "业态数3" && datas[i].chartOptions.length>0) {
                                    this.showchart3 = true
                                    if (datas[i].chartOptions[0]) {
                                        this.drawPie("echats8", datas[i].chartOptions[0])
                                    }
                                    if (datas[i].chartOptions[1]) {
                                        this.drawPie("echats9", datas[i].chartOptions[1])
                                    }
                                    if (datas[i].chartOptions[2]) {
                                        this.drawPie("echats10", datas[i].chartOptions[2])
                                    }
                                }
                                if (datas[i].title === "业态数4" && datas[i].chartOptions.length>0) {
                                    this.showchart4 = true
                                    if (datas[i].chartOptions[0]) {
                                        this.drawPie("echats11", datas[i].chartOptions[0])
                                    }
                                    if (datas[i].chartOptions[1]) {
                                        this.drawPie("echats12", datas[i].chartOptions[1])
                                    }
                                    if (datas[i].chartOptions[2]) {
                                        this.drawPie("echats13", datas[i].chartOptions[2])
                                    }
                                }
                            }


                        }

                    },
                    (err) => {
                        console.log(err);
                    }
                )
            })
        },
        props: ['dataPlanId']
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .intext {
        width: 200px;
        height: 10px;
        border: 1px solid red;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0 10px;
    }

    .line ~ show{
       border-bottom: 1px solid #a7acaf;
    }
    .line {
        margin-top:80px;
        border-bottom: 1px solid #a7acaf;
    }
    .result .lt {
        position: relative;
        display:block;
        width:120px;
        text-align: center;
        top: -44px;
        font-size:18px;
        color:#67649F;
        border-bottom:4px solid #67649F;
        border-radius:2px 2px 2px 2px;
        box-sizing: border-box;
        padding-bottom:5px;
        margin-left:28px;

    }

    a {
        color: #42b983;
    }

    .step1 {
        position: relative;
    }

    .splitline {
        border-bottom: 1px solid #a7acaf;
    }

    .easyui-numberbox {
        width: 132px;
        height: 32px;
    }

    td {
        text-align: left;
        padding-right: 18px;
        margin-top: 10px;
        font-size:14px;
        color:#333;
    }
    .el-row{
        margin-bottom: 15px;
    }
    .el-input{
        width:150px;

    }
    /* .el-input__inner{
         height: 40px !important;
    } */
    .step1, .step2, .step3 {
        margin: auto 30px;
        margin-bottom:20px;
    }
    .step2{
        padding-top:20px;
    }
    .step3{
        padding-top:10px;
    }
    .requied {
        color: red;
    }

    .step3 .box-ul {
        text-align: left;
    }

    .step3 .box-ul li {
        float: left
    }

    .required::after{
        content:"*";
        color:red;
        margin-left:4px;
    }
    /*.step3 .box-ul div{*/
    /*margin: 10px;*/
    /*}*/
    /*.step3 .box-ul div span{*/
    /*margin-right: 10px;*/
    /*margin-left: 10px;*/
    /*}*/
    .chongdong {
        z-index: 100;
    }

    .fangan-list table td {
        border: 1px solid #becbd9;

    }

    .echart-list {
        position: relative;
        max-height: 450px;
        overflow-y: scroll;
        overflow-x:hidden;
    }

    .echart-list ul li {
        float: left;
    }

    .echart-list ul {
        height: 210px
    }

    .echart-list ul span {
        float: left;
    }

    .ll {
        width: 98px;
        height: 32px;
        background: #67649F;
        margin: 10px;
        border-radius: 60px;
        text-align: center;
        line-height: 32px;
        color: #fff;
        margin-left:30px;
    }

    .fan-w {
        border: 0.5px solid #d1dbe5;
        border-right:0;
        height: 31px;
        display: inline-block;
        line-height: 31px;
        background:#eef1f6;
        font-size:14px;
        color: #bbbbbb;
        float: left;
        border-radius:4px 0 0 4px ;
        padding: 0 20px;
    }
    .fan-b {
        background: #fff;
        height: 31px;
        border: 0.5px solid #d1dbe5;
        color:#bbb;
        margin-left: -4px;
        display: inline-block;
        border-left:0;
        line-height: 31px;
        font-size:14px;
        float: left;
        border-radius: 0 4px 4px 0 ;
        padding: 0 18px;
    }

    /*按钮样式*/
    .formatAherf {
        display: inline-block;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        text-align: center;
        min-width: 150px;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 4px;
        color: #fff;
        background-color: #67649F;
        text-decoration: none;
    }

    .titlename {
        padding: 20px 0 14px 30px;
        margin-bottom:20px;
        text-align: left;
        font-size: 24px;
        z-index: 100;
        border-bottom: 1px solid #a7acaf;
        font-weight: 600;
        color:#67649F;
    }
    .line ~ show{
        border-bottom: 1px solid #a7acaf;
    }
    .line {
        margin-top:80px;
        border-bottom: 1px solid #a7acaf;
    }
</style>



