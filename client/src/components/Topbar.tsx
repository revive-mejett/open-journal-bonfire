import React from "react"
import { Link } from "react-router-dom"
import "./Topbar.scss"
import BonfireIcon from "../assets/images/bonfire_site_icon.png"

const EyeIcon = () => (
    <svg className="topbar__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

const DiceIcon = () => (
    <svg className="topbar__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="15.5" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="15.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
)

const PencilPaperIcon = () => (
    <svg className="topbar__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18l-3-1 1-3 7-7 2 2-7 7z" />
    </svg>
)

const GraphIcon = () => (
    <svg className="topbar__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="20" x2="20" y2="20" />
        <rect x="6" y="11" width="3" height="7" />
        <rect x="11" y="7" width="3" height="11" />
        <rect x="16" y="4" width="3" height="14" />
    </svg>
)

type NavItemProps = {
    to: string
    label: string
    icon: React.ReactNode
}

const NavItem = ({ to, label, icon }: NavItemProps) => (
    <li>
        <Link to={to} aria-label={label} title={label}>
            <span className="topbar__label">{label}</span>
            <span className="topbar__icon">{icon}</span>
        </Link>
    </li>
)

/** Topbar component containing logo and nav links */
const Topbar: React.FC = () => {
    return (
        <nav className="topbar">
            <Link to="/" className="topbar__brand" aria-label="Open Journal Bonfire home">
                <img src={BonfireIcon} alt="Icon of a bonfire with paper flying" />
            </Link>
            <h1 className="topbar__title">open journal bonfire</h1>
            <ul>
                <NavItem to="/entries/browse" label="View All" icon={<EyeIcon />} />
                <NavItem to="/entries/viewing?id=random" label="Random Entry" icon={<DiceIcon />} />
                <NavItem to="/entries/new" label="New Anonymous Entry" icon={<PencilPaperIcon />} />
                <NavItem to="/bonfire-statistics" label="Bonfire Statistics" icon={<GraphIcon />} />
            </ul>
        </nav>
    )
}

export default Topbar
