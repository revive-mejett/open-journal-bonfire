import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const JournalEntryDetail = () => {

    const location = useLocation()
    
    const [journalEntryData, setJournalEntryData] = useState(undefined)

    useEffect(() => {
        (async () => {
            let urlParams = new URLSearchParams(location.search)
            let searchId = urlParams.get("id")

            let data
            if (!journalEntryData) {
                let response = await fetch("/api/journalentries/" + searchId)

                if (response.ok) {
                    console.log("response success -- " + response.status)
                } else {
                    console.error("response not ok -- " + response.status)
                }
                data = await response.json()
                setJournalEntryData(data)
            }
        })();
        console.log(journalEntryData)
    })

    return (
        <h2>Journal entry detail</h2>
    )
}

export default JournalEntryDetail