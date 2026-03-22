import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// import { loadBoards, addBoard, updateBoard, removeBoard, addBoardMsg } from '../store/actions/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { boardService } from '../services/board/'
import { userService } from '../services/user'

import { BoardList } from '../cmps/board/BoardList'
import { BoardFilter } from '../cmps/board/BoardFilter'
import { NavLink, useNavigate } from 'react-router'
import { addBoard, loadBoards } from '../store/actions/board.actions'
import { DynamicPicker } from '../cmps/picker/DynamicPicker'

export function BoardIndex() {
    // const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())
    const navigate = useNavigate()
    const boards = useSelector(storeState => storeState.boardModule.boards)

    const [picker, setPicker] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const openPopover = Boolean(anchorEl)

    const PICKER_MAP = {
        CREATE_BOARD: {
            type: "CreateBoardPicker",
            info: {
                label: "Create Board:",
                propName: "createBoard",
            }
        }
    }

    useEffect(() => {
        function fetchData() {
            try {
                loadBoards()
            } catch (err) {
                showErrorMsg('Cannot load boards')
            }
        }

        fetchData()
    }, [])

    const handlePopoverOpen = (event, pickerType) => {
        setAnchorEl(event.currentTarget)
        setPicker(pickerType)
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }

    async function onAddBoard(newBoard) {
        let board = boardService.getEmptyBoard()
        board = { ...board, ...newBoard }
        try {
            const savedBoard = await addBoard(board)
            navigate(`/board/${savedBoard._id}`)
            showSuccessMsg(`Board added`)
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
                    <BoardList
                        boards={boards}
                        picker={PICKER_MAP.CREATE_BOARD}
                        handlePopoverOpen={handlePopoverOpen} onAddBoard={onAddBoard} />
                </div>
            </main>
            {picker && (
                <DynamicPicker
                    picker={picker}
                    open={openPopover}
                    onClose={handlePopoverClose}
                    anchorEl={anchorEl}
                    onAddBoard={onAddBoard}
                />
            )}
        </section>
    )
}