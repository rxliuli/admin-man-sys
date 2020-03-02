import React, { useEffect, useState } from 'react'
import BasicForm from '../../../components/form/BasicForm'
import {
  FormFieldBase,
  FormFieldDate,
  FormFieldInput,
  FormFieldType,
} from '../../../components/form/ts/FormField'
import CommonHeader from '../../../components/header/CommonHeader'
import { HeaderNavItem } from '../../../components/header/ts/HeaderNavItem'
import { Card, Form } from 'antd'
import classNames from 'classnames'
import globalStyles from '../../../assets/css/global.module.css'
import { logger } from 'rx-util'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { useHistory, useParams } from 'react-router'
import { userApi } from './api/user.api'
import { FormComponentProps } from 'antd/es/form'
import moment from 'moment'
import { message, Modal } from 'antd/es'

type PropsType = FormComponentProps & {}

const UserEdit: React.FC<PropsType> = props => {
  const [fields] = useState([
    {
      type: FormFieldType.Input,
      field: 'name',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [
        {
          required: true,
          message: '用户名不能为空',
        },
      ],
    } as FormFieldInput,
    {
      type: FormFieldType.Date,
      field: 'birthday',
      label: '生日',
      rules: [
        {
          required: true,
          message: '至少选择一个爱好',
        },
      ],
      mode: 'tags',
      placeholder: '请选择爱好',
    } as FormFieldDate,
  ] as FormFieldBase[])

  const { id } = useParams<{ id: string }>()
  const [initForm, changeInitForm] = useState<string>()
  useEffect(() => {
    async function initUserDetail() {
      const user = await userApi.get(Number.parseInt(id))
      logger.info('查询用户信息: ', user)
      props.form.setFieldsValue(
        {
          ...user,
          birthday: moment(user.birthday),
        },
        () => changeInitForm(JSON.stringify(props.form.getFieldsValue())),
      )
    }
    // noinspection JSIgnoredPromiseFromCall
    initUserDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  //region 表单提交操作

  const history = useHistory()
  const handleSubmit = async (values: any) => {
    logger.info('提交表单: ', values)
    const hide = message.loading('正在提交修改内容')
    const success = await userApi.update({ ...values, id })
    hide()
    if (!success) {
      message.error('修改失败，请重试')
      return
    }
    message.success('修改成功')
    history.goBack()
  }
  const handleCancel = async (form: WrappedFormUtils) => {
    const values = form.getFieldsValue()
    if (JSON.stringify(values) !== initForm) {
      const isConfirm = await new Promise(resolve =>
        Modal.confirm({
          title: '你已经修改了表单，确认放弃么？',
          onOk() {
            resolve(true)
          },
          onCancel() {
            resolve(false)
          },
        }),
      )
      if (!isConfirm) {
        return
      }
    }
    history.goBack()
  }

  //endregion

  return (
    <div>
      <CommonHeader
        list={['用户', new HeaderNavItem('列表', '/system/user/list'), '详情']}
        title="用户详情"
      />
      <Card className={classNames(globalStyles.global, globalStyles.margin)}>
        <BasicForm
          form={props.form}
          fields={fields}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Card>
    </div>
  )
}

export default Form.create<PropsType>({
  name: 'UserEdit',
})(UserEdit)
