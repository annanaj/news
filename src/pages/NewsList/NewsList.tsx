import { useState, useEffect } from 'react';

interface NewsListProps {
	title: string,
	summary: string,
	time_published: string,
	authors: string,
}

export default function NewsList() {
	const [newsData, setNewsData] = useState<NewsListProps[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const apiKey = 'SAJMX7DTFM92B45T';

	const formatPublishedDate = (dateString: string): string => {
		const year = dateString.substring(0, 4);
		const month = dateString.substring(4, 6);
		const day = dateString.substring(6, 8);
		return `${year}-${month}-${day}`;
	};

	useEffect(() => {
		const fetchNewsData = async () => {
			try {
				if (!apiKey) {
					throw new Error('API key not available');
				}

				const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&limit=1&apikey=${apiKey}`);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();

				localStorage.setItem('cachedNewsData', JSON.stringify(data.feed));
				setNewsData(data.feed);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching news data:', error);
				setLoading(false);
			}
		};
		// Due to 25 api request limitation per day, use cache in local storage
		const cachedData = localStorage.getItem('cachedNewsData');
		if (cachedData !== 'undefined' || null) {
			try {
				setNewsData(JSON.parse(cachedData || '{}'));
				setLoading(false);
			} catch (error) {
				console.error('Error parsing cached data:', error);
				// Optionally, handle the error by fetching data from the server
				fetchNewsData();
			}
		} else {
			fetchNewsData();
		}
	}, [apiKey]);

	return (
		<div className="container mt-24 mx-auto px-4">
			<h1 className="text-2xl font-bold mb-7">News & Sentiment Trending</h1>

			{/* <pre>{JSON.stringify(newsData, null, 2)}</pre> */}

			{loading && (
				<div>
					<div className="container mx-auto px-4">
						<p>Loading news...</p>
					</div>
				</div>
			)}

			{newsData ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
					{newsData.map((news: NewsListProps) => (
						<div key={news.title} className="flex flex-col h-full p-6 mb-4 bg-gray-50 rounded-lg shadow-lg">
							<h2 className="text-xl font-bold mb-2 text-gray-900">{news.title}</h2>
							<p className="text-gray-700">{news.summary}</p>
							<div className="flex justify-between gap-4 mt-auto text-gray-400 text-sm">
								<p className="self-end whitespace-nowrap">
									{formatPublishedDate(news.time_published)}
								</p>
								<p>
									{news.authors}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>No news available as number of requests exceeded the daily limit</p>
			)}
		</div>
	);
}
