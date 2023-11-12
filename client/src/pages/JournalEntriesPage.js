import { useEffect, useState } from "react"
import JournalEntryCard from "../components/JournalEntryCard"
import "./JournalEntriesPage.scss"
import "../common/forms.scss"
import "./Homepage.scss"
import { Field, Formik } from "formik"
import { useLocation, useNavigate } from "react-router-dom"
import Background from "../components/visuals/Background"
import Loading from "../components/visuals/Loading"


const JournalEntriesPage = () => {

    const [entryData, setEntryData] = useState(undefined)
    const [isFetching, setIsFetching] = useState(true)

    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = values => {

        const url = new URL(window.location)

        url.searchParams.set("titleFilterMatch", values.titleFilterMatch)
        url.searchParams.set("entryContentMatch", values.entryContentMatch)
        url.searchParams.set("minSelfRating", values.minSelfRating)
        url.searchParams.set("maxSelfRating", values.maxSelfRating)
        url.searchParams.set("sortOrder", values.sortOrder)
        navigate({ to: "/entries/browse", search: url.search })
        window.location.reload()
    }


    useEffect(() => {

        const fetchEntryData = async () => {
            try {
                let response = await fetch("/api/journalentries" + location.search)
                if (!response.ok) {
                    console.log("response not ok")
                } else {
                    let data = await response.json()
                    setEntryData(data)

                    setIsFetching(false)


                }
            } catch (error) {
                console.error("Error fetching match data --> ", error)
            }
        }
        if (!entryData) {
            fetchEntryData()
        }
    }, [entryData, location.search])

    return (
        <main className="jounal-entries-page-main">
            <Background />
            <section className="filters-container">
                <Formik
                    initialValues={{ titleFilterMatch: "", entryContentMatch: "", minSelfRating: -10, maxSelfRating: 10, sortOrder: "newest" }}
                    onSubmit={handleSubmit}
                >
                    {props => (<form onSubmit={props.handleSubmit} className="entry-filter-sort-form">

                        <fieldset className="filter-field-container">
                            <div>
                                <label htmlFor="titleFilterMatch">Filter title containing:</label>
                                <Field as="input" name="titleFilterMatch"></Field>
                            </div>

                            <div>
                                <label htmlFor="entryContentMatch">Filter entry text containing:</label>
                                <Field as="input" name="entryContentMatch"></Field>
                            </div>

                        </fieldset>

                        <fieldset className="self-rating-filter-fields">
                            <div>
                                <label htmlFor="minSelfRating">Minimum self-rating:</label>
                                <Field as="input" type="range" name="minSelfRating" step="1" min="-10" max="10" className="input-slider"></Field><span>{props.values.minSelfRating}   </span>
                            </div>

                            <div>
                                <label htmlFor="maxSelfRating">Maximum self-rating:</label>
                                <Field as="input" type="range" name="maxSelfRating" step="1" min="-10" max="10" className="input-slider"></Field><span>{props.values.maxSelfRating}   </span>
                            </div>
                        </fieldset>

                        <fieldset className="sort-order-fields">
                            <label htmlFor="sortOrder">Sort by:</label>
                            <Field as="select" name="sortOrder">
                                <option value="newest">Newest to Oldest</option>
                                <option value="oldest">Oldest to Newest</option>
                                <option value="highSelfRating">Highest to Lowest Self-Rating</option>
                                <option value="lowSelfRating">Lowest to Highest Self-Rating</option>
                            </Field>
                        </fieldset>
                        <div className="button-container">
                            <button type="submit" onClick={() => console.log("not yet implemented")}>Clear filters</button>
                            <button type="submit" >Apply Filters</button>
                        </div>
                    </form>)}
                </Formik>
            </section>

            {!isFetching ?
                <section className="entries-container">
                    {entryData &&
                        entryData.map((entry, i) => <JournalEntryCard key={i} entry={entry}></JournalEntryCard>)
                    }
                </section>
                :
                <Loading />
            }


        </main>
    )
}


export default JournalEntriesPage