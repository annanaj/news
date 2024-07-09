import useFetchData from './useFetchData';
import { NewsData } from '../types/newsData';

const apiKey = process.env.VITE_NEWS_API_KEY;
const objects = ['NVDA', 'AAPL', 'MSFT'];
const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${objects.join(',')}&limit=10&apikey=${apiKey}`;

export default function useFetchNewsData() {
	const { data, loading, error } = useFetchData<NewsData[]>(apiUrl, 'cachedNewsData');
	return { data: data ?? [], loading, error };
}
