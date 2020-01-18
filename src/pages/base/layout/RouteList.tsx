import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router'
import RouteLoading from './RouteLoading'

function RouteList() {
  return (
    <div>
      <Suspense fallback={<RouteLoading />}>
        <Switch>
          <Route
            path={'/system/task'}
            component={lazy(() => import('../../index/HelloWorld'))}
          />
          <Route
            path={'/user/list'}
            component={lazy(() => import('../../index/UserList'))}
          />
        </Switch>
      </Suspense>
    </div>
  )
}

export default RouteList
