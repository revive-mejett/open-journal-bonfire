import { ResponsiveContainer, Treemap } from "recharts";
import { colorMap, transparentColorMap } from "../../assets/constants";
import { useEffect, useState } from "react";
import Loading from "../visuals/Loading";
import "./KeywordCloud.scss"

const textColor : string | undefined = "white"

interface EventTagWeightData {
    frequency : number,
    weight : number
}

type EventTagFrequencyItem = [
    string,
    EventTagWeightData
]

// type that references a data item (a bubble in the chart)
interface  GraphDataItem {
    name: string,
    color: string | undefined,
    opaqueColor: string | undefined
    size: number
}

// type that represents the structure of the data to be passed to the keyword cloud
type GraphData = [
    {
    name: string | undefined,
    color: string | undefined,
    children: GraphDataItem[]
    },
    {
        name: string | undefined,
        color: string | undefined,
        children: GraphDataItem[]
    },
    {
        name: string | undefined,
        color: string | undefined,
        children: GraphDataItem[]
    },
]


/**
 * Keyword cloud that displays the most used event tags, where the more a word is used the bigger the bubble
 * @returns 
 */
const KeywordCloud : React.FC = () => {


    const [data, setData] = useState<GraphData | undefined>(undefined)

    useEffect(() => {

        const fetchData = async () => {
            try {
                let response = await fetch("/api/stats/event-tag-usage-frequency")
                if (!response.ok) {
                    console.log("response not ok")
                } else {
                    let responseData = await response.json()
                    let processedData :  GraphData = [{
                        name: "Great",
                        color: transparentColorMap.get(9),
                        children: []
                    },
                    {
                        name: "Neutral",
                        color: transparentColorMap.get(0),
                        children: []
                    },
                    {
                        name: "Not so great",
                        color: transparentColorMap.get(-9),
                        children: []
                    }
                    ]

                    //process the data
                    responseData.eventTagFrequency.forEach((eventTag : EventTagFrequencyItem) => {
                        //using the weights of the event tag will determine where the event tag data item is stored
                        //positive weight = positive, negative weight = negative, 0 weight = neutral
                        //index of processedData contains event tags of a type (index 0 = positive, index 1 = neutral, index 2 = negative)
                        let processedDataIndex
                        if (eventTag[1].weight > 0) {
                            processedDataIndex = 0
                        } else if (eventTag[1].weight < 0) {
                            processedDataIndex = 2
                        } else {
                            processedDataIndex = 1
                        }

                        //calculate the event tag's magnitude from its weight that was calculated in mongo
                        let magnitude = eventTag[1].weight * (eventTag[1].weight >= 0 ? 1 : -1)
                        magnitude /= 5
                        magnitude = (magnitude !== 0 ? Math.log2(magnitude) : 0)
                        magnitude *= (eventTag[1].weight >= 0 ? 1 : -1)


                        processedData[processedDataIndex].children.push({
                            name: eventTag[0],
                            color: transparentColorMap.get(magnitude),
                            opaqueColor: colorMap.get(magnitude),
                            size:  eventTag[1].frequency * 100
                        })

                    })
                    setData(processedData)

                }

            } catch (error) {
                console.error("Error fetching match data --> ", error)
            }
        }
        if (data === undefined) {
            fetchData()
        }
    }, [data])

    
    interface KeywordCloudProps {
        x : number,
        y : number,
        width : number,
        height : number,
        depth : number,
        name : string
        color : string,
        opaqueColor : string
    }

    // custom keyword cloud which renders svg circles
    const CustomKeywordCloud : React.FC<KeywordCloudProps> = (props : KeywordCloudProps) => {
        //may work with index and payload in the future
        const { x, y, width, height, depth, name, color, opaqueColor } = props;
        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill="transparent"
                    // stroke='red'
                ></rect>
                {
                    width >= 50 ?
                        <text
                            x={x + width / 2}
                            y={y + height / 2}
                            width={width}
                            height={height}
                            textAnchor="middle"
                            alignmentBaseline='middle'
                            fill={textColor}
                            fontSize={width / 10}
                        >
                            {name}
                        </text> : null
                }
                {
                    depth !== 0 ?
                        <circle className="circle-point"
                            cx={x + width / 2}
                            cy={y + height / 2}
                            r={width > height ? height / 2 : width / 2}
                            style={{
                                fill: color, // Use the color specified in your data
                                stroke: opaqueColor,
                                strokeWidth: 2,
                            }}
                            >
                        </circle>
                        :
                        null
                }


            </g>
        )
    }

    return (
        <>
            {
                data ?
                <>
                    {
                        (data[0].children.length !== 0 || data[1].children.length !== 0 || data[2].children.length !== 0) ?
                        <ResponsiveContainer width="100%" height={1200}>
                            <Treemap width={200} height={500} data={data} dataKey={"size"} content={<CustomKeywordCloud x={0} y={0} width={0} height={0} depth={0} name={""} color={""} opaqueColor={""}></CustomKeywordCloud>}>
                            </Treemap>
                        </ResponsiveContainer>
                        :
                        <h3 className="no-data-message">No data available. No entries to collect for this metric.</h3>
                    }
                </>
                :
                <Loading />
            }
        </>

    )

}

export default KeywordCloud