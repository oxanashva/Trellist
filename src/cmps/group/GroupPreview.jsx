import { useState } from "react"

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useFocusOnStateChange } from "../../customHooks/useFocusOnStateChange"

import PlusIcon from '../../assets/images/icons/plus.svg?react'
import MoreIcon from '../../assets/images/icons/more.svg?react'
import { TaskList } from "../task/TaskList"
import { DynamicPicker } from "../task/picker/DynamicPicker"

export function GroupPreview({ id, board, group, tasks, onRemoveGroup, onUpdateGroup, onAddTask, onCompleteTask }) {
    const [groupName, setGroupName] = useState(group.name)
    const [isEditing, setIsEditing] = useState(false)
    const [isAddingTask, setIsAddingTask] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const openPopover = Boolean(anchorEl)
    const [picker, setPicker] = useState(null)

    const inputRef = useFocusOnStateChange(isEditing)

    const PICKER_MAP = {
        ACTION: {
            type: "ActionPicker",
            info: {
                label: "Actions: ",
                propName: "actions",
            }
        }
    }

    const handlePopoverOpen = (event, pickerType) => {
        setAnchorEl(event.currentTarget)
        setPicker(pickerType)
    };

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }

    function handleInput({ target }) {
        const { name, value } = target

        if (name === 'groupName') {
            setGroupName(value)
        }
    }

    function handleInputBlur() {
        if (groupName !== group.name) {
            const updatedGroup = { ...group, name: groupName }
            onUpdateGroup(updatedGroup)
        }
        setIsEditing(false)
    }

    function onGroupNameKeyDown(ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            ev.target.blur()
        }
        if (ev.key === 'Escape') {
            setGroupName(group.name)
            setIsEditing(false)
        }
    }

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <>
            {picker && (
                <DynamicPicker
                    picker={picker}
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    setIsAddingTask={setIsAddingTask}
                    groupId={group._id}
                    onRemoveGroup={onRemoveGroup}
                />
            )}
            <li
                ref={setNodeRef}
                style={style}
                className="group-preview"
                {...attributes}
            >
                <div className="group-header">
                    <div className="group-title" {...listeners}>
                        {/* TODO: implement reusable component for editable field */}
                        {!isEditing &&
                            <h2
                                className="editable"
                                onClick={(e) => {
                                    //Stop the event from propagating up to dnd-kit's listeners 
                                    // to ensure the click is registered for editing.
                                    e.stopPropagation()
                                    setIsEditing(true)
                                }}
                                title="Edit group name"
                            >
                                {group.name}
                            </h2>
                        }
                        {isEditing &&
                            <input
                                ref={inputRef}
                                className="editable"
                                type="text"
                                name="groupName"
                                value={groupName}
                                onChange={handleInput}
                                onBlur={handleInputBlur}
                                onKeyDown={onGroupNameKeyDown}
                            />
                        }
                    </div>
                    <div className="group-actions">
                        <button
                            className="dynamic-btn"
                            title="List actions"
                            onClick={(event) => {
                                handlePopoverOpen(event, PICKER_MAP.ACTION)
                            }}
                        >
                            <MoreIcon width={16} height={16} fill="currentColor" />
                        </button>
                    </div>
                </div>
                <div className="group-task-gap"></div>
                <TaskList
                    board={board}
                    group={group}
                    tasks={tasks}
                    onCompleteTask={onCompleteTask}
                    onAddTask={onAddTask}
                    isAddingTask={isAddingTask}
                    setIsAddingTask={setIsAddingTask}
                />
                {
                    !isAddingTask &&
                    <div className="group-footer">
                        <button className="dynamic-btn" onClick={() => setIsAddingTask(true)}>
                            <PlusIcon width={16} height={16} fill="currentColor" />
                            <span>Add a task</span>
                        </button>
                    </div>
                }
            </li>
        </>
    )
}