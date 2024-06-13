import NewsItem from '../../components/NewsItem/NewsItem';
import useFetchNewsData from '../../hooks/useFetchNewsData';
import routes from '../../routes';
import { NewsData } from '../../types/newsData';

export default function NewsList() {
	const { data } = useFetchNewsData();

	return (
		<div className="container mx-auto mt-24 max-w-screen-lg px-10">
			<div className="mx-auto max-w-screen-md">
				<h1 className="mb-10 text-balance text-center text-5xl font-bold">
					Financial updates for market trending
				</h1>
				<p className="mb-4 text-pretty">
					Looking for market news data to train your LLM models or to
					augment your trading strategy and results? You have just
					found it.
				</p>
				<p className="mb-10 text-pretty">
					This API returns live and historical market news & sentiment
					data from a large & growing selection of premier news
					outlets around the world, covering stocks, cryptocurrencies,
					forex. This API, combined with our core stock API,
					fundamental data, and technical indicator APIs, can provide
					you with a 360-degree view of the financial market and the
					broader economy.
				</p>
			</div>
			<h2 className="mb-4 text-2xl font-medium">Latest updates</h2>
			{data && data.length > 0 ? (
				<div className="mb-10 grid min-w-96 grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
					{data.slice(0, 3).map((newsItem: NewsData) => (
						<NewsItem
							key={newsItem.url}
							newsItem={newsItem}
							navigateTo={routes.newsList}
							grayscale
						/>
					))}
				</div>
			) : (
				<p>No news available, daily limit has been exceeded</p>
			)}
		</div>
	);
}
