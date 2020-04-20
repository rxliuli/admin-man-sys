import * as React from 'react'
import { useReducer } from 'react'
import { useModel } from '../useModel'
import { useWatch } from '../useWatch'

type PropsType = {}

function reducer(
  prev: number,
  action: { type: 'decrement' | 'increment' | 'set'; val?: number },
) {
  return action.type === 'increment'
    ? prev + 1
    : action.type === 'decrement'
    ? prev - 1
    : action.val!
}

const UseComputedDemo: React.FC<PropsType> = () => {
  const [num, dispatch] = useReducer(reducer, 0)
  useWatch(num, () => {
    console.log('num: ', num)
  })
  const [data, setData] = useModel(num, val =>
    dispatch({
      type: 'set',
      val,
    }),
  )
  return (
    <div>
      <header>
        <div>
          <button onClick={() => dispatch({ type: 'increment' })}>增加</button>
          <button onClick={() => dispatch({ type: 'decrement' })}>减少</button>
        </div>
        <div>
          <input
            type="number"
            value={data}
            onChange={e => setData(Number.parseInt(e.target.value))}
          />
        </div>
      </header>
      <section>
        <h3>计算出来的值：</h3>
        <p>{data}</p>
      </section>
    </div>
  )
}

export default UseComputedDemo
