import { ResponsiveContainer, Treemap } from "recharts";
import { keywordTestData } from "../../assets/dummyStats";
import { colorMap } from "../../assets/constants";
import { useEffect, useState } from "react";

const positiveColorText = colorMap.get(10)
const negativeColorText = colorMap.get(-10)

const KeywordCloud = () => {


    const [data, setData] = useState(undefined)

    useEffect(() => {

        const fetchData = async () => {
            try {
                let response = await fetch("/api/stats/event-tag-usage-frequency")
                if (!response.ok) {
                    console.log("response not ok")
                } else {
                    let data = await response.json()
                    console.log(data)
                    let processedData = [{
                        name: "Great",
                        color: "green",
                        children: [

                        ]
                    },
                    {
                        name: "Neutral",
                        color: "yellow",
                        children: [

                        ]
                    },
                    {
                        name: "Neutral",
                        color: "red",
                        children: [

                        ]
                    }   
                ]
                data.eventTagFrequency.forEach(eventTag => {
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

                    console.log(eventTag[1].weight, " akshan destroyped me")
                    console.log(magnitude, " new akshan magnitude")
                    
                    // 5 * 2 ** Math.abs(magnitude) * (magnitude > 0 ? 1 : -1)
                    processedData[processedDataIndex].children.push({
                        name : eventTag[0],
                        color : 'grey'
                    })
                })
            }

            } catch (error) {
                console.error("Error fetching match data --> ", error)
            }
        }
        if (data === undefined) {
            fetchData()
        }
    }, [data])

    /*
        {"eventTagFrequency":[
            ["ate a decent meal",{"frequency":5,"weight":0}],
            ["bought something necessary",{"frequency":3,"weight":0}]
        }
     */

    /** graph data must be shaped like this

        {
        name: "Amazing day",
        color: 'rgba(0,0,255,0.1)',
        children: [
            {
                name: "Sunny day",
                color: 'rgba(0,0,255,0.1)',
                size: 340
            },
            {
                name: "Passed test",
                color: 'rgba(0,0,255,0.1)',
                size: 640
            }, ...
        ]
    },
     */


    const CustomKeywordCloud = (props) => {
        //will work with the payload in the future
        const { x, y, width, height, index, payload, depth, name, color } = props;

        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill="transparent"
                    stroke='red'
                ></rect>
                {
                    width >= 100 ?
                        <text
                            x={x + width / 2}
                            y={y + height / 2}
                            width={width}
                            height={height}
                            textAnchor="middle"
                            alignmentBaseline='middle'
                            fill={positiveColorText}
                            fontSize={width / 10}>
                        {name}
                        </text> : null
                }
                {
                    depth !== 0 ?
                        <circle
                            cx={x + width / 2}
                            cy={y + height / 2}
                            r={width > height ? height / 2 : width / 2}
                            style={{
                                fill: color, // Use the color specified in your data
                                stroke: '#fff',
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
        <ResponsiveContainer width="100%" height={1200}>
            <Treemap width={200} height={500} data={keywordTestData} dataKey={"size"} content={<CustomKeywordCloud></CustomKeywordCloud>}>
            </Treemap>
        </ResponsiveContainer>
    )

}

export default KeywordCloud