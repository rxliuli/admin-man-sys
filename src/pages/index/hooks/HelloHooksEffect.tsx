import React, { useMemo, useState } from 'react'

type PropsType = {}

const HelloHooksEffect: React.FC<PropsType> = function(props) {
  const [count, changeCount] = useState(0)
  const count2 = useMemo(() => count, [count])
  const count3 = useMemo(() => count, [count])
  console.log('render: ', count, count2, count3)
  return (
    <div>
      <input
        type="number"
        value={count}
        onChange={e => changeCount(Number.parseInt(e.target.value))}
      />
    </div>
  )
}

export default HelloHooksEffect
