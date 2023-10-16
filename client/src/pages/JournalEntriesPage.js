import { useEffect, useState } from "react"
import JournalEntryCard from "../components/JournalEntryCard"

const JournalEntriesPage = () => {

    const [entryData, setEntryData] = useState(undefined)

    useEffect(()=> {
        
        const fetchEntryData = async () => {
            try {
                let response = await fetch("/api/journalentries")
                if (!response.ok) {
                    console.log("response not ok")
                } else {
                    let data = await response.json()
                    setEntryData(data)
                }
            } catch(error) {
                console.error("Error fetching match data --> ", error)
            }
        }
        if (!entryData) {
            fetchEntryData()
        }
    }, [entryData])

    return (
        <main className="jounal-entries-page-main">
            {entryData &&
                entryData.map((entry,i) => <JournalEntryCard key={i} entry={entry}></JournalEntryCard>)
            }
        </main>
    )
}

export default JournalEntriesPage