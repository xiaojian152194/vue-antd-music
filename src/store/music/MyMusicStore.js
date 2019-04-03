import Vue from 'vue'
import MyMusicService from '@/services/music/MyMusicService'

const MyMusicStore = {
  namespaced: true,
  state () {
    return {
      idAttribute: 'myMusicListId',

      fetchedList: [],
      myMusic: {}
    }
  },
  mutations: {
    FETCH_MY_MUSIC_LIST_STATE (state, payload) {
      if (payload.state === 'success') {
        state.fetchedList = payload || []
      }
    },
    UPLOAD_MUSIC_STATE (state, payload) {
      if (payload.state === 'success') {
        state.fetchedList = payload.result || []
      }
    },
    FETCH_MY_MUSIC_STATE (state, payload) {
      if (payload.state === 'success') {
        state.myMusic = payload || []
      }
    }
  },
  actions: {
    FETCH_MY_MUSIC_LIST: ({dispatch, commit, state, rootState, rootGetters}) => {
      commit('FETCH_MY_MUSIC_LIST_STATE', {state: 'start'})
      MyMusicService.get().then(function (response) {
        if (response.data.successResponse === true && response.data.code === 200) {
          commit('FETCH_MY_MUSIC_LIST_STATE', {state: 'success', ...response.data})
        } else {
          commit('FETCH_MY_MUSIC_LIST_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('FETCH_MY_MUSIC_LIST_STATE', {state: 'error', message: response.message})
        } else {
          commit('FETCH_MY_MUSIC_LIST_STATE', {state: 'error', ...response.data})
        }
      })
    },
    UPLOAD_MUSIC: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      commit('UPLOAD_MUSIC_STATE', {state: 'start'})
      MyMusicService.upload(context).then(function (response) {
        if (response.data.successResponse === true && response.data.code === 200) {
          commit('UPLOAD_MUSIC_STATE', {state: 'success', ...response.data})
        } else {
          commit('UPLOAD_MUSIC_STATE', {state: 'error', message: response.data.message})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('UPLOAD_MUSIC_STATE', {state: 'error', message: response.message})
        } else {
          commit('UPLOAD_MUSIC_STATE', {state: 'error', message: response.data})
        }
      })
    },
    FETCH_MY_MUSIC: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      commit('FETCH_MY_MUSIC_STATE', {state: 'start'})
      MyMusicService.getByPrimaryKey(context).then(function (response) {
        if (response.data.successResponse === true && response.data.code === 200) {
          commit('FETCH_MY_MUSIC_STATE', {state: 'success', ...response.data.datas[0]})
        } else {
          commit('FETCH_MY_MUSIC_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('FETCH_MY_MUSIC_STATE', {state: 'error', message: response.message})
        } else {
          commit('FETCH_MY_MUSIC_STATE', {state: 'error', ...response.data})
        }
      })
    }
  }
}

export default MyMusicStore
