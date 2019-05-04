// import Vue from 'Vue';
import axios from 'axios'
// import dataService from './dataService'

let baseService = axios.create({
  // baseURL: '/api',
  timeout: 8000
})

// baseService.interceptors.request.use(
//   config => {
//     config.headers['music-api-token'] = dataService.getToken()
//     return config
//   },
//   error => {
//     Promise.reject(error)
//   }
// )

// baseService.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response) {
//             let response = error.response;
//             if (response.status === 401) {
//                 dataService.removeToken();
//                 sessionStorage.removeItem('current_account');
//                 sessionStorage.removeItem('current_privilege');
//                 Vue.$Notice.warning({
//                     title: '会话超时',
//                     desc: '登录信息已经过期，请重新登录。'
//                 });
//                 Vue.$router.push({name: 'login'});
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default baseService
