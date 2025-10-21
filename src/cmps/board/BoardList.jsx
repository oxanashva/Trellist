import { BoardPreview } from './BoardPreview'

export function BoardList({ boards, onAddBoard }) {

    return (
        <section>
            <ul className="board-list">
                {boards.map(board =>
                    <li key={board._id} className="board-preview">
                        <BoardPreview board={board} />
                    </li>)
                }
                <li onClick={onAddBoard}><div>Create new board</div></li>
            </ul>
        </section>
    )
}