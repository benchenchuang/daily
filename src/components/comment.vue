<template>
  <div class="detail_box">

    <div class="comments">
      <!--长评论-->
      <div class="comment-box" v-if="extra.long_comments>0">
        <h3 class="comments-sort">{{extra.long_comments}} 条长评论</h3>
        <div v-for="comment in longComments.comments">
          <comment-template :comment="comment"></comment-template>
        </div>

      </div>
      <div v-else>
        <h3 class="comments-sort">{{extra.long_comments}} 条长评论</h3>
        <div class="comment-empty">
            <p>暂无长评论，等你来评哦~~~</p>
        </div>
      </div>
      <!--短评论-->
      <div class="comment-box">
        <h3 class="comments-sort">{{extra.short_comments}} 条短评论
          <div class="short-control">
            <span v-if="is_show" @click="is_show=false">展开</span>
            <span  @click="is_show=true" v-if="!is_show">收起</span>
          </div>
        </h3>
        <div v-show="!is_show" v-for="comment in shortComments.comments">
          <comment-template :comment="comment"></comment-template>
        </div>

      </div>

    </div>

    <!--header部-->
    <common-header :title="extra.comments+' 条评论'"></common-header>

  </div>
</template>
<script>
  import axios from 'axios'
  import commentTemplate from './comment-tem.vue'
  import commonHeader from './common-header.vue'
  export default {
    name: 'detail',
    data() {
      return {
        longComments:[],
        shortComments:[],
        extra:[],
        is_show:true
      }
    },
    components:{
      commentTemplate,
      commonHeader
    },
    mounted(){
      this.$nextTick(function () {
        this.getExtra();
        this.getLongComments();
        this.getshortComments();
      })
    },

    methods:{
      goBack () {
        window.history.back()
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
      getLongComments(){
        var thisId=this.$route.params.id;
        var self=this;
        axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/'+thisId+'/long-comments', {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }).then(function(response){
          self.longComments=response.data.COMMENTS;

        })
      },
      getshortComments(){
        var thisId=this.$route.params.id;
        var self=this;
        axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/'+thisId+'/short-comments', {}, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            }
          }).then(function(response){
            self.shortComments=response.data.COMMENTS;
          console.log(self.shortComments)
        })
      }
    }
  }
</script>

<style>
  .short-control{
    float: right;
    margin-right: 6px;
    padding:0 10px;
    font-size: 13px;
    color: #999999;
  }
  .comment-empty{
    height:200px;
    line-height:200px;
    font-size: 16px;
    color: #999;
    text-align: center;
  }
  .comment-time{
    font-size: 12px;
    color: #999;
  }
  .comments{
    margin-top: 44px;
  }
  .comment{
    padding:16px;
    border-bottom: 1px solid #e4e4e4;
  }
  .comment .author,
  .author img{
    width:30px;
    height:30px;
  }
  .author img{
    border-radius:50%;
  }
  .comment .author{
    float: left;
  }
  .comment-head{
    overflow: hidden;
  }
  .comment-ht{
    margin: 10px 0;
    font-size: 13px;
    color: #888;
  }
  .comment-head h3{
    float: left;
    width:85%;
    font-size: 15px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .comment-head span{
    float: right;
    font-size: 15px;
    color: #999;
  }
  .comment_content{
    margin-left: 50px;
  }
  .comments-sort{
    width:100%;
    height:40px;
    line-height:40px;
    padding-left: 15px;
    font-size:16px;
    color:#333;
    box-sizing: border-box;
    border-bottom:1px solid #e4e4e4;
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
    text-align:center;
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
