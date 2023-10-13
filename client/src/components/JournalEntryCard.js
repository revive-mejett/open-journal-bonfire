import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const JournalEntryCard = ({entry}) => {

    const [teaserDescription, setTeaserDescription] = useState(entry.entryContent)

    useEffect(() => {
        if (entry.entryContent !== undefined) {
            setTeaserDescription(entry.entryContent.slice(0, 50) + "...")
        } else {
            setTeaserDescription("(No entry description)")
        }
    }, [entry.entryContent])

    return (
        <Link to={{pathname: "/entries/viewing", search:"?id="+entry._id}} >
            <div className="match-entry-card">
                <h2>{entry.dateCreated}</h2>
                <p>{entry.title}</p>
                <p className="description-teaser">{teaserDescription}</p>
                <div>Rating: {entry.selfRating}</div>
            </div>
        </Link>

    )
}


export default JournalEntryCard