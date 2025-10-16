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

	const isBoardPage = pathname.includes('/board')
	const headerStyle = `app-header full ${isBoardPage ? 'board-header' : ''}`

	return (
		<header className={headerStyle}>
			<nav>
				<NavLink to="/" className="logo">
					<Trello width={24} height={24} fill="currentColor" />
					<span>Trellist</span>
				</NavLink>

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

				{/* {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

				{!user && <NavLink to="auth/login" className="login-link">Login</NavLink>}
				{user && (
					<div className="user-info">
						<Link to={`user/${user._id}`}>
							{user.imgUrl && <img src={user.imgUrl} />}
							{user.fullname}
						</Link>
						<span className="score">{user.score?.toLocaleString()}</span>
						<button onClick={onLogout}>logout</button>
					</div>
				)} */}
			</nav>
		</header>
	)
}
