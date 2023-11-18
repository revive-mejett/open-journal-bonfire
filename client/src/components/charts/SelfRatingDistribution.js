import { useEffect, useState } from "react"
import { Bar, BarChart, Label, Cell, XAxis, YAxis } from "recharts"
import Loading from "../visuals/Loading"

let colorMap = new Map([
    [-10, "rgb(105, 212, 255)"],
    [-9, "rgb(105, 212, 255)"],
    [-8, "rgb(22, 141, 238)"],
    [-7, "rgb(22, 141, 238)"],
    [-6, "rgb(22, 69, 238)"],
    [-5, "rgb(22, 69, 238)"],
    [-4, "rgb(2, 40, 177)"],
    [-3, "rgb(2, 40, 177)"],
    [-2, "rgb(10,26,86)"],
    [-1, "rgb(10,26,86)"],
    [0, "rgb(72,22,122)"],
    [1, "rgb(82,0,99)"],
    [2, "rgb(82,0,99)"],
    [3, "rgb(145, 0, 73)"],
    [4, "rgb(145, 0, 73)"],
    [5, "rgb(202, 57, 0)"],
    [6, "rgb(202, 57, 0)"],
    [7, "rgb(255,124,2)"],
    [8, "rgb(255,124,2)"],
    [9, "rgb(255,217,0)"],
    [10, "rgb(255,217,0)"],
])

const borderColor = "#d0a1ff"
const fontColor = "#64FFDD"


const SelfRatingDistribution = () => {

    let [data, setData] = useState(undefined)

    useEffect(() => {

        const fetchData = async () => {
            try {
                let response = await fetch("/api/stats/self-rating-distribution")
                if (!response.ok) {
                    console.log("response not ok")
                } else {
                    let data = await response.json()
                    data = data.sort((a,b) => a.rating - b.rating)
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
                    :
                    <Loading/>
            }
        </>

    )
}

export default SelfRatingDistribution



