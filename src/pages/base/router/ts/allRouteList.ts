import { lazy } from 'react'

export const allRouteList = [
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
  },
]
