import { motion } from 'framer-motion';
import { useState } from 'react';

interface ListProps {
	themes: string[];
	heading: string;
	onSelectTheme: (theme: string) => void;
}

export default function Themes({ themes, heading, onSelectTheme }: ListProps) {
	const [selectedIndex, setSelectedIndex] = useState(-1);

	return (
		<>
			<motion.h1
				className="p-4 text-indigo-600"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.5 }}
			>
				{heading}
			</motion.h1>

			{themes.length === 0 && <p>No theme found</p>}
			<ul>
				{themes.map((theme, index) => (
					<li
						className={
							selectedIndex === index
								? 'rounded bg-gray-700 p-2'
								: 'rounded p-2'
						}
						key={theme}
					>
						<button
							type="button"
							onClick={() => {
								setSelectedIndex(index);
								onSelectTheme(theme);
							}}
						>
							{theme}
						</button>
					</li>
				))}
			</ul>
		</>
	);
}
