/**
 * 将部分字段设为可选字段
 */
export type PartialField<T, K extends keyof T> = Omit<T, K> &
  {
    [P in K]?: T[P]
  }
