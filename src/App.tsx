import React from 'react'
import LayoutHome from './pages/base/layout/LayoutHome'
import './App.css'
import { Route, Switch } from 'react-router'
import Login from './pages/system/auth/Login'
import { useDidMount } from './common/hooks/useDidMount'

const App: React.FC = () => {
  useDidMount(() => {
    if (process.env.NODE_ENV === 'development') {
      const { registerObserver } = require('react-perf-devtool')
      // assign the observer to the global scope, as the GC will delete it otherwise
      Reflect.set(window, 'observer', registerObserver())
    }
  })
  return (
    <div className="app">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={LayoutHome} />
      </Switch>
    </div>
  )
}

export default App
