import React, { useEffect, useState } from 'react'
import { Modal } from 'antd/es'
import ImageUploadPreviewItem from './ImageUploadPreviewItem'
import { useComputed } from '../../../common/hooks/useComputed'
import UploadButton from './UploadButton'
import ImageUploadButton from './ImageUploadButton'
import { groupBy, returnItself } from 'rx-util'

type PropsType<T extends string[] | (string | null)> = {
  /**
   * 上传的图片/图片 URL 列表
   */
  value: T
  onChange: (val: T) => void
  onUpload: (val: T) => void
  /**
   * 初始值，主要是为了兼容 AntD 的 v-decorator 指令
   */
  initialValue?: T
  /**
   * 最大上传图片数量
   */
  max?: number
  multiple?: boolean
}

const ImageUpload: React.FC<PropsType<any>> = function(props) {
  const {
    value,
    onChange,
    onUpload,
    initialValue,
    max = Number.MAX_SAFE_INTEGER,
    multiple = false,
  } = props

  useEffect(() => {
    if (initialValue) {
      onChange(initialValue)
    }
  }, [initialValue, onChange])

  //region 图片预览

  const [previewVisible, changePreviewVisible] = useState(false)
  const [previewImage, changePreviewImage] = useState('')
  function handleCancel() {
    changePreviewVisible(false)
  }
  function handlePreview(url: string) {
    changePreviewImage(url)
    changePreviewVisible(true)
  }

  //endregion

  function handleDelete(idx: number) {
    if (!multiple) {
      onChange(null)
      return
    }
    const _value = [...value]
    _value.splice(idx, 1)
    onChange(_value)
  }

  const [_value] = useComputed<string[]>(() => {
    if (multiple) {
      if (!value) {
        onChange([])
        return []
      }
      return value
    }
    return value ? [value] : []
  }, [multiple, value, onChange])
  const valueCountMap = groupBy(
    _value,
    v => v,
    res => res + 1,
    () => 0,
  )
  //TODO 此处应该是存在什么问题，计算属性会慢一步
  const [valueCountMap2] = useComputed(() => groupBy(_value, v => v), [_value])
  console.log('valueCountMap2: ', valueCountMap.size, valueCountMap2.size)
  const [_max] = useComputed<number>(() => (multiple ? max : 1), [
    multiple,
    max,
  ])

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/*已上传的图片列表*/}
        {_value.map((url, i) => (
          <ImageUploadPreviewItem
            url={url}
            onPreview={() => handlePreview(url)}
            onDelete={() => handleDelete(i)}
            key={valueCountMap.get(url)! > 1 ? i : url}
          />
        ))}

        {_value.length < _max && (
          <UploadButton multiple={multiple} accept="image/*" onClick={onUpload}>
            <ImageUploadButton />
          </UploadButton>
        )}
      </div>
      {/*图片预览*/}
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img style={{ width: '100%' }} src={previewImage} alt="previewImage" />
      </Modal>
    </div>
  )
}

export default ImageUpload
