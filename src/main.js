import Vue from 'vue'
import App from './App'

// 导入过滤器
import * as filters from '@/common/js/filters'

Object.keys(filters).forEach(key => {
  Vue.use(filters[key])
})
Vue.use(filters)


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
