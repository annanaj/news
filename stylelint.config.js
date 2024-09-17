module.exports = {
	extends: [
		'@ntvr/stylelint-config',
		'@ntvr/stylelint-config/order',
		'@ntvr/stylelint-config/scss',
		'@ntvr/stylelint-config/kebab-classes',
	],
	rules: {
		'prettier/prettier': true,
	},
};
