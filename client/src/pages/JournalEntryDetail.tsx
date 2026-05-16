import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./JournalEntryDetail.scss"
import Background from "../components/visuals/Background"
import Loading from "../components/visuals/Loading"
import { filterRedhotWords } from "../utils/WordFilter"
import { splitTextIntoPages } from "../utils/splitEntryContent"
import { JournalEntry } from "../common/types"

const FLIP_OUT_MS = 450
const FLIP_IN_MS = 450

type FlipPhase = "idle" | "out-next" | "in-next" | "out-prev" | "in-prev"

// map risk safe level to the corresponding css class
const readSafeRiskClassMap = new Map(
    [
        [1, "eye-glaring"],
        [2, "eye-unsafe"],
        [3, "unreadable"]
    ]
)

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

//array of divs used as particles to style eye-glaring, explicit, unreadable entries
const emberParticlesSmaller : JSX.Element[] = Array.from({ length: 5 }, (_, i) => <div className="ember-particle-smaller" key={i}></div>)
const emberParticles : JSX.Element[] = Array.from({ length: 11 }, (_, i) => <div className="ember-particle" key={i}></div>)
const emberParticleslargest : JSX.Element[] = Array.from({ length: 20 }, (_, i) => <div className="ember-particle-larger" key={i}></div>)

/**
 * react component which displays a detailed paper of the journal entry containing the entire entry content and all event tags
 */
