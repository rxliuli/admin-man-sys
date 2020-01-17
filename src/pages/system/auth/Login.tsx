import React from 'react'
import { Button, Card, Checkbox, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import styles from './Login.module.css'
import { RouteComponentProps, withRouter } from 'react-router'

interface PropTypes extends FormComponentProps, RouteComponentProps {
  username: string
  password: string
  remember: boolean
}

/**
 * 登录页面
 */
class Login extends React.Component<PropTypes> {
  handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        throw err
      }
      console.log('form: ', values)
      this.props.history.push('/')
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.loginBox}>
        <Card title="登录" bordered={false} className={styles.login}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '用户名不能为空' }],
              })(
                <Input
                  prefix={<Icon type="user" />}
                  placeholder="请输入用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '密码不能为空' }],
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  type="password"
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住我</Checkbox>)}
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default withRouter(
  Form.create<PropTypes>({
    name: 'login',
  })(Login) as any,
)
