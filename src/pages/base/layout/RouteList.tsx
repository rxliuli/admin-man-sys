import React from 'react'
import { Route, Switch } from 'react-router'
import HelloWorld from '../../index/HelloWorld'

function RouteList() {
  return (
    <div>
      <Switch>
        <Route path={'/system/task'} component={HelloWorld} />
      </Switch>
    </div>
  )
}

export default RouteList
