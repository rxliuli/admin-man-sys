import React from 'react'
import classNames from 'classnames'
import globalStyles from '../../../assets/css/global.module.css'
import commonStyles from '../../../assets/css/common.module.css'
import styles from './FilterBase.module.css'

type PropsType = {
  /**
   * 过滤器标题
   */
  title: string
}

const FilterBase: React.FC<PropsType> = function(props) {
  return (
    <div
      className={classNames(
        globalStyles.margin,
        globalStyles.global,
        commonStyles.flex,
        commonStyles.middle,
        styles.baseFilter,
      )}
    >
      <div className={styles.label}>
        <strong>{props.title}：</strong>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  )
}

export default FilterBase
