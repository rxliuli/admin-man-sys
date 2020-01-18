import React, {Component} from 'react'
import {Avatar, Dropdown, Icon, Layout, Menu} from 'antd'
import styles from './LayoutHeader.module.css'
import SystemMessage from './SystemMessage'

const {Header} = Layout


class LayoutHeader extends Component {
  render() {
    return (
      <Header
        className={styles.layoutHeader}
        style={{backgroundColor: '#fff'}}
      >
        <SystemMessage/>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={0}>
                <Icon type="info-circle"/>
                个人信息
              </Menu.Item>
              <Menu.Item key={1}>
                <Icon type="logout"/>
                退出
              </Menu.Item>
            </Menu>
          }
        >
          <Avatar icon="user" style={{marginLeft: 8}}/>
        </Dropdown>


      </Header>
    )
  }
}

export default LayoutHeader
