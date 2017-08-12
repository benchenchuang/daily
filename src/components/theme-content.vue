<template>
  <div class="daily_theme" v-infinite-scroll="getMore" infinite-scroll-distance="100">
    <!--图片-->
    <div class="detail-img-box margin-top" :style="{ backgroundImage: 'url(' + replace(background) + ')' }">
      <div class="detail-mask"></div>
      <h1 class="detail-title">{{description}}</h1>
    </div>
    <!--主编-->
    <router-link tag="div" v-if="editors.length > 0" class="editors-box" :to="{name:'editors',params:{id:this.$route.params.id}}">
      <p>主编</p>
      <div class="editors-item" v-for="item in editors">
        <img :src="item.avatar | replaceUrl" alt="">
      </div>
    </router-link>
    <!--列表-->
    <div class="list-box">
      <ul v-for="item in allStories">
        <list-comp v-for="sub in item.stories" :item="sub" :key="sub.id"></list-comp>
      </ul>
    </div>
  </div>
</template>
<script>
  import listComp from './list_news.vue'
  import axios from 'axios'
  import Vue from 'vue';
  //滚动
  import infiniteScroll from 'vue-infinite-scroll'
  Vue.use(infiniteScroll);
  export default {
    name: 'theme',
    data() {
      return {
        editors: [],
        allStories: [],
        loading: false,
        background: '',
        description: '',
        name: '',
        image_source: '',
        id: ''
      }
    },
    components:{
      listComp
    },
    filters:{
      replaceUrl(str) {
        return str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    watch:{
      $route:function(){
        this.getThemes();
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.getThemes();
      })
    },
    methods:{
      getThemes:function () {
        var self=this;
        var thisId=this.$route.params.id;
        axios.get('https://zhihu-daily.leanapp.cn/api/v1/themes/'+thisId, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }).then(function(response) {
          self.allStories.push(response.data.THEMEDES);
          self.editors=response.data.THEMEDES.editors;
          self.background=response.data.THEMEDES.background;
          self.description=response.data.THEMEDES.description;
          self.name=response.data.THEMEDES.name;
          self.image_source=response.data.THEMEDES.image_source;
          var thisLength=response.data.THEMEDES.stories.length;
          self.id=response.data.THEMEDES.stories[thisLength-1].id
        })
      },
      getMore(){
        var self=this;
        var thisId=this.$route.params.id;
        setTimeout(function () {
          axios.get('https://zhihu-daily.leanapp.cn/api/v1/themes/'+thisId+'/before/'+self.id, {}, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            }
          }).then(function(response) {
            var thisLength=response.data.THEMEDES.stories.length;
            self.id=response.data.THEMEDES.stories[thisLength-1].id;
            self.allStories.push(response.data.THEMEDES);
          })
        },10)
      },
      replace (str) {
        return str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    }
  }
</script>
<style>
  .daily_theme{
    margin-top: -120px;
  }
  .detail-img-box {
    position: relative;
    z-index: 0;
    height: 230px;
    width: 100%;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
    .detail-mask{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
      background-image: linear-gradient(bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
    }
    .detail-title{
      position: absolute;
      bottom: 23px;
      line-height: 1.2;
      left: 0;
      padding: 0 18px;
      font-weight: 300;
      font-size: 21px;
      color: #ffffff;
    }
    .detail-image-source{
      position: absolute;
      bottom: 8px;
      right: 0;
      padding: 0 18px;
      font-weight: 300;
      font-size: 12px;
      color: #d3d3d3;
    }
  .list-box{
    background: #f2f2f2;
  }
  .editors-box {
    background: #efefef;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 50px;
  }
  .editors-box p{
      position: absolute;
      top: 13px;
      left: 15px;
      font-size: 13px;
      font-weight: bold;
    }
  .editors-box .editors-item {
    height: 30px;
    width: 30px;
    margin: 7px;
  }
  .editors-item >img{
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
</style>
