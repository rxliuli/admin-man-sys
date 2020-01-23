import { SideMenuFolder, SideMenuItem } from '../router/ts/SideMenu'

export const allSideMenuList = [
  new SideMenuFolder(
    '系统配置',
    [
      new SideMenuItem('用户列表', '/system/user/list'),
      new SideMenuItem('系统任务', '/system/task/list'),
      new SideMenuItem('系统权限', '/system/permission/list'),
    ],
    'setting',
  ),
  new SideMenuFolder(
    '其他',
    [new SideMenuFolder('关于该项目', [], 'about')],
    'user',
  ),
]
