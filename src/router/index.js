import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import Detail from '../components/detail.vue'
import Comments from '../components/comment.vue'
import listContent from '../components/list_content.vue';
import themeContent from '../components/theme-content.vue';
import User from '../components/user.vue';
import Editors from '../components/editor.vue';
import Author from '../components/author.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name:'listContent',
          component: listContent
        },
        {
          path: '/theme/:id',
          name:'theme',
          component: themeContent
        },
        {
          path:'/user/:id',
          name:'user',
          component:User
        }
      ]
    },
    {
      path:'/detail/:id',
      name:'detail',
      component:Detail
    },
    {
      path:'/comments/:id',
      name:'comments',
      component:Comments
    },
    {
      path:'/editors/:id',
      name:'editors',
      component:Editors
    },
    {
      path:'/author/:id',
      name:'author',
      component:Author
    }
  ]
})
