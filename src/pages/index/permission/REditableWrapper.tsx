import React, { useEffect } from 'react'
import REditable from './REditable'
import { hasPermission } from '../../base/router/ts/hasPermission'
import { PermissionKeyEnum } from '../../base/router/ts/PermissionKeyEnum'
import { observer } from 'mobx-react'
import { VipOperation } from './VipOperation'
import { NormalOperation } from './NormalOperation'
import { rEditableStore } from './REditable.store'

type PropsType = {}

const REditableWrapper: React.FC<PropsType> = function(props) {
  const timing = rEditableStore.timing
  //加载不同权限的不同对象
  const config = hasPermission(PermissionKeyEnum.ViewMarkVip)
    ? new VipOperation()
    : Object.assign(
        new NormalOperation(),
        timing !== -1 ? new VipOperation() : {},
      )

  useEffect(() => {
    rEditableStore.init()
  }, [])

  return <REditable {...(config as any)} />
}

export default observer(REditableWrapper)
