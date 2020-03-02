import React from 'react'
import styles from './ImageUploadPreviewItem.module.css'
import { Icon } from 'antd/es'

type PropsType = {
  url: string
  onPreview: (url: string) => void
  onDelete: (url: string) => void
}

const ImageUploadPreviewItem: React.FC<PropsType> = function(props) {
  return (
    <div className={styles.imageUploadPreviewItem}>
      <div className={styles.icons}>
        <Icon type="eye" onClick={() => props.onPreview(props.url)} />
        <Icon type="delete" onClick={() => props.onDelete(props.url)} />
      </div>
      <img className={styles.img} src={props.url} alt="ImageUploadPreviewItem" />
    </div>
  )
}

export default ImageUploadPreviewItem
