import { rEditableStore } from './REditable.store'

export class VipOperation {
  //添加历史记录
  record = () => {
    const text = rEditableStore.text
    const nextIdx = rEditableStore.nextIdx
    const history = rEditableStore.history
    const changeNextIdx = rEditableStore.changeNextIdx.bind(rEditableStore)
    const changeHistory = rEditableStore.changeHistory.bind(rEditableStore)
    if (nextIdx < history.length) {
      history.splice(nextIdx)
    }
    const newVal = [...history, text]
    changeHistory(newVal)
    changeNextIdx(newVal.length)
  }

  revoke = () => {
    const changeText = rEditableStore.changeText.bind(rEditableStore)
    const nextIdx = rEditableStore.nextIdx
    const history = rEditableStore.history
    const changeNextIdx = rEditableStore.changeNextIdx.bind(rEditableStore)
    const idx = nextIdx - 1
    changeNextIdx(idx)
    changeText(history[idx])
  }

  reverseRevoke = () => {
    const changeText = rEditableStore.changeText.bind(rEditableStore)
    const nextIdx = rEditableStore.nextIdx
    const history = rEditableStore.history
    const changeNextIdx = rEditableStore.changeNextIdx.bind(rEditableStore)
    const idx = nextIdx + 1
    changeNextIdx(idx)
    changeText(history[idx])
  }
}
