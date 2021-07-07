import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入提示
import { Message } from 'element-ui'
// 获取登录状态 token有值代表登录
import { getToken } from '@/utils/getToken'
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

// 全局导航守卫 判断是否有权限
router.beforeEach((to, from, next) => {
  const token = getToken()
  // 如果是去往登录页 则直接跳转
  if (to.fullPath === '/login') {
    next()
  } else {
    //  判断是否登录 如果没登录跳转至登录页
    if (!token) {
      Message('请先登录')
      next('/login')
    } else {
      next()
    }
  }
})
export default router
