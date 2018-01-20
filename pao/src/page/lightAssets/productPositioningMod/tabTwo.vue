<template>
  <div id="productPositionTabOneTwo">
    <div class="main">
      <div class="c1">
        <ul>
          <li>
            <span>长租公寓总建设面积</span>
            <input type="text" name="">
            <label>平米</label>
          </li>
          <li>
            <span>长租公寓总可租赁买面积</span>
            <input type="text" name="">
            <label>平米</label>
          </li>
          <li>
            <span>房间总套数</span>
            <input type="text" name="">
            <label>套</label>
          </li>
          <li>
            <span>卧室总间数</span>
            <input type="text" name="">
            <label>间</label>
          </li>
          <li>
            <span>平均单间建设面积</span>
            <input type="text" name="">
            <label>平米</label>
          </li>
          <li>
            <span>平均单间可租赁面积</span>
            <input type="text" name="">
            <label>平米</label>
          </li>
          <li>
            <span>长租公寓得房率</span>
            <input type="text" name="">
            <label>%</label>
          </li>
          <li>
            <span>公共活动区总面积</span>
            <input type="text" name="">
            <label>平米</label>
          </li>
        </ul>
        <div class="c1-con1">
          <span style="width:160px;text-align:right">公区配置</span>
          <el-checkbox style="margin-left:10px">台球区</el-checkbox>
          <el-checkbox style="margin-left:30px">健身房</el-checkbox>
          <el-checkbox style="margin-left:30px">影音室</el-checkbox>
          <el-checkbox style="margin-left:30px">书吧区</el-checkbox>
          <el-checkbox style="margin-left:30px">其他</el-checkbox>
        </div>
        <div class="c1-con2">
          <p>注：如有其他公区配套，请文字注明。</p>
          <textarea class="fl" placeholder="请输入" maxlength="300"></textarea>
          <span><label>0</label>/300</label></span>
        </div>
        <div class="c1-con3">
          <span style="width:160px;text-align:right">景观装饰面积</span>
          <input type="text">
          <label>平米</label>
        </div>
      </div>
      <div class="c2">
        <div class="c2-tit">户型信息</div>
        <div class="c2-con">
          <div>
            <span>明间占比</span>
            <input type="text" name="">
            <label>%</label>
          </div>
          <div>
            <span>暗间占比</span>
            <input type="text" name="">
            <label>%</label>
          </div>
        </div>
      </div>
      <div class="c3">
        <div class="c3-tit">房型信息</div>
        <div class="c3-con">
          <el-button size="small" type="primary" @click="addHouseType">添加</el-button>
          <table border="0" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th width="220">户型</th>
                <th width="120">房型</th>
                <th width="40">层高(米)</th>
                <th width="80">套内面积(平米)</th>
                <th width="60">间数(间)</th>
                <th width="60">房型占比(%)</th>
                <th width="80">租金(元/月)</th>
                <th width="230">家具</th>
                <th width="230">电器</th>
                <th width="150">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(v,k) in houseList">
                <th>{{v.t1}}</th>
                <th>{{v.t2}}</th>
                <th>{{v.t3}}</th>
                <th>{{v.t4}}</th>
                <th>{{v.t5}}</th>
                <th>{{v.t6}}</th>
                <th>{{v.t7}}</th>
                <th>{{v.t8}}</th>
                <th>{{v.t9}}</th>
                <th>
                  <span @click="editHouseType()">编辑</span>
                  <span @click="delHouseType(k)">删除</span>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="dialogBox" v-if="dialogBox==1">
      <div class="zhezhao"></div>
      <div class="dialog">
        <div class="dialogTit">
          <span>添加户型信息</span>
          <span class="fr" style="cursor:pointer;padding:0 5px" @click="closeDialog">X</span>
        </div>
        <div class="dialogCon">
          <ul>
            <li>
              <span>户型</span>
              <select>
                <option>请选择</option>
                <option>test1</option>
                <option>test1</option>
              </select>
            </li>
            <li>
              <span>房型</span>
              <select>
                <option>请选择</option>
                <option>test1</option>
                <option>test1</option>
              </select>
            </li>
            <li>
              <span>层高</span>
              <input type="text" value="">
              <label>米</label>
            </li>
            <li>
              <span>套内面积</span>
              <input type="text" value="">
              <label>平米</label>
            </li>
            <li>
              <span>间数</span>
              <input type="text" value="">
              <label>间</label>
            </li>
            <li>
              <span>房型占比</span>
              <input type="text" value="">
              <label>%</label>
            </li>
            <li>
              <span>租金</span>
              <input type="text" value="">
              <label>元/月</label>
            </li>
          </ul>
          <div>
            <span>家具</span>
            <textarea placeholder="请输入" maxlength="500"></textarea>
          </div>
          <div>
            <span>电器</span>
            <textarea placeholder="请输入" maxlength="500"></textarea>
          </div>
          <div style="text-align:center">
            <button style="background:#67649F;color:#fff" @click="saveHouseType(0)">保存</button>
            <button style="margin-left:30px" @click="closeDialog">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="dialogBox" v-if="dialogBox==2">
      <div class="zhezhao"></div>
      <div class="dialog">
        <div class="dialogTit">
          <span>编辑户型信息</span>
          <span class="fr" style="cursor:pointer;padding:0 5px" @click="closeDialog">X</span>
        </div>
        <div class="dialogCon">
          <ul>
            <li>
              <span>户型</span>
              <select>
                <option>请选择</option>
                <option>test1</option>
                <option>test1</option>
              </select>
            </li>
            <li>
              <span>房型</span>
              <select>
                <option>请选择</option>
                <option>test1</option>
                <option>test1</option>
              </select>
            </li>
            <li>
              <span>层高</span>
              <input type="text" value="">
              <label>米</label>
            </li>
            <li>
              <span>套内面积</span>
              <input type="text" value="">
              <label>平米</label>
            </li>
            <li>
              <span>间数</span>
              <input type="text" value="">
              <label>间</label>
            </li>
            <li>
              <span>房型占比</span>
              <input type="text" value="">
              <label>%</label>
            </li>
            <li>
              <span>租金</span>
              <input type="text" value="">
              <label>元/月</label>
            </li>
          </ul>
          <div>
            <span>家具</span>
            <textarea placeholder="请输入" maxlength="500"></textarea>
          </div>
          <div>
            <span>电器</span>
            <textarea placeholder="请输入" maxlength="500"></textarea>
          </div>
          <div style="text-align:center">
            <button style="background:#67649F;color:#fff" @click="saveHouseType(1)">保存</button>
            <button style="margin-left:30px" @click="closeDialog">取消</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {    
        dialogBox:0,           //0:隐藏 1:添加 2:编辑
        houseList:[
          {
            "t1":"平方开间",
            "t2":"主卧",
            "t3":"3",
            "t4":"34",
            "t5":"12344",
            "t6":"121234",
            "t7":"232332",
            "t8":"沙发啥饭沙发沙发",
            "t9":"电话 空调 wifi 洗衣机 电话 空调 wifi 洗衣机",
          },
          {
            "t1":"平方开间",
            "t2":"主卧",
            "t3":"3",
            "t4":"34",
            "t5":"12344",
            "t6":"121234",
            "t7":"232332",
            "t8":"沙发啥饭沙发沙发",
            "t9":"电话 空调 wifi 洗衣机 电话 空调 wifi 洗衣机",
          }
        ]
      }
    },
    methods: {
      //关闭房型信息对话框
      closeDialog(){
        this.dialogBox=0;
      },
      //显示添加房型信息对话框
      addHouseType(){
        this.dialogBox=1;
      },
      //编辑房型信息
      editHouseType(){
        this.dialogBox=2;
      },
      delHouseType(k){
        this.houseList.splice(k, 1);
      },
      /*
      **保存房型信息
      ** flag：0|1
      ** 0:添加操作 1：编辑操作
      */
      saveHouseType(flag){
        this.dialogBox=0;
        if(flag==0 || flag=="0"){
          var obj= {
            "t1":"平方开间",
            "t2":"主卧",
            "t3":"3",
            "t4":"34",
            "t5":"12344",
            "t6":"121234",
            "t7":"232332",
            "t8":"沙发啥饭沙发沙发",
            "t9":"电话 空调 wifi 洗衣机 电话 空调 wifi 洗衣机",
          };
          this.houseList.unshift(obj);
        }else{

        }
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less">
#productPositionTabOneTwo{
  .main{
    width:96%;
    padding:0 2%;
    height: auto;
    padding-bottom:50px;
  }
  .c1{
    width:92%;
    margin-left:4%;
    border:1px solid #DDDDDD;
    padding:10px 0;
    border-radius:4px;
    margin-left:3%;
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
    width:160px;
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
  .c1-con2{
    width:80%;
    position:relative;
    padding-left:170px;
    height:170px;
  }
  .c1 .c1-con2 textarea{
    width:84%;
    height:100px;
    background:#F9F9F9;
    border:none;
    border-radius:5px;
    padding:5px 1%;
  }
  .c1 .c1-con2 span{
    position:absolute;
    bottom:0px;
    right:14%;
  }
  .c1 .c1-con3 input{
    height:30px;
    padding:2px;
    margin:0 10px;
  }
  .c2 {
    width:100%;
  }
  .c2 .c2-tit{
    width:100%;
    height:40px;
    line-height:40px;
  }
  .c2 .c2-con{
    width:92%;
    margin-left:4%;
    height:90px;
    border:1px solid #DDDDDD;
    padding:10px 0;
    border-radius:4px;
  }
  .c2 .c2-con div{
    width:100%;
    height:50px;
  }
  .c2 .c2-con span{
    width:160px;
    height:50px;
    line-height:40px;
    float:left;
    text-align:right;
  }
  .c2 .c2-con input{
    height:30px;
    padding:2px;
    float:left;
    margin:0 10px;
  }
  .c2 .c2-con label{
    display:inline-block;
    height:40px;
    line-height:40px;
    float:left;
  }
  .c2 {
    width:100%;
  }
  .c3 .c3-tit{
    width:100%;
    height:40px;
    line-height:40px;
  }
  .c3 .c3-con{
    width:100%;
    overflow:auto;
  }
  .c3 .c3-con .el-button--primary{
    width:100px;
    height:32px;
    background:url("../../../assets/images/add.png") 8px 6px no-repeat;
    background-color:#67649F;
    border-color:#67649F;
    background-size:16px;
    margin-bottom:15px;
  }
  .c3 .c3-con table thead{
    background: #E2E2ED;

  }
  .c3 .c3-con table tr{
    height:40px;
    line-height:20px;
    cursor:pointer;
  }
  .c3 .c3-con table tr:hover{
    background:#ccc;
  }
  .c3 .c3-con table td,.c3 .c3-con table th{
    border:1px solid #ddd;
    padding:0 2px;
    font-size:12px;
  }
  .c3 .c3-con table span{
    border:1px solid  #67649F;
    padding:2px 8px;
    color: #67649F;
    font-size:12px;
    border-radius:4px;
  }
  .zhezhao{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:995; 
    background:rgba(0,0,0,0.5);
  }
  .dialog{
    width:600px;
    height:480px;
    position:fixed;
    top:50%;
    left:50%;
    z-index:996;
    background:#fff;
    margin-left:-300px;
    margin-top:-240px;
    border-radius:4px;
  }
  .dialogTit{
    width:96%;
    padding:0 2%;
    height:40px;
    line-height:40px;
    background:#67649F;
    color:#fff;
  }
  .dialogCon ul{
    width:100%;
    height:160px;
  }
  .dialogCon select{
    margin:0 5px 0 10px;
    width:147px;
    height:28px;
    border:1px solid #ccc;
    border-radius:4px;
  }
  .dialogCon ul li{
    width:50%;
    height:30px;
    line-height:30px;
    float:left;
    margin-top:10px;
  }
  .dialogCon span{
    width:60px;
    height:30px;
    line-height:30px;
    float:left;
    text-align:right;
  }
  .dialogCon input{
    height:20px;
    padding:2px;
    float:left;
    margin:0 5px 0 10px;
  }
  .dialogCon label{
    display:inline-block;
    height:30px;
    line-height:30px;
    float:left;
  }
  .dialogCon div{
    clear:both;
    height:80px;
    margin:15px 0 0 0;
  }
  .dialogCon div span{
    width:60px;
  }
  .dialogCon div textarea{
    margin-left:10px;
    border:1px solid #ccc;
    width:440px;
    height:75px;
    padding:5px;
    border-radius:4px;
  }
  .dialogCon button{
    width:150px;
    margin:0px;
    padding:0px;
    height:30px;
    line-height:30px;
    text-align:center;
    border:1px solid #67649F;
    background:#fff;
    color:#67649F;
    cursor:pointer;
    border-radius:4px;
  }
}
</style>