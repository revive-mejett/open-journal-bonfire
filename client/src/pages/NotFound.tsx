
interface Props {
    primaryMessage: string,
    secondaryMessage: string
}

/**
 * Not Found webpage component.Can be used for different http error codes
 * @param props 
 * @returns 
 */
const NotFound : React.FC<Props> = (props : Props) => {
    return (
        <main className="error-404-page-main">
            <p className="number-404">404</p>
            <h1 className="error-message">{props.primaryMessage}</h1>
            <p className="error-secondary-message">{props.secondaryMessage}</p>
        </main>
    )
}

export default NotFound