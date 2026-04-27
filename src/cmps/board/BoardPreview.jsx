import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
  const boardStyle = { backgroundImage: `url(${board.prefs.backgroundImage})` }

  return (
    <article className="board-preview">
      <Link to={`/board/${board._id}`}>
        <div style={boardStyle} className="board-background"></div>
        <h3 className="board-name">{board.name}</h3>
      </Link>
    </article>
  )
}
