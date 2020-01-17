import React from 'react'
import { Breadcrumb, Card, Col, Input, Row } from 'antd'

const { Search } = Input

type ReactInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type PropsType = {
  value?: string
  list: string[]
  title: string
  onSearch: (keyword?: string) => void
} & Omit<ReactInput, 'list'>
type StateType = {
  innerValue?: string
}

class ListHeader extends React.Component<PropsType, StateType> {
  state = {
    innerValue: '',
  }
  onChange = (e: any) => {
    this.setState({
      innerValue: e.target.value,
    })
  }
  componentDidUpdate(prevProps: PropsType) {
    // 典型用法（不要忘记比较 props）：
    if (this.props.value !== prevProps.value) {
      this.setState({
        innerValue: this.props.value,
      })
    }
  }

  componentDidMount(): void {
    this.setState({
      innerValue: this.props.value,
    })
  }

  render() {
    const { list, title, onSearch } = this.props
    return (
      <Card>
        <Row style={{ background: '#fff' }}>
          <Col span={12}>
            <h2>{title}</h2>
            <Breadcrumb>
              {list.map((item, i) => (
                <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </Col>
          <Col span={6} offset={6}>
            <Search
              {...(this.props as any)}
              value={this.state.innerValue}
              onChange={this.onChange}
              onSearch={onSearch}
              enterButton
            />
          </Col>
        </Row>
      </Card>
    )
  }
}

export default ListHeader
