import { HeaderNavItem } from '../../header/ts/HeaderNavItem'

export interface Header {
  /**
   * @field 导航元素列表
   */
  list: (string | HeaderNavItem)[]
  /**
   * @field 搜索框的提示文本
   */
  placeholder: string
  /**
   * @field 标题
   */
  title: string
}
