<template>
  <div class="slide-page" v-infinite-scroll="getMore" infinite-scroll-distance="100">
    <daily-slide :top_stories="top_stories"></daily-slide>
    <!--列表-->
    <div class="list-box" v-for="(item,index) in allStories">
      <ul>
        <h2 class="title" v-if="item.date">{{item.date | getDayFun}}</h2>
        <list-comp v-for="subItem in item.stories" :item="subItem" :key="subItem.id"></list-comp>
      </ul>
    </div>

  </div>
</template>
<script>
  import listComp from './list_news.vue'
  import dailySlide from './slide.vue'
  import axios from 'axios';
  import Vue from 'vue';
  //滚动
  import infiniteScroll from 'vue-infinite-scroll'
  Vue.use(infiniteScroll);
  /*eslint-disable no-new*/

  Vue.filter('getDayTime',function(value){
          var year=value.substring(0,4);
          var month=value.substring(4,6);
          var days=value.substring(6,8);
          var getDays=year+'年'+month+'月'+days+'日';
          // var newDate=new Date('"'+year+'-'+month+'-'+days+'"').getDay();
          // switch (newDate){
          //   case 0:
          //     return getDays+' 星期日';
          //   case 1:
          //     return getDays+' 星期一';
          //   case 2:
          //     return getDays+' 星期二';
          //   case 3:
          //     return getDays+' 星期三';
          //   case 4:
          //     return getDays+' 星期四';
          //   case 5:
          //     return getDays+' 星期五';
          //   case 6:
          //     return getDays+' 星期六';
          // }
  })


  export default{
    components: {
      dailySlide,
      listComp
    },
    data () {
      return {
        top_stories:[],
        allStories: [],
        date:'',
        newDate:''
      }
    },
    watch:{
      $route:function(){
        this.getNews();
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.getNews();
      })
    },
    filters:{
        getDayFun:function(value){
          var year=value.substring(0,4);
          var month=value.substring(4,6);
          var days=value.substring(6,8);
          var getDays=year+'年'+month+'月'+days+'日';
          
          var thisDate=new Date('"'+year+'/'+month+'/'+days+'"').getDay();
          var thisWeek='';
          switch (thisDate){
            case 0:
              thisWeek=' 星期日';
              break;
            case 1:
              thisWeek=' 星期一';
              break;
            case 2:
              thisWeek=' 星期二';
              break;
            case 3:
              thisWeek=' 星期三';
              break;
            case 4:
              thisWeek=' 星期四';
              break;
            case 5:
              thisWeek=' 星期五';
              break;
            case 6:
              thisWeek=' 星期六';
          }
          return getDays+thisWeek;
        }
    },
    methods: {
      getNews () {
        var self=this;
        axios.get('https://zhihu-daily.leanapp.cn/api/v1/last-stories', {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }).then(function(response) {
          
          self.top_stories=response.data.STORIES.top_stories;
          self.newDate=self.date=response.data.STORIES.date;
          response.data.STORIES.date='';
          self.allStories.push(response.data.STORIES);
        })
      },
      getMore(){
        var self=this;
        axios.get('https://zhihu-daily.leanapp.cn/api/v1/before-stories/'+self.date, {}, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            }
          }).then(function(response) {
            self.newDate=response.data.STORIES.date;
            if(self.date!=self.newDate){
              self.date=response.data.STORIES.date;
              self.allStories.push(response.data.STORIES);
            }else{
              return;
            }
            
          })
      },
      replace (str) {
        return str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    }
  }
</script>
<style>
  .list-box{
    background: #fff;
  }
  h2.title{
    height:44px;
    line-height:44px;
    text-align:center;
    font-size: 14px;
    color: #fff;
    font-weight: 500;
    background:#05a4ee;
  }
</style>
