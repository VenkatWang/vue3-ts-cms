import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/login/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/main/main.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
