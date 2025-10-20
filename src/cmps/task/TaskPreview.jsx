import { useEffect, useState } from 'react'
import { useParams } from "react-router"

import CircleIcon from '../../assets/images/icons/circle.svg?react'
import CircleCheckIcon from '../../assets/images/icons/circle-check.svg?react'
import EditIcon from '../../assets/images/icons/edit.svg?react'
import { Link } from 'react-router'

export function TaskPreview({ task, onCompleteTask }) {
    const { boardId } = useParams()
    const [isChecked, setIsChecked] = useState(task.closed || false)

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
                        <div className="task-state" onClick={handleCheck}>
                            {isChecked
                                ? <span style={{ color: "#6A9A23" }} title="Mark incomplete"><CircleCheckIcon width={16} height={16} fill="currentColor" /></span>
                                : <span title="Mark complete"><CircleIcon width={16} height={16} fill="currentColor" /></span>}
                        </div>
                        <span>{task.name}</span>
                    </div>
                    <button className="edit-btn">
                        <EditIcon width={16} height={16} fill="currentColor" />
                    </button>
                </div>
            </Link>
        </li>
    )
}