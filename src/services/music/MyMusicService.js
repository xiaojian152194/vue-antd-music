import baseService from '@/services/baseService'
// import dataService from '@/services/dataService'

// const URL = ''
const MyMusicService = {
  getByPrimaryKey: (searchKey) => {
    return baseService('fg/music/' + searchKey, {
      method: 'get'
    })
  },
  getUserMusic: (userId) => {
    return baseService('fg/music/get_user_musics', {
      method: 'post',
      data: userId
    })
  },
  get: () => {
    return baseService('fg/music', {
      method: 'get'
    })
  },
  searchMusic: (music) => {
    return baseService('fg/music/search_music', {
      method: 'post',
      data: music
    })
  },
  upload: (music) => {
    return baseService('fg/music/upload', {
      method: 'post',
      data: music
    })
  },
  deleteMusic: (music) => {
    return baseService('fg/music/single', {
      method: 'delete',
      data: music
    })
  }
}
export default MyMusicService
