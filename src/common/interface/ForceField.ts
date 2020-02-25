/**
 * 强制将字段 P 设置为对象 T 的字段（本质上就是在你确定 P 属于 T 的时候进行强转）
 */
export type ForceField<T, P> = P extends keyof T ? P : never
