interface ButtonProps {
	children: string;
	onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
	return (
		<button
			type="button"
			className="mb-2 me-2 rounded-lg bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800"
			onClick={onClick}
		>
			{children}
		</button>
	);
}
