import { useEffect, useState } from "react"
import MatchEntryCard from "../components/MatchEntryCard"

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
        <main>
            {matchEntryData &&
                matchEntryData.map(entry => <MatchEntryCard entry={entry}></MatchEntryCard>)
            }
        </main>
    )
}

export default MatchEntriesPage