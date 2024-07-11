import useFetchData from './useFetchData';
import { CompanyData } from '../types/companyData';

const apiKey = process.env.VITE_COMPANY_API_KEY;
const objects = ['NVDA', 'AAPL', 'MSFT', 'AMZN', 'META', 'GOOG'];
const apiUrl = `https://financialmodelingprep.com/api/v3/profile/${objects.join(',')}?apikey=${apiKey}`;

export default function useFetchCompanyData() {
	const { data, loading, error } = useFetchData<CompanyData[]>(apiUrl, 'cachedCompanyData');
	return { data: data ?? [], loading, error };
}
