import React from 'react'
import { Form, Select } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { FormFieldSelect } from '../ts/FormField'

type PropsType = { form: WrappedFormUtils; field: FormFieldSelect }

const FormItemForSelect: React.FC<PropsType> = function(props) {
  const {
    form: { getFieldDecorator },
    field: { field, label, placeholder, rules, mode, options },
  } = props
  return (
    <Form.Item label={label}>
      {getFieldDecorator(field, {
        rules,
      })(
        <Select placeholder={placeholder} mode={mode}>
          {(options || []).map(option => (
            <Select.Option key={option.value}>{option.text}</Select.Option>
          ))}
        </Select>,
      )}
    </Form.Item>
  )
}

export default FormItemForSelect
