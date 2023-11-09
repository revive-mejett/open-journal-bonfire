import { Field, Formik } from "formik"
import EventKeywordPicker from "../components/forms/EventKeywordPicker"
import "../common/forms.scss"
import "./CreateEntryPage.scss"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Background from "../components/visuals/Background"
import * as Yup from "yup"

const CreateEntryPage = () => {

    const [frequentKeywordData, setFrequentKeywordData] = useState(undefined)

    const journalEntrySchema = Yup.object().shape({
        title: Yup.string()
            .max(50, "Title is too long"),
        entryContent: Yup.string()
            .min(20, "Too short!")
            .max(7000, "Entry is too long")
            .required("Journal entries cannot be empty!"),
        goodEventsList: Yup.array().of(Yup.object()).min(0),
        neutralEventsList: Yup.array().of(Yup.object()).min(0),
        worseEventsList: Yup.array().of(Yup.object()).min(0)
        .test({
            name: "maxTags",
            test: function(value) {
                return (this.parent.goodEventsList.length + this.parent.neutralEventsList.length + this.parent.worseEventsList.length) <= 10
            },
            message: "Maximum limit of 10 tags reached"
        })
    })
    useEffect(() => {

        (async () => {
            if (!frequentKeywordData) {
                let response = await fetch("/api/frequent-event-tags")
                if (!response.ok) {
                    console.error("response not ok")
                } else {
                    let data = await response.json()
                    setFrequentKeywordData(data)
                }
            }
        })();
    })

    const selfRatingValues = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const navigate = useNavigate()

    const deleteUnusedEventProperties = (event) => {
        return {
            keyword: event.keyword,
            weight: event.weight,
            lastUsed: event.lastUsed
        }
    }


    const handleSubmit = async (values) => {
        let data = {
            title: values.title,
            entryContent: values.entryContent,
            greatEvents: values.goodEventsList,
            neutralEvents: values.neutralEventsList,
            badEvents: values.worseEventsList,
            selfRating: values.selfRating,
        }


        data.greatEvents = data.greatEvents.map(event => deleteUnusedEventProperties(event))
        data.neutralEvents = data.neutralEvents.map(event => deleteUnusedEventProperties(event))
        data.badEvents = data.badEvents.map(event => deleteUnusedEventProperties(event))


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
        if (responseData.status === "success") {
            navigate({ pathname: "/entries/viewing", search: "?id=" + responseData.payload.newEntry._id })
        } else {
            console.error(responseData.error)
        }



    }

    return (
        <main className="create-entry-page-main">
            <Background/>
            <section>
                <h2>Create an Anonymous Journal Entry</h2>
                <Formik
                    initialValues={{ title: "Untitled", entryContent: "", goodEventsList: [], neutralEventsList: [], worseEventsList: [], selfRating: 0, eventTagTextFilter : "" }}
                    validationSchema={journalEntrySchema}
                    onSubmit={handleSubmit}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            
                            <div className="form-section">
                                
                                <label htmlFor="title" placeholder="Another day to say...">Title of your entry:</label>
                                <Field name="title" className="input-text-field entry-title-field"></Field>
                                {props.errors.title ? <span className="error">   {props.errors.title}</span> : null}
                            </div>

                            <div className="form-section">
                                <label htmlFor="entryContent">Your entry...</label>
                                <Field name="entryContent" as="textarea" placeholder="// Write away..." className="input-text-field entry-content-textarea"></Field>
                                {props.errors.entryContent ? <p className="error">   {props.errors.entryContent}</p> : null}
                            </div>

                            <div className="form-section">
                                <label htmlFor="eventTagTextFilter">Filter tags:</label>
                                <Field name="eventTagTextFilter" className="input-text-field filter-tags-field"></Field>
                            </div>
                            
                            {props.errors.worseEventsList ? <span className="error">{props.errors.worseEventsList}</span> : null}
                            <fieldset className="event-tags-subforms-container form-section">
                                
                                <div className="subform-flex-item">
                                    {frequentKeywordData &&
                                        <EventKeywordPicker
                                            eventType="positive"
                                            eventBank={frequentKeywordData.positiveTags}
                                            formikEventBankName="goodEventsBank"
                                            formikSelectedListName="goodEventsList"
                                            setFieldValue={props.setFieldValue}
                                            helperText="What went well today? 👍"
                                            helperListHeading="Good events"
                                            tagFilter={props.values.eventTagTextFilter}>
                                        </EventKeywordPicker>
                                    }
                                </div>

                                <div className="subform-flex-item">
                                    {frequentKeywordData &&
                                        <EventKeywordPicker
                                            eventType="neutral"
                                            eventBank={frequentKeywordData.neutralTags}
                                            formikEventBankName="neutralEventsBank"
                                            formikSelectedListName="neutralEventsList"
                                            setFieldValue={props.setFieldValue}
                                            helperText="What went okay? Things that were just neutral... ? 🌳"
                                            helperListHeading="Okay events"
                                            tagFilter={props.values.eventTagTextFilter}>
                                        </EventKeywordPicker>
                                    }
                                </div>
                                <div className="subform-flex-item">
                                    {frequentKeywordData &&
                                        <EventKeywordPicker
                                            eventType="negative"
                                            eventBank={frequentKeywordData.negativeTags}
                                            formikEventBankName="worseEventsBank"
                                            formikSelectedListName="worseEventsList"
                                            setFieldValue={props.setFieldValue}
                                            helperText="What did not go so well today? 👎"
                                            helperListHeading="Not so great list..."
                                            tagFilter={props.values.eventTagTextFilter}>
                                        </EventKeywordPicker>
                                    }
                                </div>

                            </fieldset>

                            <div className="form-section self-rating-form">
                                <label htmlFor="selfRating">Rate your day from -10 (absolute worst) to 10 (absolute best)</label>
                                <p>Note: 0 is neutral</p>
                                <Field as="select" name="selfRating">
                                    <option value={0} hidden>0</option>
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