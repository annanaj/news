import placeholder from '../../assets/placeholder.svg';
import { CompanyData } from '../../types/companyData';
import useURL from '../../hooks/useSearchParams';
import useFetchCompanyData from '../../hooks/useFetchCompanyData';

export default function CompanyDetail() {
	const { data, loading } = useFetchCompanyData();
	const { id } = useURL();
	const companyItem = data.find((item: CompanyData) => item.symbol === id);

	if (!companyItem) {
		return (
			<div className="container mx-auto mt-[150px]">
				<p className="text-center">
					No company overview found, try again later.
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
							{companyItem.companyName}
						</h1>
						<img
							src={companyItem.image || placeholder}
							alt={companyItem.companyName}
							className="mb-6 rounded-xl shadow-lg"
						/>
						<p className="text-sm text-gray-500">
							{companyItem.ceo}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
