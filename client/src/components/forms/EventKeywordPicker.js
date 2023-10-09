import { Field } from "formik"
import { useState } from "react"

const EventKeywordPicker = (props) => {

    const [goodEvents, setGoodEvents] = useState([])
    const [possibleEvents, setGoodEventBank] = useState(props.eventBank)

    return (
        <>
            <h2>What went well today? Select from this list</h2>
            {possibleEvents.map((event, index) => {
                return (
                    <label key={index}>
                        {event}<Field type="checkbox" name="goodEventsBank"
                            checked={false}
                            value={event}
                            onMouseEnter={(e) => e.target.checked = true}
                            onMouseLeave={(e) => e.target.checked = false}
                            onChange={(e) => {
                                goodEvents.push(e.target.value)
                                let updatedPossibleGoodEvents = [...possibleEvents]
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
                        {event}<Field type="checkbox" name="goodEventsBank"
                            checked={true}
                            value={event}
                            onMouseEnter={(e) => e.target.checked = false}
                            onMouseLeave={(e) => e.target.checked = true}
                            onChange={(e) => {
                                possibleEvents.push(e.target.value)
                                let updatedGoodEvents = [...goodEvents]
                                updatedGoodEvents = updatedGoodEvents.filter(goodEvent => goodEvent !== e.target.value)
                                setGoodEventBank(possibleEvents)
                                setGoodEvents(updatedGoodEvents)
                                props.setFieldValue("goodEventsList", updatedGoodEvents)
                                props.setFieldValue("goodEventsBank", possibleEvents)
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