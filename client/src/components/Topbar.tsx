import { Link } from "react-router-dom"
import "./Topbar.scss"
import BonfireIcon from "../assets/images/bonfire_site_icon.png"


const Topbar : React.FC = () => {
    return (
        <nav className="topbar">
            <Link to="/">
                <img src={BonfireIcon} alt="Icon of a bonfire with paper flying"></img>
            </Link>
            <h1>open journal bonfire</h1>
            <ul>
                <li>
                    <Link to="/entries/browse">View All</Link>
                </li>
                <li>
                    <Link to="/entries/viewing?id=random">Random Entry</Link>
                </li>
                <li>
                    <Link to="/entries/new">New Anonymous Entry</Link>
                </li>
                <li>
                    <Link to="/bonfire-statistics">Bonfire Statistics</Link>
                </li>
            </ul>

        </nav>
    )
}

export default Topbar