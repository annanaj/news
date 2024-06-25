import { useState } from 'react';

import NewsItem from '../../components/NewsItem/NewsItem';
import useFetchNewsData from '../../hooks/useFetchNewsData';
import routes from '../../routes';
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
	const [searchText, setSearchText] = useState<string>('');
	const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

	const handleTopicClick = (topic: string) => {
		const index = selectedTopics.indexOf(topic);
		if (index === -1) {
			setSelectedTopics([...selectedTopics, topic]);
		} else {
			const newTopics = [...selectedTopics];
			newTopics.splice(index, 1);
			setSelectedTopics(newTopics);
		}
	};

	let filteredData = data;
	if (searchText) {
		const searchTextLower = searchText.toLowerCase();
		filteredData = filteredData.filter((newsItem: NewsData) => {
			const titleMatches = newsItem.title
				.toLowerCase()
				.includes(searchTextLower);
			const summaryMatches = newsItem.summary
				.toLowerCase()
				.includes(searchTextLower);
			const authorMatches =
				newsItem.authors &&
				newsItem.authors.some((author) =>
					author.toLowerCase().includes(searchTextLower)
				);
			return titleMatches || summaryMatches || authorMatches;
		});
	}
	if (selectedTopics.length > 0) {
		filteredData = filteredData.filter((newsItem: NewsData) =>
			newsItem.topics
				.slice(0, 3)
				.some((topicData) => selectedTopics.includes(topicData.topic))
		);
	}

	return (
		<div className="container mx-auto mt-24 px-7">
			<h1 className="mb-7 text-2xl font-bold">
				News & Sentiment Trending for Apple, Nvidia and Microsoft
			</h1>

			{loading ? (
				<div className="container mx-auto">
					<h2>Loading news...</h2>
				</div>
			) : (
				<>
					<div className="mb-4 flex flex-wrap items-end justify-between gap-4">
						<input
							type="search"
							aria-label="search"
							id="search"
							placeholder="Search..."
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							className="rounded-lg border border-gray-500 px-4 py-2"
						/>

						<div className="flex flex-wrap gap-2">
							{Object.keys(topicColors).map((topic) => (
								<button
									type="button"
									key={topic}
									onClick={() => handleTopicClick(topic)}
									className={`flex cursor-pointer items-center rounded-lg px-2 py-1 text-xs transition-colors ${
										selectedTopics.includes(topic)
											? 'border border-gray-600 bg-gray-600 dark:text-white'
											: 'border border-gray-500 bg-white text-black dark:bg-transparent dark:text-white'
									}`}
								>
									{topic.split(' ')[0]}
								</button>
							))}
						</div>
					</div>

					{filteredData && filteredData.length > 0 ? (
						<div className="grid min-w-60 grid-cols-1 gap-5 sm:grid-cols-2 md:min-w-96 md:grid-cols-3">
							{filteredData.map((newsItem: NewsData) => (
								<NewsItem
									key={newsItem.url}
									newsItem={newsItem}
									navigateTo={`${routes.newsItem}?id=${newsItem.time_published}`}
								/>
							))}
						</div>
					) : (
						<p>
							{loading
								? 'No news available, daily limit has been exceeded'
								: 'No results found, reset the search'}
						</p>
					)}
				</>
			)}
		</div>
	);
}
