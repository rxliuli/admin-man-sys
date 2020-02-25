import { ForceField } from './ForceField'

/**
 * 强制从对象 T 中获取字段 P 的值（本质上就是在你确定 P 属于 T 的时候强行 Get）
 */
export type ForceGet<T, P> = T[ForceField<T, P>]
