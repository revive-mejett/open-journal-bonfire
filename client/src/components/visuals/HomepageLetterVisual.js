import { useEffect, useRef, useState } from "react"

const HomepageLetterVisual = (props) => {

    const samplePaperText = useRef(null)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (!isAnimating) {
            setIsAnimating(true)
            let currentTyped = ''
            setTimeout(() => {
                let typeAnimation = setInterval(() => {
                    currentTyped = props.sampleEntryContent.substring(0, currentTyped.length + 1)
                    if (samplePaperText.current) {
                        samplePaperText.current.textContent = currentTyped
                    }
                }, 50);
            }, 2000);
        } 
    }, [props.sampleEntryContent, isAnimating])

    return (
        <div className="presentation-visual letter-creation-visual">
            <div className="large-paper crumpled-1">
            </div>
            <div className="large-paper crumpled-2">
            </div>
            <div className="large-paper crumpled-3">
            </div>
            <div className="large-paper uncrumpling">
                <div className="date-display">
                    <h2 className="entry-date">{props.date.toLocaleString("default", { month: "long", day: "numeric", year: "numeric" })}</h2>
                    <h2 className="entry-date">{props.date.toLocaleString("default", { weekday: "long" })}</h2>
                    <h2 className="entry-date">{props.date.toLocaleString("default", { hour: "numeric", minute: "numeric" })}</h2>
                </div>
                <div className="entry-body">
                    <h3 className="entry-title">{props.sampleTitle}</h3>
                    <span ref={samplePaperText}></span><span className="type-cursor"></span>
                </div>
            </div>
        </div>
    )
}

export default HomepageLetterVisual
