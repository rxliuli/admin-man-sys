import React, { Component, lazy } from 'react'
import { RouteProps } from 'react-router'
import RenderRouteList from './RenderRouteList'
import { routeApi } from './ts/route.api'
import { PermissionType, RoutePermission } from './ts/Permission'
import NoMatch from './NoMatch'

type PropsType = {}
type StateType = {
  routes: RouteProps[]
}

const allRouteList = [
  {
    path: '/system/task',
    component: lazy(() => import('../../index/HelloWorld')),
  },
  {
    path: '/user/list',
    component: lazy(() => import('../../index/UserList')),
  },
  {
    path: '/hello/world',
    component: lazy(() => import('../../index/HelloWorld')),
  },
]

class RouteList extends Component<PropsType, StateType> {
  state = {
    routes: [] as RouteProps[],
  }

  componentDidMount(): void {
    this.initRoutes()
  }

  initRoutes = async () => {
    const list = await routeApi.list()
    const pathSet = new Set(
      list
        .filter(permission => permission.type === PermissionType.Route)
        .map(permission => (permission as RoutePermission).path),
    )
    this.setState({
      routes: allRouteList.filter(route => pathSet.has(route.path)),
    })
  }

  render() {
    return (
      <div>
        <RenderRouteList
          routes={this.state.routes}
          noMatch={<NoMatch />}
          home="/user/list"
        />
      </div>
    )
  }
}

export default RouteList
