import registerPromiseWorker from 'promise-worker/register'

//注册监听消息
registerPromiseWorker(function(message) {
  return Math.random().toString()
})
