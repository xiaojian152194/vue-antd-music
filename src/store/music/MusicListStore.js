import MusicListService from '@/services/music/MusicListService'

const MusicListStore = {
  namespaced: true,
  state () {
    return {
      idAttribute: 'musicListId',

      fetchedList: []
    }
  },
  mutations: {
    CHANGE_FETCH_LIST_STATE (state, payload) {
      if (payload.state === 'success') {
        state.fetchedList = payload.playlist || []
      }
    },
    CHANGE_MUSIC_STATE (state, payload) {
      if (payload.state === 'success') {
        state.fetchedList = payload.result || []
      }
    }
  },
  actions: {
    FETCH_MUSIC_LIST: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      commit('CHANGE_FETCH_LIST_STATE', {state: 'start'})
      MusicListService.get().then(function (response) {
        if (response.data && response.data.code === 200) {
          commit('CHANGE_FETCH_LIST_STATE', {state: 'success', ...response.data})
        } else {
          commit('CHANGE_FETCH_LIST_STATE', {state: 'error', ...response.data})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('CHANGE_FETCH_LIST_STATE', {state: 'error', message: response.message})
        } else {
          commit('CHANGE_FETCH_LIST_STATE', {state: 'error', ...response.data})
        }
      })
    },
    FETCH_MUSIC: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      commit('CHANGE_MUSIC_STATE', {state: 'start'})
      MusicListService.getByPrimaryKey(context).then(function (response) {
        if (response.data && response.data.code === 200) {
          commit('CHANGE_MUSIC_STATE', {state: 'success', ...response.data})
        } else {
          commit('CHANGE_MUSIC_STATE', {state: 'error', message: response.data.message})
        }
      }).catch(function (response) {
        if (response instanceof Error) {
          commit('CHANGE_MUSIC_STATE', {state: 'error', message: response.message})
        } else {
          commit('CHANGE_MUSIC_STATE', {state: 'error', message: response.data})
        }
      })
    }
  }
}

export default MusicListStore
