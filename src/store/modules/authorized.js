import dataService from '@/services/dataService'
import loginService from '@/services/loginService'

const CURRENT_ACCOUNT_KEY = 'current_account'
// const CURRENT_PRIVILEGE_TREE_KEY = 'current_privilege_tree'
// const CURRENT_PRIVILEGE_FEATURES_KEY = 'current_privilege_features'

const authorized = {
  state: {
    currentUser: {},
    authorizedState: (sessionStorage.getItem(CURRENT_ACCOUNT_KEY) ? 'success' : 'no'),
    // authorizedMessage: '',
    // accountInfo: (sessionStorage.getItem(CURRENT_ACCOUNT_KEY) ? JSON.parse(sessionStorage.getItem(CURRENT_ACCOUNT_KEY)) : null),
    // privilegeTree: (sessionStorage.getItem(CURRENT_PRIVILEGE_TREE_KEY) ? JSON.parse(sessionStorage.getItem(CURRENT_PRIVILEGE_TREE_KEY)) : []),
    // privilegeFeatures: (sessionStorage.getItem(CURRENT_PRIVILEGE_FEATURES_KEY) ? JSON.parse(sessionStorage.getItem(CURRENT_PRIVILEGE_FEATURES_KEY)) : []),
    // contentHeight: '700px',

    loadingUpdatePasswdState: 'no'
    // loadingUpdatePasswdErrorMessage: null,
    // currentUpdatePasswdObject: {}
  },
  // getters: {
  //   getToken: (state) => () => {
  //     return dataService.getToken()
  //   }
  // },
  mutations: {
    // UPDATE_CONTENT_HEIGHT (state, contentHeight) {
    //   state.contentHeight = contentHeight
    // },
    CHANGE_LOGIN_STATE (state, payload) {
      state.authorizedState = payload.authorizedState
      state.authorizedMessage = payload.authorizedMessage
    },
    // CHANGE_CURRENT_ACCOUNT (state, accountInfo) {
    //   if (accountInfo && accountInfo !== null) {
    //     sessionStorage.setItem(CURRENT_ACCOUNT_KEY, JSON.stringify(accountInfo))
    //   } else {
    //     sessionStorage.removeItem('current_current_project_id')
    //     sessionStorage.removeItem(CURRENT_ACCOUNT_KEY)
    //   }
    //   state.accountInfo = accountInfo
    // },
    // CHANGE_CURRENT_ACCOUNT_PERMISSION (state, permission) {
    //   if (permission) {
    //     const privilegeTree = permission.children || []
    //     const privilegeFeatures = permission.datas || []
    //     sessionStorage.setItem(CURRENT_PRIVILEGE_TREE_KEY, JSON.stringify(privilegeTree))
    //     sessionStorage.setItem(CURRENT_PRIVILEGE_FEATURES_KEY, JSON.stringify(privilegeFeatures))
    //     state.privilegeTree = privilegeTree
    //     state.privilegeFeatures = privilegeFeatures
    //   } else {
    //     sessionStorage.removeItem(CURRENT_PRIVILEGE_TREE_KEY)
    //     sessionStorage.removeItem(CURRENT_PRIVILEGE_FEATURES_KEY)
    //     state.privilegeTree = []
    //     state.privilegeFeatures = []
    //   }
    // },
    CHANGE_UPDATE_PASSWD_STATE (state, payload) {
      state.loadingUpdatePasswdState = payload.state
      state.loadingUpdatePasswdErrorMessage = payload.message
      state.currentUpdatePasswdObject = payload.currentObject || {}
    }
  },
  actions: {
    ACCOUNT_LOGIN: ({dispatch, commit}, loginData) => {
      debugger
      commit('CHANGE_LOGIN_STATE', {
        authorizedState: 'start',
        authorizedMessage: null
      })
      loginService.login(loginData).then(function (response) {
        if (response.data && response.data.code === 200) {
          return dispatch('ACCOUNT_LOGIN_SUCCESS', response.data.datas[0])
        } else {
          commit('CHANGE_LOGIN_STATE', {
            authorizedState: 'fail',
            authorizedMessage: response.data.message
          })
        }
      }).catch(function (err) {
        commit('CHANGE_LOGIN_STATE', {
          authorizedState: 'fail',
          authorizedMessage: err.message
        })
      })
    },
    ACCOUNT_LOGOUT: ({commit}) => {
      loginService.logout()
      dataService.removeToken()
      commit('CHANGE_CURRENT_ACCOUNT', null)
      commit('CHANGE_CURRENT_ACCOUNT_PERMISSION', null)
      commit('CHANGE_LOGIN_STATE', { authorizedState: 'no', authorizedMessage: null })
    },
    ACCOUNT_REGISTER: ({dispatch, commit, state}, data) => {
      if (state.loadingUpdatePasswdState === 'start') { return }
      commit('CHANGE_UPDATE_PASSWD_STATE', {state: 'start'})
      loginService.register(data).then(function (response) {
        if (response.data && response.data.code === 200) {
          commit('CHANGE_UPDATE_PASSWD_STATE', {state: 'success'})
        } else {
          commit('CHANGE_UPDATE_PASSWD_STATE', {state: 'error', message: response.data.message})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('CHANGE_UPDATE_PASSWD_STATE', {state: 'error', message: response.message})
        } else {
          commit('CHANGE_UPDATE_PASSWD_STATE', {state: 'error', message: response.data.message})
        }
      })
    },
    ACCOUNT_UPDATE_PASSWORD: ({dispatch, commit, state}, data) => {
      if (state.loadingUpdatePasswdState === 'start') { return }
      commit('CHANGE_UPDATE_PASSWD_STATE', {state: 'start'})
      loginService.register(data).then(function (response) {
        if (response.data.successResponse && response.data.code === 200) {
          commit('CHANGE_UPDATE_PASSWD_STATE', {state: 'success'})
        } else {
          commit('CHANGE_UPDATE_PASSWD_STATE', {state: 'error', message: response.data.message})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('CHANGE_UPDATE_PASSWD_STATE', {state: 'error', message: response.message})
        } else {
          commit('CHANGE_UPDATE_PASSWD_STATE', {state: 'error', message: response.data.message})
        }
      })
    }
  }
}

export default authorized
