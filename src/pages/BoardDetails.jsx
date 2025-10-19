import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

import { loadBoard, addBoard, updateBoard, removeBoard, addBoardMsg } from '../store/actions/board.actions'

import osAvatarImg from '../assets/images/avatars/OS-avatar.png'
import acAvatarImg from '../assets/images/avatars/AC-avatar.png'
import FilterIcon from '../assets/images/icons/filter.svg?react'
import StarIcon from '../assets/images/icons/star.svg?react'
import UserPlusIcon from '../assets/images/icons/user-plus.svg?react'
import MoreIcon from '../assets/images/icons/more.svg?react'

import { ListList } from '../cmps/list/ListList'

export function BoardDetails() {
    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)

    const inputRef = useRef(null)
    const [boardName, setBoardName] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (board) {
            setBoardName(board.name)
        }
    }, [board])

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }
    }, [isEditing])

    function handleInputBlur() {
        updateBoard({ ...board, name: boardName })
        setIsEditing(false);
    }

    function handleInput({ target }) {
        setBoardName(target.value)
    }

    function onAddList(newList) {
        updateBoard({
            ...board,
            lists: [...board.lists, newList]
        })
    }

    function onAddCard(newCard) {
        updateBoard({
            ...board,
            cards: [...board.cards, newCard]
        })
    }

    function onCompleteTask(card, isCompleted) {
        updateBoard({
            ...board,
            cards: board.cards.map(c => c._id === card._id ? { ...c, closed: isCompleted } : c)
        })
    }

    const h1ClassName = `board-title ${isEditing ? 'hidden' : ''}`
    const inputClassName = `board-title ${isEditing ? '' : 'hidden'}`

    if (!board) return <div>Loading...</div>

    return (
        <section className="board-details full">
            <header>
                <div>
                    <h1
                        className={h1ClassName}
                        onClick={() => setIsEditing(true)}
                    >
                        {boardName}
                    </h1>
                    <input
                        ref={inputRef}
                        className={inputClassName}
                        type="text"
                        value={boardName}
                        onChange={handleInput}
                        onBlur={handleInputBlur}
                        onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                ev.preventDefault()
                                ev.target.blur()
                            }
                            if (ev.key === 'Escape') {
                                setBoardName(boardName)
                                setIsEditing(false)
                            }
                        }}
                    />
                </div>
                <div className="btn-group">
                    <div className="avatar-btn-group">
                        {/* TODO: Render avatars based on board data */}
                        <button className="dynamic-btn icon-btn avatar-btn" title="Oxana Shvartsman (oxanashvartsman)" >
                            <img src={osAvatarImg} alt="Oxana Shvartsman" width={16} height={16} />
                        </button>
                        <button className="dynamic-btn icon-btn avatar-btn" title="Anna Coss (annacoss" >
                            <img src={acAvatarImg} alt="Anna Coss" />
                        </button>
                    </div>
                    <button className="dynamic-btn icon-btn action-dynamic-btn">
                        <FilterIcon width={16} height={16} fill="currentColor" />
                    </button>
                    <button className="dynamic-btn icon-btn action-dynamic-btn">
                        <StarIcon width={16} height={16} fill="currentColor" />
                    </button>
                    <button className="btn-highlighted">
                        <UserPlusIcon width={16} height={16} fill="currentColor" />
                        <span>Share</span>
                    </button>
                    <button className="dynamic-btn icon-btn action-dynamic-btn">
                        <MoreIcon width={16} height={16} fill="currentColor" />
                    </button>
                </div>
            </header>

            {board &&
                <ListList
                    board={board}
                    lists={board.lists}
                    cards={board.cards}
                    onAddCard={onAddCard}
                    onAddList={onAddList}
                    onCompleteTask={onCompleteTask}
                />}
        </section>
    )
}