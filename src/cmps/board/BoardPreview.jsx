import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
    return <article className="board-preview">
        <Link to={`/board/${board._id}`}>
            <div className="board-img">
                {/* <img src={board.imgUrl} alt="" /> */}
            </div>
            <h3 className="board-name">{board.name}</h3>
        </Link>
    </article>
}