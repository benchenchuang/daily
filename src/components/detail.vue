<template>
  <div class="detail_box">

    <!--头部-->
    <div class="detail_header">
      <img v-if="detail.images" :src="detail.images[0] | replaceUrl" alt="">
      <img v-else :src="detail.image" alt="">
      <!--<div class='detail_bg' :style="{ backgroundImage: 'url(' + replace(detail.image)+ ')' }"></div>-->
      <span class="img_res">图片来源：{{detail.image_source}}</span>
      <p class="title">{{detail.title}}</p>
      <div class="detail-mask"></div>
    </div>

    <div class="detail-content" v-html="detail.body"></div>

    <share-box v-if="isShare" v-on:getShare="showShare"></share-box>

    <!--底部-->
    <div class="list-footer">
      <div class="header-icon go_back" @click="goBack"><i class="iconfont">&#xe601;</i></div>
      <div class="header-controls">
        <div class="header-icon" @click="isShare=true"><i class="iconfont">&#xe621;</i></div>
        <div class="header-icon" :class={select:isPopular} @click='getPopular'><i class="iconfont">&#xe612;</i><span>{{extra.popularity}}</span></div>
        <router-link tag='div' class="header-icon" :to="{name:'comments',params:{id:thisId}}"><i class="iconfont">&#xe605;</i><span>{{extra.comments}}</span></router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import shareBox from './share.vue'
  import axios from 'axios'
  export default {
    name: 'detail',
    data() {
      return {
        thisId:'',
        detail:[],
        extra:[],
        isPopular:false,
        isShare:false
      }
    },
    mounted(){
      this.$nextTick(function(){
        this.getDetail();
        this.getExtra();
      })
    },
    components:{
      shareBox
    },
    filters: {
      replaceUrl(str) {
        return str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    methods:{
      goBack () {
        window.history.go(-1);
      },
      showShare(){
        this.isShare=false
      },
      getDetail(){
        this.thisId=this.$route.params.id;
        var self=this;
        axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/'+self.thisId, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }).then(function(response) {
          self.detail=response.data.CONTENTS;
        });
      },
      getExtra(){
        var thisId=this.$route.params.id;
        var self=this;
        axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/extra/'+thisId, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }).then(function(response) {
          self.extra=response.data.DES;
        })
      },
      getPopular(){
          this.isPopular=!this.isPopular;
          if(this.isPopular){
            this.extra.popularity+=1;
          }else{
            this.extra.popularity-=1;
          }

      },
      replace:function(str) {
        return str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    }
  }

</script>

<style>
  .detail_bg{
    width:100%;
    height:150px;
  }
  .select{
    color:#ffcf00;
  }
  .header-icon span{
    position:absolute;
    left:32px;
    bottom:-2px;
    font-size:12px;
  }
  .detail-content{
    padding:20px;
    font-size:15px;
    color:#777;
  }
  .question-title{
    font-size:18px;
    color:#333;
  }
  .detail-content .meta{
    margin-top:20px;
    height:20px;
    line-height:20px;
    width:100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .detail-content .question a{
    color:#00a2ea;
  }
   .content p{
    margin-top:20px;
  }
  .answer .content hr{
    margin-top:20px;
    border-top:1px solid #e4e4e4;
  }
  .view-more{
    margin-top:20px;
    width:100%;
    height:30px;
    line-height:30px;
    text-align:center;
    background:#f3f3f3;
  }
  .detail-content .comment-meta .avatar, .detail-content .meta .avatar {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    vertical-align:top;
    margin-right: 5px;
  }
  .detail-content .author{
    color:#333;
  }
  .detail-content .bio{
    color:#aaa;
  }

  .detail-content img {
    border: 0;
    vertical-align: middle;
    color: transparent;
    font-size: 0;
  }
  .detail_header{
    position: relative;
    margin-top: 44px;
    height:150px;
    overflow: hidden;
  }
  .detail_header img{
    margin-top: -60px;
  }
  .detail_header .detail-mask{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: -webkit-linear-gradient(bottom,rgba(0,0,0,.7),rgba(0,0,0,.1) 40%,rgba(0,0,0,.1));
    background-image: -webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.7)),color-stop(40%,rgba(0,0,0,.1)),to(rgba(0,0,0,.1)));
    background-image: linear-gradient(bottom,rgba(0,0,0,.7),rgba(0,0,0,.1) 40%,rgba(0,0,0,.1));
    z-index: 2;
  }
  .detail_header .img_res{
    padding: 2px 5px;
    position: absolute;
    right:5px;
    bottom:5px;
    color: #ccc;
    background: rgba(0,0,0,.4);
  }
  .detail_header .title{
    position: absolute;
    left:10px;
    bottom: 16px;
    text-align: left;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    text-shadow: 2px 2px 2px rgba(0,0,0,.2);
    z-index: 9;
  }
  .list-footer{
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
  }
  .list-footer .go_back{
      position:relative;
      float: left;
      padding:0 10px;
  }
  .list-footer .header-controls{
    float: right;
  }
  .header-controls .header-icon{
    position:relative;
    float: left;
    padding:0 10px;
    margin-right: 20px;
  }
  .go_back{
    margin-left: 5px;
  }
  .iconfont{
    font-family:"iconfont";
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_x3ksci4x9zxjq0k9.eot');
    src: url('//at.alicdn.com/t/font_x3ksci4x9zxjq0k9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_x3ksci4x9zxjq0k9.woff') format('woff'),
    url('//at.alicdn.com/t/font_x3ksci4x9zxjq0k9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_x3ksci4x9zxjq0k9.svg#iconfont') format('svg');
  }

</style>
