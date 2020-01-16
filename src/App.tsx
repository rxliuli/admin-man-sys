import React from 'react'
import LayoutHome from './pages/base/layout/LayoutHome'
import './App.css'
import { Route, Switch } from 'react-router'
import Login from './pages/system/auth/Login'

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={LayoutHome} />
      </Switch>
    </div>
  )
}

export default App
