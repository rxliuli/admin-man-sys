import React, { Component } from 'react'
import { RouteProps } from 'react-router'
import RenderRouteList from './RenderRouteList'
import { routeApi } from './ts/permission.api'
import { PermissionType } from './ts/Permission'
import NoMatch from './NoMatch'
import { StringValidator } from 'rx-util'
import { observer } from 'mobx-react'
import { allRouteList } from './ts/allRouteList'
import { layoutSideMenuStore } from '../layout/LayoutSideMenu.store'

type PropsType = {}
type StateType = {
  routes: RouteProps[]
}

@observer
class RouteList extends Component<PropsType, StateType> {
  state = {
    routes: [] as RouteProps[],
  }

  componentDidMount(): void {
    this.initRoutes()
  }

  initRoutes = async () => {
    const pathSet = new Set(
      layoutSideMenuStore.permissionList
        .filter(
          permission =>
            permission.type === PermissionType.Route ||
            !StringValidator.isEmpty(permission.path),
        )
        .map(permission => permission.path!),
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
