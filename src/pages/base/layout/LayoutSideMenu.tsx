import React from 'react'
import { Icon, Layout, Menu } from 'antd'
import { layoutSideMenuStore } from './LayoutSideMenu.store'
import { MenuType, SideMenuFolder, SideMenuItem } from './ts/SideMenu'
import { observer } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router'
import styles from './LayoutSideMenu.module.css'

type StateType = { collapsed: boolean }
type PropsType = {} & RouteComponentProps

@observer
class LayoutSideMenu extends React.Component<PropsType, StateType> {
  state = {
    //是否将菜单缩起来
    collapsed: false,
  }
  /**
   * 递归渲染菜单组件
   * @param sideMenu
   * @param key
   */
  recursiveRenderSideMenu = (
    sideMenu: SideMenuFolder | SideMenuItem,
    key: number,
  ) => {
    if (sideMenu.type === MenuType.Item) {
      return (
        <Menu.Item
          key={key}
          onClick={() => this.props.history.push(sideMenu.path)}
        >
          <span>{sideMenu.title}</span>
        </Menu.Item>
      )
    }
    return (
      <Menu.SubMenu
        key={key}
        title={
          <span>
            {sideMenu.icon && <Icon type={sideMenu.icon} />}
            <span>{sideMenu.title}</span>
          </span>
        }
      >
        {sideMenu.type === MenuType.Folder
          ? sideMenu.children.map(this.recursiveRenderSideMenu as any)
          : null}
      </Menu.SubMenu>
    )
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render() {
    return (
      <Layout.Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.toggle}
      >
        <div className={styles.logo} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={layoutSideMenuStore.selectedKeys}
          onSelect={layoutSideMenuStore.changeSelectedKeys}
        >
          {layoutSideMenuStore.sideMenuList.map(
            this.recursiveRenderSideMenu as any,
          )}
        </Menu>
      </Layout.Sider>
    )
  }
}

export default withRouter(LayoutSideMenu)
