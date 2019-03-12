import baseService from '@/services/baseService'
// import dataService from '@/services/dataService'

// const URL = ''
const MyMusicService = {
  getByPrimaryKey: (searchKey) => {
    return baseService('fg/music/' + searchKey, {
      method: 'get'
    })
  },
  get: () => {
    return baseService('fg/music/get_user_musics', {
      method: 'get'
    })
  },
  upload: (music) => {
    return baseService('fg/music/upload', {
      method: 'post',
      data: music
    })
  }
}
export default MyMusicService
