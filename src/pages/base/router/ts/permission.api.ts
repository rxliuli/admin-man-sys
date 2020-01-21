import { OperatePermission, RoutePermission } from './Permission'
import { autoIncrement } from 'rx-util'

class PermissionApi {
  async list(): Promise<(RoutePermission | OperatePermission)[]> {
    return [
      new RoutePermission({
        id: autoIncrement(),
        name: '系统任务',
        path: '/system/task/list',
      }),
      new RoutePermission({
        id: autoIncrement(),
        name: '用户列表',
        path: '/system/user/list',
      }),
      new OperatePermission({
        id: autoIncrement(),
        name: '详情',
        key: 'system:user:detail:disable',
        path: '/system/user/:id',
      }),
    ]
  }
}

export const routeApi = new PermissionApi()
