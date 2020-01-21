import React, { PropsWithChildren } from 'react'
import { observer } from 'mobx-react'

type PropsType = PropsWithChildren<{
  key: string
}>

const PermissionBox: React.FC<PropsType> = function({
  key,
  children,
}: PropsType) {
  return <>{children}</>
}

export default observer(PermissionBox)
