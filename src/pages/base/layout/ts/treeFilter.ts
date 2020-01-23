type ExcludeKeys<T, U> = {
  [P in keyof T]: P extends keyof U ? never : T[P]
}

type NodeParameter<T> = {
  /**
   * 树结点的 id 属性名
   */
  id: number | string
  /**
   * 树结点的父节点 id 属性名
   */
  parentId: number | string | null | undefined
  /**
   * 树结点的子节点数组属性名
   */
  child: T[]
  /**
   * 树结点的全路径属性名
   */
  path: string | null | undefined
}

export type INode<T> = ExcludeKeys<NodeParameter<T>, T> & T

/**
 * 桥接对象不存在的字段
 * @param map 代理的字段映射 Map
 * @returns 转换一个对象为代理对象
 */
export function bridge<
  T extends object,
  M extends object = Record<PropertyKey, keyof T>,
  K extends keyof M = any,
  R = T & Record<K, keyof M[K]>
>(map: M): (obj: T) => R {
  /**
   * 为对象添加代理的函数
   * @param obj 任何对象
   * @returns 代理后的对象
   */
  return function(obj: T): R {
    return new Proxy(obj, {
      get(_, k) {
        if (Reflect.has(map, k)) {
          return Reflect.get(_, Reflect.get(map, k))
        }
        return Reflect.get(_, k)
      },
      set(_, k, v) {
        if (Reflect.has(map, k)) {
          Reflect.set(_, Reflect.get(map, k), v)
          return true
        }
        Reflect.set(_, k, v)
        return true
      },
    }) as any
  }
}

/**
 * 对一个树进行过滤
 * @param root
 * @param predicate
 * @param bridge
 */
export function treeFilter<T>(
  root: T,
  predicate: (node: INode<T>) => boolean,
  bridge: (node: T) => INode<T> = a => a as any,
): T | null {
  function _filter(node: INode<T>): INode<T> | null {
    if (!predicate(node)) {
      return null
    }
    if (!Array.isArray(node.child)) {
      return node
    }
    const res = bridge({ ...node } as any)
    res.child = res.child
      .map(node => _filter(bridge(node as any)))
      .filter(v => v !== null) as any
    return res
  }

  return _filter(bridge(root)) as any
}
