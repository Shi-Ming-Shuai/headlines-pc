import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// UI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局样式
import '@/assets/css/global.less'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
