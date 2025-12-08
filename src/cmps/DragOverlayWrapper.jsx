import { GroupPreview } from '../cmps/group/GroupPreview'
import { TaskPreview } from '../cmps/task/TaskPreview'

export function DragOverlayWrapper({ activeId, board }) {
    if (!activeId || !board) return null

    const isDraggingGroup = board.groups.some(g => g._id === activeId)
    const activeGroup = board.groups.find(g => g._id === activeId)
    const groupTasks = activeGroup ? board.tasks.filter(t => t.idGroup === activeGroup._id) : null

    if (isDraggingGroup) {
        return (
            <GroupPreview group={activeGroup} tasks={groupTasks} className="group-preview group-preview-ghost" />
        )
    }

    const activeTask = board.tasks.find(t => t._id === activeId)
    const taskGroup = activeTask ? board.groups.find(g => g._id === activeTask.idGroup) : null

    if (activeTask && taskGroup) {
        return (
            <TaskPreview task={activeTask} group={taskGroup} className="task-preview task-preview-ghost" />
        )
    }

    return null
}