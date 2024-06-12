import { useState } from 'react';

import { Link } from 'react-router-dom';

import routes from '../routes';
import logo from '../assets/logo.webp';
import WeatherSign from './WeatherSign/WeatherSign';

interface Pages {
	label: string,
	id: number,
	href: string,
}

const pages: Pages[] = [
	{
		label: 'Home',
		id: 0,
		href: routes.homepage,
	},
	{
		label: 'News',
		id: 1,
		href: routes.newsList,
	},
	{
		label: 'Themes',
		id: 2,
		href: routes.themesList,
	},
];

export default function Navbar() {
	const [activePage, setActivePage] = useState<number | null>(null);

	return (
		<nav className="fixed z-10 top-0 start-0 w-full bg-gray-900 border-b border-gray-600">
			<div className="flex flex-wrap items-center justify-between max-w-screen-2xl mx-auto px-4 py-2">
				<div className="flex items-center space-x-3 mr-auto">
					<Link to="/">
						<img src={logo} className="h-12" alt="logo" />
					</Link>
					<Link to="/">
						<span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-50">Financial updates</span>
					</Link>
				</div>
				<div className="items-center justify-between flex w-auto">
					<ul className="flex px-8 font-medium rounded-lg space-x-5 flex-row mt-0">
						{pages.map((page) => (
							<Link
								key={page.id}
								to={page.href}
								className={`text-base ${
									activePage === page.id ? 'text-gray-50 border-b border-gray-50' : 'inherit'
								} hover:text-gray-50`}
								onClick={() => setActivePage(page.id)}
							>
								{page.label}
							</Link>
						))}
					</ul>
				</div>
				<WeatherSign />
			</div>
		</nav>
	);
}
