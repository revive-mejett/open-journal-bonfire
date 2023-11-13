import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';


const BonfireStatistics = () => {

    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },]
    const testgraph = (
        <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
    )
    return (
        <main className="bonfire-stats-page-main">
            <h1>Bonfire statistics page</h1>
            {testgraph}
        </main>
    )
}

export default BonfireStatistics