import React, { useState } from 'react'
import { Moment } from 'moment'
import {
  FilterFieldSelect,
  FilterFieldTimeRange,
} from '../../../components/list/ts/FilterField'
import { filterSelectConstant } from '../../index/FilterSelect.constant'
import { filterConstant } from '../../../components/list/ts/filterConstant'
import { TableColumn } from '../../../components/list/ts/TableColumn'
import { Link } from 'react-router-dom'
import { userApi } from '../../index/ts/user.api'
import BasicList, {
  BasicListPropsType,
} from '../../../components/list/BasicList'
import produce from 'immer'

const UserList: React.FC = () => {
  const [config, changeConfig] = useState<
    BasicListPropsType & {
      params: {
        keyword?: string
        age?: number
        birthdayTimeBegin?: Moment
        birthdayTimeEnd?: Moment
      }
    }
  >({
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
      keyword: '搜索',
      age: filterConstant.CheckAllValue,
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
  })
  const { header, filters, columns, api, params } = config
  return (
    <BasicList
      header={header}
      filters={filters}
      columns={columns}
      api={api}
      params={params}
      onChange={params =>
        changeConfig(
          produce(config, draft => {
            draft.params = params
          }),
        )
      }
    />
  )
}

export default UserList
