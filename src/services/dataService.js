import Cookie from 'js-cookie'

let TOKEN_KEY = 'nmxpsoft-api-token'
let dataService = {}

dataService.setData = function (key, values) {
  Cookie.set(key, values, {path: '/'})
}

dataService.getData = function (key) {
  return Cookie.get(key)
}

dataService.removeData = function (key) {
  Cookie.remove(key, { path: '/' })
}

dataService.setToken = function (token) {
  // sessionStorage.setItem(TokenKey, token);
  this.setData(TOKEN_KEY, token)
}

dataService.getToken = function () {
  // return sessionStorage.getItem(TokenKey);
  return this.getData(TOKEN_KEY)
}

dataService.removeToken = function () {
  // sessionStorage.removeItem(TokenKey);
  this.removeData(TOKEN_KEY)
}

dataService.getArrayData = function (data) {
  if (data instanceof Array) {
    return data
  } else {
    let returnData = []
    returnData.push(data)
    return returnData
  }
}

dataService.getParamsData = function (actionData) {
  let params = {}
  if (actionData) {
    Object.assign(params, actionData)
  }
  return params
}

dataService.getSearchData = function (page, searchKey, sort, searchObject, operateTarget) {
  let returnData = {}
  if (page) {
    returnData['page'] = page.currentPage
    returnData['limit'] = page.pageSize
  } else {
    returnData['start'] = -1
    returnData['limit'] = -1
  }
  if (searchKey) {
    returnData['searchKey'] = searchKey
  }
  if (sort) {
    returnData['sort'] = JSON.stringify(this.getArrayData(sort))
  }
  if (operateTarget) {
    returnData['operateTarget'] = operateTarget
  }
  return Object.assign(returnData, searchObject)
}

export default dataService
