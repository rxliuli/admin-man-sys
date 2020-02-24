import { action, computed, observable } from 'mobx'
import {
  OperatePermission,
  PermissionType,
  RoutePermission,
} from '../router/ts/Permission'
import { StringValidator } from 'rx-util'
import { allSideMenuList } from './allSideMenuList'
import { routeApi } from '../router/ts/permission.api'
import { bridge, INode, treeFilter } from './ts/treeFilter'
import { MenuType, SideMenuItem } from '../router/ts/SideMenu'

class LayoutSideMenuStore {
  //region 菜单

  //当前展开的菜单
  @observable selectedKeys: string[] = []

  @action
  changeSelectedKeys = (changeParam: any) => {
    this.selectedKeys = changeParam.selectedKeys
  }

  //endregion

  //region 权限

  @observable permissionList: (RoutePermission | OperatePermission)[] = []

  /**
   * 刷新权限列表
   */
  @action
  async refreshPermissionList() {
    this.permissionList = await routeApi.list()
  }

  @computed
  get routePermissionSet(): Set<string> {
    return new Set(
      this.permissionList
        .filter(
          permission =>
            permission.type === PermissionType.Route ||
            !StringValidator.isEmpty(permission.path),
        )
        .map(permission => permission.path!),
    )
  }
  @computed
  get elPermissionSet(): Pick<Set<string>, 'has'> {
    return new Set(
      this.permissionList
        .filter(permission => permission.type === PermissionType.Operate)
        .map(permission => (permission as OperatePermission).key),
    )
  }

  /**
   * 过滤后的侧边栏菜单列表
   */
  @computed
  get sideMenuList(): typeof allSideMenuList {
    return allSideMenuList.map(sideMenu =>
      treeFilter(
        sideMenu,
        node =>
          node.type === MenuType.Folder ||
          this.routePermissionSet.has(
            ((node as any) as INode<SideMenuItem>).path,
          ),
        bridge({
          child: 'children',
        }),
      ),
    ) as any
  }

  //endregion
}

export const layoutSideMenuStore = new LayoutSideMenuStore()
