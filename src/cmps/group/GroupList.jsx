import { useEffect, useRef, useState } from "react"

import { makeId } from "../../services/util.service"
import { GroupPreview } from "./GroupPreview"

import PlusIcon from '../../assets/images/icons/plus.svg?react'
import CloseIcon from '../../assets/images/icons/close.svg?react'

export function GroupList({ board, groups, tasks, onAddTask, onAddGroup, onCompleteTask, onUpdateGroup }) {
    const [groupName, setGroupName] = useState('')
    const [isAddingGroup, setIsAddingGroup] = useState(false)
    const textareaRef = useRef(null)


    useEffect(() => {
        if (isAddingGroup) {
            textareaRef.current?.focus()
        }
    }, [isAddingGroup])

    function handleInput({ target }) {
        setGroupName(target.value)
    }

    function addGroup(e) {
        e.preventDefault()
        if (!groupName) return

        const newGroup = {
            _id: makeId(),
            idBoard: board._id,
            name: groupName
        }
        onAddGroup(newGroup)
        setGroupName('')
        setIsAddingGroup(false)
    }

    return (
        <section className="group-list">
            <ol className="groups">
                {groups?.map(group => {
                    const tasksForThisGroup = tasks?.filter(task => task.idGroup === group._id)
                    return <GroupPreview
                        key={group._id}
                        id={group._id}
                        board={board}
                        group={group}
                        tasks={tasksForThisGroup}
                        onAddTask={onAddTask}
                        onCompleteTask={onCompleteTask}
                        onUpdateGroup={onUpdateGroup}
                    />
                }
                )}
                {isAddingGroup &&
                    <li className="group-preview add-group-item">
                        <form className="add-group-form" onSubmit={addGroup}>
                            <textarea
                                ref={textareaRef}
                                className="add-group-textarea"
                                onChange={handleInput}
                                type="text"
                                value={groupName}
                                placeholder="Enter group name" />
                            <div className="add-group-actions">
                                <button
                                    className="btn-primary"
                                    type="submit"
                                    onClick={addGroup}
                                >
                                    Add group
                                </button>
                                <button
                                    className="icon-btn dynamic-btn"
                                    onClick={() => setIsAddingGroup(false)}
                                >
                                    <CloseIcon width={16} height={16} fill="currentColor" />
                                </button>
                            </div>
                        </form>
                    </li>
                }
                {!isAddingGroup &&
                    <div className="add-group">
                        <button className="dynamic-btn" onClick={() => setIsAddingGroup(true)}>
                            <PlusIcon width={16} height={16} fill="currentColor" />
                            <span>Add a group</span>
                        </button>
                    </div>
                }
            </ol>
        </section>
    )
}