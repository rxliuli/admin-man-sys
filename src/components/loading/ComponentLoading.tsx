import React from 'react'
import { Spin } from 'antd'
import styles from './ComponentLoading.module.css'

type PropsType = {
  /**
   * 是否显示 loading?
   */
  isLoading: boolean
  tip?: string
}

/**
 * 控制 Ajax 请求未完成前某个区域不展示默认数据
 * @param props
 * @constructor
 */
const ComponentLoading: React.FC<PropsType> = function(props) {
  const { isLoading, tip = '正在加载中。。。' } = props
  return (
    <div style={{ position: 'relative' }}>
      <div
        className={styles.componentLoadingDialog}
        style={{
          display: isLoading ? 'flex' : 'none',
        }}
      >
        <Spin tip={tip} />
      </div>
      {/*注：默认会渲染 children 组件*/}
      {props.children}
    </div>
  )
}

export default ComponentLoading
