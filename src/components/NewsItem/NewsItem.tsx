import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import placeholder from '../../assets/placeholder.svg';
import { NewsData } from '../../types/newsData';
import formatPublishedDate from '../../utils/dateFormatter';

type NewsItemProps = {
	newsItem: NewsData;
	navigateTo: string;
	grayscale?: boolean;
};

export default function NewsItem({
	newsItem,
	navigateTo,
	grayscale = false,
}: NewsItemProps) {
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		document.startViewTransition(() => {
			flushSync(() => {
				navigate(navigateTo);
			});
		});
	};

	return (
		<article
			key={`${newsItem.url}-${newsItem.time_published}`}
			className="relative mb-6 flex h-full flex-col rounded-lg bg-gray-50 p-6 shadow-lg"
		>
			<a
				href={navigateTo}
				onClick={handleClick}
				className="before:absolute before:inset-0 hover:underline hover:decoration-gray-500"
			>
				<img
					src={newsItem.banner_image || placeholder}
					alt={newsItem.title}
					className={`mb-6 ${grayscale ? 'grayscale filter' : ''} h-[180px] w-full rounded-xl object-cover shadow-lg`}
				/>
			</a>
			<div className="flex h-full flex-col">
				<a
					aria-hidden="true"
					href={navigateTo}
					onClick={handleClick}
					className="hover:underline hover:decoration-gray-500"
				>
					<h2 className="relative z-10 mb-4 text-xl font-bold text-gray-900">
						{newsItem.title.length > 50
							? `${newsItem.title.slice(0, 50)}…`
							: newsItem.title}
					</h2>
				</a>
				<div className="mt-auto flex justify-between gap-4 text-sm text-gray-500">
					<p className="self-end whitespace-nowrap">
						{formatPublishedDate(newsItem.time_published)}
					</p>
					<p>{newsItem.authors}</p>
				</div>
			</div>
		</article>
	);
}
