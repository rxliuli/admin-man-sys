import React from 'react'
import { Icon, Layout, Menu } from 'antd'
import { layoutSideMenuStore } from './LayoutSideMenu.store'
import { MenuType, SideMenuFolder, SideMenuItem } from './SideMenuEntity'
import { observer } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router'

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
   */
  recursiveRenderSideMenu = (sideMenu: SideMenuFolder | SideMenuItem) => {
    if (sideMenu.type === MenuType.Item) {
      return (
        <Menu.Item
          key={sideMenu.key}
          onClick={() =>
            this.props.history.push((sideMenu as SideMenuItem).path)
          }
        >
          {sideMenu.icon && <Icon type={sideMenu.icon} />}
          <span>{sideMenu.title}</span>
        </Menu.Item>
      )
    }
    return (
      <Menu.SubMenu
        key={sideMenu.key}
        title={
          <span>
            {sideMenu.icon && <Icon type={sideMenu.icon} />}
            <span>{sideMenu.title}</span>
          </span>
        }
      >
        {sideMenu.type === MenuType.Folder
          ? (sideMenu as SideMenuFolder).children.map(this
              .recursiveRenderSideMenu as any)
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
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={layoutSideMenuStore.selectedKeys}
          onSelect={layoutSideMenuStore.changeSelectedKeys}
        >
          {layoutSideMenuStore.sideMenuList.map(this
            .recursiveRenderSideMenu as any)}
        </Menu>
      </Layout.Sider>
    )
  }
}

export default withRouter(LayoutSideMenu)
