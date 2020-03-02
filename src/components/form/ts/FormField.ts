import { ValidationRule } from 'antd/es/form/Form'

export enum FormFieldType {
  Input,
  Select,
  Date,
  DateRange,
}

/**
 * 表单的状态
 */
export interface FormFieldState {
  /**
   * 是否禁用，默认应该启用 false
   */
  disable?: boolean
  /**
   * 是否隐藏，默认应该显示 false
   */
  hidden?: boolean
}

/**
 * 基本输入框
 */
export interface FormFieldBase extends FormFieldState {
  type: FormFieldType
  label: string
  field: string
  initialValue?: any
  rules?: ValidationRule[]
}

/**
 * 文本输入框
 */
export interface FormFieldInput extends FormFieldBase {
  type: FormFieldType.Input
  placeholder?: string
}

/**
 * 下拉选择框的选项对象
 */
export interface SelectOption {
  value: string
  text: string
}

/**
 * 下拉选择框
 */
export interface FormFieldSelect extends FormFieldBase {
  type: FormFieldType.Select
  placeholder?: string
  mode?: 'multiple' | 'tags'
  options?: SelectOption[]
}

/**
 * 日期选择框
 */
export interface FormFieldDate extends FormFieldBase {
  type: FormFieldType.Date
  placeholder?: string
}

/**
 * 日期区间选择框
 */
export interface FormFieldDateRange extends FormFieldBase {
  type: FormFieldType.DateRange
  placeholder?: [string, string]
}
