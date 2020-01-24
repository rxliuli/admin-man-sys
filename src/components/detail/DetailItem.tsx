import React from 'react'
import { Col, Row } from 'antd'

export type DetailItemPropsType = {
  /**
   * 标签
   */
  label: string
}

/**
 * 详情元素
 * @param props
 * @constructor
 */
const DetailItem: React.FC<DetailItemPropsType> = function(props) {
  return (
    <Row style={{ margin: '12px 0' }}>
      <Col span={12} style={{ textAlign: 'right', fontWeight: 'bold' }}>
        {props.label}：
      </Col>
      <Col span={12}>{props.children}</Col>
    </Row>
  )
}

export default DetailItem
