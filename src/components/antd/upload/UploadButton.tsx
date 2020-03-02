import React, { useRef } from 'react'

type PropsType = {
  /**
   * 是否允许多选
   */
  multiple: boolean
  /**
   * 上传文件限制的类型
   */
  accept: string
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton: React.FC<PropsType> = function(props) {
  const uploadInputRef = useRef<HTMLInputElement>()
  const upload = () => {
    uploadInputRef.current!.click()
  }
  return (
    <div style={{ display: 'inline-block' }}>
      <div onClick={upload}>{props.children}</div>
      <input
        type="file"
        {...((props.multiple ? { multiple: 'multiple' } : {}) as any)}
        accept={props.accept}
        ref={uploadInputRef}
        style={{ display: 'none' }}
        onChange={e => props.onClick(e)}
      />
    </div>
  )
}

export default UploadButton
