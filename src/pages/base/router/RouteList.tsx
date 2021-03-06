import React, { Component } from 'react'
import { RouteProps } from 'react-router'
import RenderRouteList from './RenderRouteList'
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
    // noinspection JSIgnoredPromiseFromCall
    this.initRoutes()
  }

  initRoutes = async () => {
    await layoutSideMenuStore.refreshPermissionList()
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
      routes: allRouteList.filter(route => pathSet.has(route.path as string)),
    })
  }

  render() {
    return (
      <div>
        <RenderRouteList
          routes={this.state.routes}
          noMatch={<NoMatch />}
          home="/system/user/list"
        />
      </div>
    )
  }
}

export default RouteList
