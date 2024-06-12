import useFetchWeatherData from '../../hooks/useFetchWeatherData';

export default function WeatherSign() {
	const { data, loading, error } = useFetchWeatherData();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return (
			<div>
				Error:
				{error}
			</div>
		);
	}

	if (!data) {
		return <div>No weather data available</div>;
	}

	return (
		<div className="flex items-center gap-3">
			<div className="text-xs">
				<h2>
					{data.location.name}
				</h2>
				<p>
					{data.current.temp_c}
					°C
				</p>
			</div>
			<img src={data.current.condition.icon} alt={data.current.condition.text} />
		</div>
	);
}
