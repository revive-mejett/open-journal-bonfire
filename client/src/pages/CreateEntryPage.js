import { Field, Formik } from "formik"
import EventKeywordPicker from "../components/forms/EventKeywordPicker"

const CreateEntryPage = () => {

    //Note: temporary list - it will later be stored in a mongodb collection (maybe)
    //initial good events 
    const possibleGoodEventsInitial = ["Had a nice dinner", "Had a nice outing", "did well on a test", "got a partner"]

    //initial okay/neutral events
    const possibleNeutralEvents = ["nothing too special", "normal day at work", "normal day at school"]

    //initial not so good events
    const possibleWorseEvents = ["failed a test in school", "thundering", "lost a team sports game", "had a breakup"]

    const handleSubmit = (values) => {
        alert("test form submit")
        console.log(values)
    }

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
                            <label htmlFor="title" placeholder="Another day to say...">Title of your entry:</label>
                            <Field name="title"></Field>
                            
                            <label htmlFor="entryContent">Your entry...</label>
                            <Field name="entryContent" as="textarea" placeholder="// Write away..."></Field>

                            <EventKeywordPicker
                                eventBank={possibleGoodEventsInitial}
                                formikEventBankName="goodEventsBank"
                                formikSelectedListName="goodEventsList"
                                setFieldValue={props.setFieldValue}
                                helperText="What went well today?"
                                helperListHeading="Good events">
                            </EventKeywordPicker>
                            <button type="submit">test submit</button>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    )

}


export default CreateEntryPage