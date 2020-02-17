import { lazy } from 'react'
import { RouteProps } from 'react-router'

export const allRouteList: RouteProps[] = [
  {
    path: '/system/task/list',
    component: lazy(() => import('../../../index/HelloWorld')),
  },
  {
    path: '/system/user/list',
    component: lazy(() => import('../../../system/user/UserList')),
  },
  {
    path: '/system/user/:id',
    component: lazy(() => import('../../../system/user/UserDetail')),
    //注：需要使用严格匹配模式，避免匹配到下面的 `user/edit/:id`
    exact: true,
  },
  {
    path: '/system/user/:id/edit',
    component: lazy(() => import('../../../system/user/UserEdit')),
  },
  {
    path: '/index/person-info',
    component: lazy(() => import('../../../index/context/HelloUseContext')),
  },
]
