import React, {Component} from 'react'
import {Badge, Drawer, Icon} from 'antd'

type StateType = {
  visible: boolean
}

class SystemMessage extends Component {
  state = {
    visible: false,
  }

  render() {
    return (
      <>
        <Badge count={5}>
          <Icon type="bell" style={{fontSize: 24}} onClick={() => this.setState({
            visible: true,
          })}/>
        </Badge>
        <Drawer
          title="系统消息列表"
          placement="right"
          closable={true}
          onClose={() => this.setState({visible: false})}
          visible={this.state.visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    )
  }
}

export default SystemMessage
