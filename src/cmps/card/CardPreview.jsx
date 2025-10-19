import { useState } from 'react'
import { useParams } from "react-router"

import CircleIcon from '../../assets/images/icons/circle.svg?react'
import CircleCheckIcon from '../../assets/images/icons/circle-check.svg?react'
import EditIcon from '../../assets/images/icons/edit.svg?react'
import { Link } from 'react-router'

export function CardPreview({ card, onCompleteTask }) {
    const { boardId } = useParams()
    const [isChecked, setIsChecked] = useState(card.closed || false)

    function handleCheck() {
        const newStatus = !isChecked
        setIsChecked(newStatus)
        onCompleteTask(card, newStatus)
    }

    return (
        <li className="card-preview">
            <Link to={`/board/${boardId}/card/${card._id}`}>
                <div className="card-wrapper">
                    <div className="card-header">
                        <div className="card-state" onClick={handleCheck}>
                            {isChecked
                                ? <span style={{ color: "#6A9A23" }} title="Mark incomplete"><CircleCheckIcon width={16} height={16} fill="currentColor" /></span>
                                : <span title="Mark complete"><CircleIcon width={16} height={16} fill="currentColor" /></span>}
                        </div>
                        <span>{card.name}</span>
                    </div>
                    <button className="edit-btn">
                        <EditIcon width={16} height={16} fill="currentColor" />
                    </button>
                </div>
            </Link>
        </li>
    )
}