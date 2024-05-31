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
		<div className="container max-w-screen-lg mt-24 mx-auto px-10">
			<div className="max-w-screen-md mx-auto">
				<h1 className="mb-10 text-5xl font-bold text-center text-balance">
					Financial updates for market
					trending
				</h1>
				<p className="mb-4 text-pretty">
					Looking for market news data to train your LLM models or to augment your trading strategy?
					You have just found it.
				</p>
				<p className="mb-10 text-pretty">
					This API returns live and historical market news & sentiment
					data from a large & growing selection of premier news outlets around the world,
					covering stocks, cryptocurrencies, forex, and a wide range of topics such as
					fiscal policy, mergers & acquisitions, IPOs, etc. This API, combined with our
					core stock API, fundamental data, and technical indicator APIs,
					can provide you with a 360-degree view of the financial market and
					the broader economy.
				</p>
			</div>
			<h2 className="mb-4 text-2xl font-medium">Latest updates</h2>
			{data && data.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 min-w-96 mb-10">
					{data.slice(0, 3).map((newsItem: NewsData) => (
						<article
							className="relative flex flex-col h-full p-6 mb-6 bg-gray-50 rounded-lg shadow-lg"
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
									className="h-[180px] xl:h-[180px] mb-6 w-full object-cover rounded-xl shadow-lg filter grayscale"
								/>
								<h2 className="text-xl font-bold text-gray-900">
									{newsItem.title.length > 50 ? `${newsItem.title.slice(0, 50)}…` : newsItem.title}
								</h2>
							</a>
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
					No news available, daily limit has been exceeded
				</p>
			)}
		</div>
	);
}
