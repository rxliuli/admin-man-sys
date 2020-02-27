import { action, observable } from 'mobx'

/**
 * 编辑器对应的数据 Store
 * 将所有的数据全局化
 */
class REditableStore {
  @observable text = ''
  @action changeText(text: string) {
    this.text = text
  }
  @observable nextIdx = 0
  @action changeNextIdx(nextIdx: number) {
    this.nextIdx = nextIdx
  }
  @observable history: string[] = []
  @action changeHistory(history: string[]) {
    this.history = history
  }
  @observable timing = -1
  @action changeTiming(timing: number) {
    this.timing = timing
  }
  @observable timer = 0
  @action changeTimer(timer: number) {
    this.timer = timer
  }
  @action init() {
    this.text = ''
    this.nextIdx = 0
    this.history = []
    this.timing = -1
    this.timer = 0
  }
}

export const rEditableStore = new REditableStore()
