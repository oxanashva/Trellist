import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

import { loadBoard, addBoard, updateBoard, removeBoard, addBoardMsg } from '../store/actions/board.actions'

import osAvatarImg from '../assets/images/avatars/OS-avatar.png'
import acAvatarImg from '../assets/images/avatars/AC-avatar.png'
import Filter from '../assets/images/icons/filter.svg?react'
import Star from '../assets/images/icons/star.svg?react'
import UserPlus from '../assets/images/icons/user-plus.svg?react'
import More from '../assets/images/icons/more.svg?react'

import { ListList } from '../cmps/list/ListList'

export function BoardDetails() {
    const inputRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)
    // const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())
    // const cars = useSelector(storeState => storeState.carModule.cars)

    const { boardId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }
    }, [isEditing])

    function onAddCard(newCard) {
        updateBoard({
            ...board,
            cards: [...board.cards, newCard]
        })
    }


    // useEffect(() => {
    //     loadCars(filterBy)
    // }, [filterBy])

    // async function onRemoveCar(carId) {
    //     try {
    //         await removeCar(carId)
    //         showSuccessMsg('Car removed')
    //     } catch (err) {
    //         showErrorMsg('Cannot remove car')
    //     }
    // }

    // async function onAddCar() {
    //     const car = boardService.getEmptyCar()
    //     car.vendor = prompt('Vendor?', 'Some Vendor')
    //     try {
    //         const savedCar = await addCar(car)
    //         showSuccessMsg(`Car added (id: ${savedCar._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add car')
    //     }
    // }

    // async function onUpdateCar(car) {
    //     const speed = +prompt('New speed?', car.speed) || 0
    //     if (speed === 0 || speed === car.speed) return

    //     const carToSave = { ...car, speed }
    //     try {
    //         const savedCar = await updateCar(carToSave)
    //         showSuccessMsg(`Car updated, new speed: ${savedCar.speed}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update car')
    //     }
    // }

    function handleTitleClick() {
        setIsEditing(true)
    }

    function handleInputBlur() {
        setIsEditing(false);
    }

    const h1ClassName = `board-title ${isEditing ? 'hidden' : ''}`
    const inputClassName = `board-title ${isEditing ? '' : 'hidden'}`

    return (
        <section className="board-details full">
            <header>
                <div>
                    <h1
                        className={h1ClassName}
                        onClick={handleTitleClick}
                    >
                        Trellist Agile Sprint Board
                    </h1>
                    <input
                        ref={inputRef}
                        className={inputClassName}
                        type="text"
                        value="Trellist Agile Sprint Board"
                        onBlur={handleInputBlur}
                    />
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
                        <Filter width={16} height={16} fill="currentColor" />
                    </button>
                    <button className="dynamic-btn icon-btn action-dynamic-btn">
                        <Star width={16} height={16} fill="currentColor" />
                    </button>
                    <button className="btn-highlighted">
                        <UserPlus width={16} height={16} fill="currentColor" />
                        <span>Share</span>
                    </button>
                    <button className="dynamic-btn icon-btn action-dynamic-btn">
                        <More width={16} height={16} fill="currentColor" />
                    </button>
                </div>
            </header>

            {board && <ListList board={board} lists={board.lists} cards={board.cards} onAddCard={onAddCard} />}
        </section>
    )
}