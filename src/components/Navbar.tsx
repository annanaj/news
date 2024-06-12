import { useState } from 'react';

import { Link } from 'react-router-dom';

import routes from '../routes';
import logo from '../assets/logo.webp';
import WeatherSign from './WeatherSign/WeatherSign';

interface Pages {
	label: string;
	id: number;
	href: string;
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
		<nav className="fixed start-0 top-0 z-10 w-full bg-gray-900 text-white">
			<div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between px-4 py-2">
				<div className="mr-auto flex items-center space-x-3">
					<Link to="/">
						<img src={logo} className="h-12" alt="logo" />
					</Link>
					<Link className="text-white" to="/">
						<span className="self-center whitespace-nowrap text-base">
							Financial updates
						</span>
					</Link>
				</div>
				<div className="flex w-auto items-center justify-between">
					<ul className="mt-0 flex flex-row space-x-8 rounded-lg px-14">
						{pages.map((page) => (
							<Link
								key={page.id}
								to={page.href}
								className={`text-base hover:text-white ${
									activePage === page.id
										? 'border-b border-white font-bold text-white'
										: 'text-white'
								}`}
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
