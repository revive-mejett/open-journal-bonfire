import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Label, Cell, Legend, ResponsiveContainer, Treemap } from 'recharts';


let selfRatings = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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

// test data to use in charts
const positiveColor = 'rgba(255,124,2, 0.1)'
const neutralColor = 'rgba(72,22,122, 0.1)'
const negativeColor = 'rgba(22, 141, 238, 0.1)'

const positiveColorText = colorMap.get(10)
const negativeColorText = colorMap.get(-10)

const selfRatingTestData = selfRatings.map(rating => {
    return {
        name: rating,
        count: Math.floor(Math.random() * 100)
    }
})

const keywordTestData = [
    {
        name: "Amazing day",
        color: positiveColor,
        children: [
            {
                name: "Sunny day",
                color: positiveColor,
                size: 340
            },
            {
                name: "Passed test",
                color: positiveColor,
                size: 640
            },
            {
                name: "New car",
                color: positiveColor,
                size: 1000
            },
            {
                name: "Ate peperroni",
                color: positiveColor,
                size: 920
            },
            {
                name: "Drank a nice iced capp",
                color: positiveColor,
                size: 920
            },
        ]
    },
    {
        name: "okay day",
        color: neutralColor,
        children: [
            {
                name: "Cloudy day",
                color: neutralColor,
                size: 100
            },
            {
                name: "did laundry",
                color: neutralColor,
                size: 100
            },
            {
                name: "nothing too special",
                color: neutralColor,
                size: 100
            },
        ]
    },
    {
        name: "bad day",
        color: negativeColor,
        children: [
            {
                name: "rainy day",
                color: negativeColor,
                size: 200
            },
            {
                name: "failed my semester",
                color: negativeColor,
                size: 700
            },
            {
                name: "had breakup",
                color: negativeColor,
                size: 1600
            },
        ]
    },
]


const BonfireStatistics = () => {
    const selfRatingBar = (
        <BarChart width={1000} height={600} data={selfRatingTestData} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
            <Bar dataKey="count" fill="white" label={{ position: "top" }}>
                {selfRatingTestData.map((data, i) => {
                    return (
                        <Cell key={`cell-${i}`} fill={colorMap.get(data.name)}></Cell>
                    )
                })}

            </Bar>

            <XAxis dataKey={"name"} axisLine={{ stroke: "#d0a1ff" }} tick={{ fill: "#64FFDD" }}>
                <Label value={"Self-rating"} position={"insideTopRight"} offset={30} fill="#d0a1ff"></Label>
            </XAxis>
            <YAxis dataKey={"count"} axisLine={{ stroke: "#d0a1ff" }} tick={{ fill: "#64FFDD" }}>
                <Label value={"Number of entries"} position={"center"} offset={-30} angle={90} fill="#d0a1ff"></Label>
            </YAxis>
        </BarChart>
    )

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

    const keywordCloud = (
        <ResponsiveContainer width="100%" height={1200}>
            <Treemap width={200} height={500} data={keywordTestData} dataKey={"size"} content={<CustomKeywordCloud></CustomKeywordCloud>}>

            </Treemap>
        </ResponsiveContainer>
    )

    return (
        <main className="bonfire-stats-page-main">
            <h1>Bonfire statistics page</h1>
            <section className="self-rating-count-stats">
                <h2>Distribution of Self-rating</h2>
                <div className="chart-container">
                    {selfRatingBar}
                </div>
            </section>

            <section className="keyword-volume-stats">

                <div className="chart-container">
                    <h2>Frequently used event tags</h2>
                    {keywordCloud}
                </div>
            </section>

        </main>
    )
}

export default BonfireStatistics