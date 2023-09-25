import { Link } from "react-router-dom"
import "./Topbar.scss"

const Topbar = () => {
    return (
        <div className="topbar">
            <h1>
                open journal bonfire
            </h1>
            <div className="link-container">
                <Link to="/" className="link-button">View All</Link>
            </div>
            <div className="link-container">
                <Link to="/some" className="link-button">Random Entry</Link>
            </div>
            <div className="link-container">
                <Link to="/entries/new" className="link-button">New Anonymous Entry</Link>
            </div>
            <div className="link-container">
                <Link to="/stats" className="link-button">Recent Stats</Link>
            </div>
        </div>
    )
}

export default Topbar