import React, { useEffect } from 'react';

import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom';

import routes from './routes';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage/Homepage';
import CompanyList from './pages/CompanyList/CompanyList';
import CompanyDetail from './pages/CompanyDetail/CompanyDetail';
import NewsList from './pages/NewsList/NewsList';
import NewsDetail from './pages/NewsDetail/NewsDetail';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ThemesList from './pages/ThemesList/ThemesList';

function AppContent() {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const handleLinkClick = (
			event: React.MouseEvent<HTMLButtonElement>
		) => {
			const link = event.currentTarget.closest('a');
			if (link && link.origin === window.location.origin) {
				event.preventDefault();
				document.startViewTransition(() => {
					navigate(link.pathname + link.search);
				});
			}
		};

		document.body.addEventListener(
			'click',
			handleLinkClick as unknown as EventListener
		);
		return () => {
			document.body.removeEventListener(
				'click',
				handleLinkClick as unknown as EventListener
			);
		};
	}, [navigate]);

	return (
		<>
			<Navbar />
			<Routes location={location}>
				<Route path="/" element={<Homepage />} />
				<Route path={routes.companyList} element={<CompanyList />} />
				<Route
					path={routes.companyDetail}
					element={<CompanyDetail />}
				/>
				<Route path={routes.newsList} element={<NewsList />} />
				<Route path={routes.newsDetail} element={<NewsDetail />} />
				<Route path={routes.themesList} element={<ThemesList />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	);
}
