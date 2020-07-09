import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/home')
      },
      {
        path: 'component',
        name: 'Component',
        component: () => import(/* webpackChunkName: "component" */ '../views/component')
      },
      {
        path: 'method',
        name: 'Method',
        component: () => import(/* webpackChunkName: "method" */ '../views/method')
      },
      {
        path: 'rule',
        name: 'Rule',
        component: () => import(/* webpackChunkName: "rule" */ '../views/rule')
      },
      {
        path: 'more',
        name: 'More',
        component: () => import(/* webpackChunkName: "more" */ '../views/more')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
