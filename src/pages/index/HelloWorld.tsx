import React from 'react'
import withOrderComponent, {
  withOrderComponentPropsType,
} from './withOrderComponent'
import NotWithOrderComponent from './NotWithOrderComponent'

function HelloWorld(props: withOrderComponentPropsType) {
  return <div className="hello-world">{props.hello}</div>
}

function HelloWorld3() {
  return (
    <NotWithOrderComponent>
      {props => <div className="hello-world">{props.hello}</div>}
    </NotWithOrderComponent>
  )
}

export default withOrderComponent(HelloWorld)
