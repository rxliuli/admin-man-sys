export class FormChangeUtil<T = any> {
  constructor(public readonly initVal: T) {
    this.initVal = JSON.parse(JSON.stringify(initVal))
  }
  isChange(value: T) {
    return JSON.stringify(value) !== JSON.stringify(this.initVal)
  }
  static useFormChange<T>(initVal: T): [T, (value: T) => boolean] {
    const instance = new FormChangeUtil(initVal)
    return [instance.initVal, instance.isChange.bind(instance)]
  }
}
