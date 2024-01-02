import React from "react"
import "./Footer.scss"

type Props = {
    title : string,
    slogan : string
}

const Footer : React.FC<Props> = ({title, slogan} : Props) => {
    return (
        <footer>
            <div className="footer-content">
                <p className="mini-app-title">{title}</p>
                <p className="slogan">{slogan}</p>
                <p className="copyright">&copy; {new Date().getFullYear()} Kyle Veloso. All rights reserved. | Developed by Kyle Veloso</p>
            </div>

        </footer>
    )
}


export default Footer