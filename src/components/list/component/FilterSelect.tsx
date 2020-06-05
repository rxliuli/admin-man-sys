import React, { useMemo } from 'react'
import FilterBase from './FilterBase'
import { Tag } from 'antd'
import { filterConstant } from '../ts/filterConstant'
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
  const { title, value, values, defaultValue, onChange } = props as Required<
    PropsType
  >

  const innerValue = useMemo(
    () => (isNullOrUndefined(value) ? defaultValue : value),
    [value, defaultValue],
  )

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

FilterSelect.defaultProps = {
  defaultValue: filterConstant.CheckAllValue,
}

export default FilterSelect
