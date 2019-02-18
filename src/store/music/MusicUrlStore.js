// import Vue from 'vue'
import MusicUrlService from '@/services/music/MusicUrlService'

const MusicUrlStore = {
  namespaced: true,
  state () {
    return {
      idAttribute: 'musicUrlId',
      MusicCanPlay: 'no',
      MusicName: [],
      AuthorName: [],
      MusicPic: [],
      MusicLrc: []
    }
  },
  mutations: {
    CHANGE_FETCH_MUSIC_URL_STATE (state, payload) {
      if (payload.state === 'success') {
        // debugger
        state.MusicName = payload.songs[0] || []
        state.AuthorName = payload.songs[0].ar[0] || []
        state.MusicPic = payload.songs[0].al || []
        // if (payload.songs[0].ar.length > 0) {
        //   debugger
        //   var author
        //   payload.songs[0].ar.forEach(function (value) {
        //     author = value.name
        //   })
        //   state.fetchedAuthorList = author || []
        // } else {
        //   state.fetchedAuthorList = payload.songs[0].ar || []
        // }

        // state.fetchedCurrentPage = payload.pageNumber || 1
        // state.fetchedTotalCount = payload.totalCount || 0
      }
    },
    CHANGE_FETCH_MUSIC_LRC_STATE (state, payload) {
      if (payload.state === 'success') {
        state.MusicLrc = payload.lrc || []
      }
    },
    CHANGE_FETCH_MUSIC_CAN_PLAY_STATE (state, payload) {
      state.MusicCanPlay = payload.state
      state.checkMessage = payload.message
    }
  },
  actions: {
    FETCH_MUSIC_URL: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      if (state.MusicCanPlay === 'start') { return }
      commit('CHANGE_FETCH_MUSIC_CAN_PLAY_STATE', {state: 'start'})
      MusicUrlService.getMusicCanPlay(context).then(function (response) {
        if (response.data && response.data.success === true) {
          commit('CHANGE_FETCH_MUSIC_CAN_PLAY_STATE', {state: 'success', ...response.data})
        } else {
          commit('CHANGE_FETCH_MUSIC_CAN_PLAY_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('CHANGE_FETCH_MUSIC_CAN_PLAY_STATE', {state: 'error', ...response.data})
        } else {
          commit('CHANGE_FETCH_MUSIC_CAN_PLAY_STATE', {state: 'error', ...response.data})
        }
      })
      commit('CHANGE_FETCH_MUSIC_URL_STATE', {state: 'start'})
      MusicUrlService.getMusicUrl(context).then(function (response) {
        if (response.data && response.data.code === 200) {
          commit('CHANGE_FETCH_MUSIC_URL_STATE', {state: 'success', ...response.data})
        } else {
          commit('CHANGE_FETCH_MUSIC_URL_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('CHANGE_FETCH_MUSIC_URL_STATE', {state: 'error', message: response.message})
        } else {
          commit('CHANGE_FETCH_MUSIC_URL_STATE', {state: 'error', ...response.data})
        }
      })
    },
    FETCH_MUSIC_LRC: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      commit('CHANGE_FETCH_MUSIC_LRC_STATE', {state: 'start'})
      MusicUrlService.getMusicLrc(context).then(function (response) {
        if (response.data && response.data.code === 200) {
          commit('CHANGE_FETCH_MUSIC_LRC_STATE', {state: 'success', ...response.data})
        } else {
          commit('CHANGE_FETCH_MUSIC_LRC_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('CHANGE_FETCH_MUSIC_LRC_STATE', {state: 'error', message: response.message})
        } else {
          commit('CHANGE_FETCH_MUSIC_LRC_STATE', {state: 'error', ...response.data})
        }
      })
    }
  }
}

export default MusicUrlStore
