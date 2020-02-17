import React, { Component } from 'react'
import HelloDetail from './HelloDetail'
import { PersonInfoContext } from './PersonInfoContext'
import HelloDetailForHooks from './HelloDetailForHooks'

type PropsType = {}
type StateType = {}

class HelloUseContext extends Component<PropsType, StateType> {
  render() {
    return (
      <PersonInfoContext.Provider
        value={{
          name: 'rxliuli',
          age: 17,
        }}
      >
        <div>
          HelloDetail:
          <HelloDetail />
        </div>
        <div>
          HelloDetailForHooks:
          <HelloDetailForHooks />
        </div>
      </PersonInfoContext.Provider>
    )
  }
}

export default HelloUseContext
