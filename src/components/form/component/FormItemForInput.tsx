import React from 'react'
import { Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { FormFieldInput } from '../ts/FormField'

type PropsType = { form: WrappedFormUtils; field: FormFieldInput }

const FormItemForInput: React.FC<PropsType> = function(props) {
  const {
    form: { getFieldDecorator },
    field: { field, label, placeholder, rules },
  } = props
  return (
    <Form.Item label={label}>
      {getFieldDecorator(field, {
        rules,
      })(<Input placeholder={placeholder} />)}
    </Form.Item>
  )
}

export default FormItemForInput
