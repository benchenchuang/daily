<template>
  <router-link tag="li" class="list-detail-box" :to="{name: 'detail', params: { id: id }}">
    <div class="list-content-box">
      <p>{{item.title}}</p>
    </div>
    <div v-if="item.images" class="list-img-box">
      <img :src="item.images[0] | replaceUrl" alt="">
      <p v-if="item.multipic" class="tip">多图</p>
    </div>
  </router-link>
</template>

<script>
  export default{
    props: ['item'],
    data () {
      return {
        id: this.item.id
      }
    },
    attached () {
    },
    filters:{
       replaceUrl:function(str){
        return str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
       }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list-detail-box {
    position: relative;
    min-height: 63px;
    /*width: 97%;*/
    /*margin: 8px auto 0 auto;*/
    background: #fff;
    padding: 13px;
    display: flex;
    border-bottom: 1px solid #eaeaea;
  }
  .list-detail-box:last-child{
    border-bottom:none;
  }
  .list-content-box{
    margin-right: 10px;
    flex: 1;
  }
  .list-content-box >p{
    text-align:left;
    font-size: 15px;
     line-height: 1.2;
   }
  .time{
    position: absolute;
    bottom: 10px;
    left: 13px;
    font-size: 13px;
    color: #b0b0b0;
  }
  .list-img-box {
    position: relative;
    width: 75px;
    height: 70px;
  }
  .list-img-box img{
     width: 75px;
     height: 70px;
   }
  .tip{
    color: #fff;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 10px;
    padding: 2px 5px;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
