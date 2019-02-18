// import Vue from 'vue'
// import MusicUrlService from '@/services/music/MusicUrlService'
import LoginService from '../../services/LoginService'

const Authorized = {
  namespaced: true,
  state () {
    return {
      idAttribute: 'loginId',
      UserLogin: 'no',
      currentUser: {}
    }
  },
  mutations: {
    CHANGE_FETCH_CURRENT_USER_STATE (state, payload) {
      if (payload.state === 'success') {
        // debugger
        state.currentUser = payload
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
      } else {
        state.currentUser = payload
      }
    }
  },
  actions: {
    GET_USER_LOGIN: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      commit('CHANGE_FETCH_CURRENT_USER_STATE', {state: 'start'})
      LoginService.login(context).then(function (response) {
        if (response.data) {
          commit('CHANGE_FETCH_CURRENT_USER_STATE', {state: 'success', ...response.data})
        } else {
          commit('CHANGE_FETCH_CURRENT_USER_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('CHANGE_FETCH_CURRENT_USER_STATE', {state: 'error', ...response.data})
        } else {
          commit('CHANGE_FETCH_CURRENT_USER_STATE', {state: 'error', ...response.data})
        }
      })
    }
  }
}

export default Authorized
