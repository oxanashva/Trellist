import { useState } from "react"
import { coverColorsMap, makeId } from "../../services/util.service"
import { ImgUploader } from "../ImgUploader"

import { FastAverageColor } from "fast-average-color"
const fac = new FastAverageColor();

export function CoverPicker({ task, onUpdateTask }) {
    const [selectedColorKey, setSelectedColorKey] = useState(task?.cover?.coverColor || null)
    const [selectedAttachmentId, setSelectedAttachmentId] = useState(task?.idAttachmentCover || null)

    function onSaveCover(colorKey) {
        setSelectedColorKey(colorKey)
        setSelectedAttachmentId(null)

        onUpdateTask(task.idBoard, {
            cover: { coverColor: colorKey },
            idAttachmentCover: null
        })
    }

    function onRemoveCover() {
        setSelectedColorKey(null)
        setSelectedAttachmentId(null)

        onUpdateTask(task.idBoard, { cover: { coverColor: null }, idAttachmentCover: null })
    }

    function onSelectAttachment(attachmentId) {
        let newAttachmentId
        let newCover

        if (selectedAttachmentId === attachmentId) {
            // Case 1: Deselect the currently selected attachment (unselect)
            newAttachmentId = null
            newCover = null
        } else {
            // Case 2: Select a new attachment
            newAttachmentId = attachmentId
            newCover = task.attachments.find(attachment => attachment._id === attachmentId)
        }

        setSelectedAttachmentId(newAttachmentId)
        setSelectedColorKey(null) // Deselect color if attachment is chosen/unchosen

        const updatedTaskFields = {
            idAttachmentCover: newAttachmentId,
            cover: newCover
        }

        onUpdateTask(task.idBoard, updatedTaskFields)
    }

    async function handleImageUploaded(imgUrl, fileName, format) {
        const idAttachmentCover = makeId()

        let edgeColor = ""
        try {
            const color = await fac.getColorAsync(imgUrl)
            edgeColor = color.hex
        } catch (error) {
            console.error("Could not calculate average color:", error)
            edgeColor = "#ffffff"
        }

        const newAttachment = {
            _id: idAttachmentCover,
            date: Date.now(),
            edgeColor,
            idMember: "",
            isUpload: true,
            name: `${fileName}.${format}`,
            url: imgUrl
        }

        const updatedTask = {
            ...task,
            idAttachmentCover,
            cover: {
                url: imgUrl,
                edgeColor,
                idAttachment: idAttachmentCover
            },
            attachments: [...(task.attachments || []), newAttachment]
        };

        onUpdateTask(task.idBoard, updatedTask)

        setSelectedAttachmentId(idAttachmentCover)
        setSelectedColorKey(null)
    }

    const coverAttachments = task?.attachments || []

    return (
        <section className="cover-picker">
            <header className="picker-header">
                <h2 className="picker-title">Cover</h2>
            </header>
            <div className="cover-editor">
                {(selectedAttachmentId || selectedColorKey) && (
                    <div className="cover-preview">
                        {selectedColorKey &&
                            <div
                                className="cover-color"
                                style={{ backgroundColor: coverColorsMap[selectedColorKey] }}
                            >
                            </div>}

                        {selectedAttachmentId &&
                            <img
                                src={coverAttachments.find(attachment => attachment._id === selectedAttachmentId)?.url}
                                alt=""
                            />}
                    </div>
                )}
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
                            const attachmentCoverClassName =
                                selectedAttachmentId === attachment._id ?
                                    'attachment-preview selected' :
                                    'attachment-preview'

                            return <div
                                key={attachment._id}
                                className={attachmentCoverClassName}
                                onClick={() => onSelectAttachment(attachment._id)}
                            >
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