import React from 'react'
import { proxy, wrap } from 'comlink'
import { useDidMount } from '../../../common/hooks/useDidMount'
import { HelloWorkerType } from './hello.worker.type'
import { AddWorkerType } from './func.worker.type'
import { MapWorkerType } from './callback.worker.type'

type PropsType = {}

const HelloUseWebWorker: React.FC<PropsType> = function(props) {
  useDidMount(async () => {
    async function func1() {
      const obj = wrap<HelloWorkerType>(
        new Worker('./hello.worker.ts', {
          type: 'module',
        }),
      )
      console.log(await obj.name)
      await obj.hello()
    }

    async function func2() {
      const add = wrap<AddWorkerType>(
        new Worker('./func.worker.ts', {
          type: 'module',
        }),
      )
      console.log(await add(1, 2))
    }

    async function func3() {
      const map = wrap<MapWorkerType>(
        new Worker('./callback.worker.ts', {
          type: 'module',
        }),
      )
      const list = await map(
        [1, 2, 3],
        proxy(i => i * 2),
      )
      console.log('list: ', list)
    }

    await func3()
  })

  return <div>hello</div>
}

export default HelloUseWebWorker
