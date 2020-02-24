import React from 'react'
import FilterBase from './FilterBase'
import { Tag } from 'antd'
import { filterConstant } from '../ts/filterConstant'
import { isNullOrUndefined } from 'rx-util'
import { useComputed } from '../../hooks/useComputed'

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
   * 默认值，可选，默认全选的值为 {@see filterConstant.CheckAllValue}
   */
  defaultValue?: number
  onChange: (val: number) => void
}

/**
 * 单选选择器
 * @param props
 * @constructor
 */
const FilterSelect: React.FC<PropsType> = props => {
  const {
    title,
    value,
    values,
    defaultValue = filterConstant.CheckAllValue,
    onChange,
  } = props

  const [innerValue] = useComputed(() => {
    if (!isNullOrUndefined(props.value)) {
      return props.value
    }
    onChange(defaultValue)
    return defaultValue
  }, [props.value, props.defaultValue])

  return (
    <FilterBase title={title}>
      <div>
        <CheckableTag
          checked={innerValue === defaultValue}
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

export default FilterSelect
