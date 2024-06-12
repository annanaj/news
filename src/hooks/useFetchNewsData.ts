import { useState, useEffect } from 'react';

import { NewsData } from '../types/newsData';

const apiKey = process.env.VITE_NEWS_API_KEY;
const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&limit=1000000&apikey=${apiKey}`;
const cachedData = localStorage.getItem('cachedNewsData');

interface UseFetchNewsDataReturn {
	data: NewsData[];
	loading: boolean;
}

export default function useFetchNewsData(): UseFetchNewsDataReturn {
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
					localStorage.setItem(
						'cachedNewsData',
						JSON.stringify(data.feed)
					);
					console.log('Fetch data: data also stored in localStorage');
					handleFetchSuccess(data.feed);
				} else {
					handleFetchError(new Error('No data fetched from API'));
				}
			} catch (error) {
				handleFetchError(error);
			}
		};

		fetchNewsData();
		console.log('Fetch list data: data fetched');
	}, []);

	let data = [];

	if (newsData && newsData.length > 0) {
		data = newsData;
	} else if (cachedData) {
		data = JSON.parse(cachedData);
	}

	return { data, loading } as { data: NewsData[]; loading: boolean };
}
