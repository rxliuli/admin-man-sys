import React, { Component } from 'react'
import { Layout } from 'antd'
import LayoutSideMenu from './LayoutSideMenu'
import { observer } from 'mobx-react'
import RouteList from '../router/RouteList'
import LayoutHeader from './LayoutHeader'
import LayoutFooter from './LayoutFooter'
import styles from './LayoutHome.module.css'

@observer
class LayoutHome extends Component {
  render() {
    return (
      <Layout className={styles.layoutHome}>
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
