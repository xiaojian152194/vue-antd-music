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
    USER_LOGIN_STATE (state, payload) {
      if (payload.state === 'success') {
        // debugger
        state.currentUser = payload
        state.UserLogin = 'yes'
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
    },
    GET_USER_LOGIN_STATE (state, payload) {
      // debugger
      if (payload.state === 'success') {
        // debugger
        state.currentUser = payload
        state.UserLogin = 'yes'
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
    },
    LOGOUT_STATE (state, payload) {
      if (payload.state === 'success') {
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
    GET_USER_LOGIN: ({dispatch, commit, state, rootState, rootGetters}) => {
      commit('GET_USER_LOGIN_STATE', {state: 'start'})
      LoginService.getUser().then(function (response) {
        // debugger
        if (response.data.successResponse === true) {
          commit('GET_USER_LOGIN_STATE', {state: 'success', ...response.data.datas[0]})
        } else {
          commit('GET_USER_LOGIN_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('GET_USER_LOGIN_STATE', {state: 'error', ...response.data})
        } else {
          commit('GET_USER_LOGIN_STATE', {state: 'error', ...response.data})
        }
      })
    },
    LOGIN: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      commit('USER_LOGIN_STATE', {state: 'start'})
      LoginService.login(context).then(function (response) {
        // debugger
        if (response.data.successResponse === true) {
          commit('USER_LOGIN_STATE', {state: 'success', ...response.data})
        } else {
          commit('USER_LOGIN_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('USER_LOGIN_STATE', {state: 'error', ...response.data})
        } else {
          commit('USER_LOGIN_STATE', {state: 'error', ...response.data})
        }
      })
    },
    LOGOUT: ({dispatch, commit, state, rootState, rootGetters}) => {
      commit('LOGOUT_STATE', {state: 'start'})
      LoginService.logout().then(function (response) {
        if (response.data.successResponse === true) {
          commit('LOGOUT_STATE', {state: 'success', ...response.data})
        } else {
          commit('LOGOUT_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('LOGOUT_STATE', {state: 'error', ...response.data})
        } else {
          commit('LOGOUT_STATE', {state: 'error', ...response.data})
        }
      })
    },
    REGISTER: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      commit('GET_USER_LOGIN_STATE', {state: 'start'})
      LoginService.register(context).then(function (response) {
        if (response.data.successResponse === true) {
          commit('REGISTER_STATE', {state: 'success', ...response.data})
        } else {
          commit('REGISTER_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('REGISTER_STATE', {state: 'error', ...response.data})
        } else {
          commit('REGISTER_STATE', {state: 'error', ...response.data})
        }
      })
    }
  }
}

export default Authorized
