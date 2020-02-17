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
        name: '用户详情',
        key: 'system:user:detail:disable',
        path: '/system/user/:id',
      }),
      new OperatePermission({
        id: autoIncrement(),
        name: '用户修改',
        key: 'system:user:edit:disable',
        path: '/system/user/:id/edit',
      }),
      new RoutePermission({
        id: autoIncrement(),
        name: '测试 react context',
        path: '/index/person-info',
      }),
    ]
  }
}

export const routeApi = new PermissionApi()
