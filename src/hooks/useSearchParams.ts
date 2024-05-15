import { useSearchParams } from 'react-router-dom';

export default function useURL() {
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');
	return { id };
}
