import React, { useEffect, useState } from 'react'
import MessageLoading from './MessageLoading'

export type Handlers = {
  changeVisible: (visible: boolean) => void
  changeMsg: (msg: string) => void
}
type PropsType = {
  init: (instance: Handlers) => void
}
/**
 * {@see MessageLoading} 组件的函数调用形式的封装组件，请勿直接使用该组件
 * 注：请直接使用 {@link loading} 函数
 * @param props
 * @private
 */
const __MessageLoadingForFunc: React.FC<PropsType> = function(props) {
  const [visible, changeVisible] = useState(false)
  const [msg, changeMsg] = useState('加载中...')
  useEffect(() => {
    props.init({
      changeVisible,
      changeMsg,
    })
  }, [props])

  return <MessageLoading visible={visible} msg={msg} />
}

export default __MessageLoadingForFunc
