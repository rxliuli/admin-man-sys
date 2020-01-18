import { ReactNode } from 'react'

/**
 * 过滤器的类型
 * @type {{select: number, slot: number, timeRange: number}}
 */
export enum FilterFieldType {
  /**
   * @property 自定义 slot
   */
  slot = 1,
  /**
   * 普通选择框
   */
  select = 2,
  /**
   * 日期区间选择器
   */
  timeRange = 3,
}

/**
 * 过滤器字段基类
 */
export class FilterFieldBase {
  /**
   * @field 过滤器元素类型
   */
  readonly type: FilterFieldType
  /**
   * @field 过滤器的标题
   */
  readonly title: string
  constructor({ type, title }: FilterFieldBase) {
    this.type = type
    this.title = title
  }
}

/**
 * 单选选择器
 * TODO 目前没有多选的需求，如果之后有的话添加一个字段标识是否多选就好了
 */
export class FilterFieldSelect extends FilterFieldBase {
  /**
   * @field 字段名
   */
  field: string
  /**
   * 可选项键值对
   */
  values: Map<number, string>

  constructor({ title, field, values }: Omit<FilterFieldSelect, 'type'>) {
    super({ title, type: FilterFieldType.select })
    this.field = field
    this.values = values
  }
}

/**
 * 时间区间选择器
 */
export class FilterFieldTimeRange extends FilterFieldBase {
  /**
   * 日期区间的两个字段
   */
  fields: [string, string]
  constructor({
    title,
    fields,
  }: Omit<FilterFieldTimeRange, 'type' | 'timeRangeField'>) {
    super({
      title,
      type: FilterFieldType.timeRange,
    })
    this.fields = fields
  }

  /**
   * 获取给组件绑定的时间区间的字段名，默认是第一个字段 + 'TimeRange'
   */
  get timeRangeField(): string {
    return this.fields[0] + 'TimeRange'
  }
}

/**
 * 自定义 slot 过滤器
 */
export class FilterFieldSlot extends FilterFieldBase {
  /**
   * slot 的名字
   */
  slot: ReactNode
  constructor({ title, slot }: Omit<FilterFieldSlot, 'type'>) {
    super({ title, type: FilterFieldType.slot })
    this.slot = slot
  }
}
