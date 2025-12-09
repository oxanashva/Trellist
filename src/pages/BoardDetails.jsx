import { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router'
import { useSelector } from 'react-redux'

import { loadBoard, addBoard, updateBoard, removeBoard, addGroup, updateGroup, removeGroup, addBoardMsg } from '../store/actions/board.actions'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { DndContext, useSensors, useSensor, MouseSensor, DragOverlay, closestCenter } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { DragOverlayWrapper } from '../cmps/DragOverlayWrapper'

import { useFocusOnStateChange } from '../customHooks/useFocusOnStateChange'

import osAvatarImg from '../assets/images/avatars/OS-avatar.png'
import acAvatarImg from '../assets/images/avatars/AC-avatar.png'
import FilterIcon from '../assets/images/icons/filter.svg?react'
import StarIcon from '../assets/images/icons/star.svg?react'
import StarSolidIcon from '../assets/images/icons/star-solid.svg?react'
import UserPlusIcon from '../assets/images/icons/user-plus.svg?react'
import MoreIcon from '../assets/images/icons/more.svg?react'

import { cloudinaryGradientColorsMap } from '../services/util.service'

import { GroupList } from '../cmps/group/GroupList'
import { Loader } from '../cmps/Loader'
import { DynamicPicker } from '../cmps/picker/DynamicPicker'

export function BoardDetails() {
    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const isLoading = useSelector(storeState => storeState.boardModule.isLoading)

    const [boardName, setBoardName] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null)
    const openPopover = Boolean(anchorEl)
    const [picker, setPicker] = useState(null)

    const [groupsOrder, setGroupsOrder] = useState(board?.groups || [])
    const [tasksOrder, setTasksOrder] = useState(board?.tasks || [])
    const actions = board?.actions

    const [activeId, setActiveId] = useState(null)

    const inputRef = useFocusOnStateChange(isEditing)

    const PICKER_MAP = {
        BOARD: {
            type: "BoardPicker",
            info: {
                label: "Board: ",
                propName: "board",
            }
        }
    }

    useEffect(() => {
        if (board) {
            setBoardName(board.name)

            if (board.groups && board.groups !== groupsOrder) {
                setGroupsOrder(board.groups)
            }

            if (board.tasks && board.tasks !== tasksOrder) {
                setTasksOrder(board.tasks)
            }
        }
    }, [board])

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

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

    const handlePopoverOpen = (event, pickerType) => {
        setAnchorEl(event.currentTarget)
        setPicker(pickerType)
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }

    function setStarred() {
        updateBoard({ ...board, isStarred: !board.isStarred })
    }

    function onChangeBackground(prefs) {
        updateBoard({ ...board, prefs })
    }

    async function onAddBoard(newBoard) {
        try {
            await addBoard(newBoard)
            showSuccessMsg('Board added')
        } catch (err) {
            showErrorMsg('Cannot add board')
        }
    }

    async function onUpdateBoard(fieldsToUpdate) {
        const updatedBoard = {
            ...board,
            ...fieldsToUpdate
        }

        try {
            await updateBoard(updatedBoard)
            showSuccessMsg('Board updated')
        } catch (err) {
            console.error('Failed to update board:', err)
            showErrorMsg('Cannot update board')
        }
    }

    async function onRemoveBoard(boardId) {
        try {
            await removeBoard(boardId)
            showSuccessMsg('Board removed')
        } catch (err) {
            showErrorMsg('Cannot remove board')
        }
    }

    async function onAddGroup(boardId, newGroup) {
        try {
            await addGroup(boardId, newGroup)
            showSuccessMsg('Group added')
        } catch (err) {
            showErrorMsg('Cannot add group')
        }
    }

    async function onUpdateGroup(boardId, updatedGroup) {
        try {
            await updateGroup(boardId, updatedGroup)
            showSuccessMsg('Group updated')
        } catch (err) {
            showErrorMsg('Cannot update group')
        }
    }

    async function onRemoveGroup(boardId, groupId) {
        try {
            await removeGroup(boardId, groupId)
            showSuccessMsg('Group removed')
        } catch (err) {
            showErrorMsg('Cannot remove group')
        }
    }

    const onDragStart = (event) => {
        setActiveId(event.active.id)
    }

    const onDragCancel = () => {
        setActiveId(null)
    }

    const onDragOver = (event) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        // We only care about task dragging, not group dragging
        const isDraggingGroup = groupsOrder.some(g => g._id === activeId)
        if (isDraggingGroup) return

        const activeTaskIndex = tasksOrder.findIndex(t => t._id === activeId)
        if (activeTaskIndex === -1) return

        const activeTask = tasksOrder[activeTaskIndex]
        const oldIdGroup = activeTask.idGroup

        const overTask = tasksOrder.find(t => t._id === overId)
        const overGroup = groupsOrder.find(g => g._id === overId)

        const newIdGroup = overTask ? overTask.idGroup : overGroup?._id

        if (newIdGroup && oldIdGroup !== newIdGroup) {
            const updatedTasks = tasksOrder.map(task => {
                if (task._id === activeId) {
                    return { ...task, idGroup: newIdGroup }
                }
                return task
            })

            setTasksOrder(updatedTasks)
        }
    }

    const onDragEnd = (event) => {
        const { active, over } = event

        if (!over) {
            setActiveId(null)
            return
        }

        const activeId = active.id
        const overId = over.id

        const isDraggingGroup = groupsOrder.some(g => g._id === activeId)

        if ((activeId === overId) && isDraggingGroup) {
            setActiveId(null)
            return
        }


        if (isDraggingGroup) {
            const oldIndex = groupsOrder.findIndex(group => group._id === activeId)
            const newIndex = groupsOrder.findIndex(group => group._id === overId)

            if (oldIndex === -1 || newIndex === -1) {
                setActiveId(null)
                return
            }

            if (oldIndex !== newIndex) {
                const reorderedGroups = arrayMove(groupsOrder, oldIndex, newIndex)

                const updatedBoard = { ...board, groups: reorderedGroups }
                updateBoard(updatedBoard)
            }
        } else {
            const activeTaskIndex = tasksOrder.findIndex(t => t._id === activeId)
            const overTaskIndex = tasksOrder.findIndex(t => t._id === overId)

            if (activeTaskIndex === -1 || overTaskIndex === -1) {
                setActiveId(null)
                return
            }


            const activeTask = tasksOrder[activeTaskIndex]
            const overTask = tasksOrder[overTaskIndex]

            let tempTasks = [...tasksOrder]

            if (activeTask.idGroup !== overTask.idGroup) {
                tempTasks[activeTaskIndex] = { ...activeTask, idGroup: overTask.idGroup }
            }

            const reorderedTasks = arrayMove(tempTasks, activeTaskIndex, overTaskIndex)
            setTasksOrder(reorderedTasks)

            const updatedBoard = { ...board, tasks: reorderedTasks }
            updateBoard(updatedBoard)

        }
        setActiveId(null)
    }

    const customMouseSensor = useSensor(MouseSensor, {
        // Defines conditions (like delay) needed to start dragging
        activationConstraint: {
            // Requires 250ms press. Differentiates a quick 'click' (edit) 
            // from a 'click and hold' (drag).
            delay: 250,
            tolerance: 5,
        },
    })

    // Registers the custom delayed sensor for use in <DndContext>
    const sensors = useSensors(customMouseSensor)

    const boardDetailsStyle = {
        backgroundColor: board?.prefs?.background,
        backgroundImage: board?.prefs?.backgroundImage
            ? `url(${board?.prefs?.backgroundImage})`
            : `url(${cloudinaryGradientColorsMap[board?.prefs?.background]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
    }

    const starBtnStyle = board?.isStarred ? { color: '#FBC828' } : {}

    if (isLoading) return <Loader />

    return (
        <>
            <section style={boardDetailsStyle} className="board-details full">
                <header className="board-details-header">
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
                            <button className="dynamic-btn icon-btn avatar-btn" title="Anna Coss (annacoss)" >
                                <img src={acAvatarImg} alt="Anna Coss" />
                            </button>
                        </div>
                        <button className="dynamic-btn icon-btn action-dynamic-btn">
                            <FilterIcon width={16} height={16} fill="currentColor" />
                        </button>
                        <button
                            style={starBtnStyle}
                            className="dynamic-btn icon-btn action-dynamic-btn"
                            onClick={setStarred}
                        >
                            {board?.isStarred
                                ? <StarSolidIcon width={16} height={16} fill="currentColor" />
                                : <StarIcon width={16} height={16} fill="currentColor" />}
                        </button>
                        <button className="btn-highlighted">
                            <UserPlusIcon width={16} height={16} fill="currentColor" />
                            <span>Share</span>
                        </button>
                        <button
                            className="dynamic-btn icon-btn action-dynamic-btn"
                            onClick={(event) => {
                                handlePopoverOpen(event, PICKER_MAP.BOARD)
                            }}
                        >
                            <MoreIcon width={16} height={16} fill="currentColor" />
                        </button>
                    </div>
                </header>

                {board &&
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={onDragStart}
                        onDragCancel={onDragCancel}
                        onDragOver={onDragOver}
                        onDragEnd={onDragEnd}
                    >
                        <SortableContext
                            items={groupsOrder.map(g => g._id)}
                            strategy={horizontalListSortingStrategy}
                        >
                            <GroupList
                                groups={groupsOrder}
                                tasks={tasksOrder}
                                actions={actions}
                                onAddGroup={onAddGroup}
                                onRemoveGroup={onRemoveGroup}
                                onUpdateGroup={onUpdateGroup}
                            />
                        </SortableContext>

                        <DragOverlay>
                            {activeId ? (
                                <DragOverlayWrapper
                                    activeId={activeId}
                                    board={{ ...board, groups: groupsOrder, tasks: tasksOrder }}
                                />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                }
                <Outlet />
            </section>
            {picker && (
                <DynamicPicker
                    picker={picker}
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    setStarred={setStarred}
                    isStarred={board?.isStarred}
                    prefs={board?.prefs}
                    onUpdateBoard={onUpdateBoard}
                />
            )}
        </>
    )
}