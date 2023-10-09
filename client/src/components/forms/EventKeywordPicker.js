import { Field } from "formik"
import { useState } from "react"

const EventKeywordPicker = (props) => {

    const [selectedEvents, setSelectedEvents] = useState([])
    const [eventBank, setEventBank] = useState(props.eventBank)

    return (
        <>
            <h2>{props.helperText}</h2>
            {eventBank.map((event, index) => {
                return (
                    <label key={index}>
                        {event}<Field type="checkbox" name="goodEventsBank"
                            checked={false}
                            value={event}
                            onMouseEnter={(e) => e.target.checked = true}
                            onMouseLeave={(e) => e.target.checked = false}
                            onChange={(e) => {
                                selectedEvents.push(e.target.value)
                                let updatedEventBank = [...eventBank]
                                updatedEventBank = updatedEventBank.filter(goodEvent => goodEvent !== e.target.value)
                                setEventBank(updatedEventBank)
                                setSelectedEvents(selectedEvents)
                                props.setFieldValue("goodEventsList", selectedEvents)
                                props.setFieldValue("goodEventsBank", updatedEventBank)
                            }
                            }>
                        </Field>
                    </label>
                )
            })}
            <h2>{props.helperListHeading}</h2>

            {selectedEvents.map((event, index) => {
                return (
                    <label key={index}>
                        {event}<Field type="checkbox" name="goodEventsBank"
                            checked={true}
                            value={event}
                            onMouseEnter={(e) => e.target.checked = false}
                            onMouseLeave={(e) => e.target.checked = true}
                            onChange={(e) => {
                                eventBank.push(e.target.value)
                                let updatedSelectedEvents = [...selectedEvents]
                                updatedSelectedEvents = updatedSelectedEvents.filter(goodEvent => goodEvent !== e.target.value)
                                setEventBank(eventBank)
                                setSelectedEvents(updatedSelectedEvents)
                                props.setFieldValue("goodEventsList", updatedSelectedEvents)
                                props.setFieldValue("goodEventsBank", eventBank)
                            }
                            }>
                        </Field>
                    </label>
                )
            })}
        </>
    )
}


export default EventKeywordPicker