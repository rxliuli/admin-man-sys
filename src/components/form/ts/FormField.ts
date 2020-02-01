import { ValidationRule } from 'antd/es/form/Form'

export enum FormFieldType {
  Input,
  Select,
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
export interface FormFieldBase<Type extends FormFieldType>
  extends FormFieldState {
  type: Type
  label: string
  field: string
  rules?: ValidationRule[]
}

/**
 * 文本输入框
 */
export interface FormFieldInput extends FormFieldBase<FormFieldType.Input> {
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
export interface FormFieldSelect extends FormFieldBase<FormFieldType.Select> {
  placeholder?: string
  mode?: 'multiple' | 'tags'
  options?: SelectOption[]
}
