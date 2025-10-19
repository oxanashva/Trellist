import { useEffect, useRef, useState } from "react"

import { updateBoard } from "../../store/actions/board.actions";

import { CardPreview } from "../card/CardPreview";

import Plus from '../../assets/images/icons/plus.svg?react'
import CloseIcon from '../../assets/images/icons/close.svg?react'

export function ListPreview({ board, list, cards }) {
    const inputRef = useRef(null)
    const textareaRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)
    // const [listName, setListName] = useState(list.name)
    const [cardName, setCardName] = useState('')
    const [isAddingCard, setIsAddingCard] = useState(false)

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }
        if (isAddingCard) {
            textareaRef.current?.focus()
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

    function handleTextareaBlur() {
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 0)
    }

    function onAddCard(e) {
        e.preventDefault()
        if (!cardName) return
        // TODO: update cards state
        updateBoard({
            ...board,
            cards: [...board.cards, { name: cardName }]
        })
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
                                onBlur={handleTextareaBlur}
                                value={cardName}
                                placeholder="Enter a title or paste a link"
                            />
                            <div className="add-card-actions">
                                <button
                                    className="btn-primary"
                                    type="submit"
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
                        <Plus width={16} height={16} fill="currentColor" />
                        <span>Add a card</span>
                    </button>
                </div>
            }
        </li>
    )
}