import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index'
import article from '../views/article'
import theme from '../views/theme'
import comment from '../views/comment'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/article/:id',
      name: 'article',
      component: article
    },
    {
      path: '/theme/:id',
      name: 'theme',
      component: theme
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: comment
    }
  ]
})
