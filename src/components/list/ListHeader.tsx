import React from 'react'
import { Input } from 'antd'
import { HeaderNavItem } from '../header/ts/HeaderNavItem'
import CommonHeader from '../header/CommonHeader'

const { Search } = Input

type ReactInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type PropsType = {
  value?: string
  list: (string | HeaderNavItem)[]
  title: string
  placeholder: string
  onSearch: (keyword?: string) => void
}
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
    const { list, title, placeholder, onSearch } = this.props
    return (
      <CommonHeader list={list} title={title}>
        <Search
          value={this.state.innerValue}
          placeholder={placeholder}
          onChange={this.onChange}
          onSearch={onSearch}
          enterButton
        />
      </CommonHeader>
    )
  }
}

export default ListHeader
