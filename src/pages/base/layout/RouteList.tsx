import React from 'react'
import { Route, Switch } from 'react-router'
import HelloWorld from '../../index/HelloWorld'
import UserList from '../../index/UserList'

function RouteList() {
  return (
    <div>
      <Switch>
        <Route path={'/system/task'} component={HelloWorld} />
        <Route path={'/user/list'} component={UserList} />
      </Switch>
    </div>
  )
}

export default RouteList
