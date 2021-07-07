import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// UI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局样式
import '@/assets/css/global.less'

// 在vue 的原型对象上添加  $bus 事件总线(兄弟组件通信)
Vue.prototype.$bus = new Vue()
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
