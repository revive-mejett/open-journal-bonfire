import { useEffect, useState } from "react"
import JournalEntryCard from "../components/JournalEntryCard"
import "./JournalEntriesPage.scss"
import { Field, Formik } from "formik"

const JournalEntriesPage = () => {

    const [entryData, setEntryData] = useState(undefined)

    const baseSearchUrl = "/api/journalentries"

    const handleSubmit = values => {
        console.log(values)

        const currentLocation = new URL(document.location)
        let searchParams = new URLSearchParams()
        const url = new URL(baseSearchUrl, currentLocation) 
        
        if (values.titleFilterMatch.trim() !== "") {
            url.searchParams.set("titleFilterMatch", values.titleFilterMatch)
        }

        if (values.titleFilterMatch.trim() !== "") {
            url.searchParams.set("entryContentMatch", values.entryContentMatch)
        }
        url.searchParams.set("minSelfRating", values.minSelfRating)
        url.searchParams.set("maxSelfRating", values.maxSelfRating)

        //todo fetch the url once API route is established
        
    }


    useEffect(() => {

        const fetchEntryData = async () => {
            try {
                let response = await fetch("/api/journalentries")
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
        if (!entryData) {
            fetchEntryData()
        }
    }, [entryData])

    return (
        <main className="jounal-entries-page-main">
            <section className="filters-container">
                <Formik
                    initialValues={{ titleFilterMatch: "", entryContentMatch: "", minSelfRating: 1, maxSelfRating: 10 }}
                    onSubmit={handleSubmit}
                >
                    {props => (<form onSubmit={props.handleSubmit}>
                        <label htmlFor="titleFilterMatch">Filter title containing:</label>
                        <Field as="input" name="titleFilterMatch" className="input-text-field"></Field>

                        <label htmlFor="entryContentMatch">Filter entry text containing:</label>
                        <Field as="input" name="entryContentMatch" className="input-text-field"></Field>

                        
                        <label htmlFor="minSelfRating">Minimum self-rating:</label>
                        <Field as="input" type="range" name="minSelfRating" step="1" min="1" max="10"></Field><span>{props.values.minSelfRating}   </span>

                        <label htmlFor="maxSelfRating">Maximum self-rating:</label>
                        <Field as="input" type="range" name="maxSelfRating" step="1" min="1" max="10"></Field><span>{props.values.maxSelfRating}   </span>

                        <button type="submit" className="button">Apply Filters</button>
                    </form>)}
                </Formik>
            </section>
            <section className="entries-container">
                {entryData &&
                    entryData.map((entry, i) => <JournalEntryCard key={i} entry={entry}></JournalEntryCard>)
                }
            </section>

        </main>
    )
}

export default JournalEntriesPage