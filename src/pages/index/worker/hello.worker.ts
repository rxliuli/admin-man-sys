import { expose } from 'comlink'
import { HelloWorkerType } from './hello.worker.type'

const obj: HelloWorkerType = {
  name: 'liuli',
  hello(name: string) {
    console.log(`hello, ${name || this.name}`)
  },
}

expose(obj)

