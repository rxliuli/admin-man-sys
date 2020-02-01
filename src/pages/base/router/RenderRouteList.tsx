import React, { ReactNode, Suspense } from 'react'
import RouteLoading from './RouteLoading'
import { Redirect, Route, RouteProps, Switch } from 'react-router'

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
          {/*注：Redirect 必须在 route 列表渲染之后*/}
          {props.home && <Redirect path="/" to={props.home} />}
          {/*404 匹配要放到最后*/}
          {props.noMatch}
        </Switch>
      </Suspense>
    </div>
  )
}

export default RenderRouteList
