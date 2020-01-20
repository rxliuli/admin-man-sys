import React, { Suspense } from 'react'
import RouteLoading from './RouteLoading'
import { Route, RouteProps, Switch } from 'react-router'

type PropsType = RouteProps[]

const renderRouteList: React.FC<PropsType> = function(props: PropsType) {
  return (
    <div>
      <Suspense fallback={<RouteLoading />}>
        <Switch>
          {props.map(route => (
            <Route {...route} />
          ))}
        </Switch>
      </Suspense>
    </div>
  )
}

export default renderRouteList
