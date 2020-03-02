import React from 'react'
import ReactDOM from 'react-dom'
import __MessageLoadingForFunc, { Handlers } from './__MessageLoadingForFunc'

let handlers: Handlers | null = null
let id = 0
let loadingIdSet = new Set<number>()

const el = React.createElement(__MessageLoadingForFunc, {
  init(_handlers) {
    handlers = _handlers
  },
})
const $div = document.createElement('div')
document.body.appendChild($div)
ReactDOM.render(el, $div)

/**
 * 显示一个 loading 动画
 * @private
 */
function _loading(msg = '加载中...') {
  const identity = id++
  loadingIdSet.add(identity)
  console.log('loading: ', Array.from(loadingIdSet))
  handlers!.changeVisible(true)
  handlers!.changeMsg(msg)

  return function hide() {
    loadingIdSet.delete(identity)
    console.log('hide: ', Array.from(loadingIdSet))
    if (loadingIdSet.size === 0) {
      handlers!.changeVisible(false)
    }
  }
}

/**
 * 允许修改全局配置项的 loading 函数
 */
export const loading = Object.assign(_loading, {
  /**
   * 配置一些全局项
   * @param msg 附加的消息
   */
  config({ msg }: { msg: string }) {
    if (handlers && handlers.changeMsg) {
      handlers.changeMsg(msg)
    }
  },
  /**
   * 销毁所有的 loading 框
   */
  destory() {
    loadingIdSet.clear()
    handlers!.changeVisible(false)
  },
})
