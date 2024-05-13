import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import routes from './routes';

import Navbar from './components/Navbar';
import NewsList from './pages/NewsList/NewsList';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ThemesList from './pages/ThemesList/ThemesList';

export default function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<NewsList />} />
				<Route path={routes.themesList} element={<ThemesList />} />
				<Route path={routes.newsList} element={<NewsList />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</Router>
	);
}
