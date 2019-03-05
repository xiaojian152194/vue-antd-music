// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/lazy'
// import { readToken } from './utils/cookie'
import 'ant-design-vue/dist/antd.css'
import Icon from 'vue-awesome/components/Icon'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import axios from 'axios'
import util from '@/utils/utils'
import '@/mock'
import store from './store'
// import PouchDB from 'pouchdb'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Antd)
Vue.component('icon', Icon)
/* eslint-disable no-new */
Vue.mixin({
  methods: {
    musicTimeFormatRender: function (h, params) {
      let musicDt = params.row[params.column.dataIndex]
      return h('span', util.musicTimeFormat(musicDt))
    }
  },
  filters: {
    // longTimestamp: function (value) {
    //   return util.longTimestampToString(value)
    // }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
  // mounted () {
  //   var db = new PouchDB('admindb')
  //   db.get('currUser').then(doc => {
  //     this.$store.commit('account/setuser', doc.user)
  //   })
  // }
})
router.beforeEach((to, from, next) => {
  store.state.token = sessionStorage.getItem('token')// 获取本地存储的token

  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.token !== '') { // 通过vuex state获取当前的token是否存
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
