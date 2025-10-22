import { makeId } from "../../../services/util.service"

export function LabelPicker({ info, onUpdate }) {
    const id = 'label-' + makeId()

    return (
        <section className="label-picker">
            <label htmlFor={id}>{info.label || 'Label:'}</label>
            <input type="color" id={id} value={info.selectedColor} onChange={(ev) => {
                onUpdate(ev.target.value)
            }} />
        </section>
    )
}