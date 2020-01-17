import React, { Component } from 'react'
import { Layout } from 'antd'

const { Header } = Layout

class LayoutHeader extends Component {
  render() {
    return (
      <Header style={{ background: '#fff', borderBottom: 'solid 1px #e8e8e8' }}>
        顶部标题栏
      </Header>
    )
  }
}

export default LayoutHeader
