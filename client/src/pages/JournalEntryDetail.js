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
            
            //fetch journal entry data if the data has not been fetched yet.
            if (!journalEntryData) {
                let response = await fetch("/api/journalentries/" + searchId)

                if (response.ok) {
                    data = await response.json()
                    console.log("response success -- " + response.status)
                    setJournalEntryData(data)
                } else {
                    console.error("response not ok -- " + response.status)
                }
                
                
            }
        })();
        console.log(journalEntryData)
    })

    return (
        <h2>Journal entry detail</h2>
    )
}

export default JournalEntryDetail