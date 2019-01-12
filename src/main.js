// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/lazy'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import axios from 'axios'
import util from '@/utils/utils'
import '@/mock'
import store from './store'
import PouchDB from 'pouchdb'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Antd)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  methods: {
    longTimestampRender: function (h, params) {
      let longTimestamp = params.row[params.column.key]
      return h('span', util.longTimestampToString(longTimestamp))
    }
  },
  filters: {
    longTimestamp: function (value) {
      return util.longTimestampToString(value)
    }
  },
  mounted () {
    var db = new PouchDB('admindb')
    db.get('currUser').then(doc => {
      this.$store.commit('account/setuser', doc.user)
    })
  }
})
