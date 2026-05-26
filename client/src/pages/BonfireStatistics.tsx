import SelfRatingDistribution from '../components/charts/SelfRatingDistribution';
import KeywordCloud from '../components/charts/KeywordCloud';
import GeneralStatistics from '../components/GeneralStatistics';
import "./BonfireStatistics.scss"

/** 
 * Page that contains visualized data of journal entries. Shows graphs and other metrics using the data of anonymously submitted entries
 * 
 */
const BonfireStatistics : React.FC = () => {
    return (
        <main className="bonfire-stats-page-main">
            <h1>The bonfire — charts and stats from burned entries (up to 200 archived when the live list is full).</h1>
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