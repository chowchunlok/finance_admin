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
    meta: { title: 'users', icon: 'user' },
    children: [
      {
        path: 'member',
        name: 'Table',
        component: () => import('@/views/user/index'),
        meta: { title: 'member', icon: 'member' }
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/feedback/index'),
        meta: {
          title: 'feedback',
          icon: 'feedback'
        }
      }
    ]
  },

  //Charts
  chartsRouter,

  //News
  {
    path: '/news',
    component: Layout,
    redirect: '/news/edit',
    name: 'News',
    meta: { title: 'news', icon: 'news' },
    children: [
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/form/index'),
        meta: { title: 'edit', icon: 'form' }
      },
      {
        path: 'newsList',
        name: 'News',
        component: () => import('@/views/news/index'),
        meta: { title: 'newsList', icon: 'newsList' }
      }
    ]
  },

  //Nested TODO: complete nested
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  //Register
  {
    path: '/register',
    meta: { title: 'register', icon: 'register' },
    component: Layout,
    name: 'Register',
    children: [
      {
        path: '',
        component: () => import('@/views/register/index')
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
