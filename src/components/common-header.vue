<template>
  <!--header部-->
  <div class="list-header">
    <div class="header-icon go_back" @click="goBack"><i class="iconfont icon-back"></i></div>
    <h3 class='title'>{{title}}</h3>
  </div>
</template>
<script>
  export default {
    name: 'common-header',
    props:['title'],
    data() {
      return {
      }
    },
    methods: {
      goBack() {
        window.history.back()
      }
    }
  }
</script>

<style>
  .list-header{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:44px;
    line-height:44px;
    color: #fff;
    font-size: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,.1);
    background: #00a2ea;
    text-align:center;
  }
  .list-header .header-icon{
    position:absolute;
    left:0;
    top:0;
    padding:0 10px;
  }
  .header-cont .header-icon{
    margin-right: 20px;
  }
  .go_back{
    margin-left: 5px;
  }
  .iconfont{
  font-size:22px;
    font-family:"iconfont";
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
