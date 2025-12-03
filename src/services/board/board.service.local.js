
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import { board } from './board-data'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,
    addGroup,
    updateGroup,
    removeGroup,
    addTask,
    updateTask,
    removeTask,
    addAction,
    updateAction,
    removeAction,
    addBoardMsg,
    getEmptyBoard
}
window.bs = boardService

// ------------------- Basic CRUD -------------------


async function query() {
    return await storageService.query(STORAGE_KEY)
}

function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
}

async function save(board) {
    let savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function remove(carId) {
    await storageService.remove(STORAGE_KEY, carId)
}

// ------------------- Group CRUD -------------------

async function addGroup(boardId, group) {
    const board = await getById(boardId)

    board.groups.push(group)

    await storageService.put(STORAGE_KEY, board)

    return group
}

async function updateGroup(boardId, updatedGroup) {
    const board = await getById(boardId)

    board.groups = board.groups.map(group =>
        group._id === updatedGroup._id ? updatedGroup : group
    )

    await storageService.put(STORAGE_KEY, board)

    return updatedGroup
}

async function removeGroup(boardId, groupId) {
    const board = await getById(boardId)

    board.groups = board.groups.filter(g => g._id !== groupId)

    await storageService.put(STORAGE_KEY, board)
}

// ------------------- Task CRUD -------------------

async function addTask(boardId, task) {
    const board = await getById(boardId)

    board.tasks.push(task)

    await storageService.put(STORAGE_KEY, board)

    return task
}

async function updateTask(boardId, updatedTask) {
    const board = await getById(boardId)

    board.tasks = board.tasks.map(t =>
        t._id === updatedTask._id ? updatedTask : t
    )

    await storageService.put(STORAGE_KEY, board)

    return updatedTask
}

async function removeTask(boardId, taskId) {
    const board = await getById(boardId)

    board.tasks = board.tasks.filter(t => t._id !== taskId)

    await storageService.put(STORAGE_KEY, board)
}

// ------------------- Actions CRUD -------------------
async function addAction(boardId, action) {
    const board = await getById(boardId)

    board.actions.push(action)

    await storageService.put(STORAGE_KEY, board)

    return action
}

async function updateAction(boardId, updatedAction) {
    const board = await getById(boardId)

    board.actions = board.actions.map(a =>
        a._id === updatedAction._id ? updatedAction : a
    )

    await storageService.put(STORAGE_KEY, board)

    return updatedAction
}

async function removeAction(boardId, actionId) {
    const board = await getById(boardId)

    board.actions = board.actions.filter(a => a._id !== actionId)

    await storageService.put(STORAGE_KEY, board)
}


// ------------------- Board Messages -------------------

async function addBoardMsg(carId, txt) {
    // Later, this is all done by the backend
    const car = await getById(carId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    car.msgs.push(msg)
    await storageService.put(STORAGE_KEY, car)

    return msg
}

// ------------------- Factory -------------------


function getEmptyBoard() {
    const placeholderMember = {
        _id: makeId(),
        avatarUrl: null,
        fullname: 'Guest User',
        username: 'guest',
        initials: 'GU'
    };

    return {
        desc: '',
        closed: false,
        starred: false,
        prefs: {
            background: '#1868DB',
        },
        dateLastActivity: Date.now(),
        dateLastView: Date.now(),
        idMemberCreator: placeholderMember._id,
        actions: [],
        cards: [],
        labels: [],
        members: [placeholderMember],
        checklists: []
    };
}

function _createBoard() {
    let boards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

    if (!boards || !boards.length) {
        boards = [board]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(boards))
    }

    return boards
}

_createBoard()