import { useEffect, useState } from "react"
import "./GeneralStatistics.scss"
import Loading from "./visuals/Loading"

const GeneralStatistics = () => {

    const [data, setData] = useState(undefined)

    const determineColorClass = (percentage, isNeutral, type) => {
        if (isNeutral) {
            return "neutral"
        }
        let colourClass = ""

        switch (true) {
            case (percentage > 70):
                colourClass = type >= 1 ? "positive-5" : "negative-5"
                break;
            case (percentage > 60):
                colourClass = type >= 1 ? "positive-4" : "negative-4"
                break;
            case (percentage > 40):
                colourClass = type >= 1 ? "positive-3" : "negative-3"
                break;
            case (percentage > 30):
                colourClass = type >= 1 ? "positive-2" : "negative-2"
                break;
            case (percentage > 0):
                colourClass = type >= 1 ? "positive" : "negative"
                break;
            default:
                colourClass = "neutral"
                break;
        }
        return colourClass
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch("/api/stats/general")
                if (!response.ok) {
                    console.log("response not ok")
                } else {
                    let data = await response.json()
                    setData(data)
                }
            } catch (error) {
                console.error("Error fetching match data --> ", error)
            }
        }
        if (data === undefined) {
            fetchData()
        }
    })

    return (
        <>
            {
                data ?
                    <div className="general-stats-container">
                        <div className="stat-item-group">
                            <div className="stat-item neutral">
                                <h3>
                                    Total entries in this bonfire
                                </h3>
                                <p>{data.totalEntries}</p>
                            </div>
                        </div>
                        <div className="stat-item-group">
                            <div className="stat-item positive-4">
                                <h3>
                                    Number of positive self-rated
                                </h3>
                                <p>{data.positiveSelfRatedCount}</p>
                            </div>
                            <div className="stat-item neutral">
                                <h3>
                                    Number of Neutral entries
                                </h3>
                                <p>{data.neutralSelfRatedCount}</p>
                            </div>
                            <div className="stat-item negative-4">
                                <h3>
                                    Number of negative self-rated
                                </h3>
                                <p>{data.negativeSelfRatedCount}</p>
                            </div>
                            <div className={"stat-item " + determineColorClass(data.percentagePositive, false, 1)}>
                                <h3>
                                    Percentage of positive self-rated
                                </h3>
                                <p>{data.percentagePositive}%</p>
                            </div>
                            <div className={"stat-item " + determineColorClass(data.percentageNeutral, true)}>
                                <h3>
                                    Percentage of neutral self-rated
                                </h3>
                                <p>{data.percentageNeutral}%</p>
                            </div>
                            <div className={"stat-item " + determineColorClass(data.percentageNegative, false, -1)}>
                                <h3>
                                    Percentage of negative self-rated
                                </h3>
                                <p>{data.percentageNegative}%</p>
                            </div>
                        </div>
                        <div className="stat-item-group">
                            <div className="stat-item neutral">
                                <h3>
                                    Average word count
                                </h3>
                                <p>{data.averageWordCount}</p>
                            </div>
                            <div className="stat-item neutral">
                                <h3>
                                    Number of entries containing "hot words"
                                </h3>
                                <p>0*</p>
                            </div>
                            <div className="stat-item neutral">
                                <h3>
                                    Number of explicit entries
                                </h3>
                                <p>0*</p>
                            </div>
                        </div>
                    </div>
                    :
                    <Loading />
            }
        </>
    )

}

export default GeneralStatistics