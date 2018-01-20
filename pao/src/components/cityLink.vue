<template>
  <div class="cityLink">
    <select v-model="prov">
      <option v-for="option in arr" :value="option.name">
        {{ option.name }}
      </option>
    </select>
    <select v-model="city">
      <option v-for="option in cityArr" :value="option.name">
        {{ option.name }}
      </option>
    </select>
    <select v-model="district" v-if="district">
      <option v-for="option in districtArr" :value="option.name">
        {{ option.name }}
      </option>
    </select>
    <select v-model="district" v-if="district">
      <option v-for="option in districtArr" :value="option.name">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
    name: 'cityLink',
    data(){
      return{
        arr: [
          {name: "选择省份", sub: [{name: "请选择"}]},
          {
            name: "北京",
            sub: [
              {name: "请选择", sub: []},
              {
                name: "北京",
                sub: [{name: "请选择", sub:[]},{name: "东城区"}, {name: "其他"}],
              }],
          }],
        prov: '北京',
        city: '北京',
        district: '东城区',
        street:'东四十条',
        cityArr: [],
        districtArr: [],
        streetArr:[],
      }
    },
    methods: {
      updateCity: function () {
        for (var i in this.arr) {
          var obj = this.arr[i];
          if (obj.name == this.prov) {
            this.cityArr = obj.sub;
            break;
          }
        }
        this.city = this.cityArr[1].name;
      },
      updateDistrict: function () {
        for (var i in this.cityArr) {
          var obj = this.cityArr[i];
          if (obj.name == this.city) {
            this.districtArr = obj.sub;
            break;
          }
        }
        if(this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
          this.district = this.districtArr[1].name;
        } else {
          this.district = '';
        }
      },
      updatestreet: function () {
        for (var i in this.districtArr) {
          var obj = this.districtArr[i];
          if (obj.name == this.district) {
            this.streetArr = obj.sub;
            break;
          }
        }
        if(this.streetArr && this.streetArr.length > 0 && this.streetArr[1].name) {
          this.street = this.streetArr[1].name;
        } else {
          this.street = '';
        }
      }
    },
    beforeMount: function () {
      this.updateCity();
      this.updateDistrict();
    },
    watch: {
      prov: function () {
        this.updateCity();
        this.updateDistrict();
      },
      city: function () {
        this.updateDistrict();
      }
    }
}
</script>

<style>
  .cityLink{
    margin-bottom: 20px;
  }
  .cityLink select{
    /*-webkit-appearance: none;*/
    /*-moz-appearance: none;*/
    /*appearance: none;*/
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
  }
  .cityLink select option{
    /*color:#FFFFFF;*/
    /*background:white;*/
  }
</style>
