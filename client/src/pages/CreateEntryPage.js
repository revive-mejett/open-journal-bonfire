import { Field, Formik } from "formik"
import { useState } from "react"

const CreateEntryPage = () => {

    //initial good events
    const possibleGoodEventsInitial = ["Had a nice dinner", "Had a nice outing", "did well on a test", "got a partner"]

    const [goodEvents, setGoodEvents] = useState([])
    const [possibleGoodEvents, setGoodEventBank] = useState(possibleGoodEventsInitial)

    const handleSubmit = (values) => {
        alert("test form submit")
        console.log(values)
    }

    const handleGoodEventsChange = (e, isRemoving) => {
        if (isRemoving){
            goodEvents.push(e.target.value)
            let updatedPossibleGoodEvents = [...possibleGoodEvents]
            updatedPossibleGoodEvents = updatedPossibleGoodEvents.filter(goodEvent => goodEvent !== e.target.value)
            setGoodEventBank(updatedPossibleGoodEvents)
            setGoodEvents(goodEvents)
        } else {
            possibleGoodEvents.push(e.target.value)
            let updatedGoodEvents = [...goodEvents]
            updatedGoodEvents = updatedGoodEvents.filter(goodEvent => goodEvent !== e.target.value)
            setGoodEventBank(possibleGoodEvents)
            setGoodEvents(updatedGoodEvents)
        }
    }


    const test = (e) => {
        console.log("akshan")
        console.log(e)
    }

    const possibleNeutralEvents = ["nothing too special", "normal day at work", "normal day at school"]
    const possibleWorseEvents = ["failed a test in school", "thundering", "lost a team sports game", "had a breakup"]

    return (
        <>
            <div>
                <h2>Create an Anonymous Journal Entry</h2>
                <Formik
                    initialValues={{ title: "Untitled", entryContent: "", goodEventsList: [] }}
                    onSubmit={handleSubmit}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit} >

                            <input type="text" name="title" />
                            <div>What went well today?</div>
                            {goodEvents.map((event, index) => {
                                return (
                                    <label key={index}>
                                        {event}<Field type="checkbox" name="goodEventsList" value={event} onChange={(e) => handleGoodEventsChange(e, false)}></Field>
                                    </label>
                                )
                            })}

                            <div>Good Events</div>
                            {possibleGoodEvents.map((event, index) => {
                                return (
                                    <label key={index}>
                                        {event}<Field type="checkbox" name="goodEventsBank" value={event} onChange={(e) => handleGoodEventsChange(e, true)}></Field>
                                    </label>
                                )
                            })}
                            <button type="submit">test submit</button>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    )

}


export default CreateEntryPage