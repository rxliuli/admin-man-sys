import React from 'react'
import CommonHeader from '../../../components/header/CommonHeader'
import { HeaderNavItem } from '../../../components/header/ts/HeaderNavItem'
import { Card } from 'antd'
import { UserEntity } from '../../index/ts/user.entity'
import { userApi } from '../../index/ts/user.api'
import { RouteComponentProps, withRouter } from 'react-router'
import globalStyles from '../../../assets/css/global.module.css'
import classNames from 'classnames'
import DetailItemSimpleText from '../../../components/detail/DetailItemSimpleText'

type PropsType = RouteComponentProps<{ id: string }>
type StateType = {
  detail: UserEntity
}

class UserDetail extends React.Component<PropsType, StateType> {
  state = {
    detail: {} as UserEntity,
  }
  async componentDidMount() {
    await this.initData()
  }

  async componentDidUpdate(
    nextProps: Readonly<PropsType>,
    nextState: Readonly<StateType>,
    nextContext: any,
  ) {
    //路由变化了
    if (this.props.match.params.id !== nextProps.match.params.id) {
      await this.initData()
    }
  }

  async initData() {
    this.setState({
      detail: await userApi.get(parseInt(this.props.match.params.id)),
    })
  }

  render() {
    const { id, name, birthday } = this.state.detail
    return (
      <div>
        <CommonHeader
          list={[
            '用户',
            new HeaderNavItem('列表', '/system/user/list'),
            '详情',
          ]}
          title="用户详情"
        />
        <Card className={classNames(globalStyles.global, globalStyles.margin)}>
          <DetailItemSimpleText label="ID" text={id} />
          <DetailItemSimpleText label="姓名" text={name} />
          <DetailItemSimpleText label="生日" text={birthday} />
        </Card>
      </div>
    )
  }
}

export default withRouter(UserDetail)
