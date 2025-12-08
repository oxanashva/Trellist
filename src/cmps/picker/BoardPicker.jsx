import StarIcon from '../../assets/images/icons/star.svg?react'
import StarSolidIcon from '../../assets/images/icons/star-solid.svg?react'

export function BoardPicker({ setStarred, isStarred }) {

    const starBtnStyle = isStarred ? { color: '#FBC828' } : {}

    return (
        <section className="board-picker">
            <header className="picker-header">
                <h2 className="picker-title">Menu</h2>
            </header>
            <ul>
                <li>
                    <button
                        className="action-btn"
                        onClick={setStarred}
                    >
                        <span style={starBtnStyle}>
                            {isStarred
                                ? <StarSolidIcon width={16} height={16} />
                                : <StarIcon width={16} height={16} />}
                        </span>
                        <span className="action-btn-text">Star</span>
                    </button>
                </li>
                <li>
                    <button
                        className="action-btn"
                        onClick={setStarred}
                    >
                        Change background
                    </button>
                </li>
                <li>
                    <button
                        className="action-btn"
                        onClick={setStarred}
                    >
                        Close board
                    </button>
                </li>
            </ul>
        </section>
    )
}