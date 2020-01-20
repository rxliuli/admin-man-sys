import React, { ReactNode, Suspense } from 'react'
import RouteLoading from './RouteLoading'
import { Route, RouteProps, Switch } from 'react-router'

type PropsType = {
  routes: RouteProps[]
  home?: string
  noMatch: ReactNode
}

const RenderRouteList: React.FC<PropsType> = function(props: PropsType) {
  return (
    <div>
      <Suspense fallback={<RouteLoading />}>
        <Switch>
          {props.routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
          {props.noMatch}
        </Switch>
      </Suspense>
    </div>
  )
}

export default RenderRouteList
