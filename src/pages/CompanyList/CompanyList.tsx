import { useState } from 'react';

import CompanyItem from '../../components/CompanyItem/CompanyItem';
import useFetchCompanyData from '../../hooks/useFetchCompanyData';
import routes from '../../routes';
import { CompanyData } from '../../types/companyData';

export default function CompanyList() {
	const { data, loading } = useFetchCompanyData();
	const [searchText, setSearchText] = useState<string>('');

	let filteredData = data;
	if (searchText) {
		const searchTextLower = searchText.toLowerCase();
		filteredData = filteredData.filter((companyItem: CompanyData) => {
			const symbolMatches = companyItem.symbol
				.toLowerCase()
				.includes(searchTextLower);
			const companyMatches = companyItem.companyName
				.toLowerCase()
				.includes(searchTextLower);
			const ceoMatches = companyItem.ceo
				? companyItem.ceo.toLowerCase().includes(searchTextLower)
				: false;
			return symbolMatches || companyMatches || ceoMatches;
		});
	}

	return (
		<div className="container mx-auto mt-24 px-7">
			<h1 className="mb-7 text-2xl font-semibold">
				Overviews and data for companies
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
					</div>

					{filteredData && filteredData.length > 0 ? (
						<div className="grid min-w-60 grid-cols-1 gap-5 sm:grid-cols-2 md:min-w-96 md:grid-cols-3 lg:grid-cols-4">
							{filteredData.map((companyItem: CompanyData) => (
								<CompanyItem
									key={`${companyItem.cik}`}
									companyItem={companyItem}
									navigateTo={`${routes.companyDetail}?id=${companyItem.symbol}`}
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
