import React, { Component } from 'react'
import { Layout } from 'antd'
import './LayoutHome.css'
import LayoutSideMenu from './LayoutSideMenu'
import { observer } from 'mobx-react'
import RouteList from './RouteList'
import LayoutHeader from './LayoutHeader'
import LayoutFooter from './LayoutFooter'

@observer
class LayoutHome extends Component {
  render() {
    return (
      <Layout className="layout-home">
        <LayoutSideMenu />
        <Layout>
          <LayoutHeader />
          <RouteList />
          <LayoutFooter />
        </Layout>
      </Layout>
    )
  }
}

export default LayoutHome
