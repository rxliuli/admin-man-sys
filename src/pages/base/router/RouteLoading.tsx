import React from 'react'
import { Spin } from 'antd'
import styles from './RouteLoading.module.css'

function RouteLoading() {
  return (
    <div className={styles.routeLoading}>
      <Spin tip="正在加载中。。。" />
    </div>
  )
}

export default RouteLoading
