import { Field } from "formik"
import { useState } from "react"

const EventKeywordPicker = (props) => {

    const [selectedEvents, setSelectedEvents] = useState([])
    const [eventBank, setEventBank] = useState(props.eventBank)

    return (
        <>
            <h2>What went well today? Select from this list</h2>
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
            <div>Good Events</div>

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
                                let updatedGoodEvents = [...selectedEvents]
                                updatedGoodEvents = updatedGoodEvents.filter(goodEvent => goodEvent !== e.target.value)
                                setEventBank(eventBank)
                                setSelectedEvents(updatedGoodEvents)
                                props.setFieldValue("goodEventsList", updatedGoodEvents)
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