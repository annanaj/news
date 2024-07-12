import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RxCross1, RxHalf2, RxHamburgerMenu, RxMoon, RxSun  } from 'react-icons/rx';

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
		label: 'Companies',
		id: 2,
		href: routes.companyList,
	},
	{
		label: 'How to',
		id: 3,
		href: routes.themesList,
	},
];

export default function Navbar() {
	const location = useLocation();
	const [activePage, setActivePage] = useState<number | null>(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const currentPage = pages.find(
			(page) => page.href === location.pathname
		);
		if (currentPage) {
			setActivePage(currentPage.id);
		}
	}, [location.pathname]);

	return (
		<nav className="fixed start-0 top-0 z-20 w-full bg-gray-900 text-white">
			<div className="mx-auto flex items-center justify-between px-4 py-2">
				<div className="mr-auto flex items-center space-x-3">
					<Link to="/">
						<img src={logo} className="h-12" alt="logo"/>
					</Link>
					<Link className="text-white" to="/">
						<span className="self-center whitespace-nowrap text-base">
							Financial updates
						</span>
					</Link>
				</div>
				<div className="block md:hidden">
					<button
						type="button"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="bg-transparent text-white focus:outline-none"
						aria-label="Open menu"
					>
						{isMobileMenuOpen ? (
							<RxCross1 size={24}/>
						) : (
							<RxHamburgerMenu size={24}/>
						)}
					</button>
				</div>
				<div
					className={`${
						isMobileMenuOpen
							? 'fixed inset-0 z-20 flex flex-col bg-gray-900'
							: 'hidden'
					} md:flex md:w-auto`}
					aria-hidden={!isMobileMenuOpen}
					aria-expanded={isMobileMenuOpen}
				>
					<div className="flex items-center justify-between p-4 md:hidden">
						<Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
							<img
								src={logo}
								className="h-12"
								alt="Financial updates logo"
							/>
						</Link>
						<button
							type="button"
							onClick={() => setIsMobileMenuOpen(false)}
							className="bg-transparent text-white focus:outline-none"
							aria-label="Close menu"
						>
							<RxCross1 size={24}/>
						</button>
					</div>
					<nav
						className="flex flex-grow flex-col items-center justify-between p-5 md:flex md:flex-row md:items-center md:space-x-8 md:p-0"
					>
						<div className="flex gap-3 px-10">
							<label>
								<input
									name="color-scheme"
									type="radio"
									value="light dark"
									defaultChecked
									hidden
								/>
								<RxHalf2 size={18}/>
							</label>
							<label>
								<input
									name="color-scheme"
									type="radio"
									value="light"
									hidden
								/>
								<RxSun size={18}/>
							</label>
							<label>
								<input
									name="color-scheme"
									type="radio"
									value="dark"
									hidden
								/>
								<RxMoon size={18}/>
							</label>
						</div>
						<ul className="flex flex-col items-center space-y-4 md:flex-row md:space-x-8 md:space-y-0">
							{pages.map((page) => (
								<Link
									key={page.id}
									to={page.href}
									className={`text-base hover:text-white ${
										activePage === page.id
											? 'border-b border-white font-bold text-white'
											: 'text-white'
									}`}
									onClick={() => {
										setActivePage(page.id);
										setIsMobileMenuOpen(false);
									}}
								>
									{page.label}
								</Link>
							))}
						</ul>
						<WeatherSign isMobileMenuOpen={isMobileMenuOpen}/>
					</nav>
				</div>
			</div>
		</nav>
	);
}
