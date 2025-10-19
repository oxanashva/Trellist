import { useEffect, useRef, useState } from "react"

import { makeId } from "../../services/util.service"
import { CardPreview } from "../card/CardPreview"

import PlusIcon from '../../assets/images/icons/plus.svg?react'
import CloseIcon from '../../assets/images/icons/close.svg?react'

export function ListPreview({ board, list, cards, onAddCard }) {
    const inputRef = useRef(null)
    const textareaRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)
    const [cardName, setCardName] = useState('')
    const [isAddingCard, setIsAddingCard] = useState(false)

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }

        if (isAddingCard) {
            textareaRef.current?.focus()
        }

        if (!isAddingCard) {
            return
        }
    }, [isEditing, isAddingCard])

    function handleInput({ target }) {
        setCardName(target.value)
    }

    function handleTitleClick() {
        setIsEditing(true)
    }

    function handleInputBlur() {
        setIsEditing(false);
    }

    function addCard(e) {
        e.preventDefault()
        if (!cardName) return

        const newCard = {
            _id: makeId(),
            idBoard: board._id,
            idList: list._id,
            name: cardName
        }
        onAddCard(newCard)
        setCardName('')
        setIsAddingCard(false)
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
                {isAddingCard &&
                    <li className="add-card-form">
                        <form onSubmit={onAddCard}>
                            <textarea
                                ref={textareaRef}
                                className="add-card-textarea"
                                onChange={handleInput}
                                value={cardName}
                                placeholder="Enter a title or paste a link"
                            />
                            <div className="add-card-actions">
                                <button
                                    className="btn-primary"
                                    type="submit"
                                    onClick={addCard}
                                >
                                    Add card
                                </button>
                                <button
                                    className="icon-btn dynamic-btn"
                                    onClick={() => setIsAddingCard(false)}
                                >
                                    <CloseIcon width={16} height={16} fill="currentColor" />
                                </button>
                            </div>
                        </form>
                    </li>
                }
            </ol>
            {!isAddingCard &&
                <div className="list-footer">
                    <button className="dynamic-btn" onClick={() => setIsAddingCard(true)}>
                        <PlusIcon width={16} height={16} fill="currentColor" />
                        <span>Add a card</span>
                    </button>
                </div>
            }
        </li>
    )
}