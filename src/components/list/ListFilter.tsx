import React, { ReactNode } from 'react'
import globalStyles from '../../assets/css/global.module.css'
import classNames from 'classnames'
import { Card, Divider } from 'antd'
import FilterSelect from './component/FilterSelect'
import FilterTimeRange from './component/FilterTimeRange'
import {
  FilterFieldBase,
  FilterFieldSelect,
  FilterFieldSlot,
  FilterFieldTimeRange,
  FilterFieldType,
} from './ts/FilterField'
import FilterBase from './component/FilterBase'
import produce from 'immer'
import { useModel } from '../../common/hooks/useModel'

type PropsType = {
  value: any
  filters: FilterFieldBase[]
  onChange: (value: any) => void
}

const ListFilter: React.FC<PropsType> = props => {
  const [innerValue, changeInnerValue] = useModel(props.value, props.onChange)
  return (
    <div className={classNames(globalStyles.global, globalStyles.margin)}>
      <Card>
        {props.filters.map((filter, i) => {
          let filterItem: ReactNode
          if (filter.type === FilterFieldType.select) {
            const { title, values, field } = filter as FilterFieldSelect
            filterItem = (
              <FilterSelect
                title={title}
                values={values}
                value={innerValue[field]}
                onChange={val => {
                  changeInnerValue(
                    produce(innerValue, (draft: any) => {
                      draft[field] = val
                    }),
                  )
                }}
              />
            )
          } else if (filter.type === FilterFieldType.timeRange) {
            const {
              title,
              fields: [begin, end],
            } = filter as FilterFieldTimeRange
            filterItem = (
              <FilterTimeRange
                title={title}
                value={[innerValue[begin], innerValue[end]]}
                onChange={([timeBegin, timeEnd]) => {
                  changeInnerValue(
                    produce(innerValue, (draft: any) => {
                      draft[begin] = timeBegin
                      draft[end] = timeEnd
                    }),
                  )
                }}
              />
            )
          } else if (filter.type === FilterFieldType.slot) {
            filterItem = (
              <FilterBase title={filter.title}>
                {(filter as FilterFieldSlot).slot}
              </FilterBase>
            )
          }
          return (
            <div key={i}>
              {filterItem}
              {i !== props.filters.length - 1 ? <Divider dashed /> : null}
            </div>
          )
        })}
      </Card>
    </div>
  )
}

export default ListFilter
