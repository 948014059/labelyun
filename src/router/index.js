import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/Labelyun'
import label_rectangle from "../components/label_rectangle";



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'label_rectangle',
      component: label_rectangle
    }
  ]
})
