import { useEffect, useRef, useState } from "react"
import JournalEntryCard from "../components/JournalEntryCard"
import "./JournalEntriesPage.scss"
import "../common/forms.scss"
import "./Homepage.scss"
import { Field, Formik } from "formik"
import { useLocation, useNavigate } from "react-router-dom"
import Background from "../components/visuals/Background"
import Loading from "../components/visuals/Loading"
import { JournalEntry } from "../common/types"

interface CreatEntryFormValues {
    titleFilterMatch: string,
    entryContentMatch: string,
    minSelfRating: number,
    maxSelfRating: number,
    sortOrder: string
}

//determines the read safe risk level based on explicit word data
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

const ENTRIES_PER_PAGE = 12

const JournalEntriesPage : React.FC = () => {

    const [entryData, setEntryData] = useState<JournalEntry[]>([])
    const [isFetching, setIsFetching] = useState<Boolean>(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [playSpreadAnimation, setPlaySpreadAnimation] = useState(true)

    const filtersContainer = useRef<HTMLElement | null>(null)

    const navigate = useNavigate()
    const location = useLocation()

    const totalPages = Math.max(1, Math.ceil(entryData.length / ENTRIES_PER_PAGE))
    const pageStartIndex = (currentPage - 1) * ENTRIES_PER_PAGE
    const paginatedEntries = entryData.slice(pageStartIndex, pageStartIndex + ENTRIES_PER_PAGE)
    const showPagination = entryData.length > ENTRIES_PER_PAGE

    const handleSubmit = (values : CreatEntryFormValues) => {

        const url : URL = new URL(window.location.origin + "/entries/browse")

        url.searchParams.set("titleFilterMatch", values.titleFilterMatch)
        url.searchParams.set("entryContentMatch", values.entryContentMatch)
        url.searchParams.set("minSelfRating", values.minSelfRating.toString())
        url.searchParams.set("maxSelfRating", values.maxSelfRating.toString())
        url.searchParams.set("sortOrder", values.sortOrder)
        navigate("/entries/browse" + url.search)
    }

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) {
            return
        }
        setPlaySpreadAnimation(false)
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "auto" })
    }

    useEffect(() => {

        const fetchEntryData = async () => {
            setIsFetching(true)
            try {
                let response = await fetch("/api/journalentries" + location.search)
                if (!response.ok) {
                    console.log("response not ok")
                    setEntryData([])
                } else {
                    let data = await response.json()
                    setEntryData(Array.isArray(data) ? data : [])
                    setCurrentPage(1)
                    setPlaySpreadAnimation(true)
                }
            } catch (error) {
                console.error("Error fetching match data --> ", error)
                setEntryData([])
            } finally {
                setIsFetching(false)
            }
        }
        fetchEntryData()
    }, [location.search])

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    const handleToggleButtonClick = () => {
        const filtersPane = filtersContainer.current
        if (filtersPane?.classList.contains("filter-toggled")) {
            filtersPane.classList.remove("filter-toggled")
        } else {
            filtersPane?.classList.add("filter-toggled")
        }
    }



    return (
        <main className="jounal-entries-page-main">
            <Background />
            <button type="button" id="button-filter-toggle" onClick={handleToggleButtonClick}>Toggle filters</button>
            <section className="filters-container" ref={filtersContainer}>
                
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
                <>
                    <section
                        className={`entries-container ${playSpreadAnimation ? "entries-container--spread" : "entries-container--static"}`}
                    >
                        {
                            entryData.length !== 0
                                ? paginatedEntries.map((entry, i) => (
                                    <JournalEntryCard
                                        key={entry._id ?? `${pageStartIndex + i}`}
                                        entry={entry}
                                        readSafeRisk={determineReadSafeRisk(entry)}
                                    />
                                ))
                                : <h2>No bonfiregoers has written a journal entry yet!</h2>
                        }
                    </section>

                    {showPagination &&
                        <nav className="entries-pagination" aria-label="Browse journal entries pages">
                            <button
                                type="button"
                                className="entries-page-btn entries-page-btn--prev"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage <= 1}
                            >
                                Previous
                            </button>
                            <span className="entries-page-indicator">
                                Page {currentPage} of {totalPages}
                                <span className="entries-page-count">
                                    ({entryData.length} entries)
                                </span>
                            </span>
                            <button
                                type="button"
                                className="entries-page-btn entries-page-btn--next"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                            >
                                Next
                            </button>
                        </nav>
                    }
                </>
                :
                <Loading />
            }


        </main>
    )
}


export default JournalEntriesPage