/**
 * 压平多个对象的类型，便于用户查看
 * 例如 {@code {name: string} & {age: number}} 会被压平为 {@code {name: string, age: number}}
 */
export type Prettify<T> = T extends infer U ? { [K in keyof U]: U[K] } : never
