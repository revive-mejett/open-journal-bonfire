import { Field } from "formik"
import { useState } from "react"
import "./EventKeywordPicker.scss"

const EventKeywordPicker = (props) => {

    const [selectedEvents, setSelectedEvents] = useState([])
    const [eventBank, setEventBank] = useState(props.eventBank)

    let eventType = props.eventType

    return (
        <div className="event-tag-picker-subform">
            <h3>{props.helperText}</h3>

            <div className="event-tag-container unselected-event-tags">
                {eventBank.map((event, index) => {
                    return (
                        <label key={index} className={"event-tag " + eventType}>
                            {event}<Field type="checkbox" name={props.formikEventBankName}
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
                                    props.setFieldValue(props.formikSelectedListName, selectedEvents)
                                    props.setFieldValue(props.formikEventBankName, updatedEventBank)
                                }
                                }>
                            </Field>
                        </label>
                    )
                })}
            </div>

            <h4>{props.helperListHeading}</h4>
            <div className="event-tag-container selected-event-tags">
                {selectedEvents.map((event, index) => {
                    return (
                        <label key={index} className={"event-tag " + eventType}>
                            {event}<Field type="checkbox" name={props.formikSelectedListName}
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
                                    props.setFieldValue(props.formikSelectedListName, updatedSelectedEvents)
                                    props.setFieldValue(props.formikEventBankName, eventBank)
                                }
                                }>
                            </Field>
                        </label>
                    )
                })}
            </div>
        </div>
    )
}


export default EventKeywordPicker