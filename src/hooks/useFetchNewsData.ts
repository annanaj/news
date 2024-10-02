import useFetchData from "./useFetchData";
import { NewsData } from "../types/newsData";

// const apiKey = process.env.VITE_NEWS_API_KEY;
// const objects = ['AAPL'];
// const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${objects.join(',')}&limit=1&apikey=${apiKey}`;
const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo`;

export default function useFetchNewsData() {
	const { data, loading, error } = useFetchData<any>(
		apiUrl,
		"cachedNewsData"
	);
	const newsData: NewsData[] = data?.feed ?? [];
	return { newsData, loading, error };
}
