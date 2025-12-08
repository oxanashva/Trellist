import { boardService } from '../../services/board'
import { store } from '../store'
import {
    SET_BOARDS,
    SET_BOARD,
    ADD_BOARD,
    UPDATE_BOARD,
    REMOVE_BOARD,
    ADD_GROUP,
    UPDATE_GROUP,
    REMOVE_GROUP,
    ADD_TASK,
    UPDATE_TASK,
    REMOVE_TASK,
    ADD_ACTION,
    UPDATE_ACTION,
    REMOVE_ACTION,
    ADD_LABEL,
    UPDATE_LABEL,
    REMOVE_LABEL,
    ADD_BOARD_MSG,
    SET_IS_LOADING,
} from '../reducers/board.reducer'

// ------------------- Helpers -------------------


function setIsLoading(isLoading) {
    store.dispatch({ type: SET_IS_LOADING, isLoading })
}

// ------------------- Boards/Board -------------------


export async function loadBoards() {
    try {
        setIsLoading(true)
        const boards = await boardService.query()
        store.dispatch(getCmdSetBoards(boards))
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    } finally {
        setIsLoading(false)
    }
}

export async function loadBoard(boardId) {
    try {
        setIsLoading(true)
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    } finally {
        setIsLoading(false)
    }
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board) {
    const prevBoard = store.getState().boardModule.board

    try {
        store.dispatch(getCmdUpdateBoard(board)) // optimistic
        const savedBoard = await boardService.save(board)
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        store.dispatch(getCmdUpdateBoard(prevBoard)) // revert
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getCmdRemoveBoard(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

// ------------------- Messages -------------------


export async function addBoardMsg(boardId, txt) {
    try {
        const msg = await boardService.addBoardMsg(boardId, txt)
        store.dispatch(getCmdAddBoardMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add board msg', err)
        throw err
    }
}

// ------------------- Groups -------------------


export async function addGroup(boardId, group) {
    try {
        const savedGroup = await boardService.addGroup(boardId, group)
        store.dispatch(getCmdAddGroup(savedGroup))
        return savedGroup
    } catch (err) {
        console.log('Cannot add group', err)
        throw err
    }
}

export async function updateGroup(boardId, group) {
    try {
        const savedGroup = await boardService.updateGroup(boardId, group)
        store.dispatch(getCmdUpdateGroup(savedGroup))
        return savedGroup
    } catch (err) {
        console.log('Cannot update group', err)
        throw err
    }
}

export async function removeGroup(boardId, groupId) {
    try {
        await boardService.removeGroup(boardId, groupId)
        store.dispatch(getCmdRemoveGroup(groupId))
    } catch (err) {
        console.log('Cannot remove group', err)
        throw err
    }
}

// ------------------- Tasks -------------------

export async function addTask(boardId, task) {
    try {
        const savedTask = await boardService.addTask(boardId, task)
        store.dispatch(getCmdAddTask(savedTask))
        return savedTask
    } catch (err) {
        console.log('Cannot add task', err)
        throw err
    }
}

export async function updateTask(boardId, task, fieldsToUpdate) {
    try {
        const savedTask = await boardService.updateTask(boardId, task, fieldsToUpdate)
        store.dispatch(getCmdUpdateTask(savedTask))
        return savedTask
    } catch (err) {
        console.log('Cannot update task', err)
        throw err
    }
}

export async function removeTask(boardId, taskId) {
    try {
        await boardService.removeTask(boardId, taskId)
        store.dispatch(getCmdRemoveTask(taskId))
    } catch (err) {
        console.log('Cannot remove task', err)
        throw err
    }
}

// ------------------- Actions -------------------

export async function addAction(boardId, action) {
    try {
        const savedAction = await boardService.addAction(boardId, action)
        store.dispatch(getCmdAddAction(savedAction))
        return savedAction
    } catch (err) {
        console.log('Cannot add action', err)
        throw err
    }
}

export async function updateAction(boardId, action) {
    try {
        const savedAction = await boardService.updateAction(boardId, action)
        store.dispatch(getCmdUpdateAction(savedAction))
        return savedAction
    } catch (err) {
        console.log('Cannot update action', err)
        throw err
    }
}

export async function removeAction(boardId, actionId) {
    try {
        await boardService.removeAction(boardId, actionId)
        store.dispatch(getCmdRemoveAction(actionId))
    } catch (err) {
        console.log('Cannot remove action', err)
        throw err
    }
}

// ------------------- Labels CRUD -------------------

export async function addLabel(boardId, label) {
    try {
        const savedLabel = await boardService.addLabel(boardId, label)
        store.dispatch(getCmdAddLabel(savedLabel))
        return savedLabel
    } catch (err) {
        console.log('Cannot add label', err)
        throw err
    }
}

export async function updateLabel(boardId, label) {
    try {
        const savedLabel = await boardService.updateLabel(boardId, label)
        store.dispatch(getCmdUpdateLabel(savedLabel))
        return savedLabel
    } catch (err) {
        console.log('Cannot update label', err)
        throw err
    }
}

export async function removeLabel(boardId, labelId) {
    try {
        await boardService.removeLabel(boardId, labelId)
        store.dispatch(getCmdRemoveLabel(labelId))
    } catch (err) {
        console.log('Cannot remove label', err)
        throw err
    }
}

// ------------------- Command Creators -------------------

function getCmdSetBoards(boards) {
    return {
        type: SET_BOARDS,
        boards
    }
}

function getCmdSetBoard(board) {
    return {
        type: SET_BOARD,
        board
    }
}

function getCmdAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}
function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

function getCmdRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}

function getCmdAddBoardMsg(msg) {
    return {
        type: ADD_BOARD_MSG,
        msg
    }
}

function getCmdAddGroup(group) {
    return {
        type: ADD_GROUP,
        group
    }
}

function getCmdUpdateGroup(group) {
    return {
        type: UPDATE_GROUP,
        group
    }
}

function getCmdRemoveGroup(groupId) {
    return {
        type: REMOVE_GROUP,
        groupId
    }
}

function getCmdAddTask(task) {
    return {
        type: ADD_TASK,
        task
    }
}

function getCmdUpdateTask(task) {
    return {
        type: UPDATE_TASK,
        task
    }
}

function getCmdRemoveTask(taskId) {
    return {
        type: REMOVE_TASK,
        taskId
    }
}

function getCmdAddAction(action) {
    return {
        type: ADD_ACTION,
        action
    }
}

function getCmdUpdateAction(action) {
    return {
        type: UPDATE_ACTION,
        action
    }
}

function getCmdRemoveAction(actionId) {
    return {
        type: REMOVE_ACTION,
        actionId
    }
}

function getCmdAddLabel(label) {
    return {
        type: ADD_LABEL,
        label
    }
}

function getCmdUpdateLabel(label) {
    return {
        type: UPDATE_LABEL,
        label
    }
}

function getCmdRemoveLabel(labelId) {
    return {
        type: REMOVE_LABEL,
        labelId
    }
}

// unitTestActions()
// async function unitTestActions() {
//     await loadBoards()
//     await addBoard(boardService.getEmptyBoard())
//     await updateBoard({
//         _id: 'm1oC7',
//         vendor: 'Board-Good',
//     })
//     await removeBoard('m1oC7')
//     // TODO unit test addBoardMsg
// }
