import { useState, useEffect } from 'react';

import { CompanyData } from '../types/companyData';

const apiKey = process.env.VITE_COMPANY_API_KEY;
const objects = ['NVDA', 'AAPL', 'MSFT', 'AMZN', 'META', 'GOOG'];
const cachedData = localStorage.getItem('cachedCompanyData');

interface UseFetchDataReturn {
	data: CompanyData[];
	loading: boolean;
}

export default function useFetchCompanyData(): UseFetchDataReturn {
	const [companyData, setCompanyData] = useState<CompanyData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const handleFetchSuccess = (data: CompanyData[]) => {
		setCompanyData(data);
		setLoading(false);
	};

	const handleFetchError = (error: Error | unknown) => {
		console.error('Error fetching company data from server:', error);
		// if fetch fails - due to the api calls limit, use data from localStorage
		if (cachedData) {
			try {
				const parsedData = JSON.parse(cachedData);
				setCompanyData(parsedData);
				setLoading(false);
			} catch (parseError) {
				console.error('Error parsing cached data:', parseError);
			}
		} else {
			console.error('No company cached data available.');
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!apiKey) {
					throw new Error('API key not available');
				}

				const fetchPromises = objects.map(async (object) => {
					const apiUrl = `https://financialmodelingprep.com/api/v3/profile/${object}?apikey=${apiKey}`;
					const response = await fetch(apiUrl);

					if (!response.ok) {
						throw new Error(
							`Network response was not ok: ${response.statusText}`
						);
					}

					return response.json();
				});

				const results = await Promise.all(fetchPromises);
				const combinedData = results.flat();

				if (combinedData.length > 0) {
					localStorage.setItem(
						'cachedCompanyData',
						JSON.stringify(combinedData)
					);
					console.log(
						'Fetch data: company data also stored in localStorage'
					);
					handleFetchSuccess(combinedData);
				} else {
					handleFetchError(
						new Error('No company data fetched from API')
					);
				}
			} catch (error) {
				handleFetchError(error);
			}
		};

		fetchData();
	}, []);

	return { data: companyData, loading };
}
