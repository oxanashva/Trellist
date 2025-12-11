import { NavLink } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import TrelloIcon from '../assets/images/icons/trello.svg?react'
import osAvatarImg from '../assets/images/avatars/OS-avatar.png'

export function AppHeader() {
	// const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const { pathname } = useLocation()

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
	const headerStyle = `app-header full ${isBoardPage ? 'board-header' : isHomePage ? 'home-header' : ''}`

	return (
		<header className={headerStyle}>
			<nav>
				<NavLink to="/" className="logo">
					<TrelloIcon width={24} height={24} fill="currentColor" />
					<span>Trellist</span>
				</NavLink>

				{isHomePage &&
					<div className="auth-actions">
						<NavLink to="/auth/login" className="login-link">
							Log in
						</NavLink>
						<NavLink to="/auth/signup" className="signup-link">
							Get Trellist for free
						</NavLink>
					</div>
				}

				{(isWorkspacePage || isBoardPage) &&
					<>
						<div className="actions">
							<input type="text" placeholder="Search" />
							<button className="btn-secondary">Create</button>
						</div>

						<div className="btn-group">
							<button className="dynamic-btn icon-btn" title="Oxana Shvartsman (oxanashvartsman)" >
								<img src={osAvatarImg} alt="Oxana Shvartsman" width={16} height={16} />
							</button>
						</div>
					</>
				}
			</nav>
		</header>
	)
}
