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


    const possibleNeutralEvents = ["nothing too special", "normal day at work", "normal day at school"]
    const possibleWorseEvents = ["failed a test in school", "thundering", "lost a team sports game", "had a breakup"]

    return (
        <>
            <div>
                <h2>Create an Anonymous Journal Entry</h2>
                <Formik
                    initialValues={{ title: "Untitled", entryContent: "", goodEventsList: [], goodEventsBank: possibleGoodEventsInitial }}
                    onSubmit={handleSubmit}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            <label htmlFor="title" placeholder="Another day to day...">Title of your entry:</label>
                            <Field name="title"></Field>
                            <label htmlFor="entryContent">Your entry...</label>
                            <Field name="entryContent" as="textarea" placeholder="// Write away..."></Field>
                            <h2>What went well today? Select from this list</h2>
                            {possibleGoodEvents.map((event, index) => {
                                return (
                                    <label key={index}>
                                        {event}<Field type="checkbox" name="goodEventsBank"
                                            checked={false}
                                            value={event} 
                                            onMouseEnter={(e) => e.target.checked = true}
                                            onMouseLeave={(e) => e.target.checked = false}
                                            onChange={(e) => {
                                            goodEvents.push(e.target.value)
                                            let updatedPossibleGoodEvents = [...possibleGoodEvents]
                                            updatedPossibleGoodEvents = updatedPossibleGoodEvents.filter(goodEvent => goodEvent !== e.target.value)
                                            setGoodEventBank(updatedPossibleGoodEvents)
                                            setGoodEvents(goodEvents)
                                            props.setFieldValue("goodEventsList", goodEvents)
                                            props.setFieldValue("goodEventsBank", updatedPossibleGoodEvents)
                                        }
                                        }>
                                        </Field>
                                    </label>
                                )
                            })}
                            <div>Good Events</div>

                            {goodEvents.map((event, index) => {
                                return (
                                    <label key={index}>
                                        {event}<Field type="checkbox" name="goodEventsList"
                                        checked={true}
                                        value={event} 
                                        onMouseEnter={(e) => e.target.checked = false}
                                        onMouseLeave={(e) => e.target.checked = true}
                                        onChange={(e) => {
                                            possibleGoodEvents.push(e.target.value)
                                            let updatedGoodEvents = [...goodEvents]
                                            updatedGoodEvents = updatedGoodEvents.filter(goodEvent => goodEvent !== e.target.value)
                                            setGoodEventBank(possibleGoodEvents)
                                            setGoodEvents(updatedGoodEvents)
                                            props.setFieldValue("goodEventsList", updatedGoodEvents)
                                            props.setFieldValue("goodEventsBank", possibleGoodEvents)
                                        }}></Field>
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