import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./MatchEntryCard.scss"

const JournalEntryCard = ({ entry }) => {

    const [teaserDescription, setTeaserDescription] = useState(entry.entryContent)
    let date

    useEffect(() => {
        if (entry.entryContent !== undefined) {
            setTeaserDescription(entry.entryContent.slice(0, 50) + "...")
        } else {
            setTeaserDescription("(No entry description)")
        }
    }, [entry.entryContent])
    
    date = new Date(entry.dateCreated)
    return (
        <div className="journal-entry-card">
            <Link to={{ pathname: "/entries/viewing", search: "?id=" + entry._id }} className="journal-entry-card-link">
                {date &&
                <h2>{date.toLocaleString("default", {month: "long", day: "numeric", year: "numeric"})}</h2>
                }
                <p>{entry.title}</p>
                <p className="description-teaser">{teaserDescription}</p>
                <div>Rating: {entry.selfRating}</div>
            </Link>
        </div>

    )
}


export default JournalEntryCard