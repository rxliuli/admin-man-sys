import React from 'react'
import { Spin } from 'antd'
import styles from './ComponentLoading.module.css'
import { BackgroundColorProperty } from 'csstype'

type PropsType = {
  /**
   * 是否显示 loading?
   */
  isLoading: boolean
  /**
   * 显示 Loading 旁边的提示文字
   */
  tip?: string
  /**
   * 显示 Loading 的背景颜色
   */
  bc?: BackgroundColorProperty
}

/**
 * 控制 Ajax 请求未完成前某个区域不展示默认数据
 * @param props
 * @constructor
 */
const ComponentLoading: React.FC<PropsType> = function(props) {
  const { isLoading, tip = '正在加载中。。。', bc = '#ffffff' } = props
  return (
    <div style={{ position: 'relative' }}>
      {isLoading && (
        <div
          className={styles.componentLoadingDialog}
          style={{
            backgroundColor: bc,
          }}
        >
          <Spin tip={tip} />
        </div>
      )}

      {/*注：默认会渲染 children 组件*/}
      {props.children}
    </div>
  )
}

export default ComponentLoading
