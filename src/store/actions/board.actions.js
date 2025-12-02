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
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdUpdateBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
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

export async function addTask(boardId, groupId, task) {
    try {
        const savedTask = await boardService.addTask(boardId, groupId, task)
        store.dispatch(getCmdAddTask(groupId, savedTask))
        return savedTask
    } catch (err) {
        console.log('Cannot add task', err)
        throw err
    }
}

export async function updateTask(boardId, groupId, task) {
    try {
        const savedTask = await boardService.updateTask(boardId, groupId, task)
        store.dispatch(getCmdUpdateTask(groupId, savedTask))
        return savedTask
    } catch (err) {
        console.log('Cannot update task', err)
        throw err
    }
}

export async function removeTask(boardId, groupId, taskId) {
    try {
        await boardService.removeTask(boardId, groupId, taskId)
        store.dispatch(getCmdRemoveTask(groupId, taskId))
    } catch (err) {
        console.log('Cannot remove task', err)
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

function getCmdAddTask(groupId, task) {
    return {
        type: ADD_TASK,
        groupId,
        task
    }
}

function getCmdUpdateTask(groupId, task) {
    return {
        type: UPDATE_TASK,
        groupId,
        task
    }
}

function getCmdRemoveTask(groupId, taskId) {
    return {
        type: REMOVE_TASK,
        groupId,
        taskId
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
