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
			<div className="container mx-auto mt-[150px]">
				<p className="text-center">No news item found for this ID.</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto mt-[100px] max-w-[700px]">
			<div className="mb-7 flex items-center">
				{loading ? (
					<div>
						<p className="mt-2">Loading article data…</p>
					</div>
				) : (
					<div className="mb-4 flex flex-col p-6">
						<h1 className="mb-8 text-3xl font-semibold leading-normal text-gray-100">
							{newsItem.title}
						</h1>
						<img
							src={newsItem.banner_image || placeholder}
							alt={newsItem.title}
							className="mb-6 rounded-xl shadow-lg"
						/>
						<p className="mb-6">{newsItem.summary}</p>
						<a
							href={newsItem.url}
							target="_blank"
							className="mb-6"
							rel="noreferrer"
						>
							Read everything
						</a>
						<div className="mb-6 mt-auto flex justify-between gap-4 text-sm text-gray-500">
							<p className="self-end whitespace-nowrap">
								{formatPublishedDate(newsItem.time_published)}
							</p>
							<p>{newsItem.authors?.join(', ')}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
