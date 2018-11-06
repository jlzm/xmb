// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCountUp from 'vue-countupjs'
import VCharts from 'v-charts'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import quillEditor from 'vue-quill-editor' //调用编辑器
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'   // 默认主题
import './assets/stylus/base.styl'
import './../static/css/login.styl'
import './assets/icon/iconfont.css'
Vue.config.productionTip = false
Vue.use(VueCountUp)
Vue.use(VCharts)
Vue.use(ElementUI, { size: 'small' });
Vue.use(VueLazyload)
/* eslint-disable no-new */
Vue.use(quillEditor)
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem('userid');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403');
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
