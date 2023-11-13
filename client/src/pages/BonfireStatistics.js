import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar } from 'recharts';


const BonfireStatistics = () => {

    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },]

    let selfRatings = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10]

    const data2 = selfRatings.map(rating => {
        return {
            name: `${rating}`,
            count: Math.floor(Math.random()*100)
        }
    })


    const testgraph = (
        <BarChart width={400} height={400} data={data2}>
            {selfRatings.map(r => {
                return (
                    <Bar dataKey="count"></Bar>
                )
            })}
        </BarChart>
    )
    return (
        <main className="bonfire-stats-page-main">
            <h1>Bonfire statistics page</h1>
            {testgraph}
        </main>
    )
}

export default BonfireStatistics