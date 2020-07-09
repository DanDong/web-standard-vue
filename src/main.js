import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ClipboardJS from 'clipboard'
import { Message } from 'element-ui'

import '@/assets/reset.css'
import 'highlight.js/styles/xcode.css'
// 代码高亮样式
// import 'highlight.js/styles/default.css'
// import 'highlight.js/styles/vs2015.css'
// import 'highlight.js/styles/monokai-sublime.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$axios = Axios

const clipboard = new ClipboardJS('.color')
clipboard.on('success', e => {
  Message.success({
    message: e.text + ' 复制成功',
    duration: 1000
  })
})

Vue.filter('sideMenuFilter', (value) => {
  let res = value.split('.')
  return res[res.length - 2]
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')