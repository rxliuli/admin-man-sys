import { autoIncrement } from 'rx-util'

export enum MenuType {
  Folder,
  Item,
}

/**
 * 侧边菜单元素
 */
export abstract class BaseSideMenu {
  //唯一标识
  public key = autoIncrement()
  protected constructor(
    public type: MenuType,
    public title: string,
    public icon?: string,
  ) {}
}

export class SideMenuFolder extends BaseSideMenu {
  constructor(
    public title: string,
    public children: BaseSideMenu[],
    public icon: string,
  ) {
    super(MenuType.Folder, title, icon)
  }
}
export class SideMenuItem extends BaseSideMenu {
  constructor(public title: string, public path: string, public icon?: string) {
    super(MenuType.Item, title, icon)
  }
}
