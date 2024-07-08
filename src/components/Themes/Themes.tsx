import { useState } from 'react';

interface ThemesProps {
	themes: string[];
	onSelectTheme: (theme: string) => void;
}

export default function Themes({ themes, onSelectTheme }: ThemesProps) {
	const [selectedIndex, setSelectedIndex] = useState(-1);

	return (
		<>
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
