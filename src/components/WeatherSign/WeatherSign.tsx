import useFetchWeatherData from '../../hooks/useFetchWeatherData';

interface WeatherSignProps {
	isMobileMenuOpen: boolean;
}

export default function WeatherSign({ isMobileMenuOpen }: WeatherSignProps) {
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
		<div
			className={`items-center gap-2 ${isMobileMenuOpen ? 'mr-4 block md:flex' : 'flex'}`}
		>
			<div className="text-xs">
				<h2>{data.location.name}</h2>
				<p>
					{data.current.temp_c}
					°C
				</p>
			</div>
			<img
				width="40px"
				src={data.current.condition.icon}
				alt={data.current.condition.text}
			/>
		</div>
	);
}
