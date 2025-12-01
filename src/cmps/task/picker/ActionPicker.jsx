
export function ActionPicker({ setIsAddingTask, onEditTask, onRemoveTask, onRemoveGroup, onClose }) {

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
                        onClick={onEditTask}
                    >
                        Edit task
                    </button>
                </li>
                <li>
                    <button
                        className="action-btn"
                        onClick={onRemoveTask}
                    >
                        Remove task
                    </button>
                </li>
                <div className="divider"></div>
                <li>
                    <button
                        className="action-btn"
                        onClick={onRemoveGroup}
                    >
                        Remove group
                    </button>
                </li>
            </ul>
        </section>
    )
}