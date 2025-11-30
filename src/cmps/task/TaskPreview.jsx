import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router"
import { Link } from 'react-router'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import dayjs from "dayjs"
import { getDueStatusBadge } from "../../services/task/task.utils"

import CircleIcon from '../../assets/images/icons/circle.svg?react'
import CircleCheckIcon from '../../assets/images/icons/circle-check.svg?react'
import EditIcon from '../../assets/images/icons/edit.svg?react'
import DescriptionIcon from '../../assets/images/icons/description.svg?react'
import CommentIcon from '../../assets/images/icons/comment.svg?react'
import ThumbsUpIcon from '../../assets/images/icons/thumbs-up.svg?react'
import ClockIcon from '../../assets/images/icons/clock.svg?react'


export function TaskPreview({ id, board, task, onCompleteTask }) {
    const { boardId } = useParams()
    const [isChecked, setIsChecked] = useState(task.closed || false)
    const navigate = useNavigate()

    const comments = board?.actions.filter(action => {
        return action.data.idTask === task._id
    })

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

    function handleCheck(e) {
        e.stopPropagation()
        e.preventDefault()

        const newStatus = !isChecked
        setIsChecked(newStatus)
        onCompleteTask(task, newStatus)
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
            {/* Use div instead of Link so we resolve conflict with dnd-kit */}
            <div
                className="task-wrapper"
                onClick={() => {
                    navigate(`/board/${boardId}/task/${task._id}`)
                }}
            >
                <div className="task-header">
                    {task.cover?.sharedSourceUrl &&
                        <div className="cover-img" >
                            <img src={task.cover.sharedSourceUrl} alt="card-image" />
                        </div>
                    }
                    <div className="task-name">
                        <div className="task-state" onClick={handleCheck}>
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
                    {comments.length !== 0 &&
                        <span className="badge">
                            <CommentIcon width={16} height={16} fill="currentColor" />
                            <span>{comments.length}</span>
                        </span>
                    }
                </div>
                <button className="edit-btn">
                    <EditIcon width={16} height={16} fill="currentColor" />
                </button>
            </div>
        </li>
    )
}