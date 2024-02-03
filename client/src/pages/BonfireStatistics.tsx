import SelfRatingDistribution from '../components/charts/SelfRatingDistribution';
import KeywordCloud from '../components/charts/KeywordCloud';
import GeneralStatistics from '../components/GeneralStatistics';
import "./BonfireStatistics.scss"

const BonfireStatistics : React.FC = () => {
    return (
        <main className="bonfire-stats-page-main">
            <h1>The bonfire - where the entries burn up! This is data from all the entries that would be burnt.</h1>
            <section className="self-rating-count-stats">
                <h2>Distribution of Self-rating</h2>
                <div className="chart-container">
                    <SelfRatingDistribution/>
                </div>
            </section>

            <section className="keyword-volume-stats">

                <div className="chart-container">
                    <h2>Frequently used event tags</h2>
                    <KeywordCloud/>
                </div>
            </section>
            <section className="general-stats">
                <GeneralStatistics/>
            </section>

        </main>
    )
}

export default BonfireStatistics