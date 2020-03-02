import React from 'react'
import { Form } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { FormFieldBase } from '../ts/FormField'

type PropsType = { form: WrappedFormUtils; field: FormFieldBase }

const FormItemForBase: React.FC<PropsType> = function(props) {
  const {
    form: { getFieldDecorator },
    field: { field, label, rules, initialValue },
  } = props
  return (
    <Form.Item label={label}>
      {getFieldDecorator(field, {
        initialValue,
        rules,
      })(props.children)}
    </Form.Item>
  )
}

export default FormItemForBase
