import { OperatePermission, RoutePermission } from './Permission'
import { autoIncrement } from 'rx-util'
import { allRouteList } from './allRouteList'

class PermissionApi {
  async list(): Promise<(RoutePermission | OperatePermission)[]> {
    return allRouteList.map(
      route =>
        new RoutePermission({
          id: autoIncrement(),
          name: route.path as string,
          path: route.path as string,
        }),
    )
  }
}

export const routeApi = new PermissionApi()
