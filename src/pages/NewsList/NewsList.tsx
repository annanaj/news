import { useState } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import useFetchNewsData from '../../hooks/useFetchNewsData';
import formatPublishedDate from '../../utils/dateFormatter';
import routes from '../../routes';
import placeholder from '../../assets/placeholder.svg';
import { NewsData } from '../../types/newsData';
import { TopicColors } from '../../types/topicColors';

const topicColors: TopicColors = {
	Earnings: 'bg-indigo-500',
	Technology: 'bg-teal-500',
	Manufacturing: 'bg-emerald-500',
	'Economy - Monetary': 'bg-orange-500',
	'Retail & Wholesale': 'bg-rose-500',
	'Financial Markets': 'bg-sky-500',
	'Life Sciences': 'bg-cyan-500',
	Finance: 'bg-yellow-500',
};

export default function NewsList() {
	const { data, loading } = useFetchNewsData();
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState<string>('');

	const handleClick = (newsItem: NewsData) => (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		document.startViewTransition(() => {
			flushSync(() => {
				navigate(`${routes.newsItem}?id=${newsItem.time_published}`);
			});
		});
	};

	let filteredData = data;
	if (searchText) {
		const searchTextLower = searchText.toLowerCase();
		filteredData = data.filter((newsItem: NewsData) => {
			const titleMatches = newsItem.title.toLowerCase().includes(searchTextLower);
			const summaryMatches = newsItem.summary.toLowerCase().includes(searchTextLower);
			const authorMatches = newsItem.authors && newsItem.authors.some(
				(author) => author.toLowerCase().includes(searchTextLower),
			);
			return titleMatches || summaryMatches || authorMatches;
		});
	}

	return (
		<div className="container mt-24 mx-auto px-7">
			<h1 className="text-2xl font-bold mb-7">News & Sentiment Trending for Apple</h1>

			{loading ? (
				<div className="container mx-auto">
					<h2>Loading news...</h2>
				</div>
			) : (
				<>
					<div className="mb-4">
						<input
							type="search"
							aria-label="search"
							id="search"
							placeholder="Search..."
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							className="border border-gray-300 rounded-lg px-4 py-2"
						/>
					</div>

					{filteredData && filteredData.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 min-w-96">
							{filteredData.map((newsItem: NewsData) => (
								<article
									className="relative flex flex-col h-full p-6 mb-6 bg-gray-50 rounded-lg shadow-lg"
								>
									<a
										key={`${newsItem.url}-${newsItem.time_published}`}
										href={`${routes.newsItem}?id=${newsItem.time_published}`}
										onClick={handleClick(newsItem)}
									>
										<img
											src={newsItem.banner_image || placeholder}
											alt={newsItem.title}
											className="h-[180px] xl:h-[250px] mb-6 w-full object-cover rounded-xl shadow-lg"
										/>
										<h2 className="text-xl font-bold mb-4 text-gray-900 line-clamp-5">{newsItem.title}</h2>
									</a>
									<ul className="absolute top-6 right-0">
										{newsItem.topics.slice(0, 3).map((topicData) => {
											let className = 'py-1 px-3 mb-1 rounded-l-full shadow-lg text-sm text-white';
											const topicColor = topicColors[topicData.topic as keyof TopicColors] || 'bg-gray-500';
											className += ` ${topicColor}`;
											return (
												<li
													key={`${newsItem.url}-${newsItem.time_published}-${topicData.topic}`}
													className={className}
												>
													{topicData.topic.split(' ')[0]}
												</li>
											);
										})}
									</ul>
									<div className="flex justify-between gap-4 mt-auto text-gray-500 text-sm">
										<p className="self-end whitespace-nowrap">
											{formatPublishedDate(newsItem.time_published)}
										</p>
										<p>{newsItem.authors}</p>
									</div>
								</article>
							))}
						</div>
					) : (
						<p>
							{loading ? 'No news available, daily limit has been exceeded' : 'No results found, reset the search'}
						</p>
					)}
				</>
			)}
		</div>
	);
}
