import React, { lazy } from 'react'
import renderRouteList from './renderRouteList'

function RouteList() {
  return (
    <div>
      {renderRouteList([
        {
          path: '/system/task',
          component: lazy(() => import('../../index/HelloWorld')),
        },
        {
          path: '/user/list',
          component: lazy(() => import('../../index/UserList')),
        },
      ])}
    </div>
  )
}

export default RouteList
