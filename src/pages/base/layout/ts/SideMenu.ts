/**
 * 侧边栏菜单类型枚举
 */
export enum MenuType {
  Folder,
  Item,
}

/**
 * 侧边菜单元素基类
 */
export abstract class BaseSideMenu<T extends MenuType> {
  protected constructor(public type: T, public title: string) {}
}

/**
 * 侧边栏目录
 */
export class SideMenuFolder<
  T extends MenuType = MenuType.Item
> extends BaseSideMenu<MenuType.Folder> {
  constructor(
    title: string,
    public children: BaseSideMenu<T>[],
    public icon: string,
  ) {
    super(MenuType.Folder, title)
  }
}

/**
 * 侧边栏路由元素
 */
export class SideMenuItem extends BaseSideMenu<MenuType.Item> {
  constructor(title: string, public path: string) {
    super(MenuType.Item, title)
  }
}
