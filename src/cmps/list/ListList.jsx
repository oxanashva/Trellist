import { ListPreview } from "./ListPreview"

import Plus from '../../assets/images/icons/plus.svg?react'

export function ListList({ lists, cards }) {

    return (
        <section className="list-list">
            <ol className="lists">
                {lists.map(list => {
                    const cardsForThisList = cards.filter(card => card.idList === list._id)
                    return <ListPreview key={list._id} list={list} cards={cardsForThisList} />
                }
                )}
                <div className="add-list">
                    <button className="dynamic-btn">
                        <Plus width={16} height={16} fill="currentColor" />
                        <span>Add a card</span>
                    </button>
                </div>
            </ol>
        </section>
    )
}