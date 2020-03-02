import React from 'react'
import { Input } from 'antd'
import { HeaderNavItem } from '../header/ts/HeaderNavItem'
import CommonHeader from '../header/CommonHeader'
import { useModel } from '../../common/hooks/useModel'

const { Search } = Input

type PropsType = {
  value?: string
  list: (string | HeaderNavItem)[]
  title: string
  placeholder: string
  onSearch: (keyword?: string) => void
}

const ListHeader: React.FC<PropsType> = props => {
  const [innerValue, changeInnerValue] = useModel(props.value)
  const { list, title, placeholder, onSearch } = props
  return (
    <CommonHeader list={list} title={title}>
      <Search
        value={innerValue}
        placeholder={placeholder}
        onChange={e => changeInnerValue(e.target.value)}
        onSearch={onSearch}
        enterButton
      />
    </CommonHeader>
  )
}

export default ListHeader
