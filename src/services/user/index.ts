import { userService as local } from './user.service.local'
import { userService as remote } from './user.service.remote'

const { DEV, VITE_LOCAL } = import.meta.env

interface NewUser {
  username: string
  password: string
  fullname: string
  isAdmin: boolean
  score: number
}

function getEmptyUser(): NewUser {
  return {
    username: '',
    password: '',
    fullname: '',
    isAdmin: false,
    score: 100,
  }
}

const service = VITE_LOCAL === 'true' ? local : remote

export const userService = { ...service, getEmptyUser }

declare global {
  interface Window {
    userService: typeof userService
  }
}

if (DEV) window.userService = userService
