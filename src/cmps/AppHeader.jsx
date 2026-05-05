import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board'
import { addBoard } from '../store/actions/board.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { getContrastingTextColor } from '../services/util.service'
import { DynamicPicker } from './picker/DynamicPicker'
import TrellisIcon from '../assets/images/icons/trellis.svg?react'

const DARK_TEXT_COLOR = 'rgb(23, 43, 77)'

export function AppHeader() {
  // const user = useSelector(storeState => storeState.userModule.user)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const board = useSelector((storeState) => storeState.boardModule.board)
  const boardBgColor = board?.prefs?.background

  const [picker, setPicker] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const openPopover = Boolean(anchorEl)

  const PICKER_MAP = {
    CREATE_BOARD: {
      type: 'CreateBoardPicker',
      info: {
        label: 'Create Board:',
        propName: 'createBoard',
      },
    },
  }

  const handlePopoverOpen = (event, pickerType) => {
    setAnchorEl(event.currentTarget)
    setPicker(pickerType)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  async function onAddBoard(newBoard) {
    let board = boardService.getEmptyBoard()
    board = { ...board, ...newBoard }
    try {
      const savedBoard = await addBoard(board)
      navigate(`/board/${savedBoard._id}`)
      showSuccessMsg(`Board added`)
    } catch (err) {
      showErrorMsg('Cannot add board')
    }
  }

  async function onLogout() {
    try {
      await logout()
      navigate('/')
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  const isHomePage = pathname.includes('/home')
  const isWorkspacePage = pathname.includes('/workspace')
  const isBoardPage = pathname.includes('/board')
  const headerClassName = `app-header full ${isHomePage ? 'home-header' : ''}`

  const isWhiteBgPage = isWorkspacePage || isHomePage

  const fontColor = isWhiteBgPage
    ? DARK_TEXT_COLOR
    : boardBgColor
      ? getContrastingTextColor(boardBgColor)
      : DARK_TEXT_COLOR

  const headerStyle = isBoardPage
    ? {
        backgroundColor: boardBgColor,
        color: fontColor,
      }
    : {}

  const isDarkText = fontColor === DARK_TEXT_COLOR

  const searchInputVars = {
    '--header-input-border': isDarkText ? 'rgba(23, 43, 77, 0.24)' : 'rgba(255, 255, 255, 0.16)',
    '--header-font-color': fontColor,
    '--header-input-bg': isDarkText ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.2)',
    '--focus-text-color': DARK_TEXT_COLOR,
  }

  const boardCreator = board?.members.filter((member) => member._id === board?.idMemberCreator)[0]

  const avatarStyles = {
    backgroundImage: `url(${boardCreator?.avatarUrl})`,
  }

  return (
    <header style={headerStyle} className={headerClassName}>
      <nav>
        <NavLink to="/workspace" className="logo">
          <TrellisIcon width={24} height={24} fill="currentColor" />
          <span>Trellis</span>
        </NavLink>

        {isHomePage && (
          <div className="auth-actions">
            <NavLink to="/auth/login" className="login-link">
              Log in
            </NavLink>
            <NavLink to="/auth/signup" className="signup-link">
              Get Trellis for free
            </NavLink>
          </div>
        )}

        {(isWorkspacePage || isBoardPage) && (
          <>
            <div className="actions">
              <input
                className="search-input"
                style={searchInputVars}
                type="text"
                placeholder="Search"
              />
              <button
                style={{ color: fontColor }}
                className="btn-secondary create-btn"
                onClick={(event) => handlePopoverOpen(event, PICKER_MAP.CREATE_BOARD)}
              >
                Create
              </button>
            </div>
          </>
        )}

        {isBoardPage && (
          <div className="btn-group">
            <button
              className="dynamic-btn icon-btn"
              title={`${boardCreator?.fullName} (${boardCreator?.username})`}
            >
              <span style={avatarStyles} className="avatar-icon"></span>
            </button>
          </div>
        )}
      </nav>

      {picker && (
        <DynamicPicker
          picker={picker}
          open={openPopover}
          onClose={handlePopoverClose}
          anchorEl={anchorEl}
          onAddBoard={onAddBoard}
        />
      )}
    </header>
  )
}
