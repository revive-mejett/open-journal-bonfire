import { Link } from "react-router-dom"
import "./Topbar.scss"

const Topbar = () => {
    return (
        <div className="topbar">
            <div>
                <Link to="/" className="link-button">View All</Link>
            </div>
            <div>
                <Link to="/some" className="link-button">Random Entry</Link>
            </div>
            <div>
                <Link to="/new" className="link-button">Create new Anonymous Entry</Link>
            </div>
            <div>
                <Link to="/stats" className="link-button">Recent Stats</Link>
            </div>
        </div>
    )
}

export default Topbar