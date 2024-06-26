import { useState, useEffect } from 'react';

import { NewsData } from '../types/newsData';

const apiKey = process.env.VITE_NEWS_API_KEY;
const objects = ['NVDA', 'AAPL', 'MSFT'];
const cachedData = localStorage.getItem('cachedNewsData');

interface UseFetchDataReturn {
	data: NewsData[];
	loading: boolean;
}

export default function useFetchNewsData(): UseFetchDataReturn {
	const [newsData, setNewsData] = useState<NewsData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const handleFetchSuccess = (data: NewsData[]) => {
		setNewsData(data);
		setLoading(false);
	};

	const handleFetchError = (error: Error | unknown) => {
		console.error('Error fetching news data from server:', error);
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
			console.error('No news cached data available.');
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!apiKey) {
					throw new Error('API key not available');
				}

				const fetchPromises = objects.map(async (object) => {
					const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${object}&limit=10&apikey=${apiKey}`;
					const response = await fetch(apiUrl);
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				});

				const results = await Promise.all(fetchPromises);
				const combinedData = results.flatMap(
					(result) => result.feed || []
				);

				// due to api daily limit, store data into localStorage only when data from server is not empty
				if (combinedData.length > 0) {
					localStorage.setItem(
						'cachedNewsData',
						JSON.stringify(combinedData)
					);
					console.log('Fetch data: data also stored in localStorage');
					handleFetchSuccess(combinedData);
				} else {
					handleFetchError(new Error('No data fetched from API'));
				}
			} catch (error) {
				handleFetchError(error);
			}
		};

		fetchData();
	}, []);

	return { data: newsData, loading };
}
