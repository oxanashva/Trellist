import { useState } from "react" // Removed useEffect as it's not needed for this logic
import { labelsColorsMap, makeId } from "../../services/util.service"
import ShevronLeft from '../../assets/images/icons/shevron-left.svg?react'
import PenIcon from "../../assets/images/icons/pen.svg?react"

const allAvailableLabels = Object.keys(labelsColorsMap).map((colorKey, idx) => ({
    _id: makeId(),
    name: "",
    color: colorKey,
}))

export function LabelPicker({ task, onUpdateTask, onClose }) {
    const [hasLabels, setHasLabels] = useState(task.labels.length > 0)
    const [isEditing, setIsEditing] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [labelName, setLabelName] = useState("")
    const [selectedColorKey, setSelectedColorKey] = useState(null)
    const [labelToEdit, setLabelToEdit] = useState(null)

    const currentPreviewColorKey = selectedColorKey || (labelToEdit && labelToEdit.color) || Object.keys(labelsColorsMap)[0]

    return (
        <section className="label-picker">
            <header className="picker-header">
                <h2 className="picker-title">{isEditing ? "Edit labels" : isCreating ? "Create labels" : "Labels"}</h2>

                {(isEditing || isCreating) && (
                    <button
                        className="icon-btn dynamic-btn previous-btn"
                        onClick={() => {
                            setIsEditing(false)
                            setIsCreating(false)
                            setLabelName("")
                            setSelectedColorKey(null)
                            setLabelToEdit(null)
                        }}>
                        <ShevronLeft width={16} height={16} fill="currentColor" />
                    </button>
                )}
            </header>

            <div className="picker-container label-editor">
                {/* Displaying existing task labels */}
                {hasLabels && !isEditing && !isCreating &&
                    <div className="label-editor-content">
                        {task.labels.map((label) => {
                            const labelHexColor = labelsColorsMap[label.color]
                            return (
                                <div className="label-container" key={label._id}>
                                    <label className="label-item" key={label._id} htmlFor={label._id}>
                                        <input type="checkbox" name="label" id={label._id} />
                                        <span className="label-checkbox">
                                            <span style={{ backgroundColor: labelHexColor }} className="label-box">{label.name}</span>
                                        </span>
                                    </label>
                                    <button
                                        className="icon-btn dynamic-btn"
                                        onClick={() => {
                                            setLabelToEdit(label)
                                            setLabelName(label.name)
                                            setSelectedColorKey(label.color)
                                            setIsEditing(true)
                                        }}
                                    >
                                        <PenIcon width={16} height={16} fill="currentColor" />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                }

                {/* Displaying all available labels if task has none */}
                {!hasLabels && !isEditing && !isCreating &&
                    <div className="label-editor-content">
                        {allAvailableLabels.map((label) => {
                            const labelHexColor = labelsColorsMap[label.color]
                            return (
                                <div className="label-container" key={label._id}>
                                    <label className="label-item" key={label._id} htmlFor={label._id}>
                                        <input type="checkbox" name="label" id={label._id} />
                                        <span className="label-checkbox">
                                            <span style={{ backgroundColor: labelHexColor }} className="label-box">{label.name}</span>
                                        </span>
                                    </label>
                                    <button
                                        className="icon-btn dynamic-btn"
                                        onClick={() => {
                                            setLabelToEdit(label)
                                            setLabelName(label.name)
                                            setSelectedColorKey(label.color)
                                            setIsEditing(true)
                                        }}
                                    >
                                        <PenIcon width={16} height={16} fill="currentColor" />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                }

                {/* Create/Edit a label view */}
                {(isEditing || isCreating) &&
                    <>
                        <div className="label-editor-content">
                            <div className="label-preview-container">
                                <div
                                    style={{ backgroundColor: labelsColorsMap[currentPreviewColorKey] }}
                                    className="label-box"
                                >
                                    {labelName}
                                </div>
                            </div>

                            <h3 className="picker-subtitle">Title</h3>
                            <input
                                value={labelName}
                                onChange={(ev) => setLabelName(ev.target.value)}
                                type="text" />

                            <h3 className="picker-subtitle">Select a color</h3>
                            <ul className="label-colors-container">
                                {Object.keys(labelsColorsMap).map((colorKey, idx) => (
                                    <li className={`label-colors-item ${currentPreviewColorKey === colorKey ? 'selected' : ''}`}>
                                        <button
                                            key={colorKey}
                                            className={`label-colors-btn`}
                                            onClick={() => setSelectedColorKey(colorKey)}
                                            style={{ backgroundColor: labelsColorsMap[colorKey] }}
                                        ></button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                }

                {/* Actions */}
                {!isEditing && !isCreating &&
                    <button
                        className="btn-neutral create-label-btn"
                        onClick={() => {
                            setIsCreating(true)
                            setLabelName("")
                            setSelectedColorKey(Object.keys(labelsColorsMap)[0]) // Default color
                            setLabelToEdit({ _id: makeId(), name: "", color: Object.keys(labelsColorsMap)[0] })
                        }}
                    >
                        Create a new label
                    </button>
                }

                {isEditing &&
                    <>
                        <div className="label-editor-actions">
                            <button
                                className="btn-primary"
                                onClick={onClose} // In a real app, this should save the label: onSaveLabel(labelToEdit, labelName, currentPreviewColorKey)
                            >
                                Save
                            </button>
                            <button
                                className="btn-danger"
                                onClick={onClose} // In a real app, this should delete the label
                            >
                                Delete
                            </button>
                        </div>
                    </>
                }

                {isCreating &&
                    <div className="label-editor-actions">
                        <button
                            className="btn-primary"
                            onClick={onClose} // In a real app, this should create the new label
                        >
                            Create
                        </button>
                    </div>
                }
            </div>
        </section>
    )
}