import React, { useEffect, useRef, useState } from 'react'

const HelloHooks: React.FC = function() {
  //region 计数器

  const [count, setCount] = useState(1)
  const [list, setList] = useState<string[]>([])
  const countAdd = () => setCount(count + 1)
  useEffect(() => {
    console.log('count changed: ', count)
    setList(
      Array(count)
        .fill(0)
        .map((_, i) => `第 ${i + 1} 个元素`),
    )
  }, [count])

  //endregion

  //region 自动聚焦输入框

  const inputRef = useRef<HTMLInputElement>(null as any)
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  //endregion

  return (
    <div>
      <div>
        <input
          ref={inputRef}
          value={count}
          type="number"
          onChange={e => setCount(parseInt(e.target.value))}
        />
        <button onClick={countAdd}>增加</button>
      </div>
      <ul>
        {list.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  )
}

export default HelloHooks
