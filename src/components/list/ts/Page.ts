/**
 * 分页数据
 @property offset 偏移量
 @property total 总页数
 @property size 每页数量
 @property list 当前页数据列表
 */
export interface Page<T> {
  offset: number
  total: number
  size: number
  list: T[]
}
