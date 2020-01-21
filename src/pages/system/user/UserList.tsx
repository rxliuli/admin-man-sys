import React, { Component } from 'react'
import { filterSelectConstant } from '../../index/FilterSelect.constant'
import { Moment } from 'moment'
import {
  FilterFieldSelect,
  FilterFieldTimeRange,
} from '../../../components/list/ts/FilterField'
import { TableColumn } from '../../../components/list/ts/TableColumn'
import { userApi } from '../../index/ts/user.api'
import BasicList from '../../../components/list/BasicList'
import { Link } from 'react-router-dom'

type StateType = {
  header: {
    title: string
    placeholder: string
    list: string[]
  }
  params: {
    keyword?: string
    age?: number
    birthdayTimeBegin?: Moment
    birthdayTimeEnd?: Moment
  }
}

class UserList extends Component<{}, StateType> {
  state = {
    header: {
      title: '用户列表',
      placeholder: '用户名/住址',
      list: ['用户', '列表'],
    },
    filters: [
      new FilterFieldSelect({
        title: '年龄',
        field: 'age',
        values: filterSelectConstant.age,
      }),
      new FilterFieldTimeRange({
        title: '生日',
        fields: ['birthdayTimeBegin', 'birthdayTimeEnd'],
      }),
    ],
    params: {
      keyword: undefined,
      age: undefined,
      birthdayTimeBegin: undefined,
      birthdayTimeEnd: undefined,
    },
    columns: [
      new TableColumn({ field: 'id', title: 'ID' }),
      new TableColumn({ field: 'name', title: '姓名' }),
      new TableColumn({ field: 'birthday', title: '生日' }),
      new TableColumn({
        field: 'operate',
        title: '操作',
        slot: (param: any) => (
          <Link to={`/system/user/${param.record.id}`}>详情</Link>
        ),
      }),
    ],
    api: userApi,
  }
  render() {
    const { header, filters, columns, api } = this.state
    return (
      <BasicList
        header={header}
        filters={filters}
        columns={columns}
        api={api}
      />
    )
  }
}

export default UserList
