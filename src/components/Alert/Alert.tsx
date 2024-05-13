import { ReactNode } from 'react';

interface AlertProps {
	children: ReactNode,
	onClose: () => void,
}

export default function Alert({ children, onClose }: AlertProps) {
	return (
		<div className="absolute top-50 end-0 flex gap-4 bg-indigo-500 ps-10 pe-12 py-5 rounded">
			{children}
			<button
				type="button"
				onClick={onClose}
				className="absolute top-2 right-1 p-0 inline-flex items-center justify-center text-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
