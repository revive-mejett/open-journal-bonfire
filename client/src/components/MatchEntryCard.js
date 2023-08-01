import { useEffect, useState } from "react"
import "./MatchEntryCard.scss"

const MatchEntryCard = ({entry}) => {

    const [teaserDescription, setTeaserDescription] = useState(entry.entryContent)

    useEffect(() => {
        if (entry.entryContent !== undefined) {
            setTeaserDescription(entry.entryContent.slice(0, 50) + "...")
        } else {
            setTeaserDescription("(No entry description)")
        }
    }, [entry.entryContent])

    return (
        <div className="match-entry-card">
            <h2>{entry.gameTitle}</h2>
            <p className={`label-outcome ${entry.isWon ? "outcome-win" : "outcome-loss"}`}>{entry.isWon ? "WIN" : "LOSS"}</p>
            <p className="description-teaser">{teaserDescription}</p>
            <div>Rating: {entry.selfRating}</div>
        </div>
    )
}


export default MatchEntryCard