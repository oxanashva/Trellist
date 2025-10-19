import { useEffect, useRef, useState } from "react"

import { makeId } from "../../services/util.service"
import { ListPreview } from "./ListPreview"

import PlusIcon from '../../assets/images/icons/plus.svg?react'
import CloseIcon from '../../assets/images/icons/close.svg?react'

export function ListList({ board, lists, cards, onAddCard, onAddList, onCompleteTask }) {
    const [listName, setListName] = useState('')
    const [isAddingList, setIsAddingList] = useState(false)
    const textareaRef = useRef(null)


    useEffect(() => {
        if (isAddingList) {
            textareaRef.current?.focus()
        }
    }, [isAddingList])

    function handleInput({ target }) {
        setListName(target.value)
    }

    function addList(e) {
        e.preventDefault()
        if (!listName) return

        const newList = {
            _id: makeId(),
            idBoard: board._id,
            name: listName
        }
        onAddList(newList)
        setListName('')
        setIsAddingList(false)
    }

    return (
        <section className="list-list">
            <ol className="lists">
                {lists.map(list => {
                    const cardsForThisList = cards.filter(card => card.idList === list._id)
                    return <ListPreview key={list._id} board={board} list={list} cards={cardsForThisList} onAddCard={onAddCard} onCompleteTask={onCompleteTask} />
                }
                )}
                {isAddingList &&
                    <li className="list-preview add-list-item">
                        <form className="add-list-form" onSubmit={addList}>
                            <textarea
                                ref={textareaRef}
                                className="add-list-textarea"
                                onChange={handleInput}
                                type="text"
                                value={listName}
                                placeholder="Enter list name" />
                            <div className="add-list-actions">
                                <button
                                    className="btn-primary"
                                    type="submit"
                                    onClick={addList}
                                >
                                    Add list
                                </button>
                                <button
                                    className="icon-btn dynamic-btn"
                                    onClick={() => setIsAddingList(false)}
                                >
                                    <CloseIcon width={16} height={16} fill="currentColor" />
                                </button>
                            </div>
                        </form>
                    </li>
                }
                {!isAddingList &&
                    <div className="add-list">
                        <button className="dynamic-btn" onClick={() => setIsAddingList(true)}>
                            <PlusIcon width={16} height={16} fill="currentColor" />
                            <span>Add a list</span>
                        </button>
                    </div>
                }
            </ol>
        </section>
    )
}