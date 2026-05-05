import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null, children }) {
  const [imgData, setImgData] = useState({ imgUrl: null })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    ev.preventDefault()
    setIsUploading(true)

    const { secure_url, original_filename, format } = await uploadService.uploadImg(ev)

    setImgData({
      imgUrl: secure_url,
      fileName: original_filename,
      format,
    })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url, original_filename, format)
  }

  return (
    <div className="img-uploader">
      <label onDrop={uploadImg} onDragOver={(ev) => ev.preventDefault()}>
        <input className="img-uploader-input" type="file" onChange={uploadImg} accept="img/*" />
        {children && children(imgData, isUploading)}
      </label>
    </div>
  )
}
