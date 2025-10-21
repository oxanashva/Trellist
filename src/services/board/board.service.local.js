
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
    addBoardMsg,
    getEmptyBoard
}
window.bs = boardService


async function query() {
    return await storageService.query(STORAGE_KEY)
}

function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
}

async function remove(carId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, carId)
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

async function updateTask(boardId, groupId, task, activityTitle) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    const group = board.groups.find(g => g.id === groupId)
    const idx = group.tasks.findIndex(t => t.id === task.id)
    group.tasks[idx] = task
    // const activity = _createActivity(activityTitle, _toMiniTask(task), _toMiniGroup(group))
    // board.activities.push(activity)
    // await storageService.put(STORAGE_KEY, board)
    // return [task, activity]
}


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