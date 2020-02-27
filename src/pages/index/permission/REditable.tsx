import React, { ChangeEvent } from 'react'
import TextArea from 'antd/es/input/TextArea'
import RCard from '../../../components/business/RCard'
import { Button } from 'antd'
import PermissionBox from '../../base/router/PermissionBox'
import { PermissionKeyEnum } from '../../base/router/ts/PermissionKeyEnum'
import { observer } from 'mobx-react'
import { rEditableStore } from './REditable.store'
import { hasPermission } from '../../base/router/ts/hasPermission'
import { NormalOperation } from './NormalOperation'
import { VipOperation } from './VipOperation'

type PropsType = NormalOperation & VipOperation

/**
 * 编辑组件
 * @constructor
 */
const REditable: React.FC<PropsType> = function(props) {
  const text = rEditableStore.text
  const timing = rEditableStore.timing
  const changeText = rEditableStore.changeText.bind(rEditableStore)

  function changeTextValue(e: ChangeEvent<HTMLTextAreaElement>) {
    console.log('changeTextValue 改变触发了')
    changeText(e.target.value)

    if (hasPermission(PermissionKeyEnum.ViewMarkVip) || timing !== -1) {
      props.record()
    }
  }

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
          <Button onClick={props.revoke}>撤销</Button>
          <Button onClick={props.reverseRevoke}>反向撤销</Button>
        </PermissionBox>
        <PermissionBox permission={PermissionKeyEnum.ViewMarkNormal}>
          <Button onClick={props.tryOut}>试用</Button>
          {timing !== -1 && <span>剩余试用时间：{timing}</span>}
        </PermissionBox>
      </header>
      <section>
        <TextArea value={text} onChange={changeTextValue} />
      </section>
    </RCard>
  )
}

export default observer(REditable)
