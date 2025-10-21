import { useEffect, useState } from 'react'
import { useParams } from "react-router"
import { Link } from 'react-router'

import CircleIcon from '../../assets/images/icons/circle.svg?react'
import CircleCheckIcon from '../../assets/images/icons/circle-check.svg?react'
import EditIcon from '../../assets/images/icons/edit.svg?react'
import DescriptionIcon from '../../assets/images/icons/description.svg?react'
import CommentIcon from '../../assets/images/icons/comment.svg?react'

export function TaskPreview({ board, task, onCompleteTask }) {
    const { boardId } = useParams()
    const [isChecked, setIsChecked] = useState(task.closed || false)

    const comments = board?.actions.filter(action => {
        return action.data.idTask === task._id
    })

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

    return (
        <li className="task-preview">
            <Link to={`/board/${boardId}/task/${task._id}`}>
                <div className="task-wrapper">
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
            </Link>
        </li>
    )
}