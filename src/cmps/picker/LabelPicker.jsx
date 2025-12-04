import { useState } from "react"
import { labelsColorsMap, makeId } from "../../services/util.service"
import PenIcon from "../../assets/images/icons/pen.svg?react"

const allAvailableLabels = Object.keys(labelsColorsMap).map((colorKey, idx) => ({
    _id: makeId(),
    name: "",
    color: colorKey,
}))

export function LabelPicker({ task, onUpdateTask, onClose }) {
    const [hasLabels, setHasLabels] = useState(task.labels.length > 0)

    return (
        <section className="label-picker">
            <header className="picker-header">
                <h2 className="picker-title">Labels</h2>
            </header>

            <div className="picker-container">
                {hasLabels &&
                    task.labels.map((label) => {
                        const labelHexColor = labelsColorsMap[label.color]
                        return (
                            <div className="label-container" key={label._id}>
                                <label className="label-item" key={label._id} htmlFor={label._id}>
                                    <input type="checkbox" name="label" id={label._id} />
                                    <span className="label-checkbox">
                                        <span style={{ backgroundColor: labelHexColor }}>{label.name}</span>
                                    </span>
                                </label>
                                <button className="icon-btn dynamic-btn">
                                    <PenIcon width={16} height={16} fill="currentColor" />
                                </button>
                            </div>
                        )
                    })}
                {!hasLabels &&
                    allAvailableLabels.map((label) => {
                        const labelHexColor = labelsColorsMap[label.color]
                        return (
                            <div className="label-container" key={label._id}>
                                <label className="label-item" key={label._id} htmlFor={label._id}>
                                    <input type="checkbox" name="label" id={label._id} />
                                    <span className="label-checkbox">
                                        <span style={{ backgroundColor: labelHexColor }}>{label.name}</span>
                                    </span>
                                </label>
                                <button className="icon-btn dynamic-btn">
                                    <PenIcon width={16} height={16} fill="currentColor" />
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            {/* <label htmlFor={id}>{info.label || 'Label:'}</label>
            <input type="color" id={id} value={info.selectedColor} onChange={(ev) => {
                onUpdateTask(ev.target.value)
            }} /> */}
        </section>
    )
}