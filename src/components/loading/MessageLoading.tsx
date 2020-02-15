import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './MessageLoading.module.css'
import { ReactComponent as IconLoading } from '../../assets/icon/icon-loading-balls.svg'
import { wait } from 'rx-util'

type Handlers = {
  changeVisible: (visible: boolean) => void
  changeMsg: (msg: string) => void
}
type PropsType = {
  init: (instance: Handlers) => void
}

const MessageLoading: React.FC<PropsType> = function(props) {
  const [visible, changeVisible] = useState(false)
  const [msg, changeMsg] = useState('加载中...')
  useEffect(() => {
    props.init({
      changeVisible,
      changeMsg,
    })
  }, [props])
  return (
    <div
      data-testid="loadingOverlay"
      className={styles.loadingOverlay}
      style={{
        display: visible ? 'initial' : 'none',
      }}
    >
      <div className={styles.loadingBox}>
        <IconLoading />
        <span data-testid="loadingMsg" className={styles.loadingMsg}>
          {msg}
        </span>
      </div>
    </div>
  )
}

export default MessageLoading

let handlers: Handlers | null = null
let id = 0
let loadingIdSet = new Set<number>()

/**
 * 显示一个 loading 动画
 * @private
 */
function _loading() {
  const identity = id++
  function show() {
    loadingIdSet.add(identity)
    handlers?.changeVisible(true)
  }
  if (handlers === null) {
    const el = React.createElement(MessageLoading, {
      init(_handlers) {
        handlers = _handlers
      },
    })
    const $div = document.createElement('div')
    document.body.appendChild($div)
    ReactDOM.render(el, $div, async () => {
      await wait(() => handlers !== null)
      show()
    })
  } else {
    show()
  }
  return function hide() {
    loadingIdSet.delete(identity)
    if (loadingIdSet.size === 0) {
      handlers?.changeVisible(false)
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
    handlers?.changeMsg(msg)
  },
})
