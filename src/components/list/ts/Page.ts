/**
 * 分页数据
 @property offset 偏移量
 @property total 总页数
 @property size 每页数量
 @property list 当前页数据列表
 */
export class Page<T> {
  offset: number
  total: number
  size: number
  list: T[]
  constructor({
    offset = 0,
    total = 0,
    size = 0,
    list = [],
  }: Partial<Page<T>> = {}) {
    this.offset = offset
    this.total = total
    this.size = size
    this.list = list
  }
}
