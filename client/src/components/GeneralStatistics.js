import { useEffect, useState } from "react"

const GeneralStatistics = () => {

    const [data, setData] = useState(undefined)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch("/api/stats/general")
                if (!response.ok) {
                    console.log("response not ok")
                } else {
                    let data = await response.json()
                    console.log(data)
                    setData(data)

                    
                }
            } catch (error) {
                console.error("Error fetching match data --> ", error)
            }
        }
        if (data === undefined) {
            fetchData()
        }
    })

    return (
            <div>
                <h1>
                    general statistics here
                </h1>
            </div>
    )
}

export default GeneralStatistics