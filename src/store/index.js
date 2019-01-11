import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import setting from './modules/setting'
import MusicListStore from '@/store/music/MusicListStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    account,
    setting
  }
})

store.registerModule('music_list_store', MusicListStore)

export default store
