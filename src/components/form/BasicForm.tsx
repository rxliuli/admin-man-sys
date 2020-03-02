import React, { FormEvent } from 'react'
import { FormFieldBase } from './ts/FormField'
import { Button, Col, Form, Row } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { logger } from 'rx-util'
import { WrappedFormUtils } from 'antd/es/form/Form'
import FormItemForBasic from './component/FormItemForBasic'

type PropsType = FormComponentProps & {
  fields: FormFieldBase[]
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
const BasicForm: React.FC<PropsType> = function(props) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        logger.error('表单校验失败: ', err)
        return
      }
      props.onSubmit(values, props.form)
    })
  }
  return (
    <Row>
      <Col xs={24} sm={18}>
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          {props.fields
            .filter(field => !field.hidden)
            .map((field, i) => (
              <FormItemForBasic form={props.form} field={field} key={i} />
            ))}
          <Form.Item {...tailFormItemLayout} style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 16 }}
            >
              提交
            </Button>
            {props.onCancel && (
              <Button
                htmlType="button"
                onClick={() => props.onCancel!(props.form)}
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

export default BasicForm
