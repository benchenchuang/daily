<template>
  <div class="daily_slide">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <router-link v-for="item in top_stories" :key="item.id" class="swiper-slide" :to="{ name: 'detail', params: { id: item.id}}">
          <img :src="item.image |replaceUrl">
          <!--v-link="{name: 'detail', params: { id: 7897 }}"-->
          <div class="swiper-mask"></div>
          <h1 class="slider-title">{{item.title}}</h1>
        </router-link>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
  require('../assets/js/swiper-3.4.2.min.js');
  import axios from 'axios';
  export default {
    name: 'slide',
    props:['top_stories'],
    data(){
      return {
      }
    },
    mounted(){
      this.slideBanner();
    },
    filters:{
      replaceUrl (str) {
        return str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    methods:{
      slideBanner:function(){
        new window.Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          spaceBetween: 0,
          centeredSlides: true,
          autoplay: 4000,
          autoplayDisableOnInteraction: false,
          observer: true,
          lazyLoading: true,
          resistanceRatio: 0,
          loop:true
        })
      },
      replace (str) {
        return str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/swiper-3.4.2.min.css";
.swiper-container{
    height: 140px;
  }
  .swiper-slide{
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    }
    .swiper-mask{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
      background-image: linear-gradient(bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
    }
    .slider-title{
      position: absolute;
      text-align: left;
      bottom: 15px;
      left: 0;
      padding: 0 18px;
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      text-shadow: 2px 2px 2px rgba(0,0,0,.3);
    }
  .swiper-pagination-bullet{
    width: 6px;
    height: 6px;
    display: inline-block;
    border-radius: 100%;
    background: #5a5a5a;
    opacity: .8;
  }
  .swiper-pagination-bullet-active{
    opacity: 1;
    background: #f4f5ff;
  }
  .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
    bottom:5px;
  }
</style>
