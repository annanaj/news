import { useState, useEffect } from 'react';

interface UseFetchDataReturn<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
}

function useFetchData<T>(apiUrl: string, localStorageKey: string): UseFetchDataReturn<T> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const cachedData = localStorage.getItem(localStorageKey);
				if (cachedData) {
					setData(JSON.parse(cachedData));
					setLoading(false);
				} else {
					const response = await fetch(apiUrl);
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					const data: T = await response.json();
					setData(data);
					localStorage.setItem(localStorageKey, JSON.stringify(data));
					setLoading(false);
				}
			} catch (error) {
				setError((error as Error).message);
				setLoading(false);
			}
		};

		fetchData();
	}, [apiUrl, localStorageKey]);

	return { data, loading, error };
}

export default useFetchData;
