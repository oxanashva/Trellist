import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { loadCars, addCar, updateCar, removeCar, addCarMsg } from '../store/actions/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { boardService } from '../services/board/'
import { userService } from '../services/user'

import { BoardList } from '../cmps/board/BoardList'
import { BoardFilter } from '../cmps/board/BoardFilter'

export function BoardIndex() {
    const inputRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false);
    // const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())
    // const cars = useSelector(storeState => storeState.carModule.cars)

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }
    }, [isEditing])

    // useEffect(() => {
    //     loadCars(filterBy)
    // }, [filterBy])

    async function onRemoveCar(carId) {
        try {
            await removeCar(carId)
            showSuccessMsg('Car removed')
        } catch (err) {
            showErrorMsg('Cannot remove car')
        }
    }

    async function onAddCar() {
        const car = boardService.getEmptyCar()
        car.vendor = prompt('Vendor?', 'Some Vendor')
        try {
            const savedCar = await addCar(car)
            showSuccessMsg(`Car added (id: ${savedCar._id})`)
        } catch (err) {
            showErrorMsg('Cannot add car')
        }
    }

    async function onUpdateCar(car) {
        const speed = +prompt('New speed?', car.speed) || 0
        if (speed === 0 || speed === car.speed) return

        const carToSave = { ...car, speed }
        try {
            const savedCar = await updateCar(carToSave)
            showSuccessMsg(`Car updated, new speed: ${savedCar.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update car')
        }
    }

    function handleTitleClick() {
        setIsEditing(true)
    }

    function handleInputBlur() {
        setIsEditing(false);
    }

    const h1ClassName = `board-title ${isEditing ? 'hidden' : ''}`
    const inputClassName = `board-title ${isEditing ? '' : 'hidden'}`

    return (
        <section className="board-index full">
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
            </header>
            {/* <header>
                <h2>Cars</h2>
                {userService.getLoggedinUser() && <button onClick={onAddCar}>Add a Car</button>}
            </header>
            <BoardFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <BoardList
                cars={cars}
                onRemoveCar={onRemoveCar}
                onUpdateCar={onUpdateCar} /> */}
        </section>
    )
}