import React from 'react'
import { filterConstant } from '../ts/filterConstant'
import FilterBase from './FilterBase'
import { Tag } from 'antd'
import { isNullOrUndefined } from 'rx-util'

const { CheckableTag } = Tag

type PropsType = {
  /**
   * 显示的标题
   */
  title: string
  /**
   * 值列表
   */
  values: Map<number, string>
  /**
   * 当前选中的值，默认为 0（全部）
   */
  value: number
  /**
   * 默认值，可选，默认为全选
   */
  defaultValue: number
  onChange: (val: number) => void
}

class FilterSelect extends React.Component<PropsType> {
  public static defaultProps = {
    defaultValue: filterConstant.CheckAllValue,
  }

  componentDidMount(): void {
    if (isNullOrUndefined(this.props.value)) {
      this.props.onChange(this.props.defaultValue)
    }
  }

  render() {
    const { title, value, values, defaultValue, onChange } = this.props
    return (
      <FilterBase title={title}>
        <div>
          <CheckableTag
            checked={value === defaultValue}
            onChange={() => onChange(defaultValue)}
          >
            全部
          </CheckableTag>
          {Array.from(values.entries()).map(([val, label]) => (
            <CheckableTag
              key={val}
              checked={value === val}
              onChange={() => onChange(val)}
            >
              {label}
            </CheckableTag>
          ))}
        </div>
      </FilterBase>
    )
  }
}

export default FilterSelect
