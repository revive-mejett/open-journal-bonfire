import { useEffect, useState } from "react"
import JournalEntryCard from "../components/JournalEntryCard"
import "./JournalEntriesPage.scss"
import { Field, Formik } from "formik"

const JournalEntriesPage = () => {

    const [entryData, setEntryData] = useState(undefined)

    const handleSubmit = (e) => {
        console.log("Apply filter button not implemented yet.")
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
                    initialValues={{ titleFilterMatch: "", entryContentMatch: "", selfRatingFilter: 0 }}
                    onSubmit={handleSubmit}
                >
                    {props => (<form onSubmit={props.handleSubmit}>
                        <label htmlFor="titleFilterMatch">Filter title containing:</label>
                        <Field as="input" name="titleFilterMatch" className="input-text-field"></Field>
                        <label htmlFor="entryContentMatch">Filter title containing:</label>
                        <Field as="input" name="entryContentMatch" className="input-text-field"></Field>
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