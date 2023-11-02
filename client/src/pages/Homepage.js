import { useEffect, useRef, useState } from "react"
import JournalEntryCard from "../components/JournalEntryCard"
import "./Homepage.scss"
import { Link } from "react-router-dom"

const Homepage = () => {

    const [sampleEntries, setEntryData] = useState(undefined)
    const samplePaperText = useRef(null)

    const numberSampleEntries = 3

    const particles = Array.from({length: 30}, (_,i) => <div className="particle" key={i}></div>)
    
    const sampleText = "Today I had an amazing day! I passed my science test covering the reproductive system with an A+! I studied so hard for it and it paid off. I bought a nice ice cream to celebrate it."

    const paperPieces = Array.from({length: 5}, (_,i) => {
        let randomRotation = Math.floor(Math.random()*360)
        const paperWidth = 36
        const paperHeight = 50

        let styles = {
            transform: `rotate(${randomRotation}deg)`,
            width: `${paperWidth}px`,
            height: `${paperHeight}px`,
            // left: `${Math.floor(Math.random()*60) + 20}%`,
            // bottom: `${Math.floor(Math.random()*15) + 5}%`
        }
        let newPaperDiv = <div className="paper-piece" style={styles} key={i}></div>
        // newPaperDiv.style.rotation = `${randomRotation}deg`
        return newPaperDiv
    })

    const animateType = () => {
        let currentTyped = ''
        setTimeout(() => {
            let typeAnimation = setInterval(() => {
                currentTyped = sampleText.substring(0, currentTyped.length + 1)
                if (samplePaperText.current) {
                    samplePaperText.current.textContent = currentTyped
                }
                
            }, 50);
        }, 2000);
        
    }
    useEffect(() => {
        console.log('animate')
        animateType()
    }, [])
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
        <main className="homepage-main">
            <header className="presentation-section introduction-heading">
                <h1>
                    an Open Journal Bonfire! 🔥
                </h1>
                <p>A free space for everyone to write and freely share their days what they want. No trees harmed!</p>
                <div className="presentation-visual fire-container-introsection">
                    {paperPieces}
                    {particles}
                    
                    <div className="wood-art wood-1"></div>
                    <div className="wood-art wood-2"></div>
                </div>
            </header>

            <section className="presentation-section creation-feature-presentation">
                <h2>
                    Take a pencil (your keyboard) and a piece of paper (your screen). Write your day..
                </h2>
                <p>Did you pass your science test? Share it! Got a new car? Jot what model and colour you got! Got an unfortunate bruise? Ouch. Explain how did you get that little bruise. Share all your amazing experience you have had today! Or dump it all! Write freely and anonymously!</p>
                <div className="presentation-visual letter-creation-visual">
                    <div className="large-paper">

                        <div className="date-display">
                            <h2 className="entry-date">{new Date("2023-1-17").toLocaleString("default", { month: "long", day: "numeric", year: "numeric" })}</h2>
                            <h2 className="entry-date">{new Date("2023-1-17").toLocaleString("default", { weekday: "long" })}</h2>
                            <h2 className="entry-date">{new Date("2023-1-17").toLocaleString("default", { hour: "numeric", minute: "numeric" })}</h2>
                        </div>

                        <div className="entry-body">
                            <h3 className="entry-title">Passed my science test! :D</h3>
                            <span ref={samplePaperText}></span><span className="type-cursor"></span>
                        </div>
                        
                    </div>
                </div>
                <div className="link-container">
                    <Link to="/entries/new" className="link-button">Create now</Link>
                </div>
            </section>
            <section className="entry-view-presentation">
                <h2>
                    Open and anonymous
                </h2>
                <p>Take a read of some entries! Hear what people are saying in words. Look what people have been saying and experiencing.</p>
                {sampleEntries &&
                    <>

                        <div className="sample-entries-container">
                            {sampleEntries &&
                                sampleEntries.map((entry, i) => <JournalEntryCard key={i} entry={entry}></JournalEntryCard>)
                            }
                        </div>
                        <div className="link-container">
                            <Link to="/entries/browse">See what people wrote</Link>
                        </div>
                    </>

                }
            </section>
            <section>
                <h2>
                    The bonfire... (Coming soon!)
                </h2>
                <p>Take a view of the bonfire. The past entries will be turned into statistics -- the bonfire.</p>
            </section>
        </main>
    )
}

export default Homepage