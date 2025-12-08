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
            format
        })
        setIsUploading(false)
        onUploaded && onUploaded(secure_url, original_filename, format)
    }

    const fileInputStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        rigth: 0,
        bottom: 0,
        opacity: 0,
        zIndex: 100
    }

    return (
        <div>
            <label
                style={{ position: 'relative' }}
                onDrop={uploadImg}
                onDragOver={ev => ev.preventDefault()}
            >
                <input
                    type="file"
                    style={fileInputStyle}
                    onChange={uploadImg} accept="img/*"
                />
                {children && children(imgData, isUploading)}
            </label>

        </div>
    )
}









