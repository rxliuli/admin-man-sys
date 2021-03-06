/**
 * 权限类型
 */
import { PermissionKeyEnum } from './PermissionKeyEnum'

export enum PermissionType {
  Route,
  Operate,
}

/**
 * 基本权限
 */
export abstract class BasePermission<T extends PermissionType> {
  protected constructor(
    public type: PermissionType,
    public id: number,
    public name: string,
    public description?: string,
  ) {}
}
/**
 * 路由级权限
 */
export class RoutePermission extends BasePermission<PermissionType.Route> {
  path: string
  constructor(params: Omit<RoutePermission, 'type'>) {
    super(PermissionType.Route, params.id, params.name, params.description)
    this.path = params.path
  }
}
/**
 * 操作级权限
 */
export class OperatePermission extends BasePermission<PermissionType.Operate> {
  key: PermissionKeyEnum
  /**
   * 如果按钮关联到路由有值
   */
  path?: string
  constructor(params: Omit<OperatePermission, 'type'>) {
    super(PermissionType.Operate, params.id, params.name, params.description)
    this.key = params.key
    this.path = params.path
  }
}
