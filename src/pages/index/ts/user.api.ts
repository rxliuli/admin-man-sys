import { BaseListApi } from '../../../components/list/ts/BaseListApi'
import { mock } from 'mockjs'
import { Page } from '../../../components/list/ts/Page'
import { Params } from '../../../components/list/ts/Params'
import { UserEntity } from './user.entity'
import { wait } from 'rx-util'

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
  async get(id: number) {
    await wait(1000)
    return mock(mockUserTemplate)
  }
}

export const userApi = new UserApi()
