import { useState, useEffect } from 'react';

import placeholder from '../../assets/placeholder.svg';

interface NewsListProps {
	title: string,
	summary: string,
	time_published: string,
	authors: string,
	banner_image: string | null,
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

	// due to the api calls limitation, take data from localStorage if fetch is not successfull
	const handleFetchSuccess = (data: NewsListProps[]) => {
		setNewsData(data);
		setLoading(false);
	};

	const handleFetchError = (error: Error | unknown) => {
		console.error('Error fetching data from server:', error);
		// If fetch fails, use cached data as backup
		const cachedData = localStorage.getItem('cachedNewsData');
		if (cachedData) {
			try {
				const parsedData = JSON.parse(cachedData);
				setNewsData(parsedData);
				setLoading(false);
			} catch (parseError) {
				console.error('Error parsing cached data:', parseError);
			}
		} else {
			console.error('No cached data available.');
		}
	};

	useEffect(() => {
		const fetchNewsData = async () => {
			console.log('Fetch data: trying to fetch');
			try {
				if (!apiKey) {
					throw new Error('API key not available');
				}

				const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=IBM&limit=10000&apikey=${apiKey}`);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();

				// update localStorage only if data is not empty, to avoid undefined, empty object
				if (data.length > 0) {
					localStorage.setItem('cachedNewsData', JSON.stringify(data));
				}

				handleFetchSuccess(data.feed);
			} catch (error) {
				handleFetchError(error);
			}
		};
		fetchNewsData();
		console.log('Fetch data: data fetched from server via api call');
	}, [apiKey]);

	return (
		<div className="container mt-24 mx-auto px-4">
			<h1 className="text-2xl font-bold mb-7">News & Sentiment Trending for IBM</h1>

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
						<div key={news.title} className="flex flex-col h-full p-6 mb-4 bg-gray-50 rounded-2xl shadow-lg">
							{news.banner_image ? (
								<img src={news.banner_image} alt={news.title} className="mb-4 rounded-xl shadow-lg" />
							) : (
								<img src={placeholder} alt="article" className="mb-4 rounded-xl shadow-lg" />
							)}
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
