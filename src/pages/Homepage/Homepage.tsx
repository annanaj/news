import CompanyItem from '../../components/CompanyItem/CompanyItem';
import NewsItem from '../../components/NewsItem/NewsItem';
import useFetchCompanyData from '../../hooks/useFetchCompanyData';
import useFetchNewsData from '../../hooks/useFetchNewsData';
import routes from '../../routes';
import { CompanyData } from '../../types/companyData';
import { NewsData } from '../../types/newsData';
import topicColors from '../../common/topicColors';

export default function NewsList() {
	const { data: newsData } = useFetchNewsData();
	const { data: companyData } = useFetchCompanyData();

	return (
		<div className="container mx-auto mb-20 mt-24 max-w-screen-lg px-10">
			<div className="mx-auto max-w-screen-md">
				<h1 className="mb-10 text-balance text-center font-semibold leading-tight">
					Financial updates for market trending
				</h1>
				<p className="mb-4 text-pretty">
					Looking for market news data to augment your trading
					strategy or want to get pretty overview about companies you
					aim to invest into?
				</p>
				<p className="mb-10 text-pretty">
					Alphavantage API returns live and historical market news &
					sentiment data from a large & growing selection of premier
					news outlets around the world, covering stocks,
					cryptocurrencies, forex. This API, combined with our core
					stock API, fundamental data, and technical indicator APIs,
					can provide you with a 360-degree view of the financial
					market and the broader economy.
				</p>
			</div>
			<h2 className="mb-4 text-2xl font-medium">Latest updates</h2>
			{newsData && newsData.length > 0 ? (
				<div className="mb-10 grid min-w-60 grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
					{newsData.slice(0, 3).map((newsItem: NewsData) => (
						<NewsItem
							key={`${newsItem.url}-${newsItem.time_published}`}
							newsItem={newsItem}
							showTopics={false}
							topicColors={topicColors}
							navigateTo={routes.newsList}
							grayscale
						/>
					))}
				</div>
			) : (
				<p>No news available, daily limit has been exceeded</p>
			)}

			<h2 className="mb-4 mt-12 text-2xl font-medium">
				Overviews of companies
			</h2>
			{companyData && companyData.length > 0 ? (
				<div className="mb-10 grid min-w-60 grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4">
					{companyData.slice(0, 4).map((companyItem: CompanyData) => (
						<CompanyItem
							key={companyItem.cik}
							companyItem={companyItem}
							navigateTo={routes.newsList}
							grayscale
						/>
					))}
				</div>
			) : (
				<p className="mb-10">
					No overviews available, daily limit has been exceeded
				</p>
			)}
		</div>
	);
}
