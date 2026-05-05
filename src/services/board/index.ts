import type { Board } from '@/types/models'
import { getDefaultLabels } from '../util.service'
import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

const { DEV, VITE_LOCAL } = import.meta.env

interface BoardFilter {
  txt: string
  sortField: string
  sortDir: string
}

type NewBoard = Omit<Board, '_id'>

function getEmptyBoard(): NewBoard {
  return {
    name: '',
    desc: '',
    closed: false,
    isStarred: false,
    prefs: {
      background: '#1868DB',
    },
    actions: [],
    groups: [],
    tasks: [],
    labels: getDefaultLabels(),
    members: [
      {
        _id: '68e809da40f4d09300719d2d',
        avatarUrl: 'https://res.cloudinary.com/da9naclpy/image/upload/v1773855391/AC_lkfc1u.jpg',
        fullName: 'Anna Coss',
        initials: 'AC',
        username: 'annacoss',
      },
      {
        _id: '5eafad22c718790469a3db7a',
        avatarUrl: 'https://res.cloudinary.com/da9naclpy/image/upload/v1773855391/OR_jotrqa.jpg',
        fullName: 'Otto Ross',
        initials: 'OR',
        username: 'ottoross',
      },
    ],
  }
}

function getDefaultFilter(): BoardFilter {
  return {
    txt: '',
    sortField: '',
    sortDir: '',
  }
}

const service = VITE_LOCAL === 'true' ? local : remote

export const boardService = { getEmptyBoard, getDefaultFilter, ...service }

declare global {
  interface Window {
    boardService: typeof boardService
  }
}

if (DEV) window.boardService = boardService
