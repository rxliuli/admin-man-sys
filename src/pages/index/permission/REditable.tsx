import React, { ChangeEvent, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import RCard from '../../../components/business/RCard'
import { Button } from 'antd'
import PermissionBox from '../../base/router/PermissionBox'
import { PermissionKeyEnum } from '../../base/router/ts/PermissionKeyEnum'
import { hasPermission } from '../../base/router/ts/hasPermission'

type PropsType = {}

/**
 * 标注组件
 * 业务
 * @param props
 * @constructor
 */
const REditable: React.FC<PropsType> = function(props) {
  const [text, changeText] = useState('')

  function changeTextValue(e: ChangeEvent<HTMLTextAreaElement>) {
    console.log('changeTextValue 改变触发了')
    changeText(e.target.value)

    if (hasPermission(PermissionKeyEnum.ViewMarkVip) || timing !== -1) {
      record()
    }
  }

  //region VIP 功能

  const [nextIdx, changeNextIdx] = useState(0)
  const [history, changeHistory] = useState<string[]>([])
  //添加历史记录
  function record() {
    if (nextIdx < history.length) {
      history.splice(nextIdx)
    }
    const newVal = [...history, text]
    changeHistory(newVal)
    changeNextIdx(newVal.length)
  }
  function revoke() {
    const idx = nextIdx - 1
    changeNextIdx(idx)
    changeText(history[idx])
  }
  function reverseRevoke() {
    const idx = nextIdx + 1
    changeNextIdx(idx)
    changeText(history[idx])
  }

  //endregion

  //region 普通用户

  const [timing, changeTiming] = useState(-1)
  const [timer, changeTimer] = useState(0)
  function tryOut() {
    clearInterval(timer)
    const last = Date.now() + 60 * 1000
    changeTimer(
      setInterval(() => {
        const timing = Math.floor((last - Date.now()) / 1000)
        if (timing <= 0) {
          clearInterval(timer)
          changeTiming(-1)
          return
        }
        changeTiming(timing)
      }, 500) as any,
    )
  }

  //endregion

  return (
    <RCard>
      <header>
        <PermissionBox
          permission={
            timing !== -1
              ? PermissionKeyEnum.ViewMarkNormal
              : PermissionKeyEnum.ViewMarkVip
          }
        >
          <Button onClick={revoke}>撤销</Button>
          <Button onClick={reverseRevoke}>反向撤销</Button>
        </PermissionBox>
        <PermissionBox permission={PermissionKeyEnum.ViewMarkNormal}>
          <Button onClick={tryOut}>试用</Button>
          {timing !== -1 && <span>剩余试用时间：{timing}</span>}
        </PermissionBox>
      </header>
      {/*标注区*/}
      <section>
        <TextArea value={text} onChange={changeTextValue} />
      </section>
    </RCard>
  )
}

export default REditable
