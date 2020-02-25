import { PermissionKeyEnum } from './PermissionKeyEnum'
import { layoutSideMenuStore } from '../../layout/LayoutSideMenu.store'
import { ForceGet } from '../../../../common/interface/ForceGet'
import { Prettify } from '../../../../common/interface/Prettify'

/**
 * 判断是否包含这些权限
 * @param permissions
 */
export function hasPermission(...permissions: PermissionKeyEnum[]) {
  return permissions.some(key => layoutSideMenuStore.elPermissionSet.has(key))
}

/**
 * 使用权限处理一个数组
 * @param arr 传入的一个普通数组，如果某个元素需要判断权限，则将之声明为 [T, PermissionKeyEnum] 的形式，否则直接使用 T 即可
 * @returns 返回处理过权限的数组，[T, PermissionKeyEnum] 格式的元组元素会经过权限判断后删除或保留 T，最终返回 T[]
 * @example
 * 例如 传入 {@code ['a', 'b', ['c', PermissionKeyEnum.c]]}
 * 如果当前用户有 {@code PermissionKeyEnum.c} 这个权限，则返回 {@code ['a', 'b', 'c']}，否则返回 {@code ['a', 'b']}
 */
export function dealPermissionForArray<T>(
  arr: (T | [T, PermissionKeyEnum])[],
): T[] {
  Reflect.set(window, 'layoutSideMenuStore', layoutSideMenuStore)
  console.log(layoutSideMenuStore.elPermissionSet)
  return arr.reduce((res, value) => {
    if (!Array.isArray(value)) {
      res.push(value)
    } else if (hasPermission(value[1])) {
      res.push(value[0])
    }
    return res
  }, [] as T[])
}

/**
 * 使用权限处理一个对象
 * @param obj 传入的一个普通对象
 * @param handleFields 声明 {@param obj} 中所有需要处理的字段以及需要的权限
 * @returns 返回处理过权限的对象，在 {@param handleFields} 中声明的字段均有可能为 {@code undefined}（删除）
 * @example
 * 例如 传入 {@code {a: 1, b: 2, c: 3},{c: PermissionKeyEnum.c}}
 * 如果当前用户有 {@code PermissionKeyEnum.c} 这个权限，则返回 {@code {a: 1, b: 2, c: 3}}，否则返回 {@code {a: 1, b: 2}}
 */
export function dealPermissionForObject<
  T extends object,
  K extends { [k in keyof T]?: PermissionKeyEnum }
>(
  obj: T,
  handleFields: K,
): Prettify<
  Omit<T, keyof K> &
    {
      [P in keyof K]?: ForceGet<T, P>
    }
> {
  return (Object.keys(obj) as (keyof T)[])
    .filter(k => {
      const permission = handleFields[k]
      return !permission || hasPermission(permission!)
    })
    .reduce((res, k: keyof T) => {
      res[k] = obj[k]
      return res
    }, {} as T) as any
}
