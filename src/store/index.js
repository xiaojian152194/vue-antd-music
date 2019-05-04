import Vue from 'vue'
import Vuex from 'vuex'
// import account from './modules/account'
import setting from './modules/setting'
import MusicListStore from '@/store/music/MusicListStore'
import MusicUrlStore from '@/store/music/MusicUrlStore'
import LoginStore from '@/store/music/Authorized'
import MyMusicStore from '@/store/music/MyMusicStore'
import UserStore from '@/store/user/UserStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    roles: ''
  },
  mutations: {
    addToken (state, token) { // 第一个参数为 state 用于变更状态 登录
      sessionStorage.setItem('token', token)
      state.token = token
    },
    removeToken (state, token) { // 退出登录
      sessionStorage.removeItem('token', token)
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      sessionStorage.setItem('roles', roles)
      state.roles = roles
    },
    REMOVE_ROLES: (state, roles) => {
      sessionStorage.removeItem('roles', roles)
      state.roles = roles
    }
  },
  modules: {
    // account,
    setting
  }
})

store.registerModule('music_list_store', MusicListStore)
store.registerModule('music_url_store', MusicUrlStore)
store.registerModule('music_login_store', LoginStore)
store.registerModule('my_music_store', MyMusicStore)
store.registerModule('user_store', UserStore)

export default store
