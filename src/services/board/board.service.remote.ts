import type { Board, Group, Task, Action, Label } from '@/types/models'
import { httpService } from '../http.service'

export const boardService = {
  query,
  getById,
  save,
  remove,
  // Group CRUD
  addGroup,
  updateGroup,
  removeGroup,
  // Task CRUD
  addTask,
  updateTask,
  removeTask,
  // Action CRUD
  addAction,
  updateAction,
  removeAction,
  // Labels CRUD
  addLabel,
  updateLabel,
  removeLabel,
  // Board messages
  addBoardMsg,
}

// ------------------- Basic CRUD -------------------

async function query(filterBy = { name: '' }): Promise<Board[]> {
  return httpService.get<Board[]>(`board`, filterBy as Record<string, unknown>)
}

function getById(boardId: string): Promise<Board> {
  return httpService.get<Board>(`board/${boardId}`)
}

async function save(board: Board): Promise<Board> {
  if (board._id) {
    return httpService.put<Board>(`board/${board._id}`, board)
  } else {
    return httpService.post<Board>('board', board)
  }
}

async function remove(boardId: string): Promise<void> {
  return httpService.delete<void>(`board/${boardId}`)
}

// ------------------- Group CRUD -------------------

async function addGroup(boardId: string, group: Group): Promise<Group> {
  return httpService.post<Group>(`board/${boardId}/group`, group)
}

async function updateGroup(boardId: string, group: Group): Promise<Group> {
  return httpService.put<Group>(`board/${boardId}/group/${group._id}`, group)
}

async function removeGroup(boardId: string, groupId: string): Promise<void> {
  return httpService.delete<void>(`board/${boardId}/group/${groupId}`)
}

// ------------------- Task CRUD -------------------

async function addTask(boardId: string, task: Task): Promise<Task> {
  return httpService.post<Task>(`board/${boardId}/task`, task)
}

async function updateTask(
  boardId: string,
  taskId: string,
  fieldsToUpdate: Partial<Task>
): Promise<Task> {
  return httpService.put<Task>(`board/${boardId}/task/${taskId}`, fieldsToUpdate)
}

async function removeTask(boardId: string, taskId: string): Promise<void> {
  return httpService.delete<void>(`board/${boardId}/task/${taskId}`)
}

// ------------------- Action CRUD -------------------

async function addAction(boardId: string, action: Action): Promise<Action> {
  return httpService.post<Action>(`board/${boardId}/action`, action)
}

async function updateAction(boardId: string, action: Action): Promise<Action> {
  return httpService.put<Action>(`board/${boardId}/action/${action._id}`, action)
}

async function removeAction(boardId: string, actionId: string): Promise<void> {
  return httpService.delete<void>(`board/${boardId}/action/${actionId}`)
}

// ------------------- Labels CRUD -------------------

async function addLabel(boardId: string, label: Label): Promise<Label> {
  return httpService.post<Label>(`board/${boardId}/label`, label)
}

async function updateLabel(boardId: string, label: Label): Promise<Label> {
  return httpService.put<Label>(`board/${boardId}/label/${label._id}`, label)
}

async function removeLabel(boardId: string, labelId: string): Promise<void> {
  return httpService.delete<void>(`board/${boardId}/label/${labelId}`)
}

// ------------------- Board Messages -------------------

async function addBoardMsg(boardId: string, txt: string): Promise<Action> {
  return httpService.post<Action>(`board/${boardId}/msg`, { txt })
}
