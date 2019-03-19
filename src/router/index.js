import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

/* Layout */
import Layout from '../views/layout/Layout'

// Router Modules(When your routing table is too long, you can split it into small modules)
import chartsRouter from './modules/charts'

export const constantRouterMap = [
  //Login
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  //404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  //Layout
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },

  //Users
  {
    path: '/users',
    component: Layout,
    redirect: '/users/member',
    name: 'Users',
    meta: { title: 'Users', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'Users List',
        component: () => import('@/views/users/list/index'),
        meta: { title: 'Users List', icon: 'list' }
      },
      {
        path: 'details',
        name: 'Users Details',
        component: () => import('@/views/users/details/index'),
        meta: {
          title: 'Users Details',
          icon: 'details'
        }
      }
    ]
  },

  //Charts
  chartsRouter,

  //Article
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'Article',
    meta: { title: 'Article', icon: 'article', roles: ['editor'] },
    children: [
      {
        path: 'create',
        name: 'Create Article',
        component: () => import('@/views/article/create'),
        meta: { title: 'Create Article', icon: 'create' }
      },
      {
        path: 'list',
        name: 'Article List',
        component: () => import('@/views/article/list'),
        meta: { title: 'Article List', icon: 'list' }
      },
      {
        path: 'edit',
        name: 'Article Edit',
        component: () => import('@/views/article/edit'),
        meta: { title: 'Article Edit', icon: 'edit' },
        hidden: true
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  //Register
  {
    path: '/register',
    meta: { title: 'Register', icon: 'register', roles: ['admin'] },
    component: Layout,
    name: 'Register',
    component: () => import('@/views/register/index')
  }
]
