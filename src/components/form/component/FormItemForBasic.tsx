import React, { ReactNode } from 'react'
import { WrappedFormUtils } from 'antd/es/form/Form'
import {
  FormFieldBase,
  FormFieldDate,
  FormFieldDateRange,
  FormFieldInput,
  FormFieldSelect,
  FormFieldType,
} from '../ts/FormField'
import FormItemForBase from './FormItemForBase'
import RangePicker from 'antd/es/date-picker/RangePicker'
import { DatePicker, Input, Select } from 'antd/es'

type PropsType = { form: WrappedFormUtils; field: FormFieldBase }

const FormItemForBasic: React.FC<PropsType> = function(props) {
  const map = (field: FormFieldBase): ReactNode => {
    const map = {
      [FormFieldType.Input]: () => {
        const { placeholder, disable } = props.field as FormFieldInput
        return <Input placeholder={placeholder} disabled={disable} />
      },
      [FormFieldType.Select]: () => {
        const {
          placeholder,
          mode,
          options,
          disable,
        } = props.field as FormFieldSelect
        return (
          <Select placeholder={placeholder} mode={mode} disabled={disable}>
            {(options || []).map(option => (
              <Select.Option key={option.value}>{option.text}</Select.Option>
            ))}
          </Select>
        )
      },
      [FormFieldType.Date]: () => {
        const { placeholder, disable } = props.field as FormFieldDate
        return <DatePicker placeholder={placeholder} disabled={disable} />
      },
      [FormFieldType.DateRange]: () => {
        const { placeholder, disable } = props.field as FormFieldDateRange
        return <RangePicker placeholder={placeholder} disabled={disable} />
      },
    }
    return map[field.type]()
  }
  return (
    <FormItemForBase form={props.form} field={props.field}>
      {map(props.field)}
    </FormItemForBase>
  )
}

export default FormItemForBasic
