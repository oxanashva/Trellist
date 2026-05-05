const { VITE_CLOUD_NAME } = import.meta.env

export interface CloudinaryResponse {
  secure_url: string
  url: string
  public_id: string
  [key: string]: unknown
}

type UploadEvent = React.ChangeEvent<HTMLInputElement> | DragEvent

async function uploadImg(ev: UploadEvent): Promise<CloudinaryResponse> {
  const CLOUD_NAME = VITE_CLOUD_NAME
  const UPLOAD_PRESET = 'trellist'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const file =
    ev.type === 'change'
      ? (ev as React.ChangeEvent<HTMLInputElement>).target.files![0]
      : (ev as DragEvent).dataTransfer!.files[0]

  const formData = new FormData()
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('file', file)

  const res = await fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData,
  })
  return res.json() as Promise<CloudinaryResponse>
}

export const uploadService = {
  uploadImg,
}
