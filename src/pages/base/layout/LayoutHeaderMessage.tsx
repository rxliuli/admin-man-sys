import React, { Component } from 'react'
import { Badge, Button, Drawer, Icon, List } from 'antd'
import { SystemMessage } from './ts/SystemMessage'
import { Link } from 'react-router-dom'
import { systemMessageApi } from './ts/systemMessage.api'
import { Page } from '../../../components/list/ts/Page'
import produce from 'immer'
import { logger, switchMap } from 'rx-util'

type StateType = {
  //是否展开消息列表
  visible: boolean
  //当前加载的消息列表
  list: SystemMessage[]
  //分页加载的数据
  page: Page<SystemMessage>
  //是否正在加载消息
  loading: boolean
  //未读消息数量
  unreadCount: number
}

class LayoutHeaderMessage extends Component<{}, StateType> {
  state = {
    visible: false,
    list: [] as SystemMessage[],
    page: new Page<SystemMessage>(),
    loading: false,
    unreadCount: 0,
  }

  componentDidMount(): void {
    this.pollUnreadCount()
    // noinspection JSIgnoredPromiseFromCall
    this.loadPage()
  }

  //轮询未读消息数量
  pollUnreadCount = () => {
    setInterval(
      switchMap(async () => {
        if (this.state.visible) {
          return
        }
        const count = await systemMessageApi.count()
        logger.info('pollUnreadCount: ', new Date().toISOString())
        if (count === this.state.unreadCount) {
          return
        }
        this.setState(
          produce(this.state, draft => {
            draft.list = []
            draft.page = new Page()
            draft.unreadCount = count
          }),
        )
        this.loadPage()
      }),
      10000,
    )
  }

  //加载下一页
  loadPage = async () => {
    this.setState({
      loading: true,
    })
    const page = await systemMessageApi.pageList(this.state.page)
    logger.info('loadPage: ', page)
    this.setState(
      produce(this.state, draft => {
        draft.page = {
          ...this.state.page,
          ...page,
        }
        draft.list = [...draft.list, ...page.list]
      }),
    )
    this.setState({
      loading: false,
    })
  }

  //标记为已读
  markHasRead = async (id: number) => {
    logger.info('markHasRead: ', id)
    await systemMessageApi.markHasRead(id)
  }

  render() {
    const { unreadCount, loading, list, visible } = this.state
    return (
      <>
        <Badge count={unreadCount}>
          <Icon
            type="bell"
            style={{ fontSize: 24 }}
            onClick={() =>
              this.setState({
                visible: true,
              })
            }
          />
        </Badge>
        <Drawer
          title="系统消息列表"
          placement="right"
          closable={true}
          onClose={() => this.setState({ visible: false })}
          visible={visible}
        >
          <List
            itemLayout="horizontal"
            dataSource={list}
            loading={loading}
            loadMore={
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 12,
                }}
              >
                <Button type="link" onClick={this.loadPage}>
                  加载更多
                </Button>
              </div>
            }
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Link
                      to={item.link}
                      onClick={() => this.markHasRead(item.id)}
                    >
                      {item.title}
                    </Link>
                  }
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </Drawer>
      </>
    )
  }
}

export default LayoutHeaderMessage
