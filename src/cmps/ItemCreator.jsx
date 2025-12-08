import CloseIcon from '../assets/images/icons/close.svg?react'

export function ItemCreator({ mode, onSubmit, textareaRef, value, onChange, placeholder, buttonText, onCancel }) {
    const className = `item-creator ${mode}`

    return (
        <li className={className}>
            <form className="add-task-form" onSubmit={onSubmit}>
                <textarea
                    ref={textareaRef}
                    className="add-task-textarea"
                    name="taskName"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                <div className="add-task-actions">
                    <button
                        className="btn-primary"
                        type="submit"
                    >
                        {buttonText}
                    </button>
                    <button
                        className="icon-btn dynamic-btn"
                        type="button"
                        onClick={onCancel}
                    >
                        <CloseIcon width={16} height={16} fill="currentColor" />
                    </button>
                </div>
            </form>
        </li>

    )
}