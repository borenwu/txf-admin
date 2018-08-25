/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
    { path: '/init', component: () => import('@/views/signInPlatform/index'), hidden: true },
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
    { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
    { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            name: 'dashboard',
            meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
        }]
    },
]

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = [
    {
        path: '/inventories',
        component: Layout,
        redirect: '/inventories/index',
        meta: {
            title: 'inventories',
            icon: 'list',
            roles: ['admin']
        },
        children: [{
            path: 'index',
            component: () => import('@/views/inventories/index'),
            name: 'inventories',
            alwaysShow: true, // will always show the root menu
            meta: {
                title: 'inventories',
                icon: 'list',
            }
        }]
    },

    {
        path: '/items',
        component: Layout,
        redirect: '/items/index',
        meta: {
            title: 'items',
            icon: 'clipboard',
            roles: ['admin'] // you can set roles in root nav
        },
        children: [{
            path: 'index',
            component: () => import('@/views/items/platform'),
            name: 'items',
            alwaysShow: true,
            meta: {
                title: 'items',
                icon: 'shoppingCard',
            }
        }]
    },

    {
        path: '/settings',
        component: Layout,
        redirect: '/settings/index',
        name: 'Settings',
        meta: {
            title: 'settings',
            icon: 'component',
            roles: ['admin'] // you can set roles in root nav
        },
        children: [
            {
                path: 'user-settings',
                component: () => import('@/views/settings/UserSetting'),
                name: 'user_settings',
                meta: {
                    title: 'user_settings',
                }
            },
            {
                path: 'community-settings',
                component: () => import('@/views/settings/CommunitySetting'),
                name: 'community_settings',
                meta: { title: 'community_settings' }
            }
        ]
    },

    {
        path: '/statistic',
        component: Layout,
        redirect: '/statistic/index',
        name: 'Statistic',
        meta: {
            title: 'statistic',
            icon: 'form',
            roles: ['admin'] // you can set roles in root nav
        },
        children: [
            {
                path: 'statistic_report',
                component: () => import('@/views/statistic/statistic-report'),
                name: 'statistic_report',
                meta: {
                    title: 'statistic_report',
                }
            },
            {
                path: 'statistic_analyse',
                component: () => import('@/views/statistic/statistic-analyse'),
                name: 'statistic_analyse',
                meta: {
                    title: 'statistic_analyse',
                }
            }
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
]
