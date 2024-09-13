import useFetchData from './useFetchData';
import { WeatherData } from '../types/weatherData';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Prague&aqi=no`;

export default function useFetchWeatherData() {
	const { data, loading, error } = useFetchData<WeatherData>(apiUrl, 'cachedWeatherData');
	return { data, loading, error };
}
