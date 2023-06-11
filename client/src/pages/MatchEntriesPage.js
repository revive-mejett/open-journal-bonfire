import { useEffect, useState } from "react"

const MatchEntriesPage = () => {

    const [matchData, setMatchData] = useState(undefined)

    useEffect(()=> {
        
        const fetchMatchData = async () => {
            try {
                let response = await fetch("/api/matchentries")
                console.log(response)
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
        if (!matchData) {
            fetchMatchData()
        }
    }, [matchData])

    return (
        <>
            <h1>MatchEntriesPage</h1>
        </>
    )
}

export default MatchEntriesPage