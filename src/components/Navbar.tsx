import { useState } from 'react';
import { Link } from 'react-router-dom';

import routes from '../routes';
import logo from '../assets/logo.webp';

interface Pages {
	label: string,
	id: number,
	href: string,
}

const pages: Pages[] = [
	{
		label: 'News',
		id: 0,
		href: routes.newsList,
	},
	{
		label: 'Themes',
		id: 1,
		href: routes.themesList,
	},
];

export default function Navbar() {
	const [activePage, setActivePage] = useState<number | null>(null);

	return (
		<nav className="fixed z-1 top-0 start-0 w-full bg-gray-900 border-b border-gray-600">
			<div className="flex flex-wrap items-center justify-between max-w-screen-2xl mx-auto px-4 py-2">
				<div className="flex items-center space-x-3">
					<img src={logo} className="h-12" alt="logo" />
					<span className="self-center text-2xl font-semibold whitespace-nowrap text-gray">Financial updates</span>
				</div>
				<div className="items-center justify-between flex w-auto">
					<ul className="flex p-0 font-medium rounded-lg space-x-8 flex-row mt-0">
						{pages.map((page) => (
							<Link
								key={page.id}
								to={page.href}
								className={`text-base ${
									activePage === page.id ? 'inherit font-bold' : 'inherit font-normal'
								} hover:text-white`}
								onClick={() => setActivePage(page.id)}
							>
								{page.label}
							</Link>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
}
