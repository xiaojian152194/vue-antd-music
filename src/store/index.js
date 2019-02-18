import Vue from 'vue'
import Vuex from 'vuex'
// import account from './modules/account'
import setting from './modules/setting'
import MusicListStore from '@/store/music/MusicListStore'
import MusicUrlStore from '@/store/music/MusicUrlStore'
import LoginStore from '@/store/music/Authorized'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // account,
    setting
  }
})

store.registerModule('music_list_store', MusicListStore)
store.registerModule('music_url_store', MusicUrlStore)
store.registerModule('music_login_store', LoginStore)

export default store
