import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./JournalEntryCard.scss"
import { filterRedhotWords } from "../utils/WordFilter"
import { JournalEntry } from "../common/types"


type Props = {
    entry : JournalEntry,
    norotate: boolean
}


const JournalEntryCard = ({ entry, norotate } : Props) => {

    const [teaserDescription, setTeaserDescription] = useState(entry.entryContent)
    let cardRef = useRef<HTMLDivElement>(null)
    let date

    useEffect(() => {
        if (entry.entryContent !== undefined) {
            setTeaserDescription(filterRedhotWords(entry.entryContent).slice(0, 80) + "...")
        } else {
            setTeaserDescription("(No entry description)")
        }
        let randomRotation = Math.ceil(Math.random() * 30) - 15

        if (!norotate && cardRef.current != null) {
            cardRef.current.style.rotate = `${randomRotation}deg`
        }
        
        
    }, [entry.entryContent, norotate])
    
    date = new Date(entry.dateCreated)
    
    return (
        <div className="journal-entry-card" ref={cardRef}>
            <Link to={{ pathname: "/entries/viewing", search: "?id=" + entry._id }} className="journal-entry-card-link">
                {date &&
                <h2>{date.toLocaleString("default", {month: "long", day: "numeric", year: "numeric"})}</h2>
                }
                <h3>{filterRedhotWords(entry.title)}</h3>
                <p className="description-teaser">{filterRedhotWords(teaserDescription)}</p>
                <h3 className="rating-header">Their rating: {entry.selfRating}</h3>
                <div className="event-tag-container">
                    {entry.greatEvents.length > 0 && <p className="event-tag positive">{entry.greatEvents[0].keyword}</p>}
                    {entry.neutralEvents.length > 0 && <p className="event-tag neutral">{entry.neutralEvents[0].keyword}</p>}
                    {entry.badEvents.length > 0 && <p className="event-tag negative">{entry.badEvents[0].keyword}</p>}
                </div>
            </Link>
        </div>

    )
}


export default JournalEntryCard