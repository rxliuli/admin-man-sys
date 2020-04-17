import { expose } from 'comlink'
import { AddWorkerType } from './func.worker.type'

const add: AddWorkerType = (i, k) => i + k

expose(add)
