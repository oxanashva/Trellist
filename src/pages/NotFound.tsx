import { Link } from 'react-router'
import HomeIcon from '../assets/images/icons/home.svg?react'

export function NotFound() {
    return (
        <div className='error-container'>
            <h2>Page not found</h2>
            <Link className="link-btn" to="/home">
                <HomeIcon width={24} height={24} fill="currentColor" />
            </Link>
        </div>
    )
}