import { useState } from 'react'

import CircleIcon from '../../assets/images/icons/circle.svg?react'
import CircleCheckIcon from '../../assets/images/icons/circle-check.svg?react'
import EditIcon from '../../assets/images/icons/edit.svg?react'

export function CardPreview({ card, isAddingCard }) {
    const [isChecked, setIsChecked] = useState(false)

    function handleCheck() {
        // TODO: Update card state (card.closed)
        setIsChecked(!isChecked)
    }

    return (
        <li className="card-preview">
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
        </li>
    )
}