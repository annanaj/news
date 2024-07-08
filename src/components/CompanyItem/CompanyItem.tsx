import { MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import placeholder from '../../assets/placeholder.svg';
import { CompanyData } from '../../types/companyData';

type CompanyItemProps = {
	companyItem: CompanyData;
	navigateTo: string;
	grayscale?: boolean;
};

export default function CompanyItem({
	companyItem,
	navigateTo,
	grayscale = false,
}: CompanyItemProps) {
	const navigate = useNavigate();

	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		document.startViewTransition(() => {
			flushSync(() => {
				navigate(navigateTo);
			});
		});
	};

	const formatCompanyName = (name: string) =>
		name.replace(/Corporation/gi, 'Inc.');

	return (
		<article
			key={companyItem.cik}
			className="relative flex h-full flex-col rounded-lg bg-gray-50 p-6 shadow-lg"
		>
			<a
				href={navigateTo}
				onClick={handleClick}
				className="before:absolute before:inset-0 hover:underline hover:decoration-gray-500"
			>
				<img
					src={companyItem.image || placeholder}
					alt={companyItem.companyName}
					className={`mb-4 ${grayscale ? 'grayscale filter' : ''} h-[180px] w-full rounded-xl bg-gray-200 object-contain shadow-lg`}
				/>
			</a>
			<div className="flex h-full flex-col justify-between">
				<a
					aria-hidden="true"
					href={navigateTo}
					onClick={handleClick}
					className="hover:underline hover:decoration-gray-500"
				>
					<h2 className="relative z-10 mb-2 text-xl font-bold text-gray-900">
						{formatCompanyName(companyItem.companyName)}
					</h2>
				</a>
				<p className="text-sm text-gray-500">{companyItem.ceo}</p>
			</div>
		</article>
	);
}
