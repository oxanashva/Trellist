import { Link, NavLink } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import Megaphone from '../assets/images/icons/megaphone.svg?react';
import Bell from '../assets/images/icons/bell.svg?react';
import Help from '../assets/images/icons/help.svg?react';
import Trello from '../assets/images/icons/trello.svg?react';
import osAvatar from '../assets/images/avatars/OS-avatar.png';

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
	const headerStyle = `app-header full ${isBoardPage ? 'board-header' : ''}`

	return (
		<header className={headerStyle}>
			<nav>
				<NavLink to="/" className="logo">
					<Trello width={24} height={24} fill="currentColor" />
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
							<button className="btn-primary">Create</button>
						</div>

						<div className="btn-group">
							<button className="icon-btn" title="Share your thoughts on Trellist">
								<Megaphone width={16} height={16} fill="currentColor" />
							</button>
							<button className="icon-btn" title="Notifications">
								<Bell width={16} height={16} fill="currentColor" />
							</button>
							<button className="icon-btn" title="Information">
								<Help width={16} height={16} fill="currentColor" />
							</button>
							<button className="icon-btn" title="Oxana Shvartsman (oxanashvartsman)" >
								<img src={osAvatar} alt="Oxana Shvartsman" width={16} height={16} />
							</button>
						</div>
					</>
				}
			</nav>
		</header>
	)
}
