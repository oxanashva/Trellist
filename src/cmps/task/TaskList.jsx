
import { useEffect, useRef, useState } from 'react'
import { makeId } from '../../services/util.service'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useFocusOnStateChange } from '../../customHooks/useFocusOnStateChange'

import { TaskPreview } from './TaskPreview'

import CloseIcon from '../../assets/images/icons/close.svg?react'

export function TaskList({ board, group, tasks, onAddTask, setIsAddingTask, isAddingTask, onCompleteTask }) {
    const [taskName, setTaskName] = useState('')
    const textareaRef = useFocusOnStateChange(isAddingTask)
    const scrollRef = useRef(null)

    useEffect(() => {
        if (isAddingTask) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [isAddingTask])

    function handleInput({ target }) {
        const { name, value } = target

        if (name === 'taskName') {
            setTaskName(value)
        }
    }

    function addTask(e) {
        e.preventDefault()
        if (!taskName) return

        const newTask = {
            _id: makeId(),
            idBoard: board._id,
            idGroup: group._id,
            name: taskName
        }
        onAddTask(newTask)
        setTaskName('')
        setIsAddingTask(false)
    }

    const taskIds = tasks?.map(task => task._id) || []

    return (
        <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
            id={group._id} // Assign the Group ID as the container ID for correct task placement
        >
            <ol ref={scrollRef} className='task-list'>
                {tasks?.map(task =>
                    <TaskPreview
                        key={task._id}
                        id={task._id}
                        board={board}
                        task={task}
                        onCompleteTask={onCompleteTask}
                    />
                )}
                {isAddingTask &&
                    <li>
                        <form className="add-task-form" onSubmit={addTask}>
                            <textarea
                                ref={textareaRef}
                                className="add-task-textarea"
                                name="taskName"
                                value={taskName}
                                onChange={handleInput}
                                placeholder="Enter a title or paste a link"
                            />
                            <div className="add-task-actions">
                                <button
                                    className="btn-primary"
                                    type="submit"
                                    onClick={addTask}
                                >
                                    Add task
                                </button>
                                <button
                                    className="icon-btn dynamic-btn"
                                    onClick={() => setIsAddingTask(false)}
                                >
                                    <CloseIcon width={16} height={16} fill="currentColor" />
                                </button>
                            </div>
                        </form>
                    </li>
                }
            </ol>
        </SortableContext>
    )
}