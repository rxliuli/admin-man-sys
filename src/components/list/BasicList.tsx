import React from 'react'
import { TableColumn } from './ts/TableColumn'
import { BaseListApi } from './ts/BaseListApi'
import { Params } from './ts/Params'
import { TableOptions } from './ts/TableOptions'
import ListHeader from './ListHeader'
import { Header } from './ts/Header'
import ListFilter from './ListFilter'
import { FilterFieldBase } from './ts/FilterField'
import ListTable, { TableOperate } from './ListTable'
import { useModel } from '../../common/hooks/useModel'

export type BasicListPropsType = {
  header: Header
  filters: FilterFieldBase[]
  columns: TableColumn[]
  api: BaseListApi
  params?: Params
  onChange?: (params: Params) => void
  tableOptions?: TableOptions
  tableOperate?: TableOperate
}

const BasicList: React.FC<BasicListPropsType> = function(props) {
  const { filters, columns, header, api, tableOptions, tableOperate } = props

  const [innerParams, changeParams] = useModel(
    props.params ? props.params : {},
    props.onChange,
  )

  return (
    <div>
      <ListHeader
        {...header}
        value={innerParams.keyword}
        onSearch={keyword => changeParams({ ...innerParams, keyword })}
      />
      {filters && filters.length > 0 ? (
        <ListFilter
          filters={filters}
          value={innerParams}
          onChange={val =>
            changeParams({
              ...innerParams,
              ...val,
            })
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

export default BasicList
