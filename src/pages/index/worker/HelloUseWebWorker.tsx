import React from 'react'
import PromiseWorker from 'promise-worker'

//TODO 需要改成自动识别 .worker 后缀的文件为 web-worker
/* eslint import/no-webpack-loader-syntax:0 */
// @ts-ignore
import HelloWorker from 'worker-loader?name=dist/[name].js!./hello.worker'
const worker: Worker = new HelloWorker()
const promiseWorker = new PromiseWorker(worker)

type PropsType = {}

const HelloUseWebWorker: React.FC<PropsType> = function(props) {
  promiseWorker
    .postMessage(1)
    .then(res => {
      console.log('worker message: ', res)
    })
    .catch(err => {
      console.log('worker error: ', err)
    })

  return <div>hello</div>
}

export default HelloUseWebWorker
