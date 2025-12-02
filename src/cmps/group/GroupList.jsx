import { useState } from "react"

import { makeId } from "../../services/util.service"
import { GroupPreview } from "./GroupPreview"
import { useFocusOnStateChange } from "../../customHooks/useFocusOnStateChange"

import PlusIcon from '../../assets/images/icons/plus.svg?react'
import { ItemCreator } from "../ItemCreator"
import { useParams } from "react-router"

export function GroupList({ groups, tasks, actions, onAddGroup, onRemoveGroup, onUpdateGroup, onAddTask }) {
    const { boardId } = useParams()
    const [groupName, setGroupName] = useState('')
    const [isAddingGroup, setIsAddingGroup] = useState(false)
    const textareaRef = useFocusOnStateChange(isAddingGroup)

    function handleInput({ target }) {
        setGroupName(target.value)
    }

    function addGroup(e) {
        e.preventDefault()
        if (!groupName) return

        const newGroup = {
            _id: makeId(),
            idBoard: boardId,
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
                        group={group}
                        tasks={tasksForThisGroup}
                        actions={actions}
                        onRemoveGroup={onRemoveGroup}
                        onUpdateGroup={onUpdateGroup}
                        onAddTask={onAddTask}
                    />
                }
                )}
                {isAddingGroup &&
                    <ItemCreator
                        mode="group"
                        onSubmit={addGroup}
                        textareaRef={textareaRef}
                        value={groupName}
                        onChange={handleInput}
                        placeholder="Enter group name"
                        buttonText="Add group"
                        onCancel={() => setIsAddingGroup(false)}
                    />
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