import { useEffect, useRef, useState } from "react"

import { makeId } from "../../services/util.service"

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import PlusIcon from '../../assets/images/icons/plus.svg?react'
import { TaskList } from "../task/TaskList"

export function GroupPreview({ id, board, group, tasks, onAddTask, onCompleteTask, onUpdateGroup }) {
    const inputRef = useRef(null)
    const [groupName, setGroupName] = useState(group.name)
    const [isEditing, setIsEditing] = useState(false)
    const [isAddingTask, setIsAddingTask] = useState(false)

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }
    }, [isEditing])

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
                            onClick={() => setIsEditing(true)}
                            title="Edit group name"
                        >
                            {group.name}
                        </h2>
                    }
                    {isEditing &&
                        <input
                            ref={inputRef}
                            type="text"
                            name="groupName"
                            value={groupName}
                            onChange={handleInput}
                            onBlur={handleInputBlur}
                            onKeyDown={onGroupNameKeyDown}
                        />
                    }
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
    )
}