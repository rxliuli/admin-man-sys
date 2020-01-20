import { OperatePermission, RoutePermission } from './Permission'
import { autoIncrement } from 'rx-util'

class RouteApi {
  async list(): Promise<(RoutePermission | OperatePermission)[]> {
    return [
      new RoutePermission({
        id: autoIncrement(),
        name: '系统任务',
        path: '/system/task',
      }),
      new RoutePermission({
        id: autoIncrement(),
        name: '用户列表',
        path: '/user/list',
      }),
      new OperatePermission({
        id: autoIncrement(),
        name: '详情',
        key: 'user:list:btn:detail',
      }),
    ]
  }
}

export const routeApi = new RouteApi()
