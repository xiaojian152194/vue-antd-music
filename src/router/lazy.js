import Vue from 'vue'
import Router from 'vue-router'
// import PageView from '@/layouts/PageView'
import RouteView from '@/layouts/RouteView'
import MenuView from '@/layouts/MenuView'
import Login from '@/pages/login/Login'
import Register from '@/pages/login/Register'
import NotPermit from '@/pages/exception/403'

Vue.use(Router)
export const staticRouters = [
  {
    path: '/music',
    component: MenuView,
    invisible: true,
    children: [
      {
        path: '/music/musicPlay',
        name: '音乐播放',
        component: () => import('@/pages/music/MusicPlay')
      }
    ]
  },
  {
    path: '/personal',
    component: MenuView,
    invisible: true,
    children: [
      {
        path: '/personal/myMusicPlay',
        name: '我的音乐播放',
        component: () => import('@/pages/personal/PMusicPlay')
      },
      {
        path: '/personal/auth',
        name: '无权限',
        component: () => import('@/pages/manager/Auth'),
        invisible: true
      }
    ]
  },
  {
    path: '/login',
    name: '登录页',
    component: Login,
    invisible: true
  },
  {
    path: '/register',
    name: '注册页',
    component: Register,
    invisible: true
  },
  {
    path: '/',
    name: '首页',
    component: MenuView,
    redirect: '/music/musicList',
    icon: 'none',
    invisible: true,
    children: [
      {
        path: '/music',
        name: '音乐曲库（网易云音乐）',
        component: RouteView,
        icon: 'caret-right',
        children: [
          {
            path: '/music/musicList',
            name: '音乐列表',
            component: () => import('@/pages/music/MusicList'),
            icon: 'cloud'
          },
          {
            path: '/music/musicSearch',
            name: '音乐搜索',
            component: () => import('@/pages/music/MusicSearch'),
            icon: 'search'
          }
        ]
      },
      {
        path: '/personal/pmusic',
        name: '个人音乐',
        component: () => import('@/pages/personal/PMusic'),
        icon: 'heart'
        // meta: { requireAuth: true }
      },
      {
        path: '/personal/user',
        name: '用户管理',
        component: () => import('@/pages/manager/UserManager'),
        icon: 'user',
        meta: { role: ['admin'], requireAuth: true },
        invisible: true
      },
      {
        path: '/personal/music',
        name: '音乐管理',
        component: () => import('@/pages/manager/MusicManager'),
        icon: 'database',
        meta: { role: ['admin'], requireAuth: true },
        invisible: true
      },
      // {
      //   path: '/personal',
      //   name: '个人中心',
      //   component: RouteView,
      //   icon: 'home',
      //   children: [
      //     {
      //       path: '/personal/pmusic',
      //       name: '个人音乐',
      //       component: () => import('@/pages/personal/PMusic'),
      //       icon: 'heart'
      //       // meta: { requireAuth: true }
      //     },
      //     {
      //       path: '/personal/user',
      //       name: '用户管理',
      //       component: () => import('@/pages/manager/UserManager'),
      //       icon: 'user',
      //       meta: { role: ['admin'], requireAuth: true },
      //       invisible: true
      //     },
      //     {
      //       path: '/personal/music',
      //       name: '音乐管理',
      //       component: () => import('@/pages/manager/MusicManager'),
      //       icon: 'database',
      //       meta: { role: ['admin'], requireAuth: true },
      //       invisible: true
      //     }
      //   ]
      // },
      {
        path: '/exception/403',
        name: '尚未登陆',
        component: NotPermit,
        invisible: true
      }
    ]
  }
]
export default new Router({
  routes: staticRouters
})
