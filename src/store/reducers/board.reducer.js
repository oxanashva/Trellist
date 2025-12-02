export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'

export const ADD_GROUP = 'ADD_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'

export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'

export const ADD_BOARD_MSG = 'ADD_BOARD_MSG'

export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    boards: [],
    board: null,
    isLoading: false
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {

        // ------------------- Basic CRUD -------------------

        case SET_BOARDS:
            return {
                ...state,
                boards: action.boards
            }

        case SET_BOARD:
            return {
                ...state,
                board: action.board
            }

        case ADD_BOARD:
            return {
                ...state,
                boards: [...state.boards, action.board]
            }

        case UPDATE_BOARD:
            return {
                ...state,
                boards: state.boards.map(b =>
                    b._id === action.board._id ? action.board : b
                ),
                board:
                    state.board && state.board._id === action.board._id
                        ? action.board
                        : state.board
            }

        case REMOVE_BOARD:
            return {
                ...state,
                boards: state.boards.filter(b => b._id !== action.boardId),
                board:
                    state.board && state.board._id === action.boardId
                        ? null
                        : state.board
            }

        // ------------------- Board Messages -------------------

        case ADD_BOARD_MSG:
            return {
                ...state,
                board: {
                    ...state.board,
                    msgs: [...(state.board.msgs || []), action.msg]
                }
            }

        // ------------------- Group CRUD -------------------

        case ADD_GROUP:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: [...state.board.groups, action.group]
                }
            }

        case UPDATE_GROUP:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group =>
                        group._id === action.group._id ? action.group : group
                    )
                }
            }

        case REMOVE_GROUP:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.filter(
                        group => group._id !== action.groupId
                    )
                }
            }



        // ------------------- Task CRUD -------------------

        case ADD_TASK:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group =>
                        group._id === action.groupId
                            ? { ...group, tasks: [...group.tasks, action.task] }
                            : group
                    )
                }
            }

        case UPDATE_TASK:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group =>
                        group._id === action.groupId
                            ? {
                                ...group,
                                tasks: group.tasks.map(task =>
                                    task._id === action.task._id
                                        ? action.task
                                        : task
                                )
                            }
                            : group
                    )
                }
            }

        case REMOVE_TASK:
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: state.board.groups.map(group =>
                        group._id === action.groupId
                            ? {
                                ...group,
                                tasks: group.tasks.filter(
                                    task => task._id !== action.taskId
                                )
                            }
                            : group
                    )
                }
            }

        // ------------------- Loading state -------------------

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        // ------------------- Default -------------------

        default:
            return state
    }
}

// unitTestReducer()

// function unitTestReducer() {
//     var state = initialState
//     const car1 = { _id: 'b101', vendor: 'Car ' + parseInt('' + Math.random() * 10), speed: 12, owner: null, msgs: [] }
//     const car2 = { _id: 'b102', vendor: 'Car ' + parseInt('' + Math.random() * 10), speed: 13, owner: null, msgs: [] }

//     state = carReducer(state, { type: SET_CARS, cars: [car1] })
//     console.log('After SET_CARS:', state)

//     state = carReducer(state, { type: ADD_CAR, car: car2 })
//     console.log('After ADD_CAR:', state)

//     state = carReducer(state, { type: UPDATE_CAR, car: { ...car2, vendor: 'Good' } })
//     console.log('After UPDATE_CAR:', state)

//     state = carReducer(state, { type: REMOVE_CAR, carId: car2._id })
//     console.log('After REMOVE_CAR:', state)

//     state = carReducer(state, { type: SET_CAR, car: car1 })
//     console.log('After SET_CAR:', state)

//     const msg = { _id: 'm' + parseInt('' + Math.random() * 100), txt: 'Some msg', by: { _id: 'u123', fullname: 'test' } }
//     state = carReducer(state, { type: ADD_CAR_MSG, carId: car1._id, msg })
//     console.log('After ADD_CAR_MSG:', state)
// }

