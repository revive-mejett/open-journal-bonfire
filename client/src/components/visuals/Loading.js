import "./Loading.scss"

const Loading = () => {

    return (
        <div className="loading-visual">
            <h2>Loading...</h2>
            <div className="paper-piece paper-still"></div>
            <div className="paper-piece paper-still"></div>
            <div className="paper-piece paper-still"></div>
            <div className="paper-piece paper-still"></div>
            <div className="paper-piece paper-still"></div>
            <div className="paper-piece paper-flying"></div>
            <div className="paper-piece paper-flying"></div>
            <div className="paper-piece paper-flying"></div>
            <div className="paper-piece paper-flying"></div>
            <div className="paper-piece paper-flying"></div>
        </div>
    )
}

export default Loading