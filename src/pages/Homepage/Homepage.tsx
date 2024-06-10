import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import useFetchNewsData from '../../hooks/useFetchNewsData';
import formatPublishedDate from '../../utils/dateFormatter';
import routes from '../../routes';
import placeholder from '../../assets/placeholder.svg';
import { NewsData } from '../../types/newsData';

export default function NewsList() {
	const { data } = useFetchNewsData();
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		document.startViewTransition(() => {
			flushSync(() => {
				navigate(`${routes.newsList}`);
			});
		});
	};

	return (
		<div className="container mx-auto mt-24 max-w-screen-lg px-10">
			<div className="mx-auto max-w-screen-md">
				<h1 className="mb-10 text-balance text-center text-5xl font-bold">
					Financial updates for market trending
				</h1>
				<p className="mb-4 text-pretty">
					Looking for market news data to train your LLM models or to
					augment your trading strategy and results? You have just
					found it.
				</p>
				<p className="mb-10 text-pretty">
					This API returns live and historical market news & sentiment
					data from a large & growing selection of premier news
					outlets around the world, covering stocks, cryptocurrencies,
					forex. This API, combined with our core stock API,
					fundamental data, and technical indicator APIs, can provide
					you with a 360-degree view of the financial market and the
					broader economy.
				</p>
			</div>
			<h2 className="mb-4 text-2xl font-medium">Latest updates</h2>
			{data && data.length > 0 ? (
				<div className="mb-10 grid min-w-96 grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
					{data.slice(0, 3).map((newsItem: NewsData) => (
						<article
							className="relative mb-6 flex h-full flex-col rounded-lg bg-gray-50 p-6 shadow-lg"
							key={`${newsItem.url}-${newsItem.time_published}`}
						>
							<a
								href={`${routes.newsList}`}
								onClick={handleClick}
								className="hover:underline hover:decoration-gray-500"
							>
								<img
									src={newsItem.banner_image || placeholder}
									alt={newsItem.title}
									className="mb-6 h-[180px] w-full rounded-xl object-cover shadow-lg grayscale filter xl:h-[180px]"
								/>
								<h2 className="text-xl font-bold text-gray-900">
									{newsItem.title.length > 50
										? `${newsItem.title.slice(0, 50)}…`
										: newsItem.title}
								</h2>
							</a>
							<div className="mt-auto flex justify-between gap-4 text-sm text-gray-500">
								<p className="self-end whitespace-nowrap">
									{formatPublishedDate(
										newsItem.time_published
									)}
								</p>
								<p>{newsItem.authors}</p>
							</div>
						</article>
					))}
				</div>
			) : (
				<p>No news available, daily limit has been exceeded</p>
			)}
		</div>
	);
}
