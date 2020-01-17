import React, { Component } from 'react'
import ListHeader from '../../components/list/ListHeader'
import { observer } from 'mobx-react'
import produce from 'immer'
import ListTable from '../../components/list/ListTable'
import classNames from 'classnames'
import globalStyles from '../../assets/css/global.module.css'
import { Card } from 'antd'
import FilterSelect from '../../components/list/component/FilterSelect'
import { filterSelectConstant } from './FilterSelect.constant'
import FilterSplitLine from '../../components/list/component/FilterSplitLine'
import FilterTimeRange from '../../components/list/component/FilterTimeRange'
import { Moment } from 'moment'

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

@observer
class UserList extends Component<{}, StateType> {
  state = {
    header: {
      title: '用户列表',
      placeholder: '用户名/住址',
      list: ['用户', '列表'],
    },
    params: {
      keyword: undefined,
      age: undefined,
      birthdayTimeBegin: undefined,
      birthdayTimeEnd: undefined,
    },
  }
  changeKeyword = (val?: string) => {
    this.setState(
      produce(this.state, (draft: StateType) => {
        draft.params.keyword = val
      }),
    )
  }
  changeAge = (val: number) => {
    this.setState(
      produce(this.state, (draft: StateType) => {
        draft.params.age = val
      }),
    )
  }
  changeBirthdayTime = ([begin, end]: [
    Moment | undefined,
    Moment | undefined,
  ]) => {
    this.setState(
      produce(this.state, (draft: StateType) => {
        draft.params.birthdayTimeBegin = begin
        draft.params.birthdayTimeEnd = end
      }),
    )
  }
  render() {
    const {
      birthdayTimeBegin,
      birthdayTimeEnd,
      keyword,
      age,
    } = this.state.params
    return (
      <div>
        <ListHeader
          value={keyword}
          list={this.state.header.list}
          title={this.state.header.title}
          placeholder={this.state.header.placeholder}
          onSearch={this.changeKeyword}
        />
        <div className={classNames(globalStyles.global, globalStyles.margin)}>
          <Card>
            <FilterSelect
              title={'年龄'}
              values={filterSelectConstant.age}
              value={age!}
              onChange={this.changeAge}
            />
            <FilterSplitLine />
            <FilterTimeRange
              title={'生日'}
              value={[birthdayTimeBegin, birthdayTimeEnd]}
              onChange={this.changeBirthdayTime}
            />
          </Card>
        </div>
        <ListTable />
      </div>
    )
  }
}

export default UserList
