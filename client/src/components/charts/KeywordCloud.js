import { ResponsiveContainer, Treemap } from "recharts";
import { keywordTestData } from "../../assets/dummyStats";
import { colorMap } from "../../assets/constants";

const positiveColorText = colorMap.get(10)
const negativeColorText = colorMap.get(-10)

const KeywordCloud = () => {

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