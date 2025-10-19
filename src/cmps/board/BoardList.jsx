import { BoardPreview } from './BoardPreview'

export function BoardList({ boards, onAddBoard }) {

    return <section>
        <ul className="board-list">
            {boards.map(board =>
                <li key={board._id}>
                    <BoardPreview board={board} />
                </li>)
            }
            <button onClick={onAddBoard}>Create new board</button>
        </ul>
    </section>
}