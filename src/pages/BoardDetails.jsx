import { useState, useEffect, useRef } from 'react'
import { Outlet, useParams } from 'react-router'
import { useSelector } from 'react-redux'

import { loadBoard, addBoard, updateBoard, removeBoard, addBoardMsg } from '../store/actions/board.actions'

import osAvatarImg from '../assets/images/avatars/OS-avatar.png'
import acAvatarImg from '../assets/images/avatars/AC-avatar.png'
import FilterIcon from '../assets/images/icons/filter.svg?react'
import StarIcon from '../assets/images/icons/star.svg?react'
import UserPlusIcon from '../assets/images/icons/user-plus.svg?react'
import MoreIcon from '../assets/images/icons/more.svg?react'

import { GroupList } from '../cmps/group/GroupList'
import { Loader } from '../cmps/Loader'

export function BoardDetails() {
    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const isLoading = useSelector(storeState => storeState.boardModule.isLoading)

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
        setIsEditing(false)
    }

    function handleInput({ target }) {
        setBoardName(target.value)
    }

    function onBoardNameKeyDown(ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            ev.target.blur()
        }
        if (ev.key === 'Escape') {
            setBoardName(board.name)
            setIsEditing(false)
        }
    }

    function onAddGroup(newGroup) {
        updateBoard({
            ...board,
            groups: [
                ...(board.groups || []),
                newGroup
            ]
        })
    }

    function onAddTask(newTask) {
        updateBoard({
            ...board,
            tasks: [
                ...(board.tasks || []),
                newTask
            ]
        })
    }

    function onUpdateGroup(updatedGroup) {
        updateBoard({
            ...board,
            groups: board.groups.map(group => group._id === updatedGroup._id ? updatedGroup : group)
        })
    }

    function onCompleteTask(task, isCompleted) {
        updateBoard({
            ...board,
            tasks: board.tasks.map(c => c._id === task._id ? { ...c, closed: isCompleted } : c)
        })
    }

    if (isLoading) return <Loader />

    return (
        <section className="board-details full">
            <header>
                <div>
                    {/* TODO: implement reusable component for editable field */}
                    {!isEditing &&
                        <h1
                            className="board-title"
                            onClick={() => setIsEditing(true)}
                            title="Edit board name"
                        >
                            {boardName}
                        </h1>
                    }
                    {isEditing &&
                        <input
                            ref={inputRef}
                            className="board-title"
                            type="text"
                            value={boardName}
                            onChange={handleInput}
                            onBlur={handleInputBlur}
                            onKeyDown={onBoardNameKeyDown}
                        />
                    }
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
                <GroupList
                    board={board}
                    groups={board.groups}
                    tasks={board.tasks}
                    onAddTask={onAddTask}
                    onAddGroup={onAddGroup}
                    onCompleteTask={onCompleteTask}
                    onUpdateGroup={onUpdateGroup}
                />}
            <Outlet />
        </section>
    )
}