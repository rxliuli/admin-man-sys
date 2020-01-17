import { action, observable } from 'mobx'
import { BaseSideMenu, SideMenuFolder, SideMenuItem } from './SideMenuEntity'

class LayoutSideMenuStore {
  //当前展开的菜单
  @observable selectedKeys: string[] = []
  //侧边栏菜单列表
  @observable sideMenuList: BaseSideMenu[] = [
    new SideMenuFolder(
      '系统配置',
      [
        new SideMenuItem('系统任务', '/system/task'),
        new SideMenuItem('系统权限', '/system/competence'),
      ],
      'setting',
    ),
    new SideMenuFolder(
      '用户相关',
      [
        new SideMenuItem('用户列表', '/user/list'),
        new SideMenuItem('用户权限', '/user/role/list'),
      ],
      'user',
    ),
  ]

  @action
  changeSelectedKeys = (changeParam: any) => {
    console.log('keys: ', changeParam)
    this.selectedKeys = changeParam.selectedKeys
  }
}

export const layoutSideMenuStore = new LayoutSideMenuStore()
