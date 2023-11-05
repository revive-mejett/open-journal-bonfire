import { useEffect, useRef, useState } from "react"
import JournalEntryCard from "../components/JournalEntryCard"
import "./Homepage.scss"
import { Link } from "react-router-dom"
import HomepageLetterVisual from "../components/visuals/HomepageLetterVisual"

const Homepage = () => {

    const samplePreviewEntries = [{
        sampleTitle: "Passed my science test!",
        sampleDate: new Date("2023-1-17"),
        sampleText: "Today I had an amazing day! I passed my science test covering the reproductive system with an A+! I studied so hard for it and it paid off. I bought a nice ice cream to celebrate it."
    },
    {
        sampleTitle: "city lockdown and hurt my thumb",
        sampleDate: new Date("2020-12-26"),
        sampleText: "Today my city went on lockdown. I HATE COVID SO MUCH. I was supposed to go out to mcdonalds but the city decided to put a lockdown AND CURFEW. We could not leave our house past 8PM. I hate it so much. I threw a fit and played LoL ranked. I ran it down mid and inted. In the process I hit my thumb and caused a bruise."
    },
    {
        sampleTitle: "new honda civic",
        sampleDate: new Date("2022-06-06"),
        sampleText: "Was a typical day. I went out for a nice walk in the park and had some fresh air. It was a bit cloudy. And guess what!! I GOT A NEW HONDA CIVIC!!!1 YESSSSSSS! I saved up $$$$ for this and IT FINALLY HAPPENED. 2018 Honda Civic!!!!! I took a drive with it for the first time and to celebrate my new Honda Civic I went to Baton Rouge!"
    },
    {
        sampleTitle: "noobs in valorant",
        sampleDate: new Date("2020-02-13"),
        sampleText: "Played valorant today. It was subpar on the matches I got. However there was one match I hated. Was playing sova and the enemy team just stomped me constantly. There was this one phoenix who rages constantly telling me to uninstall valorant. Another one told me to refund my vandal skin after missing the enemy reyna. Reyna needs a nerf so baad"
    },
    ]
    
    const [previewEntriesIndex, setPreviewWrite] = useState(0)
    const [sampleEntries, setEntryData] = useState(0)

    const refreshPreviewVisual = () => {
        if (previewEntriesIndex === samplePreviewEntries.length - 1) {
            setPreviewWrite(0)
        } else {
            setPreviewWrite(previewEntriesIndex + 1)
        }
        
    }

    const numberSampleEntries = 3

    const particles = Array.from({ length: 50 }, (_, i) => <div className="particle" key={i}></div>)

    const paperPieces = Array.from({ length: 15 }, (_, i) => {
        let randomRotation = Math.floor(Math.random() * 360)
        const paperWidth = 36
        const paperHeight = 50

        let styles = {
            transform: `rotate(${randomRotation}deg)`,
            width: `${paperWidth}px`,
            height: `${paperHeight}px`,
        }

        let newPaperDiv = <div className="paper-piece" style={styles} key={i}></div>
        // newPaperDiv.style.rotation = `${randomRotation}deg`
        return newPaperDiv
    })

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
                <HomepageLetterVisual sampleTitle={samplePreviewEntries[previewEntriesIndex].sampleTitle} sampleEntryContent={samplePreviewEntries[previewEntriesIndex].sampleText} date={samplePreviewEntries[previewEntriesIndex].sampleDate} refreshVisual={refreshPreviewVisual}> </HomepageLetterVisual>
                <div className="link-container">
                    <Link to="/entries/new" className="link-button">Create now</Link>
                </div>
            </section>
            <section className="presentation-section entry-view-presentation">
                <h2>
                    Open and anonymous
                </h2>
                <p>Take a read of some entries! Hear what people are saying in words. Look what people have been saying and experiencing.</p>

                <div className="sample-entries-background">
                    {paperPieces}
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
                </div>

            </section>
            {/* temp */}
            <div className="leaf">

            </div>
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