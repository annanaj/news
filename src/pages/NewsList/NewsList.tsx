import { useState, useEffect } from 'react';

interface NewsListProps {
	title: string;
	summary: string;
	time_published: string;
}

export default function NewsList() {
	const [newsData, setNewsData] = useState<NewsListProps[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const apiKey = '02QE69ZHYAYLNSQB';

	useEffect(() => {
		const fetchNewsData = async () => {
			try {
				if (!apiKey) {
					throw new Error('API key not available');
				}

				const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=IBM&limit=3&apikey=${apiKey}`);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();

				setNewsData(data.feed);

				setLoading(false);

			} catch (error) {
				console.error('Error fetching news data:', error);
				setLoading(false);
			}
		};
		fetchNewsData();
	}, [apiKey]);

	return (
		<div className="container mx-auto px-4">

			{loading && <div>
				<div className="container mt-24 mx-auto px-4">
					<h1 className="text-2xl font-bold mb-4">News & Sentiment Trending</h1>
					<p>Loading news...</p>
				</div>
			</div>}

			{newsData ? (
				// <div>
				// 	<pre>{JSON.stringify(newsData, null, 2)}</pre>
				// </div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-24 ">
					{newsData.map((news: NewsListProps, index: number) => (
						<div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-4">
							<h2 className="text-xl font-bold mb-2 text-gray-900">{news.title}</h2>
							<p className="text-gray-700">{news.summary}</p>
							<p className="text-gray-500 text-sm mt-2">Published
								on: {new Date(news.time_published).toLocaleDateString()}</p>
						</div>
					))}
				</div>
				) : (
				<p>No news available as number of requests exceeded the daily limit</p>
			)}
		</div>
	);
};
