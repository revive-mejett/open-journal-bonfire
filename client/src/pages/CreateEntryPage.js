import { Field, Formik } from "formik"
import EventKeywordPicker from "../components/forms/EventKeywordPicker"
import "../assets/forminputstyle.scss"
import "./CreateEntryPage.scss"

const CreateEntryPage = () => {

    //Note: temporary list - it will later be stored in a mongodb collection (maybe)
    //initial good events 
    const possibleGoodEventsInitial = ["Had a nice dinner", "Had a nice outing", "did well on a test", "got a partner", "bought a car", "bought a house", "got married", 
        "got a job", "got an interview", "got an offer", "aced my exam", "got my licence", "bought a new pc", "went on a trip", "today's my birthday", "my friend's birthday", "my girlfriend's birthday",
        "my boyfriend's birthday", "bought a new game", "got promoted in league of legends", "passed math", "passed history", "passed science", "got a new baby", "good haircut", "went on nice restaurant",
        "got robux", "got vbucks", "gained new subs on youtube", "great day streaming", "got promoted", "got a raise", "got new benefits", "got a boyfriend", "got a girlfriend", "had a crush",
        "moving on to next semester", "found an new game on steam", "passed french", "went to the beach", "new laptop", "new keyboard", "new gaming chair", "new mouse", "new table", "new jewelry",
        "business making profit"
        ]

    //initial okay/neutral events
    const possibleNeutralEvents = ["nothing too special", "normal day at work", "normal day at school", "ate a decent meal", "took a test", "got some homework", "slept ok", "busy day at school",
            "busy day at work", "had an interview", "made errands", "took a walk", "exercised", "did chores", "cleaned the house", "did laundry", "did some homework", "cloudy day", "overcast",
            "went shopping", "went somewhere", "bought something necessary"
        ]

    //initial not so good events
    const possibleWorseEvents = ["failed a test in school", "thundering", "lost a team sports game", "had a breakup", "got demoted", "got fired", "got written up", "placed on a PIP", "got fired", "got laid off",
        "failed a final", "failed a course", "failed my driving test", "broke something", "had a fight with my parents", "had a fight with my partner", "got sick", "got a cold", "got covid", "injury",
        "failed math", "failed history", "failed french", "got held back", "car broke down", "car got vandalized", "flat tire", "car got git", "had a meal I didint like", "hurt myself by accident", "boyfriend dumped me",
        "girlfriend dumped me"
    ]

    const selfRatingValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const handleSubmit = async (values) => {
        let data = {
            title: values.title,
            entryContent: values.entryContent,
            greatEvents: values.goodEventsList,
            neutralEvents: values.neutralEventsList,
            badEvents: values.worseEventsList,
            selfRating: values.selfRating,
        }

        let response
        response = await fetch("/api/journalentries/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            console.error("A server error occured. Please try again later.")
            return
        }

        const responseData = await response.json()
        //console.log(new Date())
        if (responseData.status === "success") {
            console.log(responseData.payload)
        } else {
            console.error(responseData.error)
        }

    }

    return (
        <main className="create-entry-page-main">
            <section>
                <h2>Create an Anonymous Journal Entry</h2>
                <Formik
                    initialValues={{ title: "Untitled", entryContent: "", goodEventsList: [], neutralEventsList: [], worseEventsList: [], goodEventsBank: possibleGoodEventsInitial, selfRating: 0 }}
                    onSubmit={handleSubmit}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit}>

                            <div className="form-section">
                                <label htmlFor="title" placeholder="Another day to say...">Title of your entry:</label>
                                <Field name="title" className="input-text-field entry-title-field"></Field>
                            </div>

                            <div className="form-section">
                                <label htmlFor="entryContent">Your entry...</label>
                                <Field name="entryContent" as="textarea" placeholder="// Write away..." className="input-text-field entry-content-textarea"></Field>
                            </div>

                            <fieldset className="event-tags-subforms-container form-section">
                                <div className="subform-flex-item">
                                    <EventKeywordPicker
                                        eventType="positive"
                                        eventBank={possibleGoodEventsInitial}
                                        formikEventBankName="goodEventsBank"
                                        formikSelectedListName="goodEventsList"
                                        setFieldValue={props.setFieldValue}
                                        helperText="What went well today? 👍"
                                        helperListHeading="Good events">
                                    </EventKeywordPicker>
                                </div>

                                <div className="subform-flex-item">
                                    <EventKeywordPicker
                                        eventType="neutral"
                                        eventBank={possibleNeutralEvents}
                                        formikEventBankName="neutralEventsBank"
                                        formikSelectedListName="neutralEventsList"
                                        setFieldValue={props.setFieldValue}
                                        helperText="What went okay? Things that were just neutral... ? 🌳"
                                        helperListHeading="Okay events">
                                    </EventKeywordPicker>
                                </div>
                                <div className="subform-flex-item">
                                    <EventKeywordPicker
                                        eventType="negative"
                                        eventBank={possibleWorseEvents}
                                        formikEventBankName="worseEventsBank"
                                        formikSelectedListName="worseEventsList"
                                        setFieldValue={props.setFieldValue}
                                        helperText="What did not go so well today? 👎"
                                        helperListHeading="Not so great list...">
                                    </EventKeywordPicker>
                                </div>

                            </fieldset>

                            <div className="form-section self-rating-form">
                                <label htmlFor="selfRating">Out of 10, rate your day:</label>
                                <Field as="select" name="selfRating" className="input-dropdown">
                                    <option value={0} hidden>--select--</option>
                                    {selfRatingValues.map(ratingValue => <option value={ratingValue} key={ratingValue}>{ratingValue}</option>)}
                                </Field>
                            </div>
                            

                            <button type="submit" className="button create-entry-submit-button">Submit to the bonfire!</button>
                        </form>
                    )}
                </Formik>
            </section>
        </main>
    )

}


export default CreateEntryPage