// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from  'axios'
import  apiconfig from '../config/api.config'
import vueAxios from 'vue-axios'
Vue.config.productionTip = false


import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
     loading: require('./assets/loading.gif'),//加载中图片，一定要有，不然会一直重复加载占位图
     error: require('./assets/del.png')  //加载失败图片
});



Vue.prototype.$axios=axios
//网络请求

axios.defaults.baseURL=apiconfig.baseUrl

Vue.config.productionTip = false
Vue.use(vueAxios,axios)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
