import { Link } from "react-router-dom"
import "./Topbar.scss"
import BonfireIcon from "../assets/images/bonfire_site_icon.png"
const Topbar = () => {
    return (
        <nav className="topbar">

            <Link to="/">
                <img src={BonfireIcon} alt="Icon of a bonfire with paper flying"></img>
            </Link>
            <h1>open journal bonfire</h1>
            
            
            <div className="link-container">
                <Link to="/entries/browse" className="link-button">View All</Link>
            </div>
            <div className="link-container">
                <Link to="/entries/viewing?id=random" className="link-button">Random Entry</Link>
            </div>
            <div className="link-container">
                <Link to="/entries/new" className="link-button">New Anonymous Entry</Link>
            </div>
            <div className="link-container">
                <Link to="/stats" className="link-button">Recent Stats</Link>
            </div>
        </nav>
    )
}

export default Topbar