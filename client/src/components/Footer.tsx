import React from "react"
import "./Footer.scss"

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p className="mini-app-title">open journal bonfire</p>
                <p className="slogan">Share the greatest moments. Or dish everything out to the bonfire!</p>
                <p className="copyright">&copy; {new Date().getFullYear()} Kyle Veloso. All rights reserved. | Developed by Kyle Veloso</p>
            </div>

        </footer>
    )
}


export default Footer