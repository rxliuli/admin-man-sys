import React from 'react'
import DetailItem, { DetailItemPropsType } from './DetailItem'

type PropsType = DetailItemPropsType & {
  /**
   * 文本内容
   */
  text: string | number
}

/**
 * 详情元素-简单文本
 * @param props
 * @constructor
 */
const DetailItemSimpleText: React.FC<PropsType> = function(props) {
  return <DetailItem label={props.label}>{props.text}</DetailItem>
}

export default DetailItemSimpleText
