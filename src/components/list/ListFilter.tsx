import React, { Component, ReactNode } from 'react'
import globalStyles from '../../assets/css/global.module.css'
import classNames from 'classnames'
import { Card } from 'antd'
import FilterSelect from './component/FilterSelect'
import FilterSplitLine from './component/FilterSplitLine'
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

type PropsType = {
  value: any
  filters: FilterFieldBase[]
  onChange: (value: any) => void
}
type StateType = {
  innerValue: any
}

class ListFilter extends Component<PropsType, StateType> {
  state = {
    innerValue: {} as any,
  }
  shouldComponentUpdate(
    nextProps: Readonly<PropsType>,
    nextState: Readonly<StateType>,
    nextContext: any,
  ): boolean {
    if (
      JSON.stringify(this.state.innerValue) !==
      JSON.stringify(nextState.innerValue)
    ) {
      this.props.onChange(nextState.innerValue)
      return true
    } else if (
      JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)
    ) {
      this.setState({
        innerValue: nextProps.value,
      })
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <div className={classNames(globalStyles.global, globalStyles.margin)}>
        <Card>
          {this.props.filters.map((filter, i) => {
            let filterItem: ReactNode
            if (filter.type === FilterFieldType.select) {
              const { title, values, field } = filter as FilterFieldSelect
              filterItem = (
                <FilterSelect
                  title={title}
                  values={values}
                  value={this.state.innerValue[field]}
                  onChange={val => {
                    this.setState(
                      produce(this.state, draft => {
                        draft.innerValue[field] = val
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
                  value={[
                    this.state.innerValue[begin],
                    this.state.innerValue[end],
                  ]}
                  onChange={([timeBegin, timeEnd]) => {
                    this.setState(
                      produce(this.state, draft => {
                        draft.innerValue[begin] = timeBegin
                        draft.innerValue[end] = timeEnd
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
                {i !== this.props.filters.length - 1 ? (
                  <FilterSplitLine />
                ) : null}
              </div>
            )
          })}
        </Card>
      </div>
    )
  }
}

export default ListFilter
