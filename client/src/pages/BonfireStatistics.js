import { ResponsiveContainer, Treemap } from 'recharts';
import { keywordTestData } from '../assets/dummyStats';
import SelfRatingDistribution from '../components/charts/SelfRatingDistribution';
import KeywordCloud from '../components/charts/KeywordCloud';


// test data to use in charts


const BonfireStatistics = () => {


    return (
        <main className="bonfire-stats-page-main">
            <h1>Bonfire statistics page</h1>
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

        </main>
    )
}

export default BonfireStatistics