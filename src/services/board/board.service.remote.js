import { httpService } from '../http.service'
import { makeId } from '../util.service'

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

async function query(filterBy = { name: '' }) {
  return httpService.get(`board`, filterBy)
}

function getById(boardId) {
  return httpService.get(`board/${boardId}`)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    savedBoard = await httpService.put(`board/${board._id}`, board)
  } else {
    savedBoard = await httpService.post('board', board)
  }
  return savedBoard
}

async function remove(boardId) {
  return httpService.delete(`board/${boardId}`)
}

// ------------------- Group CRUD -------------------

async function addGroup(boardId, group) {
  const savedGroup = await httpService.post(`board/${boardId}/group`, group)
  return savedGroup
}

async function updateGroup(boardId, group) {
  const savedGroup = await httpService.put(`board/${boardId}/group/${group._id}`, group)
  return savedGroup
}

async function removeGroup(boardId, groupId) {
  return httpService.delete(`board/${boardId}/group/${groupId}`)
}

// ------------------- Task CRUD -------------------

async function addTask(boardId, task) {
  const savedTask = await httpService.post(`board/${boardId}/task`, task)
  return savedTask
}

async function updateTask(boardId, taskId, fieldsToUpdate) {
  const savedTask = await httpService.put(`board/${boardId}/task/${taskId}`, fieldsToUpdate)
  return savedTask
}

async function removeTask(boardId, taskId) {
  return httpService.delete(`board/${boardId}/task/${taskId}`)
}

// ------------------- Action CRUD -------------------

async function addAction(boardId, action) {
  const savedAction = await httpService.post(`board/${boardId}/action`, action)
  return savedAction
}

async function updateAction(boardId, action) {
  const savedAction = await httpService.put(`board/${boardId}/action/${action._id}`, action)
  return savedAction
}

async function removeAction(boardId, actionId) {
  return httpService.delete(`board/${boardId}/action/${actionId}`)
}

// ------------------- Labels CRUD -------------------

async function addLabel(boardId, label) {
  const savedLabel = await httpService.post(`board/${boardId}/label`, label)
  return savedLabel
}

async function updateLabel(boardId, label) {
  const savedLabel = await httpService.put(`board/${boardId}/label/${label._id}`, label)
  return savedLabel
}

async function removeLabel(boardId, labelId) {
  return httpService.delete(`board/${boardId}/label/${labelId}`)
}

// ------------------- Board Messages -------------------

async function addBoardMsg(boardId, txt) {
  const savedMsg = await httpService.post(`board/${boardId}/msg`, { txt })
  return savedMsg
}
