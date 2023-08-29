import { Link } from "react-router-dom"
import "./Topbar.scss"

const Topbar = () => {
    return (
        <div className="topbar-sample">
            <div>
                <Link to="/">View All</Link>
            </div>
            <div>
                <Link to="/some">Random Entry</Link>
            </div>
            <div>
                <Link to="/new">Create new Anonymous Entry</Link>
            </div>
        </div>
    )
}

export default Topbar