import { useEffect, useState } from "react"
import JournalEntryCard from "../components/JournalEntryCard"
import "./JournalEntriesPage.scss"
import { Field, Formik } from "formik"

const JournalEntriesPage = () => {

    const [entryData, setEntryData] = useState(undefined)
    const [filterOptions, setFilterOptions] = useState({})

    const handleSubmit = values => {
        console.log(values)
        setEntryData(undefined)
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
                        <Field as="input" type="range" name="minSelfRating" step="1" min="0" max="10"></Field><span>{props.values.minSelfRating !== 0 ? props.values.minSelfRating :"(No min)"}</span>

                        <label htmlFor="maxSelfRating">Maximum self-rating:</label>
                        <Field as="input" type="range" name="maxSelfRating" step="1" min="0" max="10"></Field><span>{props.values.maxSelfRating !== 0 ? props.values.maxSelfRating :"(No max)"}</span>

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