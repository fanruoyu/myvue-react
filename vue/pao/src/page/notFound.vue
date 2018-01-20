<template>
  <div id="notFound">
    <!--404-->
    <div class="contentBox"></div>
  </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {}
        }, methods: {}, mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
  #notFound .contentBox{width:400px;height:400px;background:url("../assets/images/photo.png") center center no-repeat;background-size:400px auto;position:fixed;left:50%;margin-left:-200px;top:20%;}
</style>
