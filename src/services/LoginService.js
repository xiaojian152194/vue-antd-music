/*
 * Copyright (c) 2017, 2026, Nmxpsoft and Nmgzhigang and/or its affiliates. All rights reserved.
 * Nmxpsoft and  Nmgzhigang PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import baseService from '@/services/baseService'
// import dataService from '@/services/dataService'

// const URL = ''
const LoginService = {
  getUser: () => {
    return baseService({
      method: 'get',
      url: 'fg/user/getUser'
    })
  },
  login: (accountData) => {
    return baseService({
      method: 'post',
      url: 'fg/user/login',
      data: accountData
    })
  },
  logout: () => {
    return baseService({
      url: 'fg/user/logout',
      method: 'post'
    })
  },
  register: (accountData) => {
    return baseService({
      method: 'post',
      url: 'fg/register',
      data: accountData
    })
  }
}
export default LoginService
