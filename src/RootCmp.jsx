import { Routes, Route, useLocation } from 'react-router'
import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg'
import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './pages/BoardDetails'
import './assets/styles/main.css'
import { LoginSignup, Login, Signup } from './pages/LoginSignup'
import { CardDetails } from './pages/CardDetails'
import { AppFooter } from './cmps/AppFooter'
import { Icon } from './pages/Icon'

export function RootCmp() {
  const { pathname } = useLocation()

  const isBoardPage = pathname.includes('/board')
  const mainContainerStyle = `main-container ${isBoardPage ? 'board-container' : ''}`

  return (
    <div className={mainContainerStyle}>
      <AppHeader />
      <UserMsg />

      <main>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="board" element={<BoardIndex />} />
          <Route path="board/:boardId" element={<BoardDetails />} />
          <Route path="board/:boardId/card/:cardId" element={<CardDetails />} />
          <Route path="auth" element={<LoginSignup />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Icon Preview - For Testing */}
          <Route path="icon" element={<Icon />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}