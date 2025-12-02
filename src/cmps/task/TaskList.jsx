
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

import { makeId } from '../../services/util.service'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useFocusOnStateChange } from '../../customHooks/useFocusOnStateChange'

import { TaskPreview } from './TaskPreview'
import { ItemCreator } from '../ItemCreator'

export function TaskList({ group, tasks, actions, onAddTask, isAddingTask, setIsAddingTask }) {
    const { boardId } = useParams()
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
            idBoard: boardId,
            idGroup: group._id,
            name: taskName
        }
        onAddTask(boardId, newTask)
        setTaskName('')
    }

    const taskIds = tasks?.map(task => task._id) || []

    return (
        <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
            id={group._id} // Assign the Group ID as the container ID for correct task placement
        >
            <ol ref={scrollRef} className='task-list'>
                {tasks?.map(task => {
                    const taskActions = actions.filter(action => {
                        return action.data.idTask === task._id
                    })

                    return (
                        <TaskPreview
                            key={task._id}
                            id={task._id}
                            task={task}
                            taskActions={taskActions}
                        />
                    )
                }

                )}
                {isAddingTask &&
                    <ItemCreator
                        mode="task"
                        onSubmit={addTask}
                        textareaRef={textareaRef}
                        value={taskName}
                        onChange={handleInput}
                        placeholder="Enter a title or paste a link"
                        buttonText="Add task"
                        onCancel={() => setIsAddingTask(false)}
                    />
                }
            </ol>
        </SortableContext>
    )
}