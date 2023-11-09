import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import "./JournalEntryDetail.scss"
import Background from "../components/visuals/Background"


const JournalEntryDetail = () => {

    const location = useLocation()


    const [journalEntryData, setJournalEntryData] = useState(undefined)

    let dateCreated = useRef()

    useEffect(() => {
        let baseUrl = "/api/journalentries/"

        let urlParams = new URLSearchParams(location.search)
        let searchId = urlParams.get("id")

        const fetchEntry = async () => {
            let data
            let fetchUrl

            //fetch journal entry data if the data has not been fetched yet.
            if (!journalEntryData) {

                //call the appropriate api route if user wants to fetch a random journal entry or fetch a specific if of the journal entry
                if (searchId === "random") {
                    fetchUrl = "/api/journalentries/random"
                } else {
                    fetchUrl = baseUrl + searchId 
                }
                let response = await fetch(fetchUrl)


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
        };
        fetchEntry()

        

    }, [location.search, journalEntryData])

    return (
        <main className="journal-entry-detail-main">
            <Background/>
            {
                journalEntryData &&
                <section className="journal-entry-page">
                    {dateCreated &&
                        <div className="date-display">
                            <h2 className="entry-date">{dateCreated.current.toLocaleString("default", { month: "long", day: "numeric", year: "numeric" })}</h2>
                            <h2 className="entry-date">{dateCreated.current.toLocaleString("default", { weekday: "long" })}</h2>
                            <h2 className="entry-date">{dateCreated.current.toLocaleString("default", { hour: "numeric", minute: "numeric" })}</h2>
                        </div>
                    }
                    <div className="entry-body">
                        <h3 className="entry-title">{journalEntryData.entryTitle && journalEntryData.entryTitle.Trim() !== "" ? journalEntryData.entryTitle : "No title"}</h3>
                        <p className="entry-content-text">{journalEntryData.entryContent}</p>
                    </div>

                    <div className="event-tag-body">
                        <div className="event-tag-container">
                            {journalEntryData.greatEvents.map((event, i) => <p key={i} className="event-tag positive">{event.keyword}</p>)}
                            {journalEntryData.neutralEvents.map((event, i) => <p key={i} className="event-tag neutral">{event.keyword}</p>)}
                            {journalEntryData.badEvents.map((event, i) => <p key={i} className="event-tag negative">{event.keyword}</p>)}
                        </div>
                    </div>


                </section>
            }
        </main>

    )
}

export default JournalEntryDetail