import { BoardPreview } from './BoardPreview'

export function BoardList({ boards, picker, handlePopoverOpen }) {
  return (
    <section>
      <ul className="board-list">
        {boards?.map((board) => (
          <li key={board._id} className="board-preview">
            <BoardPreview board={board} />
          </li>
        ))}
        <li
          onClick={(event) => {
            handlePopoverOpen(event, picker)
          }}
        >
          <div>Create new board</div>
        </li>
      </ul>
    </section>
  )
}
