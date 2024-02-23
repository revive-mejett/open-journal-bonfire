import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./JournalEntryCard.scss"
import { filterRedhotWords } from "../utils/WordFilter"
import { JournalEntry } from "../common/types"


interface Props {
    entry : JournalEntry,
    norotate?: boolean
    // read safe risk where 0 has little profanity and 3 has unacceptable profanity
    readSafeRisk: 0 | 1 | 2 | 3
}

// map risk safe level to the corresponding css class
const readSafeRiskClassMap = new Map(
    [
        [1, "eye-glaring"],
        [2, "eye-unsafe"],
        [3, "unreadable"]
    ]
)

//array of divs used as particles to style eye-glaring, explicit, unreadable entries
const emberParticlesSmaller : JSX.Element[] = Array.from({ length: 5 }, (_, i) => <div className="ember-particle-smaller" key={i}></div>)
const emberParticles : JSX.Element[] = Array.from({ length: 11 }, (_, i) => <div className="ember-particle" key={i}></div>)
const emberParticleslargest : JSX.Element[] = Array.from({ length: 20 }, (_, i) => <div className="ember-particle-larger" key={i}></div>)


/** React component that displays a card representing an anonymous journal entry to be seen in the entry viewing page. Has a title, date, highlighted event tags and a teaser of the
 * entry content
 * 
 * @returns 
 */
const JournalEntryCard : React.FC<Props> = ({ entry, norotate, readSafeRisk } : Props) => {

    const [teaserDescription, setTeaserDescription] = useState(entry.entryContent)
    let cardRef = useRef<HTMLDivElement>(null)
    let date


    useEffect(() => {
        if (entry.entryContent !== undefined) {
            setTeaserDescription(filterRedhotWords(entry.entryContent).slice(0, 80) + "...")
        } else {
            setTeaserDescription("(No entry description)")
        }
        let randomRotation = Math.ceil(Math.random() * 30) - 15

        if (!norotate && cardRef.current != null) {
            cardRef.current.style.rotate = `${randomRotation}deg`
        }

        cardRef.current?.classList.add(readSafeRiskClassMap.get(readSafeRisk) || "eye-safe")

        
    }, [entry.entryContent, norotate, readSafeRisk])
    
    date = new Date(entry.dateCreated)
    
    return (
        <div className={`journal-entry-card`} ref={cardRef}>   
            <Link to={{ pathname: "/entries/viewing", search: "?id=" + entry._id }} className="journal-entry-card-link">
                <div className="burn-background"></div>
                {readSafeRisk === 1 && emberParticlesSmaller} 
                {readSafeRisk === 2 && emberParticles} 
                {readSafeRisk === 3 && emberParticleslargest} 
                {date &&
                <h2>{date.toLocaleString("default", {month: "long", day: "numeric", year: "numeric"})}</h2>
                }
                <h3>{filterRedhotWords(entry.title)}</h3>
                <p className="description-teaser">{filterRedhotWords(teaserDescription)}</p>
                <h3 className="rating-header">Their rating: {entry.selfRating}</h3>
                <div className="event-tag-container">
                    {entry.greatEvents.length > 0 && <p className="event-tag positive">{entry.greatEvents[0].keyword}</p>}
                    {entry.neutralEvents.length > 0 && <p className="event-tag neutral">{entry.neutralEvents[0].keyword}</p>}
                    {entry.badEvents.length > 0 && <p className="event-tag negative">{entry.badEvents[0].keyword}</p>}
                </div>
            </Link>
            
        </div>

    )
}


export default JournalEntryCard