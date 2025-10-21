import { makeId } from "../../../services/util.service"

export function DatePicker({ info, onUpdate }) {
    const id = 'date-' + makeId()
    return <section className="date-picker">
        <label htmlFor={id}>{info.label || 'Date:'}</label>
        <input type="date" id={id} value={info.selectedDate} onChange={(ev) => {
            onUpdate(ev.target.value)
        }} />
    </section>
}
