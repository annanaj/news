import { useState, useEffect } from 'react';

import placeholder from '../../assets/placeholder.svg';

interface NewsListProps {
	title: string,
	summary: string,
	time_published: string,
	authors: string,
	banner_image: string | null,
}
import formatPublishedDate from '../../utils/dateFormatter';
import { NewsData } from '../../types/newsData';

const apiKey = process.env.NEWS_API_KEY;
const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&limit=1000000&apikey=${apiKey}`;
const cachedData = localStorage.getItem('cachedNewsData');

export default function NewsList() {
	const [newsData, setNewsData] = useState<NewsData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const handleFetchSuccess = (data: NewsData[]) => {
		setNewsData(data);
		setLoading(false);
	};

	const handleFetchError = (error: Error | unknown) => {
		console.error('Error fetching data from server:', error);
		// if fetch fails - due to the api calls limit, use data from localStorage
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
			console.log('Fetch data: fetch started');
			try {
				if (!apiKey) {
					throw new Error('API key not available');
				}

				const response = await fetch(apiUrl);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await response.json();

				// due to api daily limit, store data into localStorage only when data from server is not empty to avoid undefined object
				if (data && data.feed && data.feed.length > 0) {
					localStorage.setItem('cachedNewsData', JSON.stringify(data.feed));
					console.log('Fetch data: data also stored in localStorage');
					handleFetchSuccess(data.feed);
				} else {
					handleFetchError(new Error('No data fetched from API'));
				}
				handleFetchSuccess(data.feed);
			} catch (error) {
				handleFetchError(error);
			}
		};

		fetchNewsData();
		console.log('Fetch data: data fetched');
	}, []);

	let data;

	if (newsData && newsData.length > 0) {
		data = newsData;
	} else if (cachedData) {
		data = JSON.parse(cachedData);
	} else {
		data = [];
	}

	return (
		<div className="container mt-24 mx-auto px-7">
			<h1 className="text-2xl font-bold mb-7">News & Sentiment Trending for Apple</h1>

			{/* <pre>{JSON.stringify(newsData, null, 2)}</pre> */}
			{/*<pre>{JSON.stringify(cachedData, null, 2)}</pre>*/}

			{loading && (
				<div>
					<div className="container mx-auto">
						<p>Loading news...</p>
					</div>
				</div>
			)}

			{data && data.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 min-w-96">
					{data.map((data: NewsData) => (
						<div
							key={`${data.url}-${data.time_published}`}
							className="flex flex-col h-full p-6 mb-4 bg-gray-50 rounded-lg shadow-lg"
						>
							<h2 className="text-xl font-bold mb-2 text-gray-900">{data.title}</h2>
							<p className="text-gray-700">{data.summary}</p>
					{newsData.map((news: NewsData) => (
						<div key={`${news.url}-${news.time_published}`}
							 className="flex flex-col h-full p-6 mb-4 bg-gray-50 rounded-lg shadow-lg">
							{news.banner_image ? (
								<img src={news.banner_image} alt={news.title} className="mb-4 rounded-xl shadow-lg" />
							) : (
								<img src={placeholder} alt="article" className="mb-4 rounded-xl shadow-lg" />
							)}
							<h2 className="text-xl font-bold mb-2 text-gray-900">{news.title}</h2>
							<p className="text-gray-700">{news.summary}</p>
							<div className="flex justify-between gap-4 mt-auto text-gray-400 text-sm">
								<p className="self-end whitespace-nowrap">
									{formatPublishedDate(data.time_published)}
								</p>
								<p>
									{data.authors}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>No news available, requests exceeded the daily limit</p>
			)}
		</div>
	)
}
