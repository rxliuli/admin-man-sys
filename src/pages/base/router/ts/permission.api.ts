import { OperatePermission, RoutePermission } from './Permission'
import { autoIncrement } from 'rx-util'
import { PermissionKeyEnum } from './PermissionKeyEnum'

class PermissionApi {
  async list(): Promise<(RoutePermission | OperatePermission)[]> {
    const operatePermissionList = ([
      [PermissionKeyEnum.SystemUserDetail, '/system/user/:id'],
      [PermissionKeyEnum.SystemUserUpdate, '/system/user/:id/edit'],
      [PermissionKeyEnum.ViewMarkNormal],
    ] as [PermissionKeyEnum, string][]).map(
      ([key, path]) =>
        new OperatePermission({
          id: autoIncrement(),
          name: path,
          description: '',
          key,
          path,
        }),
    )
    return [
      ...[
        '/system/task/list',
        '/system/user/list',
        '/system/user/:id',
        '/index/person-info',
        '/index/worker',
        '/index/permission',
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
