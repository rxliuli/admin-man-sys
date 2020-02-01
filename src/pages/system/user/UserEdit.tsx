import React, { Component } from 'react'
import BasicForm from '../../../components/form/BasicForm'
import {
  FormFieldInput,
  FormFieldSelect,
  FormFieldType,
} from '../../../components/form/ts/FormField'
import CommonHeader from '../../../components/header/CommonHeader'
import { HeaderNavItem } from '../../../components/header/ts/HeaderNavItem'
import { Card } from 'antd'
import classNames from 'classnames'
import globalStyles from '../../../assets/css/global.module.css'
import { logger } from 'rx-util'
import { WrappedFormUtils } from 'antd/es/form/Form'

type PropsType = {}
type StateType = {
  fields: (FormFieldInput | FormFieldSelect)[]
}

class UserEdit extends Component<PropsType, StateType> {
  state = {
    fields: [
      {
        type: FormFieldType.Input,
        field: 'username',
        label: '用户名',
        placeholder: '请输入用户名',
        rules: [
          {
            required: true,
            message: '用户名不能为空',
          },
        ],
      },
      {
        type: FormFieldType.Select,
        field: 'hobby',
        label: '爱好',
        rules: [
          {
            required: true,
            message: '至少选择一个爱好',
          },
        ],
        mode: 'tags',
        placeholder: '请选择爱好',
        options: [
          {
            text: '动画',
            value: 1,
          },
          {
            text: '游戏',
            value: 2,
          },
          {
            text: '电影',
            value: 3,
          },
        ],
      },
    ] as (FormFieldInput | FormFieldSelect)[],
  }

  handleSubmit = (values: any) => {
    logger.info('提交表单: ', values)
  }
  handleCancel = (form: WrappedFormUtils) => {
    logger.info('取消表单: ', form.getFieldsValue())
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
          <BasicForm
            fields={this.state.fields}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
          />
        </Card>
      </div>
    )
  }
}

export default UserEdit
