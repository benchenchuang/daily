<template>
  <div  :class="{'show-slide':is_show}">

    <daily-header :title="title"></daily-header>
    <!--侧边栏-->
    <div class="slider" id='slider'>
      <router-link tag="div" @click.native="hideBar" :to="{name:'user',params:{id:0}}" class="user-signin">
        <div class="user-avatar"><img src="../image/avatar.jpg"> </div>
        <span class="user-name">常州吴彦祖</span>
      </router-link>
      <div class="my-icon">
        <ul>
          <li><i class="iconfont icon-shoucang"></i><p>收藏</p></li>
          <li><i class="iconfont icon-message"></i><p>消息</p></li>
          <li><i class="iconfont icon-shezhi"></i><p>设置</p></li>
        </ul>
      </div>

      <div class="daily-item">
        <ul>
          <router-link tag="li" @click.native="hideBar" :to="{name:'listContent'}"><i class="iconfont icon-home home-icon"></i>首页 <span class="iconfont icon-right"></span></router-link>
          <router-link tag="li" @click.native="hideBar" v-for="theme in themes" :key="theme.id" :to="{name: 'theme', params: { id: theme.id }}">{{theme.name}}<span class="iconfont icon-add"></span></router-link>
        </ul>
      </div>
      <!--遮罩-->
      <div class="side-mask" @click="hideBar()"></div>
    </div>

    <div class="slide-slide">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import dailyHeader from './header.vue';
  import axios from 'axios'
  export default {
    name: 'header',
    data () {
      return {
        themes:[],
        is_show:false
      }
    },
    mounted(){
        this.$nextTick(function () {
            this.getThemes();
        });
        $("#slider").on('touchmove',function(e){
          $('.slide-slide').scrollTop(0);
        })
    },
    components:{
      dailyHeader
    },
    computed:{
      title:function(){
        var getId=Number(this.$route.params.id);
        switch(getId) {
          case 13:
            return '日常心理学';
          case 12:
            return '用户推荐日报';
          case 3:
            return '电影日报';
          case 11:
            return '不许无聊';
          case 4:
            return '设计日报';
          case 5:
            return '大公司日报';
          case 6:
            return '财经日报';
          case 10:
            return '互联网安全';
          case 2:
            return '开始游戏';
          case 7:
            return '音乐日报';
          case 9:
            return '动漫日报';
          case 8:
            return '体育日报';
          case 0:
            return '我的';
          default:
            return '首页';
        }
      }
    },
    methods:{
      getThemes(){
        var self=this;
        axios.get('https://zhihu-daily.leanapp.cn/api/v1/themes', {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }).then(function(response) {
          self.themes=response.data.THEMES.others;
        })
      },
      hideBar:function () {
        window.document.body.className = '';
      }
            

    }
  }
</script>

<style>

  .slide-slide{
    position: absolute;
    width:100%;
    left:0;
    top:44px;
    -webkit-transition: all .5s;
    transition: all .5s;
  }
  .slider{
    position: fixed;
    left: -70%;
    top:0;
    padding-top: 20px;
    width:70%;
    height:100%;
    color: #656b70;
    background: #2c3144;
    z-index: 999;
    overflow-y: scroll;
    box-sizing: border-box;
    -webkit-transition: all .5s;
    transition: all .5s;
  }
  .side-mask{
    position: fixed;
    left:-30%;
    top:0;
    width:30%;
    height:100%;
    background: rgba(0,0,0,.2);
    z-index: -9999;
    opacity: 0;
  }
  .slide-show .slider{
    left:0;
  }
  .slide-show .daily_box{
    left:70%;
  }
  .slide-show .side-mask{
    z-index:99;
    left:70%;
  }
  .slide-show .list-header,
  .slide-show .slide-slide{
    left:70%;
  }
  .my-icon,
  .user-signin{
    padding:10px 20px;
  }
  .user-avatar img{
    width:30px;
    height:30px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .user-avatar{
    display: inline-block;
    vertical-align: top;
  }
  .user-name{
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    height:30px;
    line-height:30px;
  }
  .my-icon{
    padding:10px 0;
    overflow: hidden;
  }
  .my-icon ul li{
    float: left;
    width:33%;
    text-align: center;
    font-size: 12px;
  }
  .my-icon ul li .iconfont{
    font-size: 18px;
  }
  .daily-item ul li{
    width:100%;
    padding:2px 20px ;
    height:46px;
    line-height:46px;
    font-size: 14px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .daily-item ul li span{
    float: right;
  }
  .daily-item ul li.router-link-exact-active.router-link-active{
    background: #222;
  }
  .home-icon{
    font-size:22px;
    margin-right: 10px;
  }

  .iconfont{
    font-family:"iconfont";
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

</style>
