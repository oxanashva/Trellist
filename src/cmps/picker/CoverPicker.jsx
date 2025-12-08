import { useState } from "react";
import { coverColorsMap } from "../../services/util.service";

export function CoverPicker({ task, onUpdateTask }) {
    const [selectedColorKey, setSelectedColorKey] = useState(task?.cover?.coverColor || Object.keys(coverColorsMap)[0])

    function onSaveCover(colorKey) {
        setSelectedColorKey(colorKey)
        onUpdateTask(task.idBoard, { cover: { coverColor: colorKey } })
    }

    function onRemoveCover() {
        setSelectedColorKey(null)
        onUpdateTask(task.idBoard, { cover: null })
    }

    return (
        <section className="cover-picker">
            <header className="picker-header">
                <h2 className="picker-title">Cover</h2>
            </header>
            <div className="cover-editor">
                <h3 className="picker-subtitle">Colors</h3>
                <ul className="cover-colors-container">
                    {Object.keys(coverColorsMap).map((colorKey, idx) => (
                        <li key={colorKey} className={`cover-colors-item ${selectedColorKey === colorKey ? 'selected' : ''}`}>
                            <button
                                key={colorKey}
                                className="cover-colors-btn"
                                onClick={() => onSaveCover(colorKey)}
                                style={{ backgroundColor: coverColorsMap[colorKey] }}
                            ></button>
                        </li>
                    ))}
                </ul>
                <button
                    className="btn-secondary"
                    onClick={onRemoveCover}
                >
                    Remove cover
                </button>
            </div>
        </section>
    )
}