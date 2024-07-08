import { useState } from 'react';
import { motion } from 'framer-motion';

import Alert from '../../components/Alert/Alert';
import Button from '../../components/Button/Button';
import Themes from '../../components/Themes/Themes';

import logo from '../../assets/logo.webp';

export default function ThemesList() {
	const [count, setCount] = useState(0);
	const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
	const [alertVisible, setAlertVisible] = useState(false);

	const themes = [
		'News & Sentiments',
		'Company Overviews',
		'Technical indicators TBA',
	];

	const handleSelectTheme = (theme: string) => {
		setSelectedTheme(theme);
		setAlertVisible(true);
		setCount((prevCount) => prevCount + 1);
	};

	const handleResetCount = () => {
		setCount(0);
	};

	return (
		<div className="container mx-auto mt-28 flex max-w-screen-sm flex-col items-center gap-y-4 px-10">
			<div>
				<img src={logo} className="h-40 text-center" alt="logo" />
			</div>

			<motion.h1
				className="p-4 text-indigo-600"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.5 }}
			>
				Themes
			</motion.h1>

			<p>
				You may surf thru this site to upgrade your trading knowledge to
				upstream the results. For now there is available latest news and
				sentiments for market, along with detailed info about companies.
			</p>

			<Themes themes={themes} onSelectTheme={handleSelectTheme} />

			<div className="text-sm font-light text-gray-400">
				click count is {count}
			</div>

			<Button onClick={handleResetCount}>Reset count</Button>

			{alertVisible && (
				<Alert onClose={() => setAlertVisible(false)}>
					<span>You picked {selectedTheme}</span>
				</Alert>
			)}
		</div>
	);
}
