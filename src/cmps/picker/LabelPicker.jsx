import { useState } from 'react'
import { labelsColorsMap, makeId } from '../../services/util.service'
import ShevronLeft from '../../assets/images/icons/shevron-left.svg?react'
import PenIcon from '../../assets/images/icons/pen.svg?react'
import { useSelector } from 'react-redux'

export function LabelPicker({ task, onUpdateTask, onAddLabel, onUpdateLabel, onRemoveLabel }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const boardLabels = board?.labels || []

  const [selectedLabels, setSelectedLabels] = useState(task?.idLabels || [])
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [labelName, setLabelName] = useState('')
  const [selectedColorKey, setSelectedColorKey] = useState(null)
  const [labelToEdit, setLabelToEdit] = useState(null)
  const [confirmRemove, setConfirmRemove] = useState(false)

  const currentPreviewColorKey =
    selectedColorKey ||
    (labelToEdit && labelToEdit.color) ||
    (isCreating && Object.keys(labelsColorsMap)[0])

  function handleLabelToggle(labelId) {
    const isCurrentlySelected = selectedLabels.includes(labelId)
    const newSelectedLabels = isCurrentlySelected
      ? selectedLabels.filter((id) => id !== labelId)
      : [...selectedLabels, labelId]

    setSelectedLabels(newSelectedLabels)

    const fieldsToUpdate = {
      idLabels: newSelectedLabels,
    }

    onUpdateTask(task.idBoard, task._id, fieldsToUpdate)
  }

  async function createLabel() {
    const newLabel = {
      _id: makeId(),
      idBoard: task.idBoard,
      name: labelName,
      color: selectedColorKey,
    }

    const newSelectedLabels = [...(selectedLabels || []), newLabel._id]

    setSelectedLabels(newSelectedLabels)
    setIsCreating(false)
    setLabelName('')
    setSelectedColorKey(null)

    await onAddLabel(newLabel)

    const fieldsToUpdate = {
      idLabels: newSelectedLabels,
    }

    await onUpdateTask(task.idBoard, task._id, fieldsToUpdate)
  }

  async function editLabel() {
    const updatedLabel = {
      ...labelToEdit,
      name: labelName,
      color: selectedColorKey,
    }

    setIsEditing(false)
    setLabelName('')
    setLabelToEdit(null)
    setSelectedColorKey(null)

    await onUpdateLabel(updatedLabel)
  }

  function confirmRemoveLabel() {
    setConfirmRemove(true)
    setIsCreating(false)
    setIsEditing(false)
  }

  async function removeLabel(labelId) {
    const newIdLabels = task.idLabels.filter((id) => id !== labelId)

    setIsEditing(false)
    setLabelName('')
    setLabelToEdit(null)
    setSelectedColorKey(null)
    setConfirmRemove(false)

    const fieldsToUpdate = { idLabels: newIdLabels }
    await onUpdateTask(task.idBoard, task._id, fieldsToUpdate)

    await onRemoveLabel(labelId)
  }

  return (
    <section className="label-picker">
      <header className="picker-header">
        <h2 className="picker-title">
          {isEditing
            ? 'Edit labels'
            : isCreating
              ? 'Create labels'
              : confirmRemove
                ? 'Delete label'
                : 'Label'}
        </h2>

        {(isEditing || isCreating || confirmRemove) && (
          <button
            className="icon-btn dynamic-btn previous-btn"
            onClick={() => {
              setIsEditing(false)
              setIsCreating(false)
              setLabelName('')
              setSelectedColorKey(null)
              setLabelToEdit(null)
              setConfirmRemove(false)
            }}
          >
            <ShevronLeft width={16} height={16} fill="currentColor" />
          </button>
        )}
      </header>

      <div className="picker-container label-editor">
        {/* Displaying existing task labels */}
        {!isEditing && !isCreating && !confirmRemove && (
          <div className="label-editor-content">
            {boardLabels?.map((label) => {
              return (
                <div className="label-container" key={label._id}>
                  <label className="label-item" key={label._id} htmlFor={label._id}>
                    <input
                      id={label._id}
                      type="checkbox"
                      name="label"
                      checked={selectedLabels.includes(label._id)}
                      onChange={() => handleLabelToggle(label._id)}
                    />
                    <span className="label-checkbox">
                      <span
                        style={{ backgroundColor: labelsColorsMap[label.color] }}
                        className="label-box"
                      >
                        {label.name}
                      </span>
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
        )}

        {/* Create/Edit a label view */}
        {(isEditing || isCreating) && (
          <>
            <div className="label-editor-content">
              <div className="label-preview-container">
                <div
                  style={{
                    backgroundColor:
                      labelsColorsMap[currentPreviewColorKey] || currentPreviewColorKey,
                  }}
                  className="label-box"
                >
                  {labelName}
                </div>
              </div>

              <h3 className="picker-subtitle">Title</h3>
              <input
                value={labelName}
                onChange={(ev) => setLabelName(ev.target.value)}
                type="text"
              />

              <h3 className="picker-subtitle">Select a color</h3>
              <ul className="label-colors-container">
                {Object.keys(labelsColorsMap).map((colorKey, idx) => (
                  <li
                    key={colorKey}
                    className={`label-colors-item ${currentPreviewColorKey === colorKey ? 'selected' : ''}`}
                  >
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
        )}

        {/* Actions */}
        {!isEditing && !isCreating && !confirmRemove && (
          <button
            className="btn-neutral create-label-btn"
            onClick={() => {
              setIsCreating(true)
              setLabelName('')
              setSelectedColorKey(Object.keys(labelsColorsMap)[0]) // Default color
              setLabelToEdit({ _id: makeId(), name: '', color: Object.keys(labelsColorsMap)[0] })
            }}
          >
            Create a new label
          </button>
        )}

        {isEditing && (
          <>
            <div className="label-editor-actions">
              <button className="btn-primary" onClick={editLabel}>
                Save
              </button>
              <button className="btn-danger" onClick={confirmRemoveLabel}>
                Delete
              </button>
            </div>
          </>
        )}

        {confirmRemove && !isCreating && !isEditing && (
          <div className="label-editor-content confirm-content">
            <div className="confirm-text">
              <p>This will remove this label from all cards.</p>
              <p> There is no undo.</p>
            </div>
            <button className="btn-danger" onClick={() => removeLabel(labelToEdit._id)}>
              Delete
            </button>
          </div>
        )}

        {isCreating && (
          <div className="label-editor-actions">
            <button className="btn-primary" onClick={createLabel}>
              Create
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
