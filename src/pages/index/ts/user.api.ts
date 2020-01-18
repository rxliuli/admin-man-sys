import { BaseListApi } from '../../../components/list/ts/BaseListApi'
import { mock } from 'mockjs'
import { Page } from '../../../components/list/ts/Page'
import { Params } from '../../../components/list/ts/Params'

class UserApi implements BaseListApi {
  async pageList(params: Params): Promise<Page<any>> {
    const list = mock({
      'list|10': [
        {
          'id|+1': 0,
          name: '@cname',
          birthday: '@date(yyyy-MM-dd hh:mm:ss)',
        },
      ],
    }).list
    return {
      offset: 0,
      size: 10,
      total: 50,
      list,
    }
  }
}

export const userApi = new UserApi()
