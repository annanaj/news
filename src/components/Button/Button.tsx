import classNames from 'classnames';

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	loading?: boolean;
	variant?: 'blue' | 'transparent';
	type: 'submit' | 'button';
}

const buttonClasses = classNames(
	'text-sm xs:text-base justify-center rounded-lg py-2 sm:py-3 inline-flex gap-x-1 sm:gap-x-2 disabled:opacity-50 border-2 border-solid transition-colors ease-in-out duration-300 font-bold items-center group disabled:cursor-not-allowed'
);
const colorBlueClasses = classNames(
	'border-transparent text-white bg-blue-500 hover:border-blue-500'
);
const colorTransparent = classNames(
	'border-none ml-auto mr-4 bg-transparent text-gray-500 hover:text-black hover:border-black sm:p-0'
);

const styleClassesMap = {
	blue: colorBlueClasses,
	transparent: colorTransparent,
};

export default function Button({
	children,
	onClick,
	variant = 'blue',
	type,
}: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={classNames(buttonClasses, styleClassesMap[variant])}
		>
			{children}
		</button>
	);
}
