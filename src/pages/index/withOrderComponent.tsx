import React, { Component } from 'react'

export type withOrderComponentPropsType = { hello: string }

function withOrderComponent(
  WrappedComponent: React.ComponentType<withOrderComponentPropsType>,
) {
  return class extends Component<{}, withOrderComponentPropsType> {
    state = {
      hello: 'hello world',
    }

    render() {
      return (
        <WrappedComponent {...(this.state as withOrderComponentPropsType)} />
      )
    }
  }
}

export default withOrderComponent
