import React from 'react'
import CommonHeader from '../../../components/header/CommonHeader'
import { HeaderNavItem } from '../../../components/header/ts/HeaderNavItem'
import { Button, Card } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import globalStyles from '../../../assets/css/global.module.css'
import classNames from 'classnames'
import DetailItemSimpleText from '../../../components/detail/DetailItemSimpleText'
import { Link } from 'react-router-dom'
import ComponentLoading from '../../../components/loading/ComponentLoading'
import PermissionBox from '../../base/router/PermissionBox'
import { PermissionKeyEnum } from '../../base/router/ts/PermissionKeyEnum'
import { userApi } from './api/user.api'
import { UserEntity } from './api/user.entity'

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
          <ComponentLoading isLoading={id === undefined}>
            <PermissionBox permission={PermissionKeyEnum.SystemUserUpdate}>
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Link to={`/system/user/${this.props.match.params.id}/edit`}>
                  <Button type="primary">编辑</Button>
                </Link>
              </div>
            </PermissionBox>
            <div>
              <DetailItemSimpleText label="ID" text={id} />
              <DetailItemSimpleText label="姓名" text={name} />
              <DetailItemSimpleText label="生日" text={birthday} />
            </div>
          </ComponentLoading>
        </Card>
      </div>
    )
  }
}

export default withRouter(UserDetail)
