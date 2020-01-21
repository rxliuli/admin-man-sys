import React, { PropsWithChildren, ReactNode, ReactPropTypes } from 'react'
import { HeaderNavItem } from './ts/HeaderNavItem'
import { Breadcrumb, Card, Col, Row } from 'antd'
import { TypeValidator } from 'rx-util'
import { Link } from 'react-router-dom'

type PropsType = PropsWithChildren<{
  list: (string | HeaderNavItem)[]
  title: string
}>

const CommonHeader: React.FC<PropsType> = function({
  list,
  title,
  children,
}: PropsType) {
  return (
    <Card>
      <Row style={{ background: '#fff' }}>
        <Col span={12}>
          <h2>{title}</h2>
          <Breadcrumb>
            {list.map((item, i) => (
              <Breadcrumb.Item key={i}>
                {TypeValidator.isString(item) ? (
                  item
                ) : (
                  <Link to={item.link!}>{item.name}</Link>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Col>
        <Col span={6} offset={6}>
          {children}
        </Col>
      </Row>
    </Card>
  )
}

export default CommonHeader
