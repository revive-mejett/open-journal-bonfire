import { Field, Formik } from "formik"

const CreateEntryPage = () => {

    const handleSubmit = (values) => {
        alert("test form submit")
        console.log(values)
    }


    const handleGoodEventsChange = (e) => console.log(e.target)

    const possibleGoodEvents = ["Had a nice dinner", "Had a nice outing", "did well on a test", "got a partner"]
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
                        <form onSubmit={props.handleSubmit}>
                            <input type="text" name="title" />
                            {/* <Field as="select" name="goodEventsList" onChange={handleGoodEventsChange} multiple>
                                {possibleGoodEvents.map((event, index) => <option value={event} onInput={() => alert("fied")} key={index}>{event}</option>)}
                            </Field> */}
                            {possibleGoodEvents.map((event, index) => {
                                return (
                                    <label key={index}>
                                        {event}<Field type="checkbox" name="goodEventsList" value={event}></Field>
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