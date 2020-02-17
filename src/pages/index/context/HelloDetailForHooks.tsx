import React, { useContext } from 'react'
import { PersonInfoContext } from './PersonInfoContext'

type PropsType = {}

const HelloDetailForHooks: React.FC<PropsType> = function(props) {
  const context = useContext(PersonInfoContext)
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
}

export default HelloDetailForHooks
