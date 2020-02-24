import React, { PropsWithChildren } from 'react'
import { observer } from 'mobx-react'
import { PermissionKeyEnum } from './ts/PermissionKeyEnum'
import { layoutSideMenuStore } from '../layout/LayoutSideMenu.store'

type PropsType = PropsWithChildren<{
  key: PermissionKeyEnum
}>

/**
 * 需要权限的元素的盒子
 * @param props
 * @constructor
 */
const PermissionBox: React.FC<PropsType> = function({
  key,
  children,
}: PropsType) {
  return <>{layoutSideMenuStore.elPermissionSet.has(key) && children}</>
}

export default observer(PermissionBox)
