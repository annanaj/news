import { defineConfig } from 'eslint';

export default defineConfig({
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	plugins: ['@typescript-eslint', 'tailwindcss'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	rules: {
		'tailwindcss/classnames-order': 'warn',
		'tailwindcss/no-custom-classname': 'warn',
	},
});
