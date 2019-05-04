import baseService from '@/services/baseService'
// import dataService from '@/services/dataService'

// const URL = ''
const UserService = {
  save: (user) => {
    return baseService('fg/music/user/single', {
      method: 'post',
      data: user
    })
  },
  update: (user) => {
    return baseService('fg/music/user/single', {
      method: 'put',
      data: user
    })
  },
  remove: (user) => {
    return baseService('fg/music/user/single', {
      method: 'delete',
      data: user
    })
  },
  getByPrimaryKey: (userId) => {
    return baseService('fg/music/user/' + userId, {
      method: 'get'
    })
  },
  get: () => {
    return baseService('fg/music/user', {
      method: 'get'
    })
  },
  searchUser: (user) => {
    return baseService('fg/music/user/search_user', {
      method: 'post',
      data: user
    })
  }
}
export default UserService
