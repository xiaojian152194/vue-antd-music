/*
 * Copyright (c) 2017, 2026, Nmxpsoft and Nmgzhigang and/or its affiliates. All rights reserved.
 * Nmxpsoft and  Nmgzhigang PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import baseService from '@/services/baseService'
// import dataService from '@/services/dataService'

const URL = ''
const MusicListService = {
  getByPrimaryKey: (opportunityId) => {
    return baseService(URL + '/' + opportunityId, {
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
export default MusicListService
