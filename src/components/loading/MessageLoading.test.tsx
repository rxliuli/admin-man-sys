import React from 'react'
import { render } from '@testing-library/react'
import MessageLoading from './MessageLoading'

describe('测试组件 MessageLoading', () => {
  it('renders welcome message', async () => {
    const props = {
      visible: true,
      msg: '正在加载中...',
    }
    const { getByTestId, rerender } = render(<MessageLoading {...props} />)
    expect(getByTestId('loadingOverlay')).toBeInTheDocument()
    expect(getByTestId('loadingOverlay').style.display).not.toBe('none')
    expect(getByTestId('loadingMsg').textContent).toBe(props.msg)
    //测试 props 改变
    props.visible = false
    rerender(<MessageLoading {...props} />)
    expect(getByTestId('loadingOverlay').style.display).toBe('none')
    props.msg = '测试'
    rerender(<MessageLoading {...props} />)
    expect(getByTestId('loadingMsg').textContent).toBe(props.msg)
  })
})
