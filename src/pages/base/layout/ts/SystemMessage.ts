/**
 * 系统通知消息
 */
export interface SystemMessage {
  /**
   * 消息
   */
  id: number
  /**
   * 标题
   */
  title: string
  /**
   * 消息内容
   */
  content: string
  /**
   * 点击跳转的链接
   */
  link: string
  /**
   * 是否已读
   */
  hasRead: boolean
}
