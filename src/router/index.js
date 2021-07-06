import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login')
  },
  // 布局页面
  {
    path: '/',
    component: () => import('@/components/common/Layout'),
    children: [
      {
        // path 为空 表示默认展示这个子路由
        path: '', component: () => import('@/views/home/Home')
      },
      { path: 'article', name: 'article', component: () => import('@/views/article/Article') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
