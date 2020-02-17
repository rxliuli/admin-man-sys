import React from 'react'
import styles from './MessageLoading.module.css'
import { ReactComponent as IconLoading } from '../../assets/icon/icon-loading-balls.svg'

type PropsType = {
  visible: boolean
  msg: string
}

/**
 * 简单的全局 loading 动画组件
 * @param props
 * @constructor
 */
const MessageLoading: React.FC<PropsType> = function(props) {
  return (
    <div
      data-testid="loadingOverlay"
      className={styles.loadingOverlay}
      style={{
        display: props.visible ? 'initial' : 'none',
      }}
    >
      <div className={styles.loadingBox}>
        <IconLoading />
        <span data-testid="loadingMsg" className={styles.loadingMsg}>
          {props.msg}
        </span>
      </div>
    </div>
  )
}

export default MessageLoading
