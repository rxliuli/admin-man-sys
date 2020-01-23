import { Page } from '../../../../components/list/ts/Page'
import { mock, Random } from 'mockjs'
import { SystemMessage } from './SystemMessage'
import { wait } from 'rx-util'

/**
 * 系统消息的 API
 */
class SystemMessageApi {
  async markHasRead(id: number): Promise<void> {
    await wait(1000)
  }
  async count() {
    return Math.random() > 0.5 ? 1 : 0
  }
  async pageList(params: {
    offset: number
    size: number
  }): Promise<Page<SystemMessage>> {
    const { list } = mock({
      'list|10': [
        {
          'id|+1': 1,
          title: '@csentence(4,10)',
          content: '@cparagraph(1)',
          link: '/system/user/@integer(1,1000)',
          hasRead: '@boolean',
        },
      ],
    })
    return {
      offset: params.offset + params.size,
      size: params.size,
      total: 1000,
      list,
    }
  }
}

export const systemMessageApi = new SystemMessageApi()
