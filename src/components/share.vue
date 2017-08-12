<template>
  <div class="share_box">
    <div class="share_content">
        <ul>
          <li><i class="iconfont icon-pengyouquan red"></i></li>
          <li><i class="iconfont icon-weixin green"></i></li>
          <li><i class="iconfont icon-QQ blue"></i></li>
        </ul>
      <a class="close_share" href="javascript:void(0);" @click="cancelShare">取 消</a>
    </div>
    <div class="share_mask"></div>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    methods:{
      cancelShare(){
          this.$emit('getShare',true)
      }
    }
  }
</script>
<style>
  .share_mask{
    position: fixed;
    left:0;
    right:0;
    top: 0;
    bottom:0;
    background: rgba(0,0,0,.5);
    z-index: 99;
  }
  .share_content{
    position: fixed;
    width:100%;
    left:0;
    bottom: 0;
    background: #fff;
    z-index: 100;
  }
  .share_content ul li{
    float: left;
    width:33%;
    text-align: center;
    font-size: 36px;
  }
  .share_content ul{
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    border-bottom: 15px solid #f1f1f1;
  }
  .share_content .iconfont{
    font-size:34px;
  }
  .red{
    color: #7b7bf7;
  }
  .blue{
    color: #0D9BF2;
  }
  .green{
    color: #25d709;
  }
  .close_share{
    display: block;
    width: 100%;
    height:48px;
    line-height:48px;
    text-align: center;
    font-size: 16px;
    color: #666;
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
