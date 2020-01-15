import React, { Component } from 'react'
import { Layout } from 'antd'

const { Header } = Layout

class LayoutHeader extends Component {
  render() {
    return <Header style={{ background: '#fff' }}>顶部标题栏</Header>
  }
}

export default LayoutHeader
