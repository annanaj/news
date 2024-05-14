import { useState, useEffect } from 'react';

import placeholder from '../../assets/placeholder.svg';

import formatPublishedDate from '../../utils/dateFormatter';
import { NewsData } from '../../types/newsData';
import { TopicColors } from '../../types/topicColors';

const apiKey = process.env.NEWS_API_KEY;
const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&limit=1000&apikey=${apiKey}`;
const cachedData = localStorage.getItem('cachedNewsData');

const topicColors: TopicColors = {
	Earnings: 'bg-indigo-500',
	Technology: 'bg-teal-500',
	Manufacturing: 'bg-emerald-500',
	'Economy - Monetary': 'bg-orange-500',
	'Retail & Wholesale': 'bg-rose-500',
	'Financial Markets': 'bg-sky-500',
	'Life Sciences': 'bg-cyan-500',
	Finance: 'bg-yellow-500',
};

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

				// due to api daily limit, store data into localStorage only when data from server is not empty
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

			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

			{loading && (
				<div>
					<div className="container mx-auto">
						<p>Loading news...</p>
					</div>
				</div>
			)}

			{data && data.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 min-w-96">
					{data.map((newsItem: NewsData) => (
						<div
							key={`${newsItem.url}-${newsItem.time_published}`}
							className="flex flex-col h-full p-6 mb-6 bg-gray-50 rounded-lg shadow-lg"
						>
							<div className="relative">
								{newsItem.banner_image ? (
									<img
										src={newsItem.banner_image}
										alt={newsItem.title}
										className="h-[180px] xl:h-[250px] mb-6 w-full object-cover rounded-xl shadow-lg"
									/>
								) : (
									<img
										src={placeholder}
										alt={newsItem.title}
										className="h-[180px] xl:h-[250px] mb-6 w-full object-cover rounded-xl shadow-lg"
									/>
								)}
								<ul className="absolute bottom-7 right-0">
									{newsItem.topics.slice(0, 3).map((topicData) => {
										let className = 'py-1 px-3 mb-1 rounded-l-full shadow-lg text-sm opacity-85';
										const topicColor = topicColors[topicData.topic as keyof TopicColors] || 'bg-gray-500';
										className += ` ${topicColor}`;
										return (
											<li
												key={`${newsItem.url}-${newsItem.time_published}-${topicData.topic}`}
												className={className}
											>
												{topicData.topic}
											</li>
										);
									})}
								</ul>
							</div>
							<h2 className="text-xl font-bold mb-4 text-gray-900">{newsItem.title}</h2>
							<p className="text-gray-700 mb-2">{newsItem.summary}</p>
							<a href={newsItem.url} target="_blank" rel="noreferrer">Full article</a>
							<div className="flex justify-between gap-4 mt-auto text-gray-400 text-sm">
								<p className="self-end whitespace-nowrap">
									{formatPublishedDate(newsItem.time_published)}
								</p>
								<p>
									{newsItem.authors}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>No news available, requests exceeded the daily limit</p>
			)}
		</div>
	);
}
