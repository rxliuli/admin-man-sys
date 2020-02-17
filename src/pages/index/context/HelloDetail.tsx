import React, { Component } from 'react'
import { PersonInfoContext, PersonInfoContextType } from './PersonInfoContext'

type PropsType = {}
type StateType = {}

class HelloDetail extends Component<PropsType, StateType> {
  static context = PersonInfoContext
  render() {
    return (
      <PersonInfoContext.Consumer>
        {(context: PersonInfoContextType) => {
          return (
            <div>
              <div>
                <label>用户名：</label>
                <span>{context.name}</span>
              </div>
              <div>
                <label>年龄：</label>
                <span>{context.age}</span>
              </div>
            </div>
          )
        }}
      </PersonInfoContext.Consumer>
    )
  }
}

export default HelloDetail
