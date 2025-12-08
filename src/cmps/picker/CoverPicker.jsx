import { useState } from "react";
import { coverColorsMap, makeId } from "../../services/util.service";
import { ImgUploader } from "../ImgUploader";

export function CoverPicker({ task, onUpdateTask }) {
    const [selectedColorKey, setSelectedColorKey] = useState(task?.cover?.coverColor || Object.keys(coverColorsMap)[0])
    const [selectedAttachment, setSelectedAttachment] = useState(task?.idAttachmentCover || null)

    function onSaveCover(colorKey) {
        setSelectedColorKey(colorKey)
        onUpdateTask(task.idBoard, { cover: { coverColor: colorKey } })
    }

    function onRemoveCover() {
        setSelectedColorKey(null)
        onUpdateTask(task.idBoard, { cover: null })
    }

    function handleImageUploaded(imgUrl, fileName, format) {
        const idAttachmentCover = makeId()

        const updatedTask = {
            ...task,
            idAttachmentCover,
            cover: {
                imgUrl,
                idAttachment: idAttachmentCover
            },
            attachments: [...task.attachments, {
                _id: idAttachmentCover,
                date: Date.now(),
                edgeColor: "",
                idMember: "",
                isUpload: true,
                name: `${fileName}.${format}`,
                url: imgUrl
            }]
        }

        onUpdateTask(task.idBoard, updatedTask)

        setSelectedAttachment(idAttachmentCover)
    }

    const coverAttachments = task?.attachments?.filter(att => att._id === task?.cover?.idAttachment) || []

    return (
        <section className="cover-picker">
            <header className="picker-header">
                <h2 className="picker-title">Cover</h2>
            </header>
            <div className="cover-editor">
                <h3 className="picker-subtitle">Colors</h3>
                <ul className="cover-colors-container">
                    {Object.keys(coverColorsMap).map((colorKey, idx) => (
                        <li key={colorKey} className={`cover-colors-item ${selectedColorKey === colorKey ? 'selected' : ''}`}>
                            <button
                                key={colorKey}
                                className="cover-colors-btn"
                                onClick={() => onSaveCover(colorKey)}
                                style={{ backgroundColor: coverColorsMap[colorKey] }}
                            ></button>
                        </li>
                    ))}
                </ul>
                <button
                    className="btn-neutral"
                    onClick={onRemoveCover}
                >
                    Remove cover
                </button>

                <div className="divider"></div>

                <h3 className="picker-subtitle">Attachments</h3>

                {coverAttachments.length > 0 && (
                    <div className="picker-attachments">
                        {coverAttachments.length > 0 && coverAttachments.map((attachment, idx) => {
                            const attachmentCoverClassName = selectedAttachment === attachment._id ? 'attachment-preview selected' : 'attachment-preview'
                            return <div key={idx} className={attachmentCoverClassName}>
                                <img src={attachment.url} alt={attachment.name} />
                            </div>
                        })}
                    </div>
                )}
                <ImgUploader onUploaded={handleImageUploaded}>
                    {(imgData, isUploading) => (
                        <>
                            {isUploading ? (
                                <div className="loader-container">
                                    <div className="loader small-loader"></div>
                                </div>
                            ) : (
                                <button
                                    className="btn-neutral upload-btn"
                                >
                                    Upload a cover image
                                </button>
                            )}
                        </>
                    )}
                </ImgUploader>
            </div>
        </section >
    )
}