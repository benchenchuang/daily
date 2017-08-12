<template>
  <div class="editor_box">
    <common-header :title="title"></common-header>

    <div class="editors">
      <ul>
        <router-link tag="li" :to="{name:'author',params:{id:editor.id}}" class="editor_item" v-for="editor in editors" :key="editor.id">
          <i class="iconfont icon-right fr"></i>
          <img class="editor_avatar" :src="editor.avatar | replaceUrl">
          <div class="editor_inf">
            <h3 class="editor_name">{{editor.name}}</h3>
            <p class="editor_bio">{{editor.bio}}</p>
          </div>
        </router-link>
      </ul>
    </div>

  </div>
</template>
<script>
  import commonHeader from './common-header.vue'
  import axios from 'axios'
  export default{
    data(){
      return{
        title:'主编',
        editors:[],
        editorUrl:''
      }
    },
    components:{
      commonHeader
    },
    mounted(){
      this.getEditors();
    },
    filters:{
      replaceUrl (str) {
        return str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    },
    methods:{
      getEditors(){
        var self=this;
        var thisId=this.$route.params.id;
        axios.get('https://zhihu-daily.leanapp.cn/api/v1/themes/'+thisId, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }).then(function(response) {
          self.editors=response.data.THEMEDES.editors;
        })
      }
    }

  }
</script>
<style scoped>
  .editors{
    margin-top: 44px;
  }
  .editors .editor_item{
    display: block;
    padding:10px;
    border-bottom: 1px solid #f1f1f1;
    overflow: hidden;
  }
  .editor_avatar{
    float: left;
    width:40px;
    height: 40px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }
  .editor_inf{
    margin-left: 50px;
  }
  .editor_name{
    font-size: 15px;
    color: #333;
  }
  .editor_bio{
    font-size: 11px;
    color: #999;
  }
  .fr{
    float: right;
    margin-top: 10px;
    color: #aaa;
  }
  .editor_item .iconfont{
    font-size:16px;
  }
  .iconfont{
    font-family:"iconfont";
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
