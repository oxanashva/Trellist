import { CardPreview } from "../card/CardPreview";


export function ListPreview({ cards }) {
    return (
        <ol className="list-preview">
            {cards.map(card =>
                <li key={card._id}>
                    <CardPreview card={card} />
                </li>
            )}
        </ol>
    )
}