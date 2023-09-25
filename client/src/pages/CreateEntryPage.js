import { Formik } from "formik"

const CreateEntryPage = () => {

    const handleSubmit = () => {
        alert("test form submit")
    }
    return (
        <>
            <div>
                <h2>Create an Anonymous Journal Entry</h2>
                <Formik
                    initialValues={{ title: "Untitled" }}
                    onSubmit={handleSubmit}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            <button type="submit">test submit</button>
                        </form>
                    )}

                </Formik>
            </div>
        </>
    )

}


export default CreateEntryPage