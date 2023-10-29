import { useEffect, useState } from "react"
import "../components/MatchEntryCard.scss"
import JournalEntryCard from "../components/JournalEntryCard"

const Homepage = () => {

    const [sampleEntries, setEntryData] = useState(undefined)

    const numberSampleEntries = 3

    useEffect(() => {
        const fetchSampleEntries = async () => {
            try {
                let response = await fetch("/api/journalentries/sample/" + numberSampleEntries)
                if (!response.ok) {
                    console.log("response not ok")
                } else {
                    let data = await response.json()
                    setEntryData(data)
                }
            } catch (error) {
                console.error("Error fetching match data --> ", error)
            }
        }
        if (!sampleEntries) {
            fetchSampleEntries()
        }
    }, [sampleEntries])

    return (
        <main>
            <h1>
                an Open Journal Bonfire! 🔥
            </h1>
            <section>
                <h2>

                </h2>
            </section>
            <section>
                <h2>
                    Take a pencil (your keyboard) and a piece of paper (your screen). Write your day..
                </h2>
                <p>Share all your amazing experience you have had today! Or dump it all! Write freely and Anonymously!</p>
            </section>
            <section>
                <h2>
                    Take a read of some entries!
                </h2>
                <p>Look what people have been saying and experiencing.</p>

                {sampleEntries &&
                    <div className="entries-container">
                    {sampleEntries &&
                        sampleEntries.map((entry, i) => <JournalEntryCard key={i} entry={entry}></JournalEntryCard>)
                    }
                </div>
                }
                
            </section>
        </main>
    )
}

export default Homepage