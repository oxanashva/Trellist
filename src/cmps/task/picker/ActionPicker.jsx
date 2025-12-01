export function ActionPicker({ setIsAddingTask, groupId, onRemoveGroup, onClose }) {

    return (
        <section className="action-picker">
            <header className="picker-header">
                <h2 className="picker-title">List actions</h2>
            </header>
            <ul>
                <li>
                    <button
                        className="action-btn"
                        onClick={() => {
                            setIsAddingTask(true)
                            onClose()
                        }}
                    >
                        Add task
                    </button>
                </li>
                <li>
                    <button
                        className="action-btn"
                        onClick={() => onRemoveGroup(groupId)}
                    >
                        Remove group
                    </button>
                </li>
            </ul>
        </section>
    )
}