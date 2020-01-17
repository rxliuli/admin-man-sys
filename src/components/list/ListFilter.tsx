import React, { Component } from 'react'
import globalStyles from '../../assets/css/global.module.css'
import classNames from 'classnames'
import { Card } from 'antd'
import FilterSelect from './component/FilterSelect'

class ListFilter extends Component {
  render() {
    return (
      <div className={classNames(globalStyles.global, globalStyles.margin)}>
        <Card></Card>
      </div>
    )
  }
}

export default ListFilter
