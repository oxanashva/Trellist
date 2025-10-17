import { useEffect, useRef, useState } from "react"

import { ListPreview } from "./ListPreview"

import Plus from '../../assets/images/icons/plus.svg?react'

export function ListList({ lists, cards }) {
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

    const h2ClassName = `list-title ${isEditing ? 'hidden' : ''}`
    const inputClassName = `list-title ${isEditing ? '' : 'hidden'}`

    return (
        <section className="list-list">
            <ol className="lists">
                {lists.map(list => {
                    const cardsForThisList = cards.filter(card => card.idList === list._id)
                    return <li key={list._id}>
                        <div className="list-header">
                            <div>
                                <h1
                                    className={h2ClassName}
                                    onClick={handleTitleClick}
                                >
                                    {list.name}
                                </h1>
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
                        <ListPreview cards={cardsForThisList} />
                        <div className="list-footer">
                            <button>
                                <Plus width={24} height={24} fill="currentColor" />
                                <span>Add a card</span>
                            </button>
                        </div>
                    </li>
                }
                )}
            </ol>
        </section>
    )
}