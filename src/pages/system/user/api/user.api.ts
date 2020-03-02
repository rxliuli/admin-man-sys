import { mock } from 'mockjs'
import { UserEntity } from './user.entity'
import { wait } from 'rx-util'
import { BaseListApi } from '../../../../components/list/ts/BaseListApi'
import { Params } from '../../../../components/list/ts/Params'
import { Page } from '../../../../components/list/ts/Page'
import { PartialField } from '../../../../common/interface/PartialField'
import { Prettify } from '../../../../common/interface/Prettify'

const mockUserTemplate = {
  'id|+1': 0,
  name: '@cname',
  birthday: '@date(yyyy-MM-dd hh:mm:ss)',
}
class UserApi implements BaseListApi {
  async pageList(params: Params): Promise<Page<UserEntity>> {
    const list = mock({
      'list|10': [mockUserTemplate],
    }).list
    return {
      offset: 0,
      size: 10,
      total: 50,
      list,
    }
  }
  async get(id: number): Promise<UserEntity> {
    await wait(1000)
    return mock(mockUserTemplate)
  }

  async update(user: Prettify<PartialField<UserEntity, 'id'>>) {
    await wait(1000)
    return true
  }
}

export const userApi = new UserApi()
