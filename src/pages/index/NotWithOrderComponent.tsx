import React, { Component, ReactNode } from 'react'

export type NotWithOrderComponentPropsType = { hello: string }

class NotWithOrderComponent extends Component<
  {
    children: (props: NotWithOrderComponentPropsType) => ReactNode
  },
  NotWithOrderComponentPropsType
> {
  state = {
    hello: 'hello world',
  }

  render() {
    return <>{this.props.children(this.state)}</>
  }
}

export default NotWithOrderComponent
