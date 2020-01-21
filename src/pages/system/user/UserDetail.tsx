import React from 'react'
import CommonHeader from '../../../components/header/CommonHeader'
import { HeaderNavItem } from '../../../components/header/ts/HeaderNavItem'
import { Card } from 'antd'
import { UserEntity } from '../../index/ts/user.entity'
import { userApi } from '../../index/ts/user.api'
import { RouteComponentProps, withRouter } from 'react-router'
import globalStyles from '../../../assets/css/global.module.css'
import classNames from 'classnames'

type PropsType = RouteComponentProps<{ id: string }>
type StateType = {
  detail: UserEntity
}

class UserDetail extends React.Component<PropsType> {
  state = {
    detail: {} as UserEntity,
  }
  componentDidMount(): void {
    this.initData()
  }
  async initData() {
    this.setState({
      detail: await userApi.get(parseInt(this.props.match.params.id)),
    })
  }

  render() {
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
          {JSON.stringify(this.state.detail, null, 2)}
        </Card>
      </div>
    )
  }
}

export default withRouter(UserDetail)
