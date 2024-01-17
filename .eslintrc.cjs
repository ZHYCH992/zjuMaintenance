module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime', // 启用新jsx规则
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true, // 启用JSX
		},
	},
	settings: { react: { version: '18.2' } },
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'react/jsx-uses-react': 'off', // 关闭旧模式校验
		'react/react-in-jsx-scope': 'off', // 关闭旧模式校验
		'react/prop-types': 'off', //箭头函数使用props报错关闭
		"no-unused-vars": 'off',//声明后未使用的变量报错关闭
	},
};
