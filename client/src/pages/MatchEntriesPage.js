import { useEffect, useState } from "react"

const MatchEntriesPage = () => {

    const [matchEntryData, setMatchData] = useState(undefined)

    useEffect(()=> {
        
        const fetchMatchData = async () => {
            try {
                let response = await fetch("/api/matchentries")
                if (!response.ok) {
                    console.log("response not ok")
                } else {
                    let data = await response.json()
                    setMatchData(data)
                }
            } catch(error) {
                console.error("Error fetching match data --> ", error)
            }
        }
        if (!matchEntryData) {
            fetchMatchData()
        }
    }, [matchEntryData])

    return (
        <>
            {matchEntryData &&
                matchEntryData.map(entry => {
                    return (
                        <div>
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
                            entryContent: {entry.entryContent},
                            <div>Rating: {entry.selfRating}</div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default MatchEntriesPage