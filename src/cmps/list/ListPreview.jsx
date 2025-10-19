import { useEffect, useRef, useState } from "react"

import { makeId } from "../../services/util.service"
import { CardPreview } from "../card/CardPreview"

import PlusIcon from '../../assets/images/icons/plus.svg?react'
import CloseIcon from '../../assets/images/icons/close.svg?react'

export function ListPreview({ board, list, cards, onAddCard, onCompleteTask, onUpdateList }) {
    const inputRef = useRef(null)
    const textareaRef = useRef(null)
    const [listName, setListName] = useState(list.name)
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
        const { name, value } = target

        if (name === 'listName') {
            setListName(value)
        } else if (name === 'cardName') {
            setCardName(value)
        }
    }

    function handleInputBlur() {
        if (listName !== list.name) {
            const updatedList = { ...list, name: listName }
            onUpdateList(updatedList)
        }
        setIsEditing(false)
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
                        onClick={() => setIsEditing(true)}
                    >
                        {list.name}
                    </h2>
                    <input
                        ref={inputRef}
                        className={inputClassName}
                        type="text"
                        name="listName"
                        value={listName}
                        onChange={handleInput}
                        onBlur={handleInputBlur}
                        onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                ev.preventDefault()
                                ev.target.blur()
                            }
                            if (ev.key === 'Escape') {
                                setListName(listName)
                                setIsEditing(false)
                            }
                        }}
                    />
                </div>
            </div>
            <div className="list-card-gap"></div>
            <ol>
                {cards.map(card =>
                    <CardPreview key={card._id} card={card} onCompleteTask={onCompleteTask} />
                )}
                {isAddingCard &&
                    <li className="add-card-form">
                        <form onSubmit={onAddCard}>
                            <textarea
                                ref={textareaRef}
                                className="add-card-textarea"
                                name="cardName"
                                value={cardName}
                                onChange={handleInput}
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