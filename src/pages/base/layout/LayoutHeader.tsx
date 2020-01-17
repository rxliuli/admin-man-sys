import React, { Component } from 'react'
import { Avatar, Badge, Dropdown, Icon, Layout, Menu } from 'antd'
import styles from './LayoutHeader.module.css'

const { Header } = Layout

class LayoutHeader extends Component {
  render() {
    return (
      <Header
        className={styles.layoutHeader}
        style={{ backgroundColor: '#fff' }}
      >
        <Badge count={5}>
          <Icon type="bell" style={{ fontSize: 24 }} />
        </Badge>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={0}>
                <Icon type="info-circle" />
                个人信息
              </Menu.Item>
              <Menu.Item key={1}>
                <Icon type="logout" />
                退出
              </Menu.Item>
            </Menu>
          }
        >
          <Avatar icon="user" style={{ marginLeft: 8 }} />
        </Dropdown>
      </Header>
    )
  }
}

export default LayoutHeader
