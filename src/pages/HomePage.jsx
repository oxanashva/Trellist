import { NavLink } from "react-router";

export function HomePage() {
    return (
        <section className="home">
            <div className="hero-content">
                <h1>Trellist brings all your tasks, teammates, and tools together</h1>
                <p>Keep everything in the same place-even if your team isn't.</p>
                <NavLink to="/workspace" className="link-btn btn-primary">
                    Start Demo
                </NavLink>
            </div>
        </section >
    )
}

