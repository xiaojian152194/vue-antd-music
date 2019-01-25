import Vue from 'vue'
import MusicUrlService from '@/services/music/MusicUrlService'

const MusicUrlStore = {
  namespaced: true,
  state () {
    return {
      idAttribute: 'musicUrlId',

      savingState: 'no',
      savingErrorMessage: null,
      savedObjects: null,

      fetchPageSize: 25,
      fetchSearchKey: null,
      fetchSort: null,
      fetchParameters: null,
      fetchingListState: 'no',
      fetchingListErrorMessage: null,
      fetchedMusicList: [],
      fetchedAuthorList: [],
      fetchedCurrentPage: 1,
      fetchedTotalCount: 0,
      dynamicFetch: {},

      destroyingState: 'no',
      destroyingErrorMessage: null,
      submittingState: 'no',
      submittingErrorMessage: null,

      loadingUpdateState: 'no',
      loadingUpdateErrorMessage: null,
      currentUpdateObject: {},
      loadingDisplayState: 'no',
      loadingDisplayErrorMessage: null,
      currentDisplayObject: {},

      getCheckInfoState: 'no',
      getCheckInfoErrorMessage: null,
      checkInfo: {},

      checkState: 'no',
      checkErrorMessage: null
    }
  },
  getters: {
    getDynamicFetchedLoading: (state) => (dynamicFetchKey) => {
      if (state.dynamicFetch[dynamicFetchKey]) {
        return state.dynamicFetch[dynamicFetchKey].fetchingListState === 'start'
      }
      return false
    },
    getDynamicFetchedData: (state) => (dynamicFetchKey) => {
      if (state.dynamicFetch[dynamicFetchKey]) {
        return state.dynamicFetch[dynamicFetchKey].fetchedList
      }
      return {}
    }
  },
  mutations: {
    CHANGE_SAVE_STATE (state, payload) {
      state.savingState = payload.state
      state.savingErrorMessage = payload.message
      state.savedObjects = payload.savedObjects
    },
    CHANGE_FETCH_PAGE_PARAMETER (state, payload) {
      if (payload.isDynamicFetch === true && payload.dynamicFetchKey && payload.dynamicFetchKey !== '') {
        if (!state.dynamicFetch[payload.dynamicFetchKey]) {
          Vue.set(state.dynamicFetch, payload.dynamicFetchKey, {})
        }
        if (payload.pageSize) {
          Vue.set(state.dynamicFetch[payload.dynamicFetchKey], 'fetchPageSize', payload.pageSize)
        }
        if (payload.currentPage) {
          Vue.set(state.dynamicFetch[payload.dynamicFetchKey], 'fetchedCurrentPage', payload.currentPage)
        }
      } else {
        if (payload.pageSize) {
          state.fetchPageSize = payload.pageSize
        }
        if (payload.currentPage) {
          state.fetchedCurrentPage = payload.currentPage
        }
      }
    },
    CHANGE_FETCH_PARAMETER (state, payload) {
      if (payload.isDynamicFetch === true && payload.dynamicFetchKey && payload.dynamicFetchKey !== '') {
        if (!state.dynamicFetch[payload.dynamicFetchKey]) {
          Vue.set(state.dynamicFetch, payload.dynamicFetchKey, {})
        }
        if (payload.parameter) {
          Vue.set(state.dynamicFetch[payload.dynamicFetchKey], 'fetchParameters', payload.parameter)
        }
        if (payload.searchKey || payload.searchKey === '') {
          Vue.set(state.dynamicFetch[payload.dynamicFetchKey], 'fetchSearchKey', payload.searchKey)
        }
        if (payload.sort) {
          Vue.set(state.dynamicFetch[payload.dynamicFetchKey], 'fetchSort', payload.sort)
        }
      } else {
        if (payload.parameter) {
          state.fetchParameters = payload.parameter
        }
        if (payload.searchKey || payload.searchKey === '') {
          state.fetchSearchKey = payload.searchKey
        }
        if (payload.sort) {
          state.fetchSort = payload.sort
        }
      }
    },
    CHANGE_FETCH_MUSIC_URL_STATE (state, payload) {
      if (payload.state === 'success') {
        // debugger
        state.fetchedMusicList = payload.songs[0].al || []
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
        state.fetchedAuthorList = payload.songs[0].ar[0] || []
        // state.fetchedCurrentPage = payload.pageNumber || 1
        // state.fetchedTotalCount = payload.totalCount || 0
      }
      // if (payload.isDynamicFetch === true && payload.dynamicFetchKey && payload.dynamicFetchKey !== '') {
      //   if (!state.dynamicFetch[payload.dynamicFetchKey]) {
      //     Vue.set(state.dynamicFetch, payload.dynamicFetchKey, {})
      //   }
      //   Vue.set(state.dynamicFetch[payload.dynamicFetchKey], 'fetchingListState', payload.state)
      //   if (payload.state === 'error') { Vue.set(state.dynamicFetch[payload.dynamicFetchKey], 'fetchingListErrorMessage', payload.message) }
      //   if (payload.state === 'success') {
      //     Vue.set(state.dynamicFetch[payload.dynamicFetchKey], 'fetchedList', payload.datas || [])
      //     Vue.set(state.dynamicFetch[payload.dynamicFetchKey], 'fetchedCurrentPage', payload.pageNumber || 1)
      //     Vue.set(state.dynamicFetch[payload.dynamicFetchKey], 'fetchedTotalCount', payload.totalCount || 0)
      //   }
      // } else {
      //   state.fetchingListState = payload.state
      //   if (payload.state === 'error') { state.fetchingListErrorMessage = payload.message }
      //   if (payload.state === 'success') {
      //     state.fetchedList = payload.datas || []
      //     state.fetchedCurrentPage = payload.pageNumber || 1
      //     state.fetchedTotalCount = payload.totalCount || 0
      //   }
      // }
    },
    CHANGE_DESTROY_STATE (state, payload) {
      state.destroyingState = payload.state
      state.destroyingErrorMessage = payload.message
    },
    CHANGE_SUBMIT_STATE (state, payload) {
      state.submittingState = payload.state
      state.submittingErrorMessage = payload.message
    },
    CHANGE_LOAD_UPDATE_OBJECT_STATE (state, payload) {
      state.loadingUpdateState = payload.state
      state.loadingUpdateErrorMessage = payload.message
      state.currentUpdateObject = payload.currentObject || {}
    },
    CHANGE_LOAD_DISPLAY_OBJECT_STATE (state, payload) {
      state.loadingDisplayState = payload.state
      state.loadingDisplayErrorMessage = payload.message
      state.currentDisplayObject = payload.currentObject || {}
    },
    CHANGE_MUSIC_LIST_STATE (state, payload) {
      state.checkState = payload.state
      state.checkErrorMessage = payload.message
    }
  },
  actions: {
    FETCH_MUSIC_URL: ({dispatch, commit, state, rootState, rootGetters}, context) => {
      commit('CHANGE_FETCH_MUSIC_URL_STATE', {state: 'start'})
      MusicUrlService.getByPrimaryKey(context).then(function (response) {
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
    }
    // MUSIC_LIST: ({dispatch, commit, state, rootState, rootGetters}) => {
    //   commit('CHANGE_MUSIC_LIST_STATE', {state: 'start'})
    //   MusicListService.get().then(function (response) {
    //     if (response.data.successResponse && response.data.code === 200) {
    //       commit('CHANGE_MUSIC_LIST_STATE', {state: 'success'})
    //     } else {
    //       commit('CHANGE_MUSIC_LIST_STATE', {state: 'error', message: response.data.message})
    //     }
    //   }).catch(function (response) {
    //     if (response instanceof Error) {
    //       commit('CHANGE_MUSIC_LIST_STATE', {state: 'error', message: response.message})
    //     } else {
    //       commit('CHANGE_MUSIC_LIST_STATE', {state: 'error', message: response.data.message})
    //     }
    //   })
    // }
  }
}

export default MusicUrlStore