import type { User } from '@/types/models'
import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

interface UserCredentials {
  username: string
  password: string
  fullname?: string
  imgUrl?: string
  score?: number
  isAdmin?: boolean
}

export const userService = {
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUser,
  saveLoggedinUser,
}

function getUsers(): Promise<User[]> {
  return httpService.get<User[]>(`user`)
}

async function getById(userId: string): Promise<User> {
  return httpService.get<User>(`user/${userId}`)
}

function remove(userId: string): Promise<void> {
  return httpService.delete<void>(`user/${userId}`)
}

async function update({ _id, score }: { _id: string; score: number }): Promise<User> {
  const user = await httpService.put<User>(`user/${_id}`, { _id, score })

  const loggedinUser = getLoggedinUser()
  if (loggedinUser?._id === user._id) saveLoggedinUser(user)

  return user
}

async function login(userCred: UserCredentials): Promise<User | undefined> {
  const user = await httpService.post<User>('auth/login', userCred)
  if (user) return saveLoggedinUser(user)
}

async function signup(userCred: UserCredentials): Promise<User> {
  if (!userCred.imgUrl)
    userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  userCred.score = 10000

  const user = await httpService.post<User>('auth/signup', userCred)
  return saveLoggedinUser(user)
}

async function logout(): Promise<void> {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  await httpService.post('auth/logout')
}

function getLoggedinUser(): User | null {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) ?? 'null')
}

function saveLoggedinUser(user: User & { password?: string; fullname?: string }): User {
  const sessionUser = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    score: (user as unknown as { score?: number }).score,
    isAdmin: user.isAdmin,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(sessionUser))
  return sessionUser as unknown as User
}
