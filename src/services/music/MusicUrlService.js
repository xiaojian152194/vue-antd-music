/*
 * Copyright (c) 2017, 2026, Nmxpsoft and Nmgzhigang and/or its affiliates. All rights reserved.
 * Nmxpsoft and  Nmgzhigang PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import baseService from '@/services/baseService'
// import otherService from '@/services/otherService'
// import dataService from '@/services/dataService'

// const URL = ''
const MusicUrlService = {
  getMusicId: (musicId) => {
    return baseService('api/song/detail?ids=' + musicId, {
      method: 'get'
    })
  },
  getMusicLrc: (musicId) => {
    return baseService('api/lyric?id=' + musicId, {
      method: 'get'
    })
  },
  getMusicCanPlay: (musicId) => {
    return baseService('api/check/music?id=' + musicId, {
      method: 'get'
    })
  },
  getMusicUrl: (musicId) => {
    return baseService('api/song/url?id=' + musicId, {
      method: 'get'
    })
  },
  check: (opportunityShadow, statusValue) => {
    return baseService('api/business/manager/opportunity/check', {
      method: 'put',
      data: opportunityShadow,
      params: {statusValue: statusValue}
    })
  }
}
export default MusicUrlService
