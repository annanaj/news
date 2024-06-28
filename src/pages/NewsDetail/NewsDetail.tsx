import placeholder from '../../assets/placeholder.svg';
import Ticker from '../../components/Ticker/Ticker';
import { NewsData } from '../../types/newsData';
import formatPublishedDate from '../../utils/dateFormatter';
import useURL from '../../hooks/useSearchParams';
import useFetchNewsData from '../../hooks/useFetchNewsData';

export default function NewsDetail() {
	const { data, loading } = useFetchNewsData();
	const { id } = useURL();
	const newsItem = data.find((item: NewsData) => item.time_published === id);

	if (!newsItem) {
		return (
			<div className="container mx-auto mt-[150px]">
				<p className="text-center">
					No news article found, try again later.
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto mt-[65px] max-w-[700px]">
			<div className="mb-7 flex">
				{loading ? (
					<div>
						<p className="mt-2">Loading article data…</p>
					</div>
				) : (
					<div className="mb-4 flex flex-col p-6">
						<h1 className="mb-6 text-3xl font-semibold leading-normal">
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
							className="mb-2"
							rel="noreferrer"
						>
							Read everything
						</a>
						<div className="mb-4 mt-auto flex justify-between gap-4 text-sm text-gray-500">
							<time className="self-end whitespace-nowrap">
								{formatPublishedDate(newsItem.time_published)}
							</time>
							<div>
								<p className="text-right">
									{newsItem.authors?.join(', ')}
								</p>
								<p>{newsItem.source_domain}</p>
							</div>
						</div>
						<Ticker ticker={newsItem.ticker_sentiment} />
					</div>
				)}
			</div>
		</div>
	);
}
