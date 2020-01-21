import { action, computed, observable } from 'mobx'
import {
  OperatePermission,
  PermissionType,
  RoutePermission,
} from '../router/ts/Permission'
import {
  listToTree,
  logger,
  NodeBridgeUtil,
  StringValidator,
  treeToList,
} from 'rx-util'
import { allSideMenuList } from './allSideMenuList'
import { BaseSideMenu, SideMenuFolder } from '../router/ts/SideMenu'
import { routeApi } from '../router/ts/permission.api'

class LayoutSideMenuStore {
  //当前展开的菜单
  @observable selectedKeys: string[] = []
  @observable permissionList: (RoutePermission | OperatePermission)[] = []

  @action
  changeSelectedKeys = (changeParam: any) => {
    this.selectedKeys = changeParam.selectedKeys
  }

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
  get elPermissionSet(): Set<string> {
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
    const list = treeToList(allSideMenuList, {
      bridge: NodeBridgeUtil.bridge({
        child: 'children',
      }),
    }).filter(sideMenu => this.routePermissionSet.has(sideMenu.path!))
    logger.info('list: ', list)
    return list.length === 0 ? [] : (listToTree(list) as any)
  }
}

export const layoutSideMenuStore = new LayoutSideMenuStore()
