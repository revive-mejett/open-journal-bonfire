import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Label, Cell } from 'recharts';

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
const BonfireStatistics = () => {



    let selfRatings = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const data2 = selfRatings.map(rating => {
        return {
            name: rating,
            count: Math.floor(Math.random() * 100)
        }
    })


    const testgraph = (
        <BarChart width={1200} height={600} data={data2} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
            <Bar  dataKey="count" fill="white">
                {data2.map((data,i) => {
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
    return (
        <main className="bonfire-stats-page-main">
            <h1>Bonfire statistics page</h1>
            <section className="self-rating-count-stats">
                <div className="chart-container">
                    {testgraph}
                </div>
            </section>


        </main>
    )
}

export default BonfireStatistics