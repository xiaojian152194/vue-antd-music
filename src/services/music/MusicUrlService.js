/*
 * Copyright (c) 2017, 2026, Nmxpsoft and Nmgzhigang and/or its affiliates. All rights reserved.
 * Nmxpsoft and  Nmgzhigang PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import baseService from '@/services/baseService'
// import dataService from '@/services/dataService'

// const URL = ''
const MusicUrlService = {
  getMusicUrl: (musicId) => {
    return baseService('api/song/detail?ids=' + musicId, {
      method: 'get'
    })
  },
  getMusicLrc: (musicId) => {
    return baseService('api/lyric?id=' + musicId, {
      method: 'get'
    })
  },
  get: () => {
    return baseService('api/top/list?idx=3', {
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
