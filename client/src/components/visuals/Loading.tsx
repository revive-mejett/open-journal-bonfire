import "./Loading.scss"

/**
 * Loading component
 */
const Loading : React.FC = () => {

    return (
        <div className="loading-visual">
            <h2>Loading...</h2>
            <div className="paper-piece paper-still"></div>
            <div className="paper-piece paper-still"></div>
            <div className="paper-piece paper-still"></div>
            <div className="paper-piece paper-still"></div>
            <div className="paper-piece paper-still"></div>
            <div className="flying-papers">
                <div className="paper-piece paper-flying"></div>
                <div className="paper-piece paper-flying"></div>
                <div className="paper-piece paper-flying"></div>
                <div className="paper-piece paper-flying"></div>
                <div className="paper-piece paper-flying"></div>
            </div>
            
        </div>
    )
}

export default Loading