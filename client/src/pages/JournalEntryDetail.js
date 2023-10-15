import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

const JournalEntryDetail = () => {

    const location = useLocation()
    
    const [journalEntryData, setJournalEntryData] = useState(undefined)

    let dateCreated = useRef()


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
                    dateCreated.current = new Date(data.dateCreated)
                } else {
                    //TODO display error on screen
                    console.error("response not ok -- " + response.status)
                }
            }
        })();

    })

    return (
        <>
            <h2>Journal entry detail</h2>
            {
            journalEntryData &&
            <div>
                {dateCreated &&
                <h2>{dateCreated.current.toLocaleString("default", {month: "long", day: "numeric", year: "numeric"})}</h2>
                }
                <h3>{journalEntryData.entryTitle}</h3>
                <p>{journalEntryData.entryContent}</p>
                <h4>Great events:</h4>
                <div>{journalEntryData.greatEvents.map((event,i) => <p key={i}>{event}</p>)}</div>
                <h4>Neutral events:</h4>
                <div>{journalEntryData.greatEvents.map((event,i) => <p key={i}>{event}</p>)}</div>
                <h4>Not so great events:</h4>
                <div>{journalEntryData.badEvents.map((event,i) => <p key={i}>{event}</p>)}</div>
                <p>Their rating: {journalEntryData.selfRating}</p>
            </div>
            }
        </>

    )
}

export default JournalEntryDetail