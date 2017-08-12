<template>
  <div class="comment">
    <div class="author"><img :src="comment.avatar | replaceUrl"></div>
    <div class="comment_content">
      <div class="comment-head">
        <h3>{{comment.author}}</h3>
        <span :class={select:isPopular} @click="getNum(comment)"><i class="iconfont">&#xe612;</i>{{comment.likes}}</span>
      </div>
      <div class="comment-ht">
        {{comment.content}}
      </div>
      <p class="comment-time">{{comment.time | getCommentTime}}</p>
    </div>
    <div class="comment_content" v-if="comment.reply_to">
      <div class="comment-ht">
        <span class="reply_author">//{{comment.reply_to.author}}：</span>{{comment.reply_to.content}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'comment',
    props:['comment'],
    data(){
      return {
        isPopular:false
      }
    },
    filters:{
      replaceUrl(str){
        return str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      },
      getCommentTime(oldTime){
        var unixTimestamp=new Date(new Date(oldTime*1000)).toLocaleString();
        return  unixTimestamp;
      }
    },
    methods:{
      getNum(item){
        this.isPopular=!this.isPopular;
        if(this.isPopular){
          item.likes+=1;
        }else{
          item.likes-=1;
        }
      }
    }
  }
</script>
<style>
  .comment-head span.select{
    color:#00a2ea;
  }
  .reply_author{
    color: #333;
  }
</style>
