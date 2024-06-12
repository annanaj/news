import placeholder from '../../assets/placeholder.svg';
import { NewsData } from '../../types/newsData';
import formatPublishedDate from '../../utils/dateFormatter';
import useURL from '../../hooks/useSearchParams';
import useFetchNewsData from '../../hooks/useFetchNewsData';

export default function NewsItem() {
	const { data, loading } = useFetchNewsData();
	const { id } = useURL();
	const newsItem = data.find((item: NewsData) => item.time_published === id);

	if (!newsItem) {
		return (
			<div className="container mt-[150px] mx-auto">
				<p className="text-center">No news item found for this ID.</p>
			</div>
		);
	}

	return (
		<div className="container max-w-[700px] mt-[80px] mx-auto">
			<div className="flex items-center mb-7">
				{loading ? (
					<div>
						<p className="mt-2">Loading article data…</p>
					</div>
				) : (
					<div className="flex flex-col p-6 mb-4">
						<h1 className="text-3xl mb-8 leading-normal font-semibold text-gray-100">{newsItem.title}</h1>
						<img
							src={newsItem.banner_image || placeholder}
							alt={newsItem.title}
							className="mb-6 rounded-xl shadow-lg"
						/>
						<p className="mb-6">{newsItem.summary}</p>
						<a href={newsItem.url} target="_blank" className="mb-6" rel="noreferrer">Read everything</a>
						<div className="flex justify-between gap-4 mt-auto mb-6 text-gray-500 text-sm">
							<p className="self-end whitespace-nowrap">
								{formatPublishedDate(newsItem.time_published)}
							</p>
							<p>
								{newsItem.authors?.join(', ')}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
