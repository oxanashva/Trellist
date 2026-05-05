export interface Label {
  _id: string
  name: string
  color: string
}

export interface MemberCreator {
  _id: string
  username: string
  fullName: string
  avatarUrl?: string
}

export interface Action {
  _id: string
  date: number
  type: string
  data: {
    idTask: string
    text: string
  }
  memberCreator: MemberCreator
}

export interface TaskCover {
  coverColor?: string
  url?: string
  edgeColor?: string
}

export interface Task {
  _id: string
  idBoard: string
  idGroup: string
  name: string
  desc?: string
  closed: boolean
  cover: TaskCover
  idLabels: string[]
  idMembers: string[]
  due?: string
  start?: string
  dueTime?: string
}

export interface Group {
  _id: string
  idBoard: string
  name: string
}

export interface BoardPrefs {
  background?: string
  backgroundImage?: string
}

export interface User {
  _id: string
  username: string
  fullName: string
  imgUrl?: string
  avatarUrl?: string
  initials: string
  isAdmin?: boolean
}

export interface Board {
  _id: string
  name: string
  desc?: string
  closed: boolean
  isStarred: boolean
  prefs: BoardPrefs
  members: User[]
  groups: Group[]
  tasks: Task[]
  actions: Action[]
  labels: Label[]
}
