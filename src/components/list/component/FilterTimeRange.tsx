import React, { useMemo } from 'react'
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

/**
 * 日期选择器
 * @param props
 * @constructor
 */
const FilterTimeRange: React.FC<PropsType> = props => {
  const innerValue = useMemo(() => {
    const res = (props.value || []).map(val => val && moment(val)) as [
      Moment,
      Moment,
    ]
    props.onChange && props.onChange(res)
    return res
  }, [props.value])
  return (
    <FilterBase title={props.title}>
      <RangePicker
        value={innerValue}
        onChange={value => props.onChange(value as any)}
      />
    </FilterBase>
  )
}

export default FilterTimeRange
