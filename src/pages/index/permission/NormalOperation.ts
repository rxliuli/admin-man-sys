import { rEditableStore } from './REditable.store'

export class NormalOperation {
  tryOut = () => {
    const timer = rEditableStore.timer
    const changeTimer = rEditableStore.changeTimer.bind(rEditableStore)
    const changeTiming = rEditableStore.changeTiming.bind(rEditableStore)

    clearInterval(timer)
    const last = Date.now() + 60 * 1000
    changeTimer(
      setInterval(() => {
        const timing = Math.floor((last - Date.now()) / 1000)
        if (timing <= 0) {
          clearInterval(timer)
          changeTiming(-1)
          return
        }
        changeTiming(timing)
      }, 500) as any,
    )
  }
}
