import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Tea from './views/Tea.vue'
import Datasheet from './views/Datasheet.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home/:_id',
      name: 'home',
      component: Home
    },
    {
      path: '/tea',
      name: 'tea',
      component: Tea
    },
    {
      path: '/datasheet/:_id?',
      name: 'datasheet',
      component: Datasheet,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
