import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null }) {

    const [imgData, setImgData] = useState({ imgUrl: null })
    const [isUploading, setIsUploading] = useState(false)

    async function uploadImg(ev) {
        ev.preventDefault()
        setIsUploading(true)

        const { secure_url } = await uploadService.uploadImg(ev)

        setImgData({ imgUrl: secure_url, })
        setIsUploading(false)
        onUploaded && onUploaded(secure_url)
    }

    function getUploadLabel() {
        if (imgData.imgUrl) return 'Change picture?'
        return isUploading ? <img src="https://media.tenor.com/axAeNjNIUBsAAAAC/spinner-loading.gif" /> : 'Upload Image'
    }

    return (
        <div >
            <div >{getUploadLabel()}</div>


            <label
                onDrop={uploadImg}
                onDragOver={console.log}
            // onDragOver={ev => ev.preventDefault()}
            >

                <img src={imgData.imgUrl || 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'} style={{ width: '200px', height: '200px' }} />

                <input hidden
                    type="file"
                    onChange={uploadImg} accept="img/*" />
            </label>

        </div>
    )
}









