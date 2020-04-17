import { MapWorkerType } from './callback.worker.type'
import { expose } from 'comlink'

export const map: MapWorkerType = (arr, cb) => Promise.all(arr.map(cb))

expose(map)
