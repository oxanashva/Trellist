import { useEffect, useRef, useState } from "react"

import { makeId } from "../../services/util.service"
import { TaskPreview } from "../task/TaskPreview"

import PlusIcon from '../../assets/images/icons/plus.svg?react'
import CloseIcon from '../../assets/images/icons/close.svg?react'

export function GroupPreview({ board, group, tasks, onAddTask, onCompleteTask, onUpdateGroup }) {
    const inputRef = useRef(null)
    const textareaRef = useRef(null)
    const [groupName, setGroupName] = useState(group.name)
    const [isEditing, setIsEditing] = useState(false)
    const [taskName, setTaskName] = useState('')
    const [isAddingTask, setIsAddingTask] = useState(false)

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }

        if (isAddingTask) {
            textareaRef.current?.focus()
        }

        if (!isAddingTask) {
            return
        }
    }, [isEditing, isAddingTask])

    function handleInput({ target }) {
        const { name, value } = target

        if (name === 'groupName') {
            setGroupName(value)
        } else if (name === 'taskName') {
            setTaskName(value)
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

    function addTask(e) {
        e.preventDefault()
        if (!taskName) return

        const newTask = {
            _id: makeId(),
            idBoard: board._id,
            idGroup: group._id,
            name: taskName
        }
        onAddTask(newTask)
        setTaskName('')
        setIsAddingTask(false)
    }

    return (
        <li className="group-preview">
            <div className="group-header">
                <div className="group-title">
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
            <ol>
                {tasks.map(task =>
                    <TaskPreview key={task._id} task={task} onCompleteTask={onCompleteTask} />
                )}
                {isAddingTask &&
                    <li className="add-task-form">
                        <form onSubmit={onAddTask}>
                            <textarea
                                ref={textareaRef}
                                className="add-task-textarea"
                                name="taskName"
                                value={taskName}
                                onChange={handleInput}
                                placeholder="Enter a title or paste a link"
                            />
                            <div className="add-task-actions">
                                <button
                                    className="btn-primary"
                                    type="submit"
                                    onClick={addTask}
                                >
                                    Add task
                                </button>
                                <button
                                    className="icon-btn dynamic-btn"
                                    onClick={() => setIsAddingTask(false)}
                                >
                                    <CloseIcon width={16} height={16} fill="currentColor" />
                                </button>
                            </div>
                        </form>
                    </li>
                }
            </ol>
            {!isAddingTask &&
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