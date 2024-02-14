import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./JournalEntryDetail.scss"
import Background from "../components/visuals/Background"
import Loading from "../components/visuals/Loading"
import { filterRedhotWords } from "../utils/WordFilter"
import { JournalEntry } from "../common/types"


const readSafeRiskClassMap = new Map(
    [
        [1, "eye-glaring"],
        [2, "eye-unsafe"],
        [3, "unreadable"]
    ]
)

const determineReadSafeRisk = (entry : JournalEntry) : 0 | 1 | 2 | 3 => {
    if (entry.isTooExplicit) {
        return 3
    } else if (entry.isExplicit) {
        return 2
    } else if (entry.numberHotWords >= 1) {
        return 1
    } else {
        return 0
    }
}

const emberParticlesSmaller : JSX.Element[] = Array.from({ length: 5 }, (_, i) => <div className="ember-particle-smaller" key={i}></div>)
const emberParticles : JSX.Element[] = Array.from({ length: 11 }, (_, i) => <div className="ember-particle" key={i}></div>)
const emberParticleslargest : JSX.Element[] = Array.from({ length: 20 }, (_, i) => <div className="ember-particle-larger" key={i}></div>)

const JournalEntryDetail : React.FC = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const [journalEntryData, setJournalEntryData] = useState<JournalEntry | undefined>(undefined)
    const [isFetching, setIsFetching] = useState<Boolean>(true)

    let dateCreated = useRef<Date | null>(null)
    let pageRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        if (journalEntryData) {
            let readSafeRisk = determineReadSafeRisk(journalEntryData)
            pageRef.current?.classList.add(readSafeRiskClassMap.get(readSafeRisk) || "eye-safe")
        }
    })

    return (
        <main className="journal-entry-detail-main">
            <Background/>
            {
                journalEntryData && !isFetching ?
                <section className="journal-entry-page" ref={pageRef}>
                    <div className="burn-background"></div>
                    {determineReadSafeRisk(journalEntryData) === 1 && emberParticlesSmaller} 
                    {determineReadSafeRisk(journalEntryData) === 2 && emberParticles} 
                    {determineReadSafeRisk(journalEntryData) === 3 && emberParticleslargest} 
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