import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Label } from 'recharts';


const BonfireStatistics = () => {



    let selfRatings = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10]

    const data2 = selfRatings.map(rating => {
        return {
            name: `${rating}`,
            count: Math.floor(Math.random()*100)
        }
    })


    const testgraph = (
        <BarChart width={1200} height={600} data={data2} margin={{top: 20, right: 20, left: 20, bottom: 40}}>
            {selfRatings.map(r => {
                return (
                    <Bar dataKey="count"></Bar>
                )
            })}
            <XAxis dataKey={"name"} axisLine={{stroke: "#d0a1ff"}} tick={{fill: "#64FFDD"}}>
                <Label value={"Self-rating"} position={"insideTopRight"} offset={30} fill="#d0a1ff"></Label> 
            </XAxis>
            <YAxis dataKey={"count"} axisLine={{stroke: "#d0a1ff"}} tick={{fill: "#64FFDD"}}>
                <Label value={"Number of entries"} position={"center"} offset={-30} angle={90} fill="#d0a1ff"></Label> 
            </YAxis>
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