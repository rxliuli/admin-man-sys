import React, { Component } from 'react'
import { TableColumn } from './ts/TableColumn'
import { BaseListApi } from './ts/BaseListApi'
import { Params } from './ts/Params'
import { TableOptions } from './ts/TableOptions'
import ListHeader from './ListHeader'
import { Header } from './ts/Header'
import ListFilter from './ListFilter'
import { FilterFieldBase } from './ts/FilterField'
import ListTable, { TableOperate } from './ListTable'
import produce from 'immer'

type PropsType = {
  header: Header
  filters: FilterFieldBase[]
  columns: TableColumn[]
  api: BaseListApi
  options?: TableOptions
  params?: Params
  onChange?: (params: Params) => void
  tableOptions?: TableOptions
  tableOperate?: TableOperate
}

type StateType = {
  innerParams: Params
}

class BasicList extends Component<PropsType, StateType> {
  state = {
    innerParams: {} as Params,
  }
  shouldComponentUpdate(
    nextProps: Readonly<PropsType>,
    nextState: Readonly<StateType>,
    nextContext: any,
  ): boolean {
    if (
      JSON.stringify(this.state.innerParams) !==
      JSON.stringify(nextState.innerParams)
    ) {
      this.props.onChange && this.props.onChange(nextState.innerParams)
      return true
    } else if (
      JSON.stringify(this.props.params) !== JSON.stringify(nextProps.params)
    ) {
      this.setState({
        innerParams: nextProps.params!,
      })
      return true
    } else {
      return false
    }
  }
  changeKeyword = (val?: string) => {
    this.setState(
      produce(this.state, (draft: StateType) => {
        draft.innerParams.keyword = val
      }),
    )
  }

  render() {
    const {
      filters,
      columns,
      header,
      api,
      tableOptions,
      tableOperate,
    } = this.props
    const { innerParams } = this.state
    const { keyword } = innerParams
    return (
      <div>
        <ListHeader
          title={header.title}
          list={header.list}
          value={keyword}
          onSearch={this.changeKeyword}
        />
        {filters && filters.length > 0 ? (
          <ListFilter
            filters={filters}
            value={innerParams}
            onChange={val =>
              this.setState(
                produce(this.state, draft => {
                  draft.innerParams = {
                    ...draft.innerParams,
                    ...val,
                  }
                }),
              )
            }
          />
        ) : null}
        <ListTable
          columns={columns}
          api={api}
          params={innerParams}
          options={tableOptions}
          tableOperate={tableOperate}
        />
      </div>
    )
  }
}

export default BasicList
