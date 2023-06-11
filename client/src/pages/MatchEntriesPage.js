import { useEffect, useState } from "react"

const MatchEntriesPage = () => {

    const [matchData, setMatchData] = useState([])

    useEffect(()=> {
        let matchData;
        const fetchMatchData = async () => {
            let response = await fetch("/api/matchentries")
            console.log(response)
        }
        fetchMatchData()
    })

    return (
        <>
            <h1>MatchEntriesPage</h1>
        </>
    )
}

export default MatchEntriesPage