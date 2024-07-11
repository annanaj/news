import { useState, useEffect } from 'react';

import { WeatherData } from '../types/weatherData';

const apiKey = process.env.VITE_WEATHER_API_KEY;
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Prague&aqi=no`;

export default function useFetchWeatherData() {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchWeatherData = async () => {
			try {
				if (!apiKey) {
					throw new Error('API key not available');
				}

				const response = await fetch(apiUrl);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data: WeatherData = await response.json();

				setWeatherData(data);
				console.log('Fetch weather data: data fetched');
				setLoading(false);
			} catch (error) {
				setError((error as Error).message);
				setLoading(false);
			}
		};

		fetchWeatherData();
	}, []);

	return { data: weatherData, loading, error };
}
