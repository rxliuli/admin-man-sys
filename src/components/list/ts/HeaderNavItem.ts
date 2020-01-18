/**
 * 公共头部的导航元素类型
 *
 * @name name 导航的名字
 * @field link 如果是 route 的话必须有值
 * @field isRoute 默认会赋值
 */
export class HeaderNavItem {
  constructor(
    public name: string,
    public link?: string,
    public isRoute = true,
  ) {}
}
