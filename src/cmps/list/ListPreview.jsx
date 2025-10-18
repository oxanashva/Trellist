import { useEffect, useRef, useState } from "react"

import { CardPreview } from "../card/CardPreview";

import Plus from '../../assets/images/icons/plus.svg?react'

export function ListPreview({ list, cards }) {
    const inputRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }
    }, [isEditing])

    function handleTitleClick() {
        setIsEditing(true)
    }

    function handleInputBlur() {
        setIsEditing(false);
    }

    const h2ClassName = `${isEditing ? 'hidden' : ''}`
    const inputClassName = `${isEditing ? '' : 'hidden'}`

    return (
        <li className="list-preview">
            <div className="list-header">
                <div className="list-title">
                    <h2
                        className={h2ClassName}
                        onClick={handleTitleClick}
                    >
                        {list.name}
                    </h2>
                    <input
                        ref={inputRef}
                        className={inputClassName}
                        type="text"
                        // TODO: add dynamic value
                        value="listname"
                        onBlur={handleInputBlur}
                    />
                </div>
            </div>
            <div className="list-card-gap"></div>
            <ol>
                {cards.map(card =>
                    <CardPreview key={card._id} card={card} />
                )}
            </ol>
            <div className="list-footer">
                <button className="dynamic-btn">
                    <Plus width={16} height={16} fill="currentColor" />
                    <span>Add a card</span>
                </button>
            </div>
        </li>
    )
}