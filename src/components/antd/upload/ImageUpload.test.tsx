import React, { useState } from 'react'
import ImageUpload from './ImageUpload'
import { loading } from '../../loading/loading'
import { message } from 'antd/es'
import { randomInt, wait } from 'rx-util'

type PropsType = {}

Reflect.set(window, 'loading', loading)
Reflect.set(window, 'message', message)

const ImageUploadTest: React.FC<PropsType> = function(props) {
  const [urlList, changeUrlList] = useState([
    'https://picsum.photos/id/0/200',
    'https://picsum.photos/id/10/200',
  ])
  const [url, changeUrl] = useState('https://picsum.photos/id/100/200')

  const [max] = useState(10)
  const handleMultiUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!
    console.log('handleMultiUpload: ', files)
    if (files.length + urlList.length > max) {
      message.info('最多只能上传两张图片')
    } else {
      const urls = await upload(files)
      changeUrlList(urlList.concat(urls))
    }
  }
  const handleSingleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!
    const [url] = await upload(files)
    changeUrl(url)
  }
  const upload = async (files: FileList) => {
    loading.config({
      msg: '正在上传图像',
    })
    const hide = loading()
    await wait(1000)
    hide()
    return Array.from(files).map(
      () => `https://picsum.photos/id/${randomInt(100, 400)}/200`,
    )
  }

  return (
    <div>
      <ImageUpload
        value={urlList}
        onChange={changeUrlList}
        multiple={true}
        onUpload={handleMultiUpload}
        max={max}
      />
      <hr />
      <ImageUpload
        value={url}
        onChange={changeUrl}
        onUpload={handleSingleUpload}
      />
    </div>
  )
}

export default ImageUploadTest
