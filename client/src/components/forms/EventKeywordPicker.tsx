import { Field } from "formik"
import { useState } from "react"
import "./EventKeywordPicker.scss"
import { EventTag } from "../../common/types"

interface FormValues {

}

interface Props {
    helperText: string,
    helperListHeading : string,
    isDisabled: boolean,
    eventType: string,
    eventBank: EventTag[],
    tagFilter: string,
    formikEventBankName: string,
    formikSelectedListName: string
    setFieldValue: (field : String, value : any)
}

const EventKeywordPicker = (props : Props) => {

    const [selectedEvents, setSelectedEvents] = useState([])
    const [eventBank, setEventBank] = useState(props.eventBank)

    let eventType = props.eventType
    let filteredEventBank = eventBank.filter(event => event.keyword.includes(props.tagFilter))
    console.log(selectedEvents)
    return (
        <div className="event-tag-picker-subform">
            <h3>{props.helperText}</h3>

            <div className="event-tag-container unselected-event-tags">
                {filteredEventBank.map((event, index) => {
                    return (
                        <label key={index} className={"event-tag " + eventType}>
                            {event.keyword}<Field type="checkbox" name={props.formikEventBankName}
                                checked={false}
                                disabled={props.isDisabled}
                                value={event.keyword}
                                onMouseEnter={(e : React.MouseEvent<HTMLInputElement>) => e.currentTarget.checked = true}
                                onMouseLeave={(e : React.MouseEvent<HTMLInputElement>) => e.currentTarget.checked = false}
                                onChange={(e) => {
                                    selectedEvents.push(event)
                                    let updatedEventBank = [...eventBank]
                                    updatedEventBank = updatedEventBank.filter(goodEvent => goodEvent.keyword !== e.target.value)
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
                            {event.keyword}<Field type="checkbox" name={props.formikSelectedListName}
                                checked={true}
                                value={event.keyword}
                                onMouseEnter={(e) => e.target.checked = false}
                                onMouseLeave={(e) => e.target.checked = true}
                                onChange={(e) => {
                                    eventBank.push(event)
                                    let updatedSelectedEvents = [...selectedEvents]
                                    updatedSelectedEvents = updatedSelectedEvents.filter(goodEvent => goodEvent.keyword !== e.target.value)
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