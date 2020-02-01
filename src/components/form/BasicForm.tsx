import React, { FormEvent } from 'react'
import { FormFieldInput, FormFieldSelect, FormFieldType } from './ts/FormField'
import { Button, Col, Form, Row } from 'antd'
import FormItemForInput from './component/FormItemForInput'
import { FormComponentProps } from 'antd/es/form'
import FormItemForSelect from './component/FormItemForSelect'
import { logger } from 'rx-util'
import { WrappedFormUtils } from 'antd/es/form/Form'

type PropsType = FormComponentProps & {
  fields: (FormFieldInput | FormFieldSelect)[]
  onSubmit: (values: any, form: WrappedFormUtils) => void
  onCancel?: (form: WrappedFormUtils) => void
}

//region 表单元素布局

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

//endregion

/**
 * 基本的表单生成器
 * TODO
 * - [ ] 根据外部的属性进行初始化
 * - [ ] 校验数据是否发生改变了
 * @param props
 * @constructor
 */
class BasicForm extends React.Component<PropsType> {
  /**
   * 渲染一个字段
   * @param field
   * @param key
   */
  renderField = (field: FormFieldInput | FormFieldSelect, key: number) => {
    switch (field.type) {
      case FormFieldType.Input:
        return (
          <FormItemForInput key={key} form={this.props.form} field={field} />
        )
      case FormFieldType.Select:
        return (
          <FormItemForSelect key={key} form={this.props.form} field={field} />
        )
      default:
        throw new Error('无法处理的表单元素类型')
    }
  }
  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        logger.error('表单校验失败: ', err)
        return
      }
      this.props.onSubmit(values, this.props.form)
    })
  }
  render() {
    return (
      <Row>
        <Col xs={24} sm={18}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            {this.props.fields.map(this.renderField)}
            <Form.Item {...tailFormItemLayout} style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 16 }}
              >
                提交
              </Button>
              {this.props.onCancel && (
                <Button
                  htmlType="button"
                  onClick={() => this.props.onCancel!(this.props.form)}
                >
                  取消
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default Form.create<PropsType>({
  name: 'BasicForm',
})(BasicForm)
