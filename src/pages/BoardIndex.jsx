import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

// import { loadBoards, addBoard, updateBoard, removeBoard, addBoardMsg } from '../store/actions/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { boardService } from '../services/board/'
import { userService } from '../services/user'

import { BoardList } from '../cmps/board/BoardList'
import { BoardFilter } from '../cmps/board/BoardFilter'
import { NavLink } from 'react-router'
import { addBoard, loadBoards } from '../store/actions/board.actions'

export function BoardIndex() {
    // const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())
    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

    async function onAddBoard() {
        const board = boardService.getEmptyBoard()
        board.name = prompt('Name')
        try {
            const savedBoard = await addBoard(board)
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot add board')
        }
    }

    // async function onRemoveBoard(boardId) {
    //     try {
    //         await removeBoard(boardId)
    //         showSuccessMsg('Board removed')
    //     } catch (err) {
    //         showErrorMsg('Cannot remove board')
    //     }
    // }


    // async function onUpdateBoard(board) {
    //     const name = +prompt('New name?', board.name) || 0
    //     if (name === 0 || name === board.name) return

    //     const boardToSave = { ...board, name }
    //     try {
    //         const savedBoard = await updateBoard(boardToSave)
    //         showSuccessMsg(`Board updated, new name: ${savedBoard.name}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update board')
    //     }
    // }

    return (
        <section className="board-index full">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/workspace" className="active">
                            Boards
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/home">
                            Home
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <main>
                <div className="boards-container">
                    <h3>Your boards</h3>
                    <BoardList boards={boards} onAddBoard={onAddBoard} />
                </div>
            </main>
        </section>
    )
}