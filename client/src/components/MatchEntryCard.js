import "./MatchEntryCard.scss"

const MatchEntryCard = ({entry}) => {
    return (
        <div className="match-entry-card">
            <h2>{entry.gameTitle}</h2>
            <p>outcome: {entry.isWon ? "WIN" : "LOSS"}</p>
            <div>
                {entry.teamReview.map(reviewPoint => <p>{reviewPoint}</p>)}
            </div>
            <div>
                {entry.teamPerformance.map(performanceItem => <p>{performanceItem}</p>)}
            </div>
            <div>
                {entry.events.map(eventItem => <p>{eventItem}</p>)}
            </div>
            entryContent: "My team did really well. Our rochelle went down halfway but our coach was our savior",
            <div>Rating: {entry.selfRating}</div>
        </div>
    )
}


export default MatchEntryCard