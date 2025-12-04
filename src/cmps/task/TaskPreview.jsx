import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router"
import { removeTask } from '../../store/actions/board.actions'
import { updateTask } from '../../store/actions/board.actions'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import dayjs from "dayjs"
import { getDueStatusBadge } from "../../services/task/task.utils"

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

import CircleIcon from '../../assets/images/icons/circle.svg?react'
import CircleCheckIcon from '../../assets/images/icons/circle-check.svg?react'
import EditIcon from '../../assets/images/icons/edit.svg?react'
import ArchiveIcon from '../../assets/images/icons/archive.svg?react'
import DescriptionIcon from '../../assets/images/icons/description.svg?react'
import CommentIcon from '../../assets/images/icons/comment.svg?react'
import ThumbsUpIcon from '../../assets/images/icons/thumbs-up.svg?react'
import ClockIcon from '../../assets/images/icons/clock.svg?react'

import { labelsColorsMap } from '../../services/util.service'


export function TaskPreview({ id, task, taskActions }) {
    const { boardId } = useParams()
    const [isChecked, setIsChecked] = useState(task.closed || false)
    const navigate = useNavigate()

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

    useEffect(() => {
        setIsChecked(task.closed || false)
    }, [task.closed])

    async function onUpdateTask(e) {
        e.stopPropagation()
        e.preventDefault()

        const newStatus = !task.closed
        setIsChecked(prev => !prev)

        try {
            const updatedTask = { ...task, closed: newStatus }
            await updateTask(boardId, updatedTask)
            showSuccessMsg('Task updated')
        } catch (err) {
            showErrorMsg('Cannot update task')
        }

    }

    async function onRemoveTask(e) {
        e.stopPropagation()
        e.preventDefault()

        try {
            await removeTask(boardId, task._id)
            showSuccessMsg('Task removed')
        } catch (err) {
            showErrorMsg('Cannot remove task')
        }
    }

    const badgeInfo = getDueStatusBadge(task?.due, task?.dueTime)

    return (
        <li
            ref={setNodeRef}
            style={style}
            className="task-preview"
            {...attributes}
            {...listeners}
        >
            {task.cover?.sharedSourceUrl &&
                <div className="cover-img" >
                    <img src={task.cover.sharedSourceUrl} alt="card-image" />
                </div>
            }
            {/* Use div instead of Link so we resolve conflict with dnd-kit */}
            <div
                className="task-wrapper"
                onClick={() => {
                    navigate(`/board/${boardId}/task/${task._id}`)
                }}
            >
                <div className="task-header">
                    {task.idLabels?.length !== 0 &&
                        <div className="task-labels">
                            {task.labels?.map(label => {
                                if (task.idLabels?.includes(label._id)) {
                                    return (
                                        <span
                                            key={label._id}
                                            style={{ backgroundColor: labelsColorsMap[label.color] || "#CCCCCC" }}
                                            className="task-label"
                                            title={label.name}
                                        >
                                        </span>
                                    )
                                }
                            }

                            )}
                        </div>
                    }
                    <div className="task-name">
                        <div className="task-state" onClick={onUpdateTask}>
                            {isChecked
                                ? <span style={{ color: "#6A9A23" }} title="Mark incomplete"><CircleCheckIcon width={16} height={16} fill="currentColor" /></span>
                                : <span title="Mark complete"><CircleIcon width={16} height={16} fill="currentColor" /></span>}
                        </div>
                        <span>{task.name}</span>
                    </div>
                </div>

                {/* TODO: update task.badges on add comment/description or another action and use them to conditionally render */}
                <div className="task-badges">
                    {task.idMembersVoted?.length !== 0 &&
                        <span className="badge">
                            <ThumbsUpIcon width={16} height={16} fill="currentColor" />
                            <span>{task.idMembersVoted?.length}</span>
                        </span>
                    }
                    {(task?.start || task?.due) &&

                        <span className={`badge ${task.closed ? "badge-closed" : badgeInfo?.className}`}>
                            <ClockIcon width={16} height={16} fill="currentColor" />
                            {task.start && !task.due && "Started: "}
                            {task.start ? dayjs(task.start).format("MMM DD") : ""}
                            {task.start && task.due && " - "}
                            {task.due ? dayjs(task.due).format("MMM DD") : ""}
                        </span>
                    }
                    {task.desc &&
                        <span>
                            <DescriptionIcon width={16} height={16} fill="currentColor" />
                        </span>
                    }
                    {taskActions.length !== 0 &&
                        <span className="badge">
                            <CommentIcon width={16} height={16} fill="currentColor" />
                            <span>{taskActions.length}</span>
                        </span>
                    }
                </div>
                <button
                    className="task-btn edit-btn"
                    onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/board/${boardId}/task/${task._id}`)
                    }}>
                    <EditIcon width={16} height={16} fill="currentColor" />
                </button>
                <button
                    className="task-btn archive-btn"
                    onClick={onRemoveTask}>
                    <ArchiveIcon width={16} height={16} fill="currentColor" />
                </button>
            </div>
        </li>
    )
}