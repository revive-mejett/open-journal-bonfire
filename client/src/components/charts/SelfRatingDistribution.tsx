import { useEffect, useState } from "react"
import { Bar, BarChart, Label, Cell, XAxis, YAxis, ResponsiveContainer } from "recharts"
import Loading from "../visuals/Loading"

import { colorMap } from "../../assets/constants"

const borderColor = "#d0a1ff"
const fontColor = "#64FFDD"

interface DataItem {
    rating : number,
    numberEntries : number
}

type GraphData = DataItem[]


const SelfRatingDistribution : React.FC = () => {

    const [data, setData] = useState<GraphData | undefined>(undefined)

    useEffect(() => {

        const fetchData = async () => {
            try {
                let response = await fetch("/api/stats/self-rating-distribution")
                if (!response.ok) {
                    console.log("response not ok")
                } else {
                    let data = await response.json()
                    data = data.sort((a : DataItem, b : DataItem) => a.rating - b.rating)
                    setData(data)

                    
                }
            } catch (error) {
                console.error("Error fetching match data --> ", error)
            }
        }
        if (data === undefined) {
            fetchData()
        }
    }, [data])

    
    return (
        <>
            {
                data ?
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart width={1000} height={600} data={data} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
                        <Bar dataKey="numberEntries" fill="white" label={{ position: "top" }}>
                            {data.map((selfRating, index) => {
                                return (
                                    <Cell key={`cell-${index}`} fill={colorMap.get(selfRating.rating)}></Cell>
                                )
                            })}

                        </Bar>

                        <XAxis dataKey={"rating"} axisLine={{ stroke: borderColor }} tick={{ fill: fontColor }}>
                            <Label value={"Self-rating"} position={"insideTopRight"} offset={30} fill={borderColor}></Label>
                        </XAxis>
                        <YAxis dataKey={"numberEntries"} axisLine={{ stroke: borderColor }} tick={{ fill: fontColor }}>
                            <Label value={"Number of entries"} position={"center"} offset={-30} angle={90} fill={borderColor}></Label>
                        </YAxis>
                    </BarChart>
                </ResponsiveContainer>

                    :
                    <Loading/>
            }
        </>

    )
}

export default SelfRatingDistribution