const JournalEntryDetail : React.FC = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const [journalEntryData, setJournalEntryData] = useState<JournalEntry | undefined>(undefined)
    const [isFetching, setIsFetching] = useState<Boolean>(true)
    const [contentPages, setContentPages] = useState<string[]>([""])
    const [currentPage, setCurrentPage] = useState(0)
    const [flipPhase, setFlipPhase] = useState<FlipPhase>("idle")
    const [pendingPage, setPendingPage] = useState<number | null>(null)

    const dateCreated = useRef<Date | null>(null)
    const pageRef = useRef<HTMLElement>(null)
    const entryBodyRef = useRef<HTMLDivElement>(null)
    const titleMeasureRef = useRef<HTMLHeadingElement>(null)
    const contentMeasureRef = useRef<HTMLParagraphElement>(null)

    const recalculatePages = useCallback(() => {
        if (!journalEntryData || !entryBodyRef.current || !contentMeasureRef.current) {
            return
        }

        const filteredContent = filterRedhotWords(journalEntryData.entryContent)
        const bodyHeight = entryBodyRef.current.clientHeight
        const titleHeight = titleMeasureRef.current?.offsetHeight ?? 0
        const titleGap = 12

        contentMeasureRef.current.style.width = `${entryBodyRef.current.clientWidth}px`

        const measureHeight = (slice: string) => {
            contentMeasureRef.current!.textContent = slice
            return contentMeasureRef.current!.scrollHeight
        }

        const pages = splitTextIntoPages(
            filteredContent,
            measureHeight,
            (pageIndex) => {
                if (pageIndex === 0) {
                    return bodyHeight - titleHeight - titleGap
                }
                return bodyHeight
            }
        )

        setContentPages(pages)
        setCurrentPage((prev) => Math.min(prev, Math.max(pages.length - 1, 0)))
    }, [journalEntryData])

    useEffect(() => {
        let baseUrl = "/api/journalentries/"

        let urlParams : URLSearchParams = new URLSearchParams(location.search)
        let searchId = urlParams.get("id")

        const fetchEntry = async () => {
            if (!journalEntryData) {
                let fetchUrl
                if (searchId === "random") {
                    setIsFetching(true)
                    fetchUrl = "/api/journalentries/random"
                } else {
                    fetchUrl = baseUrl + searchId 
                }
                let response = await fetch(fetchUrl)

                if (response.ok) {
                    const data = await response.json()
                    setJournalEntryData(data)
                    setIsFetching(false)
                    dateCreated.current = new Date(data.dateCreated)
                    setCurrentPage(0)
                } else if (response.status === 404) {
                    navigate("/entries/error")
                }
            }
        };
        fetchEntry()

    }, [location.search, journalEntryData, navigate])

    useLayoutEffect(() => {
        if (!journalEntryData || isFetching) {
            return
        }
        recalculatePages()
    }, [journalEntryData, isFetching, recalculatePages])

    useEffect(() => {
        if (!journalEntryData || !entryBodyRef.current) {
            return
        }

        const observer = new ResizeObserver(() => {
            recalculatePages()
        })
        observer.observe(entryBodyRef.current)
        return () => observer.disconnect()
    }, [journalEntryData, recalculatePages])

    const handleFlipAnimationEnd = (event: React.AnimationEvent<HTMLElement>) => {
        if (event.target !== event.currentTarget) {
            return
        }

        if (flipPhase === "out-next" || flipPhase === "out-prev") {
            if (pendingPage !== null) {
                setCurrentPage(pendingPage)
            }
            setFlipPhase(flipPhase === "out-next" ? "in-next" : "in-prev")
            return
        }

        if (flipPhase === "in-next" || flipPhase === "in-prev") {
            setFlipPhase("idle")
            setPendingPage(null)
        }
    }

    const startPageTurn = (targetPage: number, direction: "next" | "prev") => {
        if (flipPhase !== "idle" || targetPage === currentPage) {
            return
        }
        if (targetPage < 0 || targetPage >= contentPages.length) {
            return
        }

        setPendingPage(targetPage)
        setFlipPhase(direction === "next" ? "out-next" : "out-prev")
    }

    const goToPreviousPage = () => startPageTurn(currentPage - 1, "prev")
    const goToNextPage = () => startPageTurn(currentPage + 1, "next")

    const readSafeRisk = journalEntryData ? determineReadSafeRisk(journalEntryData) : 0
    const riskClass = readSafeRiskClassMap.get(readSafeRisk) || "eye-safe"
    const totalPages = contentPages.length
    const isFirstPage = currentPage === 0
    const isLastPage = currentPage === totalPages - 1
    const showPagination = totalPages > 1

    const filteredTitle = journalEntryData
        ? (journalEntryData.title.trim() !== "" ? filterRedhotWords(journalEntryData.title) : "No title")
        : ""

    return (
        <main className="journal-entry-detail-main">
            <Background/>
            {
                journalEntryData && !isFetching ?
                <div className="journal-entry-detail-layout">
                    <div className="page-flip-viewport">
                        <section
                            className={`journal-entry-page ${riskClass} ${flipPhase !== "idle" ? `page-flip-${flipPhase}` : ""}`}
                            ref={pageRef}
                            onAnimationEnd={handleFlipAnimationEnd}
                            style={{
                                animationDuration: flipPhase.startsWith("out-")
                                    ? `${FLIP_OUT_MS}ms`
                                    : flipPhase.startsWith("in-")
                                        ? `${FLIP_IN_MS}ms`
                                        : undefined
                            }}
                        >
                            <div className="burn-background"></div>
                            {readSafeRisk === 1 && emberParticlesSmaller} 
                            {readSafeRisk === 2 && emberParticles} 
                            {readSafeRisk === 3 && emberParticleslargest} 
                            {isFirstPage && dateCreated.current !== null &&
                                <div className="date-display">
                                    <h2 className="entry-date">{dateCreated.current.toLocaleString("default", { month: "long", day: "numeric", year: "numeric" })}</h2>
                                    <h2 className="entry-date">{dateCreated.current.toLocaleString("default", { weekday: "long" })}</h2>
                                    <h2 className="entry-date">{dateCreated.current.toLocaleString("default", { hour: "numeric", minute: "numeric" })}</h2>
                                </div>
                            }
                            {!isFirstPage &&
                                <div className="date-display date-display--continued">
                                    <h2 className="entry-date entry-date--continued">continued…</h2>
                                </div>
                            }
                            <div className="entry-body" ref={entryBodyRef}>
                                {isFirstPage &&
                                    <h3 className="entry-title">{filteredTitle}</h3>
                                }
                                <p className="entry-content-text">{contentPages[currentPage]}</p>
                            </div>

                            <div className="entry-content-measurer" aria-hidden="true">
                                <h3 className="entry-title" ref={titleMeasureRef}>{filteredTitle}</h3>
                                <p className="entry-content-text" ref={contentMeasureRef}></p>
                            </div>

                            {isLastPage &&
                                <div className="event-tag-body">
                                    <div className="event-tag-container">
                                        {journalEntryData.greatEvents.map((event, i) => <p key={i} className="event-tag positive">{event.keyword}</p>)}
                                        {journalEntryData.neutralEvents.map((event, i) => <p key={i} className="event-tag neutral">{event.keyword}</p>)}
                                        {journalEntryData.badEvents.map((event, i) => <p key={i} className="event-tag negative">{event.keyword}</p>)}
                                    </div>
                                </div>
                            }
                            {!isLastPage && <div className="event-tag-body event-tag-body--placeholder" aria-hidden="true" />}
                        </section>
                    </div>

                    {showPagination &&
                        <nav className="page-navigation" aria-label="Journal entry pages">
                            <button
                                type="button"
                                className="page-nav-btn page-nav-btn--prev"
                                onClick={goToPreviousPage}
                                disabled={isFirstPage || flipPhase !== "idle"}
                            >
                                Previous
                            </button>
                            <span className="page-indicator">
                                Page {currentPage + 1} of {totalPages}
                            </span>
                            <button
                                type="button"
                                className="page-nav-btn page-nav-btn--next"
                                onClick={goToNextPage}
                                disabled={isLastPage || flipPhase !== "idle"}
                            >
                                Next
                            </button>
                        </nav>
                    }
                </div>
                :
                <Loading/>
                }
        </main>

    )
}

export default JournalEntryDetail
