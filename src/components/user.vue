<template>
  <div class="author_box">
    <div class="user-info">
      <img class="user-avatar" src="../image/avatar.jpg">
      <p class="user-name">常州吴彦祖</p>
    </div>
    <div class="user-settings">
      <ul>
        <li>消息中心<i class="iconfont icon-right"></i></li>
        <li>推送资讯<i class="iconfont icon-right"></i></li>
        <li>活动中心<i class="iconfont icon-right"></i></li>
        <li>设置<i class="iconfont icon-right"></i></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
      }
    }
  }
</script>
<style scoped>
  .user-info{
    padding:20px 0;
    background: #00a2ea;
  }
  .user-avatar{
    display: block;
    margin:10px auto;
    width:50px;
    height:50px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .user-name{
    display: block;
    font-size: 13px;
    color: #fff;
    margin-left: 0;
    text-align: center;
  }
  .user-settings{
    border-top:16px solid #f1f1f1;
  }
  .user-settings li{
    padding:0 16px;
    height:48px;
    line-height:48px;
    font-size: 14px;
    color: #666666;
    border-bottom: 1px solid #f1f1f1;
    box-sizing: border-box;
  }
  .icon-right.iconfont{
    font-size:16px;
  }
  .user-settings li .iconfont{
    float: right;
    color: #aaa;
  }
</style>
