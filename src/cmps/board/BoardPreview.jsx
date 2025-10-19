import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
    return <article className="board-preview">
        <Link to={`/board/${board._id}`}>
            <img src={board.imgUrl} alt="" />
            <h3>{board.name}</h3>
        </Link>
    </article>
}