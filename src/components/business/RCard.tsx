import React from 'react'
import classNames from 'classnames'
import globalStyles from '../../assets/css/global.module.css'
import { Card } from 'antd'

type PropsType = {}

const RCard: React.FC<PropsType> = function(props) {
  return (
    <Card className={classNames(globalStyles.global, globalStyles.margin)}>
      {props.children}
    </Card>
  )
}

export default RCard
