import { ListPreview } from "./ListPreview"

import Plus from '../../assets/images/icons/plus.svg?react'

export function ListList({ board, lists, cards, onAddCard }) {

    return (
        <section className="list-list">
            <ol className="lists">
                {lists.map(list => {
                    const cardsForThisList = cards.filter(card => card.idList === list._id)
                    return <ListPreview key={list._id} board={board} list={list} cards={cardsForThisList} onAddCard={onAddCard} />
                }
                )}
                <li className="list-preview">
                    <form>
                        <input type="text" placeholder="Enter list name" />
                    </form>
                </li>
                <div className="add-list">
                    <button className="dynamic-btn">
                        <Plus width={16} height={16} fill="currentColor" />
                        <span>Add a list</span>
                    </button>
                </div>
            </ol>
        </section>
    )
}