import { useEffect, useState } from "react"
import "./GeneralStatistics.scss"
import Loading from "./visuals/Loading"
import { EventTagType } from "../common/types"

interface GeneralStatisticsData {
    totalEntries: number,
    positiveSelfRatedCount: number,
    neutralSelfRatedCount: number,
    negativeSelfRatedCount: number,
    percentagePositive : number,
    percentageNeutral: number,
    percentageNegative: number,
    averageWordCount: number,
    numberEyeGlaring: number,
    numberEyeUnsafe: number,
    numberUnreadable: number,
}

/** Pane that contains general stat metrics such as percentage of positive entries base on self-rating, number of explicit entries, etc.
 * 
 * @returns 
 */
const GeneralStatistics : React.FC = () => {

    const [data, setData] = useState<GeneralStatisticsData | undefined>(undefined)

    /** determine the colour of the div based on the data being positive or not and the value
     * 
     */
    const determineColorClass = (percentage : number, type : EventTagType) => {
        if (type === "neutral") {
            return type
        }
        let colourClass = ""

        switch (true) {
            case (percentage > 70):
                colourClass = type === "positive" ? "positive-5" : "negative-5"
                break;
            case (percentage > 60):
                colourClass = type >= "positive" ? "positive-4" : "negative-4"
                break;
            case (percentage > 40):
                colourClass = type >= "positive" ? "positive-3" : "negative-3"
                break;
            case (percentage > 30):
                colourClass = type >= "positive" ? "positive-2" : "negative-2"
                break;
            case (percentage > 0):
                colourClass = type >= "positive" ? "positive" : "negative"
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
                    let data : GeneralStatisticsData = await response.json() as GeneralStatisticsData
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
                            <div className={"stat-item " + determineColorClass(data.percentagePositive, "positive")}>
                                <h3>
                                    Percentage of positive self-rated
                                </h3>
                                <p>{data.percentagePositive}%</p>
                            </div>
                            <div className={"stat-item " + determineColorClass(data.percentageNeutral, "neutral")}>
                                <h3>
                                    Percentage of neutral self-rated
                                </h3>
                                <p>{data.percentageNeutral}%</p>
                            </div>
                            <div className={"stat-item " + determineColorClass(data.percentageNegative, "negative")}>
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
                                    Number of eye-glaring entries
                                </h3>
                                <p>{data.numberEyeGlaring}</p>
                            </div>
                            <div className="stat-item neutral">
                                <h3>
                                    Number of eye-unsafe entries
                                </h3>
                                <p>{data.numberEyeUnsafe}</p>
                            </div>
                            <div className="stat-item neutral">
                                <h3>
                                    Number of unreadable entries
                                </h3>
                                <p>{data.numberUnreadable}</p>
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