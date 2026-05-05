import type { Board, User } from './models'
import type { BoardPrefs } from './models'

export interface BoardModuleState {
  boards: Board[]
  board: Board | null
  boardBackground: Partial<BoardPrefs>
  isLoading: boolean
}

export interface UserModuleState {
  user: User | null
  users: User[]
}

export interface RootState {
  boardModule: BoardModuleState
  userModule: UserModuleState
}
