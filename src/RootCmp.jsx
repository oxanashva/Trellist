import { Routes, Route, Navigate, useLocation } from 'react-router'
import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg'
import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './pages/BoardDetails'
import './assets/styles/main.css'
import { LoginSignup, Login, Signup } from './pages/LoginSignup'
import { CardEdit } from './pages/CardEdit'
import { Icon } from './pages/Icon'

export function RootCmp() {
  const { pathname } = useLocation()

  const getSpecificContainerClass = () => {
    if (pathname.includes('/board')) return 'board-container'
    if (pathname.includes('/workspace')) return 'workspace-container'
    if (pathname.includes('/home')) return 'home-container'

    return '';
  }

  const containerClasses = `main-container ${getSpecificContainerClass()}`;

  return (
    <div className={containerClasses}>
      <AppHeader />
      <UserMsg />

      <main className="main-container full">
        <Routes>
          <Route path="" element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="workspace" element={<BoardIndex />} />
          <Route path="board/:boardId" element={<BoardDetails />}>
            <Route path="card/:cardId" element={<CardEdit />} />
          </Route>
          <Route path="auth" element={<LoginSignup />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Icon Preview - For Testing */}
          <Route path="icon" element={<Icon />} />
        </Routes>
      </main>
    </div>
  )
}