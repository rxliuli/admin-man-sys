import React, { PropsWithChildren } from 'react'
import { observer } from 'mobx-react'
import { PermissionKeyEnum } from './ts/PermissionKeyEnum'
import { layoutSideMenuStore } from '../layout/LayoutSideMenu.store'

type PropsType = PropsWithChildren<{
  /**
   * 需要的权限
   */
  permission: PermissionKeyEnum
}>

/**
 * 需要权限的元素的盒子
 * @param props
 * @constructor
 */
const PermissionBox: React.FC<PropsType> = function({
  permission,
  children,
}: PropsType) {
  return <>{layoutSideMenuStore.elPermissionSet.has(permission) && children}</>
}

export default observer(PermissionBox)
