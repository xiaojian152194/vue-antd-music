// import Vue from 'vue'
import UserService from '@/services/user/UserService'

const UserStore = {
  namespaced: true,
  state () {
    return {
      idAttribute: 'userId',

      savingState: 'no',
      savingErrorMessage: null,
      // savedObjects: null,
      updatingState: 'no',
      updateErrorMessage: null,
      updateObjects: null,

      fetchedList: [],
      AllUser: [],
      updateUser: [],
      destroyingState: 'no',
      destroyingErrorMessage: null
    }
  },
  mutations: {
    CHANGE_SAVE_STATE (state, payload) {
      state.savingState = payload.state
      state.savingErrorMessage = payload.message
      // state.savedObjects = payload.savedObjects
    },
    CHANGE_UPDATE_USER_STATE (state, payload) {
      state.updatingState = payload.state
      state.updateErrorMessage = payload.message
      state.updateObjects = payload.updateObjects
    },
    FETCH_All_USER_STATE (state, payload) {
      if (payload.state === 'success') {
        state.AllUser = payload || []
      }
    },
    CHANGE_DESTROY_STATE (state, payload) {
      state.destroyingState = payload.state
      state.destroyingErrorMessage = payload.message
    },
    SEARCH_USER_STATE (state, payload) {
      if (payload.state === 'success') {
        state.AllUser = payload || []
      }
    },
    FETCH_USER_STATE (state, payload) {
      if (payload.state === 'success') {
        state.updateUser = payload || []
      }
    }
  },
  actions: {
    SAVE_USER: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      if (context) {
        if (state.savingState === 'start') { return }
        commit('CHANGE_SAVE_STATE', {state: 'start'})
        UserService.save(context).then(function (response) {
          if (response.data.successResponse && response.data.code === 200) {
            commit('CHANGE_SAVE_STATE', {state: 'success', savedObjects: response.data.datas})
          } else {
            commit('CHANGE_SAVE_STATE', {state: 'error', message: response.data.message})
          }
        }).catch(function (response) {
          if (response instanceof Error) {
            commit('CHANGE_SAVE_STATE', {state: 'error', message: response.message})
          } else {
            commit('CHANGE_SAVE_STATE', {state: 'error', message: response.data.message})
          }
        })
      }
    },
    UPDATE_USER: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      if (context) {
        if (state.updatingState === 'start') { return }
        commit('CHANGE_UPDATE_USER_STATE', {state: 'start'})
        UserService.update(context).then(function (response) {
          if (response.data.successResponse && response.data.code === 200) {
            commit('CHANGE_UPDATE_USER_STATE', {state: 'success', savedObjects: response.data.datas})
          } else {
            commit('CHANGE_UPDATE_USER_STATE', {state: 'error', message: response.data.message})
          }
        }).catch(function (response) {
          if (response instanceof Error) {
            commit('CHANGE_UPDATE_USER_STATE', {state: 'error', message: response.message})
          } else {
            commit('CHANGE_UPDATE_USER_STATE', {state: 'error', message: response.data.message})
          }
        })
      }
    },
    FETCH_All_USER: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      commit('FETCH_All_USER_STATE', {state: 'start'})
      UserService.get().then(function (response) {
        if (response.data.successResponse === true && response.data.code === 200) {
          commit('FETCH_All_USER_STATE', {state: 'success', ...response.data})
        } else {
          commit('FETCH_All_USER_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('FETCH_All_USER_STATE', {state: 'error', message: response.message})
        } else {
          commit('FETCH_All_USER_STATE', {state: 'error', ...response.data})
        }
      })
    },
    DELETE_USER: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      if (context) {
        if (state.destroyingState === 'start') { return }
        commit('CHANGE_DESTROY_STATE', {state: 'start'})
        UserService.remove(context).then(function (response) {
          if (response.data.successResponse && response.data.code === 200) {
            commit('CHANGE_DESTROY_STATE', {state: 'success'})
          } else {
            commit('CHANGE_DESTROY_STATE', {state: 'error', message: response.data.message})
          }
        }).catch(function (response) {
          if (response instanceof Error) {
            commit('CHANGE_DESTROY_STATE', {state: 'error', message: response.message})
          } else {
            commit('CHANGE_DESTROY_STATE', {state: 'error', message: response.data.message})
          }
        })
      }
    },
    SEARCH_USER: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      commit('SEARCH_USER_STATE', {state: 'start'})
      UserService.searchUser(context).then(function (response) {
        if (response.data.successResponse === true && response.data.code === 200) {
          commit('SEARCH_USER_STATE', {state: 'success', ...response.data})
        } else {
          commit('SEARCH_USER_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('SEARCH_USER_STATE', {state: 'error', message: response.message})
        } else {
          commit('SEARCH_USER_STATE', {state: 'error', ...response.data})
        }
      })
    },
    FETCH_USER: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      commit('FETCH_USER_STATE', {state: 'start'})
      UserService.getByPrimaryKey(context).then(function (response) {
        if (response.data.successResponse === true && response.data.code === 200) {
          commit('FETCH_USER_STATE', {state: 'success', ...response.data.datas[0]})
        } else {
          commit('FETCH_USER_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('FETCH_USER_STATE', {state: 'error', message: response.message})
        } else {
          commit('FETCH_USER_STATE', {state: 'error', ...response.data})
        }
      })
    }
  }
}

export default UserStore
