import type { Board, Group, Task, Action, Label } from '@/types/models'
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import { board } from './board-data'

const STORAGE_KEY = 'board'

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

declare global {
  interface Window {
    bs: typeof boardService
  }
}

window.bs = boardService

// ------------------- Basic CRUD -------------------

async function query(): Promise<Board[]> {
  return storageService.query(STORAGE_KEY)
}

function getById(boardId: string): Promise<Board> {
  return storageService.get(STORAGE_KEY, boardId)
}

async function save(board: Board): Promise<Board> {
  if (board._id) {
    return storageService.put(STORAGE_KEY, board)
  } else {
    return storageService.post(STORAGE_KEY, board)
  }
}

async function remove(boardId: string): Promise<void> {
  return storageService.remove(STORAGE_KEY, boardId)
}

// ------------------- Group CRUD -------------------

async function addGroup(boardId: string, group: Group): Promise<Group> {
  const board = await getById(boardId)
  board.groups.push(group)
  await storageService.put(STORAGE_KEY, board)
  return group
}

async function updateGroup(boardId: string, updatedGroup: Group): Promise<Group> {
  const board = await getById(boardId)
  board.groups = board.groups.map((group) =>
    group._id === updatedGroup._id ? updatedGroup : group
  )
  await storageService.put(STORAGE_KEY, board)
  return updatedGroup
}

async function removeGroup(boardId: string, groupId: string): Promise<void> {
  const board = await getById(boardId)
  board.groups = board.groups.filter((g) => g._id !== groupId)
  await storageService.put(STORAGE_KEY, board)
}

// ------------------- Task CRUD -------------------

async function addTask(boardId: string, task: Task): Promise<Task> {
  const board = await getById(boardId)
  board.tasks.push(task)
  await storageService.put(STORAGE_KEY, board)
  return task
}

async function updateTask(
  boardId: string,
  taskId: string,
  fieldsToUpdate: Partial<Task>
): Promise<Task> {
  const board = await getById(boardId)
  let updatedTask: Task | null = null

  board.tasks = board.tasks.map((task) => {
    if (task._id !== taskId) return task
    updatedTask = { ...task, ...fieldsToUpdate }
    return updatedTask
  })

  if (!updatedTask) throw new Error('Task not found')
  await storageService.put(STORAGE_KEY, board)
  return updatedTask
}

async function removeTask(boardId: string, taskId: string): Promise<void> {
  const board = await getById(boardId)
  board.tasks = board.tasks.filter((t) => t._id !== taskId)
  await storageService.put(STORAGE_KEY, board)
}

// ------------------- Actions CRUD -------------------

async function addAction(boardId: string, action: Action): Promise<Action> {
  const board = await getById(boardId)
  board.actions.push(action)
  await storageService.put(STORAGE_KEY, board)
  return action
}

async function updateAction(boardId: string, updatedAction: Action): Promise<Action> {
  const board = await getById(boardId)
  board.actions = board.actions.map((a) => (a._id === updatedAction._id ? updatedAction : a))
  await storageService.put(STORAGE_KEY, board)
  return updatedAction
}

async function removeAction(boardId: string, actionId: string): Promise<void> {
  const board = await getById(boardId)
  board.actions = board.actions.filter((a) => a._id !== actionId)
  await storageService.put(STORAGE_KEY, board)
}

// ------------------- Labels CRUD -------------------

async function addLabel(boardId: string, label: Label): Promise<Label> {
  const board = await getById(boardId)
  board.labels.push(label)
  await storageService.put(STORAGE_KEY, board)
  return label
}

async function updateLabel(boardId: string, updatedLabel: Label): Promise<Label> {
  const board = await getById(boardId)
  board.labels = board.labels.map((l) => (l._id === updatedLabel._id ? updatedLabel : l))
  await storageService.put(STORAGE_KEY, board)
  return updatedLabel
}

async function removeLabel(boardId: string, labelId: string): Promise<void> {
  const board = await getById(boardId)
  board.labels = board.labels.filter((l) => l._id !== labelId)
  await storageService.put(STORAGE_KEY, board)
}

// ------------------- Board Messages -------------------

async function addBoardMsg(boardId: string, txt: string): Promise<{ id: string; by: unknown; txt: string }> {
  const board = await getById(boardId)

  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  ;(board as Board & { msgs: typeof msg[] }).msgs.push(msg)
  await storageService.put(STORAGE_KEY, board)
  return msg
}

// ------------------- Factory -------------------

function _createBoard(): void {
  const boardData = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') || []
  if (!boardData || !boardData.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board))
  }
}

_createBoard()
