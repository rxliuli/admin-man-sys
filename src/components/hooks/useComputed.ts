import { useEffect, useState } from 'react'

/**
 * 模仿 vue 中的 computed
 * @param computed
 * @param deps
 */
export function useComputed<T>(
  computed: () => T,
  deps: any[] = [],
): [T, (val: T) => void] {
  const [val, change] = useState<T>(computed)
  useEffect(() => {
    change(computed())
    // eslint-disable-next-line
  }, [...deps])
  return [val, change]
}
