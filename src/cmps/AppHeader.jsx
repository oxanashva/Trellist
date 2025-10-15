import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import Megaphone from '../assets/images/icons/megaphone.svg?react';
import Bell from '../assets/images/icons/bell.svg?react';
import Help from '../assets/images/icons/help.svg?react';
import Trello from '../assets/images/icons/trello.svg?react';

export function AppHeader() {
	// const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header full">
			<nav>
				<NavLink to="/" className="logo">
					<Trello width={24} height={24} fill="currentColor" />
					Trellist
				</NavLink>
				<NavLink to="board">Board</NavLink>

				<Megaphone width={24} height={24} fill="currentColor" />
				<Bell width={24} height={24} fill="currentColor" />
				<Help width={24} height={24} fill="currentColor" />

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
