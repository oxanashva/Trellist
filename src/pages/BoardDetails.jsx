import { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router'
import { useSelector } from 'react-redux'

import { loadBoard, addBoard, updateBoard, removeBoard, addGroup, updateGroup, removeGroup, addTask, updateTask, removeTask, addBoardMsg } from '../store/actions/board.actions'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { DndContext, closestCenter, useSensors, useSensor, MouseSensor } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'

import { useFocusOnStateChange } from '../customHooks/useFocusOnStateChange'

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

    const [boardName, setBoardName] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [groupsOrder, setGroupsOrder] = useState(board?.groups || [])
    const [tasksOrder, setTasksOrder] = useState(board?.tasks || [])

    const inputRef = useFocusOnStateChange(isEditing)

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

    async function onAddBoard(newBoard) {
        try {
            await addBoard(newBoard)
            showSuccessMsg('Board added')
        } catch (err) {
            showErrorMsg('Cannot add board')
        }
    }

    async function onUpdateBoard(updatedBoard) {
        try {
            await updateBoard(updatedBoard)
            showSuccessMsg('Board updated')
        } catch (err) {
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

    async function onAddTask(boardId, newTask) {
        try {
            await addTask(boardId, newTask)
            showSuccessMsg('Task added')
        } catch (err) {
            showErrorMsg('Cannot add task')
        }
    }

    async function onUpdateTask(boardId, updatedTask) {
        try {
            await updateTask(boardId, updatedTask)
            showSuccessMsg('Task updated')
        } catch (err) {
            showErrorMsg('Cannot update task')
        }
    }

    async function onRemoveTask(boardId, taskId) {
        try {
            await removeTask(boardId, taskId)
            showSuccessMsg('Task removed')
        } catch (err) {
            showErrorMsg('Cannot remove task')
        }
    }

    function onCompleteTask(task, isCompleted) {
        updateBoard({
            ...board,
            tasks: board.tasks.map(c => c._id === task._id ? { ...c, closed: isCompleted } : c)
        })
    }

    const onDragEnd = (event) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const groupIds = board.groups.map(g => g._id)

        const isDraggingGroup = board.groups.some(g => g._id === activeId)

        if (isDraggingGroup) {
            const oldIndex = board.groups.findIndex(group => group._id === active.id)
            const newIndex = board.groups.findIndex(group => group._id === over.id)

            if (oldIndex !== newIndex) {
                const reorderedGroups = arrayMove(board.groups, oldIndex, newIndex)
                setGroupsOrder(reorderedGroups)
                const updatedBoard = { ...board, groups: reorderedGroups }
                updateBoard(updatedBoard)
            }
        } else {
            const activeContainer = active.data?.current?.sortable?.containerId
            const overContainer = over.data?.current?.sortable?.containerId


            if (!activeContainer || !overContainer || !groupIds.includes(overContainer)) return

            const activeTaskIndex = board.tasks.findIndex(t => t._id === activeId)
            const overTaskIndex = board.tasks.findIndex(t => t._id === overId)

            if (activeTaskIndex === overTaskIndex) return

            let tempTasks = board.tasks

            // Change task groupId if dragging task from one group to another
            if (activeContainer !== overContainer) {
                tempTasks = board.tasks.map(t =>
                    t._id === active.id
                        ? { ...t, idGroup: overContainer }
                        : t
                )
            }

            const reorderedTasks = arrayMove(tempTasks, activeTaskIndex, overTaskIndex)
            setTasksOrder(reorderedTasks)
            const updatedBoard = { ...board, tasks: reorderedTasks }
            updateBoard(updatedBoard)

        }
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

    if (isLoading) return <Loader />

    return (
        <section className="board-details full">
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
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                >
                    <SortableContext
                        items={groupsOrder.map(g => g._id)}
                        strategy={horizontalListSortingStrategy}
                    >
                        <GroupList
                            board={board}
                            groups={groupsOrder}
                            tasks={tasksOrder}
                            onAddGroup={onAddGroup}
                            onRemoveGroup={onRemoveGroup}
                            onUpdateGroup={onUpdateGroup}
                            onAddTask={onAddTask}
                            onRemoveTask={onRemoveTask}
                            onCompleteTask={onCompleteTask}
                        />
                    </SortableContext>
                </DndContext>
            }
            <Outlet />
        </section>
    )
}