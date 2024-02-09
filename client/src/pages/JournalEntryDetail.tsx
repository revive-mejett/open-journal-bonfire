import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./JournalEntryDetail.scss"
import Background from "../components/visuals/Background"
import Loading from "../components/visuals/Loading"
import { filterRedhotWords } from "../utils/WordFilter"
import { JournalEntry } from "../common/types"

const JournalEntryDetail : React.FC = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const [journalEntryData, setJournalEntryData] = useState<JournalEntry | undefined>(undefined)
    const [isFetching, setIsFetching] = useState<Boolean>(true)

    let dateCreated = useRef<Date | null>(null)

    useEffect(() => {
        let baseUrl = "/api/journalentries/"

        let urlParams : URLSearchParams = new URLSearchParams(location.search)
        let searchId = urlParams.get("id")

        const fetchEntry = async () => {
            let data
            let fetchUrl

            //fetch journal entry data if the data has not been fetched yet.
            if (!journalEntryData) {

                //call the appropriate api route if user wants to fetch a random journal entry or fetch a specific if of the journal entry
                if (searchId === "random") {
                    setIsFetching(true)
                    fetchUrl = "/api/journalentries/random"
                } else {
                    fetchUrl = baseUrl + searchId 
                }
                let response = await fetch(fetchUrl)


                if (response.ok) {
                    data = await response.json()
                    setJournalEntryData(data)
                    setIsFetching(false)
                    dateCreated.current = new Date(data.dateCreated)
                    
                } else {
                    
                    if (response.status === 404) {
                        navigate("/entries/error")
                    }
                    
                }
            }
        };
        fetchEntry()

    }, [location.search, journalEntryData, navigate])

    return (
        <main className="journal-entry-detail-main">
            <Background/>
            {
                journalEntryData && !isFetching ?
                <section className="journal-entry-page">
                    
                    {dateCreated.current !== null &&
                        <div className="date-display">
                            <h2 className="entry-date">{dateCreated.current.toLocaleString("default", { month: "long", day: "numeric", year: "numeric" })}</h2>
                            <h2 className="entry-date">{dateCreated.current.toLocaleString("default", { weekday: "long" })}</h2>
                            <h2 className="entry-date">{dateCreated.current.toLocaleString("default", { hour: "numeric", minute: "numeric" })}</h2>
                        </div>
                    }
                    <div className="entry-body">
                        <h3 className="entry-title">{journalEntryData.title.trim() !== "" ? filterRedhotWords(journalEntryData.title) : "No title"}</h3>
                        <p className="entry-content-text">{filterRedhotWords(journalEntryData.entryContent)}</p>
                    </div>

                    <div className="event-tag-body">
                        <div className="event-tag-container">
                            {journalEntryData.greatEvents.map((event, i) => <p key={i} className="event-tag positive">{event.keyword}</p>)}
                            {journalEntryData.neutralEvents.map((event, i) => <p key={i} className="event-tag neutral">{event.keyword}</p>)}
                            {journalEntryData.badEvents.map((event, i) => <p key={i} className="event-tag negative">{event.keyword}</p>)}
                        </div>
                    </div>
                </section>
                :
                <Loading/>
                }
        </main>

    )
}

export default JournalEntryDetail