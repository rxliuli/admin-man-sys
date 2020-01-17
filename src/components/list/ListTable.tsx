import React, { Component } from 'react'
import { Card, Table } from 'antd'
import globalStyles from '../../assets/css/global.module.css'
import classNames from 'classnames'

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
]

class ListTable extends Component {
  render() {
    return (
      <div className={classNames(globalStyles.global, globalStyles.margin)}>
        <Card>
          <Table dataSource={dataSource} columns={columns} />
        </Card>
      </div>
    )
  }
}

export default ListTable
