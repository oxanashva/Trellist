import { userService } from '../../services/user'
import { BoardPreview } from './BoardPreview'

export function BoardList({ cars, onRemoveCar, onUpdateCar }) {

    function shouldShowActionBtns(car) {
        const user = userService.getLoggedinUser()

        if (!user) return false
        if (user.isAdmin) return true
        return car.owner?._id === user._id
    }

    return <section>
        <ul className="car-list">
            {cars.map(car =>
                <li key={car._id}>
                    <BoardPreview car={car} />
                    {shouldShowActionBtns(car) && <div className="actions">
                        <button onClick={() => onUpdateCar(car)}>Edit</button>
                        <button onClick={() => onRemoveCar(car._id)}>x</button>
                    </div>}
                </li>)
            }
        </ul>
    </section>
}