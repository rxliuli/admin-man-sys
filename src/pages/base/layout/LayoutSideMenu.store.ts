import { action, observable } from 'mobx'
import { SideMenuFolder, SideMenuItem } from '../router/ts/SideMenu'

class LayoutSideMenuStore {
  //当前展开的菜单
  @observable selectedKeys: string[] = []
  //侧边栏菜单列表
  @observable sideMenuList = [
    new SideMenuFolder(
      '系统配置',
      [
        new SideMenuItem('用户列表', '/system/user/list'),
        new SideMenuItem('系统任务', '/system/task/list'),
        new SideMenuItem('系统权限', '/system/permission/list'),
      ],
      'setting',
    ),
    new SideMenuFolder('其他', [], 'user'),
  ]

  @action
  changeSelectedKeys = (changeParam: any) => {
    console.log('keys: ', changeParam)
    this.selectedKeys = changeParam.selectedKeys
  }
}

export const layoutSideMenuStore = new LayoutSideMenuStore()
