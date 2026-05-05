const { DEV, VITE_LOCAL } = import.meta.env

import { getDefaultLabels } from '../util.service'
import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

function getEmptyBoard() {
  return {
    name: '',
    desc: '',
    closed: false,
    dateClosed: null,
    isStarred: false,
    prefs: {
      background: '#1868DB',
    },
    idMemberCreator: '5eafad22c718790469a3db7a',
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
    uploadedImages: [],
  }
}

function getDefaultFilter() {
  return {
    txt: '',
    sortField: '',
    sortDir: '',
  }
}

const service = VITE_LOCAL === 'true' ? local : remote

export const boardService = { getEmptyBoard, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService
