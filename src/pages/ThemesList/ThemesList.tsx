import { useState } from 'react';

import Alert from '../../components/Alert/Alert';
import Button from '../../components/Button/Button';
import logo from '../../assets/logo.webp';
import Themes from '../../components/Themes/Themes';

export default function ThemesList() {
	const [count, setCount] = useState(0);
	const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
	const [alertVisible, setAlertVisible] = useState(false);

	const themes = ['News & Sentiment about companies', 'Stock market data', 'Technical indicators'];

	const handleSelectTheme = (theme: string) => {
		setSelectedTheme(theme);
		setAlertVisible(true);
		setCount((prevCount) => prevCount + 1);
	};

	const handleResetCount = () => {
		setCount(0);
	};

	return (
		<div className="flex flex-col items-center gap-y-10">
			<div>
				<img src={logo} className="text-center h-40" alt="logo" />
			</div>

			<Themes themes={themes} heading="Themes" onSelectTheme={handleSelectTheme} />

			<div className="font-light text-sm text-gray-400">
				click count is
				{' '}
				{count}
			</div>

			<Button onClick={handleResetCount}>
				Reset count
			</Button>

			{alertVisible && (
				<Alert onClose={() => setAlertVisible(false)}>
					<span>
						You picked
						{' '}
						{selectedTheme}
					</span>
				</Alert>
			)}
		</div>
	);
}
