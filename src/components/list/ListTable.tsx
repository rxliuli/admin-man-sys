import React, { Component } from 'react'
import { Card, Table } from 'antd'
import globalStyles from '../../assets/css/global.module.css'
import classNames from 'classnames'
import { TableColumn } from './ts/TableColumn'
import { BaseListApi } from './ts/BaseListApi'
import { Params } from './ts/Params'
import { TableOptions } from './ts/TableOptions'
import { Page } from './ts/Page'
import { debounce, logger, StringValidator, switchMap } from 'rx-util'
import produce from 'immer'
import { PaginationConfig } from 'antd/es/pagination'
import { TableRowSelection } from 'antd/es/table'

export type TableOperate = (param: {
  searchPage: () => Promise<Page<any>>
  selectedRowKeys: string[]
  page: Page<any>
  params: Params
}) => Element

type PropsType = {
  columns: TableColumn[]
  api: BaseListApi
  params: Params
  options?: TableOptions
  tableOperate?: TableOperate
}

type StateType = {
  page: Page<any>
  selectedRowKeys: string[]
}

class ListTable extends Component<PropsType, StateType> {
  state = {
    page: {
      offset: 0,
      total: 0,
      size: 20,
      list: [] as any[],
    },
    selectedRowKeys: [] as any[],
  }

  componentDidUpdate(
    prevProps: Readonly<PropsType>,
    prevState: Readonly<StateType>,
    snapshot?: any,
  ): void {
    if (
      JSON.stringify(this.state.page.offset) !==
        JSON.stringify(prevState.page.offset) ||
      JSON.stringify(this.state.page.size) !==
        JSON.stringify(prevState.page.size) ||
      JSON.stringify(prevProps.params) !== JSON.stringify(this.props.params)
    ) {
      this.searchPage()
    }
  }

  componentDidMount(): void {
    this.searchPage()
  }

  searchPage: () => Promise<Page<any>> = switchMap(
    debounce(100, async () => {
      const { offset, size } = this.state.page
      const data = {
        ...this.props.params,
        offset,
        size,
      }
      logger.log('执行了搜索: ', data)
      const page = await this.props.api.pageList(data)
      this.setState(
        produce(this.state, draft => {
          draft.page.total = page.total
          draft.page.list = page.list
        }),
      )
    }) as any,
  )
  changeCurrent = ({ current, pageSize }: PaginationConfig) => {
    this.setState(
      produce(this.state, draft => {
        draft.page.offset = (current! - 1) * pageSize!
        draft.page.size = pageSize!
      }),
    )
  }
  onSelectChange = (selectedRowKeys: string[]) => {
    this.setState(
      produce(this.state, draft => {
        draft.selectedRowKeys = selectedRowKeys
      }),
    )
  }

  //region 计算属性

  innerOptions = () => {
    return Object.assign(
      {
        rowKey: 'id',
        isSelect: false,
      },
      this.props.options,
    )
  }
  innerColumns = () => {
    return this.props.columns.map(
      ({ field: dataIndex, title, formatter: customRender, slot }) => ({
        dataIndex,
        title,
        render: slot
          ? (text: string, record: any, i: number) => slot({ text, record, i })
          : customRender
          ? customRender
          : (text: string) => (StringValidator.isEmpty(text) ? '-' : text),
      }),
    )
  }
  rowSelection(): TableRowSelection<any> | undefined {
    return this.innerOptions().isSelect
      ? {
          selectedRowKeys: this.state.selectedRowKeys,
          onChange: this.onSelectChange as any,
        }
      : undefined
  }
  pageConfig() {
    const { offset, size, total } = this.state.page
    return {
      showQuickJumper: true,
      current: Math.floor(offset / size) + 1,
      pageSize: size,
      total: total,
      showSizeChanger: true,
    }
  }

  //endregion

  render() {
    const { page, selectedRowKeys } = this.state
    const innerOptions = this.innerOptions()
    return (
      <div className={classNames(globalStyles.global, globalStyles.margin)}>
        <Card>
          <div className="flex space-between middle">
            <div>
              <span> 共{page.total}条 </span>
              {innerOptions.isSelect && selectedRowKeys.length > 0 ? (
                <span>已选{selectedRowKeys.length}条</span>
              ) : null}
            </div>
            {this.props.tableOperate &&
              this.props.tableOperate({
                searchPage: this.searchPage,
                selectedRowKeys: this.state.selectedRowKeys,
                page: this.state.page,
                params: this.props.params,
              })}
          </div>
          <Table
            rowKey={innerOptions.rowKey}
            rowSelection={this.rowSelection()}
            columns={this.innerColumns()}
            dataSource={page.list}
            pagination={this.pageConfig()}
            onChange={this.changeCurrent}
            scroll={{ x: 1200 }}
          />
        </Card>
      </div>
    )
  }
}

export default ListTable
