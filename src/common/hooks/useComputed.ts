import { useEffect, useReducer } from 'react'

/**
 * 模仿 vue 中的 computed
 * @param computed
 * @param deps
 * @deprecated 好吧，事实上 react 官方已经有这个了 {@link useMemo}，具体参考：https://zh-hant.reactjs.org/docs/hooks-reference.html#usememo
 */
export function useComputed<T>(
  computed: () => T,
  deps: any[] = [],
): [T, (val: T) => void] {
  const [val, change] = useReducer(
    (state: T, val: T) => {
      return val
    },
    computed(),
    v => v,
  )
  useEffect(() => {
    change(computed())
    // eslint-disable-next-line
  }, [...deps])
  return [val, change]
}
