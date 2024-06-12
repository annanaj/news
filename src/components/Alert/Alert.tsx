import { ReactNode } from 'react';

interface AlertProps {
	children: ReactNode;
	onClose: () => void;
}

export default function Alert({ children, onClose }: AlertProps) {
	return (
		<div className="top-50 absolute end-0 flex gap-4 rounded bg-indigo-500 py-5 pe-12 ps-10">
			{children}
			<button
				type="button"
				onClick={onClose}
				className="absolute right-1 top-2 inline-flex items-center justify-center p-0 text-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
			>
				<span className="sr-only">Close message</span>
				<svg
					className="h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	);
}
