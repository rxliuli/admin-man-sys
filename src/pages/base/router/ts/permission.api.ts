import { OperatePermission, RoutePermission } from './Permission'
import { autoIncrement } from 'rx-util'
import { allRouteList } from './allRouteList'
import { PermissionKeyEnum } from './PermissionKeyEnum'

class PermissionApi {
  async list(): Promise<(RoutePermission | OperatePermission)[]> {
    const operatePermissionList = [
      new OperatePermission({
        id: autoIncrement(),
        name: '查看用户详情',
        description: '',
        key: PermissionKeyEnum.SystemUserDetail,
        path: '/system/user/:id',
      }),
      // new OperatePermission({
      //   id: autoIncrement(),
      //   name: '修改用户详情',
      //   description: '',
      //   key: PermissionKeyEnum.SystemUserUpdate,
      //   path: '/system/user/:id/edit',
      // }),
    ] as OperatePermission[]
    return [
      ...[
        '/system/task/list',
        '/system/user/list',
        '/system/user/:id',
        '/index/person-info',
        '/index/worker',
      ].map(
        path =>
          new RoutePermission({
            id: autoIncrement(),
            name: path,
            path,
          }),
      ),
      ...operatePermissionList,
    ]
  }
}

export const routeApi = new PermissionApi()
