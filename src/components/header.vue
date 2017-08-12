<template>
  <div class="list-header">
    <div class="icon_more" @click="showBar">
      <i class="iconfont icon-back"></i>
    </div>
    <div class="header-title">
      <p>{{title}}</p>
    </div>
      <div class="icon_msg">
        <i class="iconfont icon-message"></i>
      </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props:['title'],
  data(){
    return{
    }
  },
  watch:{
    $route(){
      window.document.title=this.title
    }
  },
  mounted(){
    window.document.title=this.title;
  },
  methods:{
    showBar () {
      window.document.body.className = 'slide-show';
    }
  }
}
</script>

<style>

  .header-title p{
    width:100%;
    text-align: center;
  }
.list-header{
  position: fixed;
  text-align: center;
  left: 0;
  top:0;
  width:100%;
  height:44px;
  line-height:44px;
  font-size: 18px;
  color: #fff;
  background: #00a2ea;
  z-index: 9;
  -webkit-transition: all .5s;
  transition: all .5s;
}
.icon_more,
.icon_msg{
  position: absolute;
  top:0;
}
.icon_more{
  left:0;
  top:-3px;
  padding:0 10px;
  font-size: 30px;
}
.icon_msg{
  right:16px;
  font-size: 22px;
}
.iconfont{
  font-family:"iconfont";
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

</style>
