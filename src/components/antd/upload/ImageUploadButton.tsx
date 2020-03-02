import React from 'react'
import styles from './ImageUploadButton.module.css'
import { Icon } from 'antd/es'

type PropsType = {}

const ImageUploadButton: React.FC<PropsType> = function(props) {
  return (
    <div className={styles.uploadBtn}>
      <div>
        <Icon
          className={styles.icon}
          type="plus"
          style={{ fontSize: '16px', color: 'rgba(0,0,0,0.45)' }}
        />
        <div className={styles.tip}>上传照片</div>
      </div>
    </div>
  )
}

export default ImageUploadButton
