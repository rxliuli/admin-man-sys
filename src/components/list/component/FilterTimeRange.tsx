import React, { Component } from 'react'
import moment, { Moment } from 'moment'
import { DatePicker } from 'antd'
import FilterBase from './FilterBase'

const { RangePicker } = DatePicker

type PropsType = {
  /**
   * 标题
   */
  title: string
  /**
   * 绑定的数组
   */
  value: [Moment | string | undefined, Moment | string | undefined]
  onChange: (values: [Moment, Moment] | [undefined, undefined]) => void
}

class FilterTimeRange extends Component<PropsType> {
  render() {
    const value = (this.props.value || []).map(val => val && moment(val)) as [
      Moment,
      Moment,
    ]
    return (
      <FilterBase title={this.props.title}>
        <RangePicker
          value={value}
          onChange={value => this.props.onChange(value as any)}
        />
      </FilterBase>
    )
  }
}

export default FilterTimeRange
